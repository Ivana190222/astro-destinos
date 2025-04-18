"use client";

import { useState, useEffect } from 'react';
import { getDailyHoroscope } from '../services/astrologyService';
import { motion } from 'framer-motion';

export default function DailyHoroscope({ sign }) {
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHoroscope = async () => {
      try {
        setLoading(true);
        const data = await getDailyHoroscope(sign);
        setHoroscope(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar el horóscopo');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHoroscope();
  }, [sign]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4 md:p-8">
        <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 md:p-8">
        {error}
      </div>
    );
  }

  if (!horoscope) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-4 md:p-6 rounded-lg md:rounded-xl backdrop-blur-sm border border-purple-500/20"
    >
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-purple-300 mb-1 md:mb-2">
          Horóscopo Diario - {sign.charAt(0).toUpperCase() + sign.slice(1)}
        </h2>
        <p className="text-sm md:text-base text-gray-400">{horoscope.date}</p>
      </div>

      <div className="space-y-3 md:space-y-4">
        <div className="bg-purple-800/30 p-3 md:p-4 rounded-lg">
          <h3 className="text-base md:text-lg font-semibold text-purple-200 mb-1 md:mb-2">Predicción</h3>
          <p className="text-sm md:text-base text-gray-300">{horoscope.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <div className="bg-purple-800/30 p-3 md:p-4 rounded-lg">
            <h3 className="text-base md:text-lg font-semibold text-purple-200 mb-1 md:mb-2">Compatibilidad</h3>
            <p className="text-sm md:text-base text-gray-300">{horoscope.compatibility}</p>
          </div>

          <div className="bg-purple-800/30 p-3 md:p-4 rounded-lg">
            <h3 className="text-base md:text-lg font-semibold text-purple-200 mb-1 md:mb-2">Estado de Ánimo</h3>
            <p className="text-sm md:text-base text-gray-300">{horoscope.mood}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          <div className="bg-purple-800/30 p-3 md:p-4 rounded-lg">
            <h3 className="text-base md:text-lg font-semibold text-purple-200 mb-1 md:mb-2">Color de la Suerte</h3>
            <p className="text-sm md:text-base text-gray-300">{horoscope.color}</p>
          </div>

          <div className="bg-purple-800/30 p-3 md:p-4 rounded-lg">
            <h3 className="text-base md:text-lg font-semibold text-purple-200 mb-1 md:mb-2">Número de la Suerte</h3>
            <p className="text-sm md:text-base text-gray-300">{horoscope.luckyNumber}</p>
          </div>

          <div className="bg-purple-800/30 p-3 md:p-4 rounded-lg">
            <h3 className="text-base md:text-lg font-semibold text-purple-200 mb-1 md:mb-2">Hora de la Suerte</h3>
            <p className="text-sm md:text-base text-gray-300">{horoscope.luckyTime}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 