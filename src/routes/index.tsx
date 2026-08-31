import React, { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MarketingLayout } from '../components/layout/MarketingLayout';
import { SeekerLayout } from '../components/layout/SeekerLayout';
import { EmployerLayout } from '../components/layout/EmployerLayout';
import { AdminLayout } from '../components/layout/AdminLayout';
import { AsyncBoundary } from '../components/feedback/AsyncBoundary';
import { RoleGuard } from './RoleGuard';
import { LandingPage } from '../features/marketing';
import { SeekerAuthPage, EmployerAuthPage, AdminAuthPage } from '../features/auth';
import { NotFoundPage } from '../pages/NotFoundPage';

// Route-level Code-Splitting / Lazy Loading for Portals
const SeekerDashboardPage = lazy(() =>
  import('../features/seeker').then((m) => ({ default: m.SeekerDashboardPage }))
);
const EmployerDashboardPage = lazy(() =>
  import('../features/employer').then((m) => ({ default: m.EmployerDashboardPage }))
);
const AdminDashboardPage = lazy(() =>
  import('../features/admin').then((m) => ({ default: m.AdminDashboardPage }))
);
const SettingsPage = lazy(() =>
  import('../pages/SettingsPage').then((m) => ({ default: m.SettingsPage }))
);

const router = createBrowserRouter([
  // 1. Dedicated Authentication Routes
  {
    path: '/auth/seeker',
    element: <SeekerAuthPage />,
  },
  {
    path: '/auth/employer',
    element: <EmployerAuthPage />,
  },
  {
    path: '/auth/admin',
    element: <AdminAuthPage />,
  },

  // 2. Marketing / Public Landing Section
  {
    path: '/',
    element: <MarketingLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },

  // 3. Job Seeker Portal Section
  {
    path: '/seeker',
    element: (
      <RoleGuard allowedRoles={['seeker', 'admin']}>
        <SeekerLayout />
      </RoleGuard>
    ),
    children: [
      {
        index: true,
        element: (
          <AsyncBoundary>
            <SeekerDashboardPage />
          </AsyncBoundary>
        ),
      },
      {
        path: 'applications',
        element: (
          <AsyncBoundary>
            <SeekerDashboardPage />
          </AsyncBoundary>
        ),
      },
    ],
  },

  // 4. Employer / Job Poster Portal Section
  {
    path: '/employer',
    element: (
      <RoleGuard allowedRoles={['employer', 'admin']}>
        <EmployerLayout />
      </RoleGuard>
    ),
    children: [
      {
        index: true,
        element: (
          <AsyncBoundary>
            <EmployerDashboardPage />
          </AsyncBoundary>
        ),
      },
      {
        path: 'applicants',
        element: (
          <AsyncBoundary>
            <EmployerDashboardPage />
          </AsyncBoundary>
        ),
      },
      {
        path: 'analytics',
        element: (
          <AsyncBoundary>
            <SettingsPage />
          </AsyncBoundary>
        ),
      },
      {
        path: 'settings',
        element: (
          <AsyncBoundary>
            <SettingsPage />
          </AsyncBoundary>
        ),
      },
    ],
  },

  // 5. Platform Admin Portal Section
  {
    path: '/admin',
    element: (
      <RoleGuard allowedRoles={['admin']}>
        <AdminLayout />
      </RoleGuard>
    ),
    children: [
      {
        index: true,
        element: (
          <AsyncBoundary>
            <AdminDashboardPage />
          </AsyncBoundary>
        ),
      },
      {
        path: 'moderation',
        element: (
          <AsyncBoundary>
            <AdminDashboardPage />
          </AsyncBoundary>
        ),
      },
      {
        path: 'users',
        element: (
          <AsyncBoundary>
            <AdminDashboardPage />
          </AsyncBoundary>
        ),
      },
      {
        path: 'settings',
        element: (
          <AsyncBoundary>
            <SettingsPage />
          </AsyncBoundary>
        ),
      },
    ],
  },

  // 6. 404 Fallback
  {
    path: '*',
    element: <MarketingLayout />,
    children: [
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
