export interface SampleUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "executor" | "underwriter" | "adjudicator" | "customer_service" | "operations" | "customer_agent";
  persona: string;
  avatar?: string;
  department: string;
  permissions: string[];
}

export const sampleUsers: SampleUser[] = [
  {
    id: "usr-001",
    email: "alex.thompson@aegis.ai",
    name: "Alex Thompson",
    role: "executor",
    persona: "executors",
    department: "Enterprise",
    permissions: ["read", "write", "admin", "reports", "analytics"],
  },
  {
    id: "usr-002",
    email: "sarah.chen@aegis.ai",
    name: "Sarah Chen",
    role: "underwriter",
    persona: "underwriter",
    department: "Risk Assessment",
    permissions: ["read", "write", "underwrite", "approve"],
  },
  {
    id: "usr-003",
    email: "marcus.thorne@aegis.ai",
    name: "Marcus Thorne",
    role: "adjudicator",
    persona: "adjudicator",
    department: "Claims",
    permissions: ["read", "write", "adjudicate", "approve"],
  },
  {
    id: "usr-004",
    email: "elena.jorgensen@aegis.ai",
    name: "Elena Jørgensen",
    role: "customer_service",
    persona: "customer-service",
    department: "Support",
    permissions: ["read", "write", "support"],
  },
  {
    id: "usr-005",
    email: "david.kim@aegis.ai",
    name: "David Kim",
    role: "operations",
    persona: "operations",
    department: "Operations",
    permissions: ["read", "write", "operations"],
  },
  {
    id: "usr-006",
    email: "james.wilson@aegis.ai",
    name: "James Wilson",
    role: "customer_agent",
    persona: "customer-agent",
    department: "Field Operations",
    permissions: ["read", "write", "field"],
  },
  {
    id: "usr-007",
    email: "admin@aegis.ai",
    name: "System Admin",
    role: "admin",
    persona: "admin",
    department: "IT Administration",
    permissions: ["read", "write", "delete", "admin", "users", "settings"],
  },
];

export function getUserByEmail(email: string): SampleUser | undefined {
  return sampleUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
}

export function getUsersByRole(role: SampleUser["role"]): SampleUser[] {
  return sampleUsers.filter(user => user.role === role);
}

export function getUserPersona(email: string): string | undefined {
  const user = getUserByEmail(email);
  return user?.persona;
}

export const ROLE_PERSONA_MAP: Record<string, string> = {
  "alex.thompson@aegis.ai": "executors",
  "sarah.chen@aegis.ai": "underwriter",
  "marcus.thorne@aegis.ai": "adjudicator",
  "elena.jorgensen@aegis.ai": "customer-service",
  "david.kim@aegis.ai": "operations",
  "james.wilson@aegis.ai": "customer-agent",
  "admin@aegis.ai": "admin",
};

export const PERSONA_LABELS: Record<string, { title: string; subtitle: string }> = {
  admin: { title: "Administrator", subtitle: "System Administration" },
  executors: { title: "Executors", subtitle: "Enterprise Access" },
  underwriter: { title: "Underwriter", subtitle: "Risk Assessment" },
  adjudicator: { title: "Claim Adjudicator", subtitle: "Legal Validation" },
  "customer-service": { title: "Customer Service", subtitle: "Tier 1 Support" },
  operations: { title: "Operation Support", subtitle: "Core Systems" },
  "customer-agent": { title: "Customer Agent", subtitle: "Field Operations" },
};