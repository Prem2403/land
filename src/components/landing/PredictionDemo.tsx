import { motion } from 'framer-motion';
import { Cpu, ArrowRight, MapPin } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Counter } from '@/components/ui/Counter';
import { PREDICTION_INPUTS } from '@/data/projects';

function CircularProgress({ value, max, label, color }: { value: number; max: number; label: string; color: string }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const pct = value / max;
  return (
    <div className="relative grid place-items-center">
      <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#E8F5EE" strokeWidth="10" />
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference * (1 - pct) }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.4 }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="font-heading text-3xl font-700 text-ink tabular">
          <Counter value={value} />
        </div>
        <div className="text-[10px] font-600 uppercase tracking-[0.12em] text-ink-muted">{label}</div>
      </div>
    </div>
  );
}

export function PredictionDemo() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Live Demo"
          title="AI Prediction Demonstration"
          subtitle="Watch acquisition parameters flow into the prediction engine and surface a risk assessment in real time."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          {/* Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-base p-6"
          >
            <div className="flex items-center gap-2 text-brand-primary">
              <MapPin size={16} />
              <span className="text-[11px] font-600 uppercase tracking-[0.14em]">Project Input</span>
            </div>
            <h3 className="mt-2 font-heading text-xl font-700 text-ink">NH-16 Highway Expansion</h3>
            <p className="text-sm text-ink-muted">Khordha, Odisha</p>

            <div className="mt-5 space-y-2.5">
              {PREDICTION_INPUTS.map((input, i) => (
                <motion.div
                  key={input.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center justify-between rounded-lg border border-surface-border bg-surface-base px-3.5 py-2.5"
                >
                  <span className="text-xs font-500 text-ink-muted">{input.label}</span>
                  <span className="font-heading text-sm font-700 text-ink">{input.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Engine */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-3 py-4"
          >
            <div className="relative grid h-24 w-24 place-items-center rounded-full border-2 border-brand-accent/30 bg-brand-light">
              <div className="absolute inset-0 rounded-full border-2 border-brand-accent/40 animate-pulse-ring" />
              <Cpu size={32} className="text-brand-primary" />
            </div>
            <div className="text-center text-[11px] font-600 uppercase tracking-[0.14em] text-brand-primary">
              AI Engine
            </div>
            <ArrowRight size={20} className="hidden text-brand-accent/50 lg:block" />
          </motion.div>

          {/* Output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card-base p-6"
          >
            <div className="text-[11px] font-600 uppercase tracking-[0.14em] text-ink-muted">Prediction Output</div>

            <div className="mt-4 flex items-center justify-around gap-4">
              <div className="text-center">
                <CircularProgress value={84} max={100} label="Risk Score" color="#991B1B" />
              </div>
              <div className="text-center">
                <CircularProgress value={82} max={100} label="Delay Prob." color="#DC2626" />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-risk-critical/10 px-4 py-2 text-sm font-700 uppercase tracking-wide text-risk-critical">
                <span className="h-2 w-2 rounded-full bg-risk-critical" />
                Status: Critical
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
