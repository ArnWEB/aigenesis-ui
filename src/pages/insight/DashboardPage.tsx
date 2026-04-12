import { MetricChip } from "@/components/ui/MetricChip";
import { TicketResolutionTrendPanel } from "@/components/ui/TicketResolutionTrendPanel";
import { KeyHighlightsPanel } from "@/components/ui/KeyHighlightsPanel";

export function DashboardPage() {
  const highlights = [
    { id: '1', title: 'Growth Insight', text: 'Premium growth up 2.1%, in Saving and Investment Insurance Plans', emphasis: true },
    { id: '2', title: 'Claim and Profitability Insight', text: 'Loss ratio improved by 3%, driven by lower high-value claims.', emphasis: true },
    { id: '3', title: 'Efficiency Insight', text: 'BOT handled 65% of tickets this week, improving overall efficiency.', emphasis: true },
  ];

  const metrics = [
    { id: 'gwp', title: 'GWP Growth (%)', value1: '8.5%', value2: '+2.1% from last quarter', delta: '+2.1% from last quarter', trendDirection: 'up' as const, infoText: 'Premium Growth trend over QoQ' },
    { id: 'claims', title: 'Loss Ratio', value1: '72%', value2: '-3% from last quarter', delta: '-3% from last quarter', trendDirection: 'down' as const, infoText: 'Loss Ratio trend QoQ' },
    { id: 'xp', title: 'Customer Experience Pulse', value1: '12%', value2: '-4% from last quarter', delta: '-4% from last quarter', trendDirection: 'down' as const, infoText: 'Indicates the share of customer issues and escalations QonQ' },
    { id: 'eff', title: 'Operational Efficiency Ratio', value1: '1.15', value2: '+0.01 from last quarter', delta: '+0.01 from last quarter', trendDirection: 'up' as const, infoText: 'Indicates the effective operational efficiency of the organization' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-on-surface">
            <span className="text-primary">@i</span>Insight
          </h1>
          <p className="text-on-surface-variant mt-1">Executive Insights - Global KPI Metrics & Strategic Management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
        {metrics.map(m => (
          <MetricChip key={m.id} title={m.title} value1={m.value1} value2={m.value2} trend={m.delta} trendDirection={m.trendDirection} infoText={m.infoText} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2">
          <TicketResolutionTrendPanel />
        </div>
        <div>
          <KeyHighlightsPanel highlights={highlights} />
        </div>
      </div>
    </div>
  );
}