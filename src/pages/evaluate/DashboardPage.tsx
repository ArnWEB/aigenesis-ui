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
  { id: "53016828", name: "DELA CRUZ, MIA", amount: "$1,000,000", status: "Standard" },
  { id: "58155080", name: "VELASCO REYNA", amount: "$1,500,000", status: "Preferred" },
];

const tasks = [
  "Review Quote Request",
  "Approve Policy Terms",
  "Request Additional Info",
];

interface Address {
  buildingNo: string;
  street: string;
  subdivision: string;
  city: string;
  province: string;
  country: string;
  zip: string;
}

interface Applicant {
  name: string;
  otherName: string;
  placeOfBirth: string;
  nationality: string;
  usCitizen: string;
  dob: string;
  gender: string;
  civilStatus: string;
  residentOf: string;
  durationMonths: string;
  presentAddress: Address;
  permanentAddress: Address;
  annualIncome: string;
  occupation: string;
  employer: string;
  natureOfBusiness: string;
  mailingAddress: string;
  primaryContactNo: string;
  secondaryContactNo: string;
  email: string;
  sourceOfFunds: string;
  basePlan: string;
  insuredAmount: string;
  paymentDeposit: string;
  deductible: string;
  commencementDate: string;
}

interface ClaimData {
  id: string;
  name: string;
  amount: string;
  status: "Standard" | "Preferred";
  applicant: Applicant;
  documentUrl: string;
  kpis: {
    title: string;
    value: string;
    status: "good" | "neutral" | "warning";
  }[];
}

const claimDataMap: Record<string, ClaimData> = {
  "53016828": {
    id: "53016828",
    name: "DELA CRUZ, MIA",
    amount: "$1,000,000",
    status: "Standard",
    applicant: {
      name: "DELA CRUZ, MIA",
      otherName: "",
      placeOfBirth: "CALOOCAN CITY",
      nationality: "FILIPINO",
      usCitizen: "NO",
      dob: "09/04/1994",
      gender: "Female",
      civilStatus: "Single",
      residentOf: "PHILLIPINES",
      durationMonths: "372",
      presentAddress: {
        buildingNo: "28",
        street: "PAYAPA STREET",
        subdivision: "BAGONG DIWA",
        city: "CALOOCAN CITY",
        province: "STO. CRISTOBAL",
        country: "PHILLIPINES",
        zip: ""
      },
      permanentAddress: {
        buildingNo: "56",
        street: "AVENIDA LOPS",
        subdivision: "",
        city: "CALOOCAN CITY",
        province: "STA. MARIA",
        country: "PHILLIPINES",
        zip: ""
      },
      annualIncome: "1000000.00",
      occupation: "CEO",
      employer: "RHIA CORP. PHIL",
      natureOfBusiness: "",
      mailingAddress: "Present",
      primaryContactNo: "9567890873",
      secondaryContactNo: "",
      email: "delacruz.mia@123.com",
      sourceOfFunds: "Salary/Commission",
      basePlan: "ALLIANZ WELL",
      insuredAmount: "1000000",
      paymentDeposit: "13970",
      deductible: "0",
      commencementDate: "07/15/2025"
    },
    documentUrl: "/pdfs/Digital Health Application.pdf",
    kpis: [
      { title: "Health Risk Score", value: "72", status: "good" },
      { title: "Occupational Risk", value: "65", status: "neutral" },
      { title: "Territorial Risk", value: "N/A", status: "neutral" },
      { title: "Overall Risk Score", value: "68.5", status: "good" },
      { title: "Risk Category", value: "Standard", status: "neutral" },
      { title: "BOT Decision", value: "Approve", status: "good" },
    ],
  },
  "58155080": {
    id: "58155080",
    name: "VELASCO REYNA",
    amount: "$1,500,000",
    status: "Preferred",
    applicant: {
      name: "VELASCO REYNA",
      otherName: "",
      placeOfBirth: "QUEZON CITY",
      nationality: "FILIPINO",
      usCitizen: "NO",
      dob: "10/07/1990",
      gender: "Female",
      civilStatus: "Single",
      residentOf: "PHILLIPINES",
      durationMonths: "372",
      presentAddress: {
        buildingNo: "3462",
        street: "FLORIDA STREET",
        subdivision: "",
        city: "PALANAN",
        province: "",
        country: "PHILLIPINES",
        zip: ""
      },
      permanentAddress: {
        buildingNo: "1234",
        street: "NAVA STREET",
        subdivision: "",
        city: "PALANAN",
        province: "",
        country: "PHILLIPINES",
        zip: ""
      },
      annualIncome: "426000.00",
      occupation: "OFFICE WORKER",
      employer: "ABC CORPORATION",
      natureOfBusiness: "",
      mailingAddress: "Present",
      primaryContactNo: "9123456789",
      secondaryContactNo: "",
      email: "lasco.reyna@123.com",
      sourceOfFunds: "Salary/Commission",
      basePlan: "OPTIMAX GOLD",
      insuredAmount: "1500000",
      paymentDeposit: "",
      deductible: "",
      commencementDate: ""
    },
    documentUrl: "/pdfs/Handwritten Life Application.pdf",
    kpis: [
      { title: "Health Risk Score", value: "45", status: "good" },
      { title: "Occupational Risk", value: "38", status: "good" },
      { title: "Territorial Risk", value: "52", status: "neutral" },
      { title: "Overall Risk Score", value: "42", status: "good" },
      { title: "Risk Category", value: "Preferred", status: "good" },
      { title: "BOT Decision", value: "Approve", status: "good" },
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
              <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
                <ApplicantDetails
                  name={selectedClaimData.applicant.name}
                  details={[
                    { label: "Other Name", value: selectedClaimData.applicant.otherName },
                    { label: "Place of Birth", value: selectedClaimData.applicant.placeOfBirth },
                    { label: "Nationality", value: selectedClaimData.applicant.nationality },
                    { label: "US Citizen", value: selectedClaimData.applicant.usCitizen },
                    { label: "Date of Birth", value: selectedClaimData.applicant.dob },
                    { label: "Gender", value: selectedClaimData.applicant.gender },
                    { label: "Civil Status", value: selectedClaimData.applicant.civilStatus },
                    { label: "Resident Of", value: selectedClaimData.applicant.residentOf },
                    { label: "Duration (Months)", value: selectedClaimData.applicant.durationMonths },
                    { label: "Present Address", value: `${selectedClaimData.applicant.presentAddress.buildingNo} ${selectedClaimData.applicant.presentAddress.street}, ${selectedClaimData.applicant.presentAddress.city}, ${selectedClaimData.applicant.presentAddress.province}, ${selectedClaimData.applicant.presentAddress.country}` },
                    { label: "Permanent Address", value: `${selectedClaimData.applicant.permanentAddress.buildingNo} ${selectedClaimData.applicant.permanentAddress.street}, ${selectedClaimData.applicant.permanentAddress.city}, ${selectedClaimData.applicant.permanentAddress.province}, ${selectedClaimData.applicant.permanentAddress.country}` },
                    { label: "Annual Income (PHP)", value: selectedClaimData.applicant.annualIncome },
                    { label: "Occupation", value: selectedClaimData.applicant.occupation },
                    { label: "Employer", value: selectedClaimData.applicant.employer },
                    { label: "Nature of Business", value: selectedClaimData.applicant.natureOfBusiness },
                    { label: "Mailing Address", value: selectedClaimData.applicant.mailingAddress },
                    { label: "Primary Contact", value: selectedClaimData.applicant.primaryContactNo },
                    { label: "Secondary Contact", value: selectedClaimData.applicant.secondaryContactNo },
                    { label: "Email", value: selectedClaimData.applicant.email },
                    { label: "Source of Funds", value: selectedClaimData.applicant.sourceOfFunds },
                    { label: "Base Plan", value: selectedClaimData.applicant.basePlan },
                    { label: "Insured Amount", value: selectedClaimData.applicant.insuredAmount },
                    { label: "Payment Deposit", value: selectedClaimData.applicant.paymentDeposit },
                    { label: "Deductible", value: selectedClaimData.applicant.deductible },
                    { label: "Commencement Date", value: selectedClaimData.applicant.commencementDate },
                  ]}
                  editable={false}
                />
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
                <DocumentViewer
                  url={selectedClaimData.documentUrl}
                  title={`Application - ${selectedClaimData.id}`}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}