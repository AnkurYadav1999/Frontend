import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, ChevronUp, ChevronDown, User, Briefcase, Shield, Globe } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { setRole } from '../store/authSlice';
import { UserRole } from '../../../lib/auth';

export const RoleSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { activeRole, user } = useAppSelector((state) => state.auth);

  const roles: Array<{
    id: UserRole;
    label: string;
    path: string;
    icon: React.ReactNode;
    color: string;
  }> = [
    {
      id: 'guest',
      label: 'Public Marketing',
      path: '/',
      icon: <Globe className="w-4 h-4" />,
      color: 'bg-surface-500',
    },
    {
      id: 'seeker',
      label: 'Job Seeker Portal',
      path: '/seeker',
      icon: <User className="w-4 h-4" />,
      color: 'bg-brand-500',
    },
    {
      id: 'employer',
      label: 'Employer / Poster',
      path: '/employer',
      icon: <Briefcase className="w-4 h-4" />,
      color: 'bg-emerald-500',
    },
    {
      id: 'admin',
      label: 'Platform Admin',
      path: '/admin',
      icon: <Shield className="w-4 h-4" />,
      color: 'bg-purple-500',
    },
  ];

  const handleRoleSelect = (role: UserRole, path: string) => {
    dispatch(setRole(role));
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isOpen && (
        <div className="mb-2 p-2 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-xl shadow-2xl space-y-1 min-w-[220px] animate-slide-up">
          <div className="px-3 py-1.5 border-b border-surface-100 dark:border-surface-800">
            <p className="text-[11px] font-semibold text-surface-400 uppercase tracking-wider">
              Switch Portal Role
            </p>
            {user && (
              <p className="text-xs font-medium text-surface-700 dark:text-surface-300 truncate">
                {user.name}
              </p>
            )}
          </div>
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => handleRoleSelect(r.id, r.path)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeRole === r.id
                  ? 'bg-surface-100 dark:bg-surface-800 text-surface-900 dark:text-surface-100 font-bold'
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${r.color}`} />
                <span>{r.label}</span>
              </div>
              {r.icon}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-surface-900 text-white dark:bg-surface-100 dark:text-surface-900 rounded-full shadow-lg hover:shadow-xl transition-all text-xs font-semibold"
      >
        <UserCheck className="w-4 h-4 text-brand-400" />
        <span>
          Role: <strong className="capitalize">{activeRole}</strong>
        </span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};
