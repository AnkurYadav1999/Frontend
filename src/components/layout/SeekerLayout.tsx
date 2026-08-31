import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Briefcase, Bookmark, Sun, Moon, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { ToastContainer } from '../feedback/ToastContainer';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { toggleTheme } from '../../app/store/uiSlice';
import { logout } from '../../features/auth';

export const SeekerLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950 text-surface-900 dark:text-surface-100 transition-colors">
      <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-800">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              to="/seeker"
              className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-surface-900 dark:text-surface-100"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-black">
                <Briefcase className="w-5 h-5" />
              </div>
              <span>JobSeeker</span>
            </Link>

            <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
              <Link
                to="/seeker"
                className="px-3 py-2 rounded-lg bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 font-semibold"
              >
                Explore Jobs
              </Link>
              <Link
                to="/seeker/applications"
                className="px-3 py-2 rounded-lg text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                My Applications
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch(toggleTheme())}
              aria-label="Toggle theme"
              className="p-2 rounded-full"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-surface-600" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="p-2 rounded-full text-surface-600 dark:text-surface-300"
            >
              <Bookmark className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-2 pl-3 border-l border-surface-200 dark:border-surface-800">
              <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 flex items-center justify-center font-bold text-xs">
                {user?.name?.charAt(0) || 'S'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-surface-900 dark:text-surface-100 leading-none">
                  {user?.name || 'Job Seeker'}
                </p>
                <p className="text-[10px] text-surface-500">
                  {user?.email || 'seeker@example.com'}
                </p>
              </div>

              <Link to="/auth/seeker" onClick={() => dispatch(logout())}>
                <Button
                  variant="ghost"
                  size="sm"
                  title="Sign out"
                  className="p-1.5 ml-1 text-surface-400 hover:text-surface-600"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

      <ToastContainer />
    </div>
  );
};
