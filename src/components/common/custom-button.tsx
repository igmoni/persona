"use client";

import { motion } from "motion/react";

import { Button } from "../ui/button";

type CustomButtonProps = React.ComponentProps<typeof Button>;

const containerVariants = {
  rest: {},
  hover: {
    transition: {
      staggerChildren: 0.035,
    },
  },
};

const letterVariants = {
  rest: {
    rotateX: 0,
    y: "0%",
  },
  hover: {
    rotateX: -90,
    y: "-100%",
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const AnimatedText = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.span variants={containerVariants} className="inline-flex">
      {String(children)
        .split("")
        .map((char, index) => (
          <span
            key={index}
            className="relative inline-block overflow-hidden"
            style={{ perspective: 500 }}
          >
            <motion.span
              variants={letterVariants}
              className="block"
              style={{ transformOrigin: "center center" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </span>
        ))}
    </motion.span>
  );
};

const CustomButton = ({ children, className, ...props }: CustomButtonProps) => {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="inline-flex"
    >
      <Button {...props} className={className}>
        <AnimatedText>{children}</AnimatedText>
      </Button>
    </motion.div>
  );
};

export { CustomButton };
