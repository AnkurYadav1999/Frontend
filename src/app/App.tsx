import React from 'react';
import { AppProviders } from './providers';
import { AppRouter } from '../routes';

export const App: React.FC = () => {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
};
