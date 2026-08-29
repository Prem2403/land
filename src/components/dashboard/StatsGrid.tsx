import { motion } from 'framer-motion';
import { FolderKanban, AlertOctagon, AlertTriangle, ShieldCheck, Clock, CalendarClock } from 'lucide-react';
import { Counter } from '@/components/ui/Counter';
import { DASHBOARD_STATS } from '@/data/projects';

const STATS = [
  { label: 'Total Projects', value: DASHBOARD_STATS.totalProjects, icon: FolderKanban, color: '#0B5D3B', bg: '#E8F5EE' },
  { label: 'High Risk', value: DASHBOARD_STATS.highRisk, icon: AlertOctagon, color: '#DC2626', bg: '#FEE2E2' },
  { label: 'Medium Risk', value: DASHBOARD_STATS.mediumRisk, icon: AlertTriangle, color: '#D97706', bg: '#FEF3C7' },
  { label: 'Low Risk', value: DASHBOARD_STATS.lowRisk, icon: ShieldCheck, color: '#16A34A', bg: '#DCFCE7' },
  { label: 'Predicted Delays', value: DASHBOARD_STATS.predictedDelays, icon: CalendarClock, color: '#087F5B', bg: '#E8F5EE' },
  { label: 'Average Delay', value: DASHBOARD_STATS.averageDelay, suffix: ' Days', icon: Clock, color: '#146C43', bg: '#E8F5EE' },
];

export function StatsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="card-base group relative overflow-hidden p-5"
        >
          <div className="flex items-center justify-between">
            <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ backgroundColor: s.bg, color: s.color }}>
              <s.icon size={18} />
            </div>
          </div>
          <div className="mt-4 font-heading text-2xl font-700 text-ink tabular">
            <Counter value={s.value} suffix={s.suffix} />
          </div>
          <div className="mt-0.5 text-xs font-600 uppercase tracking-[0.1em] text-ink-muted">{s.label}</div>
          <motion.div className="absolute bottom-0 left-0 h-0.5 w-full origin-left" style={{ backgroundColor: s.color }} initial={{ scaleX: 0.2 }} animate={{ scaleX: [0.2, 0.85, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }} />
        </motion.div>
      ))}
    </div>
  );
}
