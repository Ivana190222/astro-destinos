"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaStar, FaHeart, FaBook, FaHistory, FaUser, FaSun, FaMoon } from "react-icons/fa";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import InteractiveBackground from "./components/InteractiveBackground";

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

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-900">
      <Navigation />
      <InteractiveBackground />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-6"
            >
              Descubre tu Destino Astral
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto"
            >
              Explora el fascinante mundo de la astrología y descubre cómo los astros influyen en tu vida.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center space-x-6"
            >
              <Link
                href="/carta-astral"
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
              >
                Mi Carta Astral
              </Link>
              <Link
                href="/compatibilidad"
                className="px-8 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg text-white font-medium transition-colors"
              >
                Compatibilidad Amorosa
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  title: 'Carta Astral',
                  description: 'Descubre tu mapa astral personalizado y comprende tu personalidad.',
                  icon: <FaStar className="text-4xl text-purple-400" />,
                  href: '/carta-astral'
                },
                {
                  title: 'Compatibilidad',
                  description: 'Analiza la compatibilidad astrológica con tu pareja o amigos.',
                  icon: <FaHeart className="text-4xl text-pink-400" />,
                  href: '/compatibilidad'
                },
                {
                  title: 'Tarot',
                  description: 'Consulta las cartas para obtener guía y claridad en tu vida.',
                  icon: <FaBook className="text-4xl text-indigo-400" />,
                  href: '/tarot'
                },
                {
                  title: 'Horóscopo',
                  description: 'Descubre las predicciones diarias para tu signo zodiacal.',
                  icon: <FaSun className="text-4xl text-yellow-400" />,
                  href: '/horoscopo'
                },
                {
                  title: 'Mitología Zodiacal',
                  description: 'Explora las historias y mitos detrás de los signos zodiacales.',
                  icon: <FaHistory className="text-4xl text-blue-400" />,
                  href: '/mitologia'
                },
                {
                  title: 'Rituales',
                  description: 'Descubre rituales mágicos y ceremonias para cada ocasión.',
                  icon: <FaMoon className="text-4xl text-indigo-300" />,
                  href: '/rituales'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-purple-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    {feature.icon}
                    <h3 className="text-xl font-semibold text-purple-200">{feature.title}</h3>
                  </div>
                  <p className="text-purple-300 mb-4">{feature.description}</p>
                  <Link
                    href={feature.href}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Explorar →
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
