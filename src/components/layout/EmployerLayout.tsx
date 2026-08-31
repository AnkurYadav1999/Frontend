import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { Briefcase, Users, BarChart3, Settings, Sun, Moon, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { ToastContainer } from '../feedback/ToastContainer';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { toggleTheme } from '../../app/store/uiSlice';
import { logout } from '../../features/auth';

export const EmployerLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);
  const user = useAppSelector((state) => state.auth.user);

  const navItems = [
    { label: 'Job Postings', path: '/employer', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Applicants ATS', path: '/employer/applicants', icon: <Users className="w-4 h-4" /> },
    { label: 'Analytics', path: '/employer/analytics', icon: <BarChart3 className="w-4 h-4" /> },
    {
      label: 'Company Settings',
      path: '/employer/settings',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950 text-surface-900 dark:text-surface-100 transition-colors">
      <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-800">
        <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/employer"
              className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-surface-900 dark:text-surface-100"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black">
                <Briefcase className="w-5 h-5" />
              </div>
              <span>EmployerStudio</span>
            </Link>
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

            <div className="flex items-center gap-3 pl-3 border-l border-surface-200 dark:border-surface-800">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-surface-900 dark:text-surface-100">
                  {user?.companyName || 'TechCorp Solutions'}
                </p>
                <p className="text-[10px] text-surface-500">{user?.name || 'Employer Admin'}</p>
              </div>
              <Link to="/auth/employer" onClick={() => dispatch(logout())}>
                <Button
                  variant="ghost"
                  size="sm"
                  title="Sign out"
                  className="p-1.5 text-surface-400 hover:text-surface-600"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-64 bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-800 p-4 flex flex-col justify-between hidden lg:flex">
          <div className="space-y-6">
            <div>
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-surface-400 mb-2">
                Employer Dashboard
              </p>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/employer'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                          : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-200">
            <p className="font-bold">Active Employer Plan</p>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">
              Enterprise Job Posting License
            </p>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};
