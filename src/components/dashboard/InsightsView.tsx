import { motion } from 'framer-motion';
import { Brain, Lightbulb, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { FEATURE_CONTRIBUTIONS, RECOMMENDATIONS, type Recommendation } from '@/data/projects';

const STATUS_STYLES: Record<Recommendation['status'], { icon: typeof Clock; text: string }> = {
  Pending: { icon: Clock, text: '#60756B' },
  'In Progress': { icon: AlertTriangle, text: '#D97706' },
  Implemented: { icon: CheckCircle2, text: '#16A34A' },
};

export function InsightsView() {
  return (
    <div className="space-y-5">
      {/* Feature contributions */}
      <div className="card-base p-5">
        <div className="flex items-center gap-2 text-brand-primary">
          <Brain size={18} />
          <h3 className="font-heading text-sm font-700 uppercase tracking-wide text-ink">Risk Driver Attribution — NH-16 Expansion</h3>
        </div>
        <div className="mt-5 space-y-4">
          {FEATURE_CONTRIBUTIONS.map((f, i) => {
            const color = f.critical ? '#DC2626' : '#0B5D3B';
            return (
              <div key={f.factor}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-600 text-ink">
                    {f.factor}
                    {f.critical && <span className="rounded-full bg-risk-high/10 px-2 py-0.5 text-[10px] font-700 uppercase text-risk-high">Critical</span>}
                  </span>
                  <span className="font-heading text-sm font-700 tabular" style={{ color }}>{f.contribution}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-surface-border">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${f.contribution * 3.5}%` }}
                    transition={{ duration: 0.9, delay: i * 0.1 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div className="card-base overflow-hidden">
        <div className="border-b border-surface-border bg-gradient-to-r from-brand-primary to-brand-secondary p-5 text-white">
          <div className="flex items-center gap-2 text-brand-light">
            <Lightbulb size={18} />
            <span className="text-[11px] font-600 uppercase tracking-[0.14em]">AI Recommended Actions</span>
          </div>
          <h3 className="mt-1 font-heading text-lg font-700">NH-16 Expansion — Intervention Plan</h3>
        </div>
        <div className="divide-y divide-surface-border">
          {RECOMMENDATIONS.map((rec, i) => {
            const status = STATUS_STYLES[rec.status];
            const StatusIcon = status.icon;
            return (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="flex items-start gap-4 p-4 hover:bg-surface-base/50"
              >
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-light font-heading text-sm font-700 text-brand-primary">{rec.id}</div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-600 text-ink">{rec.action}</h4>
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-700 uppercase tracking-wide" style={{ backgroundColor: rec.priority === 'Critical' ? '#991B1B14' : rec.priority === 'High' ? '#DC262614' : '#D9770614', color: rec.priority === 'Critical' ? '#991B1B' : rec.priority === 'High' ? '#DC2626' : '#D97706' }}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink-muted">{rec.reason}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs">
                    <span className="text-ink-muted"><span className="font-600 text-ink">Impact:</span> {rec.impact}</span>
                    <span className="flex items-center gap-1" style={{ color: status.text }}><StatusIcon size={13} /> {rec.status}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
