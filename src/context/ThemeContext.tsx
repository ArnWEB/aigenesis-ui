import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  type Theme,
  type ThemeName,
  themes,
} from "@/config/theme";

interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
  colors: Theme["colors"];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>("dark");

  const theme = themes[themeName];

  const setTheme = (name: ThemeName) => {
    setThemeName(name);
    localStorage.setItem("theme", name);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeName | null;
    if (savedTheme && themes[savedTheme]) {
      setThemeName(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssKey = `--color-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      root.style.setProperty(cssKey, value);
    });

    root.style.setProperty("--font-headline", theme.fonts.headline);
    root.style.setProperty("--font-body", theme.fonts.body);
    root.style.setProperty("--font-label", theme.fonts.label);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeName,
        setTheme,
        colors: theme.colors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}