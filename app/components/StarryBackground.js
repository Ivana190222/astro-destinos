"use client";

import { motion } from "framer-motion";

const StarryBackground = () => {
  const stars = Array.from({ length: 100 }).map((_, i) => {
    const size = Math.random() * 2 + 1;
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 5;
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    return (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          width: size,
          height: size,
          left: `${x}%`,
          top: `${y}%`,
          opacity: 0.6,
        }}
        animate={{
          opacity: [0.6, 0.2, 0.6],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
  });

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 overflow-hidden -z-10">
      {stars}
    </div>
  );
};

export default StarryBackground; 