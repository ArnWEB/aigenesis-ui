export type ProductId = "orchestrite" | "evaluite" | "insight" | "assist" | "admin";

export interface ProductRoute {
  path: string;
  component: () => Promise<any>;
}

export interface ProductConfig {
  id: ProductId;
  name: string;
  routes: ProductRoute[];
}

export const PRODUCT_ROUTES: Record<ProductId, ProductConfig> = {
  orchestrite: {
    id: "orchestrite",
    name: "Orchestrite",
    routes: [
      { path: "/orchestrite", component: () => import("@/pages/orchestrite/DashboardPage") },
      { path: "/orchestrite/tickets", component: () => import("@/pages/orchestrite/TicketsPage") },
    ],
  },
  evaluite: {
    id: "evaluite",
    name: "Evaluite",
    routes: [
      { path: "/evaluite", component: () => import("@/pages/evaluite/DashboardPage") },
      { path: "/evaluite/claims", component: () => import("@/pages/evaluite/ClaimsPage") },
      { path: "/evaluite/risk", component: () => import("@/pages/evaluite/RiskPage") },
    ],
  },
  insight: {
    id: "insight",
    name: "Insight",
    routes: [
      { path: "/insight", component: () => import("@/pages/insight/DashboardPage") },
      { path: "/insight/portfolio", component: () => import("@/pages/insight/PortfolioPage") },
      { path: "/insight/analytics", component: () => import("@/pages/insight/AnalyticsPage") },
    ],
  },
  assist: {
    id: "assist",
    name: "Assist",
    routes: [
      { path: "/assist", component: () => import("@/pages/assist/DashboardPage") },
      { path: "/assist/field-ops", component: () => import("@/pages/assist/FieldOpsPage") },
    ],
  },
  admin: {
    id: "admin",
    name: "Admin",
    routes: [
      { path: "/admin", component: () => import("@/pages/admin/DashboardPage") },
      { path: "/admin/users", component: () => import("@/pages/admin/UsersPage") },
      { path: "/admin/governance", component: () => import("@/pages/admin/GovernancePage") },
      { path: "/admin/settings", component: () => import("@/pages/admin/SettingsPage") },
    ],
  },
};

export const getProductFromPath = (pathname: string): ProductId | null => {
  const pathLower = pathname.toLowerCase();
  if (pathLower.startsWith("/orchestrite")) return "orchestrite";
  if (pathLower.startsWith("/evaluite")) return "evaluite";
  if (pathLower.startsWith("/insight")) return "insight";
  if (pathLower.startsWith("/assist")) return "assist";
  if (pathLower.startsWith("/admin")) return "admin";
  return null;
};

export const PRODUCT_IDS = Object.keys(PRODUCT_ROUTES) as ProductId[];