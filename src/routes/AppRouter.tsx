import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { LoginPage } from "@/components/auth/LoginPage";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { ClaimsPage } from "@/pages/ClaimsPage";
import { ChatDrawer, ChatTrigger } from "@/components/chat/ChatDrawer";
import { useState } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function DashboardWithLayout({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <DashboardLayout>
      {children}
      <ChatTrigger onClick={() => setIsChatOpen(true)} />
      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </DashboardLayout>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        
        {/* Executor Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardWithLayout><DashboardPage /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/portfolio" element={<ProtectedRoute><DashboardWithLayout><DashboardPage /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><DashboardWithLayout><DashboardPage /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><DashboardWithLayout><DashboardPage /></DashboardWithLayout></ProtectedRoute>} />
        
        {/* Underwriter Routes */}
        <Route path="/policies" element={<ProtectedRoute><DashboardWithLayout><DashboardPage /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/risk" element={<ProtectedRoute><DashboardWithLayout><DashboardPage /></DashboardWithLayout></ProtectedRoute>} />
        
        {/* Adjudicator Routes */}
        <Route path="/claims" element={<ProtectedRoute><DashboardWithLayout><ClaimsPage type="claims" /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/adjudicate" element={<ProtectedRoute><DashboardWithLayout><ClaimsPage type="adjudicate" /></DashboardWithLayout></ProtectedRoute>} />
        
        {/* Customer Service Routes */}
        <Route path="/tickets" element={<ProtectedRoute><DashboardWithLayout><DashboardPage /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/customers" element={<ProtectedRoute><DashboardWithLayout><DashboardPage /></DashboardWithLayout></ProtectedRoute>} />
        
        {/* Operations Routes */}
        <Route path="/agents" element={<ProtectedRoute><DashboardWithLayout><DashboardPage /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/clusters" element={<ProtectedRoute><DashboardWithLayout><DashboardPage /></DashboardWithLayout></ProtectedRoute>} />
        
        {/* Customer Agent Routes */}
        <Route path="/field-ops" element={<ProtectedRoute><DashboardWithLayout><DashboardPage /></DashboardWithLayout></ProtectedRoute>} />
        
        {/* Admin Routes */}
        <Route path="/admin/users" element={<ProtectedRoute><DashboardWithLayout><DashboardPage /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/admin/governance" element={<ProtectedRoute><DashboardWithLayout><DashboardPage /></DashboardWithLayout></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><DashboardWithLayout><DashboardPage /></DashboardWithLayout></ProtectedRoute>} />
        
        {/* Default catch-all */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <DashboardWithLayout>
                <DashboardPage />
              </DashboardWithLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}