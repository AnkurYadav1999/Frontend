import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layers, Home, Settings, HelpCircle, Radio } from 'lucide-react';
import { useAppSelector } from '../../app/store';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Overview', path: '/', icon: <Home className="w-4 h-4" /> },
  { label: 'Example Feature', path: '/example', icon: <Layers className="w-4 h-4" /> },
  { label: 'Streaming Demo', path: '/streaming', icon: <Radio className="w-4 h-4" /> },
  { label: 'Settings', path: '/settings', icon: <Settings className="w-4 h-4" /> },
];

export const Sidebar: React.FC = () => {
  const { sidebarOpen } = useAppSelector((state) => state.ui);

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-20 w-64 bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-800 transition-transform duration-300 ease-in-out flex flex-col pt-16 lg:pt-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="p-4 flex-1 overflow-y-auto flex flex-col justify-between">
        <div className="space-y-6">
          <div>
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-surface-400 dark:text-surface-500 mb-2">
              Navigation
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 font-semibold'
                        : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-surface-100'
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

        <div className="pt-4 border-t border-surface-200 dark:border-surface-800 text-xs text-surface-400">
          <div className="flex items-center gap-2 px-3 py-2">
            <HelpCircle className="w-4 h-4" />
            <span>Architecture v1.0.0</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
