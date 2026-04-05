import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, Eye, EyeOff } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { cn } from "@/lib/utils";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Simple admin check (demo purposes)
    if (password === "admin123") {
      // Store admin session
      localStorage.setItem("admin_token", "admin_session_token");
      localStorage.setItem("admin_user", JSON.stringify({
        id: "admin-001",
        email: "admin@aegis.ai",
        name: "System Administrator",
        role: "admin"
      }));
      window.location.href = "/admin";
    } else {
      setError("Invalid admin credentials");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Theme Switcher */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div className="absolute top-6 right-6 pointer-events-auto">
          <ThemeSwitcher />
        </div>
      </div>

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_var(--color-primary)_0.01,_transparent_50%)] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <button 
            onClick={() => navigate("/login")}
            className="text-xs text-on-surface-variant hover:text-primary mb-8 block w-full"
          >
            ← Back to Product Login
          </button>
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-error/10 border border-error/20 mb-2">
            <Shield className="w-5 h-5 text-error" />
          </div>
          <h1 className="text-3xl font-headline font-bold text-on-surface">Admin Portal</h1>
          <p className="text-on-surface-variant mt-2">Secure administrative access</p>
        </div>

        <GlassPanel className="p-8 rounded-2xl border-t border-l border-white/5">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 rounded-xl bg-error/10 border border-error/20 text-error text-sm font-medium flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-error" />
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                  Admin Access Code
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin code..."
                    className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg pl-10 pr-12 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-error/50 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-[10px] text-on-surface-variant/50 mt-2">Demo: use "admin123"</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !password}
              className={cn(
                "w-full py-4 rounded-xl text-sm font-bold tracking-wide transition-all",
                password 
                  ? "bg-gradient-to-r from-error to-primary text-on-primary hover:shadow-lg hover:shadow-error/20" 
                  : "bg-surface-container text-on-surface-variant cursor-not-allowed"
              )}
            >
              {isLoading ? "Authenticating..." : "Access Admin Portal"}
            </button>
          </form>
        </GlassPanel>

        <div className="mt-8 text-center">
          <p className="text-[10px] font-label text-on-surface-variant/40 leading-relaxed uppercase tracking-wider">
            Protected by AI Governance Protocol v4.0.2
          </p>
        </div>
      </div>
    </div>
  );
}