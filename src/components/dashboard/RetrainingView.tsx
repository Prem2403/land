import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { RETRAINING_PIPELINE } from '@/data/projects';

export function RetrainingView() {
  const [active, setActive] = useState(3);

  return (
    <div className="space-y-6">
      <div className="card-base p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-heading text-base font-700 text-ink">Retraining Pipeline</h3>
            <p className="text-sm text-ink-muted">Trigger a new model training cycle with the latest acquisition data.</p>
          </div>
          <button className="rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-600 text-white transition-colors hover:bg-brand-secondary">
            Start Retraining
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {RETRAINING_PIPELINE.map((step, i) => {
          const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[step.icon] || Icons.Circle;
          const isActive = i === active;
          const isDone = i < active;
          return (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative"
            >
              <div
                className={`card-base flex h-full flex-col items-center p-5 text-center transition-all ${
                  isActive ? 'ring-2 ring-brand-accent' : ''
                }`}
              >
                <div
                  className={`grid h-12 w-12 place-items-center rounded-xl ${
                    isDone ? 'bg-brand-primary text-white' : isActive ? 'bg-brand-accent text-white' : 'bg-brand-light text-brand-primary'
                  }`}
                >
                  <Icon size={20} />
                </div>
                <div className="mt-3 text-[10px] font-600 uppercase tracking-[0.12em] text-ink-muted">
                  Step {i + 1}
                </div>
                <h4 className="mt-1 text-sm font-700 text-ink">{step.name}</h4>
                {isActive && (
                  <span className="mt-2 rounded-full bg-brand-accent/10 px-2 py-0.5 text-[10px] font-700 uppercase tracking-wide text-brand-accent">
                    In Progress
                  </span>
                )}
                {isDone && (
                  <span className="mt-2 rounded-full bg-brand-primary/10 px-2 py-0.5 text-[10px] font-700 uppercase tracking-wide text-brand-primary">
                    Complete
                  </span>
                )}
              </div>
              {i < RETRAINING_PIPELINE.length - 1 && (
                <div className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-brand-accent/40 xl:block">
                  <Icons.ChevronRight size={16} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="card-base p-5">
        <h3 className="font-heading text-sm font-700 uppercase tracking-wide text-ink">Training Progress</h3>
        <div className="mt-4 space-y-3">
          {[
            { label: 'Data Ingestion', pct: 100 },
            { label: 'Feature Engineering', pct: 100 },
            { label: 'Model Training (Epoch 42/50)', pct: 84 },
            { label: 'Validation', pct: 0 },
            { label: 'Deployment', pct: 0 },
          ].map((s) => (
            <div key={s.label}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-600 text-ink-muted">{s.label}</span>
                <span className="font-700 text-ink">{s.pct}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-border">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: s.pct === 100 ? '#0B5D3B' : 'linear-gradient(90deg, #0B5D3B, #2E9B68)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${s.pct}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
