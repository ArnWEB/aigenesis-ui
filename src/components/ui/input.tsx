import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-12 w-full bg-surface-container-lowest border-0 border-b border-outline-variant/30 px-0 py-4 text-sm font-body text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary focus:ring-0 transition-all",
              icon && "pl-10",
              error && "border-error focus:border-error",
              className
            )}
            ref={ref}
            {...props}
            style={{
              backgroundColor: 'var(--color-surface-container-lowest)',
              borderColor: 'rgba(73, 72, 71, 0.3)',
            }}
          />
          <div 
            className={cn(
              "absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-focus-within:w-full transition-all duration-500",
              error && "bg-error"
            )} 
          />
        </div>
        {error && (
          <p className="text-xs text-error ml-1">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }