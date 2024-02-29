import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  children: React.ReactNode;
};
export default function FadeIn({ children }: Props) {
  const lineRef = useRef(null);

  const scroll = useScroll({
    target: lineRef,
    offset: ["start 80%", "start 20%"],
  });

  const variableY = useTransform(scroll.scrollYProgress, [0, 1], [0, 1]);

  
  return <motion.div style={{ opacity: variableY }}>{children}</motion.div>;
}
