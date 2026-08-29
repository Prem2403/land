import { motion } from 'framer-motion';
import { Eye, FileText } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PUBLIC_PROJECTS } from '@/data/projects';

export function PublicPortal() {
  return (
    <section id="about" className="relative overflow-hidden bg-surface-base py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Transparency"
          title="Public Portal"
          subtitle="A limited public view keeps citizens informed without exposing sensitive internal data."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="card-base p-5">
            <div className="flex items-center gap-2 text-brand-primary">
              <Eye size={16} />
              <span className="text-[11px] font-600 uppercase tracking-[0.14em]">Visible to Public</span>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
              <li>Project name & general location</li>
              <li>Project status</li>
              <li>General progress</li>
              <li>Public notices</li>
            </ul>
          </div>
          <div className="card-base p-5">
            <div className="flex items-center gap-2 text-risk-high">
              <FileText size={16} />
              <span className="text-[11px] font-600 uppercase tracking-[0.14em]">Never Public</span>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
              <li>Internal risk scores</li>
              <li>Sensitive legal information</li>
              <li>Internal recommendations</li>
              <li>Officer & landowner information</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-surface-border bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-light/60 text-[11px] font-600 uppercase tracking-[0.12em] text-ink-muted">
                <tr>
                  <th className="px-5 py-3">Project</th>
                  <th className="px-5 py-3">Location</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Progress</th>
                  <th className="px-5 py-3">Public Notice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {PUBLIC_PROJECTS.map((p, i) => (
                  <motion.tr
                    key={p.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="hover:bg-surface-base/50"
                  >
                    <td className="px-5 py-3.5 font-600 text-ink">{p.name}</td>
                    <td className="px-5 py-3.5 text-ink-muted">{p.location}</td>
                    <td className="px-5 py-3.5">
                      <span className="rounded-full bg-brand-light px-2.5 py-1 text-xs font-600 text-brand-primary">
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-border">
                          <div className="h-full rounded-full bg-brand-accent" style={{ width: `${p.progress}%` }} />
                        </div>
                        <span className="text-xs font-600 text-ink">{p.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-ink-muted">{p.notice}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
