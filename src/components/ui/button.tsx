import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-smooth",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow-cyan rounded-xl",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl",
        outline: "border border-primary/20 bg-transparent text-primary hover:bg-primary/10 hover:shadow-glow-cyan rounded-xl",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-glow-orange rounded-xl",
        ghost: "hover:bg-primary/10 hover:text-primary rounded-xl",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-primary text-primary-foreground hover:scale-105 hover:shadow-glow-cyan rounded-xl font-semibold",
        glass: "glass text-foreground hover:glass-strong hover:scale-105 rounded-xl",
        emergency: "bg-gradient-secondary text-secondary-foreground hover:scale-105 hover:shadow-glow-orange rounded-xl font-semibold animate-glow-pulse",
        futuristic: "bg-gradient-to-r from-neon-cyan to-primary text-primary-foreground hover:from-neon-cyan-glow hover:to-primary-glow hover:scale-105 rounded-xl border border-primary/30",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 px-4 py-2",
        lg: "h-14 px-8 py-4 text-base",
        xl: "h-16 px-12 py-6 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
