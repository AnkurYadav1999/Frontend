import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Globe,
  ChevronRight,
  Search,
  Lock,
  FileCheck,
  Sparkles,
} from 'lucide-react';
import { Container } from '../../../components/layout/Container';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';

export const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'seeker' | 'employer' | 'admin'>('seeker');

  const customerLogos = ['Microsoft', 'Oracle', 'Workday', 'Salesforce', 'Snowflake', 'Datadog'];

  const tabs = [
    { key: 'seeker' as const, label: 'For Candidates', icon: Briefcase },
    { key: 'employer' as const, label: 'For Employers', icon: Building2 },
    { key: 'admin' as const, label: 'Platform Admin', icon: ShieldCheck },
  ];

  return (
    <div className="font-sans selection:bg-brand-500 selection:text-white space-y-20 pb-20">
      {/* Announcement Bar */}
      <div className="bg-surface-950 text-white text-xs py-2.5 px-4 border-b border-surface-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded-full bg-brand-500/30 text-brand-300 font-bold uppercase text-[10px] tracking-wide border border-brand-400/30">
              NEW REPORT
            </span>
            <span className="text-surface-200 font-medium">
              2026 Enterprise SaaS Hiring & Global Talent Market Index is live
            </span>
          </div>
          <Link
            to="/auth/employer"
            className="inline-flex items-center gap-1 font-semibold text-brand-300 hover:text-white transition-colors"
          >
            <span>Read report</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-8 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-brand-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />

        <Container size="xl" className="relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-surface-800/90 border border-surface-200 dark:border-surface-700 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs font-semibold text-surface-800 dark:text-surface-200">
              Enterprise Talent Operating System
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-[1.1] text-surface-900 dark:text-surface-50">
            The talent platform built for
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              {' '}
              enterprise hiring teams
            </span>
          </h1>

          <p className="text-base sm:text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto leading-relaxed font-normal">
            One system for job seekers, hiring teams, and platform operators — built to move faster
            than a spreadsheet and scale further than a job board.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/auth/seeker">
              <Button
                size="lg"
                className="w-full sm:w-auto font-bold px-7 bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/20"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Find opportunities
              </Button>
            </Link>
            <Link to="/auth/employer">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto font-bold px-7 border-surface-300 dark:border-surface-700"
              >
                Hire on the platform
              </Button>
            </Link>
          </div>

          {/* Quick Search bar */}
          <div className="max-w-2xl mx-auto mt-6 p-2.5 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 shadow-xl flex flex-col sm:flex-row items-center gap-2">
            <div className="flex-1 flex items-center gap-2.5 px-3 w-full">
              <Search className="w-4 h-4 text-surface-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by title, skill, or company..."
                className="w-full bg-transparent text-sm text-surface-900 dark:text-surface-100 focus:outline-none placeholder-surface-400 py-1.5"
              />
            </div>
            <div className="w-full sm:w-40 border-t sm:border-t-0 sm:border-l border-surface-200 dark:border-surface-800 pt-2 sm:pt-0 sm:pl-3">
              <select className="w-full bg-transparent text-sm text-surface-600 dark:text-surface-300 focus:outline-none cursor-pointer">
                <option>All locations</option>
                <option>Remote</option>
                <option>Hybrid</option>
                <option>Onsite</option>
              </select>
            </div>
            <Link to="/auth/seeker" className="w-full sm:w-auto shrink-0">
              <Button
                size="sm"
                className="w-full bg-brand-600 hover:bg-brand-500 font-semibold px-6"
              >
                Search
              </Button>
            </Link>
          </div>

          {/* Customer Logos */}
          <div className="pt-12 max-w-4xl mx-auto border-t border-surface-200 dark:border-surface-800/80">
            <p className="text-[11px] font-bold uppercase tracking-wider text-surface-400 mb-5">
              Trusted by hiring teams at
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-8 gap-y-4 items-center justify-items-center opacity-70 hover:opacity-100 transition-opacity">
              {customerLogos.map((name) => (
                <span
                  key={name}
                  className="text-sm font-extrabold tracking-wider text-surface-700 dark:text-surface-300 uppercase"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Capability Tabs Section */}
      <section className="bg-surface-100/80 dark:bg-surface-900/60 py-16 border-y border-surface-200 dark:border-surface-800">
        <Container size="xl" className="space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <Badge variant="info" className="px-3 py-1 text-xs">
              Unified Platform Capabilities
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-surface-50 tracking-tight">
              One system, every role
            </h2>
            <p className="text-sm text-surface-500 dark:text-surface-400">
              Purpose-built workflows for candidates, hiring teams, and platform operators.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="p-1.5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-md inline-flex gap-1.5 text-xs font-bold">
              {tabs.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all ${activeTab === key
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                      : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700/60'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white dark:bg-surface-900 p-8 sm:p-12 rounded-3xl border border-surface-200 dark:border-surface-800 shadow-xl">
            {activeTab === 'seeker' && (
              <>
                <div className="space-y-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-surface-900 dark:text-surface-50">
                    Transparent job discovery
                  </h3>
                  <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                    Search verified technical roles with clear salary ranges, work-type filters, and
                    one-click applications.
                  </p>
                  <ul className="space-y-3 text-xs font-semibold text-surface-700 dark:text-surface-300">
                    {[
                      'Verified remote, hybrid, and onsite listings',
                      'Real-time application status tracking',
                      'No recruiter spam or phantom postings',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/auth/seeker">
                    <Button className="font-bold bg-brand-600 hover:bg-brand-500 text-white">
                      Browse candidate portal →
                    </Button>
                  </Link>
                </div>

                <div className="p-6 rounded-2xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-surface-200 dark:border-surface-700">
                    <span className="text-xs font-bold text-surface-900 dark:text-surface-100">
                      Featured role
                    </span>
                    <Badge variant="success">REMOTE</Badge>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-surface-900 dark:text-surface-50">
                      Senior Staff Engineer, Platform
                    </h4>
                    <p className="text-xs text-surface-500 mt-0.5">
                      TechCorp SaaS • San Francisco, CA
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 text-xs font-mono">
                    <span className="text-surface-400">Range: </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      $160,000 – $210,000 / yr
                    </span>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'employer' && (
              <>
                <div className="space-y-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-surface-900 dark:text-surface-50">
                    Recruiting built to scale
                  </h3>
                  <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                    Publish structured job listings, manage every candidate stage, and see
                    recruiting performance across your team.
                  </p>
                  <ul className="space-y-3 text-xs font-semibold text-surface-700 dark:text-surface-300">
                    {[
                      'Structured job post creation with validation',
                      'Full pipeline: applied → screening → interview → offer',
                      'Team collaboration with enterprise SSO',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/auth/employer">
                    <Button className="font-bold bg-emerald-600 hover:bg-emerald-500 text-white">
                      Open employer studio →
                    </Button>
                  </Link>
                </div>

                <div className="p-6 rounded-2xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-surface-200 dark:border-surface-700">
                    <span className="text-xs font-bold text-surface-900 dark:text-surface-100">
                      Pipeline preview
                    </span>
                    <Badge variant="info">14 APPLICANTS</Badge>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { name: 'Alex Morgan', stage: 'SCREENING', variant: 'info' as const },
                      { name: 'Jordan Lee', stage: 'INTERVIEW', variant: 'success' as const },
                    ].map((c) => (
                      <div
                        key={c.name}
                        className="p-3 rounded-xl bg-white dark:bg-surface-900 flex justify-between items-center border border-surface-200 dark:border-surface-700 text-xs"
                      >
                        <span className="font-bold text-surface-900 dark:text-surface-100">
                          {c.name}
                        </span>
                        <Badge variant={c.variant}>{c.stage}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'admin' && (
              <>
                <div className="space-y-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-surface-900 dark:text-surface-50">
                    Oversight without the overhead
                  </h3>
                  <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                    Review and moderate listings platform-wide, monitor system telemetry, and
                    maintain a full audit trail.
                  </p>
                  <ul className="space-y-3 text-xs font-semibold text-surface-700 dark:text-surface-300">
                    {[
                      'Moderation queue with one-click approve/reject',
                      'Live platform telemetry and usage metrics',
                      'Full audit logging and admin governance',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/auth/admin">
                    <Button className="font-bold bg-purple-600 hover:bg-purple-500 text-white">
                      Open admin console →
                    </Button>
                  </Link>
                </div>

                <div className="p-6 rounded-2xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-surface-200 dark:border-surface-700">
                    <span className="text-xs font-bold text-surface-900 dark:text-surface-100">
                      System status
                    </span>
                    <Badge variant="warning">SYSTEM NORMAL</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800">
                      <p className="text-[10px] text-surface-400">Total users</p>
                      <p className="text-lg font-extrabold text-purple-600 dark:text-purple-400">
                        12,450
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800">
                      <p className="text-[10px] text-surface-400">ARR Revenue</p>
                      <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                        $1.74M
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </Container>
      </section>

      {/* Enterprise Impact Metrics */}
      <Container size="xl">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-surface-900 via-brand-950 to-surface-900 border border-surface-800 text-white shadow-2xl">
          <div className="text-center mb-10 space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Performance at Global Scale
            </h2>
            <p className="text-xs text-surface-400 font-medium">
              Measured across enterprise hiring teams on the platform
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-surface-800">
            <div className="space-y-1 pt-4 lg:pt-0">
              <p className="text-4xl sm:text-5xl font-black text-brand-400">99.99%</p>
              <p className="text-xs font-semibold text-surface-300">Uptime SLA</p>
            </div>
            <div className="space-y-1 pt-4 lg:pt-0">
              <p className="text-4xl sm:text-5xl font-black text-emerald-400">4.8×</p>
              <p className="text-xs font-semibold text-surface-300">Faster hiring cycle</p>
            </div>
            <div className="space-y-1 pt-4 lg:pt-0">
              <p className="text-4xl sm:text-5xl font-black text-purple-400">85%</p>
              <p className="text-xs font-semibold text-surface-300">Lower cost-per-hire</p>
            </div>
            <div className="space-y-1 pt-4 lg:pt-0">
              <p className="text-4xl sm:text-5xl font-black text-amber-400">2.4M+</p>
              <p className="text-xs font-semibold text-surface-300">Verified applicants</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Pricing Cards */}
      <Container size="xl" id="pricing">
        <div className="text-center space-y-2 mb-12">
          <Badge variant="info" className="px-3 py-1 text-xs">
            Flexible Enterprise Licensing
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-surface-50 tracking-tight">
            Plans for every team size
          </h2>
          <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400">
            Predictable pricing, no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card header={<div className="font-extrabold text-base">Starter</div>}>
            <div className="space-y-6">
              <div>
                <span className="text-4xl font-black text-surface-900 dark:text-surface-50">
                  $199
                </span>
                <span className="text-xs font-medium text-surface-500"> / job post</span>
              </div>
              <p className="text-xs text-surface-500 leading-relaxed">
                For growing teams posting a single key position.
              </p>
              <ul className="space-y-3 text-xs font-semibold text-surface-600 dark:text-surface-300">
                {['30-day active listing', 'Applicant management', 'Email alerts'].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/auth/employer">
                <Button variant="outline" className="w-full font-bold">
                  Choose Starter
                </Button>
              </Link>
            </div>
          </Card>

          <Card
            header={
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-base">Growth</span>
                <Badge variant="info">Popular</Badge>
              </div>
            }
            className="border-2 border-brand-500 shadow-xl relative overflow-hidden"
          >
            <div className="space-y-6">
              <div>
                <span className="text-4xl font-black text-surface-900 dark:text-surface-50">
                  $499
                </span>
                <span className="text-xs font-medium text-surface-500"> / month</span>
              </div>
              <p className="text-xs text-surface-500 leading-relaxed">
                For scaling software teams hiring continuously.
              </p>
              <ul className="space-y-3 text-xs font-semibold text-surface-600 dark:text-surface-300">
                {[
                  'Up to 10 active postings',
                  'Full ATS pipeline',
                  'Featured placement',
                  'Slack & email notifications',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/auth/employer">
                <Button className="w-full font-bold bg-brand-600 hover:bg-brand-500 text-white">
                  Get Growth Plan
                </Button>
              </Link>
            </div>
          </Card>

          <Card header={<div className="font-extrabold text-base">Enterprise</div>}>
            <div className="space-y-6">
              <div>
                <span className="text-4xl font-black text-surface-900 dark:text-surface-50">
                  $999
                </span>
                <span className="text-xs font-medium text-surface-500"> / month</span>
              </div>
              <p className="text-xs text-surface-500 leading-relaxed">
                For large orgs needing SAML SSO and API access.
              </p>
              <ul className="space-y-3 text-xs font-semibold text-surface-600 dark:text-surface-300">
                {[
                  'Unlimited postings',
                  'SAML / Okta SSO',
                  'Dedicated account manager',
                  'Custom approval workflows',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/auth/employer">
                <Button variant="outline" className="w-full font-bold">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </Container>

      {/* Trust & Compliance Section */}
      <section className="bg-surface-100/80 dark:bg-surface-900/60 py-12 border-t border-surface-200 dark:border-surface-800">
        <Container size="xl" className="text-center space-y-6">
          <p className="text-xs font-bold uppercase tracking-wider text-surface-500">
            Security & Compliance Standards
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-surface-700 dark:text-surface-300">
            {[
              { icon: Lock, label: 'SOC 2 Type II Certified', color: 'text-emerald-500' },
              { icon: FileCheck, label: 'GDPR & CCPA Compliant', color: 'text-brand-500' },
              { icon: ShieldCheck, label: '256-bit TLS Encryption', color: 'text-purple-500' },
              { icon: Globe, label: 'ISO 27001 Certified', color: 'text-amber-500' },
            ].map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-sm"
              >
                <Icon className={`w-4 h-4 ${color}`} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};
