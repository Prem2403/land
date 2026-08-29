import { ScrollText, User, FileEdit, Trash2, LogIn, Download } from 'lucide-react';

const LOGS = [
  { user: 'Arun Kumar', action: 'Generated High-Risk Report', icon: FileEdit, time: '2026-08-29 09:42', ip: '10.0.12.4' },
  { user: 'Sneha Patel', action: 'Updated project NH-16 Expansion', icon: FileEdit, time: '2026-08-29 09:18', ip: '10.0.12.7' },
  { user: 'Rajesh Mehta', action: 'Uploaded project_batch_aug2026.csv', icon: Download, time: '2026-08-29 08:55', ip: '10.0.13.2' },
  { user: 'System', action: 'Triggered model retraining v3.2.2', icon: ScrollText, time: '2026-08-29 08:00', ip: 'system' },
  { user: 'Priya Nair', action: 'Signed in', icon: LogIn, time: '2026-08-29 07:45', ip: '10.0.14.1' },
  { user: 'Vikram Singh', action: 'Deleted duplicate record P-1019', icon: Trash2, time: '2026-08-28 18:22', ip: '10.0.14.8' },
  { user: 'Arun Kumar', action: 'Created user Priya Nair', icon: User, time: '2026-08-28 16:10', ip: '10.0.12.4' },
];

export function AuditLogView() {
  return (
    <div className="card-base overflow-hidden">
      <div className="border-b border-surface-border bg-surface-base px-5 py-4">
        <div className="flex items-center gap-2 text-brand-primary">
          <ScrollText size={18} />
          <h3 className="font-heading text-sm font-700 uppercase tracking-wide text-ink">Audit Trail</h3>
        </div>
        <p className="mt-1 text-xs text-ink-muted">Immutable record of all user and system actions.</p>
      </div>
      <div className="divide-y divide-surface-border">
        {LOGS.map((log, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-surface-base/50">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-light text-brand-primary">
              <log.icon size={15} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-600 text-ink">
                <span className="text-brand-primary">{log.user}</span> {log.action}
              </div>
              <div className="text-xs text-ink-muted">{log.time} · IP {log.ip}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
