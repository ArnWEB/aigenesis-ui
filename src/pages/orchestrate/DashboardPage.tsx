import { useState, useEffect } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { MetricChip } from "@/components/ui/MetricChip";
import { cn } from "@/lib/utils";

interface Ticket {
  id: string;
  title: string;
  customer: string;
  email: string;
  status: "open" | "in_progress" | "resolved";
  priority: "high" | "medium" | "low";
  created: string;
  description: string;
  agentResponse?: string;
}

interface ApiResponse {
  data: {
    email: string;
    case_id: number;
    message: string;
    subject: string;
    body: string;
    date_time: string;
    response: string;
  }[];
  count: number;
  details: string;
}

const mockTickets: Ticket[] = [
  {
    id: "SRN0001",
    title: "Policy renewal inquiry",
    customer: "John Smith",
    email: "john.smith@email.com",
    status: "open",
    priority: "high",
    created: "2026-04-09 10:30",
    description: "Customer wants to renew their auto insurance policy expiring next month. Requested information about current rates and available discounts.",
    agentResponse: "Hi John, I've reviewed your policy and can offer you a 15% renewal discount for being a loyal customer. Your new premium would be $1,250/year. Would you like to proceed with the renewal?"
  },
  {
    id: "SRN0002",
    title: "Claim status update request",
    customer: "Sarah Johnson",
    email: "sarah.j@email.com",
    status: "in_progress",
    priority: "medium",
    created: "2026-04-09 09:15",
    description: "Customer is following up on claim #SRN0001 submitted last week. Wants to know current status and expected timeline.",
    agentResponse: "Hi Sarah, I've checked your claim status. It's currently under review by our claims team. You should receive an update within 3-5 business days. I'll keep you posted on any progress."
  },
  {
    id: "SRN0003",
    title: "Documentation submission",
    customer: "Mike Williams",
    email: "mike.w@email.com",
    status: "open",
    priority: "low",
    created: "2026-04-08 16:45",
    description: "Customer submitted additional documents for their home insurance claim. Needs acknowledgment of receipt.",
    agentResponse: "Thank you for submitting the documents, Mike. I've received all the materials and forwarded them to our assessment team. You'll be notified once the review is complete."
  },
  {
    id: "SRN0004",
    title: "Premium calculation clarification",
    customer: "Emily Davis",
    email: "emily.d@email.com",
    status: "open",
    priority: "high",
    created: "2026-04-08 14:20",
    description: "Customer confused about premium breakdown for their commercial policy. Requesting detailed explanation.",
    agentResponse: "Hi Emily, I've prepared a detailed breakdown of your commercial policy premium. The base rate is $2,500, with additional coverage options totaling $800. This gives you a comprehensive package at $3,300/year."
  },
  {
    id: "SRN0005",
    title: "Policy cancellation request",
    customer: "Robert Brown",
    email: "r.brown@email.com",
    status: "in_progress",
    priority: "medium",
    created: "2026-04-08 11:00",
    description: "Customer requesting cancellation of life insurance policy. Needs information about refund eligibility.",
    agentResponse: "Hi Robert, I can process your cancellation request. Based on your policy terms, you're eligible for a prorated refund of $450. Please confirm if you'd like to proceed with cancellation."
  },
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

export function DashboardPage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://aigene.tamojitray.in:6969/cases');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse = await response.json();

      const mappedTickets: Ticket[] = data.data.map((item) => ({
        id: String(item.case_id),
        title: item.subject,
        customer: item.email.split('@')[0],
        email: item.email,
        status: item.message === "Completed" ? "resolved" : item.message === "Processing" ? "in_progress" : "open",
        priority: "medium" as const,
        created: item.date_time,
        description: item.body,
        agentResponse: item.response
      }));

      setTickets(mappedTickets);
    } catch (err) {
      console.log('Using mock data - fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const displayTickets = tickets.length > 0 ? tickets : mockTickets;
  const openTickets = displayTickets.filter(t => t.status === "open");
  const allTickets = displayTickets;

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-headline"><span className="text-primary">@i</span>Orchestrate</h1>
          <p className="text-on-surface-variant mt-1">Agentic workflow for Customer Service & Operation</p>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline"><span className="text-primary">@i</span>Orchestrate</h1>
        <p className="text-on-surface-variant mt-1">Agentic workflow for Customer Service & Operation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
        <MetricChip
          title="Open Tickets"
          value1={openTickets.length}
          value2="tickets"
          trend="+2% from last week"
          trendDirection="up"
        />
        <MetricChip
          title="Avg Handling Time"
          value1="24"
          value2="minutes"
          trend="-15s improved from last week"
          trendDirection="up"
        />
        <MetricChip
          title="Turn Around Time"
          value1="49"
          value2="minutes"
          trend="+4 mins from last week"
          trendDirection="up"
        />
        <MetricChip
          title="Agent Resolution"
          value1="98%"
          value2="rate"
          trend="0.7% increase from last week"
          trendDirection="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <GlassPanel className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-headline font-semibold text-on-surface">Recent Tickets</h3>
              <span className="text-xs text-on-surface-variant">{allTickets.length} tickets</span>
            </div>
            {allTickets.length === 0 ? (
              <p className="text-on-surface-variant text-center py-4">No tickets found</p>
            ) : (
              <div className="space-y-3">
                {allTickets.map((ticket) => (
                  <button
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-lg border transition-all text-left",
                      selectedTicket?.id === ticket.id
                        ? "bg-primary/10 border-primary"
                        : "bg-surface-container-low border-transparent hover:bg-surface-bright/50 hover:border-outline-variant/30"
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-primary">{ticket.id}</span>
                        <span className={cn("text-[10px] font-bold uppercase px-1.5 py-0.5 rounded", priorityStyles[ticket.priority])}>
                          {ticket.priority}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-on-surface truncate">{ticket.title}</p>
                      <p className="text-xs text-on-surface-variant">{ticket.customer} • {ticket.created}</p>
                    </div>
                    <div className={cn(
                      "px-2 py-1 rounded-full text-[10px] font-bold uppercase border ml-3",
                      statusStyles[ticket.status]
                    )}>
                      {ticket.status.replace("_", " ")}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </GlassPanel>
        </div>

        <div className="space-y-4">
          {selectedTicket ? (
            <GlassPanel className="p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-headline font-semibold text-on-surface">Ticket Details</h3>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-on-surface-variant hover:text-on-surface"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Customer</p>
                  <p className="text-sm font-medium text-on-surface">{selectedTicket.customer}</p>
                  <p className="text-xs text-on-surface-variant">{selectedTicket.email}</p>
                </div>

                <div>
                  <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Issue</p>
                  <p className="text-sm text-on-surface">{selectedTicket.description}</p>
                </div>

                <div className="pt-4 border-t border-outline-variant/20">
                  <p className="text-xs text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Agent Response
                  </p>
                  <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                    <p className="text-sm text-on-surface leading-relaxed">
                      {selectedTicket.agentResponse}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button className="flex-1 py-2 px-3 bg-primary text-on-primary rounded-lg text-sm font-medium hover:brightness-110 transition-all">
                    Resolve
                  </button>
                  <button className="flex-1 py-2 px-3 bg-surface-container text-on-surface-variant rounded-lg text-sm font-medium hover:bg-surface-bright transition-all">
                    Escalate
                  </button>
                </div>
              </div>
            </GlassPanel>
          ) : (
            <GlassPanel className="p-6">
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-surface-container flex items-center justify-center">
                  <svg className="w-6 h-6 text-on-surface-variant" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <p className="text-sm text-on-surface-variant">Select a ticket to view details</p>
              </div>
            </GlassPanel>
          )}
        </div>
      </div>
    </div>
  );
}