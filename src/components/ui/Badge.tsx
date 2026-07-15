import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div className={cn("inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2", {
      "bg-primary/10 text-primary border border-primary/20": variant === "default",
      "bg-muted text-muted-foreground border border-transparent": variant === "secondary",
      "border border-border text-foreground": variant === "outline",
    }, className)} {...props} />
  )
}
export { Badge }
