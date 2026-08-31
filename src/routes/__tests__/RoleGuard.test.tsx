import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { RoleGuard } from '../RoleGuard';
import authReducer from '../../features/auth/store/authSlice';
import uiReducer from '../../app/store/uiSlice';

const renderGuardWithRole = (activeRole: 'seeker' | 'employer' | 'admin' | 'guest') => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      ui: uiReducer,
    },
    preloadedState: {
      auth: {
        isAuthenticated: activeRole !== 'guest',
        activeRole,
        user:
          activeRole === 'guest'
            ? null
            : {
                id: '1',
                name: 'Test',
                email: 'test@example.com',
                role: activeRole,
              },
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <RoleGuard allowedRoles={['admin']}>
                <div>Admin Secret Portal</div>
              </RoleGuard>
            }
          />
          <Route path="/" element={<div>Public Home</div>} />
          <Route path="/seeker" element={<div>Seeker Portal Home</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('RoleGuard Authorization Component', () => {
  it('allows access when activeRole is in allowedRoles', () => {
    renderGuardWithRole('admin');
    expect(screen.getByText('Admin Secret Portal')).toBeInTheDocument();
  });

  it('redirects unauthorized seeker role away from admin protected route', () => {
    renderGuardWithRole('seeker');
    expect(screen.getByText('Seeker Portal Home')).toBeInTheDocument();
  });
});
