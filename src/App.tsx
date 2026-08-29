import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';
import { LandingPage } from '@/components/landing/LandingPage';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { Logo } from '@/components/ui/Logo';

type Screen = 'landing' | 'login' | 'dashboard';

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing');

  if (screen === 'dashboard') {
    return <Dashboard onLogout={() => setScreen('landing')} />;
  }

  return (
    <AnimatePresence mode="wait">
      {screen === 'landing' ? (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LandingPage onLogin={() => setScreen('login')} />
        </motion.div>
      ) : (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative grid min-h-screen place-items-center overflow-hidden bg-gradient-to-br from-brand-dark via-brand-primary to-[#042919] p-5"
        >
          <div className="absolute inset-0 bg-grid-dark opacity-30" />
          <div className="absolute inset-0 bg-radial-glow" />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white p-8 shadow-2xl"
          >
            <div className="flex flex-col items-center text-center">
              <Logo size={44} />
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-light px-3 py-1 text-[11px] font-600 uppercase tracking-[0.14em] text-brand-primary">
                <ShieldCheck size={13} /> Secure Government Portal
              </div>
              <h1 className="mt-4 font-heading text-2xl font-700 text-ink">Sign in to your account</h1>
              <p className="mt-1 text-sm text-ink-muted">Access the LANDVISION AI decision support dashboard.</p>
            </div>

            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setScreen('dashboard');
              }}
            >
              <div>
                <label className="mb-1.5 block text-xs font-600 text-ink-muted">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
                  <input
                    type="email"
                    required
                    defaultValue="admin@landvision.gov.in"
                    className="w-full rounded-xl border border-surface-border bg-surface-base py-2.5 pl-10 pr-3 text-sm text-ink focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/30"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-600 text-ink-muted">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
                  <input
                    type="password"
                    required
                    defaultValue="demo1234"
                    className="w-full rounded-xl border border-surface-border bg-surface-base py-2.5 pl-10 pr-3 text-sm text-ink focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/30"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary py-3 text-sm font-600 text-white shadow-sm transition-all hover:bg-brand-secondary hover:shadow-md"
              >
                Sign In
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>

            <div className="mt-5 flex items-center justify-between text-xs text-ink-muted">
              <button onClick={() => setScreen('landing')} className="hover:text-brand-primary">
                ← Back to site
              </button>
              <span className="rounded-md bg-surface-base px-2 py-1">Demo credentials pre-filled</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
