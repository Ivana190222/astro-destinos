"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaStar, FaMoon, FaSun, FaUserAlt, FaCalendarDay, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import ZodiacImage from "../components/ZodiacImage";
import InteractiveBackground from '@/app/components/InteractiveBackground';

export default function CartaAstralPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    fecha: "",
    hora: "",
    lugar: "",
  });
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating API call to get astrological data
    setTimeout(() => {
      // Mock data - in a real application, this would come from a backend API
      setChartData({
        signo: getZodiacSign(new Date(formData.fecha)),
        ascendente: getRandomAscendant(),
        luna: getRandomMoonSign(),
        planetas: {
          mercurio: getRandomZodiacSign(),
          venus: getRandomZodiacSign(),
          marte: getRandomZodiacSign(),
          jupiter: getRandomZodiacSign(),
          saturno: getRandomZodiacSign(),
        },
        casas: generateRandomHouses(),
      });
      setLoading(false);
    }, 2000);
  };

  // Helper function to determine zodiac sign based on birth date
  function getZodiacSign(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Tauro";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Géminis";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cáncer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Escorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagitario";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricornio";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Acuario";
    return "Piscis";
  }

  // Helper functions for generating random chart data
  function getRandomZodiacSign() {
    const signs = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
    return signs[Math.floor(Math.random() * signs.length)];
  }

  function getRandomAscendant() {
    return getRandomZodiacSign();
  }

  function getRandomMoonSign() {
    return getRandomZodiacSign();
  }

  function generateRandomHouses() {
    const houses = {};
    for (let i = 1; i <= 12; i++) {
      houses[i] = getRandomZodiacSign();
    }
    return houses;
  }

  return (
    <div className="min-h-screen relative">
      <InteractiveBackground />
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 pt-24">
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <Link href="/" className="flex items-center text-white hover:text-purple-300 transition-colors">
              <FaArrowLeft className="mr-2" />
              <span>Volver</span>
            </Link>
            <h1 className="text-3xl font-bold text-white ml-auto mr-auto">Mi Carta Astral</h1>
          </div>
          {!chartData ? (
            <motion.div 
              className="bg-indigo-900/40 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-center">Ingresa tus datos de nacimiento</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nombre" className="block mb-2 text-purple-200">Nombre</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-indigo-800/50 border border-purple-500/40 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Tu nombre"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="fecha" className="block mb-2 text-purple-200">Fecha de nacimiento</label>
                    <input
                      type="date"
                      id="fecha"
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-indigo-800/50 border border-purple-500/40 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="hora" className="block mb-2 text-purple-200">Hora de nacimiento</label>
                    <input
                      type="time"
                      id="hora"
                      name="hora"
                      value={formData.hora}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-indigo-800/50 border border-purple-500/40 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lugar" className="block mb-2 text-purple-200">Lugar de nacimiento</label>
                    <input
                      type="text"
                      id="lugar"
                      name="lugar"
                      value={formData.lugar}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-indigo-800/50 border border-purple-500/40 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Ciudad, País"
                    />
                  </div>
                </div>
                
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-8 rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        Consultando las estrellas...
                      </>
                    ) : (
                      <>Generar mi carta astral</>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              className="bg-indigo-900/40 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-8 text-center">Carta Astral de {formData.nombre}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <div className="bg-indigo-800/30 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <FaSun className="text-yellow-400 mr-2" /> Elementos Principales
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex justify-between items-center border-b border-purple-500/20 pb-2">
                        <span className="text-purple-200">Signo Solar:</span>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">{chartData.signo}</span>
                          <ZodiacImage sign={chartData.signo} size={32} />
                        </div>
                      </li>
                      <li className="flex justify-between items-center border-b border-purple-500/20 pb-2">
                        <span className="text-purple-200">Ascendente:</span>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">{chartData.ascendente}</span>
                          <ZodiacImage sign={chartData.ascendente} size={32} />
                        </div>
                      </li>
                      <li className="flex justify-between items-center border-b border-purple-500/20 pb-2">
                        <span className="text-purple-200">Luna:</span>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">{chartData.luna}</span>
                          <ZodiacImage sign={chartData.luna} size={32} />
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-indigo-800/30 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <FaStar className="text-yellow-300 mr-2" /> Posiciones Planetarias
                    </h3>
                    <ul className="space-y-3">
                      {Object.entries(chartData.planetas).map(([planeta, signo]) => (
                        <li key={planeta} className="flex justify-between items-center">
                          <span className="text-purple-200">{planeta.charAt(0).toUpperCase() + planeta.slice(1)}:</span>
                          <div className="flex items-center">
                            <span className="font-medium mr-2">{signo}</span>
                            <ZodiacImage sign={signo} size={24} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <div className="bg-indigo-800/30 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <FaMoon className="text-blue-300 mr-2" /> Interpretación General
                    </h3>
                    <p className="text-purple-100 mb-4">
                      Con tu Sol en {chartData.signo}, tu esencia se caracteriza por {getSignDescription(chartData.signo)}. 
                      Tu ascendente en {chartData.ascendente} indica que {getAscendantDescription(chartData.ascendente)}.
                    </p>
                    <p className="text-purple-100">
                      Tu Luna en {chartData.luna} revela que emocionalmente {getMoonDescription(chartData.luna)}.
                      La combinación de estos elementos te hace una persona única con grandes potenciales y desafíos específicos.
                    </p>
                  </div>
                  
                  <div className="bg-indigo-800/30 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Casas Astrológicas Destacadas</h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between border-b border-purple-500/20 pb-2">
                        <span className="text-purple-200">Casa 1 (Identidad):</span>
                        <span className="font-medium">{chartData.casas[1]}</span>
                      </li>
                      <li className="flex justify-between border-b border-purple-500/20 pb-2">
                        <span className="text-purple-200">Casa 5 (Creatividad):</span>
                        <span className="font-medium">{chartData.casas[5]}</span>
                      </li>
                      <li className="flex justify-between border-b border-purple-500/20 pb-2">
                        <span className="text-purple-200">Casa 7 (Relaciones):</span>
                        <span className="font-medium">{chartData.casas[7]}</span>
                      </li>
                      <li className="flex justify-between border-b border-purple-500/20 pb-2">
                        <span className="text-purple-200">Casa 10 (Carrera):</span>
                        <span className="font-medium">{chartData.casas[10]}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setChartData(null)}
                  className="bg-transparent border border-purple-500 text-white py-3 px-8 rounded-full font-bold hover:bg-purple-900/30 transition-all duration-300"
                >
                  Generar nueva carta
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper functions for sign descriptions
function getSignDescription(sign) {
  const descriptions = {
    "Aries": "ser valiente, enérgico y pionero, siempre listo para la acción",
    "Tauro": "ser paciente, confiable y con un fuerte sentido práctico",
    "Géminis": "ser curioso, adaptable y con excelentes habilidades comunicativas",
    "Cáncer": "ser intuitivo, protector y emocionalmente profundo",
    "Leo": "ser creativo, apasionado y con un corazón generoso",
    "Virgo": "ser analítico, detallista y con un enfoque metódico",
    "Libra": "ser diplomático, equilibrado y con un fuerte sentido de justicia",
    "Escorpio": "ser intenso, determinado y profundamente transformador",
    "Sagitario": "ser aventurero, optimista y con una mente filosófica",
    "Capricornio": "ser disciplinado, responsable y orientado a metas",
    "Acuario": "ser progresista, original y humanitario",
    "Piscis": "ser compasivo, intuitivo y con una profunda conexión espiritual"
  };
  return descriptions[sign] || "tener cualidades únicas y especiales";
}

function getAscendantDescription(sign) {
  const descriptions = {
    "Aries": "proyectas una imagen valiente y directa hacia el mundo",
    "Tauro": "transmites estabilidad y confiabilidad en tu primera impresión",
    "Géminis": "das una primera impresión intelectual y comunicativa",
    "Cáncer": "proyectas una imagen protectora y sensible",
    "Leo": "transmites una presencia carismática y segura",
    "Virgo": "das una primera impresión meticulosa y servicial",
    "Libra": "proyectas una imagen armoniosa y equilibrada",
    "Escorpio": "transmites una presencia misteriosa y magnética",
    "Sagitario": "das una primera impresión entusiasta y optimista",
    "Capricornio": "proyectas una imagen seria y responsable",
    "Acuario": "transmites originalidad e independencia",
    "Piscis": "das una primera impresión soñadora y empática"
  };
  return descriptions[sign] || "tienes una manera única de presentarte al mundo";
}

function getMoonDescription(sign) {
  const descriptions = {
    "Aries": "necesitas expresar tus emociones directamente y sin filtros",
    "Tauro": "buscas seguridad emocional a través de la estabilidad y el confort",
    "Géminis": "procesas tus sentimientos a través de la comunicación y el análisis",
    "Cáncer": "tienes una profunda vida emocional y una gran sensibilidad",
    "Leo": "expresas tus emociones de forma dramática y auténtica",
    "Virgo": "tiendes a analizar tus emociones con lógica y practicidad",
    "Libra": "buscas equilibrio emocional y armonía en tus relaciones",
    "Escorpio": "experimentas emociones intensas y transformadoras",
    "Sagitario": "expresas tus emociones con optimismo y expansividad",
    "Capricornio": "manejas tus emociones con reserva y autocontrol",
    "Acuario": "procesas tus sentimientos desde una perspectiva única y desapegada",
    "Piscis": "tienes una sensibilidad emocional intuitiva y compasiva"
  };
  return descriptions[sign] || "tienes un mundo emocional único y complejo";
} 