"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { use } from "react";
import { FaArrowLeft, FaHeart, FaStar, FaMoon, FaSun, FaLeaf, FaGem, FaClock, FaFire } from "react-icons/fa";

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
    color: "from-blue-500 to-indigo-500",
    materials: [
      "Velas blancas",
      "Incienso de lavanda",
      "Cuarzo transparente",
      "Papel y bolígrafo"
    ],
    steps: [
      "Prepara tu espacio con velas e incienso",
      "Escribe tus intenciones en el papel",
      "Medita con el cuarzo en tus manos",
      "Quema el papel con tus intenciones",
      "Visualiza tus metas mientras la luna brilla"
    ]
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
    color: "from-yellow-500 to-orange-500",
    materials: [
      "Velas doradas",
      "Incienso de canela",
      "Pirita",
      "Monedas"
    ],
    steps: [
      "Coloca las monedas en un círculo",
      "Enciende las velas doradas",
      "Sostén la pirita mientras visualizas la abundancia",
      "Recita afirmaciones de prosperidad",
      "Guarda las monedas en tu billetera"
    ]
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
    color: "from-pink-500 to-purple-500",
    materials: [
      "Velas rosadas",
      "Incienso de sándalo",
      "Amatista",
      "Aceites esenciales"
    ],
    steps: [
      "Crea un baño de sanación con aceites",
      "Coloca la amatista en tu espacio",
      "Medita con las velas encendidas",
      "Visualiza la energía curativa",
      "Recita afirmaciones de sanación"
    ]
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
    color: "from-purple-500 to-blue-500",
    materials: [
      "Velas negras",
      "Salvia blanca",
      "Turmalina negra",
      "Sal marina"
    ],
    steps: [
      "Coloca la sal en las esquinas de tu espacio",
      "Enciende la salvia para limpiar",
      "Sostén la turmalina mientras visualizas protección",
      "Recita afirmaciones de protección",
      "Crea un círculo de sal alrededor de tu espacio"
    ]
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
    color: "from-green-500 to-teal-500",
    materials: [
      "Velas verdes",
      "Incienso de pino",
      "Cuarzo verde",
      "Elementos naturales"
    ],
    steps: [
      "Sal al aire libre o abre las ventanas",
      "Coloca elementos naturales en tu altar",
      "Medita con el cuarzo verde",
      "Visualiza tu conexión con la tierra",
      "Recita afirmaciones de unidad"
    ]
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
    color: "from-red-500 to-pink-500",
    materials: [
      "Velas rojas",
      "Incienso de rosa",
      "Cuarzo rosa",
      "Pétalos de rosa"
    ],
    steps: [
      "Crea un círculo con pétalos de rosa",
      "Enciende las velas rojas",
      "Sostén el cuarzo rosa mientras visualizas el amor",
      "Recita afirmaciones de amor",
      "Visualiza la energía del amor fluyendo hacia ti"
    ]
  }
];

export default function RitualDetails({ params }) {
  const resolvedParams = use(params);
  const ritual = rituals.find(r => r.id === parseInt(resolvedParams.id));
  const Icon = ritual?.icon;

  if (!ritual) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-purple-300 mb-4">Ritual no encontrado</h1>
          <Link href="/rituales" className="text-purple-300 hover:text-purple-400">
            Volver a los rituales
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/rituales" className="flex items-center text-white hover:text-purple-300 transition-colors">
            <FaArrowLeft className="mr-2" />
            <span>Volver a los rituales</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-indigo-950/50 backdrop-blur-sm rounded-lg overflow-hidden border border-purple-500/20"
        >
          <div className="relative h-64 w-full">
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
            <h1 className="text-2xl font-bold text-white mb-2">{ritual.title}</h1>
            <p className="text-gray-300 mb-4">{ritual.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-purple-300 mb-3">Materiales necesarios</h2>
                <ul className="space-y-2">
                  {ritual.materials.map((material, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <FaStar className="mr-2 text-purple-300" />
                      {material}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-purple-300 mb-3">Pasos del ritual</h2>
                <ol className="space-y-2">
                  {ritual.steps.map((step, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-sm mr-2 mt-1">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center">
                <FaClock className="mr-2" />
                <span>{ritual.duration}</span>
              </div>
              <div className="flex items-center">
                <FaFire className="mr-2" />
                <span>{ritual.difficulty}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 