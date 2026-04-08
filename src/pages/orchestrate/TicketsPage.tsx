import { useState } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";

const mockTickets = [
  { id: "TKT-001", title: "Policy renewal inquiry", status: "open", priority: "high", created: "2026-04-05", assignee: "Alex T." },
  { id: "TKT-002", title: "Claim status update request", status: "in_progress", priority: "medium", created: "2026-04-05", assignee: "Sarah C." },
  { id: "TKT-003", title: "Documentation submission", status: "resolved", priority: "low", created: "2026-04-04", assignee: "Marcus T." },
  { id: "TKT-004", title: "Premium calculation clarification", status: "open", priority: "high", created: "2026-04-04", assignee: "Unassigned" },
  { id: "TKT-005", title: "Policy cancellation request", status: "in_progress", priority: "medium", created: "2026-04-03", assignee: "Elena J." },
];

const statusStyles = {
  open: "bg-error/20 text-error border-error/30",
  in_progress: "bg-secondary/20 text-secondary border-secondary/30",
  resolved: "bg-tertiary/20 text-tertiary border-tertiary/30",
};

const priorityStyles = {
  high: "text-error",
  medium: "text-secondary",
  low: "text-tertiary",
};

export function TicketsPage() {
  const [filter, setFilter] = useState<string>("all");

  const filteredTickets = filter === "all" 
    ? mockTickets 
    : mockTickets.filter(t => t.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-on-surface">Tickets</h1>
          <p className="text-on-surface-variant mt-1">Manage and track customer service tickets</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-primary to-primary-dim text-on-primary rounded-lg font-medium hover:scale-105 transition-transform">
          + New Ticket
        </button>
      </div>

      <div className="flex gap-2">
        {["all", "open", "in_progress", "resolved"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              filter === f 
                ? "bg-primary text-on-primary" 
                : "bg-surface-container text-on-surface-variant hover:text-on-surface"
            )}
          >
            {f.replace("_", " ").charAt(0).toUpperCase() + f.replace("_", " ").slice(1)}
          </button>
        ))}
      </div>

      <GlassPanel className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-outline-variant/10">
              <th className="px-4 py-3 text-left text-xs font-label uppercase tracking-wider text-on-surface-variant">ID</th>
              <th className="px-4 py-3 text-left text-xs font-label uppercase tracking-wider text-on-surface-variant">Title</th>
              <th className="px-4 py-3 text-left text-xs font-label uppercase tracking-wider text-on-surface-variant">Priority</th>
              <th className="px-4 py-3 text-left text-xs font-label uppercase tracking-wider text-on-surface-variant">Status</th>
              <th className="px-4 py-3 text-left text-xs font-label uppercase tracking-wider text-on-surface-variant">Assignee</th>
              <th className="px-4 py-3 text-left text-xs font-label uppercase tracking-wider text-on-surface-variant">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-surface-bright/40 transition-colors cursor-pointer">
                <td className="px-4 py-3 text-sm font-medium text-primary">{ticket.id}</td>
                <td className="px-4 py-3 text-sm text-on-surface">{ticket.title}</td>
                <td className="px-4 py-3">
                  <span className={cn("text-xs font-bold uppercase", priorityStyles[ticket.priority as keyof typeof priorityStyles])}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={cn("px-2 py-1 rounded-full text-[10px] font-bold uppercase border", statusStyles[ticket.status as keyof typeof statusStyles])}>
                    {ticket.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-on-surface-variant">{ticket.assignee}</td>
                <td className="px-4 py-3 text-sm text-on-surface-variant">{ticket.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassPanel>
    </div>
  );
}