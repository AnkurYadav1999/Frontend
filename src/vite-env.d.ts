/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_REST_URL?: string;
  readonly VITE_API_GRAPHQL_URL?: string;
  readonly VITE_API_WS_URL?: string;
  readonly VITE_API_TIMEOUT_MS?: string;
  readonly VITE_API_RETRY_ATTEMPTS?: string;
  readonly VITE_FEATURE_WEBSOCKETS?: string;
  readonly VITE_FEATURE_GRAPHQL?: string;
  readonly VITE_FEATURE_OBSERVABILITY?: string;
  readonly VITE_MOCK_NETWORK?: string;
  readonly VITE_LOG_LEVEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
