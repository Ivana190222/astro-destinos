"use client";

import Image from "next/image";
import { useState } from "react";

export default function ZodiacImage({ sign, size = 32, className = "" }) {
  const [error, setError] = useState(false);
  
  // Mapa de colores para cada signo
  const signColors = {
    "aries": "#FF6B6B", // Rojo
    "tauro": "#4EA8DE", // Azul verdoso
    "géminis": "#FFBE0B", // Amarillo
    "cáncer": "#8338EC", // Púrpura
    "leo": "#FB8500", // Naranja
    "virgo": "#06D6A0", // Verde esmeralda
    "libra": "#EF476F", // Rosa
    "escorpio": "#7B2CBF", // Violeta
    "sagitario": "#FF9E00", // Naranja claro
    "capricornio": "#073B4C", // Azul oscuro
    "acuario": "#AACC00", // Verde lima
    "piscis": "#48CAE4", // Azul claro
  };
  
  // Símbolos del zodiaco (emoji o caracteres unicode)
  const signSymbols = {
    "aries": "♈",
    "tauro": "♉",
    "géminis": "♊",
    "cáncer": "♋",
    "leo": "♌",
    "virgo": "♍",
    "libra": "♎",
    "escorpio": "♏",
    "sagitario": "♐",
    "capricornio": "♑",
    "acuario": "♒",
    "piscis": "♓",
  };
  
  // Obtener datos del signo (normalizando el nombre)
  const normalizedSign = sign?.toLowerCase()?.replace(/é/g, 'e')?.replace(/í/g, 'i');
  const bgColor = signColors[normalizedSign] || "#9D4EDD"; // Color púrpura predeterminado
  const symbol = signSymbols[normalizedSign] || sign?.charAt(0);
  
  if (error) {
    return (
      <div 
        className={`flex items-center justify-center rounded-full overflow-hidden ${className}`}
        style={{ 
          width: size, 
          height: size, 
          backgroundColor: bgColor 
        }}
      >
        <span className="text-white" style={{ fontSize: size * 0.6 }}>
          {symbol}
        </span>
      </div>
    );
  }
  
  return (
    <div className={`rounded-full overflow-hidden ${className}`} style={{ width: size, height: size }}>
      <Image 
        src={`/zodiac/${normalizedSign}.jpg`}
        alt={sign}
        width={size}
        height={size}
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
} 