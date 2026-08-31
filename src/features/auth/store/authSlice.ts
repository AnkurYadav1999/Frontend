import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRole, UserProfile } from '../../../lib/auth';

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  activeRole: UserRole;
}

const mockUsers: Record<UserRole, UserProfile | null> = {
  guest: null,
  seeker: {
    id: 'user-seeker-1',
    name: 'Alex Morgan',
    email: 'alex.seeker@example.com',
    role: 'seeker',
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  },
  employer: {
    id: 'user-employer-1',
    name: 'Sarah Chen',
    email: 'sarah@techcorp.io',
    role: 'employer',
    companyName: 'TechCorp Solutions',
    avatarUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
  },
  admin: {
    id: 'user-admin-1',
    name: 'Marcus Vance',
    email: 'admin@jobplatform.com',
    role: 'admin',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
};

const initialState: AuthState = {
  isAuthenticated: true,
  user: mockUsers.seeker,
  activeRole: 'seeker',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<UserRole>) => {
      const role = action.payload;
      state.activeRole = role;
      state.user = mockUsers[role];
      state.isAuthenticated = role !== 'guest';
    },
    login: (state, action: PayloadAction<UserProfile>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.activeRole = action.payload.role;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.activeRole = 'guest';
    },
  },
});

export const { setRole, login, logout } = authSlice.actions;
export default authSlice.reducer;
