import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from "react";
import { getUserByEmail } from "@/data/users";

export interface LoginCredentials {
  persona: string | null;
  email: string;
  password?: string;
  rememberMe: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  persona: string;
  avatar?: string;
  department: string;
  permissions: string[];
}

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
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const sampleUser = getUserByEmail(credentials.email);
      
      if (!sampleUser) {
        throw new Error("User not found. Please contact admin.");
      }
      
      const selectedPersona = credentials.persona;
      const userAssignedPersona = sampleUser.persona;
      
      if (selectedPersona && selectedPersona !== userAssignedPersona) {
        throw new Error(`Access denied. Your account is assigned to ${userAssignedPersona.replace('-', ' ')} role. Please select the correct personnel profile.`);
      }
      
      const authUser: AuthUser = {
        id: sampleUser.id,
        email: sampleUser.email,
        name: sampleUser.name,
        role: sampleUser.role,
        persona: sampleUser.persona,
        department: sampleUser.department,
        permissions: sampleUser.permissions,
      };
      
      setUser(authUser);
      setIsAuthenticated(true);
      setIsLoading(false);
      
      if (credentials.rememberMe) {
        localStorage.setItem("auth_token", "mock_auth_token");
        localStorage.setItem("user_data", JSON.stringify(authUser));
      }
      
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      
      return { success: true };
    } catch {
      setIsLoading(false);
      return { success: false, error: "Logout failed" };
    }
  }, []);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("auth_token");
    const savedUser = localStorage.getItem("user_data");
    
    if (!token || !savedUser) {
      setIsLoading(false);
      return { authenticated: false };
    }
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const parsedUser = JSON.parse(savedUser) as AuthUser;
      
      setUser(parsedUser);
      setIsAuthenticated(true);
      setIsLoading(false);
      
      return { authenticated: true, user: parsedUser };
    } catch {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return { authenticated: false };
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        await checkAuth();
      } else {
        setIsLoading(false);
      }
    };
    initAuth();
  }, [checkAuth]);

  const contextValue = useMemo(() => ({
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkAuth,
  }), [user, isAuthenticated, isLoading, error, login, logout, checkAuth]);

  return (
    <AuthContext.Provider value={contextValue}>
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