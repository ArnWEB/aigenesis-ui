export type ProductId = "orchestrate" | "evaluate" | "insight" | "assist" | "admin";

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
  orchestrate: {
    id: "orchestrate",
    name: "Orchestrate",
    routes: [
      { path: "/orchestrate", component: () => import("@/pages/orchestrate/DashboardPage") },
      { path: "/orchestrate/tickets", component: () => import("@/pages/orchestrate/TicketsPage") },
    ],
  },
  evaluate: {
    id: "evaluate",
    name: "Evaluate",
    routes: [
      { path: "/evaluate", component: () => import("@/pages/evaluate/DashboardPage") },
      { path: "/evaluate/claims", component: () => import("@/pages/evaluate/ClaimsPage") },
      { path: "/evaluate/risk", component: () => import("@/pages/evaluate/RiskPage") },
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
      { path: "/assist", component: () => import("@/pages/assist/ChatPage") },
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
  if (pathLower.startsWith("/orchestrate")) return "orchestrate";
  if (pathLower.startsWith("/evaluate")) return "evaluate";
  if (pathLower.startsWith("/insight")) return "insight";
  if (pathLower.startsWith("/assist")) return "assist";
  if (pathLower.startsWith("/admin")) return "admin";
  return null;
};

export const PRODUCT_IDS = Object.keys(PRODUCT_ROUTES) as ProductId[];