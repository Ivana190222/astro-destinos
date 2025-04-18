"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import InteractiveBackground from '@/app/components/InteractiveBackground';

const zodiacSigns = [
  'Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo',
  'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis'
];

// Tabla de compatibilidad con porcentajes y descripciones
const compatibilityData = {
  'Aries-Aries': {
    percentage: 85,
    description: 'Dos Aries juntos crean una relación llena de pasión y aventura, pero también pueden surgir conflictos debido a su naturaleza dominante y competitiva. La clave es aprender a ceder y respetar el espacio del otro.'
  },
  'Aries-Tauro': {
    percentage: 60,
    description: 'Aries y Tauro tienen diferentes enfoques de la vida: Aries es impulsivo mientras Tauro es metódico. Esta combinación puede funcionar si ambos aprenden a valorar las diferencias. Aries debe cultivar paciencia y Tauro más espontaneidad.'
  },
  'Aries-Géminis': {
    percentage: 90,
    description: 'Excelente combinación de energías. Aries aporta pasión y acción, mientras Géminis contribuye con ideas y comunicación. Ambos disfrutan de nuevas experiencias y mantienen vivo el interés mutuo.'
  },
  'Aries-Cáncer': {
    percentage: 65,
    description: 'Una combinación desafiante pero complementaria. Aries es directo y orientado a la acción, mientras Cáncer es sensible y emocional. Si logran entender sus diferentes lenguajes emocionales, pueden formar una unión fuerte.'
  },
  'Aries-Leo': {
    percentage: 92,
    description: 'Una de las mejores compatibilidades del zodiaco. Ambos son apasionados, energéticos y disfrutan siendo el centro de atención. Su relación está llena de admiración mutua, diversión y aventuras compartidas.'
  },
  'Aries-Virgo': {
    percentage: 55,
    description: 'Combinación complicada. Aries es espontáneo y a veces caótico, mientras Virgo es metódico y perfeccionista. Para funcionar, Aries debe valorar el análisis de Virgo y Virgo debe apreciar la audacia de Aries.'
  },
  'Aries-Libra': {
    percentage: 70,
    description: 'Signos opuestos que pueden complementarse. Aries es independiente y directo, mientras Libra busca equilibrio y armonía. Juntos pueden aprender mucho el uno del otro si respetan sus diferencias.'
  },
  'Aries-Escorpio': {
    percentage: 85,
    description: 'Relación intensa y apasionada. Ambos son decididos y tienen personalidades fuertes. La atracción es magnética pero pueden surgir luchas de poder. La clave es canalizar esa intensidad de forma constructiva.'
  },
  'Aries-Sagitario': {
    percentage: 95,
    description: 'Excelente compatibilidad. Estos signos de fuego comparten amor por la aventura, la libertad y el optimismo. Su relación está llena de entusiasmo, viajes y nuevas experiencias que los mantienen unidos.'
  },
  'Aries-Capricornio': {
    percentage: 50,
    description: 'Combinación desafiante. Aries es espontáneo y vive el momento, mientras Capricornio es disciplinado y orientado a futuro. Pueden aprender mucho el uno del otro si valoran sus diferentes perspectivas.'
  },
  'Aries-Acuario': {
    percentage: 80,
    description: 'Buena compatibilidad basada en respeto mutuo por la independencia. Ambos valoran la libertad y tienen mentalidades progresistas. Juntos pueden formar un equipo innovador y dinámico.'
  },
  'Aries-Piscis': {
    percentage: 65,
    description: 'Combinación intrigante de fuego y agua. Aries es directo y activo, mientras Piscis es intuitivo y emocional. Pueden complementarse bien si Aries muestra sensibilidad y Piscis aprende a ser más asertivo.'
  },
  // Tauro con todos
  'Tauro-Tauro': {
    percentage: 90,
    description: 'Una unión estable y duradera. Ambos valoran la seguridad, la lealtad y los placeres sensoriales. Su paciencia y determinación los ayuda a construir una relación sólida basada en valores compartidos.'
  },
  'Tauro-Géminis': {
    percentage: 55,
    description: 'Relación desafiante. Tauro busca estabilidad mientras Géminis anhela variedad. Pueden funcionar si Tauro aprende a ser más flexible y Géminis más constante y confiable.'
  },
  // Continúa con las demás combinaciones...
};

export default function CompatibilidadPage() {
  const [selectedSigns, setSelectedSigns] = useState({
    sign1: '',
    sign2: ''
  });
  const [compatibility, setCompatibility] = useState(null);

  const handleSignChange = (e, signNumber) => {
    const newSelectedSigns = {
      ...selectedSigns,
      [signNumber]: e.target.value
    };
    setSelectedSigns(newSelectedSigns);
    
    // Si ambos signos están seleccionados, calcular compatibilidad automáticamente
    if (newSelectedSigns.sign1 && newSelectedSigns.sign2) {
      calculateCompatibility(newSelectedSigns);
    }
  };

  const calculateCompatibility = (signs = selectedSigns) => {
    const { sign1, sign2 } = signs;
    if (!sign1 || !sign2) return;
    
    // Ordenar alfabéticamente para buscar en el objeto de datos
    const sortedSigns = [sign1, sign2].sort().join('-');
    const reversedSigns = [sign2, sign1].join('-');
    
    // Buscar en la tabla de compatibilidad
    const data = compatibilityData[sortedSigns] || compatibilityData[reversedSigns];
    
    if (data) {
      setCompatibility(data);
    } else {
      // Datos genéricos si no existe la combinación específica
      setCompatibility({
        percentage: Math.floor(Math.random() * 40) + 60, // Entre 60% y 100%
        description: `La compatibilidad entre ${sign1} y ${sign2} tiene aspectos positivos y desafíos. Ambos signos pueden aprender el uno del otro y crear una relación equilibrada si trabajan en su comunicación y entienden sus diferencias.`
      });
    }
  };

  return (
    <div className="min-h-screen relative">
      <InteractiveBackground />
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8 rounded-2xl bg-white/10 p-8 backdrop-blur-lg"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Compatibilidad Zodiacal</h2>
            <p className="mt-2 text-gray-300">Descubre la compatibilidad entre dos signos zodiacales</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="sign1" className="block text-sm font-medium text-gray-300">
                Primer Signo
              </label>
              <select
                id="sign1"
                value={selectedSigns.sign1}
                onChange={(e) => handleSignChange(e, 'sign1')}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Selecciona un signo</option>
                {zodiacSigns.map((sign) => (
                  <option key={sign} value={sign}>{sign}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="sign2" className="block text-sm font-medium text-gray-300">
                Segundo Signo
              </label>
              <select
                id="sign2"
                value={selectedSigns.sign2}
                onChange={(e) => handleSignChange(e, 'sign2')}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Selecciona un signo</option>
                {zodiacSigns.map((sign) => (
                  <option key={sign} value={sign}>{sign}</option>
                ))}
              </select>
            </div>
          </div>

          {compatibility && (
            <div className="mt-6 p-4 bg-purple-900/50 rounded-lg border border-purple-500/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">
                  Compatibilidad: 
                </h3>
                <span className="text-2xl font-bold text-purple-300">
                  {compatibility.percentage}%
                </span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-gradient-to-r from-red-500 to-purple-500 h-2.5 rounded-full" 
                  style={{ width: `${compatibility.percentage}%` }}
                ></div>
              </div>
              
              <h4 className="text-lg font-semibold text-purple-200 mb-2">
                {selectedSigns.sign1} + {selectedSigns.sign2}
              </h4>
              
              <p className="text-gray-300 leading-relaxed">{compatibility.description}</p>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-400 hover:text-gray-300 transition-colors duration-200"
            >
              <FaArrowLeft className="mr-2" />
              Volver al inicio
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 