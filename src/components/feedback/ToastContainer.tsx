import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { dismissToast } from '../../app/store/uiSlice';
import { Toast } from '../ui/Toast';

export const ToastContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector((state) => state.ui.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-auto">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          durationMs={toast.durationMs}
          onDismiss={(id) => dispatch(dismissToast(id))}
        />
      ))}
    </div>
  );
};
