import { useState, useMemo } from "react";
import { MetricChip } from "@/components/ui/MetricChip";
import { TicketResolutionTrendPanel } from "@/components/ui/TicketResolutionTrendPanel";
import { KeyHighlightsPanel } from "@/components/ui/KeyHighlightsPanel";
import { DateRangePicker, type DateRange } from "@/components/ui/DateRangePicker";
import { insightTicketData, filterTicketsByDateRange, getDefaultDateRange } from "@/data/insightTicketData";

export function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRange>(getDefaultDateRange());
  
  const roleData = insightTicketData.admin;

  const filteredTicketData = useMemo(() => {
    return filterTicketsByDateRange(roleData.ticketData, dateRange.start, dateRange.end);
  }, [roleData.ticketData, dateRange]);

  const metrics = [
    { id: 'gwp', title: 'GWP Growth', value1: '8.5%', value2: '+2.1% from last quarter', delta: '+2.1% from last quarter', trendDirection: 'up' as const },
    { id: 'claims', title: 'Claims Loss Ratio', value1: '72%', value2: '-3% from last quarter', delta: '-3% from last quarter', trendDirection: 'down' as const },
    { id: 'xp', title: 'Customer Experience Pulse', value1: '12%', value2: '-4% from last quarter', delta: '-4% from last quarter', trendDirection: 'down' as const },
    { id: 'eff', title: 'Operational Efficiency Ratio', value1: '1.15', value2: '+0.01 from last quarter', delta: '+0.01 from last quarter', trendDirection: 'up' as const },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-on-surface">ins@ight</h1>
          <p className="text-on-surface-variant mt-1">Executive Insights - Global KPI Metrics & Strategic Management</p>
        </div>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
        {metrics.map(m => (
          <MetricChip key={m.id} title={m.title} value1={m.value1} value2={m.value2} trend={m.delta} trendDirection={m.trendDirection} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2">
          <TicketResolutionTrendPanel data={filteredTicketData} />
        </div>
        <div>
          <KeyHighlightsPanel highlights={roleData.highlights} />
        </div>
      </div>
    </div>
  );
}