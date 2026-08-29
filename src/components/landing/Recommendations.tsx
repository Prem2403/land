import { motion } from 'framer-motion';
import { Lightbulb, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RECOMMENDATIONS, type Recommendation } from '@/data/projects';

const PRIORITY_STYLES: Record<Recommendation['priority'], { bg: string; text: string }> = {
  Critical: { bg: '#991B1B14', text: '#991B1B' },
  High: { bg: '#DC262614', text: '#DC2626' },
  Medium: { bg: '#D9770614', text: '#D97706' },
};

const STATUS_STYLES: Record<Recommendation['status'], { icon: typeof Clock; text: string }> = {
  Pending: { icon: Clock, text: '#60756B' },
  'In Progress': { icon: AlertTriangle, text: '#D97706' },
  Implemented: { icon: CheckCircle2, text: '#16A34A' },
};

export function Recommendations() {
  return (
    <section className="relative overflow-hidden bg-surface-base py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="AI Recommendations"
          title="Recommended Action Plan"
          subtitle="Explainable, prioritized interventions to bring the project back on schedule."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 card-base overflow-hidden"
        >
          {/* Header */}
          <div className="border-b border-surface-border bg-gradient-to-r from-brand-primary to-brand-secondary p-6 text-white">
            <div className="flex items-center gap-2 text-brand-light">
              <Lightbulb size={18} />
              <span className="text-[11px] font-600 uppercase tracking-[0.14em]">AI Recommended Action</span>
            </div>
            <h3 className="mt-2 font-heading text-xl font-700">NH-16 Expansion</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {['Legal disputes', 'Compensation delay', 'Pending approval'].map((r) => (
                <span key={r} className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-500">
                  {r}
                </span>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="divide-y divide-surface-border">
            {RECOMMENDATIONS.map((rec, i) => {
              const priority = PRIORITY_STYLES[rec.priority];
              const status = STATUS_STYLES[rec.status];
              const StatusIcon = status.icon;
              return (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-5 transition-colors hover:bg-surface-base/60"
                >
                  <div className="flex items-start gap-4">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-light font-heading text-sm font-700 text-brand-primary">
                      {rec.id}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-600 text-ink">{rec.action}</h4>
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-700 uppercase tracking-wide"
                          style={{ backgroundColor: priority.bg, color: priority.text }}
                        >
                          {rec.priority}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-ink-muted">{rec.reason}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs">
                        <span className="text-ink-muted">
                          <span className="font-600 text-ink">Impact:</span> {rec.impact}
                        </span>
                        <span className="flex items-center gap-1" style={{ color: status.text }}>
                          <StatusIcon size={13} />
                          {rec.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
