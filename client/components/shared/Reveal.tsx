import { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  }),
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}
