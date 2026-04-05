import { useState, useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/context/AuthContext";
import { PERSONA_LABELS } from "@/data/users";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { PRODUCT_CONFIG, ROLE_MAP, getProductFromPath, Icons } from "@/config/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: LayoutProps) {
  const { user, logout } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const storedAdmin = localStorage.getItem("admin_user");
  const storedAdminUser = storedAdmin ? JSON.parse(storedAdmin) : null;
  const effectiveUser = storedAdminUser || user;
  const currentProduct = getProductFromPath(location.pathname);
  
  const config = PRODUCT_CONFIG[currentProduct] || PRODUCT_CONFIG.orchestrite;
  const sidebarItems = config.items;
  const productName = config.name;

  const headerText = useMemo(() => {
    const role = ROLE_MAP[user?.persona || ""] || "USER";
    return { brand: "AIGENESIS", product: productName, role: storedAdminUser ? "ADMINISTRATOR" : role };
  }, [productName, user?.persona, storedAdminUser]);

  const handleLogout = useCallback(async () => {
    if (storedAdminUser) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
    }
    await logout();
    navigate("/login");
  }, [logout, navigate, storedAdminUser]);

  const shouldShowLayout = storedAdminUser || user;
  if (!shouldShowLayout) return <>{children}</>;

  const sidebarWidth = isSidebarCollapsed ? "lg:w-20" : "lg:w-64";

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/15 z-30 flex items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-4 lg:gap-12">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 rounded-lg hover:bg-surface-variant/50">
            {isMobileMenuOpen ? Icons.close : Icons.menu}
          </button>

          <Link to={storedAdminUser ? "/admin" : `/${currentProduct}`} className="flex items-center gap-2">
            <img src="/aigenesis.jpeg" alt="Aigenesis" className="h-10 w-auto" />
            <span className="text-xl lg:text-2xl font-headline font-bold text-primary tracking-tight hidden sm:block">
              <span className="text-primary">{headerText.brand}</span>
              <span className="text-on-surface-variant"> | </span>
              <span className={headerText.product === "ADMIN" ? "text-on-surface-variant" : "text-primary"}>{headerText.product}</span>
              {headerText.role && (
                <>
                  <span className="text-on-surface-variant"> | </span>
                  <span className="text-secondary">{headerText.role}</span>
                </>
              )}
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:gap-6">
          <div className="relative hidden md:block">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              {Icons.search}
            </div>
            <input type="text" placeholder="Search..." className="w-64 bg-surface-container-lowest border-none ring-1 ring-outline-variant/30 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-primary/50" />
          </div>

          <button className="p-2 rounded-full hover:bg-surface-bright transition-all relative">
            {Icons.notification}
            <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full" />
          </button>

          <ThemeSwitcher />

          {effectiveUser && (
            <div className="flex items-center gap-3 pl-3 border-l border-outline-variant/20">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-on-surface leading-none">{effectiveUser.name}</p>
                <p className="text-xs text-on-surface-variant mt-1">{storedAdminUser ? "Administrator" : PERSONA_LABELS[effectiveUser.persona as keyof typeof PERSONA_LABELS]?.title || effectiveUser.persona}</p>
              </div>
              <div className="relative group">
                <button className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-dim flex items-center justify-center text-on-primary font-semibold hover:scale-105 transition-transform">
                  {effectiveUser.name.split(" ").map((n: string) => n[0]).join("")}
                </button>
                <div className="absolute right-0 top-full mt-2 w-56 bg-surface-container-high border border-outline-variant/20 rounded-xl shadow-2xl opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4 border-b border-outline-variant/10">
                    <p className="text-sm font-semibold text-on-surface">{effectiveUser.name}</p>
                    <p className="text-xs text-on-surface-variant truncate">{effectiveUser.email}</p>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-on-surface-variant">Role</span>
                      <span className="font-medium text-on-surface capitalize">{storedAdminUser ? "Administrator" : effectiveUser.role.replace('_', ' ')}</span>
                    </div>
                  </div>
                  <div className="p-2 border-t border-outline-variant/10">
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-error hover:bg-error/10 rounded-lg transition-colors">
                      {Icons.logout}
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-10 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />}

      <aside className={cn(
        "fixed left-0 top-16 bottom-0 bg-surface-container border-r border-outline-variant/15 z-20 flex flex-col py-8 transition-all duration-300",
        sidebarWidth,
        isSidebarCollapsed ? "-translate-x-full lg:translate-x-0" : "translate-x-0",
        isMobileMenuOpen && "translate-x-0 w-64"
      )}>
        <button
          onClick={() => window.innerWidth < 1024 ? setIsMobileMenuOpen(false) : setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all duration-200 z-10"
        >
          <span className={cn("transition-transform duration-200", isSidebarCollapsed && "rotate-180")}>
            {Icons.chevron}
          </span>
        </button>

        <nav className={cn("flex flex-col gap-2", isSidebarCollapsed && !isMobileMenuOpen ? "items-center w-full" : "items-start w-full px-4")}>
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "relative flex items-center gap-3 py-3 w-full transition-all duration-300 rounded-lg",
                  isActive ? "text-primary bg-surface-container-high/50" : "text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30",
                  isSidebarCollapsed && !isMobileMenuOpen && "justify-center px-0"
                )}
              >
                <div className="relative flex-shrink-0">{item.icon}</div>
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-[8px] font-bold text-on-error rounded-full flex items-center justify-center">{item.badge}</span>
                )}
                {(isMobileMenuOpen || !isSidebarCollapsed) && <span className="font-label text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className={cn("mt-auto flex flex-col gap-6 pb-4", isSidebarCollapsed && !isMobileMenuOpen ? "items-center" : "items-start px-4 w-full")}>
          <button
            onClick={handleLogout}
            className={cn("flex items-center gap-3 py-3 w-full text-on-surface-variant hover:text-error hover:bg-error/10 transition-all duration-300 rounded-lg", isSidebarCollapsed && !isMobileMenuOpen && "justify-center px-0")}
          >
            {Icons.logout}
            {(isMobileMenuOpen || !isSidebarCollapsed) && <span className="font-label text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      <main className={cn("pt-16 min-h-screen transition-all duration-300 lg:pl-20 pl-0", !isSidebarCollapsed && "lg:pl-64", isMobileMenuOpen && "lg:pl-0 pl-0")}>
        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
}