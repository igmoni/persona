"use client";

import { type ReactNode, useLayoutEffect, useRef, useState } from "react";

import { motion, useReducedMotion } from "motion/react";

type FlipButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

const FlipButton = ({
  children,
  icon,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
  onClick,
}: FlipButtonProps) => {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [height, setHeight] = useState(44);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(() => setHeight(element.offsetHeight));

    observer.observe(element);
    setHeight(element.offsetHeight);

    return () => observer.disconnect();
  }, []);

  const dark = "border-black bg-black text-white";
  const light = "border-neutral-200 bg-white text-black";

  const front = variant === "primary" ? dark : light;
  const back = variant === "primary" ? light : dark;

  const face =
    "absolute inset-0 flex items-center justify-center gap-2 whitespace-nowrap rounded-full border px-5 py-2.5 font-semibold select-none";

  const content = (
    <>
      {icon}
      {children}
    </>
  );

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      style={{ perspective: 800 }}
      className={`relative inline-flex cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <span
        ref={ref}
        className="flex items-center justify-center gap-2 border border-transparent px-5 py-2.5 font-semibold opacity-0"
      >
        {content}
      </span>

      <motion.span
        variants={{
          rest: { rotateX: 0 },
          hover: { rotateX: 90 },
        }}
        transition={{
          duration: reducedMotion ? 0 : 0.45,
          ease: [0.5, 0, 0.2, 1],
        }}
        style={{
          transformStyle: "preserve-3d",
          z: -height / 2,
        }}
        className="absolute inset-0"
      >
        {/* Front face */}
        <motion.span
          variants={{
            rest: { opacity: 1 },
            hover: { opacity: 0 },
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.135,
            ease: "easeOut",
          }}
          className={`${face} ${front}`}
          style={{
            z: height / 2,
            backfaceVisibility: "hidden",
          }}
        >
          {content}
        </motion.span>

        {/* Back face */}
        <span
          className={`${face} ${back}`}
          style={{
            transform: `rotateX(-90deg) translateZ(${height / 2}px)`,
            backfaceVisibility: "hidden",
          }}
        >
          {content}
        </span>
      </motion.span>
    </motion.button>
  );
};

export { FlipButton };
