import { AlertOctagon, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { ALERTS, type AlertItem } from '@/data/projects';

const SEVERITY_CONFIG: Record<AlertItem['severity'], { icon: typeof Info; color: string; bg: string; label: string }> = {
  critical: { icon: AlertOctagon, color: '#991B1B', bg: '#FEE2E2', label: 'Critical' },
  warning: { icon: AlertTriangle, color: '#D97706', bg: '#FEF3C7', label: 'Warning' },
  information: { icon: Info, color: '#087F5B', bg: '#E8F5EE', label: 'Information' },
  resolved: { icon: CheckCircle2, color: '#16A34A', bg: '#DCFCE7', label: 'Resolved' },
};

const FILTERS: AlertItem['severity'][] = ['critical', 'warning', 'information', 'resolved'];

export function AlertsView() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-4">
        {FILTERS.map((f) => {
          const cfg = SEVERITY_CONFIG[f];
          const count = ALERTS.filter((a) => a.severity === f).length;
          return (
            <div key={f} className="card-base flex items-center gap-3 p-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                <cfg.icon size={18} />
              </div>
              <div>
                <div className="font-heading text-xl font-700 text-ink tabular">{count}</div>
                <div className="text-xs font-600 uppercase tracking-wide text-ink-muted">{cfg.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        {ALERTS.map((alert) => {
          const cfg = SEVERITY_CONFIG[alert.severity];
          return (
            <div key={alert.id} className="card-base flex flex-col gap-3 p-5 sm:flex-row sm:items-start">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                  <cfg.icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full px-2.5 py-0.5 text-[10px] font-700 uppercase tracking-wide" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                      {cfg.label}
                    </span>
                    <span className="font-600 text-ink">{alert.project}</span>
                    <span className="text-xs text-ink-muted">· {alert.time}</span>
                  </div>
                  <div className="mt-1.5 font-600 text-ink">{alert.message}</div>
                  <p className="mt-1 text-sm text-ink-muted">{alert.detail}</p>
                  <div className="mt-2 rounded-lg border border-surface-border bg-surface-base px-3 py-2 text-xs">
                    <span className="font-600 text-brand-primary">Recommended:</span> {alert.recommended}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
