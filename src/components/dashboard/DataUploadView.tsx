import { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileSpreadsheet, FileText, CheckCircle2, XCircle, AlertCircle, Copy } from 'lucide-react';

export function DataUploadView() {
  const [dragging, setDragging] = useState(false);

  return (
    <div className="space-y-5">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); }}
        className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 text-center transition-colors ${
          dragging ? 'border-brand-accent bg-brand-light/60' : 'border-surface-border bg-surface-base'
        }`}
      >
        <motion.div
          animate={{ y: dragging ? -4 : 0 }}
          className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-light text-brand-primary"
        >
          <UploadCloud size={28} />
        </motion.div>
        <h3 className="mt-4 font-heading text-lg font-700 text-ink">Drag & drop your file here</h3>
        <p className="mt-1 text-sm text-ink-muted">Supports CSV and Excel files up to 50MB</p>
        <button className="mt-5 rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-600 text-white transition-colors hover:bg-brand-secondary">
          Browse Files
        </button>
        <div className="mt-5 flex items-center gap-4 text-xs text-ink-muted">
          <span className="flex items-center gap-1.5"><FileText size={14} /> CSV</span>
          <span className="flex items-center gap-1.5"><FileSpreadsheet size={14} /> Excel (.xlsx)</span>
        </div>
      </div>

      <div className="card-base p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-sm font-700 uppercase tracking-wide text-ink">Last Upload Validation</h3>
          <span className="text-xs text-ink-muted">project_batch_aug2026.csv</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Stat icon={FileText} label="Records" value="1,248" color="#0B5D3B" bg="#E8F5EE" />
          <Stat icon={CheckCircle2} label="Valid" value="1,196" color="#16A34A" bg="#DCFCE7" />
          <Stat icon={XCircle} label="Invalid" value="22" color="#DC2626" bg="#FEE2E2" />
          <Stat icon={AlertCircle} label="Missing" value="18" color="#D97706" bg="#FEF3C7" />
          <Stat icon={Copy} label="Duplicates" value="12" color="#991B1B" bg="#FEE2E2" />
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-border">
          <div className="h-full rounded-full" style={{ width: '95.8%', background: 'linear-gradient(90deg, #0B5D3B, #2E9B68)' }} />
        </div>
        <p className="mt-2 text-xs text-ink-muted">95.8% valid records · 4.2% require review</p>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, color, bg }: { icon: typeof FileText; label: string; value: string; color: string; bg: string }) {
  return (
    <div className="rounded-xl border border-surface-border bg-surface-base p-4">
      <div className="grid h-9 w-9 place-items-center rounded-lg" style={{ backgroundColor: bg, color }}>
        <Icon size={16} />
      </div>
      <div className="mt-2 font-heading text-xl font-700 text-ink tabular">{value}</div>
      <div className="text-xs font-600 uppercase tracking-wide text-ink-muted">{label}</div>
    </div>
  );
}
