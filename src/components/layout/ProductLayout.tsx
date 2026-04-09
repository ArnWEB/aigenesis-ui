import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { getProductFromPath, PRODUCT_ROUTES } from "@/config/products";

const ROLE_MAP: Record<string, string> = {
  admin: "ADMINISTRATOR",
  executive: "EXECUTIVE",
  underwriter: "UNDERWRITER",
  adjudicator: "ADJUDICATOR",
  "customer-service": "CUSTOMER SERVICE",
  customer_service: "CUSTOMER SERVICE",
  operations: "OPERATIONS",
  agent: "FIELD AGENT",
  customer: "CUSTOMER",
};

interface ProductLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function ProductLayout({ children, className }: ProductLayoutProps) {
  const { user } = useAuthContext();
  const location = useLocation();

  const currentProduct = getProductFromPath(location.pathname) || "orchestrate";
  const productConfig = PRODUCT_ROUTES[currentProduct];

  const headerText = useMemo(() => {
    const role = ROLE_MAP[user?.persona || ""] || "USER";
    const storedAdmin = localStorage.getItem("admin_user");
    const isAdmin = storedAdmin ? JSON.parse(storedAdmin) : null;
    return {
      brand: "AIGENESIS",
      product: productConfig?.name || "DASHBOARD",
      role: isAdmin ? "ADMINISTRATOR" : role,
    };
  }, [productConfig?.name, user?.persona]);

  return (
    <div className={`space-y-6 ${className || ""}`}>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-primary font-medium">{headerText.brand}</span>
        <span className="text-on-surface-variant">|</span>
        <span className="text-primary font-bold">{headerText.product}</span>
        <span className="text-on-surface-variant">|</span>
        <span className="text-secondary">{headerText.role}</span>
      </div>
      {children}
    </div>
  );
}