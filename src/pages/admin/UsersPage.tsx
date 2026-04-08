import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";

const users = [
  { id: "usr-001", name: "Alex Thompson", email: "alex.thompson@aegis.ai", role: "executive", status: "active", lastActive: "2 min ago" },
  { id: "usr-002", name: "Sarah Chen", email: "sarah.chen@aegis.ai", role: "underwriter", status: "active", lastActive: "15 min ago" },
  { id: "usr-003", name: "Marcus Thorne", email: "marcus.thorne@aegis.ai", role: "adjudicator", status: "active", lastActive: "32 min ago" },
  { id: "usr-004", name: "Elena Jorgensen", email: "elena.jorgensen@aegis.ai", role: "customer_service", status: "active", lastActive: "1 hr ago" },
  { id: "usr-005", name: "David Kim", email: "david.kim@aegis.ai", role: "operations", status: "inactive", lastActive: "2 days ago" },
  { id: "usr-006", name: "James Wilson", email: "james.wilson@aegis.ai", role: "agent", status: "active", lastActive: "5 min ago" },
  { id: "usr-007", name: "Maria Garcia", email: "maria.garcia@aegis.ai", role: "customer", status: "active", lastActive: "1 day ago" },
];

const roleStyles: Record<string, string> = {
  executive: "bg-primary/20 text-primary",
  underwriter: "bg-secondary/20 text-secondary",
  adjudicator: "bg-tertiary/20 text-tertiary",
  customer_service: "bg-error/20 text-error",
  operations: "bg-primary/20 text-primary",
  agent: "bg-primary/20 text-primary",
  customer: "bg-secondary/20 text-secondary",
};

export function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-on-surface">Users</h1>
          <p className="text-on-surface-variant mt-1">Manage user accounts and permissions</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-primary to-primary-dim text-on-primary rounded-lg font-medium hover:scale-105 transition-transform">
          + Add User
        </button>
      </div>

      <GlassPanel className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-outline-variant/10">
              <th className="px-4 py-3 text-left text-xs font-label uppercase text-on-surface-variant">User</th>
              <th className="px-4 py-3 text-left text-xs font-label uppercase text-on-surface-variant">Role</th>
              <th className="px-4 py-3 text-left text-xs font-label uppercase text-on-surface-variant">Status</th>
              <th className="px-4 py-3 text-left text-xs font-label uppercase text-on-surface-variant">Last Active</th>
              <th className="px-4 py-3 text-left text-xs font-label uppercase text-on-surface-variant">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-surface-bright/40 transition-colors">
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-on-surface">{user.name}</p>
                    <p className="text-xs text-on-surface-variant">{user.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={cn("px-2 py-1 rounded-full text-[10px] font-bold uppercase", roleStyles[user.role])}>
                    {user.role.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={cn("px-2 py-1 rounded-full text-[10px] font-bold uppercase", user.status === "active" ? "bg-tertiary/20 text-tertiary" : "bg-surface-container text-on-surface-variant")}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-on-surface-variant">{user.lastActive}</td>
                <td className="px-4 py-3">
                  <button className="text-xs text-primary hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassPanel>
    </div>
  );
}