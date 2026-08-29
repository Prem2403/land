import { motion } from 'framer-motion';
import { FileWarning, Scale, Banknote, ClipboardList, Users, Network } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const PROBLEMS = [
  { icon: FileWarning, title: 'Pending Approvals', desc: 'Approvals stall for weeks beyond SLA, freezing downstream stages.' },
  { icon: Scale, title: 'Legal Disputes', desc: 'Title conflicts and litigation block compensation and possession.' },
  { icon: Banknote, title: 'Compensation Delays', desc: 'Slow verification and disbursement erodes stakeholder trust.' },
  { icon: ClipboardList, title: 'Incomplete Documentation', desc: 'Missing land records create future legal exposure.' },
  { icon: Users, title: 'R&R Challenges', desc: 'Rehabilitation & resettlement lags behind project targets.' },
  { icon: Network, title: 'Stakeholder Coordination', desc: 'Fragmented communication slows every decision.' },
];

export function Problem() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="The Challenge"
          title="Land Acquisition Delays Are Often Detected Too Late."
          subtitle="By the time a delay surfaces in reports, the cost and timeline impact has already cascaded across the project lifecycle."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-base group p-6 transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-light text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white">
                <p.icon size={20} />
              </div>
              <h3 className="mt-4 font-heading text-lg font-700 text-ink">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
