import React from 'react';
import { Shield, Sliders } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { config } from '../lib/config';

export const SettingsPage: React.FC = () => {
  return (
    <Container size="lg" className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
          Environment & System Settings
        </h1>
        <p className="text-xs text-surface-500 mt-1">
          Displays validated application configuration metadata loaded at startup.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          header={
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-brand-600" />
              <span>Active Configuration</span>
            </div>
          }
        >
          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-surface-200 dark:border-surface-800">
              <span className="text-surface-500">Environment:</span>
              <Badge variant="info">{config.env}</Badge>
            </div>
            <div className="flex justify-between py-1 border-b border-surface-200 dark:border-surface-800">
              <span className="text-surface-500">REST API Base URL:</span>
              <span className="text-surface-900 dark:text-surface-100">
                {config.api.restBaseUrl}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-surface-200 dark:border-surface-800">
              <span className="text-surface-500">GraphQL Endpoint:</span>
              <span className="text-surface-900 dark:text-surface-100">
                {config.api.graphqlEndpoint}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-surface-200 dark:border-surface-800">
              <span className="text-surface-500">API Timeout:</span>
              <span className="text-surface-900 dark:text-surface-100">
                {config.api.timeoutMs}ms
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-surface-500">Log Level:</span>
              <span className="text-surface-900 dark:text-surface-100 uppercase">
                {config.logging.level}
              </span>
            </div>
          </div>
        </Card>

        <Card
          header={
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              <span>Feature Flags</span>
            </div>
          }
        >
          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-surface-200 dark:border-surface-800">
              <span className="text-surface-500">GraphQL API:</span>
              <Badge variant={config.features.enableGraphQL ? 'success' : 'neutral'}>
                {config.features.enableGraphQL ? 'ENABLED' : 'DISABLED'}
              </Badge>
            </div>
            <div className="flex justify-between py-1 border-b border-surface-200 dark:border-surface-800">
              <span className="text-surface-500">Observability:</span>
              <Badge variant={config.features.enableObservability ? 'success' : 'neutral'}>
                {config.features.enableObservability ? 'ENABLED' : 'DISABLED'}
              </Badge>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-surface-500">Network Mocking:</span>
              <Badge variant={config.features.mockNetworkInDev ? 'warning' : 'neutral'}>
                {config.features.mockNetworkInDev ? 'ACTIVE (MSW)' : 'OFF'}
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
};
