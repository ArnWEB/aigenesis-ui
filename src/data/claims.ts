export interface Claim {
  id: string;
  policyholder: {
    name: string;
    initials: string;
  };
  riskScore: number;
  amount: number;
  status: "analysis" | "flagged" | "review" | "approved" | "rejected";
  submittedAt: string;
  location: string;
}

export const claims: Claim[] = [
  {
    id: "#CLM-7281",
    policyholder: { name: "Elena Jørgensen", initials: "EJ" },
    riskScore: 24,
    amount: 14200,
    status: "analysis",
    submittedAt: "2024-01-15",
    location: "Seattle, WA"
  },
  {
    id: "#CLM-8902",
    policyholder: { name: "Marcus Thorne", initials: "MT" },
    riskScore: 82,
    amount: 8540,
    status: "flagged",
    submittedAt: "2024-01-14",
    location: "Chicago, IL"
  },
  {
    id: "#CLM-1204",
    policyholder: { name: "Suki Kim", initials: "SK" },
    riskScore: 12,
    amount: 2100,
    status: "review",
    submittedAt: "2024-01-13",
    location: "San Francisco, CA"
  },
  {
    id: "#CLM-4432",
    policyholder: { name: "Arthur Jenkins", initials: "AJ" },
    riskScore: 58,
    amount: 21000,
    status: "analysis",
    submittedAt: "2024-01-12",
    location: "Boston, MA"
  },
  {
    id: "#CLM-5521",
    policyholder: { name: "Nina Patel", initials: "NP" },
    riskScore: 35,
    amount: 5500,
    status: "review",
    submittedAt: "2024-01-11",
    location: "Miami, FL"
  },
  {
    id: "#CLM-6633",
    policyholder: { name: "Robert Chen", initials: "RC" },
    riskScore: 71,
    amount: 12750,
    status: "flagged",
    submittedAt: "2024-01-10",
    location: "Chicago, IL"
  },
  {
    id: "#CLM-7744",
    policyholder: { name: "Sarah Mitchell", initials: "SM" },
    riskScore: 28,
    amount: 3800,
    status: "analysis",
    submittedAt: "2024-01-09",
    location: "Denver, CO"
  },
  {
    id: "#CLM-8855",
    policyholder: { name: "David Williams", initials: "DW" },
    riskScore: 45,
    amount: 9200,
    status: "review",
    submittedAt: "2024-01-08",
    location: "Austin, TX"
  }
];

export const claimInsights = {
  claimId: "#CLM-8902",
  title: "Anomalous Damage Pattern Detected",
  description: "AI vision analysis indicates the vehicle damage on the fender does not match the physics of the reported multi-car collision. Likely pre-existing wear.",
  confidence: 98.4,
  riskFactor: "High",
  evidence: "damage_analysis_side_v2.exif"
};
