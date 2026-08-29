import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-catppuccin-mauve text-catppuccin-crust",
        secondary: "border-transparent bg-catppuccin-surface1 text-catppuccin-text",
        destructive: "border-transparent bg-catppuccin-red text-catppuccin-crust",
        outline: "text-catppuccin-text",
        passed: "border-transparent bg-catppuccin-green text-catppuccin-base",
        running: "border-transparent bg-catppuccin-blue text-catppuccin-base",
        failed: "border-transparent bg-catppuccin-red text-catppuccin-base",
        pending: "border-transparent bg-catppuccin-surface2 text-catppuccin-text",
        skipped: "border border-catppuccin-overlay0 bg-transparent text-catppuccin-subtext0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
