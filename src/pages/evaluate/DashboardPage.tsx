import { useState } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { MetricChip } from "@/components/ui/MetricChip";
import { ReferredBotPanel } from "@/components/ui/ReferredBotPanel";
import type { ReferredBotItem } from "@/components/ui/ReferredBotPanel";
import { ApplicantDetails } from "@/components/ui/ApplicantDetails";
import { DocumentViewer } from "@/components/ui/DocumentViewer";

const kpiData = [
  {
    title: "Underwriting Cycle Time",
    value: "2.8 days",
    delta: "-0.4 days from last quarter",
    trendDirection: "down" as const,
    subtitle: "Faster",
    status: "good" as const,
  },
  {
    title: "Case Approval Rate",
    value: "68%",
    delta: "+3% from last quarter",
    trendDirection: "up" as const,
    subtitle: "Stable",
    status: "neutral" as const,
  },
  {
    title: "Quote-to-Bind Ratio",
    value: "42%",
    delta: "+4% from last quarter",
    trendDirection: "up" as const,
    subtitle: "Improving",
    status: "good" as const,
  },
  {
    title: "Referral Rate",
    value: "18%",
    delta: "+2% from last quarter",
    trendDirection: "up" as const,
    subtitle: "Slightly High",
    status: "warning" as const,
  },
];

const referredData: ReferredBotItem[] = [
  { id: "CLM-8902", name: "John D.", amount: "$45,000", status: "Standard" },
  { id: "CLM-8903", name: "Sarah M.", amount: "$12,500", status: "Preferred" },
  { id: "CLM-8904", name: "Mike R.", amount: "$8,200", status: "Preferred" },
];

const tasks = [
  "Review Quote Request",
  "Approve Policy Terms",
  "Request Additional Info",
];

interface ClaimData {
  id: string;
  name: string;
  amount: string;
  status: "Standard" | "Preferred";
  applicant: {
    name: string;
    placeOfBirth: string;
    nationality: string;
    dob: string;
    gender: string;
    civilStatus: string;
    country: string;
  };
  documentUrl: string;
  kpis: {
    title: string;
    value: string;
    status: "good" | "neutral" | "warning";
  }[];
}

const claimDataMap: Record<string, ClaimData> = {
  "CLM-8902": {
    id: "CLM-8902",
    name: "John D.",
    amount: "$45,000",
    status: "Standard",
    applicant: {
      name: "John D.",
      placeOfBirth: "New York, USA",
      nationality: "American",
      dob: "15/03/1985",
      gender: "Male",
      civilStatus: "Married",
      country: "United States",
    },
    documentUrl: "",
    kpis: [
      { title: "Health Risk Score", value: "72", status: "good" },
      { title: "Occupational Risk", value: "65", status: "neutral" },
      { title: "Territorial Risk", value: "N/A", status: "neutral" },
      { title: "Overall Risk Score", value: "68.5", status: "good" },
      { title: "Risk Category", value: "Standard", status: "neutral" },
      { title: "BOT Decision", value: "Approve", status: "good" },
    ],
  },
  "CLM-8903": {
    id: "CLM-8903",
    name: "Sarah M.",
    amount: "$12,500",
    status: "Preferred",
    applicant: {
      name: "Sarah M.",
      placeOfBirth: "Los Angeles, USA",
      nationality: "American",
      dob: "22/07/1990",
      gender: "Female",
      civilStatus: "Single",
      country: "United States",
    },
    documentUrl: "",
    kpis: [
      { title: "Health Risk Score", value: "45", status: "good" },
      { title: "Occupational Risk", value: "38", status: "good" },
      { title: "Territorial Risk", value: "52", status: "neutral" },
      { title: "Overall Risk Score", value: "42", status: "good" },
      { title: "Risk Category", value: "Preferred", status: "good" },
      { title: "BOT Decision", value: "Approve", status: "good" },
    ],
  },
  "CLM-8904": {
    id: "CLM-8904",
    name: "Mike R.",
    amount: "$8,200",
    status: "Preferred",
    applicant: {
      name: "Mike R.",
      placeOfBirth: "Chicago, USA",
      nationality: "American",
      dob: "10/11/1978",
      gender: "Male",
      civilStatus: "Married",
      country: "United States",
    },
    documentUrl: "",
    kpis: [
      { title: "Health Risk Score", value: "58", status: "neutral" },
      { title: "Occupational Risk", value: "70", status: "warning" },
      { title: "Territorial Risk", value: "N/A", status: "neutral" },
      { title: "Overall Risk Score", value: "62", status: "neutral" },
      { title: "Risk Category", value: "Preferred", status: "good" },
      { title: "BOT Decision", value: "Review", status: "warning" },
    ],
  },
};

export function DashboardPage() {
  const [selectedClaim, setSelectedClaim] = useState<ReferredBotItem | null>(null);

  const handleItemClick = (item: ReferredBotItem) => {
    console.log("handleItemClick called with:", item);
    setSelectedClaim(item);
  };

  const handleClosePreview = () => {
    console.log("handleClosePreview called");
    setSelectedClaim(null);
  };

  console.log("Rendering - selectedClaim:", selectedClaim);

  const selectedClaimData = selectedClaim ? claimDataMap[selectedClaim.id] : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-on-surface"><span className="text-primary">@i</span>Evaluate</h1>
        <p className="text-on-surface-variant mt-1">Workbench for Leads - Claim Adjudication & Risk Assessment</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <MetricChip
            key={kpi.title}
            title={kpi.title}
            value1={kpi.value}
            trend={kpi.delta}
            trendDirection={kpi.trendDirection}
            subtitle={kpi.subtitle}
            status={kpi.status}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <ReferredBotPanel 
          items={referredData} 
          onItemClick={handleItemClick}
          selectedId={selectedClaim?.id}
        />
        <GlassPanel className="p-6">
          <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Underwriting Tasks</h3>
          <div className="space-y-2">
            {tasks.map((task) => (
              <button key={task} className="w-full p-3 text-left text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 rounded-lg transition-colors">
                {task}
              </button>
            ))}
          </div>
        </GlassPanel>
      </div>

      {selectedClaim && selectedClaimData && (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-[#333]">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Selected:</span>
              <span className="text-white font-medium">{selectedClaimData.name}</span>
              <span className="text-xs text-gray-500">({selectedClaimData.id})</span>
            </div>
            <button
              onClick={handleClosePreview}
              className="px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-[#333] rounded-lg transition-colors"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {selectedClaimData.kpis.map((kpi) => (
              <MetricChip
                key={kpi.title}
                title={kpi.title}
                value1={kpi.value}
                status={kpi.status}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ApplicantDetails
                name={selectedClaimData.applicant.name}
                details={[
                  { label: "Place of Birth", value: selectedClaimData.applicant.placeOfBirth },
                  { label: "Nationality", value: selectedClaimData.applicant.nationality },
                  { label: "Date of Birth", value: selectedClaimData.applicant.dob },
                  { label: "Gender", value: selectedClaimData.applicant.gender },
                  { label: "Civil Status", value: selectedClaimData.applicant.civilStatus },
                  { label: "Country", value: selectedClaimData.applicant.country },
                ]}
              />
            </div>
            <div className="lg:col-span-2">
              <DocumentViewer
                url={selectedClaimData.documentUrl}
                title={`Application - ${selectedClaimData.id}`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}