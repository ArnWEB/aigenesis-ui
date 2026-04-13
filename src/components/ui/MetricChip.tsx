import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

export interface MetricChipProps {
  title: string;
  value1: string | number;
  value2?: string | number;
  subtitle?: string;
  trend?: string | null;
  trendDirection?: "up" | "down" | "online" | null;
  status?: "good" | "warning" | "neutral" | null;
  infoText?: string;
  onClick?: () => void;
  variant?: "pipe" | "stacked";
}

export function MetricChip({ title, value1, value2, subtitle, trend, trendDirection, status, infoText, onClick, variant = "stacked" }: MetricChipProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);

  const isBOTDecision = title === "BOT Decision";
  const valueColor = isBOTDecision && status === "good" ? "text-green-600" : isBOTDecision && status === "warning" ? "text-yellow-600" : "text-[#e86e24]";

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
            className="w-5 h-5 flex items-center justify-center rounded-full text-gray-800 hover:text-[#e86e24] transition-all duration-200"
            title={title}
          >
            <AlertCircle className="w-full h-full" />
          </button>
          {showTooltip && infoText && (
            <div className="absolute top-full right-0 mt-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg z-10 w-48">
              {infoText}
            </div>
          )}
        </div>
      </div>

      {variant === "pipe" ? (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-baseline justify-center gap-2">
            <p className={cn("text-xl lg:text-2xl font-headline font-bold", valueColor)}>
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
          {(trend || subtitle) && (
            <div className={cn(
              "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
              trendDirection === "up" ? "bg-green-100 text-green-600" : 
              trendDirection === "down" ? "bg-red-100 text-red-600" : 
              trendDirection === "online" ? "bg-green-100 text-green-600" : 
              "bg-gray-100 text-gray-600"
            )}>
              {trendDirection === "up" && <ArrowUpRight className="w-3 h-3" />}
              {trendDirection === "down" && <ArrowDownRight className="w-3 h-3" />}
              {trendDirection === "online" && <span><span className="w-2 h-2 rounded-full bg-green-500" /><span className="ml-0.5">{subtitle}</span></span>}
              {trend && <span>{trend}</span>}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1">
          <p className={cn("text-xl lg:text-2xl font-headline font-bold", valueColor)}>
            {value1}
          </p>
          {value2 && (
            <p className={cn("text-sm text-gray-400")}>{value2}</p>
          )}
          {trend && (
            <div className={cn(
              "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
              trendDirection === "up" ? "bg-green-100 text-green-600" : 
              trendDirection === "down" ? "bg-red-100 text-red-600" : 
              "bg-green-100 text-green-600"
            )}>
              {trendDirection === "up" && <ArrowUpRight className="w-3 h-3" />}
              {trendDirection === "down" && <ArrowDownRight className="w-3 h-3" />}
              {trendDirection === "online" && <Activity className="w-3 h-3" />}
              <span>{trend}</span>
            </div>
          )}
        </div>
      )}
      
      {subtitle && !subtitle?.startsWith("34") && (
        <div className="flex items-center justify-center gap-1.5 mt-1">
          {status === "good" && <span className="w-2 h-2 rounded-full bg-green-500" />}
          {status === "warning" && <span className="w-2 h-2 rounded-full bg-yellow-500" />}
          {status === "neutral" && <span className="w-2 h-2 rounded-full bg-gray-400" />}
          <p className="text-[10px] text-center text-gray-500">{subtitle}</p>
        </div>
      )}
    </div>
  );
}