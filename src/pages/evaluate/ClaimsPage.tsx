import { useState } from "react";
import { cn } from "@/lib/utils";
import { claims, type Claim } from "@/data/claims";

interface ClaimsPageProps {
  type?: "claims" | "adjudicate" | "portfolio";
}

export function ClaimsPage(_props?: ClaimsPageProps) {
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold tracking-tight text-on-surface">
            Submission History
          </h1>
          <p className="text-on-surface-variant font-body">
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-surface-container hover:bg-surface-bright text-on-surface px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ring-1 ring-outline-variant/20">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            Filter View
          </button>
        </div>
      </section>

      {/* Claims Table */}
      <div className="bg-surface-container-low rounded-xl border border-outline-variant/15 overflow-hidden shadow-xl">
        <div className="px-6 py-5 border-b border-outline-variant/10 flex items-center justify-between">
          <h3 className="text-lg font-headline font-bold flex items-center gap-2 text-on-surface">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Submission History
          </h3>
          <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Live Sync Active</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high/50">
                <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-on-surface-variant font-semibold">Claim ID</th>
                <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-on-surface-variant font-semibold">Policyholder</th>
                <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-on-surface-variant font-semibold">Submitted Date</th>
                <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-on-surface-variant font-semibold">Location</th>
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
                  <td className="px-6 py-5 text-sm text-on-surface">{claim.submittedAt}</td>
                  <td className="px-6 py-5 text-sm text-on-surface">{claim.location}</td>
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
    </div>
  );
}