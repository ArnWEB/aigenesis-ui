import { cn } from "@/lib/utils";

interface PersonaTileProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function PersonaTile({
  icon,
  title,
  subtitle,
  isActive = false,
  onClick,
  className,
}: PersonaTileProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "glass-panel p-5 rounded-xl flex flex-col items-start gap-4 transition-all duration-300 glow-hover group",
        isActive && "persona-active",
        className
      )}
    >
      <span className={cn(
        "text-xl transition-colors",
        isActive ? "text-primary" : "text-on-surface-variant group-hover:text-secondary"
      )}>
        {icon}
      </span>
      <div className="text-left">
        <span className="block text-sm font-headline font-medium text-on-surface">
          {title}
        </span>
        <span className="text-[10px] text-on-surface-variant font-label uppercase tracking-wider">
          {subtitle}
        </span>
      </div>
    </button>
  );
}