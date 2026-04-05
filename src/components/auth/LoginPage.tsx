import { useState, useCallback } from "react";
import { BarChart3, Shield, Gavel, Headphones, Settings, Badge, Mail, Lock, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { PersonaTile } from "@/components/ui/persona-tile";
import { GlassPanel } from "@/components/ui/glass-panel";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useAuthContext } from "@/context/AuthContext";
import { sampleUsers, ROLE_PERSONA_MAP } from "@/data/users";
import { cn } from "@/lib/utils";

const personas = [
  { id: "admin", icon: <Settings className="w-5 h-5" />, title: "Administrator", subtitle: "System Administration" },
  { id: "executors", icon: <BarChart3 className="w-5 h-5" />, title: "Executors", subtitle: "Enterprise Access" },
  { id: "underwriter", icon: <Shield className="w-5 h-5" />, title: "Underwriter", subtitle: "Risk Assessment" },
  { id: "adjudicator", icon: <Gavel className="w-5 h-5" />, title: "Claim Adjudicator", subtitle: "Legal Validation" },
  { id: "customer-service", icon: <Headphones className="w-5 h-5" />, title: "Custom`er Service", subtitle: "Tier 1 Support" },
  { id: "operations", icon: <Settings className="w-5 h-5" />, title: "Operation Support", subtitle: "Core Systems" },
  { id: "customer-agent", icon: <Badge className="w-5 h-5" />, title: "Customer Agent", subtitle: "Field Operations" },
];

type LoginMethod = "email" | "keycloak";

export function LoginPage() {
  const [selectedPersona, setSelectedPersona] = useState<string | null>("executors");
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("email");
  const [email, setEmail] = useState("alex.thompson@aegis.ai");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [notification, setNotification] = useState<{ show: boolean; message: string; type: "success" | "error" }>({ show: false, message: "", type: "error" });

  const { login, isLoading, error } = useAuthContext();

  const handleEmailLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login({
      persona: selectedPersona,
      email,
      password,
      rememberMe,
    });

    if (!result.success && result.error) {
      setNotification({ show: true, message: result.error, type: "error" });
      setTimeout(() => setNotification({ show: false, message: "", type: "error" }), 4000);
    }
  }, [selectedPersona, email, password, rememberMe, login]);

  const handleKeycloakLogin = useCallback(async () => {
    alert("Keycloak integration coming soon");
  }, []);

  const selectUser = (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
    const correctPersona = ROLE_PERSONA_MAP[userEmail];
    if (correctPersona) {
      setSelectedPersona(correctPersona);
    }
    setShowUserDropdown(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Theme Switcher */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div className="absolute top-6 right-6 pointer-events-auto">
          <ThemeSwitcher />
        </div>
      </div>

      {/* Cinematic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--color-primary)_0.08,_transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <main className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        {/* Left Column: Branding & Personas */}
        <div className="w-full lg:w-3/5 space-y-8 lg:space-y-12">
          <header className="space-y-3 lg:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20">
              <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_var(--color-secondary)]" />
              <span className="text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant">
                System Status: Operational
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold tracking-tighter leading-none">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AI</span>genesis
            </h1>
            <p className="text-on-surface-variant text-base lg:text-lg max-w-md font-light leading-relaxed">
              Secure gateway to the next generation of risk orchestration and claim intelligence.
            </p>
          </header>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xs font-label uppercase tracking-widest text-secondary font-semibold whitespace-nowrap">
                Select Personnel Profile
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-outline-variant/30 to-transparent min-w-0" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-4">
              {personas.map((persona) => (
                <PersonaTile
                  key={persona.id}
                  icon={persona.icon}
                  title={persona.title}
                  subtitle={persona.subtitle}
                  isActive={selectedPersona === persona.id}
                  onClick={() => setSelectedPersona(persona.id)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Login Card */}
        <div className="w-full lg:w-2/5 max-w-md">
          <GlassPanel className="p-6 sm:p-8 lg:p-10 rounded-2xl border-t border-l border-white/5 shadow-2xl relative overflow-hidden">
            {/* Decorative AI Pulse */}
            <div className="absolute top-0 right-0 w-24 lg:w-32 h-24 lg:h-32 bg-secondary/5 blur-3xl -mr-12 lg:-mr-16 -mt-12 lg:-mt-16" />

            <div className="relative z-10 space-y-6 lg:space-y-8">
              {/* Login Method Toggle */}
              <div className="flex rounded-lg bg-surface-container p-1">
                <button
                  type="button"
                  onClick={() => setLoginMethod("email")}
                  className={cn(
                    "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                    loginMethod === "email"
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  )}
                >
                  Email Login
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod("keycloak")}
                  className={cn(
                    "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                    loginMethod === "keycloak"
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  )}
                >
                  Keycloak
                </button>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
                  {error}
                </div>
              )}

              {loginMethod === "email" ? (
                <form onSubmit={handleEmailLogin} className="space-y-5 lg:space-y-6">
                  {/* Email Input with User Dropdown */}
                  <div className="relative space-y-3">
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="user@aegis.ai"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      icon={<Mail className="w-4 h-4" />}
                    />
                    {/* Sample User Dropdown - below email input */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowUserDropdown(!showUserDropdown)}
                        className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1 w-full justify-end"
                      >
                        <span>Use sample user</span>
                        <svg className={`w-3 h-3 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {showUserDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container border border-outline-variant/30 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto">
                          {[...sampleUsers].sort((a, b) => {
                            if (a.role === "admin") return -1;
                            if (b.role === "admin") return 1;
                            return 0;
                          }).map((user) => (
                            <button
                              key={user.id}
                              type="button"
                              onClick={() => selectUser(user.email, "password123")}
                              className="w-full px-4 py-2 text-left hover:bg-surface-variant transition-colors flex items-center justify-between"
                            >
                              <div>
                                <p className="text-sm text-on-surface">{user.name}</p>
                                <p className="text-xs text-on-surface-variant">{user.email}</p>
                              </div>
                              <span className="text-xs text-primary uppercase">{user.role}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    icon={<Lock className="w-4 h-4" />}
                  />

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 pt-2">
                    <Checkbox
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      label="Remember me"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="gradient"
                    className="w-full py-3 lg:py-4 min-h-[48px]"
                    disabled={isLoading || !email || !password}
                  >
                    <span className={cn(isLoading && "opacity-0")}>Login</span>
                    {isLoading && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 text-on-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl lg:text-2xl font-headline font-semibold">Keycloak SSO</h3>
                    <p className="text-on-surface-variant text-sm">Authenticate using your organization's Keycloak identity provider</p>
                  </div>

                  <Button
                    type="button"
                    variant="gradient"
                    className="w-full py-3 lg:py-4"
                    onClick={handleKeycloakLogin}
                  >
                    <Key className="w-5 h-5 mr-2" />
                    Authenticate with Keycloak
                  </Button>
                </div>
              )}
            </div>
          </GlassPanel>

          {/* Bottom Disclaimer */}
          <div className="mt-6 lg:mt-8 text-center">
            <p className="text-[10px] font-label text-on-surface-variant/50">
              By accessing this terminal, you agree to the AI Ethics & Protocol Governance (v4.0.2).
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-4 lg:bottom-8 left-0 w-full flex justify-between px-6 lg:px-12 items-end z-10 pointer-events-none">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-label text-primary uppercase tracking-[0.3em]">Aigenesis</span>
        </div>
        <div className="flex gap-4 lg:gap-6 pointer-events-auto">
          <a className="text-[10px] font-label text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-[0.2em]" href="#">
            Privacy
          </a>
        </div>
      </footer>

      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary/10 to-transparent" />

      {/* Notification Toast */}
      {notification.show && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-slide-in">
          <div className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border",
            notification.type === "success"
              ? "bg-tertiary/20 border-tertiary text-tertiary"
              : "bg-error/20 border-error text-error"
          )}>
            {notification.type === "success" ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="text-sm font-medium text-on-surface">{notification.message}</span>
            <button onClick={() => setNotification({ show: false, message: "", type: "error" })} className="ml-2">
              <svg className="w-4 h-4 text-on-surface-variant hover:text-on-surface" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}