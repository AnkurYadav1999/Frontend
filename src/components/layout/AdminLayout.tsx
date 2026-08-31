import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { Shield, CheckSquare, Users, Activity, Settings, Sun, Moon, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { ToastContainer } from '../feedback/ToastContainer';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { toggleTheme } from '../../app/store/uiSlice';
import { logout } from '../../features/auth';

export const AdminLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);
  const user = useAppSelector((state) => state.auth.user);

  const navItems = [
    { label: 'Platform Telemetry', path: '/admin', icon: <Activity className="w-4 h-4" /> },
    {
      label: 'Job Moderation Queue',
      path: '/admin/moderation',
      icon: <CheckSquare className="w-4 h-4" />,
    },
    { label: 'Users & Employers', path: '/admin/users', icon: <Users className="w-4 h-4" /> },
    { label: 'System Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface-950 text-surface-100 transition-colors">
      <header className="sticky top-0 z-30 h-16 bg-surface-900 border-b border-surface-800">
        <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-white"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-black">
                <Shield className="w-5 h-5" />
              </div>
              <span>PlatformAdmin</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch(toggleTheme())}
              aria-label="Toggle theme"
              className="p-2 rounded-full text-surface-400 hover:text-white"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-surface-300" />
              )}
            </Button>

            <div className="flex items-center gap-3 pl-3 border-l border-surface-800">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white">{user?.name || 'Platform Admin'}</p>
                <p className="text-[10px] text-purple-400 font-semibold">Super Administrator</p>
              </div>
              <Link to="/auth/admin" onClick={() => dispatch(logout())}>
                <Button
                  variant="ghost"
                  size="sm"
                  title="Sign out"
                  className="p-1.5 text-surface-400 hover:text-white"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-64 bg-surface-900 border-r border-surface-800 p-4 flex flex-col justify-between hidden lg:flex">
          <div className="space-y-6">
            <div>
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-surface-500 mb-2">
                Administration
              </p>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/admin'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-purple-950/60 text-purple-400 border border-purple-800'
                          : 'text-surface-400 hover:bg-surface-800 hover:text-white'
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

          <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-900/40 text-xs text-purple-200">
            <p className="font-bold">System Status: Operational</p>
            <p className="text-[11px] text-purple-400 mt-0.5">SaaS Multitenant Infrastructure</p>
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
