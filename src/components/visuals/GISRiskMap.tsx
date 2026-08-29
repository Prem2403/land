import { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Satellite, Map, Database, Cloud, ScanLine, type LucideIcon } from 'lucide-react';
import { RISK_COLORS, PROJECTS, SATELLITE_REGIONS, DATASET_SUMMARY, type RiskLevel } from '@/data/projects';
import { RiskBadge } from '@/components/ui/RiskBadge';

const IndiaMap3D = lazy(() => import('@/components/visuals/IndiaMap3D').then((m) => ({ default: m.IndiaMap3D })));

const LEGEND: { level: RiskLevel; label: string }[] = [
  { level: 'low', label: 'Low' },
  { level: 'medium', label: 'Medium' },
  { level: 'high', label: 'High' },
  { level: 'critical', label: 'Critical' },
];

export function GISRiskMap() {
  const [selected, setSelected] = useState<number | null>(0);
  const [satellite, setSatellite] = useState(false);
  const project = selected !== null ? PROJECTS[selected] : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      {/* 3D Map */}
      <div className="relative overflow-hidden rounded-2xl border border-surface-border bg-gradient-to-br from-[#063B27] to-[#0B5D3B]">
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <div className="scan-line" />
        <div className="pointer-events-none absolute left-5 top-4 z-10">
          <div className="text-[11px] font-600 uppercase tracking-[0.14em] text-brand-light/80">
            {satellite ? 'Satellite intelligence layer' : 'Terrain intelligence layer'} · Click markers · Drag to rotate
          </div>
        </div>
        <div className="absolute right-5 top-3 z-10 flex rounded-lg border border-white/15 bg-[#063B27]/80 p-1 backdrop-blur-sm">
          <button onClick={() => setSatellite(false)} className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-600 transition-colors ${!satellite ? 'bg-white text-brand-primary' : 'text-brand-light/80 hover:text-white'}`}>
            <Map size={13} /> Terrain
          </button>
          <button onClick={() => setSatellite(true)} className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-600 transition-colors ${satellite ? 'bg-white text-brand-primary' : 'text-brand-light/80 hover:text-white'}`}>
            <Satellite size={13} /> Satellite
          </button>
        </div>
        <div className="relative h-[420px] sm:h-[480px] lg:h-[520px]">
          <Suspense fallback={<div className="grid h-full place-items-center text-sm text-brand-light/60">Loading 3D map…</div>}>
            <IndiaMap3D
              className="h-full w-full"
              interactive
              onSelectProject={setSelected}
              selectedProject={selected}
              satellite={satellite}
            />
          </Suspense>
        </div>

        {/* Legend */}
        <div className="relative flex flex-wrap items-center gap-4 px-6 pb-5 pt-2">
          {LEGEND.map((l) => (
            <div key={l.level} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: RISK_COLORS[l.level] }} />
              <span className="text-xs font-500 text-brand-light/90">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <div className="card-base p-6">
        <AnimatePresence mode="wait">
          {project && (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[11px] font-600 uppercase tracking-[0.14em] text-ink-muted">
                    {project.id}
                  </div>
                  <h3 className="mt-1 font-heading text-lg font-700 text-ink">{project.name}</h3>
                  <div className="mt-0.5 text-sm text-ink-muted">
                    {project.district}, {project.state}
                  </div>
                </div>
                <RiskBadge level={project.status} size="md" />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <Metric label="Risk Score" value={`${project.riskScore}`} sub="/ 100" />
                <Metric label="Delay Probability" value={`${project.delayProbability}%`} />
                <Metric label="Expected Delay" value={project.expectedDelay} />
                <Metric label="Progress" value={`${project.progress}%`} />
              </div>

              <div className="mt-5 rounded-xl border border-surface-border bg-surface-base p-4">
                <div className="text-[11px] font-600 uppercase tracking-[0.14em] text-ink-muted">Main Risk</div>
                <div className="mt-1 text-sm font-600 text-ink">{project.mainRisk}</div>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-600 text-ink-muted">Acquisition Progress</span>
                  <span className="font-700 text-brand-primary">{project.progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-border">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #0B5D3B, #2E9B68)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {PROJECTS.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setSelected(i)}
                    className={`h-7 w-7 rounded-lg border-2 transition-all ${
                      selected === i ? 'scale-110 border-transparent' : 'border-surface-border opacity-60 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: RISK_COLORS[p.status], boxShadow: selected === i ? `0 0 8px ${RISK_COLORS[p.status]}` : 'none' }}
                    title={p.name}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="lg:col-span-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <DatasetMetric icon={Database} label="Records indexed" value={DATASET_SUMMARY.totalRecords} detail={`${DATASET_SUMMARY.modelSignals} model signals`} />
        <DatasetMetric icon={Satellite} label="Satellite scenes" value={DATASET_SUMMARY.satelliteScenes.toLocaleString()} detail={`Last sync ${DATASET_SUMMARY.lastSync}`} />
        <DatasetMetric icon={ScanLine} label="National coverage" value={`${DATASET_SUMMARY.coverage}%`} detail="Across active corridors" />
        <DatasetMetric icon={Cloud} label="Best scene quality" value={`${Math.min(...SATELLITE_REGIONS.map((region) => region.cloudCover))}% cloud`} detail="Latest capture available" />
      </div>
    </div>
  );
}

function DatasetMetric({ icon: Icon, label, value, detail }: { icon: LucideIcon; label: string; value: string; detail: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-surface-border bg-surface-base p-4">
      <div className="flex items-center gap-2 text-brand-primary"><Icon size={15} /><span className="text-[10px] font-700 uppercase tracking-[0.12em] text-ink-muted">{label}</span></div>
      <div className="mt-2 font-heading text-xl font-700 text-ink tabular">{value}</div>
      <div className="mt-1 text-[11px] text-ink-muted">{detail}</div>
    </motion.div>
  );
}

function Metric({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-surface-border bg-surface-base p-3">
      <div className="text-[11px] font-600 uppercase tracking-[0.12em] text-ink-muted">{label}</div>
      <div className="mt-1 font-heading text-xl font-700 text-ink tabular">
        {value}
        {sub && <span className="text-sm font-500 text-ink-muted">{sub}</span>}
      </div>
    </div>
  );
}
