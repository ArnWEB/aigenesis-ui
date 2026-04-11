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
    primary: "#e86e24",
    "primary-dim": "#c55d1e",
    "primary-fixed": "#ffb68c",
    "primary-fixed-dim": "#ff8d4d",
    "on-primary": "#ffffff",
    "on-primary-fixed": "#451d00",
    "on-primary-container": "#451d00",
    "primary-container": "#ffdbcc",
    "on-primary-fixed-variant": "#733000",
    
    secondary: "#4a4a4a",
    "secondary-dim": "#333333",
    "secondary-fixed": "#666666",
    "secondary-fixed-dim": "#555555",
    "on-secondary": "#ffffff",
    "on-secondary-fixed": "#ffffff",
    "on-secondary-container": "#e0e0e0",
    "secondary-container": "#2a2a2a",
    "on-secondary-fixed-variant": "#cccccc",
    
    tertiary: "#5c5c5c",
    "tertiary-dim": "#3d3d3d",
    "tertiary-fixed": "#888888",
    "tertiary-fixed-dim": "#777777",
    "on-tertiary": "#ffffff",
    "on-tertiary-fixed": "#ffffff",
    "on-tertiary-container": "#e0e0e0",
    "tertiary-container": "#333333",
    "on-tertiary-fixed-variant": "#bbbbbb",
    
    error: "#ff6e84",
    "error-dim": "#d73357",
    "error-container": "#a70138",
    "on-error": "#490013",
    "on-error-container": "#ffb2b9",
    
    background: "#000000",
    "on-background": "#ffffff",
    surface: "#000000",
    "surface-dim": "#0a0a0a",
    "surface-container": "#111111",
    "surface-container-low": "#050505",
    "surface-container-lowest": "#000000",
    "surface-container-high": "#1a1a1a",
    "surface-container-highest": "#222222",
    "surface-bright": "#2c2c2c",
    "surface-variant": "#333333",
    "surface-tint": "#e86e24",
    "on-surface": "#ffffff",
    "on-surface-variant": "#a3a3a3",
    
    outline: "#5c5c5c",
    "outline-variant": "#3d3d3d",
    "inverse-surface": "#e6e6e6",
    "inverse-on-surface": "#1a1a1a",
    "inverse-primary": "#ffb68c",
  },
fonts: {
    headline: "Tinos, serif",
    body: "Tinos, serif",
    label: "Tinos, serif",
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
    primary: "#e86e24",
    "primary-dim": "#c55d1e",
    "primary-fixed": "#ffb68c",
    "primary-fixed-dim": "#ff8d4d",
    "on-primary": "#ffffff",
    "on-primary-fixed": "#451d00",
    "on-primary-container": "#451d00",
    "primary-container": "#ffdbcc",
    "on-primary-fixed-variant": "#733000",
    
    secondary: "#707070",
    "secondary-dim": "#5c5c5c",
    "secondary-fixed": "#8c8c8c",
    "secondary-fixed-dim": "#787878",
    "on-secondary": "#ffffff",
    "on-secondary-fixed": "#1a1a1a",
    "on-secondary-container": "#1a1a1a",
    "secondary-container": "#e0e0e0",
    "on-secondary-fixed-variant": "#1a1a1a",
    
    tertiary: "#7c7c7c",
    "tertiary-dim": "#666666",
    "tertiary-fixed": "#a0a0a0",
    "tertiary-fixed-dim": "#8c8c8c",
    "on-tertiary": "#ffffff",
    "on-tertiary-fixed": "#1a1a1a",
    "on-tertiary-container": "#1a1a1a",
    "tertiary-container": "#e0e0e0",
    "on-tertiary-fixed-variant": "#1a1a1a",
    
    error: "#ba1a1a",
    "error-dim": "#8c0014",
    "error-container": "#ffd9dc",
    "on-error": "#ffffff",
    "on-error-container": "#410002",
    
    background: "#f5f5f5",
    "on-background": "#1a1a1a",
    surface: "#f5f5f5",
    "surface-dim": "#dedede",
    "surface-container": "#f0f0f0",
    "surface-container-low": "#fafafa",
    "surface-container-lowest": "#ffffff",
    "surface-container-high": "#eaebeb",
    "surface-container-highest": "#dedede",
    "surface-bright": "#c8c8c8",
    "surface-variant": "#e0e0e0",
    "surface-tint": "#e86e24",
    "on-surface": "#1a1a1a",
    "on-surface-variant": "#5c5c5c",
    
    outline: "#8c8c8c",
    "outline-variant": "#c4c4c4",
    "inverse-surface": "#f5f5f5",
    "inverse-on-surface": "#1a1a1a",
    "inverse-primary": "#ffb68c",
  },
fonts: { headline: "Tinos, serif", body: "Tinos, serif", label: "Tinos, serif" },
  borderRadius: { default: "0.125rem", lg: "0.25rem", xl: "0.5rem", full: "0.75rem" }
};

export const greenTheme: Theme = {
  name: "green",
  colors: {
    primary: "#4ade80",
    "primary-dim": "#22c55e",
    "primary-fixed": "#86efac",
    "primary-fixed-dim": "#4ade80",
    "on-primary": "#053321",
    "on-primary-fixed": "#053321",
    "on-primary-container": "#064432",
    "primary-container": "#0f5038",
    "on-primary-fixed-variant": "#065c42",
    
    secondary: "#5c8c74",
    "secondary-dim": "#466058",
    "secondary-fixed": "#96c9ad",
    "secondary-fixed-dim": "#6e9c84",
    "on-secondary": "#10352a",
    "on-secondary-fixed": "#0f3325",
    "on-secondary-container": "#0f3325",
    "secondary-container": "#264838",
    "on-secondary-fixed-variant": "#264838",
    
    tertiary: "#5c8c74",
    "tertiary-dim": "#466058",
    "tertiary-fixed": "#96c9ad",
    "tertiary-fixed-dim": "#6e9c84",
    "on-tertiary": "#10352a",
    "on-tertiary-fixed": "#0f3325",
    "on-tertiary-container": "#0f3325",
    "tertiary-container": "#264838",
    "on-tertiary-fixed-variant": "#264838",
    
    error: "#ff6e84",
    "error-dim": "#d73357",
    "error-container": "#a70138",
    "on-error": "#490013",
    "on-error-container": "#ffb2b9",
    
    background: "#021a10",
    "on-background": "#6ddba9",
    surface: "#031a14",
    "surface-dim": "#021a0e",
    "surface-container": "#062620",
    "surface-container-low": "#021a14",
    "surface-container-lowest": "#010f0a",
    "surface-container-high": "#0a3028",
    "surface-container-highest": "#104035",
    "surface-bright": "#144033",
    "surface-variant": "#264838",
    "surface-tint": "#4ade80",
    "on-surface": "#6ddba9",
    "on-surface-variant": "#5c8c74",
    
    outline: "#1a4d3a",
    "outline-variant": "#0f3325",
    "inverse-surface": "#6ddba9",
    "inverse-on-surface": "#031a14",
    "inverse-primary": "#086030",
  },
fonts: { headline: "Tinos, serif", body: "Tinos, serif", label: "Tinos, serif" },
  borderRadius: { default: "0.125rem", lg: "0.25rem", xl: "0.5rem", full: "0.75rem" }
};

export const themes = {
  dark: darkTheme,
  light: lightTheme,
  green: greenTheme,
};

export type ThemeName = keyof typeof themes;