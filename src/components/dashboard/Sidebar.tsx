import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FolderKanban, Map, Brain, BarChart3, Bell, FileText,
  Upload, Activity, RefreshCw, Users, ScrollText, Settings,
  Menu, X, LogOut, ChevronRight,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export type DashView =
  | 'dashboard' | 'projects' | 'gis' | 'insights' | 'analytics'
  | 'alerts' | 'reports' | 'upload' | 'model' | 'retraining'
  | 'users' | 'audit' | 'settings';

interface SidebarProps {
  active: DashView;
  onNavigate: (v: DashView) => void;
  onLogout: () => void;
}

const MAIN_NAV: { id: DashView; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'gis', label: 'GIS Risk Map', icon: Map },
  { id: 'insights', label: 'AI Insights', icon: Brain },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'reports', label: 'Reports', icon: FileText },
];

const ADMIN_NAV: { id: DashView; label: string; icon: typeof Settings }[] = [
  { id: 'upload', label: 'Data Upload', icon: Upload },
  { id: 'model', label: 'Model Performance', icon: Activity },
  { id: 'retraining', label: 'Model Retraining', icon: RefreshCw },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'audit', label: 'Audit Logs', icon: ScrollText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ active, onNavigate, onLogout }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = (
    <div className="flex h-full flex-col bg-brand-dark text-white">
      <div className="flex h-16 items-center border-b border-white/10 px-5">
        <Logo />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <div className="px-2 text-[10px] font-600 uppercase tracking-[0.16em] text-brand-subtle/60">
          Main
        </div>
        <div className="mt-2 space-y-0.5">
          {MAIN_NAV.map((item) => (
            <NavButton key={item.id} item={item} active={active} onNavigate={(v) => { onNavigate(v); setMobileOpen(false); }} />
          ))}
        </div>

        <div className="mt-6 px-2 text-[10px] font-600 uppercase tracking-[0.16em] text-brand-subtle/60">
          Admin
        </div>
        <div className="mt-2 space-y-0.5">
          {ADMIN_NAV.map((item) => (
            <NavButton key={item.id} item={item} active={active} onNavigate={(v) => { onNavigate(v); setMobileOpen(false); }} />
          ))}
        </div>
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-500 text-brand-light/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-64 shrink-0 lg:block">{content}</aside>

      {/* Mobile top bar */}
      <div className="flex h-14 items-center justify-between border-b border-surface-border bg-white px-4 lg:hidden">
        <Logo />
        <button
          onClick={() => setMobileOpen(true)}
          className="grid h-9 w-9 place-items-center rounded-lg border border-surface-border text-ink"
        >
          <Menu size={18} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavButton({
  item,
  active,
  onNavigate,
}: {
  item: { id: DashView; label: string; icon: typeof LayoutDashboard };
  active: DashView;
  onNavigate: (v: DashView) => void;
}) {
  const isActive = active === item.id;
  return (
    <button
      onClick={() => onNavigate(item.id)}
      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-500 transition-all ${
        isActive
          ? 'bg-white/10 text-white'
          : 'text-brand-light/70 hover:bg-white/5 hover:text-white'
      }`}
    >
      <item.icon size={17} className={isActive ? 'text-brand-accent' : ''} />
      {item.label}
      {isActive && <ChevronRight size={14} className="ml-auto text-brand-accent" />}
    </button>
  );
}
