import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, MapPin, Gauge, Clock, TrendingUp } from 'lucide-react';
import { PROJECT_ROWS, PROJECT_STAGE_PROGRESS, RISK_COLORS, type ProjectRow } from '@/data/projects';
import { RiskBadge } from '@/components/ui/RiskBadge';

export function ProjectTable() {
  const [selected, setSelected] = useState<ProjectRow | null>(null);

  return (
    <>
      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-light/50 text-[11px] font-600 uppercase tracking-[0.12em] text-ink-muted">
              <tr>
                <th className="px-5 py-3.5">Project</th>
                <th className="px-5 py-3.5">State</th>
                <th className="px-5 py-3.5">District</th>
                <th className="px-5 py-3.5">Risk Score</th>
                <th className="px-5 py-3.5">Delay Prob.</th>
                <th className="px-5 py-3.5">Expected Delay</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {PROJECT_ROWS.map((row) => {
                const color = RISK_COLORS[row.status];
                return (
                  <tr key={row.id} className="transition-colors hover:bg-surface-base/50">
                    <td className="px-5 py-3.5">
                      <div className="font-600 text-ink">{row.name}</div>
                      <div className="text-xs text-ink-muted">{row.id}</div>
                    </td>
                    <td className="px-5 py-3.5 text-ink-muted">{row.state}</td>
                    <td className="px-5 py-3.5 text-ink-muted">{row.district}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-12 overflow-hidden rounded-full bg-surface-border">
                          <div className="h-full rounded-full" style={{ width: `${row.riskScore}%`, backgroundColor: color }} />
                        </div>
                        <span className="font-700 tabular" style={{ color }}>{row.riskScore}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-600 tabular text-ink">{row.delayProbability}%</td>
                    <td className="px-5 py-3.5 text-ink-muted">{row.expectedDelay}</td>
                    <td className="px-5 py-3.5"><RiskBadge level={row.status} /></td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => setSelected(row)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-surface-border bg-white px-3 py-1.5 text-xs font-600 text-ink-muted transition-colors hover:border-brand-accent hover:text-brand-primary"
                      >
                        <Eye size={13} /> View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectDetailModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectDetailModal({ project, onClose }: { project: ProjectRow; onClose: () => void }) {
  const color = RISK_COLORS[project.status];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-surface-border bg-white shadow-xl sm:rounded-2xl"
      >
        <div className="flex items-start justify-between border-b border-surface-border bg-gradient-to-r from-brand-primary to-brand-secondary p-6 text-white">
          <div>
            <div className="text-[11px] font-600 uppercase tracking-[0.14em] text-brand-light">{project.id}</div>
            <h2 className="mt-1 font-heading text-xl font-700">{project.name}</h2>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-brand-light/80">
              <MapPin size={14} /> {project.district}, {project.state}
            </div>
          </div>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white hover:bg-white/20">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <DetailMetric icon={Gauge} label="Risk Score" value={`${project.riskScore}/100`} color={color} />
            <DetailMetric icon={TrendingUp} label="Delay Probability" value={`${project.delayProbability}%`} />
            <DetailMetric icon={Clock} label="Expected Delay" value={project.expectedDelay} />
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-600 text-ink-muted">Overall Progress</span>
              <span className="font-700 text-brand-primary">{project.progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-border">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #0B5D3B, #2E9B68)' }}
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>

          <h3 className="mt-6 font-heading text-sm font-700 uppercase tracking-wide text-ink">Stage-wise Progress</h3>
          <div className="mt-3 space-y-3">
            {PROJECT_STAGE_PROGRESS.map((stage) => {
              const sc = RISK_COLORS[stage.risk];
              return (
                <div key={stage.name}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-600 text-ink">{stage.name}</span>
                    <span className="font-600 text-ink-muted">
                      {stage.progress}% · <span style={{ color: sc }}>{stage.delayProbability}% delay</span>
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface-border">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: sc }}
                      initial={{ width: 0 }}
                      animate={{ width: `${stage.progress}%` }}
                      transition={{ duration: 0.7 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DetailMetric({ icon: Icon, label, value, color }: { icon: typeof Gauge; label: string; value: string; color?: string }) {
  return (
    <div className="rounded-xl border border-surface-border bg-surface-base p-3">
      <div className="flex items-center gap-1.5 text-[11px] font-600 uppercase tracking-[0.1em] text-ink-muted">
        <Icon size={12} /> {label}
      </div>
      <div className="mt-1 font-heading text-lg font-700 tabular" style={{ color: color || '#10231A' }}>{value}</div>
    </div>
  );
}
