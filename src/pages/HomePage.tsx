import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cpu, Zap, ArrowRight } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const HomePage: React.FC = () => {
  return (
    <Container size="xl" className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-800 text-white shadow-xl">
        <div className="space-y-3 max-w-2xl">
          <Badge variant="info" className="bg-white/20 text-white border-white/30">
            Domain-Agnostic Core Architecture
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Enterprise Modern React Foundation
          </h1>
          <p className="text-brand-100 text-sm sm:text-base leading-relaxed">
            A production-ready, feature-isolated frontend architecture featuring Redux Toolkit,
            TanStack Query, React Hook Form, Zod validation, and typed REST/GraphQL/WebSocket
            network abstractions.
          </p>
        </div>
        <Link to="/example">
          <Button
            size="lg"
            className="bg-white text-brand-700 hover:bg-brand-50 shadow-md font-semibold"
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Explore Neutral Feature
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          header={
            <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
              <Cpu className="w-5 h-5" />
              <span>Modular Architecture</span>
            </div>
          }
        >
          <p className="text-xs text-surface-600 dark:text-surface-400 leading-relaxed mb-4">
            Layered, feature-oriented project organization. Features own their UI, API calls, store
            slices, validation schemas, and types with intentional public API entrypoints.
          </p>
          <Badge variant="success">Strict Isolation</Badge>
        </Card>

        <Card
          header={
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Zap className="w-5 h-5" />
              <span>Dual State Strategy</span>
            </div>
          }
        >
          <p className="text-xs text-surface-600 dark:text-surface-400 leading-relaxed mb-4">
            Redux Toolkit restricted strictly to true client/UI state. TanStack Query owns all
            server caching, queries, mutations, background refetching, and pagination.
          </p>
          <Badge variant="info">Redux + TanStack Query</Badge>
        </Card>

        <Card
          header={
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <ShieldCheck className="w-5 h-5" />
              <span>Typed Transport Layer</span>
            </div>
          }
        >
          <p className="text-xs text-surface-600 dark:text-surface-400 leading-relaxed mb-4">
            Native Fetch-based REST client with retries/interceptors, GraphQLClient for
            query/mutations, and WebSocketClient with auto-reconnect & backoff.
          </p>
          <Badge variant="warning">REST / GraphQL / WS</Badge>
        </Card>
      </div>

      <Card header="Architecture Highlights">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-surface-100 dark:bg-surface-800/50 space-y-1">
            <h4 className="font-semibold text-surface-900 dark:text-surface-100">
              React Hook Form + Zod
            </h4>
            <p className="text-surface-500">
              Schema-driven form validation layer with normalized error propagation.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-surface-100 dark:bg-surface-800/50 space-y-1">
            <h4 className="font-semibold text-surface-900 dark:text-surface-100">Vitest + MSW</h4>
            <p className="text-surface-500">
              Comprehensive unit & component test coverage with mock service worker.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-surface-100 dark:bg-surface-800/50 space-y-1">
            <h4 className="font-semibold text-surface-900 dark:text-surface-100">
              Streaming Ready
            </h4>
            <p className="text-surface-500">
              Protocol-agnostic SSE and HTTP chunked stream client hooks.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-surface-100 dark:bg-surface-800/50 space-y-1">
            <h4 className="font-semibold text-surface-900 dark:text-surface-100">
              Observability Ready
            </h4>
            <p className="text-surface-500">
              Extensible Logger and error reporter adapters for Sentry / Datadog.
            </p>
          </div>
        </div>
      </Card>
    </Container>
  );
};
