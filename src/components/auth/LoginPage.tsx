import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Key, Bot, Activity, Lightbulb, Blocks, CheckCircle2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { GlassPanel } from "@/components/ui/glass-panel";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useAuthContext } from "@/context/AuthContext";
import { sampleUsers, ROLE_PERSONA_MAP } from "@/data/users";
import { cn } from "@/lib/utils";

// Easily modifiable configuration for the 4 highlighted products
type ProductModule = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  defaultPersona: string;
  allowedPersonas: string[] | "all"; // Configurable access mappings
}

const PRODUCTS: ProductModule[] = [
  {
    id: "orchestrate",
    name: "@iorchestrate",
    icon: <Blocks className="w-5 h-5" />,
    description: "Agentic workflow for Customer Service & Operations",
    features: [
      "Human-in-the-loop validation",
      "Interactive customer assistance",
      "Real-time operational orchestration"
    ],
    defaultPersona: "customer-service",
    allowedPersonas: ["customer-service", "operations"]
  },
  {
    id: "evaluate",
    name: "@ievaluate",
    icon: <Lightbulb className="w-5 h-5" />,
    description: "Workbench for Underwriting & Claims Management",
    features: [
      "Advanced claim adjudication",
      "Risk assessment scoring engine",
      "Unified underwriting interface"
    ],
    defaultPersona: "underwriter",
    allowedPersonas: "all"
  },
  {
    id: "insight",
    name: "@insight",
    icon: <Activity className="w-5 h-5" />,
    description: "Curated Business & Operation insight for Executives",
    features: [
      "Global KPI metrics reporting",
      "Predictive analytics engine",
      "Strategic management views"
    ],
    defaultPersona: "executive",
    allowedPersonas: ["executive", "admin"]
  },
  {
    id: "assist",
    name: "@iassist",
    icon: <Bot className="w-5 h-5" />,
    description: "Persona specific knowledge assistant",
    features: [
      "Context-aware AI assistance",
      "Automated prompt engineering",
      "Seamless field operational support"
    ],
    defaultPersona: "agent",
    allowedPersonas: "all"
  }
];

type LoginMethod = "email" | "keycloak";

export function LoginPage() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  const [loginMethod, setLoginMethod] = useState<LoginMethod>("email");
  const [email, setEmail] = useState("alex.thompson@aegis.ai");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [notification, setNotification] = useState<{ show: boolean; message: string; type: "success" | "error" }>({ show: false, message: "", type: "error" });

  const { login, isLoading, error } = useAuthContext();

  const getProductRedirectPath = (productId: string): string => {
    const routes: Record<string, string> = {
      orchestrate: "/orchestrate",
      evaluate: "/evaluate",
      insight: "/insight",
      assist: "/assist",
    };
    return routes[productId] || "/dashboard";
  };

  const handleEmailLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Module-Level Access Control Check
    const activeProduct = PRODUCTS.find(p => p.id === selectedProduct);
    const mappedUserPersona = ROLE_PERSONA_MAP[email.toLowerCase()];

    if (activeProduct && activeProduct.allowedPersonas !== "all") {
      // Check if user is known and their persona matches allowed personas
      if (!mappedUserPersona || !activeProduct.allowedPersonas.includes(mappedUserPersona)) {
        setNotification({
          show: true,
          message: `Access Denied: The ${activeProduct.name} module is not assigned to your role.`,
          type: "error"
        });
        setTimeout(() => setNotification({ show: false, message: "", type: "error" }), 5000);
        return; // Prevent login
      }
    }

    const result = await login({
      persona: selectedPersona,
      email,
      password,
      rememberMe,
    });

    if (result.success && selectedProduct) {
      const targetPath = getProductRedirectPath(selectedProduct);
      // Store intended redirect to prevent PublicRoute override
      localStorage.setItem("post_login_redirect", targetPath);
      // Use longer delay to ensure auth state is fully updated
      setTimeout(() => {
        navigate(targetPath, { replace: true });
      }, 100);
    }

    if (!result.success && result.error) {
      setNotification({ show: true, message: result.error, type: "error" });
      setTimeout(() => setNotification({ show: false, message: "", type: "error" }), 4000);
    }
  }, [selectedProduct, selectedPersona, email, password, rememberMe, login, navigate]);

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

  const handleProductSelect = (product: typeof PRODUCTS[0]) => {
    if (selectedProduct === product.id) {
      setSelectedProduct(null);
      setSelectedPersona(null);
    } else {
      setSelectedProduct(product.id);
      setSelectedPersona(product.defaultPersona);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 relative overflow-hidden bg-background">
      {/* Theme Switcher */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div className="absolute top-6 right-6 pointer-events-auto">
          <ThemeSwitcher />
        </div>
      </div>

      {/* Cinematic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_var(--color-primary)_0.01,_transparent_50%)] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <main className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start lg:pt-16">

        {/* Left Column: Branding & Personas */}
        <div className="w-full lg:w-3/5 space-y-8 lg:space-y-12">
          <header className="space-y-3 lg:space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20">
                <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_var(--color-secondary)]" />
                <span className="text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant">
                  System Status: Operational
                </span>
              </div>
              <button
                onClick={() => navigate("/admin/login")}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20 hover:border-primary/40 hover:bg-surface-variant/50 transition-all group"
              >
                <Shield className="w-3.5 h-3.5 text-on-surface-variant group-hover:text-primary" />
                <span className="text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant group-hover:text-on-surface">
                  Admin Portal
                </span>
              </button>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <img
                src="/aigenesis.jpeg"
                alt="Aigenesis Brand"
                className="w-14 h-14 sm:w-16 sm:h-16 relative z-10 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] rounded-md object-contain flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.style.opacity = '0.5';
                }}
              />
              <div className="flex flex-col justify-center gap-1">
                <h1
                  className="text-3xl sm:text-4xl lg:text-[42px] tracking-tight leading-none text-on-surface drop-shadow-sm"
                  style={{ fontFamily: '"Algerian", serif', fontWeight: 'normal' }}
                >
                  <span className="text-primary">AI</span>GENESIS
                </h1>
                <p className="text-on-surface-variant text-sm sm:text-base lg:text-lg max-w-md font-medium leading-snug tracking-tight">
                  Ride the AI Revolution. Accelerate with us
                </p>
              </div>
            </div>
          </header>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xs font-label uppercase tracking-widest text-primary font-semibold whitespace-nowrap">
                SELECT PRODUCT MODULE
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-outline-variant/30 to-transparent min-w-0" />
            </div>

            {/* Using items-start ensures tiles that aren't expanded stay at their minimal height */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 items-start">
              {PRODUCTS.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductSelect(product)}
                  className={cn(
                    "p-5 rounded-2xl flex flex-col items-start text-left gap-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group outline-none overflow-hidden relative border",
                    selectedProduct === product.id
                      ? "border-primary shadow-[0_0_30px_rgba(232,110,36,0.3)] bg-[#ef803b] relative z-10 scale-[1.02]"
                      : selectedProduct
                        ? "glass-panel border-white/5 opacity-40 hover:opacity-70 scale-[0.98]"
                        : "glass-panel border-white/5 hover:border-primary/40 hover:bg-surface-variant/50"
                  )}
                >
                  <span className={cn(
                    "text-xl transition-colors duration-300",
                    selectedProduct === product.id ? "text-white drop-shadow-md" : "text-primary/70 group-hover:text-primary"
                  )}>
                    {product.icon}
                  </span>

                  <div className="text-left w-full z-10">
                    <div className={cn(
                      "flex items-center text-xl sm:text-2xl font-sans font-black tracking-tighter mt-2 mb-1",
                      selectedProduct === product.id ? "text-black drop-shadow-md" : "text-white"
                    )}>
                      {product.name.startsWith('@') ? (
                        <>
                          <span className={selectedProduct === product.id ? "text-black" : "text-[#ef803b]"}>
                            {product.name.substring(0, 2)}
                          </span>
                          <span className={cn(
                            selectedProduct === product.id ? "text-black/95" : "text-white"
                          )}>
                            {product.name.substring(2)}
                          </span>
                        </>
                      ) : (
                        <span>{product.name}</span>
                      )}
                    </div>
                    <span className={cn(
                      "text-[10px] font-label uppercase tracking-widest",
                      selectedProduct === product.id ? "text-black font-extrabold" : "text-on-surface-variant"
                    )}>
                      {product.description}
                    </span>

                    {/* Expandable Features list */}
                    <div
                      className={cn(
                        "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        selectedProduct === product.id ? "grid-rows-[1fr] mt-5 opacity-100" : "grid-rows-[0fr] mt-0 opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <ul className={cn(
                          "space-y-2.5 pt-4 border-t",
                          selectedProduct === product.id ? "border-black/20" : "border-outline-variant/20"
                        )}>
                          {product.features.map((feature, idx) => (
                            <li key={idx} className={cn(
                              "flex items-start gap-2.5 text-xs sm:text-sm font-medium leading-relaxed",
                              selectedProduct === product.id ? "text-black" : "text-on-surface-variant font-light"
                            )}>
                              <CheckCircle2 className={cn(
                                "w-3.5 h-3.5 mt-0.5 flex-shrink-0",
                                selectedProduct === product.id ? "text-black" : "text-primary"
                              )} />
                              <span className={cn(
                                "transition-colors",
                                selectedProduct !== product.id && "group-hover:text-on-surface"
                              )}>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Gentle overlay to give the orange some depth */}
                  {selectedProduct === product.id && (
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-xl" />
                  )}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Dynamic Content Area */}
        <div className="w-full lg:w-2/5 max-w-md relative lg:mt-0 mt-8 min-h-[480px] flex flex-col justify-center">

          {/* Ambient Brand Graphic (Visible when NO product selected) */}
          <div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
              !selectedProduct
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            )}
          >
            <div className="relative w-full aspect-square max-w-[480px] flex items-center justify-center group pointer-events-auto">
              {/* Soft ambient glow behind the entire lockup */}
              <div className="absolute inset-4 bg-primary/10 blur-[100px] rounded-full transition-opacity duration-1000 opacity-60 group-hover:opacity-100" />

              {/* Typography Brand Stack */}
              <div className="flex flex-col items-center justify-center relative z-10 w-full animate-fade-in pointer-events-none px-4 sm:px-0">

                <div className="relative group flex flex-col items-center w-full max-w-[420px]">
                  <div className="absolute -inset-4 bg-gradient-to-b from-primary/10 to-transparent blur-2xl rounded-sm opacity-60" />

                  <div className="relative w-full flex flex-col items-center p-12 sm:px-14 sm:py-16 bg-[#131313]/90 backdrop-blur-2xl rounded-sm border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.9)]">
                    {/* High-Tech Tactical Corner Effects */}
                    <div className="absolute top-[-1px] left-[-1px] w-6 h-6 border-t-[1px] border-l-[1px] border-[#ef803b] drop-shadow-[0_0_8px_rgba(239,128,59,0.5)] opacity-80" />
                    <div className="absolute bottom-[-1px] right-[-1px] w-6 h-6 border-b-[1px] border-r-[1px] border-[#ef803b] drop-shadow-[0_0_8px_rgba(239,128,59,0.5)] opacity-80" />

                    {/* @iGENE */}
                    <div className="flex items-center drop-shadow-2xl">
                      <span className="text-[#ef803b] text-4xl sm:text-[44px] font-sans font-black tracking-tighter">
                        @i
                      </span>
                      <span className="text-white text-4xl sm:text-[44px] font-sans font-black tracking-tighter ml-1">
                        GENE
                      </span>
                    </div>

                    {/* Subtle Divider */}
                    <div className="w-40 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-5 mb-4" />

                    {/* INSURE */}
                    <div className="text-white/70 text-2xl tracking-[0.6em] uppercase font-light drop-shadow-md ml-2">
                      INSURE
                    </div>

                    {/* Validated Neural Core */}
                    {/* <div className="flex items-center gap-2 mt-10 mb-8 opacity-80 border border-white/5 px-4 py-1.5 rounded-full bg-white/5">
                      <Shield className="w-3 h-3 text-[#ef803b]" />
                      <span className="text-white/60 text-[9px] sm:text-[10px] font-label tracking-[0.15em] uppercase">
                        VALIDATED NEURAL CORE
                      </span>
                    </div> */}

                    {/* Lower Divider */}
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#ef803b]/40 to-transparent mb-6 opacity-60" />

                    {/* INTELLIGENT INSURANCE ECOSYSTEM */}
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="text-[#ef803b]/95 text-lg sm:text-[22px] drop-shadow-[0_0_10px_rgba(239,128,59,0.3)] tracking-[0.15em]" style={{ fontFamily: '"Algerian", serif' }}>
                        INTELLIGENT
                      </span>
                      <span className="text-[#ef803b]/95 text-lg sm:text-[22px] drop-shadow-[0_0_10px_rgba(239,128,59,0.3)] tracking-[0.15em]" style={{ fontFamily: '"Algerian", serif' }}>
                        INSURANCE
                      </span>
                      <span className="text-[#ef803b]/95 text-lg sm:text-[22px] drop-shadow-[0_0_10px_rgba(239,128,59,0.3)] tracking-[0.15em]" style={{ fontFamily: '"Algerian", serif' }}>
                        ECOSYSTEM
                      </span>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Login Window (Visible when product IS selected) */}
          <div
            className={cn(
              "w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative",
              selectedProduct
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-16 pointer-events-none"
            )}
          >
            <GlassPanel className="p-8 sm:p-10 rounded-[2rem] border-t border-l border-white/5 shadow-2xl relative overflow-visible">
              {/* Ambient edge glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] -mr-16 -mt-16 pointer-events-none rounded-full" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 blur-[60px] -ml-20 -mb-20 pointer-events-none rounded-full" />

              <div className="relative z-10 space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-headline font-bold text-on-surface">System Access</h2>
                  <p className="text-sm text-on-surface-variant">Log in to enter the {PRODUCTS.find(p => p.id === selectedProduct)?.name || "workbench"}.</p>
                </div>

                {/* Login Method Toggle */}
                <div className="flex rounded-xl bg-surface-container p-1.5 border border-outline-variant/10">
                  <button
                    type="button"
                    onClick={() => setLoginMethod("email")}
                    className={cn(
                      "flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200",
                      loginMethod === "email"
                        ? "bg-primary text-on-primary shadow-md"
                        : "text-on-surface-variant hover:text-on-surface"
                    )}
                  >
                    Platform Auth
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMethod("keycloak")}
                    className={cn(
                      "flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200",
                      loginMethod === "keycloak"
                        ? "bg-primary text-on-primary shadow-md"
                        : "text-on-surface-variant hover:text-on-surface"
                    )}
                  >
                    Keycloak SSO
                  </button>
                </div>

                {error && (
                  <div className="p-4 rounded-xl bg-error/10 border border-error/20 text-error text-sm font-medium flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-error" />
                    {error}
                  </div>
                )}

                {loginMethod === "email" ? (
                  <form onSubmit={handleEmailLogin} className="space-y-6">
                    {/* Email Input with User Dropdown */}
                    <div className="relative space-y-4">
                      <Input
                        label="Enterprise Email"
                        type="email"
                        placeholder="user@aigensure.ai"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        icon={<Mail className="w-5 h-5 text-on-surface-variant" />}
                      />

                      {/* Sample User Dropdown */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowUserDropdown(!showUserDropdown)}
                          className="text-xs text-primary font-medium hover:text-primary/80 transition-colors flex items-center gap-1.5 w-full justify-end"
                        >
                          <span>Demo Users</span>
                          <svg className={`w-3.5 h-3.5 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {showUserDropdown && (
                          <div className="absolute top-full left-0 right-0 mt-3 bg-surface-container-high border border-outline-variant/20 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-20 max-h-[300px] overflow-y-auto custom-scrollbar overflow-hidden">
                            {[...sampleUsers]
                              .filter(u => u.role !== "admin")
                              .filter(u => !selectedPersona || ROLE_PERSONA_MAP[u.email] === selectedPersona)
                              .concat([...sampleUsers].filter(u => u.role !== "admin").filter(u => selectedPersona && ROLE_PERSONA_MAP[u.email] !== selectedPersona))
                              .map((user, idx) => (
                                <button
                                  key={user.id}
                                  type="button"
                                  onClick={() => selectUser(user.email, "password123")}
                                  className={cn(
                                    "w-full px-5 py-3 text-left hover:bg-surface-variant transition-colors flex items-center justify-between",
                                    idx !== 0 && "border-t border-outline-variant/10",
                                    selectedPersona && ROLE_PERSONA_MAP[user.email] === selectedPersona && "bg-primary/5"
                                  )}
                                >
                                  <div>
                                    <p className="text-sm font-semibold text-on-surface">{user.name}</p>
                                    <p className="text-[11px] text-on-surface-variant/80 mt-0.5">{user.email}</p>
                                  </div>
                                  <span className="text-[10px] bg-surface-container px-2 py-1 rounded-md text-primary font-bold uppercase tracking-wider border border-outline-variant/10">
                                    {user.role.replace('_', ' ')}
                                  </span>
                                </button>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <Input
                      label="Access Code"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      icon={<Lock className="w-5 h-5 text-on-surface-variant" />}
                    />

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 pt-2">
                      <Checkbox
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        label="Remember session"
                      />
                      <a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors">
                        Forgot credentials?
                      </a>
                    </div>

                    <Button
                      type="submit"
                      variant="gradient"
                      className="w-full py-4 text-sm font-bold tracking-wide rounded-xl mt-4"
                      disabled={isLoading || !email || !password}
                    >
                      <span className={cn(isLoading && "opacity-0")}>Authorize Access</span>
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
                  <div className="space-y-8 py-6">
                    <div className="flex justify-center text-primary/80">
                      <Key className="w-16 h-16 opacity-50" />
                    </div>
                    <Button
                      type="button"
                      variant="gradient"
                      className="w-full py-4 rounded-xl text-sm font-bold tracking-wide"
                      onClick={handleKeycloakLogin}
                    >
                      Connect with Keycloak
                    </Button>
                  </div>
                )}
              </div>
            </GlassPanel>

            {/* Bottom Disclaimer underneath Login */}
            <div className="mt-8 text-center px-4">
              <p className="text-[10px] font-label text-on-surface-variant/40 leading-relaxed uppercase tracking-wider">
                Protected by AI Governance Protocol v4.0.2
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Decorative Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      {/* Notification Toast */}
      {notification.show && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-slide-in">
          <div className={cn(
            "flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border backdrop-blur-xl",
            notification.type === "success"
              ? "bg-tertiary/20 border-tertiary text-tertiary"
              : "bg-error/20 border-error text-error"
          )}>
            <div className="w-8 h-8 rounded-full bg-error/20 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <span className="text-sm font-bold tracking-wide">{notification.message}</span>
            <button onClick={() => setNotification({ show: false, message: "", type: "error" })} className="ml-4 opacity-50 hover:opacity-100 transition-opacity">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}