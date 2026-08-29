import { motion } from 'framer-motion';
import { BrainCircuit, Gauge, Eye, MapPinned, Lightbulb, BellRing } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const FEATURES = [
  { icon: BrainCircuit, title: 'AI Delay Prediction', desc: 'Predict the probability of project delays using historical and real-time acquisition data.' },
  { icon: Gauge, title: 'Risk Scoring', desc: 'Generate project-wise risk scores based on multiple acquisition parameters.' },
  { icon: Eye, title: 'Explainable AI', desc: 'Understand exactly why a project is classified as high-risk.' },
  { icon: MapPinned, title: 'GIS Intelligence', desc: 'Visualize project risks across states and districts.' },
  { icon: Lightbulb, title: 'AI Recommendations', desc: 'Receive actionable recommendations for reducing identified risks.' },
  { icon: BellRing, title: 'Smart Alerts', desc: 'Automatically notify administrators when project risk increases.' },
];

export function Features() {
  return (
    <section id="features" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Capabilities"
          title="Intelligence Built for Land Acquisition"
          subtitle="Six core capabilities that move your team from hindsight to foresight."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-base group relative overflow-hidden p-6 transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-brand-light/60 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-sm">
                  <f.icon size={22} />
                </div>
                <h3 className="mt-5 font-heading text-lg font-700 text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
