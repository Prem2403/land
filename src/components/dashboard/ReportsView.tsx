import { FileText, Download, FileBarChart } from 'lucide-react';

const REPORTS = [
  { name: 'Project Risk Report', desc: 'Per-project risk score, delay probability, and stage-wise breakdown.', icon: FileBarChart },
  { name: 'State Risk Report', desc: 'Aggregated risk distribution across all states.', icon: FileText },
  { name: 'District Report', desc: 'District-level delay and compensation analysis.', icon: FileText },
  { name: 'High-Risk Report', desc: 'All projects currently classified as high or critical risk.', icon: FileBarChart },
  { name: 'Monthly Performance Report', desc: 'Model and intervention performance for the month.', icon: FileText },
  { name: 'Compliance & Audit Report', desc: 'Regulatory compliance and audit trail summary.', icon: FileText },
];

export function ReportsView() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {REPORTS.map((r) => (
        <div key={r.name} className="card-base flex flex-col p-5">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-light text-brand-primary">
            <r.icon size={20} />
          </div>
          <h3 className="mt-4 font-heading text-base font-700 text-ink">{r.name}</h3>
          <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-muted">{r.desc}</p>
          <div className="mt-4 flex gap-2">
            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-primary px-3 py-2 text-xs font-600 text-white transition-colors hover:bg-brand-secondary">
              Generate Report
            </button>
            <button className="flex items-center justify-center gap-1.5 rounded-lg border border-surface-border bg-white px-3 py-2 text-xs font-600 text-ink-muted transition-colors hover:border-brand-accent hover:text-brand-primary">
              <Download size={14} /> PDF
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
