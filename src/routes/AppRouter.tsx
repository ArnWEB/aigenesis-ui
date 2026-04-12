import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useMemo } from "react";

const LoginPage = lazy(() => import("@/components/auth/LoginPage").then(m => ({ default: m.LoginPage })));
const AdminLoginPage = lazy(() => import("@/components/auth/AdminLoginPage").then(m => ({ default: m.AdminLoginPage })));
const DashboardLayout = lazy(() => import("@/components/layout/DashboardLayout").then(m => ({ default: m.DashboardLayout })));
const ChatDrawer = lazy(() => import("@/components/chat/ChatDrawer").then(m => ({ default: m.ChatDrawer })));
const ChatTrigger = lazy(() => import("@/components/chat/ChatDrawer").then(m => ({ default: m.ChatTrigger })));

const OrchestrateDashboard = lazy(() => import("@/pages/orchestrate/DashboardPage").then(m => ({ default: m.DashboardPage })));
const OrchestrateTickets = lazy(() => import("@/pages/orchestrate/TicketsPage").then(m => ({ default: m.TicketsPage })));
const EvaluateDashboard = lazy(() => import("@/pages/evaluate/DashboardPage").then(m => ({ default: m.DashboardPage })));
const EvaluateClaims = lazy(() => import("@/pages/evaluate/ClaimsPage").then(m => ({ default: m.ClaimsPage })));
const InsightDashboard = lazy(() => import("@/pages/insight/DashboardPage").then(m => ({ default: m.DashboardPage })));
const AssistChat = lazy(() => import("@/pages/assist/ChatPage").then(m => ({ default: m.AssistChatPage })));
const AdminDashboard = lazy(() => import("@/pages/admin/DashboardPage").then(m => ({ default: m.DashboardPage })));
const AdminUsers = lazy(() => import("@/pages/admin/UsersPage").then(m => ({ default: m.UsersPage })));
const AdminGovernance = lazy(() => import("@/pages/admin/GovernancePage").then(m => ({ default: m.GovernancePage })));
const AdminSettings = lazy(() => import("@/pages/admin/SettingsPage").then(m => ({ default: m.SettingsPage })));
const AdminAgentConsole = lazy(() => import("@/pages/admin/AgentConsolePage").then(m => ({ default: m.default })));

const NotFoundPage = lazy(() => import("@/pages/NotFoundPage").then(m => ({ default: m.default })));

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
    return <Navigate to="/orchestrate" replace />;
  }
  return <Loading>{children}</Loading>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthContext();

  const isAdmin = useMemo(() => {
    const storedAdmin = localStorage.getItem("admin_user");
    const storedAdminUser = storedAdmin ? JSON.parse(storedAdmin) : null;
    return user?.role === "admin" || storedAdminUser?.role === "admin";
  }, [user?.role]);

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

function DashboardWithLayoutNoChat({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </Suspense>
  );
}

function NotFound() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NotFoundPage />
    </Suspense>
  );
}

function RootRedirect() {
  const isAuthenticated = localStorage.getItem("auth_token");
  const isAdmin = localStorage.getItem("admin_user");
  
  if (isAdmin) return <Navigate to="/admin" replace />;
  if (isAuthenticated) return <Navigate to="/orchestrate" replace />;
  return <Navigate to="/login" replace />;
}

export function AppRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL || "/"}>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route path="/orchestrate" element={<ProtectedRoute><DashboardWithLayout><OrchestrateDashboard /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/orchestrate/tickets" element={<ProtectedRoute><DashboardWithLayout><OrchestrateTickets /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/orchestrate/*" element={<ProtectedRoute><DashboardWithLayout><OrchestrateDashboard /></DashboardWithLayout></ProtectedRoute>} />

        <Route path="/evaluate" element={<ProtectedRoute><DashboardWithLayout><EvaluateDashboard /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/evaluate/claims" element={<ProtectedRoute><DashboardWithLayout><EvaluateClaims /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/evaluate/*" element={<ProtectedRoute><DashboardWithLayout><EvaluateDashboard /></DashboardWithLayout></ProtectedRoute>} />

        <Route path="/insight" element={<ProtectedRoute><DashboardWithLayout><InsightDashboard /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/insight/*" element={<ProtectedRoute><DashboardWithLayout><InsightDashboard /></DashboardWithLayout></ProtectedRoute>} />

        <Route path="/assist" element={<ProtectedRoute><DashboardWithLayoutNoChat><AssistChat /></DashboardWithLayoutNoChat></ProtectedRoute>} />
        <Route path="/assist/*" element={<ProtectedRoute><DashboardWithLayoutNoChat><AssistChat /></DashboardWithLayoutNoChat></ProtectedRoute>} />

        <Route path="/admin" element={<AdminRoute><DashboardWithLayout><AdminDashboard /></DashboardWithLayout></AdminRoute>} />
        <Route path="/admin/agent-console" element={<AdminRoute><DashboardWithLayout><AdminAgentConsole /></DashboardWithLayout></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><DashboardWithLayout><AdminUsers /></DashboardWithLayout></AdminRoute>} />
        <Route path="/admin/governance" element={<AdminRoute><DashboardWithLayout><AdminGovernance /></DashboardWithLayout></AdminRoute>} />
        <Route path="/admin/settings" element={<AdminRoute><DashboardWithLayout><AdminSettings /></DashboardWithLayout></AdminRoute>} />
        <Route path="/admin/*" element={<AdminRoute><DashboardWithLayout><AdminDashboard /></DashboardWithLayout></AdminRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}