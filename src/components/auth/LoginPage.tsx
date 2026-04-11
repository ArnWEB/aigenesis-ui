import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Key, Bot, Activity, Lightbulb, Blocks, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { useAuthContext } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { sampleUsers, ROLE_PERSONA_MAP } from "@/data/users";
import { cn } from "@/lib/utils";

type ProductModule = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  defaultPersona: string;
  allowedPersonas: string[] | "all";
}

const PRODUCTS: ProductModule[] = [
  {
    id: "orchestrate",
    name: "@iOrchestrate",
    icon: <Blocks className="w-5 h-5" />,
    description: "Agentic workflow for Customer Service & Operations",
    features: ["Human-in-the-loop validation", "Interactive customer assistance", "Real-time operational orchestration"],
    defaultPersona: "operations",
    allowedPersonas: ["operations", "customer_service"]
  },
  {
    id: "evaluate",
    name: "@iEvaluate",
    icon: <Lightbulb className="w-5 h-5" />,
    description: "Workbench for Underwriting & Claims Management",
    features: ["Advanced claim adjudication", "Risk assessment scoring engine", "Unified underwriting interface"],
    defaultPersona: "underwriter",
    allowedPersonas: "all"
  },
  {
    id: "insight",
    name: "@iInsight",
    icon: <Activity className="w-5 h-5" />,
    description: "Curated Business & Operation insight for Executives",
    features: ["Global KPI metrics reporting", "Predictive analytics engine", "Strategic management views"],
    defaultPersona: "executive",
    allowedPersonas: ["executive", "admin"]
  },
  {
    id: "assist",
    name: "@iAssist",
    icon: <Bot className="w-5 h-5" />,
    description: "Persona specific knowledge assistant",
    features: ["Context-aware AI assistance", "Automated prompt engineering", "Seamless field operational support"],
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
  const { colors } = useTheme();

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
    const activeProduct = PRODUCTS.find(p => p.id === selectedProduct);
    const mappedUserPersona = ROLE_PERSONA_MAP[email.toLowerCase()];

    if (activeProduct && activeProduct.allowedPersonas !== "all") {
      if (!mappedUserPersona || !activeProduct.allowedPersonas.includes(mappedUserPersona)) {
        setNotification({ show: true, message: `Access Denied: The ${activeProduct.name} module is not assigned to your role.`, type: "error" });
        setTimeout(() => setNotification({ show: false, message: "", type: "error" }), 5000);
        return;
      }
    }

    const result = await login({ persona: selectedPersona, email, password, rememberMe });
    if (result.success && selectedProduct) {
      const targetPath = getProductRedirectPath(selectedProduct);
      localStorage.setItem("post_login_redirect", targetPath);
      setTimeout(() => navigate(targetPath, { replace: true }), 100);
      return;
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
    if (correctPersona) setSelectedPersona(correctPersona);
    setShowUserDropdown(false);
  };

  const handleProductSelect = (product: ProductModule) => {
    if (selectedProduct === product.id) {
      setSelectedProduct(null);
      setSelectedPersona(null);
    } else {
      setSelectedProduct(product.id);
      setSelectedPersona(product.defaultPersona);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: colors.background }}>

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-[10%] -right-[5%] w-[50%] h-[50%] bg-[#ff9159]/5 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 right-0 w-[30%] h-[80%] bg-[#ff9159]/3 blur-[80px] rounded-full" />
      </div>

      {/* Main Content - includes header text */}
      <main className="flex-grow flex flex-col px-4 sm:px-8 md:px-16 pt-2 pb-4 z-10 w-full max-w-7xl mx-auto justify-center min-h-[calc(100vh-150px)]">
        {/* Fixed top right controls - hidden for now */}
        {/* <div className="fixed top-4 right-4 sm:right-8 md:right-16 z-50">
          <ThemeSwitcher />
        </div> */}

        <div className="fixed top-4 left-4 sm:left-8 md:left-16 z-50">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <img src="/aigenesis.jpeg" alt="Aigenesis" className="w-8 sm:w-9 md:w-10 rounded-md object-contain" onError={(e) => { e.currentTarget.style.opacity = '0.5'; }} />
              <h1 className="text-lg sm:text-xl md:text-2xl font-headline tracking-tighter text-white">
                <span className="text-[#ff9159]">AI</span>GENESIS
              </h1>
            </div>
            <span className="text-[10px] sm:text-xs text-neutral-400 ml-1 mt-0.5">Ride the AI Revolution. Accelerate with us</span>
          </div>
        </div>

        <div className="fixed top-4 right-4 sm:right-8 md:right-16 z-50">
          <button className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-600 bg-[var(--color-surface)]/80 backdrop-blur-sm text-[10px] uppercase tracking-[0.12em] text-neutral-400 hover:text-white hover:border-[#ff9159] hover:bg-[#ff9159]/10 transition-all duration-200 ease" onClick={() => navigate("/admin/login")}>
            <span>Admin Portal</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200 ease">→</span>
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 w-full max-w-7xl mx-auto items-center">

          {/* Left Column - Product Grid */}
          <div className="lg:col-span-7 space-y-3 mt-4 sm:mt-6 md:mt-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-[#ff9159] mb-2">SELECT PRODUCT MODULE</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {PRODUCTS.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductSelect(product)}
                  className={cn(
                    "p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col items-start text-left gap-4 sm:gap-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group outline-none overflow-hidden relative border-l-[3px]",
                    selectedProduct === product.id
                      ? "min-h-[14rem] border-l-[#ff9159] border-[#ff9159] shadow-[0_0_30px_rgba(255,145,89,0.3)] bg-[#ff9159] relative z-10"
                      : "bg-[var(--color-surface-container)] border-l-transparent border-white/[0.03] hover:border-l-[#ff9159] hover:border-[#ff9159]/40 hover:brightness-110 transition-all duration-200 ease",
                    selectedProduct && selectedProduct !== product.id && "opacity-40 hover:opacity-70"
                  )}
                >
                  <div className="absolute top-0 left-0 p-5 sm:p-6 opacity-40 group-hover:opacity-100 transition-opacity text-[#ff9159]">
                    {product.icon}
                  </div>

                  <div className="text-left w-full z-10 mt-8 sm:mt-10">
                    <div className="flex items-center font-black font-headline tracking-tighter mt-2 mb-1">
                      {product.name.startsWith('@i') ? (
                        <>
                          <span className={cn(selectedProduct === product.id ? "text-white  text-3xl sm:text-3xl md:text-3xl" : "text-[#ff9159]  text-3xl sm:text-3xl md:text-3xl")}>@i</span>
                          <span className={cn(selectedProduct === product.id ? "text-black  text-3xl sm:text-3xl md:text-3xl" : "text-white text-2xl sm:text-2xl md:text-2xl font-light")}>{product.name.slice(2)}</span>
                        </>
                      ) : product.name}
                    </div>

                    <span className={cn("text-[10px] uppercase tracking-[0.12em]", selectedProduct === product.id ? "text-black font-extrabold" : "text-neutral-400")}>
                      {product.description}
                    </span>

                    {/* Expandable Features */}
                    <div className={cn("transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden", selectedProduct === product.id ? "max-h-40 mt-4 opacity-100" : "max-h-0 mt-0 opacity-0")}>
                      <ul className={cn("space-y-2 pt-3 border-t", selectedProduct === product.id ? "border-black/20" : "border-white/[0.1]")}>
                        {product.features.map((feature, idx) => (
                          <li key={idx} className={cn("flex items-start gap-2.5 text-xs sm:text-sm font-medium leading-relaxed", selectedProduct === product.id ? "text-black" : "text-neutral-400")}>
                            <CheckCircle2 className={cn("w-3.5 h-3.5 mt-0.5 flex-shrink-0", selectedProduct === product.id ? "text-black" : "text-[#ff9159]")} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={cn("w-8 h-[1px] bg-[#484847] group-hover:w-full group-hover:bg-[#ff9159] transition-all duration-700", selectedProduct === product.id && "bg-black/20")} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - @iGENE / Login */}
          <div className="lg:col-span-5 flex flex-col items-center text-center justify-start mt-4 sm:mt-6 md:mt-8 pt-8 sm:pt-10 md:pt-12">
            {/* @iGENE Hero (when no product selected) */}
            <div className={cn("transition-all duration-700 flex flex-col items-center justify-center", selectedProduct ? "opacity-0 hidden" : "opacity-100")}>
              <div className="relative p-8 sm:p-10 pb-4 rounded-3xl bg-[var(--color-surface)]/60 border-t-2 border-[#E8620A] border-white/[0.08] backdrop-blur-md shadow-2xl w-full max-w-md">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#ff9159]/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#ff9159]/15 blur-[60px] rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center gap-6 pb-2">
                  <span className="px-3 py-1 rounded-full bg-[#ff9159]/20 border border-[#ff9159]/30 text-[10px] uppercase tracking-[0.12em] text-[#ff9159] font-medium">
                    ✦ AI-Powered Platform
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-[#ff9159] text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tighter">@i</span>
                    <span className="text-white text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tighter">GENE</span>
                  </div>
                  <span className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tighter text-white">INSURE</span>

                  <p className="text-primary text-sm sm:text-xs md:text-sm leading-relaxed max-w-md uppercase tracking-[0.08em] text-center text-[#ff9159]/70">
                    Intelligent Insurance Ecosystem
                  </p>

                  <div className="flex items-center gap-2 pt-2 text-[10px] text-neutral-400 animate-pulse">
                    <span className="text-[#ff9159] font-semibold">←</span>
                    <span className="uppercase tracking-[0.08em]">Select a module to begin</span>
                  </div>

                  <div className="flex items-center gap-3 pt-4 text-[10px] text-neutral-500 uppercase tracking-[0.08em]">
                    <span>4 Modules</span>
                    <span>·</span>
                    <span>99.9% Uptime</span>
                    <span>·</span>
                    <span>Live</span>
                  </div>
                  <div className="absolute bottom-3 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#ff9159]/30 to-transparent" />
                  {/* <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 text-[9px] text-neutral-500 uppercase tracking-[0.1em]">
                    <span>v2.4.0</span>
                    <span>·</span>
                    <span>Production</span>
                    <span>·</span>
                    <span>IN-WEST</span>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Login Form (when product selected) */}
            <div className={cn("w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col items-center", selectedProduct ? "opacity-100" : "opacity-0 hidden pointer-events-none")}>
              <div className="p-6 sm:p-8 md:p-10 rounded-2xl border border-white/5 shadow-2xl bg-[var(--color-surface-container-high)]/95 backdrop-blur-2xl w-full max-w-md">
                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#ff9159]/20 blur-[40px] sm:blur-[50px] -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 pointer-events-none rounded-full" />

                <div className="relative z-10 space-y-6 md:space-y-8">
                  <div className="text-center space-y-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">System Access</h2>
                    <p className="text-xs sm:text-sm text-neutral-400">Log in to enter the {PRODUCTS.find(p => p.id === selectedProduct)?.name || "workbench"}.</p>
                  </div>

                  <div className="flex rounded-xl bg-[#262626] p-1.5 border border-white/[0.05]">
                    <button type="button" onClick={() => setLoginMethod("email")} className={cn("flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200", loginMethod === "email" ? "bg-[#ff9159] text-black shadow-md" : "text-neutral-400 hover:text-white")}>Platform Auth</button>
                    <button type="button" onClick={() => setLoginMethod("keycloak")} className={cn("flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200", loginMethod === "keycloak" ? "bg-[#ff9159] text-black shadow-md" : "text-neutral-400 hover:text-white")}>Keycloak SSO</button>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />{error}
                    </div>
                  )}

                  {loginMethod === "email" ? (
                    <form onSubmit={handleEmailLogin} className="space-y-6">
                      <div className="relative space-y-4">
                        <Input label="Enterprise Email" type="email" placeholder="user@aigensure.ai" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} icon={<Mail className="w-5 h-5 text-neutral-400" />} />
                        <div className="relative">
                          <button type="button" onClick={() => setShowUserDropdown(!showUserDropdown)} className="text-xs text-[#ff9159] font-medium hover:text-[#ff9159]/80 transition-colors flex items-center gap-1.5 w-full justify-end">
                            <span>Demo Users</span>
                            <svg className={`w-3.5 h-3.5 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                          </button>
                          {showUserDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-3 bg-[#20201f] border border-white/[0.1] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-20 max-h-[300px] overflow-y-auto overflow-hidden">
                              {[...sampleUsers].filter(u => u.role !== "admin").map((user, idx) => (
                                <button key={user.id} type="button" onClick={() => selectUser(user.email, "password123")} className={cn("w-full px-5 py-3 text-left hover:bg-[#262626] transition-colors flex items-center justify-between", idx !== 0 && "border-t border-white/[0.05]")}>
                                  <div>
                                    <p className="text-sm font-semibold text-white">{user.name}</p>
                                    <p className="text-[11px] text-neutral-400 mt-0.5">{user.email}</p>
                                  </div>
                                  <span className="text-[10px] bg-[var(--color-surface-container)] px-2 py-1 rounded-md text-[#ff9159] font-bold uppercase tracking-wider border border-white/[0.05]">{user.role.replace('_', ' ')}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <Input label="Access Code" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} icon={<Lock className="w-5 h-5 text-neutral-400" />} />

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <Checkbox checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked as boolean)} label="Remember session" />
                        <a href="#" className="text-xs text-neutral-400 hover:text-[#ff9159] transition-colors">Forgot credentials?</a>
                      </div>

                      <Button type="submit" variant="gradient" className="w-full py-4 text-sm font-bold tracking-wide rounded-xl" disabled={isLoading || !email || !password}>
                        {isLoading ? "Loading..." : "Authorize Access"}
                      </Button>
                    </form>
                  ) : (
                    <div className="space-y-8 py-6">
                      <div className="flex justify-center text-[#ff9159]/80"><Key className="w-16 h-16 opacity-50" /></div>
                      <Button type="button" variant="gradient" className="w-full py-4 rounded-xl text-sm font-bold tracking-wide" onClick={handleKeycloakLogin}>Connect with Keycloak</Button>
                    </div>
                  )}

                  <div className="text-center">
                    <button onClick={() => { setSelectedProduct(null); setSelectedPersona(null); }} className="text-xs text-neutral-400 hover:text-white transition-colors">← Back to Products</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main >

      {/* Footer Status Bar */}
      < div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 md:px-16 py-2.5 bg-[var(--color-surface)]/80 backdrop-blur-md border-t border-white/[0.05]" >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            <span className="text-xs font-medium text-neutral-400">System Status: Operational</span>
          </div>
          <span className="text-[10px] text-neutral-500 hidden sm:inline">• v2.4.0</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-neutral-500 hidden md:inline">Build: 2026.04.12</span>
          <span className="text-[10px] text-neutral-500">UTC: {new Date().toUTCString().slice(17, 25)}</span>
        </div>
      </div >

      {/* Notification Toast */}
      {
        notification.show && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-slide-in">
            <div className={cn("flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border backdrop-blur-xl", notification.type === "success" ? "bg-green-500/20 border-green-500 text-green-500" : "bg-red-500/20 border-red-500 text-red-500")}>
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
              <span className="text-sm font-bold tracking-wide">{notification.message}</span>
              <button onClick={() => setNotification({ show: false, message: "", type: "error" })} className="ml-4 opacity-50 hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        )
      }
    </div >
  );
}