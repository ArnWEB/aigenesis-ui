import { useState } from "react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import { claims, claimInsights, type Claim } from "@/data/claims";

interface ClaimsPageProps {
  type?: "claims" | "adjudicate" | "portfolio";
}

export function ClaimsPage({ type = "claims" }: ClaimsPageProps) {
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(claims[1]);

  const getStatusStyles = (status: Claim["status"]) => {
    switch (status) {
      case "analysis":
        return "bg-primary/10 text-primary border-primary/20";
      case "flagged":
        return "bg-error/10 text-error border-error/20";
      case "review":
        return "bg-surface-variant text-on-surface-variant border-outline-variant/30";
      case "approved":
        return "bg-tertiary/10 text-tertiary border-tertiary/20";
      case "rejected":
        return "bg-error/10 text-error border-error/20";
      default:
        return "bg-surface-variant text-on-surface-variant border-outline-variant/30";
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return "bg-error shadow-[0_0_8px_#ff6e84]";
    if (score >= 40) return "bg-secondary shadow-[0_0_8px_#dd8bfb]";
    return "bg-tertiary shadow-[0_0_8px_#96f8ff]";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const pageTitle = type === "adjudicate" ? "Adjudicator Command" : type === "portfolio" ? "Portfolio Overview" : "Claims Management";

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold tracking-tight text-on-surface">
            {pageTitle}
          </h1>
          <p className="text-on-surface-variant font-body">
            <span className="text-primary font-medium">{claims.length}</span> pending claims in queue.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-surface-container hover:bg-surface-bright text-on-surface px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ring-1 ring-outline-variant/20">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            Filter View
          </button>
          <button className="bg-gradient-to-r from-primary to-primary-dim text-on-primary px-5 py-2.5 rounded-lg text-sm font-bold shadow-[0_0_20px_rgba(93,95,239,0.3)] hover:scale-95 transition-transform active:scale-90 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Claim
          </button>
        </div>
      </section>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Claims Table */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-xl border border-outline-variant/15 overflow-hidden shadow-xl">
          <div className="px-6 py-5 border-b border-outline-variant/10 flex items-center justify-between">
            <h3 className="text-lg font-headline font-bold flex items-center gap-2 text-on-surface">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Pending Claims Queue
            </h3>
            <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Live Sync Active</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high/50">
                  <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-on-surface-variant font-semibold">Claim ID</th>
                  <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-on-surface-variant font-semibold">Policyholder</th>
                  <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-on-surface-variant font-semibold">Risk Score</th>
                  <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-on-surface-variant font-semibold">Amount</th>
                  <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-on-surface-variant font-semibold">Status</th>
                  <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-on-surface-variant font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {claims.map((claim) => (
                  <tr 
                    key={claim.id}
                    onClick={() => setSelectedClaim(claim)}
                    className={cn(
                      "hover:bg-surface-bright/40 transition-colors cursor-pointer group",
                      selectedClaim?.id === claim.id && "bg-primary/5 hover:bg-primary/10"
                    )}
                  >
                    <td className="px-6 py-5 text-sm font-medium text-on-surface">{claim.id}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary text-xs">
                          {claim.policyholder.initials}
                        </div>
                        <span className="text-sm text-on-surface">{claim.policyholder.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full rounded-full", getRiskColor(claim.riskScore))}
                            style={{ width: `${claim.riskScore}%` }}
                          />
                        </div>
                        <span className={cn(
                          "text-xs font-bold",
                          claim.riskScore >= 70 ? "text-error" : claim.riskScore >= 40 ? "text-secondary" : "text-tertiary"
                        )}>
                          {claim.riskScore}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-on-surface">{formatCurrency(claim.amount)}</td>
                    <td className="px-6 py-5">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                        getStatusStyles(claim.status)
                      )}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <svg className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel - Insights */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* AI Insight Pulse */}
          <GlassPanel className="relative overflow-hidden p-6 ring-1 ring-secondary/30 shadow-[0_0_30px_rgba(221,139,251,0.08)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl -mr-16 -mt-16" />
            <h4 className="text-sm font-label font-bold uppercase tracking-[0.2em] text-secondary mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Insight Pulse
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-surface-container-highest/40 rounded-lg border-l-2 border-secondary">
                <p className="text-xs text-on-surface-variant mb-2">Selected Claim: {selectedClaim?.id || claimInsights.claimId}</p>
                <h5 className="text-lg font-headline font-bold text-on-surface mb-2">{claimInsights.title}</h5>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {claimInsights.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/10 text-center">
                  <p className="text-[10px] uppercase font-label tracking-widest text-on-surface-variant mb-1">Confidence</p>
                  <p className="text-xl font-headline font-bold text-on-surface">{claimInsights.confidence}%</p>
                </div>
                <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/10 text-center">
                  <p className="text-[10px] uppercase font-label tracking-widest text-on-surface-variant mb-1">Risk Factor</p>
                  <p className="text-xl font-headline font-bold text-error">{claimInsights.riskFactor}</p>
                </div>
              </div>
              <button className="w-full py-3 rounded-lg bg-surface-container-highest text-secondary text-sm font-bold border border-secondary/20 hover:bg-secondary/10 transition-colors">
                View Full Evidence Log
              </button>
            </div>
          </GlassPanel>

          {/* Geographic Map */}
          <GlassPanel className="p-6">
            <h4 className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Geographic Cluster Map
            </h4>
            <div className="aspect-video w-full rounded-lg bg-surface-container-lowest relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full opacity-20 grayscale">
                  <svg viewBox="0 0 400 200" className="w-full h-full">
                    <path d="M50 100 Q100 80 150 100 T250 100 T350 80" stroke="#dd8bfb" fill="none" strokeWidth="1" opacity="0.5"/>
                    <path d="M30 120 Q80 100 130 120 T230 100 T330 110" stroke="#a4a6ff" fill="none" strokeWidth="1" opacity="0.5"/>
                    <circle cx="200" cy="100" r="60" stroke="#494847" fill="none" strokeWidth="1" opacity="0.3"/>
                    <circle cx="200" cy="100" r="40" stroke="#494847" fill="none" strokeWidth="1" opacity="0.4"/>
                    <circle cx="200" cy="100" r="20" stroke="#494847" fill="none" strokeWidth="1" opacity="0.5"/>
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 flex gap-1">
                <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
                <span className="text-[10px] font-bold text-on-surface uppercase">Fraud Hotspot Detected</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center text-xs">
              <span className="text-on-surface-variant">Claims in Chicago area</span>
              <span className="text-on-surface font-bold">+12% YoY</span>
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* Bottom Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassPanel className="p-6">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">Avg Resolution Time</p>
          <p className="text-2xl font-headline font-bold text-on-surface">4.2 Hours</p>
          <div className="mt-2 text-[10px] text-tertiary">▼ 18% improvement vs last month</div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">Total Verified Value</p>
          <p className="text-2xl font-headline font-bold text-on-surface">$428.5k</p>
          <div className="mt-2 text-[10px] text-on-surface-variant">2,402 cases approved this quarter</div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">AI Accuracy Rating</p>
          <p className="text-2xl font-headline font-bold text-on-surface">99.1%</p>
          <div className="mt-2 text-[10px] text-primary">▲ 0.4% from system v2.4 upgrade</div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">Adjudicator Rank</p>
          <p className="text-2xl font-headline font-bold text-on-surface">Elite Class</p>
          <div className="mt-2 text-[10px] text-secondary">Top 3% of regional processing team</div>
        </GlassPanel>
      </div>
    </div>
  );
}
