import { GlassPanel } from "@/components/ui/glass-panel";
import type { KeyHighlight } from "@/data/insightTicketData";
import { cn } from "@/lib/utils";
import { TrendingUp, Zap, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface KeyHighlightsPanelProps {
  highlights: KeyHighlight[];
}

const ICONS: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  "Growth Insight": { icon: ArrowUpRight, color: "text-green-400", bg: "bg-green-500/20" },
  "Claim and Profitability Insight": { icon: ArrowDownRight, color: "text-red-400", bg: "bg-red-500/20" },
  "Efficiency Insight": { icon: Zap, color: "text-orange-400", bg: "bg-orange-500/20" },
};

export function KeyHighlightsPanel({ highlights }: KeyHighlightsPanelProps) {
  return (
    <GlassPanel className="p-6 h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-5 bg-green-500 rounded-full" />
        <h3 className="text-lg font-headline font-semibold text-on-surface">Key Highlights</h3>
      </div>
      <div className="space-y-3">
        {highlights.map((item) => {
          const config = ICONS[item.title] || { icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/20" };
          const Icon = config.icon;
          return (
            <div
              key={item.id}
              className={cn(
                "p-4 rounded-xl border border-white/10 bg-surface-container hover:bg-surface-container-high transition-all duration-200 hover:border-white/20"
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg",
                    config.bg
                  )}
                >
                  <Icon className={cn("w-5 h-5", config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-on-surface mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-on-surface-variant">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}