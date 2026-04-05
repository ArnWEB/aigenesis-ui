import { GlassPanel } from "@/components/ui/glass-panel";

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-on-surface">Admin Dashboard</h1>
        <p className="text-on-surface-variant mt-1">System administration and governance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">Total Users</span>
          </div>
          <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">156</p>
          <p className="text-[10px] text-primary mt-1">+12 this month</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">Active Sessions</span>
          </div>
          <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">42</p>
          <p className="text-[10px] text-secondary mt-1">Online now</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">System Health</span>
          </div>
          <p className="text-xl lg:text-2xl font-headline font-bold text-tertiary">98.5%</p>
          <p className="text-[10px] text-tertiary mt-1">All systems operational</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">API Requests</span>
          </div>
          <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">24.8K</p>
          <p className="text-[10px] text-primary mt-1">Today</p>
        </GlassPanel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <GlassPanel className="p-6">
          <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: "User login", user: "Alex Thompson", time: "2 min ago" },
              { action: "Policy created", user: "Sarah Chen", time: "15 min ago" },
              { action: "Claim approved", user: "Marcus Thorne", time: "32 min ago" },
              { action: "Settings updated", user: "Admin", time: "1 hr ago" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
                <div>
                  <p className="text-sm font-medium text-on-surface">{item.action}</p>
                  <p className="text-xs text-on-surface-variant">{item.user}</p>
                </div>
                <span className="text-xs text-on-surface-variant">{item.time}</span>
              </div>
            ))}
          </div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {["Manage Users", "System Settings", "View Logs", "Backup Data"].map((action) => (
              <button key={action} className="w-full p-3 text-left text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 rounded-lg transition-colors">
                {action}
              </button>
            ))}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}