import { cn } from "@/lib/utils";

export interface ReferredBotItem {
  id: string;
  name: string;
  amount: string;
  status: "Standard" | "Preferred";
}

interface ReferredBotPanelProps {
  items: ReferredBotItem[];
  className?: string;
}

export function ReferredBotPanel({ items, className }: ReferredBotPanelProps) {
  return (
    <div className={cn("rounded-xl overflow-hidden", className)}>
      <div className="bg-[#0b0b0b] px-4 py-3">
        <h3 className="text-sm font-semibold text-white">Referred by BOT</h3>
      </div>
      <div className="bg-[#1a1a1a] p-3 space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2 rounded-lg bg-[#252525] hover:bg-[#2a2a2a] transition-colors"
          >
            <div>
              <p className="text-sm font-medium text-white">{item.name}</p>
              <p className="text-xs text-gray-400">{item.id} - {item.amount}</p>
            </div>
            <span
              className={cn(
                "px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wide",
                item.status === "Standard"
                  ? "bg-yellow-400 text-yellow-900 border border-yellow-500"
                  : "bg-green-400 text-green-900 border border-green-500"
              )}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}