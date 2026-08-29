import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GISRiskMap } from '@/components/visuals/GISRiskMap';

export function GISMapSection() {
  return (
    <section id="analytics" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="GIS Intelligence"
          title="National Risk Map"
          subtitle="Click any project marker to inspect its risk score, delay probability, and primary risk driver."
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <GISRiskMap />
        </motion.div>
      </div>
    </section>
  );
}
