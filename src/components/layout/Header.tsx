import React from 'react';
import { Menu, Moon, Sun, Bell, Activity } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { toggleSidebar, toggleTheme } from '../../app/store/uiSlice';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.ui);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-800 transition-colors">
      <div className="h-full px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(toggleSidebar())}
            aria-label="Toggle navigation menu"
            className="p-2"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-2 font-bold text-lg text-surface-900 dark:text-surface-100">
            <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-black">
              <Activity className="w-5 h-5" />
            </div>
            <span>Enterprise React</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(toggleTheme())}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-full"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-surface-600" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            aria-label="Notifications"
            className="p-2 rounded-full text-surface-600 dark:text-surface-300 relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-500" />
          </Button>
        </div>
      </div>
    </header>
  );
};
