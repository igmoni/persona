"use client";

import * as React from "react";

import type { VariantProps } from "class-variance-authority";
import { type HTMLMotionProps, motion } from "motion/react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CustomButtonProps = Omit<
  HTMLMotionProps<"button">,
  "children" | "className"
> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
    className?: string;
  };

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ children, variant, size, className, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        disabled={disabled}
        className={cn(
          buttonVariants({ variant, size }),
          "rounded-full border border-transparent bg-black text-white",
          "[perspective:500px]",
          className
        )}
        initial="rest"
        whileHover={disabled ? undefined : "hover"}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        animate={{
          backgroundColor: "#000000",
          color: "#ffffff",
          borderColor: "transparent",
        }}
        variants={{
          rest: {
            backgroundColor: "#000000",
            color: "#ffffff",
            borderColor: "transparent",
          },
          hover: {
            backgroundColor: "#ffffff",
            color: "#000000",
            borderColor: "#e5e5e5",
          },
        }}
        transition={{
          duration: 0.35,
          ease: "easeInOut",
        }}
        {...props}
      >
        <span className="grid items-center justify-items-center [transform-style:preserve-3d]">
          {/* Front face */}
          <motion.span
            className="col-start-1 row-start-1 flex items-center justify-center gap-2 [backface-visibility:hidden]"
            variants={{
              rest: { rotateX: 0 },
              hover: { rotateX: 90 },
            }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {children}
          </motion.span>

          {/* Back face */}
          <motion.span
            aria-hidden="true"
            className="col-start-1 row-start-1 flex items-center justify-center gap-2 [backface-visibility:hidden]"
            variants={{
              rest: { rotateX: -90 },
              hover: { rotateX: 0 },
            }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {children}
          </motion.span>
        </span>
      </motion.button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export { CustomButton };
export type { CustomButtonProps };
