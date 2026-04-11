import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

type Tab = "weekly" | "monthly" | "quarterly" | "custom";

const COLORS = {
  received: "#4A90D9",
  closedBOT: "#2ECC71",
  closedHuman: "#F1C40F",
  open: "#E74C3C",
  tatBot: "#2ECC71",
  tatHuman: "#F1C40F",
};

export function TicketResolutionTrendPanel() {
  const [tab, setTab] = useState<Tab>("weekly");
  const [offset, setOffset] = useState(0);
  const [customFrom, setCustomFrom] = useState("2026-01-01");
  const [customTo, setCustomTo] = useState(() => new Date().toISOString().split('T')[0]);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);

  const today = new Date();
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const getLabels = () => {
    if (tab === "weekly") {
      if (offset === 0) return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      return ['Week 1', 'Week 2', 'Week 3', 'Week 4'].map(w => w + ` (-${Math.abs(offset)}w)`);
    }
    if (tab === "monthly") {
      const labels: string[] = [];
      for (let i = 0; i < 4; i++) {
        const d = new Date(today.getFullYear(), today.getMonth() + offset - 3 + i, 1);
        labels.push(MONTHS[d.getMonth()] + " '" + String(d.getFullYear()).slice(2));
      }
      return labels;
    }
    if (tab === "quarterly") {
      const labels: string[] = [];
      for (let i = -1; i <= 2; i++) {
        const totalQ = Math.floor(today.getMonth() / 3) + offset + i;
        const year = today.getFullYear() + Math.floor(totalQ / 4);
        const q = ((totalQ % 4) + 4) % 4 + 1;
        labels.push('Q' + q + ' ' + year);
      }
      return labels;
    }
    return ['Period'];
  };

  const generateData = (labels: string[]) => {
    const received = labels.map(() => Math.floor(Math.random() * 60 + 40));
    const bot = labels.map((_, i) => Math.floor(received[i] * 0.45 + Math.random() * 10));
    const human = labels.map((_, i) => Math.floor(received[i] * 0.25 + Math.random() * 8));
    const open = labels.map((_, i) => Math.max(0, received[i] - bot[i] - human[i] - Math.floor(Math.random() * 5)));
    const tatBot = bot.map(v => +(v * 0.6 + Math.random() * 5).toFixed(1));
    const tatHuman = human.map(v => +(v * 0.9 + Math.random() * 8).toFixed(1));
    return { received, bot, human, open, tatBot, tatHuman };
  };

  const getNavLabel = () => {
    if (tab === "weekly") {
      const base = new Date(today);
      const day = base.getDay();
      const diff = base.getDate() - day + (day === 0 ? -6 : 1);
      const monday = new Date(base.getFullYear(), base.getMonth(), diff);
      const start = new Date(monday);
      start.setDate(start.getDate() + offset * 7);
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      const pad = (n: number) => String(n).padStart(2, '0');
      return `${pad(start.getDate())}-${pad(start.getMonth() + 1)}-${String(start.getFullYear()).slice(2)} to ${pad(end.getDate())}-${pad(end.getMonth() + 1)}-${String(end.getFullYear()).slice(2)}`;
    }
    if (tab === "monthly") {
      const d = new Date(today.getFullYear(), today.getMonth() + offset, 1);
      return MONTHS[d.getMonth()] + " '" + String(d.getFullYear()).slice(2);
    }
    if (tab === "quarterly") {
      const totalQ = Math.floor(today.getMonth() / 3) + offset;
      const year = today.getFullYear() + Math.floor(totalQ / 4);
      const q = ((totalQ % 4) + 4) % 4 + 1;
      return 'Q' + q + ' ' + year;
    }
    return '';
  };

  const handleNavigate = (dir: number) => {
    if (offset + dir > 0) return;
    setOffset(prev => prev + dir);
  };

  const handleApplyCustom = () => {
    const minDate = "2026-01-01";
    const maxDate = today.toISOString().split('T')[0];
    
    if (!customFrom || !customTo) {
      setErrorMsg('Please select both From and To dates.');
      setShowError(true);
      return;
    }
    if (customFrom < minDate) {
      setErrorMsg('From date cannot be before 01-01-2026.');
      setShowError(true);
      return;
    }
    if (customTo > maxDate) {
      setErrorMsg('To date cannot be a future date.');
      setShowError(true);
      return;
    }
    if (customFrom > customTo) {
      setErrorMsg('"From" must be on or before "To".');
      setShowError(true);
      return;
    }
    setShowError(false);
  };

  useEffect(() => {
    const labels = getLabels();
    const chartData = generateData(labels);
    
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Tickets received',
                data: chartData.received,
                backgroundColor: COLORS.received,
                borderRadius: 4,
              },
              {
                label: 'Closed by BOT',
                data: chartData.bot,
                backgroundColor: COLORS.closedBOT,
                borderRadius: 4,
              },
              {
                label: 'Closed by human',
                data: chartData.human,
                backgroundColor: COLORS.closedHuman,
                borderRadius: 4,
              },
              {
                label: 'Open tickets',
                data: chartData.open,
                backgroundColor: COLORS.open,
                borderRadius: 4,
              },
              {
                type: 'line',
                label: 'TAT trend — BOT',
                data: chartData.tatBot,
                borderColor: COLORS.tatBot,
                backgroundColor: 'transparent',
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: COLORS.tatBot,
                tension: 0.35,
                yAxisID: 'yTat',
              },
              {
                type: 'line',
                label: 'TAT trend — Human',
                data: chartData.tatHuman,
                borderColor: COLORS.tatHuman,
                backgroundColor: 'transparent',
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: COLORS.tatHuman,
                tension: 0.35,
                yAxisID: 'yTat',
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#1e2638',
                borderColor: '#2a3650',
                borderWidth: 1,
                titleColor: '#fff',
                bodyColor: '#aaa',
              },
            },
            scales: {
              x: {
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: '#8899aa' },
              },
              y: {
                position: 'left',
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: '#8899aa' },
                title: { display: true, text: 'Tickets', color: '#8899aa' },
              },
              yTat: {
                position: 'right',
                grid: { drawOnChartArea: false },
                ticks: { color: '#8899aa' },
                title: { display: true, text: 'TAT (hrs)', color: '#8899aa' },
              },
            },
          },
        });
      }
    }
  }, [tab, offset]);

  return (
    <GlassPanel className="p-6">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h3 className="text-lg font-headline font-semibold text-on-surface">Ticket Resolution Trend</h3>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-surface-container rounded-lg p-1 border border-white/10">
            {(["weekly", "monthly", "quarterly", "custom"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setOffset(0);
                  setShowError(false);
                }}
                className={cn(
                  "text-xs font-semibold px-3 py-1.5 rounded-md border border-transparent transition-all",
                  tab === t
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white hover:border-blue-500"
                )}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {tab !== "custom" && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavigate(-1)}
                disabled={offset === 0}
                className="px-2 py-1 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed text-sm font-bold"
              >
                ‹
              </button>
              <span className="text-xs text-white px-3 py-1.5 rounded-md bg-surface-container border border-white/10 min-w-[140px] text-center">
                {getNavLabel()}
              </span>
              <button
                onClick={() => handleNavigate(1)}
                disabled={offset === 0}
                className="px-2 py-1 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed text-sm font-bold"
              >
                ›
              </button>
            </div>
          )}

          {tab === "custom" && (
            <div className="flex items-center gap-2">
              <label className="text-gray-400 text-xs">From</label>
              <input
                type="date"
                value={customFrom}
                onChange={(e) => setCustomFrom(e.target.value)}
                min="2026-01-01"
                className="bg-surface-container text-on-surface text-xs border border-white/10 rounded-md px-2 py-1.5 outline-none focus:border-blue-500"
              />
              <label className="text-gray-400 text-xs">To</label>
              <input
                type="date"
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
                max={today.toISOString().split('T')[0]}
                className="bg-surface-container text-on-surface text-xs border border-white/10 rounded-md px-2 py-1.5 outline-none focus:border-blue-500"
              />
              <button
                onClick={handleApplyCustom}
                className="text-xs font-semibold px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>

      {showError && (
        <div className="text-red-400 text-xs mb-3 flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="relative" style={{ height: "280px" }}>
        <canvas ref={chartRef} />
      </div>

      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS.received }} />
          <span className="text-gray-400 text-xs">Tickets received</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS.closedBOT }} />
          <span className="text-gray-400 text-xs">Tickets closed by BOT</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS.closedHuman }} />
          <span className="text-gray-400 text-xs">Tickets closed by human assistance</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS.open }} />
          <span className="text-gray-400 text-xs">Open tickets</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 rounded-sm" style={{ backgroundColor: COLORS.tatBot }} />
          <span className="text-gray-400 text-xs">TAT trend for BOT</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 rounded-sm" style={{ backgroundColor: COLORS.tatHuman }} />
          <span className="text-gray-400 text-xs">TAT trend for human handled tickets</span>
        </div>
      </div>
    </GlassPanel>
  );
}