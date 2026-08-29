import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity } from 'lucide-react';
import { Counter } from '@/components/ui/Counter';

const IndiaMap3D = lazy(() => import('@/components/visuals/IndiaMap3D').then((m) => ({ default: m.IndiaMap3D })));

interface HeroProps {
  onExplore: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function FloatingCard({ label, value, color, delay }: { label: string; value: number; color: string; delay: number }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="absolute rounded-2xl border border-surface-border bg-white/95 px-4 py-3 shadow-card backdrop-blur-sm"
    >
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-[11px] font-600 uppercase tracking-[0.12em] text-ink-muted">{label}</span>
      </div>
      <div className="mt-1 font-heading text-2xl font-700 text-ink tabular">
        <Counter value={value} />
      </div>
    </motion.div>
  );
}

export function Hero({ onExplore }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-white via-surface-base to-brand-light/40">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        {/* Left */}
        <div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-white px-3 py-1.5 text-[11px] font-600 uppercase tracking-[0.14em] text-brand-primary shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
            </span>
            AI Monitoring Active
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="show"
            className="mt-5 font-heading text-4xl font-700 leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]"
          >
            Predict Land Acquisition{' '}
            <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
              Delays
            </span>{' '}
            Before They Happen.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted"
          >
            AI-powered predictive intelligence for proactive land acquisition management and infrastructure planning.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="show"
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={onExplore}
              className="group inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-600 text-white shadow-sm transition-all hover:bg-brand-secondary hover:shadow-md"
            >
              Explore Dashboard
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-surface-border bg-white px-5 py-3 text-sm font-600 text-ink transition-colors hover:border-brand-accent hover:text-brand-primary"
            >
              How It Works
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={4}
            initial="hidden"
            animate="show"
            className="mt-6 flex items-center gap-2 text-xs text-ink-muted"
          >
            <Activity size={14} className="text-brand-accent" />
            Predictive analytics for infrastructure projects
          </motion.div>
        </div>

        {/* Right - 3D map */}
        <div className="relative h-[380px] sm:h-[460px] lg:h-[520px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Suspense fallback={<div className="grid h-full place-items-center text-sm text-ink-muted">Loading 3D map…</div>}>
              <IndiaMap3D className="h-full w-full" />
            </Suspense>
          </motion.div>

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-2 top-6 sm:left-0 sm:top-10">
              <FloatingCard label="Projects Monitored" value={1248} color="#0B5D3B" delay={5} />
            </div>
            <div className="absolute right-2 top-20 sm:right-0 sm:top-24">
              <FloatingCard label="High Risk" value={184} color="#DC2626" delay={6} />
            </div>
            <div className="absolute bottom-8 left-4 sm:bottom-12 sm:left-8">
              <FloatingCard label="Predicted Delays" value={237} color="#D97706" delay={7} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
