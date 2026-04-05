import { GlassPanel } from "@/components/ui/glass-panel";

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-on-surface">evalu@ite</h1>
        <p className="text-on-surface-variant mt-1">Workbench for Leads - Claim Adjudication & Risk Assessment</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">Pending Reviews</span>
          </div>
          <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">24</p>
          <p className="text-[10px] text-error mt-1">+5 high priority</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">Risk Score</span>
          </div>
          <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">72%</p>
          <p className="text-[10px] text-secondary mt-1">+12% improvement</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">Policies Approved</span>
          </div>
          <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">156</p>
          <p className="text-[10px] text-primary mt-1">+18% this month</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">Avg Processing</span>
          </div>
          <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">4.2h</p>
          <p className="text-[10px] text-tertiary mt-1">-15% faster</p>
        </GlassPanel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <GlassPanel className="p-6">
          <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Risk Assessment Queue</h3>
          <div className="space-y-3">
            {[
              { id: "CLM-8902", claimant: "John D.", risk: "High", amount: "$45,000" },
              { id: "CLM-8903", claimant: "Sarah M.", risk: "Medium", amount: "$12,500" },
              { id: "CLM-8904", claimant: "Mike R.", risk: "Low", amount: "$8,200" },
            ].map((claim) => (
              <div key={claim.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
                <div>
                  <p className="text-sm font-medium text-on-surface">{claim.claimant}</p>
                  <p className="text-xs text-on-surface-variant">{claim.id} - {claim.amount}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                  claim.risk === "High" ? "bg-error/20 text-error" :
                  claim.risk === "Medium" ? "bg-secondary/20 text-secondary" :
                  "bg-tertiary/20 text-tertiary"
                }`}>
                  {claim.risk} Risk
                </span>
              </div>
            ))}
          </div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Underwriting Tasks</h3>
          <div className="space-y-2">
            {["Review Quote Request", "Approve Policy Terms", "Request Additional Info"].map((task) => (
              <button key={task} className="w-full p-3 text-left text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 rounded-lg transition-colors">
                {task}
              </button>
            ))}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}