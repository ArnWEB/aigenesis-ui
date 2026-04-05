import { GlassPanel } from "@/components/ui/glass-panel";

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-on-surface">orchestr@ite</h1>
        <p className="text-on-surface-variant mt-1">Human-in-the-loop orchestration for Customer Service & Underwriting</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">Active Tickets</span>
          </div>
          <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">24</p>
          <p className="text-[10px] text-primary mt-1">+12% from last week</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">Avg Response Time</span>
          </div>
          <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">2.4m</p>
          <p className="text-[10px] text-secondary mt-1">-15s improved</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">CSAT Score</span>
          </div>
          <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">4.9</p>
          <p className="text-[10px] text-tertiary mt-1">Top tier</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">Resolution Rate</span>
          </div>
          <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">98%</p>
          <p className="text-[10px] text-primary mt-1">High performance</p>
        </GlassPanel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <GlassPanel className="p-6">
          <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Recent Tickets</h3>
          <div className="space-y-3">
            {[
              { id: "TKT-001", title: "Policy renewal inquiry", status: "Open", priority: "High" },
              { id: "TKT-002", title: "Claim status update request", status: "In Progress", priority: "Medium" },
              { id: "TKT-003", title: "Documentation submission", status: "Resolved", priority: "Low" },
            ].map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
                <div>
                  <p className="text-sm font-medium text-on-surface">{ticket.title}</p>
                  <p className="text-xs text-on-surface-variant">{ticket.id}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                  ticket.status === "Open" ? "bg-error/20 text-error" :
                  ticket.status === "In Progress" ? "bg-secondary/20 text-secondary" :
                  "bg-tertiary/20 text-tertiary"
                }`}>
                  {ticket.status}
                </span>
              </div>
            ))}
          </div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {["Create New Ticket", "View Pending Queue", "Escalate to UW"].map((action) => (
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