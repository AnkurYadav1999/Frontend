import { config } from '../config';
import { GraphQLError, normalizeError } from '../error';
import { authAdapter } from '../auth';

export interface GraphQLRequest<TVariables = Record<string, unknown>> {
  query: string;
  variables?: TVariables;
  operationName?: string;
}

export interface GraphQLResponse<TData> {
  data?: TData;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: Array<string | number>;
    extensions?: Record<string, unknown>;
  }>;
}

export class GraphQLClient {
  private endpoint: string;

  constructor(endpoint: string = config.api.graphqlEndpoint) {
    this.endpoint = endpoint;
  }

  public async request<TData = unknown, TVariables = Record<string, unknown>>(
    request: GraphQLRequest<TVariables>,
    options?: { headers?: Record<string, string>; skipAuth?: boolean }
  ): Promise<TData> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options?.headers,
    };

    if (!options?.skipAuth) {
      const token = await authAdapter.getAccessToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new GraphQLError(`GraphQL network request failed with status ${response.status}`, [
          { message: response.statusText },
        ]);
      }

      const result: GraphQLResponse<TData> = await response.json();

      if (result.errors && result.errors.length > 0) {
        const firstMsg = result.errors[0]?.message || 'GraphQL Execution Error';
        throw new GraphQLError(firstMsg, result.errors);
      }

      if (!result.data) {
        throw new GraphQLError('GraphQL response contained no data', []);
      }

      return result.data;
    } catch (err: unknown) {
      if (err instanceof GraphQLError) throw err;
      throw normalizeError(err);
    }
  }

  public query<TData = unknown, TVariables = Record<string, unknown>>(
    query: string,
    variables?: TVariables,
    operationName?: string
  ): Promise<TData> {
    return this.request<TData, TVariables>({ query, variables, operationName });
  }

  public mutate<TData = unknown, TVariables = Record<string, unknown>>(
    mutation: string,
    variables?: TVariables,
    operationName?: string
  ): Promise<TData> {
    return this.request<TData, TVariables>({ query: mutation, variables, operationName });
  }
}

export const graphqlClient = new GraphQLClient();
