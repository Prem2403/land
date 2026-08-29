import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LIFECYCLE_STAGES, RISK_COLORS } from '@/data/projects';

export function Lifecycle() {
  return (
    <section className="relative overflow-hidden bg-surface-base py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Lifecycle"
          title="Land Acquisition Lifecycle"
          subtitle="Eight stages, each tracked for progress and delay risk — from notification to completion."
        />

        <div className="relative mt-14">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-[28px] hidden h-px bg-gradient-to-r from-brand-light via-brand-accent/40 to-brand-light lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LIFECYCLE_STAGES.map((stage, i) => {
              const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[stage.icon] || Icons.Circle;
              const color = RISK_COLORS[stage.risk];
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-surface-border bg-white text-brand-primary shadow-card">
                      <Icon size={22} />
                      <span className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-brand-dark text-[10px] font-700 text-white">
                        {String(stage.id).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 card-base p-4">
                    <h3 className="font-heading text-sm font-700 uppercase tracking-wide text-ink">{stage.name}</h3>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[11px] font-600 text-ink-muted">
                        <span>Progress</span>
                        <span className="text-ink">{stage.progress}%</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-border">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg, #0B5D3B, #2E9B68)' }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${stage.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                        />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[11px] font-600 text-ink-muted">Delay Probability</span>
                      <span className="font-heading text-sm font-700" style={{ color }}>
                        {stage.delayProbability}%
                      </span>
                    </div>
                    <div className="mt-2">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-700 uppercase tracking-wide"
                        style={{ backgroundColor: `${color}14`, color }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                        {stage.risk}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
