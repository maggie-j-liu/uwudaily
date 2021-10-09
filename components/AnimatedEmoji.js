import { motion } from "framer-motion";
import { Emoji } from "emoji-mart";
import { useEffect, useState } from "react";

const AnimatedEmoji = ({ emoji }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <>
      <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 1.5,
          times: [0, 0.2, 1],
          delay: Math.random() * 0.5,
        }}
        className="fixed z-20 opacity-0"
        style={{
          top: window.innerHeight * Math.random(),
          left: window.innerWidth * Math.random(),
        }}
      >
        <Emoji emoji={emoji} size={60 + Math.random() * 40} />
      </motion.div>
    </>
  );
};

export default AnimatedEmoji;
