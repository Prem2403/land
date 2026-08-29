import { motion } from 'framer-motion';
import { Database, Cpu, Brain, Target, Sparkles, Send, ArrowDown, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const STEPS = [
  { icon: Database, label: 'Historical Data', sub: 'Past project records' },
  { icon: Database, label: 'Real-Time Data', sub: 'Live acquisition feeds' },
  { icon: Cpu, label: 'Data Processing', sub: 'Cleaning & normalization' },
  { icon: Brain, label: 'Machine Learning', sub: 'Model inference' },
  { icon: Target, label: 'Risk Prediction', sub: 'Score & probability' },
  { icon: Sparkles, label: 'Explainable AI', sub: 'Feature attribution' },
  { icon: Send, label: 'Recommended Intervention', sub: 'Actionable steps' },
  { icon: ArrowRight, label: 'Early Action', sub: 'Proactive governance' },
];

export function Solution() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-gradient-to-b from-brand-dark to-[#042919] py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid-dark opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          light
          eyebrow="Our Solution"
          title="From Reactive Monitoring to Predictive Governance"
          subtitle="A continuous intelligence pipeline that turns acquisition data into early, explainable, and actionable insight."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <div className="rounded-2xl border border-brand-accent/20 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors hover:border-brand-accent/40 hover:bg-white/[0.07]">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-accent/15 text-brand-accent">
                    <step.icon size={18} />
                  </div>
                  <div className="text-[11px] font-600 uppercase tracking-[0.14em] text-brand-subtle">
                    Step {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
                <h3 className="mt-4 font-heading text-base font-700 text-white">{step.label}</h3>
                <p className="mt-1 text-xs text-brand-light/70">{step.sub}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-brand-accent/50 lg:block">
                  {i % 4 === 3 ? <ArrowDown size={16} /> : <ArrowRight size={16} />}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
