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
  ...darkTheme,
  name: "light",
  colors: {
    ...darkTheme.colors,
    background: "#121212",
    surface: "#1a1a1a",
  }
};

export const greenTheme: Theme = {
  ...darkTheme,
  name: "green",
  colors: {
    ...darkTheme.colors,
    background: "#050505",
    surface: "#0a0a0a",
  }
};

export const themes = {
  dark: darkTheme,
  light: lightTheme,
  green: greenTheme,
};

export type ThemeName = keyof typeof themes;