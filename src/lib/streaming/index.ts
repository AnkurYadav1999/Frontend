import { useState, useCallback, useRef } from 'react';
import { logger } from '../logging';
import { AppError } from '../error';
import { authAdapter } from '../auth';

export interface StreamOptions {
  headers?: Record<string, string>;
  skipAuth?: boolean;
}

export type StreamStatus = 'idle' | 'connecting' | 'streaming' | 'completed' | 'error';

export class StreamingClient {
  public async streamText(
    url: string,
    onChunk: (chunk: string) => void,
    options?: StreamOptions
  ): Promise<void> {
    const headers: Record<string, string> = {
      Accept: 'text/event-stream, text/plain, */*',
      ...options?.headers,
    };

    if (!options?.skipAuth) {
      const token = await authAdapter.getAccessToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    try {
      const response = await fetch(url, { headers });
      if (!response.ok || !response.body) {
        throw new AppError(`Streaming request failed with status ${response.status}`, {
          category: 'NETWORK',
          statusCode: response.status,
        });
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let reading = true;

      while (reading) {
        const { done, value } = await reader.read();
        if (done) {
          reading = false;
          break;
        }
        const text = decoder.decode(value, { stream: true });
        onChunk(text);
      }
    } catch (err) {
      logger.error('Stream read error:', err);
      throw err;
    }
  }
}

export const streamingClient = new StreamingClient();

export function useStream(url: string, options?: StreamOptions) {
  const [data, setData] = useState<string>('');
  const [status, setStatus] = useState<StreamStatus>('idle');
  const [error, setError] = useState<Error | null>(null);
  const activeStreamRef = useRef<boolean>(false);

  const startStream = useCallback(async () => {
    if (activeStreamRef.current) return;
    activeStreamRef.current = true;
    setStatus('connecting');
    setError(null);
    setData('');

    try {
      setStatus('streaming');
      await streamingClient.streamText(
        url,
        (chunk) => {
          setData((prev) => prev + chunk);
        },
        options
      );
      setStatus('completed');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Stream failed'));
      setStatus('error');
    } finally {
      activeStreamRef.current = false;
    }
  }, [url, options]);

  return {
    data,
    status,
    error,
    startStream,
  };
}
