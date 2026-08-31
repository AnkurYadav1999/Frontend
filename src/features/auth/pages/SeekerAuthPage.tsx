import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Lock,
  Mail,
  User,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useAppDispatch } from '../../../app/store';
import { login } from '../store/authSlice';

export const SeekerAuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      login({
        id: 'seeker-1',
        name: fullName || 'Alex Morgan',
        email: email || 'alex.seeker@example.com',
        role: 'seeker',
      })
    );
    navigate('/seeker');
  };

  return (
    <div className="min-h-screen flex bg-surface-950 text-surface-100 font-sans antialiased overflow-hidden selection:bg-brand-500 selection:text-white">
      {/* Left Visual Panel - Candidate Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-brand-950 via-surface-900 to-brand-900 p-12 flex-col justify-between overflow-hidden border-r border-surface-800/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.3),rgba(255,255,255,0))]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          <Link
            to="/"
            className="flex items-center gap-3 font-extrabold text-2xl tracking-tight text-white group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center font-black shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="bg-gradient-to-r from-white via-brand-100 to-brand-300 bg-clip-text text-transparent">
              TalentSaaS
            </span>
          </Link>
        </div>

        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Job Seeker Candidate Portal</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight">
            Unlock Top Remote & Tech Career Opportunities
          </h1>

          <p className="text-surface-300 text-sm leading-relaxed">
            Join over 120,000+ software engineers, designers, and product leaders applying to
            verified high-growth SaaS companies and tech scale-ups.
          </p>

          <div className="space-y-3 pt-2">
            {[
              'Instant 1-Click application submission with smart profile sync',
              'Direct recruiter visibility & transparent hiring stages',
              'Verified salary ranges & remote-first employment badges',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-xs text-surface-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Social Proof Quote Card */}
          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-3 shadow-2xl">
            <p className="text-xs text-surface-200 italic leading-relaxed">
              "TalentSaaS completely changed how I found my Senior Frontend role. Transparent
              compensation up front and zero recruiter ghosting."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                AM
              </div>
              <div>
                <p className="text-xs font-bold text-white">Alex Morgan</p>
                <p className="text-[10px] text-surface-400">Senior React Engineer @ CloudScale</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-surface-400">
          <span>© 2026 TalentSaaS Inc.</span>
          <span className="flex items-center gap-1.5 text-surface-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> SSL Encrypted Portal
          </span>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isSignUp ? 'Create your Candidate Account' : 'Welcome Back, Seeker'}
            </h2>
            <p className="text-xs text-surface-400">
              {isSignUp
                ? 'Sign up in 30 seconds to explore top tech jobs'
                : 'Enter your credentials to access your job applications'}
            </p>
          </div>

          {/* Role Tab Navigation Toggle */}
          <div className="p-1 rounded-xl bg-surface-900 border border-surface-800 flex text-xs font-semibold">
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2.5 rounded-lg transition-all ${
                !isSignUp
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-surface-400 hover:text-surface-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2.5 rounded-lg transition-all ${
                isSignUp
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-surface-400 hover:text-surface-200'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Social Sign In Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-surface-900 hover:bg-surface-800 border border-surface-800 text-xs font-semibold text-surface-200 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-surface-900 hover:bg-surface-800 border border-surface-800 text-xs font-semibold text-surface-200 transition-colors"
            >
              <svg className="w-4 h-4 fill-current text-blue-400" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <span>LinkedIn</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-surface-800 w-full" />
            <span className="bg-surface-950 px-3 text-[10px] uppercase font-bold text-surface-500 tracking-wider absolute">
              Or email login
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <Input
                label="Full Name"
                placeholder="Alex Morgan"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                leftIcon={<User className="w-4 h-4 text-surface-400" />}
                required
              />
            )}

            <Input
              type="email"
              label="Email Address"
              placeholder="alex.seeker@example.com"
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
                    className="rounded border-surface-700 bg-surface-900 text-brand-600 focus:ring-brand-500"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="text-brand-400 hover:underline font-semibold">
                  Forgot password?
                </a>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {isSignUp ? 'Create Candidate Profile' : 'Sign In to JobSeeker'}
            </Button>
          </form>

          <p className="text-center text-xs text-surface-400">
            Hiring for a company?{' '}
            <Link to="/auth/employer" className="text-emerald-400 hover:underline font-bold">
              Sign in to Employer Studio →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
