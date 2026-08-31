import { describe, it, expect } from 'vitest';
import authReducer, { setRole, logout } from '../store/authSlice';

describe('authSlice Reducer & Role State', () => {
  const initialState = {
    isAuthenticated: true,
    user: {
      id: 'user-seeker-1',
      name: 'Alex Morgan',
      email: 'alex.seeker@example.com',
      role: 'seeker' as const,
    },
    activeRole: 'seeker' as const,
  };

  it('switches active role and updates user session profile', () => {
    const state = authReducer(initialState, setRole('employer'));
    expect(state.activeRole).toBe('employer');
    expect(state.user?.name).toBe('Sarah Chen');
    expect(state.user?.role).toBe('employer');
    expect(state.isAuthenticated).toBe(true);
  });

  it('switches to guest role and marks user as unauthenticated', () => {
    const state = authReducer(initialState, setRole('guest'));
    expect(state.activeRole).toBe('guest');
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('handles logout action', () => {
    const state = authReducer(initialState, logout());
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.activeRole).toBe('guest');
  });
});
