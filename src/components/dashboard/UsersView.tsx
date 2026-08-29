import { Shield, Crown, MapPin, Building2, Eye } from 'lucide-react';

const USERS = [
  { name: 'Arun Kumar', email: 'arun.kumar@gov.in', role: 'Admin', icon: Crown, status: 'Active' },
  { name: 'Sneha Patel', email: 'sneha.patel@gov.in', role: 'State Officer', icon: Shield, status: 'Active' },
  { name: 'Rajesh Mehta', email: 'rajesh.mehta@gov.in', role: 'District Officer', icon: Building2, status: 'Active' },
  { name: 'Priya Nair', email: 'priya.nair@gov.in', role: 'Decision Maker', icon: MapPin, status: 'Active' },
  { name: 'Vikram Singh', email: 'vikram.singh@gov.in', role: 'Viewer', icon: Eye, status: 'Inactive' },
];

const ROLE_COLORS: Record<string, string> = {
  Admin: '#991B1B',
  'State Officer': '#0B5D3B',
  'District Officer': '#146C43',
  'Decision Maker': '#087F5B',
  Viewer: '#60756B',
};

export function UsersView() {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-5">
        {Object.keys(ROLE_COLORS).map((role) => {
          const count = USERS.filter((u) => u.role === role).length;
          return (
            <div key={role} className="card-base p-4">
              <div className="text-xs font-600 uppercase tracking-wide text-ink-muted">{role}</div>
              <div className="mt-1 font-heading text-2xl font-700 text-ink tabular">{count}</div>
            </div>
          );
        })}
      </div>

      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-light/50 text-[11px] font-600 uppercase tracking-[0.12em] text-ink-muted">
              <tr>
                <th className="px-5 py-3.5">User</th>
                <th className="px-5 py-3.5">Email</th>
                <th className="px-5 py-3.5">Role</th>
                <th className="px-5 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {USERS.map((u) => (
                <tr key={u.email} className="hover:bg-surface-base/50">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-light text-brand-primary">
                        <u.icon size={16} />
                      </div>
                      <span className="font-600 text-ink">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-ink-muted">{u.email}</td>
                  <td className="px-5 py-3.5">
                    <span className="rounded-full px-2.5 py-0.5 text-xs font-600" style={{ backgroundColor: `${ROLE_COLORS[u.role]}14`, color: ROLE_COLORS[u.role] }}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-600 ${u.status === 'Active' ? 'bg-green-50 text-risk-low' : 'bg-gray-50 text-ink-muted'}`}>
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
