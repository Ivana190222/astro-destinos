"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function TarotCard({ 
  card, 
  isReversed = false, 
  width = 120, 
  height = 180, 
  onClick = null,
  showName = true,
  isRevealed = false
}) {
  const [error, setError] = useState(false);
  const aspectRatio = height / width;
  
  // Mapa de colores para cada arcano mayor
  const cardColors = {
    "El Loco": "#FFD60A",
    "El Mago": "#C81D25",
    "La Sacerdotisa": "#7209B7",
    "La Emperatriz": "#AACC00",
    "El Emperador": "#DC2F02",
    "El Hierofante": "#6A4C93",
    "Los Enamorados": "#FF5C8A",
    "El Carro": "#0077B6",
    "La Fuerza": "#FB8500",
    "El Ermitaño": "#2E294E",
    "La Rueda de la Fortuna": "#E9C46A",
    "La Justicia": "#94D2BD",
    "El Colgado": "#06D6A0",
    "La Muerte": "#001219",
    "La Templanza": "#8338EC",
    "El Diablo": "#D00000",
    "La Torre": "#BF0603",
    "La Estrella": "#48CAE4",
    "La Luna": "#3F37C9",
    "El Sol": "#F9C80E",
    "El Juicio": "#F72585",
    "El Mundo": "#4CC9F0",
  };
  
  // Símbolos para cada carta
  const cardSymbols = {
    "El Loco": "👣",
    "El Mago": "✨",
    "La Sacerdotisa": "🔮",
    "La Emperatriz": "👑",
    "El Emperador": "⚔️",
    "El Hierofante": "🔱",
    "Los Enamorados": "❤️",
    "El Carro": "🏹",
    "La Fuerza": "🦁",
    "El Ermitaño": "🔦",
    "La Rueda de la Fortuna": "🎡",
    "La Justicia": "⚖️",
    "El Colgado": "🙃",
    "La Muerte": "💀",
    "La Templanza": "🕊️",
    "El Diablo": "😈",
    "La Torre": "🌩️",
    "La Estrella": "⭐",
    "La Luna": "🌙",
    "El Sol": "☀️",
    "El Juicio": "📯",
    "El Mundo": "🌍",
  };
  
  const bgColor = cardColors[card.name] || "#9D4EDD";
  const symbol = cardSymbols[card.name] || "★";
  
  // Si la carta no está revelada, mostrar el reverso
  if (!isRevealed) {
    return (
      <motion.div 
        className="rounded-lg border-2 border-purple-500/50 cursor-pointer transform transition-transform duration-300 hover:scale-105 overflow-hidden"
        style={{ 
          width, 
          height, 
          background: "linear-gradient(135deg, #3F0071, #150050)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
      >
        <div className="h-full w-full flex items-center justify-center relative">
          {/* Patrón decorativo para el reverso */}
          <div className="absolute inset-4 border-2 border-purple-400/30 rounded-lg"></div>
          <div className="text-purple-300/50 text-4xl">✧</div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"></div>
        </div>
      </motion.div>
    );
  }
  
  // Si hay un error cargando la imagen o no hay imagen
  if (error) {
    return (
      <motion.div
        className="rounded-lg border-2 border-purple-500/50 flex flex-col items-center justify-center overflow-hidden"
        style={{ 
          width, 
          height, 
          backgroundColor: bgColor,
          transform: isReversed ? "rotate(180deg)" : "rotate(0deg)",
          cursor: onClick ? "pointer" : "default"
        }}
        whileHover={onClick ? { scale: 1.05 } : {}}
        onClick={onClick}
      >
        <div className="text-white text-4xl mb-2">{symbol}</div>
        {showName && (
          <div 
            className="text-white text-xs font-medium text-center px-2 py-1 bg-black/30 rounded w-full mx-1"
            style={{ transform: isReversed ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            {card.name}
          </div>
        )}
      </motion.div>
    );
  }
  
  // Si hay imagen
  return (
    <motion.div
      className="rounded-lg border-2 border-purple-500/50 overflow-hidden"
      style={{ 
        width, 
        height,
        transform: isReversed ? "rotate(180deg)" : "rotate(0deg)",
        cursor: onClick ? "pointer" : "default"
      }}
      whileHover={onClick ? { scale: 1.05 } : {}}
      onClick={onClick}
    >
      <Image 
        src={card.image}
        alt={card.name}
        width={width}
        height={height}
        className="object-cover w-full h-full"
        onError={() => setError(true)}
      />
      {showName && (
        <div 
          className="absolute bottom-0 left-0 right-0 text-white text-xs font-medium text-center px-2 py-1 bg-black/60"
          style={{ transform: isReversed ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          {card.name}
        </div>
      )}
    </motion.div>
  );
} 