import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/store';
import { UserRole } from '../lib/auth';

interface RoleGuardProps {
  children: React.ReactElement;
  allowedRoles: UserRole[];
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles }) => {
  const { activeRole, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated && activeRole !== 'guest') {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(activeRole)) {
    // Redirect to default home or respective allowed portal
    if (activeRole === 'seeker') return <Navigate to="/seeker" replace />;
    if (activeRole === 'employer') return <Navigate to="/employer" replace />;
    if (activeRole === 'admin') return <Navigate to="/admin" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};
