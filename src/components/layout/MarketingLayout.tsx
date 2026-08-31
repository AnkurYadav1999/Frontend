import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Briefcase, ArrowRight, Sun, Moon, ShieldCheck, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { ToastContainer } from '../feedback/ToastContainer';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { toggleTheme } from '../../app/store/uiSlice';

export const MarketingLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);

  return (
    <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950 text-surface-900 dark:text-surface-100 transition-colors font-sans selection:bg-brand-500 selection:text-white">
      {/* Enterprise Header */}
      <header className="sticky top-0 z-40 h-16 bg-white/85 dark:bg-surface-900/85 backdrop-blur-xl border-b border-surface-200 dark:border-surface-800/80 shadow-sm">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2.5 font-extrabold text-xl tracking-tight text-surface-900 dark:text-surface-100 group"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center font-black shadow-md shadow-brand-600/30 group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="bg-gradient-to-r from-surface-900 via-surface-800 to-brand-700 dark:from-white dark:via-surface-100 dark:to-brand-400 bg-clip-text text-transparent">
              TalentSaaS
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-surface-600 dark:text-surface-300">
            <Link
              to="/seeker"
              className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Seeker Jobs
            </Link>
            <Link
              to="/employer"
              className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Employer Studio
            </Link>
            <Link
              to="/admin"
              className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Admin Governance
            </Link>
            <a
              href="#pricing"
              className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Enterprise Pricing
            </a>
          </nav>

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

            <Link to="/auth/seeker">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex text-xs font-bold"
              >
                Candidate Login
              </Button>
            </Link>

            <Link to="/auth/employer">
              <Button
                size="sm"
                className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Recruiter Access
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Marketing Body */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Multi-Column Enterprise Footer (Workday / Oracle Style) */}
      <footer className="bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-surface-800 text-xs pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2.5 font-bold text-base text-surface-900 dark:text-surface-100">
                <div className="w-7 h-7 rounded-lg bg-brand-600 text-white flex items-center justify-center font-black">
                  <Briefcase className="w-4 h-4" />
                </div>
                <span>TalentSaaS Cloud Platform</span>
              </div>
              <p className="text-surface-500 max-w-sm leading-relaxed">
                The global cloud talent operating system unifying Job Seekers, Employer Recruiters,
                and HR Platform Operations.
              </p>
              <div className="flex items-center gap-2 text-surface-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Enterprise SOC2 & ISO 27001 Certified</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-bold uppercase tracking-wider text-surface-900 dark:text-surface-100">
                Solutions & Portals
              </p>
              <ul className="space-y-2 text-surface-500 font-medium">
                <li>
                  <Link to="/seeker" className="hover:text-brand-600 dark:hover:text-brand-400">
                    Job Seeker Portal
                  </Link>
                </li>
                <li>
                  <Link to="/employer" className="hover:text-brand-600 dark:hover:text-brand-400">
                    Employer Studio
                  </Link>
                </li>
                <li>
                  <Link to="/admin" className="hover:text-brand-600 dark:hover:text-brand-400">
                    Admin Operations
                  </Link>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-brand-600 dark:hover:text-brand-400">
                    Enterprise Licensing
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="font-bold uppercase tracking-wider text-surface-900 dark:text-surface-100">
                Authentication
              </p>
              <ul className="space-y-2 text-surface-500 font-medium">
                <li>
                  <Link
                    to="/auth/seeker"
                    className="hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    Seeker Login / Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auth/employer"
                    className="hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    Employer Studio Login
                  </Link>
                </li>
                <li>
                  <Link to="/auth/admin" className="hover:text-brand-600 dark:hover:text-brand-400">
                    Admin Gateway
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="font-bold uppercase tracking-wider text-surface-900 dark:text-surface-100">
                Company & Legal
              </p>
              <ul className="space-y-2 text-surface-500 font-medium">
                <li>
                  <a href="#privacy" className="hover:text-brand-600 dark:hover:text-brand-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-brand-600 dark:hover:text-brand-400">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#security" className="hover:text-brand-600 dark:hover:text-brand-400">
                    Trust & Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-surface-500 font-medium">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Global Enterprise Edition — English (US)</span>
            </div>
            <p>© 2026 TalentSaaS Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
};
