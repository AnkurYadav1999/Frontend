import { config } from '../config';
import { HttpError, normalizeError } from '../error';
import { authAdapter } from '../auth';
import { logger } from '../logging';

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  params?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
  timeoutMs?: number;
  skipAuth?: boolean;
  retry?: boolean | number;
}

export type RequestInterceptor = (
  options: RequestOptions
) => Promise<RequestOptions> | RequestOptions;
export type ResponseInterceptor = <T>(response: Response) => Promise<T> | T;

export class HttpClient {
  private baseUrl: string;
  private defaultTimeout: number;
  private defaultRetryCount: number;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  constructor(baseUrl: string = config.api.restBaseUrl) {
    this.baseUrl = baseUrl;
    this.defaultTimeout = config.api.timeoutMs;
    this.defaultRetryCount = config.api.retryAttempts;
  }

  public addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  public addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  private buildUrl(
    path: string,
    params?: Record<string, string | number | boolean | undefined | null>
  ): string {
    const isAbsolute = path.startsWith('http://') || path.startsWith('https://');
    const fullUrl = isAbsolute
      ? path
      : `${this.baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

    if (!params) return fullUrl;

    const url = new URL(fullUrl, window.location.origin);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
    return url.toString();
  }

  private async executeWithRetry<T>(
    fn: () => Promise<T>,
    retriesLeft: number,
    delayMs = 300
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      const normalized = normalizeError(error);
      const isServerError =
        normalized instanceof HttpError && normalized.statusCode && normalized.statusCode >= 500;

      if (retriesLeft > 0 && isServerError) {
        logger.warn(
          `Retrying HTTP request (${retriesLeft} retries left) after ${delayMs}ms delay...`
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        return this.executeWithRetry(fn, retriesLeft - 1, delayMs * 2);
      }
      throw normalized;
    }
  }

  public async request<TResponse>(path: string, options: RequestOptions = {}): Promise<TResponse> {
    const retryCount =
      typeof options.retry === 'number'
        ? options.retry
        : options.retry === true
          ? this.defaultRetryCount
          : 0;

    return this.executeWithRetry(() => this.performRequest<TResponse>(path, options), retryCount);
  }

  private async performRequest<TResponse>(
    path: string,
    options: RequestOptions = {}
  ): Promise<TResponse> {
    let processedOptions: RequestOptions = { ...options };

    for (const interceptor of this.requestInterceptors) {
      processedOptions = await interceptor(processedOptions);
    }

    const {
      params,
      body,
      timeoutMs = this.defaultTimeout,
      skipAuth = false,
      headers: customHeaders,
      signal: externalSignal,
      ...fetchInit
    } = processedOptions;

    const url = this.buildUrl(path, params);

    const controller = externalSignal
      ? null
      : typeof window === 'undefined'
        ? new AbortController()
        : null;
    const timeoutId =
      controller && timeoutMs ? setTimeout(() => controller.abort(), timeoutMs) : null;

    const headers = new Headers(customHeaders);
    if (!headers.has('Content-Type') && body && !(body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }
    if (!headers.has('Accept')) {
      headers.set('Accept', 'application/json');
    }

    if (!skipAuth) {
      const token = await authAdapter.getAccessToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }

    const requestBody = body ? (body instanceof FormData ? body : JSON.stringify(body)) : undefined;

    try {
      const response = await fetch(url, {
        ...fetchInit,
        headers,
        body: requestBody,
        signal: externalSignal || (controller ? controller.signal : undefined),
      });

      if (timeoutId) clearTimeout(timeoutId);

      if (!response.ok) {
        let errorDetails: unknown;
        try {
          errorDetails = await response.json();
        } catch {
          errorDetails = await response.text();
        }
        throw new HttpError(
          `HTTP Request failed with status ${response.status}: ${response.statusText}`,
          response.status,
          errorDetails
        );
      }

      if (response.status === 204) {
        return undefined as TResponse;
      }

      let data = await response.json();
      for (const interceptor of this.responseInterceptors) {
        data = await interceptor(data);
      }

      return data as TResponse;
    } catch (err: unknown) {
      if (timeoutId) clearTimeout(timeoutId);
      if (err instanceof HttpError) throw err;
      if (err instanceof DOMException && err.name === 'AbortError') {
        throw new HttpError('Request timed out or was cancelled', 408);
      }
      throw normalizeError(err);
    }
  }

  public get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'GET', retry: options?.retry ?? true });
  }

  public post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'POST', body });
  }

  public put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body,
      retry: options?.retry ?? true,
    });
  }

  public patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'PATCH', body });
  }

  public delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'DELETE', retry: options?.retry ?? true });
  }
}

export const httpClient = new HttpClient();
