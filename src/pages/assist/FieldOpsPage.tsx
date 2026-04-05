import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";

const fieldOps = [
  { id: "FO-001", location: "Downtown District", type: "Inspection", status: "in_progress", agent: "Agent Smith", eta: "15 min" },
  { id: "FO-002", location: "Airport Terminal", type: "Claim Verification", status: "pending", agent: "Agent Johnson", eta: "45 min" },
  { id: "FO-003", location: "Shopping Mall", type: "Damage Assessment", status: "completed", agent: "Agent Williams", eta: "-" },
  { id: "FO-004", location: "Industrial Zone", type: "Risk Survey", status: "in_progress", agent: "Agent Brown", eta: "30 min" },
  { id: "FO-005", location: "Residential Area", type: "Policy Review", status: "pending", agent: "Unassigned", eta: "1 hr" },
];

const statusStyles = {
  pending: "bg-secondary/20 text-secondary border-secondary/30",
  in_progress: "bg-primary/20 text-primary border-primary/30",
  completed: "bg-tertiary/20 text-tertiary border-tertiary/30",
};

export function FieldOpsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-on-surface">Field Operations</h1>
          <p className="text-on-surface-variant mt-1">Manage field agent tasks and assignments</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-primary to-primary-dim text-on-primary rounded-lg font-medium hover:scale-105 transition-transform">
          + New Assignment
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassPanel className="p-4">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider">Total Operations</span>
          <p className="text-2xl font-headline font-bold text-on-surface mt-1">28</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider">In Progress</span>
          <p className="text-2xl font-headline font-bold text-primary mt-1">12</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider">Pending</span>
          <p className="text-2xl font-headline font-bold text-secondary mt-1">8</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider">Completed</span>
          <p className="text-2xl font-headline font-bold text-tertiary mt-1">8</p>
        </GlassPanel>
      </div>

      <GlassPanel className="overflow-hidden">
        <div className="p-4 border-b border-outline-variant/10">
          <h3 className="text-lg font-headline font-semibold text-on-surface">Active Assignments</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-outline-variant/10">
              <th className="px-4 py-3 text-left text-xs font-label uppercase text-on-surface-variant">ID</th>
              <th className="px-4 py-3 text-left text-xs font-label uppercase text-on-surface-variant">Location</th>
              <th className="px-4 py-3 text-left text-xs font-label uppercase text-on-surface-variant">Type</th>
              <th className="px-4 py-3 text-left text-xs font-label uppercase text-on-surface-variant">Agent</th>
              <th className="px-4 py-3 text-left text-xs font-label uppercase text-on-surface-variant">ETA</th>
              <th className="px-4 py-3 text-left text-xs font-label uppercase text-on-surface-variant">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {fieldOps.map((op) => (
              <tr key={op.id} className="hover:bg-surface-bright/40 transition-colors cursor-pointer">
                <td className="px-4 py-3 text-sm font-medium text-primary">{op.id}</td>
                <td className="px-4 py-3 text-sm text-on-surface">{op.location}</td>
                <td className="px-4 py-3 text-sm text-on-surface-variant">{op.type}</td>
                <td className="px-4 py-3 text-sm text-on-surface-variant">{op.agent}</td>
                <td className="px-4 py-3 text-sm text-on-surface-variant">{op.eta}</td>
                <td className="px-4 py-3">
                  <span className={cn("px-2 py-1 rounded-full text-[10px] font-bold uppercase border", statusStyles[op.status as keyof typeof statusStyles])}>
                    {op.status.replace("_", " ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassPanel>
    </div>
  );
}