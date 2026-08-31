import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { CreateJobModal } from '../components/CreateJobModal';
import uiReducer from '../../../app/store/uiSlice';
import authReducer from '../../auth/store/authSlice';

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  const store = configureStore({
    reducer: {
      ui: uiReducer,
      auth: authReducer,
    },
  });

  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </Provider>
  );
};

describe('CreateJobModal Component', () => {
  it('renders form inputs correctly when modal is open', () => {
    renderWithProviders(<CreateJobModal isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByLabelText(/Job Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Department/i)).toBeInTheDocument();
  });

  it('submits valid job posting payload successfully', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderWithProviders(<CreateJobModal isOpen={true} onClose={onClose} />);

    await user.type(screen.getByLabelText(/Job Title/i), 'Lead Fullstack Architect');
    await user.type(
      screen.getByPlaceholderText(/Detailed description of responsibilities/i),
      'Leading front-end and back-end integration for our SaaS platform.'
    );

    const submitBtn = screen.getByRole('button', { name: /Publish Job Listing/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });
});
