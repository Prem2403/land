import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, LogIn } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

interface NavbarProps {
  onLogin: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'About', href: '#about' },
];

export function Navbar({ onLogin }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#home" className="flex items-center">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm font-500 text-ink-muted transition-colors hover:bg-brand-light hover:text-brand-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onLogin}
            className="hidden items-center gap-2 rounded-xl bg-brand-primary px-4 py-2 text-sm font-600 text-white shadow-sm transition-all hover:bg-brand-secondary hover:shadow-md sm:flex"
          >
            <LogIn size={16} />
            Login
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-surface-border text-ink md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t border-surface-border bg-white md:hidden"
        >
          <div className="flex flex-col gap-1 px-5 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-500 text-ink-muted hover:bg-brand-light hover:text-brand-primary"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onLogin();
              }}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-600 text-white"
            >
              <LogIn size={16} />
              Login
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
