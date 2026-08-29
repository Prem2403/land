import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AlertOctagon, ArrowUpRight } from 'lucide-react';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { GISRiskMap } from '@/components/visuals/GISRiskMap';
import { ALERTS, PROJECT_ROWS, HISTORICAL_TRENDS } from '@/data/projects';
import { RiskBadge } from '@/components/ui/RiskBadge';

const tooltipStyle = {
  borderRadius: 12,
  border: '1px solid #D8E5DE',
  fontSize: 12,
};

export function DashboardOverview() {
  return (
    <div className="space-y-5">
      <StatsGrid />

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Trend chart */}
        <div className="card-base p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-sm font-700 uppercase tracking-wide text-ink">Delay Trends</h3>
            <span className="rounded-full bg-brand-light px-2.5 py-1 text-xs font-600 text-brand-primary">Last 7 months</span>
          </div>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HISTORICAL_TRENDS}>
                <defs>
                  <linearGradient id="dashG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0B5D3B" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#0B5D3B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8F5EE" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#60756B' }} axisLine={{ stroke: '#D8E5DE' }} />
                <YAxis tick={{ fontSize: 11, fill: '#60756B' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="delays" stroke="#0B5D3B" fill="url(#dashG)" strokeWidth={2} />
                <Area type="monotone" dataKey="predicted" stroke="#2E9B68" fill="none" strokeWidth={2} strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent alerts */}
        <div className="card-base p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-sm font-700 uppercase tracking-wide text-ink">Recent Alerts</h3>
            <button className="flex items-center gap-1 text-xs font-600 text-brand-primary hover:underline">
              View all <ArrowUpRight size={13} />
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {ALERTS.slice(0, 4).map((a) => (
              <div key={a.id} className="flex items-start gap-3 rounded-xl border border-surface-border bg-surface-base p-3">
                <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                  a.severity === 'critical' ? 'bg-red-50 text-risk-critical' :
                  a.severity === 'warning' ? 'bg-amber-50 text-risk-medium' :
                  a.severity === 'resolved' ? 'bg-green-50 text-risk-low' : 'bg-brand-light text-brand-ai'
                }`}>
                  <AlertOctagon size={15} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-600 text-ink">{a.project}</span>
                    <span className="text-xs text-ink-muted">· {a.time}</span>
                  </div>
                  <p className="text-xs text-ink-muted">{a.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mini GIS */}
      <div className="card-base p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-sm font-700 uppercase tracking-wide text-ink">National Risk Map</h3>
          <span className="rounded-full bg-brand-light px-2.5 py-1 text-xs font-600 text-brand-primary">{PROJECT_ROWS.length} active projects</span>
        </div>
        <div className="mt-4">
          <GISRiskMap />
        </div>
      </div>

      {/* High risk projects */}
      <div className="card-base overflow-hidden">
        <div className="border-b border-surface-border bg-surface-base px-5 py-4">
          <h3 className="font-heading text-sm font-700 uppercase tracking-wide text-ink">High-Risk Projects</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-light/40 text-[11px] font-600 uppercase tracking-[0.12em] text-ink-muted">
              <tr>
                <th className="px-5 py-3">Project</th>
                <th className="px-5 py-3">State</th>
                <th className="px-5 py-3">Risk Score</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {PROJECT_ROWS.filter((p) => p.status === 'high' || p.status === 'critical').map((p) => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-surface-base/50">
                  <td className="px-5 py-3.5 font-600 text-ink">{p.name}</td>
                  <td className="px-5 py-3.5 text-ink-muted">{p.state}</td>
                  <td className="px-5 py-3.5 font-700 tabular text-ink">{p.riskScore}</td>
                  <td className="px-5 py-3.5"><RiskBadge level={p.status} /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
