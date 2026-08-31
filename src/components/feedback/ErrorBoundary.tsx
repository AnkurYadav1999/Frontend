import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';
import { errorReporter } from '../../lib/observability';
import { normalizeError } from '../../lib/error';

interface Props {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const normalized = normalizeError(error);
    errorReporter.captureException(normalized, { componentStack: errorInfo.componentStack });
  }

  public reset = (): void => {
    this.props.onReset?.();
    this.setState({ hasError: false, error: null });
  };

  public override render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(this.state.error, this.reset);
      }
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center bg-red-50/50 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-900/50">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400 mb-4">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2">
            Something went wrong
          </h3>
          <p className="text-xs text-red-700 dark:text-red-300 max-w-md mb-6 font-mono bg-white/60 dark:bg-black/40 p-3 rounded-lg border border-red-200 dark:border-red-900/40">
            {this.state.error.message}
          </p>
          <Button
            variant="danger"
            size="sm"
            onClick={this.reset}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
