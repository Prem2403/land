import { Shield, Bell, Globe, KeyRound } from 'lucide-react';

export function SettingsView() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card-base p-5">
        <div className="flex items-center gap-2 text-brand-primary">
          <Shield size={18} />
          <h3 className="font-heading text-sm font-700 uppercase tracking-wide text-ink">Security</h3>
        </div>
        <div className="mt-4 space-y-3">
          <Toggle label="Role-Based Access Control" desc="Enforce per-role permissions" defaultOn />
          <Toggle label="JWT Authentication" desc="Token-based session management" defaultOn />
          <Toggle label="Protected Routes" desc="Require auth on all dashboard routes" defaultOn />
          <Toggle label="Two-Factor Authentication" desc="Require OTP on login" />
        </div>
      </div>

      <div className="card-base p-5">
        <div className="flex items-center gap-2 text-brand-primary">
          <Bell size={18} />
          <h3 className="font-heading text-sm font-700 uppercase tracking-wide text-ink">Notifications</h3>
        </div>
        <div className="mt-4 space-y-3">
          <Toggle label="Critical Risk Alerts" desc="Email + in-app on critical risk change" defaultOn />
          <Toggle label="Weekly Summary" desc="Digest of platform activity" defaultOn />
          <Toggle label="Model Drift Alerts" desc="Notify when model accuracy drops" />
        </div>
      </div>

      <div className="card-base p-5">
        <div className="flex items-center gap-2 text-brand-primary">
          <Globe size={18} />
          <h3 className="font-heading text-sm font-700 uppercase tracking-wide text-ink">Platform</h3>
        </div>
        <div className="mt-4 space-y-3">
          <Field label="Default Language" value="English (India)" />
          <Field label="Time Zone" value="Asia/Kolkata (IST)" />
          <Field label="Date Format" value="DD MMM YYYY" />
        </div>
      </div>

      <div className="card-base p-5">
        <div className="flex items-center gap-2 text-brand-primary">
          <KeyRound size={18} />
          <h3 className="font-heading text-sm font-700 uppercase tracking-wide text-ink">API & Integrations</h3>
        </div>
        <div className="mt-4 space-y-3">
          <Field label="Supabase Project" value="Connected" />
          <Field label="GIS Tile Provider" value="Configured" />
          <Field label="Webhook Endpoint" value="https://api.landvision.example/hook" />
        </div>
      </div>
    </div>
  );
}

function Toggle({ label, desc, defaultOn = false }: { label: string; desc: string; defaultOn?: boolean }) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-surface-border bg-surface-base p-3.5">
      <div>
        <div className="text-sm font-600 text-ink">{label}</div>
        <div className="text-xs text-ink-muted">{desc}</div>
      </div>
      <input type="checkbox" defaultChecked={defaultOn} className="peer sr-only" />
      <span className="relative h-6 w-11 rounded-full bg-surface-border transition-colors peer-checked:bg-brand-primary after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5" />
    </label>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-surface-border bg-surface-base p-3.5">
      <span className="text-sm font-600 text-ink">{label}</span>
      <span className="text-sm text-ink-muted">{value}</span>
    </div>
  );
}
