import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { Cpu, Database, GitBranch, CalendarClock } from 'lucide-react';
import { MODEL_METRICS } from '@/data/projects';
import { Counter } from '@/components/ui/Counter';

const METRICS = [
  { key: 'accuracy', label: 'Accuracy', value: MODEL_METRICS.accuracy, color: '#0B5D3B' },
  { key: 'precision', label: 'Precision', value: MODEL_METRICS.precision, color: '#146C43' },
  { key: 'recall', label: 'Recall', value: MODEL_METRICS.recall, color: '#2E9B68' },
  { key: 'f1', label: 'F1 Score', value: MODEL_METRICS.f1, color: '#087F5B' },
  { key: 'rocAuc', label: 'ROC-AUC', value: MODEL_METRICS.rocAuc, color: '#16A34A' },
];

function RadialGauge({ value, color }: { value: number; color: string }) {
  const data = [{ name: 'v', value, fill: color }];
  return (
    <div className="relative h-32 w-32">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart innerRadius="72%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar background={{ fill: '#E8F5EE' }} dataKey="value" cornerRadius={10} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-heading text-xl font-700 text-ink tabular">{value.toFixed(1)}%</span>
      </div>
    </div>
  );
}

export function ModelPerformanceView() {
  return (
    <div className="space-y-5">
      <div className="card-base p-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-light text-brand-primary">
            <Cpu size={22} />
          </div>
          <div>
            <h3 className="font-heading text-lg font-700 text-ink">{MODEL_METRICS.model}</h3>
            <p className="text-sm text-ink-muted">Ensemble classifier for delay prediction</p>
          </div>
          <div className="ml-auto flex flex-wrap gap-3 text-sm">
            <span className="flex items-center gap-1.5 rounded-lg border border-surface-border bg-surface-base px-3 py-1.5 text-ink-muted">
              <Database size={14} /> {MODEL_METRICS.trainingData}
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-surface-border bg-surface-base px-3 py-1.5 text-ink-muted">
              <GitBranch size={14} /> {MODEL_METRICS.modelVersion}
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-surface-border bg-surface-base px-3 py-1.5 text-ink-muted">
              <CalendarClock size={14} /> {MODEL_METRICS.lastUpdated}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {METRICS.map((m, i) => (
          <div key={m.key} className="card-base flex flex-col items-center p-5">
            <RadialGauge value={m.value} color={m.color} />
            <div className="mt-2 text-xs font-600 uppercase tracking-wide text-ink-muted">{m.label}</div>
            <div className="font-heading text-sm font-700 text-ink tabular">
              <Counter value={m.value} decimals={1} suffix="%" />
            </div>
          </div>
        ))}
      </div>

      <div className="card-base p-5">
        <h3 className="font-heading text-sm font-700 uppercase tracking-wide text-ink">Confusion Matrix (Normalized)</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-center text-sm">
            <thead>
              <tr className="text-xs text-ink-muted">
                <th></th>
                <th className="px-4 py-2">Predicted On-Time</th>
                <th className="px-4 py-2">Predicted Delay</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3 text-left font-600 text-ink-muted">Actual On-Time</td>
                <td className="rounded-lg bg-brand-light/60 px-4 py-3 font-700 text-brand-primary tabular">0.88</td>
                <td className="rounded-lg bg-amber-50 px-4 py-3 font-700 text-amber-700 tabular">0.12</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-left font-600 text-ink-muted">Actual Delay</td>
                <td className="rounded-lg bg-amber-50 px-4 py-3 font-700 text-amber-700 tabular">0.10</td>
                <td className="rounded-lg bg-brand-light/60 px-4 py-3 font-700 text-brand-primary tabular">0.90</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
