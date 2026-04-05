import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";

const riskData = [
  { id: "RSK-001", category: "Fraud Detection", score: 85, trend: "+5%", status: "high" },
  { id: "RSK-002", category: "Credit Risk", score: 62, trend: "-3%", status: "medium" },
  { id: "RSK-003", category: "Market Risk", score: 45, trend: "0%", status: "low" },
  { id: "RSK-004", category: "Operational Risk", score: 71, trend: "+8%", status: "high" },
  { id: "RSK-005", category: "Compliance Risk", score: 38, trend: "-2%", status: "low" },
];

export function RiskPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold text-on-surface">Risk Assessment</h1>
        <p className="text-on-surface-variant mt-1">Monitor and analyze risk metrics across portfolios</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassPanel className="p-4">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider">Overall Risk Score</span>
          <p className="text-2xl font-headline font-bold text-error mt-1">72%</p>
          <p className="text-[10px] text-error mt-1">+3% from last month</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider">High Risk Items</span>
          <p className="text-2xl font-headline font-bold text-on-surface mt-1">12</p>
          <p className="text-[10px] text-primary mt-1">2 requiring immediate action</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider">Risk Alerts</span>
          <p className="text-2xl font-headline font-bold text-on-surface mt-1">7</p>
          <p className="text-[10px] text-secondary mt-1">3 new this week</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider">Policies at Risk</span>
          <p className="text-2xl font-headline font-bold text-on-surface mt-1">89</p>
          <p className="text-[10px] text-tertiary mt-1">-5% improvement</p>
        </GlassPanel>
      </div>

      <GlassPanel className="p-6">
        <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Risk Categories</h3>
        <div className="space-y-4">
          {riskData.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-on-surface">{item.category}</span>
                  <span className={cn(
                    "text-xs font-bold",
                    item.status === "high" ? "text-error" : item.status === "medium" ? "text-secondary" : "text-tertiary"
                  )}>
                    {item.score}% {item.trend}
                  </span>
                </div>
                <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all",
                      item.status === "high" ? "bg-error" : item.status === "medium" ? "bg-secondary" : "bg-tertiary"
                    )}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
              <button className="px-3 py-1 text-xs bg-surface-container text-on-surface-variant rounded-lg hover:bg-surface-bright">
                Details
              </button>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}