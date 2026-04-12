import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Calendar, ChevronDown } from "lucide-react";

export interface DateRange {
  start: string;
  end: string;
}

export interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

type Preset = { label: string; days: number };

const PRESETS: Preset[] = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 14 days", days: 14 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
];

export function DateRangePicker({ value, onChange, className }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localStart, setLocalStart] = useState(value.start);
  const [localEnd, setLocalEnd] = useState(value.end);
  const [activePreset, setActivePreset] = useState<number | null>(null);

  useEffect(() => {
    setLocalStart(value.start);
    setLocalEnd(value.end);
  }, [value]);

  const handlePresetClick = (days: number, label: string) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    
    const formatDate = (d: Date) => d.toISOString().split('T')[0];
    const newRange = { start: formatDate(start), end: formatDate(end) };
    
    setLocalStart(newRange.start);
    setLocalEnd(newRange.end);
    setActivePreset(PRESETS.findIndex(p => p.label === label));
    onChange(newRange);
    setIsOpen(false);
  };

  const handleApply = () => {
    if (localStart && localEnd && localStart <= localEnd) {
      onChange({ start: localStart, end: localEnd });
      setActivePreset(null);
      setIsOpen(false);
    }
  };

  const handleReset = () => {
    const defaultRange = getDefaultDateRange();
    setLocalStart(defaultRange.start);
    setLocalEnd(defaultRange.end);
    setActivePreset(null);
    onChange(defaultRange);
    setIsOpen(false);
  };

  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all",
          "bg-surface-container border-white/10 hover:border-white/20 text-on-surface",
          "min-w-[280px] justify-between"
        )}
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-on-surface-variant" />
          <span className="text-sm">
            {formatDisplayDate(value.start)} - {formatDisplayDate(value.end)}
          </span>
        </div>
        <ChevronDown className={cn("w-4 h-4 text-on-surface-variant", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-[320px] bg-surface-container border border-white/10 rounded-xl shadow-xl z-30 overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-on-surface-variant mb-1.5 block">Start Date</label>
                <input
                  type="date"
                  value={localStart}
                  onChange={(e) => {
                    setLocalStart(e.target.value);
                    setActivePreset(null);
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-white/10 text-on-surface text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs text-on-surface-variant mb-1.5 block">End Date</label>
                <input
                  type="date"
                  value={localEnd}
                  onChange={(e) => {
                    setLocalEnd(e.target.value);
                    setActivePreset(null);
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-white/10 text-on-surface text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="p-3 border-b border-white/5">
            <p className="text-xs text-on-surface-variant mb-2">Quick Select</p>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePresetClick(preset.days, preset.label)}
                  className={cn(
                    "px-3 py-2 text-xs rounded-lg transition-all text-left",
                    activePreset === idx
                      ? "bg-primary text-white"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 flex gap-2">
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-2 text-sm rounded-lg border border-white/10 text-on-surface-variant hover:bg-surface-container transition-all"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              disabled={!localStart || !localEnd || localStart > localEnd}
              className="flex-1 px-4 py-2 text-sm rounded-lg bg-primary text-white hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function getDefaultDateRange(): DateRange {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  
  const formatDate = (d: Date) => d.toISOString().split('T')[0];
  
  return {
    start: formatDate(sevenDaysAgo),
    end: formatDate(today),
  };
}