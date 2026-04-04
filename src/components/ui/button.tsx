import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-on-primary hover:brightness-110 shadow-lg",
        gradient: "bg-gradient-to-r from-primary-dim to-secondary text-on-primary font-headline font-bold tracking-widest uppercase shadow-[0_8px_24px_-8px_rgba(93,95,239,0.5)] hover:shadow-[0_12px_32px_-8px_rgba(221,139,251,0.6)]",
        destructive: "bg-error text-on-error hover:bg-error/90",
        outline: "border border-outline-variant bg-transparent hover:bg-surface-bright hover:border-primary/50 text-on-surface",
        secondary: "bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80",
        ghost: "hover:bg-surface-variant hover:text-on-surface",
        link: "text-primary underline-offset-4 hover:underline",
        surface: "bg-surface-container hover:bg-surface-bright text-on-surface border border-outline-variant/20",
        glass: "glass-panel hover:border-primary/30 text-on-surface",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-8",
        xl: "h-12 px-8 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }