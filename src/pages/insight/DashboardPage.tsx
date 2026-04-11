import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";
import { MetricChip } from "@/components/ui/MetricChip";

export function DashboardPage() {
  const metrics = [
    { id: 'gwp', title: 'GWP Growth', value1: '8.5%', value2: '+2.1% from last quarter', delta: '+2.1% from last quarter', trendDirection: 'up' as const },
    { id: 'claims', title: 'Claims Loss Ratio', value1: '72%', value2: '-3% from last quarter', delta: '-3% from last quarter', trendDirection: 'down' as const },
    { id: 'xp', title: 'Customer Experience Pulse', value1: '12%', value2: '-4% from last quarter', delta: '-4% from last quarter', trendDirection: 'down' as const },
    { id: 'eff', title: 'Operational Efficiency Ratio', value1: '1.15', value2: '+0.01 from last quarter', delta: '+0.01 from last quarter', trendDirection: 'up' as const },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-on-surface">ins@ight</h1>
        <p className="text-on-surface-variant mt-1">Executive Insights - Global KPI Metrics & Strategic Management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
        {metrics.map(m => (
          <MetricChip key={m.id} title={m.title} value1={m.value1} value2={m.value2} trend={m.delta} trendDirection={m.trendDirection} />
        ))}
      </div>
      {/* KPI chips end */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4"> 
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">Global GWP</span>
          </div>
          <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">$4.28B</p>
          <p className="text-[10px] text-primary mt-1">+12.4% YoY</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">Combined Ratio</span>
          </div>
          <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">91.4%</p>
          <p className="text-[10px] text-secondary mt-1">-2.1% improved</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">Net Loss Ratio</span>
          </div>
          <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">64.2%</p>
          <p className="text-[10px] text-tertiary mt-1">-4.5% optimized</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">Active Policies</span>
          </div>
          <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">1.2M+</p>
          <p className="text-[10px] text-primary mt-1">+8% growth</p>
        </GlassPanel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <GlassPanel className="lg:col-span-2 p-6">
          <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Revenue Trend (Last 7 Days)</h3>
          <div className="flex items-end justify-between h-32 lg:h-40 gap-2">
            {[{ day: "Mon", value: 65 }, { day: "Tue", value: 78 }, { day: "Wed", value: 82 }, { day: "Thu", value: 71 }, { day: "Fri", value: 89 }, { day: "Sat", value: 45 }, { day: "Sun", value: 38 }].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t" style={{ height: `${item.value}%` }} />
                <span className="text-[10px] text-on-surface-variant">{item.day}</span>
              </div>
            ))}
          </div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Portfolio Distribution</h3>
          <div className="space-y-3">
            {[
              { segment: "Commercial", p: 42, c: "bg-primary" },
              { segment: "Personal Auto", p: 28, c: "bg-secondary" },
              { segment: "Property", p: 18, c: "bg-tertiary" },
              { segment: "Life & Health", p: 12, c: "bg-error" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">{item.segment}</span>
                  <span className="text-on-surface font-medium">{item.p}%</span>
                </div>
                <div className="h-2 bg-surface-container-highest rounded-full"><div className={cn("h-full rounded-full", item.c)} style={{ width: `${item.p}%` }} /></div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
