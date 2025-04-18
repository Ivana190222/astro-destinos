"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaHeart, FaStar, FaMoon, FaSun, FaLeaf, FaGem } from "react-icons/fa";

const rituals = [
  {
    id: 1,
    title: "Ritual de Luna Nueva",
    description: "Un ritual poderoso para manifestar nuevos comienzos y establecer intenciones.",
    category: "Lunar",
    duration: "30 minutos",
    difficulty: "Fácil",
    image: "/rituals/moon.jpg",
    icon: FaMoon,
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: 2,
    title: "Ritual de Abundancia",
    description: "Atrae prosperidad y abundancia a tu vida con este ritual energético.",
    category: "Prosperidad",
    duration: "45 minutos",
    difficulty: "Intermedio",
    image: "/rituals/abundance.jpg",
    icon: FaGem,
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 3,
    title: "Ritual de Sanación",
    description: "Libera energías negativas y promueve la sanación física y emocional.",
    category: "Sanación",
    duration: "1 hora",
    difficulty: "Intermedio",
    image: "/rituals/healing.jpg",
    icon: FaHeart,
    color: "from-pink-500 to-purple-500"
  },
  {
    id: 4,
    title: "Ritual de Protección",
    description: "Crea un escudo energético para proteger tu espacio y tu energía.",
    category: "Protección",
    duration: "20 minutos",
    difficulty: "Fácil",
    image: "/rituals/protection.jpg",
    icon: FaStar,
    color: "from-purple-500 to-blue-500"
  },
  {
    id: 5,
    title: "Ritual de Conexión",
    description: "Fortalece tu conexión con la naturaleza y el universo.",
    category: "Conexión",
    duration: "1 hora",
    difficulty: "Intermedio",
    image: "/rituals/connection.jpg",
    icon: FaLeaf,
    color: "from-green-500 to-teal-500"
  },
  {
    id: 6,
    title: "Ritual de Amor",
    description: "Atrae el amor y fortalece las relaciones existentes.",
    category: "Amor",
    duration: "40 minutos",
    difficulty: "Fácil",
    image: "/rituals/love.jpg",
    icon: FaHeart,
    color: "from-red-500 to-pink-500"
  }
];

export default function RitualsPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center text-white hover:text-purple-300 transition-colors">
            <FaArrowLeft className="mr-2" />
            <span>Volver al inicio</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-purple-300 mb-4">Rituales</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Descubre una colección de rituales poderosos para transformar tu vida y conectar con tu energía interior.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rituals.map((ritual) => {
            const Icon = ritual.icon;
            return (
              <motion.div
                key={ritual.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="bg-indigo-950/50 backdrop-blur-sm rounded-lg overflow-hidden border border-purple-500/20"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={ritual.image}
                    alt={ritual.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-950/80" />
                  <div className="absolute bottom-4 left-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${ritual.color} text-white text-sm font-medium`}>
                      <Icon className="mr-2" />
                      {ritual.category}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-2">{ritual.title}</h2>
                  <p className="text-gray-300 mb-4">{ritual.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{ritual.duration}</span>
                    <span>{ritual.difficulty}</span>
                  </div>
                  <Link
                    href={`/rituales/${ritual.id}`}
                    className="mt-4 inline-flex items-center text-purple-300 hover:text-purple-400 transition-colors"
                  >
                    Ver detalles
                    <FaArrowLeft className="ml-2 transform rotate-180" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 