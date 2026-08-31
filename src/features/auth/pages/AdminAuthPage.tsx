import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, Key, ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useAppDispatch } from '../../../app/store';
import { login } from '../store/authSlice';

export const AdminAuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityToken, setSecurityToken] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      login({
        id: 'admin-1',
        name: 'Marcus Vance',
        email: email || 'admin@jobplatform.com',
        role: 'admin',
      })
    );
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-950 text-surface-100 font-sans antialiased relative p-4 overflow-hidden selection:bg-purple-500 selection:text-white">
      {/* Dark Ambient Glow Background Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <Link
            to="/"
            className="inline-flex items-center gap-3 font-extrabold text-2xl tracking-tight text-white group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black shadow-xl shadow-purple-500/30 group-hover:scale-105 transition-transform">
              <Shield className="w-7 h-7" />
            </div>
            <span className="bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
              PlatformAdmin
            </span>
          </Link>
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              Restricted Administrative Gateway
            </span>
          </div>
        </div>

        {/* Security Warning Notice */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs text-amber-200">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Authorized platform administrators only. All access attempts are logged with IP
            telemetry and audited by cybersecurity monitoring.
          </p>
        </div>

        {/* Glassmorphic Form Container */}
        <div className="p-8 rounded-3xl bg-surface-900/90 border border-surface-800 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Super Administrator Sign In
            </h2>
            <p className="text-xs text-surface-400">
              Authenticate with root administrator credentials & MFA token.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              label="Admin Email Address"
              placeholder="admin@jobplatform.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4 text-surface-400" />}
              required
            />

            <Input
              type="password"
              label="Master Access Key / Password"
              placeholder="••••••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4 text-surface-400" />}
              required
            />

            <Input
              type="text"
              label="MFA Hardware Token / Security PIN (Optional)"
              placeholder="6-digit PIN code"
              value={securityToken}
              onChange={(e) => setSecurityToken(e.target.value)}
              leftIcon={<Key className="w-4 h-4 text-purple-400" />}
            />

            <Button
              type="submit"
              size="lg"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 pt-3 pb-3"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Authenticate & Open Admin Console
            </Button>
          </form>

          <div className="pt-2 border-t border-surface-800/80 flex items-center justify-between text-xs text-surface-400">
            <Link to="/" className="hover:text-surface-200 transition-colors">
              ← Back to Marketing Site
            </Link>
            <span className="text-[11px] font-mono text-purple-400 font-semibold">
              v2.4.0-Enterprise
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
