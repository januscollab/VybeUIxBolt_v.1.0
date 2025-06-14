import * as React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "secondary" | "ghost"
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", variant = "default", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-6 w-6", 
      lg: "h-8 w-8",
      xl: "h-12 w-12"
    }
    
    const variantClasses = {
      default: "text-primary",
      secondary: "text-muted-foreground",
      ghost: "text-background"
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        <Loader2 className={cn(
          "animate-spin",
          sizeClasses[size],
          variantClasses[variant]
        )} />
      </div>
    )
  }
)
Spinner.displayName = "Spinner"

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "secondary" | "ghost"
  text?: string
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size = "md", variant = "default", text, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center justify-center gap-2", className)}
        {...props}
      >
        <Spinner size={size} variant={variant} />
        {text && (
          <p className="text-sm text-muted-foreground">{text}</p>
        )}
      </div>
    )
  }
)
LoadingSpinner.displayName = "LoadingSpinner"

export { Spinner, LoadingSpinner }