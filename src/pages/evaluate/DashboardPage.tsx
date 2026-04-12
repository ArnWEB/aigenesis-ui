import { GlassPanel } from "@/components/ui/glass-panel";
import { MetricChip } from "@/components/ui/MetricChip";
import { ReferredBotPanel } from "@/components/ui/ReferredBotPanel";

const kpiData = [
  {
    title: "Underwriting Cycle Time",
    value: "2.8 days",
    delta: "-0.4 days from last quarter",
    trendDirection: "down" as const,
    subtitle: "Faster",
    status: "good" as const,
  },
  {
    title: "Case Approval Rate",
    value: "68%",
    delta: "+3% from last quarter",
    trendDirection: "up" as const,
    subtitle: "Stable",
    status: "neutral" as const,
  },
  {
    title: "Quote-to-Bind Ratio",
    value: "42%",
    delta: "+4% from last quarter",
    trendDirection: "up" as const,
    subtitle: "Improving",
    status: "good" as const,
  },
  {
    title: "Referral Rate",
    value: "18%",
    delta: "+2% from last quarter",
    trendDirection: "up" as const,
    subtitle: "Slightly High",
    status: "warning" as const,
  },
];

const referredData = [
  { id: "CLM-8902", name: "John D.", amount: "$45,000", status: "Standard" as const },
  { id: "CLM-8903", name: "Sarah M.", amount: "$12,500", status: "Preferred" as const },
  { id: "CLM-8904", name: "Mike R.", amount: "$8,200", status: "Preferred" as const },
];

const tasks = [
  "Review Quote Request",
  "Approve Policy Terms",
  "Request Additional Info",
];

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-on-surface"><span className="text-primary">@i</span>Evaluate</h1>
        <p className="text-on-surface-variant mt-1">Workbench for Leads - Claim Adjudication & Risk Assessment</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <MetricChip
            key={kpi.title}
            title={kpi.title}
            value1={kpi.value}
            trend={kpi.delta}
            trendDirection={kpi.trendDirection}
            subtitle={kpi.subtitle}
            status={kpi.status}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <ReferredBotPanel items={referredData} />
        <GlassPanel className="p-6">
          <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Underwriting Tasks</h3>
          <div className="space-y-2">
            {tasks.map((task) => (
              <button key={task} className="w-full p-3 text-left text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 rounded-lg transition-colors">
                {task}
              </button>
            ))}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}