import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useMemo } from "react";

const LoginPage = lazy(() => import("@/components/auth/LoginPage").then(m => ({ default: m.LoginPage })));
const AdminLoginPage = lazy(() => import("@/components/auth/AdminLoginPage").then(m => ({ default: m.AdminLoginPage })));
const DashboardLayout = lazy(() => import("@/components/layout/DashboardLayout").then(m => ({ default: m.DashboardLayout })));

const OrchestriteDashboard = lazy(() => import("@/pages/orchestrite/DashboardPage").then(m => ({ default: m.DashboardPage })));
const EvaluiteDashboard = lazy(() => import("@/pages/evaluite/DashboardPage").then(m => ({ default: m.DashboardPage })));
const InsightDashboard = lazy(() => import("@/pages/insight/DashboardPage").then(m => ({ default: m.DashboardPage })));
const AssistChat = lazy(() => import("@/pages/assist/ChatPage").then(m => ({ default: m.AssistChatPage })));
const AdminDashboard = lazy(() => import("@/pages/admin/DashboardPage").then(m => ({ default: m.DashboardPage })));

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
      </DashboardLayout>
    </Suspense>
  );
}

function NotFound() {
  const isAuthenticated = localStorage.getItem("auth_token");
  const isAdmin = localStorage.getItem("admin_user");
  
  if (isAuthenticated || isAdmin) {
    return <Navigate to="/orchestrite" replace />;
  }
  return <Navigate to="/login" replace />;
}

export function AppRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL || "/"}>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route path="/orchestrite" element={<ProtectedRoute><DashboardWithLayout><OrchestriteDashboard /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/orchestrite/*" element={<ProtectedRoute><DashboardWithLayout><OrchestriteDashboard /></DashboardWithLayout></ProtectedRoute>} />

        <Route path="/evaluite" element={<ProtectedRoute><DashboardWithLayout><EvaluiteDashboard /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/evaluite/*" element={<ProtectedRoute><DashboardWithLayout><EvaluiteDashboard /></DashboardWithLayout></ProtectedRoute>} />

        <Route path="/insight" element={<ProtectedRoute><DashboardWithLayout><InsightDashboard /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/insight/*" element={<ProtectedRoute><DashboardWithLayout><InsightDashboard /></DashboardWithLayout></ProtectedRoute>} />

        <Route path="/assist" element={<ProtectedRoute><DashboardWithLayout><AssistChat /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/assist/*" element={<ProtectedRoute><DashboardWithLayout><AssistChat /></DashboardWithLayout></ProtectedRoute>} />

        <Route path="/admin" element={<AdminRoute><DashboardWithLayout><AdminDashboard /></DashboardWithLayout></AdminRoute>} />
        <Route path="/admin/*" element={<AdminRoute><DashboardWithLayout><AdminDashboard /></DashboardWithLayout></AdminRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}