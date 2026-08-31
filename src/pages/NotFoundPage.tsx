import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <Container size="sm" className="py-16 text-center animate-fade-in">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-surface-400 dark:text-surface-500">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-surface-900 dark:text-surface-100">404</h1>
        <h2 className="text-lg font-semibold text-surface-700 dark:text-surface-300">
          Page Not Found
        </h2>
        <p className="text-xs text-surface-500 max-w-sm">
          The route you are looking for does not exist or has been moved.
        </p>
        <Link to="/">
          <Button leftIcon={<Home className="w-4 h-4" />}>Back to Home</Button>
        </Link>
      </div>
    </Container>
  );
};
