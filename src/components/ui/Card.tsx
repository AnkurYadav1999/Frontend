import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  header,
  footer,
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm overflow-hidden ${className}`}
      {...props}
    >
      {header && (
        <div className="px-6 py-4 border-b border-surface-200 dark:border-surface-800 font-semibold text-surface-900 dark:text-surface-100">
          {header}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-3 bg-surface-50 dark:bg-surface-950/50 border-t border-surface-200 dark:border-surface-800 text-xs text-surface-500">
          {footer}
        </div>
      )}
    </div>
  );
};
