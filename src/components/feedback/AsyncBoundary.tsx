import React, { Suspense } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { Spinner } from '../ui/Spinner';

interface AsyncBoundaryProps {
  children: React.ReactNode;
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ReactNode | ((error: Error, reset: () => void) => React.ReactNode);
  onReset?: () => void;
}

export const AsyncBoundary: React.FC<AsyncBoundaryProps> = ({
  children,
  loadingFallback,
  errorFallback,
  onReset,
}) => {
  const defaultLoading = (
    <div className="flex items-center justify-center p-12">
      <Spinner size="lg" className="text-brand-600" />
    </div>
  );

  return (
    <ErrorBoundary fallback={errorFallback} onReset={onReset}>
      <Suspense fallback={loadingFallback || defaultLoading}>{children}</Suspense>
    </ErrorBoundary>
  );
};
