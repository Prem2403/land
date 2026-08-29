import { Search, Bell, ChevronDown } from 'lucide-react';
import type { DashView } from '@/components/dashboard/Sidebar';

const TITLES: Record<DashView, { title: string; subtitle: string }> = {
  dashboard: { title: 'Government Decision Support Dashboard', subtitle: 'Overview of land acquisition risk across all monitored projects.' },
  projects: { title: 'Projects', subtitle: 'All monitored land acquisition projects with live risk scoring.' },
  gis: { title: 'GIS Risk Map', subtitle: 'Geospatial view of project risk across states and districts.' },
  insights: { title: 'AI Insights', subtitle: 'Explainable AI risk drivers and recommended interventions.' },
  analytics: { title: 'Analytics', subtitle: 'State-wise, district-wise, and historical trend analysis.' },
  alerts: { title: 'Alerts', subtitle: 'Critical, warning, informational, and resolved alerts.' },
  reports: { title: 'Reports', subtitle: 'Generate and export risk and performance reports.' },
  upload: { title: 'Data Upload', subtitle: 'Upload project data via CSV or Excel for batch processing.' },
  model: { title: 'Model Performance', subtitle: 'Accuracy, precision, recall, and ROC-AUC of the prediction model.' },
  retraining: { title: 'Model Retraining', subtitle: 'Pipeline for retraining the prediction model on new data.' },
  users: { title: 'Users', subtitle: 'Role-based access control for platform users.' },
  audit: { title: 'Audit Logs', subtitle: 'Immutable record of all user and system actions.' },
  settings: { title: 'Settings', subtitle: 'Platform configuration and preferences.' },
};

interface TopbarProps {
  view: DashView;
}

export function Topbar({ view }: TopbarProps) {
  const { title, subtitle } = TITLES[view];
  return (
    <header className="sticky top-0 z-20 border-b border-surface-border bg-white/90 px-5 py-4 backdrop-blur-md lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-[11px] font-600 uppercase tracking-[0.14em] text-brand-primary">LANDVISION AI</div>
          <h1 className="mt-0.5 font-heading text-xl font-700 text-ink">{title}</h1>
          <p className="mt-0.5 text-sm text-ink-muted">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              placeholder="Search projects…"
              className="w-48 rounded-lg border border-surface-border bg-surface-base py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-muted/60 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/30"
            />
          </div>
          <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-surface-border text-ink-muted hover:text-brand-primary">
            <Bell size={16} />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-risk-high" />
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-surface-border bg-white py-1.5 pl-1.5 pr-2.5 hover:border-brand-accent">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-brand-primary text-xs font-700 text-white">
              AK
            </div>
            <span className="hidden text-sm font-600 text-ink sm:block">Admin</span>
            <ChevronDown size={14} className="hidden text-ink-muted sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}
