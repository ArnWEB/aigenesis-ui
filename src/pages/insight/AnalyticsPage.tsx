import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";

const metrics = [
  { label: "Conversion Rate", value: "24.5%", change: "+2.3%", positive: true },
  { label: "Avg Quote Time", value: "4.2 min", change: "-18%", positive: true },
  { label: "Quote to Bind", value: "68%", change: "+5%", positive: true },
  { label: "Loss Ratio", value: "62%", change: "-3%", positive: true },
];

const trends = [
  { period: "Q1 2025", gwp: 980, claims: 580, profit: 400 },
  { period: "Q2 2025", gwp: 1050, claims: 610, profit: 440 },
  { period: "Q3 2025", gwp: 1120, claims: 640, profit: 480 },
  { period: "Q4 2025", gwp: 1180, claims: 680, profit: 500 },
  { period: "Q1 2026", gwp: 1250, claims: 700, profit: 550 },
];

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold text-on-surface">Analytics</h1>
        <p className="text-on-surface-variant mt-1">Deep dive into business metrics and trends</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <GlassPanel key={m.label} className="p-4">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">{m.label}</span>
            <p className="text-2xl font-headline font-bold text-on-surface mt-1">{m.value}</p>
            <p className={cn("text-[10px] mt-1", m.positive ? "text-tertiary" : "text-error")}>
              {m.change} vs last period
            </p>
          </GlassPanel>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassPanel className="p-6">
          <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Quarterly Performance</h3>
          <div className="space-y-4">
            {trends.map((t) => (
              <div key={t.period} className="flex items-center gap-4">
                <span className="text-sm text-on-surface-variant w-16">{t.period}</span>
                <div className="flex-1 flex gap-1 h-6">
                  <div className="bg-primary rounded-l" style={{ width: `${(t.gwp / 1500) * 100}%` }} />
                  <div className="bg-error" style={{ width: `${(t.claims / 1500) * 100}%` }} />
                  <div className="bg-tertiary rounded-r" style={{ width: `${(t.profit / 1500) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-xs">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-primary rounded-full" />GWP</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-error rounded-full" />Claims</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-tertiary rounded-full" />Profit</span>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Top Performing Products</h3>
          <div className="space-y-3">
            {[
              { product: "Commercial Property", growth: "+15%", revenue: "$1.2M" },
              { product: "Professional Liability", growth: "+12%", revenue: "$890K" },
              { product: "Workers Comp", growth: "+8%", revenue: "$650K" },
              { product: "Commercial Auto", growth: "+5%", revenue: "$420K" },
            ].map((item) => (
              <div key={item.product} className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
                <div>
                  <p className="text-sm font-medium text-on-surface">{item.product}</p>
                  <p className="text-xs text-on-surface-variant">{item.revenue}</p>
                </div>
                <span className="text-tertiary font-bold">{item.growth}</span>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}