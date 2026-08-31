import { z } from 'zod';

const environmentSchema = z.enum(['development', 'test', 'staging', 'production']);

const configSchema = z.object({
  env: environmentSchema,
  isDev: z.boolean(),
  isProduction: z.boolean(),
  isTest: z.boolean(),
  api: z.object({
    restBaseUrl: z.string().url().or(z.string().startsWith('/')),
    graphqlEndpoint: z.string().url().or(z.string().startsWith('/')),
    timeoutMs: z.number().positive(),
    retryAttempts: z.number().nonnegative(),
  }),
  features: z.object({
    enableGraphQL: z.boolean(),
    enableObservability: z.boolean(),
    mockNetworkInDev: z.boolean(),
  }),
  logging: z.object({
    level: z.enum(['debug', 'info', 'warn', 'error']),
  }),
});

export type AppConfig = z.infer<typeof configSchema>;

const rawEnv = {
  env: (import.meta.env.MODE || 'development') as 'development' | 'test' | 'staging' | 'production',
  isDev: import.meta.env.DEV ?? true,
  isProduction: import.meta.env.PROD ?? false,
  isTest: import.meta.env.MODE === 'test',
  api: {
    restBaseUrl: (import.meta.env.VITE_API_REST_URL as string) || 'https://api.example.com/v1',
    graphqlEndpoint:
      (import.meta.env.VITE_API_GRAPHQL_URL as string) || 'https://api.example.com/graphql',
    timeoutMs: Number(import.meta.env.VITE_API_TIMEOUT_MS || 15000),
    retryAttempts: Number(import.meta.env.VITE_API_RETRY_ATTEMPTS || 2),
  },
  features: {
    enableGraphQL: import.meta.env.VITE_FEATURE_GRAPHQL !== 'false',
    enableObservability: import.meta.env.VITE_FEATURE_OBSERVABILITY === 'true',
    mockNetworkInDev: import.meta.env.VITE_MOCK_NETWORK === 'true' || true,
  },
  logging: {
    level: ((import.meta.env.VITE_LOG_LEVEL as string) || 'info') as
      'debug' | 'info' | 'warn' | 'error',
  },
};

function validateConfig(): AppConfig {
  const result = configSchema.safeParse(rawEnv);
  if (!result.success) {
    console.error('Invalid environment configuration:', result.error.format());
    throw new Error('Environment configuration validation failed.');
  }
  return result.data;
}

export const config: AppConfig = validateConfig();
