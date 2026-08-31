export type ErrorCategory =
  'HTTP' | 'GRAPHQL' | 'WEBSOCKET' | 'VALIDATION' | 'AUTH' | 'NETWORK' | 'UNKNOWN';

export class AppError extends Error {
  public readonly category: ErrorCategory;
  public readonly statusCode?: number;
  public readonly code?: string;
  public readonly details?: unknown;
  public readonly timestamp: string;

  constructor(
    message: string,
    options?: {
      category?: ErrorCategory;
      statusCode?: number;
      code?: string;
      details?: unknown;
      cause?: Error;
    }
  ) {
    super(message, { cause: options?.cause });
    this.name = 'AppError';
    this.category = options?.category || 'UNKNOWN';
    this.statusCode = options?.statusCode;
    this.code = options?.code;
    this.details = options?.details;
    this.timestamp = new Date().toISOString();

    const captureStackTrace = (
      Error as unknown as { captureStackTrace?: (target: object, ctor?: unknown) => void }
    ).captureStackTrace;
    if (typeof captureStackTrace === 'function') {
      captureStackTrace(this, AppError);
    }
  }
}

export class HttpError extends AppError {
  constructor(message: string, statusCode: number, details?: unknown) {
    super(message, { category: 'HTTP', statusCode, details });
    this.name = 'HttpError';
  }
}

export class GraphQLError extends AppError {
  public readonly graphqlErrors: ReadonlyArray<unknown>;

  constructor(message: string, errors: ReadonlyArray<unknown>) {
    super(message, { category: 'GRAPHQL', details: errors });
    this.name = 'GraphQLError';
    this.graphqlErrors = errors;
  }
}

export class WebSocketError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, { category: 'WEBSOCKET', details });
    this.name = 'WebSocketError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, string[]>) {
    super(message, { category: 'VALIDATION', details });
    this.name = 'ValidationError';
  }
}

export function normalizeError(err: unknown): AppError {
  if (err instanceof AppError) {
    return err;
  }

  if (err instanceof Error) {
    return new AppError(err.message, { cause: err });
  }

  if (typeof err === 'string') {
    return new AppError(err);
  }

  return new AppError('An unexpected error occurred.', { details: err });
}
