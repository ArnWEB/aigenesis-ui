import { Moon, Sun, Leaf } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

interface ThemeOption {
  id: "dark" | "light" | "green";
  name: string;
  icon: React.ReactNode;
  colors: string[];
}

const themeOptions: ThemeOption[] = [
  {
    id: "dark",
    name: "Dark",
    icon: <Moon className="w-4 h-4" />,
    colors: ["#0e0e0e", "#a4a6ff", "#dd8bfb"],
  },
  {
    id: "light",
    name: "Light",
    icon: <Sun className="w-4 h-4" />,
    colors: ["#FAFAFA", "#5D5FEF", "#9B59B6"],
  },
  {
    id: "green",
    name: "Green",
    icon: <Leaf className="w-4 h-4" />,
    colors: ["#0F172A", "#10B981", "#06B6D4"],
  },
];

export function ThemeSwitcher() {
  const { themeName, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 p-1.5 bg-surface-container rounded-full border border-outline-variant/20 shadow-lg">
      {themeOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => setTheme(option.id)}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-200",
            themeName === option.id
              ? "bg-primary/20 text-primary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50"
          )}
          title={option.name}
        >
          {option.icon}
          <div className="flex gap-0.5">
            {option.colors.map((color, idx) => (
              <div
                key={idx}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}