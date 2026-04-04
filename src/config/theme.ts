export interface ThemeColors {
  primary: string;
  "primary-dim": string;
  "primary-fixed": string;
  "primary-fixed-dim": string;
  "on-primary": string;
  "on-primary-fixed": string;
  "on-primary-container": string;
  "primary-container": string;
  "on-primary-fixed-variant": string;
  
  secondary: string;
  "secondary-dim": string;
  "secondary-fixed": string;
  "secondary-fixed-dim": string;
  "on-secondary": string;
  "on-secondary-fixed": string;
  "on-secondary-container": string;
  "secondary-container": string;
  "on-secondary-fixed-variant": string;
  
  tertiary: string;
  "tertiary-dim": string;
  "tertiary-fixed": string;
  "tertiary-fixed-dim": string;
  "on-tertiary": string;
  "on-tertiary-fixed": string;
  "on-tertiary-container": string;
  "tertiary-container": string;
  "on-tertiary-fixed-variant": string;
  
  error: string;
  "error-dim": string;
  "error-container": string;
  "on-error": string;
  "on-error-container": string;
  
  background: string;
  "on-background": string;
  surface: string;
  "surface-dim": string;
  "surface-container": string;
  "surface-container-low": string;
  "surface-container-lowest": string;
  "surface-container-high": string;
  "surface-container-highest": string;
  "surface-bright": string;
  "surface-variant": string;
  "surface-tint": string;
  "on-surface": string;
  "on-surface-variant": string;
  
  outline: string;
  "outline-variant": string;
  "inverse-surface": string;
  "inverse-on-surface": string;
  "inverse-primary": string;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
  fonts: {
    headline: string;
    body: string;
    label: string;
  };
  borderRadius: {
    default: string;
    lg: string;
    xl: string;
    full: string;
  };
}

export const darkTheme: Theme = {
  name: "dark",
  colors: {
    "primary-fixed": "#9396ff",
    "error-container": "#a70138",
    "secondary-fixed": "#f2c1ff",
    "primary-dim": "#6062f2",
    "surface-container-lowest": "#000000",
    "on-secondary": "#4c0068",
    "on-surface": "#ffffff",
    "on-secondary-container": "#f1bfff",
    "tertiary-fixed-dim": "#00e2ed",
    "outline-variant": "#494847",
    "tertiary-dim": "#00e2ed",
    "surface-tint": "#a4a6ff",
    "on-tertiary-container": "#00565a",
    "tertiary-fixed": "#00f1fd",
    "primary-fixed-dim": "#8486ff",
    "error-dim": "#d73357",
    "on-surface-variant": "#adaaaa",
    "surface-container": "#1a1919",
    "surface": "#0e0e0e",
    "on-error": "#490013",
    "on-primary-fixed": "#000000",
    "surface-dim": "#0e0e0e",
    "primary": "#a4a6ff",
    "on-background": "#ffffff",
    "secondary-container": "#6e208c",
    "on-tertiary": "#005f64",
    "on-error-container": "#ffb2b9",
    "on-primary-container": "#0b0081",
    "surface-bright": "#2c2c2c",
    "inverse-surface": "#fcf8f8",
    "on-primary": "#1100a3",
    "surface-container-low": "#131313",
    "tertiary-container": "#00f1fd",
    "error": "#ff6e84",
    "inverse-primary": "#494adb",
    "primary-container": "#9396ff",
    "secondary-dim": "#ce7eec",
    "surface-container-high": "#201f1f",
    "surface-container-highest": "#262626",
    "on-tertiary-fixed-variant": "#006065",
    "outline": "#777575",
    "inverse-on-surface": "#565554",
    "on-secondary-fixed-variant": "#792c97",
    "tertiary": "#96f8ff",
    "surface-variant": "#262626",
    "on-secondary-fixed": "#580078",
    "on-tertiary-fixed": "#004145",
    "on-primary-fixed-variant": "#0f009c",
    "secondary-fixed-dim": "#ebadff",
    "secondary": "#dd8bfb",
    background: "#0e0e0e",
  },
  fonts: {
    headline: "Space Grotesk",
    body: "Inter",
    label: "Inter",
  },
  borderRadius: {
    default: "0.125rem",
    lg: "0.25rem",
    xl: "0.5rem",
    full: "0.75rem",
  },
};

export const lightTheme: Theme = {
  name: "light",
  colors: {
    primary: "#5D5FEF",
    "primary-dim": "#7A7CF2",
    "primary-fixed": "#5D5FEF",
    "primary-fixed-dim": "#7A7CF2",
    "on-primary": "#ffffff",
    "on-primary-fixed": "#ffffff",
    "on-primary-container": "#E8E7FF",
    "primary-container": "#E8E7FF",
    "on-primary-fixed-variant": "#FFFFFF",
    
    secondary: "#9B59B6",
    "secondary-dim": "#B07CC6",
    "secondary-fixed": "#9B59B6",
    "secondary-fixed-dim": "#B07CC6",
    "on-secondary": "#ffffff",
    "on-secondary-fixed": "#ffffff",
    "on-secondary-container": "#F5E6FA",
    "secondary-container": "#F5E6FA",
    "on-secondary-fixed-variant": "#FFFFFF",
    
    tertiary: "#00B894",
    "tertiary-dim": "#2DD4BF",
    "tertiary-fixed": "#00B894",
    "tertiary-fixed-dim": "#2DD4BF",
    "on-tertiary": "#ffffff",
    "on-tertiary-fixed": "#ffffff",
    "on-tertiary-container": "#E6FAF7",
    "tertiary-container": "#E6FAF7",
    "on-tertiary-fixed-variant": "#FFFFFF",
    
    error: "#E74C3C",
    "error-dim": "#EC7063",
    "error-container": "#FDEDEC",
    "on-error": "#ffffff",
    "on-error-container": "#E74C3C",
    
    background: "#FAFAFA",
    "on-background": "#1A1A1A",
    surface: "#FFFFFF",
    "surface-dim": "#F5F5F5",
    "surface-container": "#FFFFFF",
    "surface-container-low": "#F8F8F8",
    "surface-container-lowest": "#FFFFFF",
    "surface-container-high": "#F0F0F0",
    "surface-container-highest": "#EBEBEB",
    "surface-bright": "#FFFFFF",
    "surface-variant": "#E8E8E8",
    "surface-tint": "#5D5FEF",
    "on-surface": "#1A1A1A",
    "on-surface-variant": "#666666",
    
    outline: "#CCCCCC",
    "outline-variant": "#E0E0E0",
    "inverse-surface": "#1A1A1A",
    "inverse-on-surface": "#FFFFFF",
    "inverse-primary": "#5D5FEF",
  },
  fonts: {
    headline: "Space Grotesk",
    body: "Inter",
    label: "Inter",
  },
  borderRadius: {
    default: "0.125rem",
    lg: "0.25rem",
    xl: "0.5rem",
    full: "0.75rem",
  },
};

export const greenTheme: Theme = {
  name: "green",
  colors: {
    primary: "#10B981",
    "primary-dim": "#34D399",
    "primary-fixed": "#10B981",
    "primary-fixed-dim": "#34D399",
    "on-primary": "#ffffff",
    "on-primary-fixed": "#ffffff",
    "on-primary-container": "#D1FAE5",
    "primary-container": "#D1FAE5",
    "on-primary-fixed-variant": "#FFFFFF",
    
    secondary: "#059669",
    "secondary-dim": "#10B981",
    "secondary-fixed": "#059669",
    "secondary-fixed-dim": "#10B981",
    "on-secondary": "#ffffff",
    "on-secondary-fixed": "#ffffff",
    "on-secondary-container": "#D1FAE5",
    "secondary-container": "#D1FAE5",
    "on-secondary-fixed-variant": "#FFFFFF",
    
    tertiary: "#06B6D4",
    "tertiary-dim": "#22D3EE",
    "tertiary-fixed": "#06B6D4",
    "tertiary-fixed-dim": "#22D3EE",
    "on-tertiary": "#ffffff",
    "on-tertiary-fixed": "#ffffff",
    "on-tertiary-container": "#CFFAFE",
    "tertiary-container": "#CFFAFE",
    "on-tertiary-fixed-variant": "#FFFFFF",
    
    error: "#EF4444",
    "error-dim": "#F87171",
    "error-container": "#FEE2E2",
    "on-error": "#ffffff",
    "on-error-container": "#EF4444",
    
    background: "#0F172A",
    "on-background": "#F8FAFC",
    surface: "#1E293B",
    "surface-dim": "#334155",
    "surface-container": "#1E293B",
    "surface-container-low": "#1E293B",
    "surface-container-lowest": "#0F172A",
    "surface-container-high": "#334155",
    "surface-container-highest": "#475569",
    "surface-bright": "#334155",
    "surface-variant": "#475569",
    "surface-tint": "#10B981",
    "on-surface": "#F8FAFC",
    "on-surface-variant": "#94A3B8",
    
    outline: "#475569",
    "outline-variant": "#334155",
    "inverse-surface": "#F8FAFC",
    "inverse-on-surface": "#1E293B",
    "inverse-primary": "#10B981",
  },
  fonts: {
    headline: "Space Grotesk",
    body: "Inter",
    label: "Inter",
  },
  borderRadius: {
    default: "0.125rem",
    lg: "0.25rem",
    xl: "0.5rem",
    full: "0.75rem",
  },
};

export const themes = {
  dark: darkTheme,
  light: lightTheme,
  green: greenTheme,
};

export type ThemeName = keyof typeof themes;