import { GlassPanel } from "@/components/ui/glass-panel";
import type { KeyHighlight } from "@/data/insightTicketData";
import { cn } from "@/lib/utils";
import { MessageSquare, TrendingUp, Users, AlertCircle, Zap, Star } from "lucide-react";

interface KeyHighlightsPanelProps {
  highlights: KeyHighlight[];
}

const ICONS: Record<string, React.ElementType> = {
  "BOT Resolution Rate": TrendingUp,
  "Peak Ticket Volume": Zap,
  "Human Handoff": Users,
  "SLA Compliance": Star,
  "Your Performance": TrendingUp,
  "BOT Assist": Zap,
  "Escalation Rate": AlertCircle,
  "Customer Feedback": Star,
  "Team Efficiency": TrendingUp,
  "BOT Utilization": Zap,
  "Training Opportunity": Users,
  "Trend Alert": AlertCircle,
};

export function KeyHighlightsPanel({ highlights }: KeyHighlightsPanelProps) {
  return (
    <GlassPanel className="p-6 h-full">
      <h3 className="text-lg font-headline font-semibold text-on-surface mb-6">Key Highlights</h3>
      <div className="space-y-4">
        {highlights.map((item) => {
          const Icon = ICONS[item.title] || MessageSquare;
          return (
            <div
              key={item.id}
              className={cn(
                "p-4 rounded-xl border transition-all duration-200",
                item.emphasis
                  ? "bg-primary/10 border-primary/30"
                  : "bg-surface-container border-white/5 hover:border-white/10"
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                    item.emphasis ? "bg-primary/20 text-primary" : "bg-surface-container-high text-on-surface-variant"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={cn("text-sm font-semibold mb-1", item.emphasis ? "text-primary" : "text-on-surface")}>
                    {item.title}
                  </h4>
                  <p className={cn("text-xs leading-relaxed", item.emphasis ? "text-on-surface" : "text-on-surface-variant")}>
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