import { useState, useCallback } from "react";
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

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const login = useCallback(async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // TODO: Keycloak integration
      // const keycloak = new Keycloak('/keycloak.json');
      // await keycloak.init({ onLoad: 'login-required' });
      // await keycloak.login({ username: credentials.email, password: credentials.password });
      
      // Simulate authentication delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Find user by email from sample users (no password verification for demo)
      const sampleUser = getUserByEmail(credentials.email);
      
      if (!sampleUser) {
        throw new Error("User not found. Please contact admin.");
      }
      
      // Validate persona matches user's assigned role
      const selectedPersona = credentials.persona;
      const userAssignedPersona = sampleUser.persona;
      
      if (selectedPersona && selectedPersona !== userAssignedPersona) {
        throw new Error(`Access denied. Your account is assigned to ${userAssignedPersona.replace('-', ' ')} role. Please select the correct personnel profile.`);
      }
      
      const user: AuthUser = {
        id: sampleUser.id,
        email: sampleUser.email,
        name: sampleUser.name,
        role: sampleUser.role,
        persona: sampleUser.persona,
        department: sampleUser.department,
        permissions: sampleUser.permissions,
      };
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      // Store session if rememberMe
      if (credentials.rememberMe) {
        localStorage.setItem("auth_token", "mock_auth_token");
        localStorage.setItem("user_data", JSON.stringify(user));
      }
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const logout = useCallback(async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // TODO: Keycloak logout
      // const keycloak = new Keycloak('/keycloak.json');
      // await keycloak.logout();
      
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Logout failed";
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("auth_token");
    const savedUser = localStorage.getItem("user_data");
    
    if (!token || !savedUser) {
      return { authenticated: false };
    }
    
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // TODO: Validate token with Keycloak
      // const keycloak = new Keycloak('/keycloak.json');
      // const valid = await keycloak.isTokenValid();
      
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const user = JSON.parse(savedUser);
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      return { authenticated: true, user };
    } catch {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      return { authenticated: false };
    }
  }, []);

  return {
    ...authState,
    login,
    logout,
    checkAuth,
  };
}