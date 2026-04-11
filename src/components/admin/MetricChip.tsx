import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Info, TrendingUp, TrendingDown } from "lucide-react";

export interface MetricChipProps {
  title: string;
  value1: string | number;
  value2?: string | number;
  subtitle?: string;
  trend?: string | null;
  trendDirection?: "up" | "down" | "online" | null;
  infoText?: string;
  onClick?: () => void;
}

export function MetricChip({ title, value1, value2, subtitle, trend, trendDirection, infoText, onClick }: MetricChipProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className={cn(
        "p-4 flex flex-col justify-between h-full rounded-xl border transition-all duration-200 relative text-center cursor-pointer select-none",
        isPressed ? "scale-[0.98] shadow-sm" : "hover:-translate-y-1 hover:shadow-lg",
        "bg-[#F8FAFC] border-gray-100 hover:border-orange-200"
      )}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{title}</span>
        <div 
          className="relative"
          ref={infoRef}
          onMouseEnter={() => infoText && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <button
            className="w-6 h-6 flex items-center justify-center rounded-full text-white bg-[#e86e24] hover:bg-[#d45f1f] transition-colors"
            title={title}
          >
            <Info className="w-3.5 h-3.5" />
          </button>
          {showTooltip && infoText && (
            <div className="absolute top-full right-0 mt-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg z-10 w-48">
              {infoText}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className={cn("text-xl lg:text-2xl font-headline font-bold text-[#e86e24]")}>
          {value1}
        </p>
        {value2 && (
          <p className={cn("text-sm text-gray-400")}>{value2}</p>
        )}
        {trend && (
          <div className="flex items-center gap-2 text-xs">
            {trendDirection === "up" && (
              <TrendingUp className="w-3 h-3 text-green-600" />
            )}
            {trendDirection === "down" && (
              <TrendingDown className="w-3 h-3 text-red-600" />
            )}
            {trendDirection === "online" && (
              <span className="w-2 h-2 rounded-full bg-green-500" />
            )}
            <span className={cn(trendDirection === "down" ? "text-red-600" : trendDirection === "up" ? "text-green-600" : "text-green-600")}>
              {trend}
            </span>
          </div>
        )}
      </div>
      {subtitle && (
        <p className="text-[10px] mt-1 text-center text-gray-500">{subtitle}</p>
      )}
      
    </div>
  );
}
