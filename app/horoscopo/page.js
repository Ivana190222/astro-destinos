"use client";

import { useState } from 'react';
import DailyHoroscope from '../components/DailyHoroscope';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import InteractiveBackground from '@/app/components/InteractiveBackground';

const zodiacSigns = [
  { id: 'aries', name: 'Aries', symbol: '♈' },
  { id: 'tauro', name: 'Tauro', symbol: '♉' },
  { id: 'geminis', name: 'Géminis', symbol: '♊' },
  { id: 'cancer', name: 'Cáncer', symbol: '♋' },
  { id: 'leo', name: 'Leo', symbol: '♌' },
  { id: 'virgo', name: 'Virgo', symbol: '♍' },
  { id: 'libra', name: 'Libra', symbol: '♎' },
  { id: 'escorpio', name: 'Escorpio', symbol: '♏' },
  { id: 'sagitario', name: 'Sagitario', symbol: '♐' },
  { id: 'capricornio', name: 'Capricornio', symbol: '♑' },
  { id: 'acuario', name: 'Acuario', symbol: '♒' },
  { id: 'piscis', name: 'Piscis', symbol: '♓' }
];

export default function HoroscopePage() {
  const [selectedSign, setSelectedSign] = useState('aries');

  return (
    <div className="min-h-screen relative">
      <InteractiveBackground />
      <div className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Link href="/" className="flex items-center text-white hover:text-purple-300 transition-colors">
              <FaArrowLeft className="mr-2" />
              <span>Volver</span>
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-4">
              Horóscopo Diario
            </h1>
            <p className="text-xl text-gray-300">
              Descubre lo que las estrellas tienen preparado para ti hoy
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
            {zodiacSigns.map((sign) => (
              <motion.button
                key={sign.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSign(sign.id)}
                className={`p-4 rounded-xl text-center transition-all duration-300 ${
                  selectedSign === sign.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-900/50 text-gray-300 hover:bg-purple-800/50'
                }`}
              >
                <div className="text-3xl mb-2">{sign.symbol}</div>
                <div className="text-sm font-medium">{sign.name}</div>
              </motion.button>
            ))}
          </div>

          <DailyHoroscope sign={selectedSign} />
        </div>
      </div>
    </div>
  );
} 