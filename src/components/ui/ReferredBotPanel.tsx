import { cn } from "@/lib/utils";

// ReferredBotItem interface
export interface ReferredBotItem {
  id: string;
  name: string;
  amount: string;
  status: "Standard" | "Preferred";
}

interface ReferredBotPanelProps {
  items: ReferredBotItem[];
  onItemClick?: (item: ReferredBotItem) => void;
  selectedId?: string;
  className?: string;
}

export function ReferredBotPanel({ items, onItemClick, selectedId, className }: ReferredBotPanelProps) {
  return (
    <div className={cn("rounded-xl overflow-hidden", className)}>
      <div className="bg-[#0b0b0b] px-4 py-3">
        <h3 className="text-sm font-semibold text-white">Referred by BOT</h3>
      </div>
      <div className="bg-[#1a1a1a] p-3 space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onItemClick?.(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onItemClick?.(item);
              }
            }}
            className={cn(
              "flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer",
              selectedId === item.id
                ? "bg-[#3a3a3a] ring-1 ring-primary/50"
                : "bg-[#252525] hover:bg-[#2a2a2a]"
            )}
          >
            <div>
              <p className="text-sm font-medium text-white">{item.name}</p>
              <p className="text-xs text-gray-400">{item.id} - {item.amount}</p>
            </div>
            <span
              className={cn(
                "px-3 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wide w-24 text-center",
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