import { describe, it, expect } from 'vitest';
import { HttpClient } from '../index';
import { HttpError } from '../../error';
import { JobItem } from '../../../features/seeker/types';

describe('HttpClient Transport Abstraction', () => {
  const client = new HttpClient();

  it('performs GET request and returns typed data via MSW', async () => {
    const data = await client.get<JobItem[]>('/api/v1/jobs');
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('handles 404/500 errors and throws normalized HttpError', async () => {
    try {
      await client.get('/api/v1/error-test', { retry: false });
      expect.fail('Should have thrown HttpError');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      if (error instanceof HttpError) {
        expect(error.statusCode).toBe(404);
      }
    }
  });
});
