"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const celestialBodies = [
  { name: "moon", symbol: "🌙", color: "#8B5CF6", size: 100 },
  { name: "sun", symbol: "☀️", color: "#F59E0B", size: 120 },
  { name: "mercury", symbol: "☿", color: "#6366F1", size: 80 },
  { name: "venus", symbol: "♀", color: "#EC4899", size: 90 },
  { name: "mars", symbol: "♂", color: "#EF4444", size: 85 },
  { name: "jupiter", symbol: "♃", color: "#F97316", size: 140 },
  { name: "saturn", symbol: "♄", color: "#A855F7", size: 130 },
];

const zodiacSigns = [
  { name: "aries", symbol: "♈", color: "#DC2626", size: 90 },
  { name: "taurus", symbol: "♉", color: "#65A30D", size: 90 },
  { name: "gemini", symbol: "♊", color: "#6366F1", size: 90 },
  { name: "cancer", symbol: "♋", color: "#0EA5E9", size: 90 },
  { name: "leo", symbol: "♌", color: "#F59E0B", size: 90 },
  { name: "virgo", symbol: "♍", color: "#10B981", size: 90 },
  { name: "libra", symbol: "♎", color: "#8B5CF6", size: 90 },
  { name: "scorpio", symbol: "♏", color: "#EF4444", size: 90 },
  { name: "sagittarius", symbol: "♐", color: "#F97316", size: 90 },
  { name: "capricorn", symbol: "♑", color: "#4B5563", size: 90 },
  { name: "aquarius", symbol: "♒", color: "#3B82F6", size: 90 },
  { name: "pisces", symbol: "♓", color: "#EC4899", size: 90 },
];

export default function AstralBackground() {
  const [elements, setElements] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true);
      const allElements = [...celestialBodies, ...zodiacSigns];
      const newElements = [];

      allElements.forEach((element, index) => {
        for (let i = 0; i < 2; i++) {
          const x = ((index * 157 + i * 263) % 100) * (window.innerWidth / 100);
          const y = ((index * 173 + i * 317) % 100) * (window.innerHeight / 100);
          
          newElements.push({
            id: `${element.name}-${i}`,
            ...element,
            x,
            y,
            duration: 20 + (index % 5) * 10,
            delay: (index * 0.2 + i * 0.3) % 2,
            direction: i % 2 === 0 ? 1 : -1
          });
        }
      });

      setElements(newElements);
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 opacity-90" />
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute flex items-center justify-center"
          style={{
            left: element.x,
            top: element.y,
            width: element.size,
            height: element.size,
            filter: 'blur(0.5px)',
          }}
          animate={{
            y: [element.y, element.y - 100, element.y],
            x: [element.x, element.x + (100 * element.direction), element.x],
            rotate: [0, 360 * element.direction],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
        >
          <div 
            className="relative w-full h-full rounded-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle at center, ${element.color}60, transparent 70%)`,
              boxShadow: `0 0 30px ${element.color}40`,
            }}
          >
            <span 
              className="text-5xl transform-gpu"
              style={{ 
                color: element.color,
                textShadow: `0 0 15px ${element.color}`,
                WebkitTextStroke: '1px rgba(255,255,255,0.2)',
              }}
            >
              {element.symbol}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 