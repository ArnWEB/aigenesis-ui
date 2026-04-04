import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { useAuth, type AuthUser, type LoginCredentials } from "@/hooks/useAuth";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
  checkAuth: () => Promise<{ authenticated: boolean; user?: AuthUser }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);
  const authRef = useRef(auth);
  
  // Keep ref updated with latest auth
  useEffect(() => {
    authRef.current = auth;
  }, [auth]);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        await authRef.current.checkAuth();
      }
      setIsInitialized(true);
    };
    initAuth();
  }, []);

  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}