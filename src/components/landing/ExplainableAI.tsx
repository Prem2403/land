import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FEATURE_CONTRIBUTIONS } from '@/data/projects';

export function ExplainableAI() {
  return (
    <section className="relative overflow-hidden bg-surface-base py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Explainable AI"
          title="Why Is This Project At Risk?"
          subtitle="Feature attribution shows exactly which factors are driving the risk score — no black box."
        />

        <div className="mt-12 card-base p-6 sm:p-8">
          <div className="space-y-5">
            {FEATURE_CONTRIBUTIONS.map((f, i) => {
              const color = f.critical ? '#DC2626' : '#0B5D3B';
              return (
                <div key={f.factor}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-600 text-ink">
                      {f.factor}
                      {f.critical && (
                        <span className="rounded-full bg-risk-high/10 px-2 py-0.5 text-[10px] font-700 uppercase tracking-wide text-risk-high">
                          Critical
                        </span>
                      )}
                    </span>
                    <span className="font-heading text-sm font-700 tabular" style={{ color }}>
                      {f.contribution}%
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-surface-border">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${f.contribution * 3.5}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: 'easeOut', delay: i * 0.1 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-7 rounded-xl border border-surface-border bg-surface-base p-4 text-sm text-ink-muted">
            <span className="font-600 text-ink">Interpretation:</span> Legal disputes and compensation delays
            together account for <span className="font-700 text-risk-high">45%</span> of the risk contribution.
            Addressing these two factors first is projected to reduce delay probability by approximately 18%.
          </div>
        </div>
      </div>
    </section>
  );
}
