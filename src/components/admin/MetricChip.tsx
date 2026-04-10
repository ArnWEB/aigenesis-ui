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
      <div className="flex items-baseline justify-center gap-4">
        <p className={cn("text-xl lg:text-2xl font-headline font-bold text-[#e86e24]")}>
          {value1}
        </p>
        {value2 && (
          <>
            <span className="text-gray-300 text-lg">|</span>
            <p className={cn("text-xl lg:text-2xl font-headline font-bold text-black")}>
              {value2}
            </p>
          </>
        )}
      </div>
      {subtitle && (
        <p className="text-[10px] mt-1 text-center text-gray-500">{subtitle}</p>
      )}
      {trend && (
        <div className="flex items-center justify-center gap-2 mt-1">
          {trendDirection === "up" && (
            <div className="flex items-center gap-1.5 px-2 py-1 bg-green-100 rounded-full">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-xs font-semibold text-green-600">{trend}</span>
            </div>
          )}
          {trendDirection === "down" && (
            <div className="flex items-center gap-1.5 px-2 py-1 bg-red-100 rounded-full">
              <TrendingDown className="w-4 h-4 text-red-600" />
              <span className="text-xs font-semibold text-red-600">{trend}</span>
            </div>
          )}
          {trendDirection === "online" && (
            <div className="flex items-center gap-1.5 px-2 py-1 bg-green-100 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-green-600">{trend}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
