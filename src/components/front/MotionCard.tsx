import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  titleImg: string;
  coverImg: string;
  characterImg: string;
  text?: string;
};
export default function MotionCard({
  className,
  titleImg,
  coverImg,
  characterImg,
  text,
}: Props) {
  const parentVariants = {
    init: {
      x: 0,
    },
    hover: {
      x: 10,
    },
  };
  const wrapperVariants = {
    init: {
      opacity: 1,
    },
    hover: {
      rotateX: 25,
      y: -5,
      z: 0,
      filter: "brightness(0.8)",
      boxShadow: "2px 35px 32px -8px rgba(0, 0, 0, 0.75)",
      transition: {
        duration: 0.5,
      },
    },
  };
  const titleVariants = {
    init: {
      y: 0,
    },
    hover: {
      rotateX: 0,
      y: -50,
      z: 100,
      transition: {
        duration: 0.5,
      },
    },
  };
  const textVariants = {
    init: {
      opacity: 1,
    },
    hover: {
      opacity: 0,
      rotateX: 0,

      transition: {
        duration: 0.5,
      },
    },
  };
  const characterVariants = {
    init: {
      opacity: 0,
    },
    hover: {
      opacity: 1,
      rotateX: 0,
      y: -30,
      z: 100,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className={cn(
        "card flex justify-center items-end relative py-0 px-[36px] my-0  w-[200px] h-[200px] cursor-pointer",
        className
      )}
      style={{ perspective: "1000px" }}
      variants={parentVariants}
      initial="init"
      whileHover="hover"
      whileTap={{ scale: 1.1 }}
    >
      <motion.div className="wrapper absolute -z-10" variants={wrapperVariants}>
        <img src={coverImg} className="cover-image" alt="cover-image" />
      </motion.div>
      <motion.div className="title w-full" variants={titleVariants}>
        <img src={titleImg} className="title" />
      </motion.div>
      <motion.div
        className="character w-full opacity-0 absolute -z-10"
        variants={characterVariants}
      >
        <img src={characterImg} className="character" />
      </motion.div>
      <motion.div
        className="text w-full absolute top-20 -translate-y-20"
        variants={textVariants}
      >
        <span className="text-lg font-semibold">{text}</span>
      </motion.div>
    </motion.div>
  );
}
