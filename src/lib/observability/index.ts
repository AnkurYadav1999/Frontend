import { logger } from '../logging';

export interface ErrorReporter {
  captureException(error: unknown, context?: Record<string, unknown>): void;
  setUser(user: { id: string; email?: string } | null): void;
}

export interface MetricsAdapter {
  trackEvent(eventName: string, properties?: Record<string, unknown>): void;
  trackMetric(metricName: string, value: number): void;
}

class NoopErrorReporter implements ErrorReporter {
  captureException(error: unknown, context?: Record<string, unknown>): void {
    logger.error('Captured Exception (Observability):', error, context);
  }

  setUser(user: { id: string; email?: string } | null): void {
    logger.info('Observability User Set:', user?.id ?? 'anonymous');
  }
}

class NoopMetricsAdapter implements MetricsAdapter {
  trackEvent(eventName: string, properties?: Record<string, unknown>): void {
    logger.debug(`[Metric Event] ${eventName}`, properties);
  }

  trackMetric(metricName: string, value: number): void {
    logger.debug(`[Metric Gauge] ${metricName} = ${value}`);
  }
}

export const errorReporter: ErrorReporter = new NoopErrorReporter();
export const metrics: MetricsAdapter = new NoopMetricsAdapter();
