import { motion } from 'framer-motion';
import { Radar, TrendingUp, Eye, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const IMPACTS = [
  { icon: Radar, title: 'Early Detection', desc: 'Identify potential delays before they become critical.' },
  { icon: TrendingUp, title: 'Resource Optimization', desc: 'Prioritize high-risk projects for faster intervention.' },
  { icon: Eye, title: 'Transparent Decisions', desc: 'Explainable AI supports evidence-based decisions.' },
  { icon: ShieldCheck, title: 'Proactive Governance', desc: 'Move from reactive reporting to predictive intervention.' },
];

export function Impact() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Impact"
          title="Why LANDVISION AI Matters"
          subtitle="The platform delivers measurable governance outcomes across the project lifecycle."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACTS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, rotateX: 3, rotateY: i % 2 === 0 ? -2 : 2, transition: { duration: 0.25 } }}
              style={{ transformPerspective: 900 }}
              className="group relative overflow-hidden rounded-2xl border border-surface-border bg-gradient-to-b from-white to-brand-light/40 p-6"
            >
              <motion.div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-primary text-white shadow-sm transition-transform group-hover:rotate-6 group-hover:scale-110">
                <item.icon size={22} />
              </motion.div>
              <motion.div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-accent/10 blur-2xl" animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.25 }} />
              <h3 className="mt-4 font-heading text-base font-700 uppercase tracking-wide text-ink">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
