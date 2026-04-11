import { useState } from "react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import type { TicketData } from "@/data/insightTicketData";

type Tab = "weekly" | "monthly" | "quarterly" | "custom";

interface TicketResolutionTrendPanelProps {
  data: TicketData[];
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
}

const COLORS = {
  received: "#e86e24",
  closedBOT: "#22c55e",
  closedHuman: "#3b82f6",
  open: "#a3a3a3",
};

export function TicketResolutionTrendPanel({ data, activeTab = "weekly", onTabChange }: TicketResolutionTrendPanelProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tab, setTab] = useState<Tab>(activeTab);

  const handleTabChange = (newTab: Tab) => {
    setTab(newTab);
    setCurrentIndex(0);
    onTabChange?.(newTab);
  };

  const maxValue = Math.max(...data.map(d => d.ticketsReceived), 1);

  return (
    <GlassPanel className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-headline font-semibold text-on-surface">Ticket Resolution Trend</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="p-1.5 rounded-lg hover:bg-surface-container-highest text-on-surface-variant disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs text-on-surface-variant min-w-[60px] text-center">
            {data[currentIndex]?.weekLabel}
          </span>
          <button
            onClick={() => setCurrentIndex(Math.min(data.length - 1, currentIndex + 1))}
            disabled={currentIndex === data.length - 1}
            className="p-1.5 rounded-lg hover:bg-surface-container-highest text-on-surface-variant disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-1 mb-6 p-1 bg-surface-container rounded-lg w-fit">
        {(["weekly", "monthly", "quarterly", "custom"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => handleTabChange(t)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all",
              tab === t
                ? "bg-primary text-white"
                : "text-on-surface-variant hover:bg-surface-container-highest"
            )}
          >
            {t === "custom" && <Calendar className="w-3 h-3 inline mr-1" />}
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-end justify-between h-40 lg:h-48 gap-3">
            {data.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col gap-1">
                  <div
                    className="w-full rounded-t-sm"
                    style={{
                      height: `${(item.ticketsReceived / maxValue) * 100}%`,
                      backgroundColor: COLORS.received,
                      minHeight: "4px",
                    }}
                    title={`Received: ${item.ticketsReceived}`}
                  />
                  <div
                    className="w-full rounded-t-sm"
                    style={{
                      height: `${(item.ticketsClosedBOT / maxValue) * 100}%`,
                      backgroundColor: COLORS.closedBOT,
                      minHeight: "4px",
                    }}
                    title={`Closed by BOT: ${item.ticketsClosedBOT}`}
                  />
                  <div
                    className="w-full rounded-t-sm"
                    style={{
                      height: `${(item.ticketsClosedHuman / maxValue) * 100}%`,
                      backgroundColor: COLORS.closedHuman,
                      minHeight: "4px",
                    }}
                    title={`Closed by Human: ${item.ticketsClosedHuman}`}
                  />
                  <div
                    className="w-full rounded-t-sm"
                    style={{
                      height: `${(item.openTickets / maxValue) * 100}%`,
                      backgroundColor: COLORS.open,
                      minHeight: "4px",
                    }}
                    title={`Open: ${item.openTickets}`}
                  />
                </div>
                <span className="text-[10px] text-on-surface-variant">{item.weekLabel}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-on-surface">Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS.received }} />
              <span className="text-xs text-on-surface-variant">Tickets Received</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS.closedBOT }} />
              <span className="text-xs text-on-surface-variant">Closed by BOT</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS.closedHuman }} />
              <span className="text-xs text-on-surface-variant">Closed by Human</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS.open }} />
              <span className="text-xs text-on-surface-variant">Open Tickets</span>
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}