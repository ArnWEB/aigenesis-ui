import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useAuthContext } from "@/context/AuthContext";

const LoginPage = lazy(() => import("@/components/auth/LoginPage").then(m => ({ default: m.LoginPage })));
const AdminLoginPage = lazy(() => import("@/components/auth/AdminLoginPage").then(m => ({ default: m.AdminLoginPage })));
const DashboardLayout = lazy(() => import("@/components/layout/DashboardLayout").then(m => ({ default: m.DashboardLayout })));
const ChatDrawer = lazy(() => import("@/components/chat/ChatDrawer").then(m => ({ default: m.ChatDrawer })));
const ChatTrigger = lazy(() => import("@/components/chat/ChatDrawer").then(m => ({ default: m.ChatTrigger })));

const OrchestriteDashboard = lazy(() => import("@/pages/orchestrite/DashboardPage").then(m => ({ default: m.DashboardPage })));
const OrchestriteTickets = lazy(() => import("@/pages/orchestrite/TicketsPage").then(m => ({ default: m.TicketsPage })));

const EvaluiteDashboard = lazy(() => import("@/pages/evaluite/DashboardPage").then(m => ({ default: m.DashboardPage })));
const EvaluiteClaims = lazy(() => import("@/pages/evaluite/ClaimsPage").then(m => ({ default: m.ClaimsPage })));
const EvaluiteRisk = lazy(() => import("@/pages/evaluite/RiskPage").then(m => ({ default: m.RiskPage })));

const InsightDashboard = lazy(() => import("@/pages/insight/DashboardPage").then(m => ({ default: m.DashboardPage })));
const InsightPortfolio = lazy(() => import("@/pages/insight/PortfolioPage").then(m => ({ default: m.PortfolioPage })));
const InsightAnalytics = lazy(() => import("@/pages/insight/AnalyticsPage").then(m => ({ default: m.AnalyticsPage })));

const AssistDashboard = lazy(() => import("@/pages/assist/DashboardPage").then(m => ({ default: m.DashboardPage })));
const AssistFieldOps = lazy(() => import("@/pages/assist/FieldOpsPage").then(m => ({ default: m.FieldOpsPage })));

const AdminDashboard = lazy(() => import("@/pages/admin/DashboardPage").then(m => ({ default: m.DashboardPage })));
const AdminUsers = lazy(() => import("@/pages/admin/UsersPage").then(m => ({ default: m.UsersPage })));
const AdminGovernance = lazy(() => import("@/pages/admin/GovernancePage").then(m => ({ default: m.GovernancePage })));
const AdminSettings = lazy(() => import("@/pages/admin/SettingsPage").then(m => ({ default: m.SettingsPage })));

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
  </div>
);

function Loading({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext();
  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Loading>{children}</Loading>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext();
  if (isLoading) return <LoadingSpinner />;
  if (isAuthenticated) {
    const redirect = localStorage.getItem("post_login_redirect");
    if (redirect) {
      localStorage.removeItem("post_login_redirect");
      return <Navigate to={redirect} replace />;
    }
    return <Navigate to="/orchestrite" replace />;
  }
  return <Loading>{children}</Loading>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthContext();
  const storedAdmin = localStorage.getItem("admin_user");
  const storedAdminUser = storedAdmin ? JSON.parse(storedAdmin) : null;
  const isAdmin = user?.role === "admin" || storedAdminUser?.role === "admin";
  if (isLoading) return <LoadingSpinner />;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  return <Loading>{children}</Loading>;
}

function DashboardWithLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardLayout>
        {children}
        <ChatTrigger onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))} />
        <ChatDrawer />
      </DashboardLayout>
    </Suspense>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route path="/orchestrite" element={<ProtectedRoute><DashboardWithLayout><OrchestriteDashboard /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/orchestrite/tickets" element={<ProtectedRoute><DashboardWithLayout><OrchestriteTickets /></DashboardWithLayout></ProtectedRoute>} />

        <Route path="/evaluite" element={<ProtectedRoute><DashboardWithLayout><EvaluiteDashboard /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/evaluite/claims" element={<ProtectedRoute><DashboardWithLayout><EvaluiteClaims /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/evaluite/risk" element={<ProtectedRoute><DashboardWithLayout><EvaluiteRisk /></DashboardWithLayout></ProtectedRoute>} />

        <Route path="/insight" element={<ProtectedRoute><DashboardWithLayout><InsightDashboard /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/insight/portfolio" element={<ProtectedRoute><DashboardWithLayout><InsightPortfolio /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/insight/analytics" element={<ProtectedRoute><DashboardWithLayout><InsightAnalytics /></DashboardWithLayout></ProtectedRoute>} />

        <Route path="/assist" element={<ProtectedRoute><DashboardWithLayout><AssistDashboard /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/assist/field-ops" element={<ProtectedRoute><DashboardWithLayout><AssistFieldOps /></DashboardWithLayout></ProtectedRoute>} />

        <Route path="/admin" element={<AdminRoute><DashboardWithLayout><AdminDashboard /></DashboardWithLayout></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><DashboardWithLayout><AdminUsers /></DashboardWithLayout></AdminRoute>} />
        <Route path="/admin/governance" element={<AdminRoute><DashboardWithLayout><AdminGovernance /></DashboardWithLayout></AdminRoute>} />
        <Route path="/admin/settings" element={<AdminRoute><DashboardWithLayout><AdminSettings /></DashboardWithLayout></AdminRoute>} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}