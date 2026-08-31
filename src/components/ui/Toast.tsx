import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';
import { Button } from './Button';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps {
  id: string;
  type?: ToastType;
  title: string;
  message?: string;
  durationMs?: number;
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type = 'info',
  title,
  message,
  durationMs = 5000,
  onDismiss,
}) => {
  useEffect(() => {
    if (durationMs > 0) {
      const timer = setTimeout(() => {
        onDismiss(id);
      }, durationMs);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [id, durationMs, onDismiss]);

  const icons = {
    info: <Info className="w-5 h-5 text-sky-500" />,
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
  };

  const borderClasses = {
    info: 'border-l-4 border-l-sky-500',
    success: 'border-l-4 border-l-emerald-500',
    warning: 'border-l-4 border-l-amber-500',
    error: 'border-l-4 border-l-red-500',
  };

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 p-4 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-lg shadow-lg ${borderClasses[type]} min-w-[320px] max-w-md animate-slide-up`}
    >
      <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-surface-900 dark:text-surface-100">{title}</h4>
        {message && (
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">{message}</p>
        )}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDismiss(id)}
        className="p-1 rounded-full text-surface-400 hover:text-surface-600 dark:hover:text-surface-200"
        aria-label="Dismiss toast"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};
