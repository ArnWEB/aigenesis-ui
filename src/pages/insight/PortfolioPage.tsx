import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";

const portfolioData = [
  { name: "Commercial Property", value: 1250000, change: "+5.2%", risk: "low", policies: 142 },
  { name: "Commercial Auto", value: 890000, change: "+3.8%", risk: "medium", policies: 89 },
  { name: "Workers Compensation", value: 670000, change: "+2.1%", risk: "low", policies: 67 },
  { name: "General Liability", value: 450000, change: "-1.2%", risk: "high", policies: 45 },
  { name: "Professional Liability", value: 320000, change: "+8.5%", risk: "medium", policies: 28 },
];

export function PortfolioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold text-on-surface">Portfolio Overview</h1>
        <p className="text-on-surface-variant mt-1">Analyze and manage insurance portfolio performance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassPanel className="p-4">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider">Total Premiums</span>
          <p className="text-2xl font-headline font-bold text-on-surface mt-1">$3.58M</p>
          <p className="text-[10px] text-primary mt-1">+4.2% from last quarter</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider">Active Policies</span>
          <p className="text-2xl font-headline font-bold text-on-surface mt-1">371</p>
          <p className="text-[10px] text-secondary mt-1">+12 new this month</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider">Avg Policy Size</span>
          <p className="text-2xl font-headline font-bold text-on-surface mt-1">$9.6K</p>
          <p className="text-[10px] text-tertiary mt-1">+8% increase</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider">Renewal Rate</span>
          <p className="text-2xl font-headline font-bold text-on-surface mt-1">94%</p>
          <p className="text-[10px] text-primary mt-1">Above target</p>
        </GlassPanel>
      </div>

      <GlassPanel className="p-6">
        <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Portfolio Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-outline-variant/10">
                <th className="px-4 py-3 text-left text-xs font-label uppercase text-on-surface-variant">Line of Business</th>
                <th className="px-4 py-3 text-right text-xs font-label uppercase text-on-surface-variant">Premium Value</th>
                <th className="px-4 py-3 text-right text-xs font-label uppercase text-on-surface-variant">Policies</th>
                <th className="px-4 py-3 text-right text-xs font-label uppercase text-on-surface-variant">Change</th>
                <th className="px-4 py-3 text-center text-xs font-label uppercase text-on-surface-variant">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {portfolioData.map((item) => (
                <tr key={item.name} className="hover:bg-surface-bright/40 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-on-surface">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-right text-on-surface">${(item.value / 1000).toFixed(0)}K</td>
                  <td className="px-4 py-3 text-sm text-right text-on-surface-variant">{item.policies}</td>
                  <td className="px-4 py-3 text-sm text-right">
                    <span className={item.change.startsWith("+") ? "text-tertiary" : "text-error"}>
                      {item.change}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                      item.risk === "low" ? "bg-tertiary/20 text-tertiary" :
                      item.risk === "medium" ? "bg-secondary/20 text-secondary" :
                      "bg-error/20 text-error"
                    )}>
                      {item.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </div>
  );
}