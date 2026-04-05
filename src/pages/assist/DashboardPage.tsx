import { GlassPanel } from "@/components/ui/glass-panel";

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-on-surface">ass@ist</h1>
        <p className="text-on-surface-variant mt-1">Persona Co-Pilot - Context-aware AI Assistance & Field Operations</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">Active Tasks</span>
          </div>
          <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">18</p>
          <p className="text-[10px] text-primary mt-1">+5 new today</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">Field Agents</span>
          </div>
          <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">12</p>
          <p className="text-[10px] text-secondary mt-1">On duty</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">Completion Rate</span>
          </div>
          <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">94%</p>
          <p className="text-[10px] text-tertiary mt-1">Above target</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">AI Prompts</span>
          </div>
          <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">2,847</p>
          <p className="text-[10px] text-primary mt-1">Today</p>
        </GlassPanel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <GlassPanel className="p-6">
          <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Active Field Operations</h3>
          <div className="space-y-3">
            {[
              { id: "FO-001", location: "Downtown District", status: "In Progress", agent: "Agent Smith" },
              { id: "FO-002", location: "Airport Terminal", status: "Pending", agent: "Agent Johnson" },
              { id: "FO-003", location: "Shopping Mall", status: "Completed", agent: "Agent Williams" },
            ].map((op) => (
              <div key={op.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
                <div>
                  <p className="text-sm font-medium text-on-surface">{op.location}</p>
                  <p className="text-xs text-on-surface-variant">{op.id} - {op.agent}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                  op.status === "In Progress" ? "bg-primary/20 text-primary" :
                  op.status === "Pending" ? "bg-secondary/20 text-secondary" :
                  "bg-tertiary/20 text-tertiary"
                }`}>
                  {op.status}
                </span>
              </div>
            ))}
          </div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">AI Assistant Actions</h3>
          <div className="space-y-2">
            {["Generate Field Report", "Auto-categorize Ticket", "Sync with HQ Database"].map((action) => (
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