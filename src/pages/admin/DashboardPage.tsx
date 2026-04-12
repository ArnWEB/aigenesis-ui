import { GlassPanel } from "@/components/ui/glass-panel";
import { MetricChip } from "@/components/ui/MetricChip";

export function DashboardPage() {
  const metrics = {
    activeUserRatio: { value1: "42/152", value2: "28%", trend: "2% increase from last month", trendDirection: "up" },
    userEngagement: { value1: "34/42", value2: "80%", subtitle: "34 people online now", trend: null, trendDirection: "online" },
    knowledgeIndexes: { value1: "9", subtitle: "Knowledge indexes", trend: null, trendDirection: null },
    requestsToday: { value1: "20", subtitle: "Processed today", trend: null, trendDirection: null },
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-on-surface">Admin Dashboard</h1>
        <p className="text-on-surface-variant mt-1">System administration and governance</p>
      </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
<MetricChip
          variant="pipe"
          title="Active User Ratio"
          value1={metrics.activeUserRatio.value1}
          value2={metrics.activeUserRatio.value2}
          trend={metrics.activeUserRatio.trend}
          trendDirection={metrics.activeUserRatio.trendDirection as "up" | "down" | null}
          infoText="Users currently in the organization as a % of total users"
        />
        <MetricChip
          variant="pipe"
          title="User Engagement"
          value1={metrics.userEngagement.value1}
          value2={metrics.userEngagement.value2}
          subtitle={metrics.userEngagement.subtitle}
          trendDirection="online"
          infoText="Percentage of active users who are actively using the platform"
        />
        <MetricChip
          variant="pipe"
          title="Number of Knowledge Indexes"
          value1={metrics.knowledgeIndexes.value1}
          subtitle={metrics.knowledgeIndexes.subtitle}
          infoText="Total knowledge indexes configured in the system"
        />
        <MetricChip
          variant="pipe"
          title="Number of Requests Processed Today"
          value1={metrics.requestsToday.value1}
          subtitle={metrics.requestsToday.subtitle}
          infoText="Total number of tickets processed across the platform"
        />
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
