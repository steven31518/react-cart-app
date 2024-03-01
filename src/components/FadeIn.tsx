import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};
export default function FadeIn({ children, className }: Props) {

  const lineRef = useRef(null);

  const scroll = useScroll({
    target: lineRef,
    offset: ["end 50%", "start 0%"],
  });

  const variableY = useTransform(scroll.scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div style={{ opacity: variableY }} className={cn("", className)}>
      {children}
    </motion.div>
  );
}
