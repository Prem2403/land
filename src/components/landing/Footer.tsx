import { Logo } from '@/components/ui/Logo';

const LINKS = ['About', 'How It Works', 'Features', 'Contact', 'Privacy', 'Terms'];

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
              Predict Early. Intervene Smarter. Accelerate Development.
            </p>
            <p className="mt-3 text-xs text-ink-muted/70">Prototype / Demonstration Platform</p>
          </div>
          <div>
            <h4 className="text-[11px] font-600 uppercase tracking-[0.14em] text-ink-muted">Platform</h4>
            <ul className="mt-3 space-y-2">
              {LINKS.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-ink-muted transition-colors hover:text-brand-primary">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-600 uppercase tracking-[0.14em] text-ink-muted">Disclaimer</h4>
            <p className="mt-3 text-xs leading-relaxed text-ink-muted/80">
              This is a demonstration platform. It does not claim official Government of India ownership or
              endorsement. All data shown is illustrative.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-surface-border pt-6 text-xs text-ink-muted">
          © 2026 LANDVISION AI — Predictive Land Acquisition Intelligence. Prototype for demonstration purposes.
        </div>
      </div>
    </footer>
  );
}
