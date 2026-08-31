import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Building2,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Users,
  Mail,
  Lock,
  Building,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useAppDispatch } from '../../../app/store';
import { login } from '../store/authSlice';

export const EmployerAuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [fullName, setFullName] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      login({
        id: 'employer-1',
        name: fullName || 'Sarah Chen',
        email: email || 'sarah@techcorp.io',
        role: 'employer',
        companyName: companyName || 'TechCorp Solutions',
      })
    );
    navigate('/employer');
  };

  return (
    <div className="min-h-screen flex bg-surface-950 text-surface-100 font-sans antialiased overflow-hidden selection:bg-emerald-500 selection:text-white">
      {/* Left Visual Panel - Employer Corporate Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-emerald-950 via-surface-900 to-emerald-900 p-12 flex-col justify-between overflow-hidden border-r border-surface-800/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.25),rgba(255,255,255,0))]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          <Link
            to="/"
            className="flex items-center gap-3 font-extrabold text-2xl tracking-tight text-white group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="bg-gradient-to-r from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent">
              EmployerStudio
            </span>
          </Link>
        </div>

        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Employer Recruitment & ATS Studio</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight">
            Hire Top 1% Tech & SaaS Talent Faster
          </h1>

          <p className="text-surface-300 text-sm leading-relaxed">
            Post open positions, manage incoming candidate applications, and streamline your
            recruitment pipeline with enterprise ATS tools.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-2xl font-black text-emerald-400">48 Hours</p>
              <p className="text-[11px] text-surface-400 mt-1">
                Average time to first candidate interview match
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-2xl font-black text-brand-400">14,200+</p>
              <p className="text-[11px] text-surface-400 mt-1">
                Verified senior engineers & tech leads ready
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {[
              'Unlimited job postings with custom requirement tags',
              'Built-in candidate screening & ATS stage tracker',
              'Enterprise SAML / SSO authentication & audit logs',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-xs text-surface-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-surface-400">
          <span>© 2026 TalentSaaS Employer Suite</span>
          <span className="flex items-center gap-1.5 text-surface-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Enterprise SOC2 Compliant
          </span>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isSignUp ? 'Register Employer Account' : 'Employer Recruiter Sign In'}
            </h2>
            <p className="text-xs text-surface-400">
              {isSignUp
                ? 'Start posting job listings and managing candidates today'
                : 'Enter your corporate credentials to access Employer Studio'}
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="p-1 rounded-xl bg-surface-900 border border-surface-800 flex text-xs font-semibold">
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2.5 rounded-lg transition-all ${
                !isSignUp
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-surface-400 hover:text-surface-200'
              }`}
            >
              Employer Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2.5 rounded-lg transition-all ${
                isSignUp
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-surface-400 hover:text-surface-200'
              }`}
            >
              Register Company
            </button>
          </div>

          {/* Single Sign On Option */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface-900 hover:bg-surface-800 border border-surface-800 text-xs font-semibold text-surface-200 transition-colors"
          >
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Continue with Corporate SSO / Google Workspace</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-surface-800 w-full" />
            <span className="bg-surface-950 px-3 text-[10px] uppercase font-bold text-surface-500 tracking-wider absolute">
              Or company email login
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <Input
                  label="Recruiter / Hiring Manager Name"
                  placeholder="Sarah Chen"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  leftIcon={<Users className="w-4 h-4 text-surface-400" />}
                  required
                />

                <Input
                  label="Company / Organization Name"
                  placeholder="TechCorp Solutions Inc."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  leftIcon={<Building className="w-4 h-4 text-surface-400" />}
                  required
                />
              </>
            )}

            <Input
              type="email"
              label="Work Email Address"
              placeholder="sarah@techcorp.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4 text-surface-400" />}
              required
            />

            <Input
              type="password"
              label="Password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4 text-surface-400" />}
              required
            />

            {!isSignUp && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-surface-400 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-surface-700 bg-surface-900 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Remember corporate session</span>
                </label>
                <a href="#forgot" className="text-emerald-400 hover:underline font-semibold">
                  Forgot password?
                </a>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {isSignUp ? 'Create Recruiter Workspace' : 'Sign In to Employer Studio'}
            </Button>
          </form>

          <p className="text-center text-xs text-surface-400">
            Looking for a job?{' '}
            <Link to="/auth/seeker" className="text-brand-400 hover:underline font-bold">
              Sign in as Job Seeker →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
