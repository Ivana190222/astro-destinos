"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaRedo, FaStar, FaMoon, FaSun, FaHeart, FaGem, FaCrown, FaBook, FaHorse, FaDragon, FaCircle, FaQuestion } from "react-icons/fa";
import InteractiveBackground from '@/app/components/InteractiveBackground';

const tarotCards = [
  {
    id: 1,
    name: "El Mago",
    icon: FaStar,
    color: "from-purple-500 to-blue-500",
    upright: "Manifestación, poder, habilidad",
    reversed: "Manipulación, engaño, falta de dirección",
    detailed: {
      upright: "El Mago representa tu capacidad para manifestar tus deseos en la realidad. Tienes todas las herramientas necesarias para crear el cambio que buscas. Este es un momento de gran poder personal y habilidad creativa. Confía en tu intuición y en tu capacidad para transformar las situaciones.",
      reversed: "Cuando El Mago aparece invertido, puede indicar que estás usando tus habilidades de manera manipuladora o que no estás aprovechando todo tu potencial. Es posible que estés engañando a otros o a ti mismo. Este es un momento para reflexionar sobre tus verdaderas intenciones."
    }
  },
  {
    id: 2,
    name: "La Sacerdotisa",
    icon: FaMoon,
    color: "from-blue-500 to-indigo-500",
    upright: "Intuición, misterio, sabiduría interior",
    reversed: "Secretos, confusión, falta de claridad",
    detailed: {
      upright: "La Sacerdotisa te invita a confiar en tu intuición y sabiduría interior. Hay conocimientos ocultos que están disponibles para ti si te tomas el tiempo de escuchar tu voz interior. Este es un momento para la introspección y la conexión con tu lado más espiritual.",
      reversed: "Cuando La Sacerdotisa aparece invertida, puede indicar que estás ignorando tu intuición o que hay secretos que necesitan ser revelados. Es posible que estés confundido sobre tu camino o que estés ocultando información importante."
    }
  },
  {
    id: 3,
    name: "La Emperatriz",
    icon: FaHeart,
    color: "from-pink-500 to-purple-500",
    upright: "Abundancia, fertilidad, creatividad",
    reversed: "Dependencia, inestabilidad, falta de crecimiento",
    detailed: {
      upright: "La Emperatriz representa la abundancia, la fertilidad y la creatividad en todos los aspectos de tu vida. Este es un momento de crecimiento y prosperidad. Estás en un período de gran energía creativa y potencial para manifestar tus deseos.",
      reversed: "Cuando La Emperatriz aparece invertida, puede indicar que estás experimentando bloqueos creativos o dificultades para manifestar tus deseos. Es posible que te sientas dependiente de otros o que estés luchando con la estabilidad emocional."
    }
  },
  {
    id: 4,
    name: "El Emperador",
    icon: FaCrown,
    color: "from-yellow-500 to-orange-500",
    upright: "Autoridad, estructura, estabilidad",
    reversed: "Tiranía, rigidez, abuso de poder",
    detailed: {
      upright: "El Emperador representa la autoridad, la estructura y la estabilidad en tu vida. Este es un momento para tomar el control y establecer límites claros. Tienes la capacidad de liderar y organizar tu vida de manera efectiva.",
      reversed: "Cuando El Emperador aparece invertido, puede indicar que estás siendo demasiado controlador o rígido. Es posible que estés abusando de tu poder o que estés luchando por mantener el control en situaciones que requieren flexibilidad."
    }
  },
  {
    id: 5,
    name: "El Hierofante",
    icon: FaBook,
    color: "from-green-500 to-teal-500",
    upright: "Tradición, espiritualidad, guía",
    reversed: "Rebelión, no conformidad, nuevas ideas",
    detailed: {
      upright: "El Hierofante representa la tradición, la espiritualidad y la guía en tu vida. Este es un momento para seguir las enseñanzas establecidas y buscar orientación de fuentes tradicionales. Hay lecciones importantes que aprender de las estructuras existentes.",
      reversed: "Cuando El Hierofante aparece invertido, puede indicar que estás rechazando las tradiciones o las estructuras establecidas. Este es un momento para cuestionar las normas y explorar nuevas formas de pensar y hacer las cosas."
    }
  },
  {
    id: 6,
    name: "Los Enamorados",
    icon: FaHeart,
    color: "from-red-500 to-pink-500",
    upright: "Amor, armonía, relaciones",
    reversed: "Desequilibrio, falta de armonía, decisiones difíciles",
    detailed: {
      upright: "Los Enamorados representan el amor, la armonía y las relaciones significativas en tu vida. Este es un momento de conexión profunda y decisiones importantes relacionadas con el corazón. Confía en tu intuición al tomar decisiones sobre relaciones.",
      reversed: "Cuando Los Enamorados aparecen invertidos, puede indicar desequilibrio en tus relaciones o dificultades para tomar decisiones del corazón. Es posible que estés luchando con conflictos internos o externos en tus relaciones."
    }
  },
  {
    id: 7,
    name: "El Carro",
    icon: FaHorse,
    color: "from-blue-500 to-cyan-500",
    upright: "Victoria, avance, determinación",
    reversed: "Falta de dirección, obstáculos, derrota",
    detailed: {
      upright: "El Carro representa la victoria, el avance y la determinación en tu vida. Este es un momento de gran impulso y progreso. Tienes la fuerza y la determinación para superar cualquier obstáculo y alcanzar tus metas.",
      reversed: "Cuando El Carro aparece invertido, puede indicar que estás experimentando falta de dirección o encontrando obstáculos en tu camino. Es posible que necesites reevaluar tu estrategia o encontrar nuevas formas de avanzar."
    }
  },
  {
    id: 8,
    name: "La Fuerza",
    icon: FaDragon,
    color: "from-orange-500 to-red-500",
    upright: "Fuerza interior, coraje, paciencia",
    reversed: "Debilidad, inseguridad, falta de control",
    detailed: {
      upright: "La Fuerza representa la fuerza interior, el coraje y la paciencia en tu vida. Este es un momento para confiar en tu capacidad para manejar situaciones desafiantes con gracia y compasión. Tienes la fuerza necesaria para superar cualquier obstáculo.",
      reversed: "Cuando La Fuerza aparece invertida, puede indicar que estás luchando con sentimientos de debilidad o inseguridad. Es posible que estés perdiendo el control de una situación o que necesites trabajar en tu confianza interior."
    }
  },
  {
    id: 9,
    name: "El Ermitaño",
    icon: FaMoon,
    color: "from-gray-500 to-blue-500",
    upright: "Introspección, soledad, guía interior",
    reversed: "Aislamiento, soledad no deseada, falta de dirección",
    detailed: {
      upright: "El Ermitaño representa la introspección, la soledad y la guía interior en tu vida. Este es un momento para retirarte y reflexionar sobre tu camino. La soledad puede ser una fuente de sabiduría y crecimiento personal.",
      reversed: "Cuando El Ermitaño aparece invertido, puede indicar que estás experimentando un aislamiento no deseado o una falta de dirección. Es posible que necesites reconectar con otros o encontrar nuevas fuentes de guía."
    }
  },
  {
    id: 10,
    name: "La Rueda de la Fortuna",
    icon: FaCircle,
    color: "from-yellow-500 to-orange-500",
    upright: "Cambio, ciclos, suerte",
    reversed: "Resistencia al cambio, mala suerte, estancamiento",
    detailed: {
      upright: "La Rueda de la Fortuna representa el cambio, los ciclos y la suerte en tu vida. Este es un momento de transformación y nuevos comienzos. Los ciclos de la vida están girando a tu favor, trayendo nuevas oportunidades y experiencias.",
      reversed: "Cuando La Rueda de la Fortuna aparece invertida, puede indicar que estás resistiendo el cambio o experimentando una racha de mala suerte. Es posible que necesites aceptar que el cambio es inevitable y encontrar formas de adaptarte."
    }
  }
];

export default function TarotPage() {
  const [cards, setCards] = useState(tarotCards);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [showReading, setShowReading] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [revealedCards, setRevealedCards] = useState({});

  const handleShuffleCards = () => {
    setIsShuffling(true);
    setShowReading(false);
    setSelectedCards([]);
    setShowCards(true);
    setRevealedCards({});

    // Shuffle cards with deterministic orientation
    const shuffledCards = [...cards]
      .sort(() => Math.random() - 0.5) // Shuffle randomly
      .map(card => ({
        ...card,
        isReversed: Math.random() > 0.75 // 25% chance of being reversed
      }));

    setCards(shuffledCards);

    setTimeout(() => {
      setIsShuffling(false);
    }, 1000);
  };

  const handleSelectCard = (card) => {
    if (selectedCards.length < 3 && !selectedCards.find(c => c.id === card.id)) {
      setSelectedCards([...selectedCards, card]);
      
      // Revelar la carta seleccionada
      setRevealedCards(prev => ({
        ...prev,
        [card.id]: true
      }));
    }
  };

  useEffect(() => {
    if (selectedCards.length === 3) {
      setShowReading(true);
    }
  }, [selectedCards]);

  return (
    <div className="min-h-screen relative">
      <InteractiveBackground />
      <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8 mt-8">
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
            <h1 className="text-4xl font-bold text-purple-300 mb-4">Lectura de Tarot</h1>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Selecciona tres cartas para recibir una lectura personalizada. Cada carta revelará aspectos de tu pasado, presente y futuro.
            </p>
            {!showCards && (
              <p className="text-gray-300 max-w-2xl mx-auto">
                Antes de comenzar, toma un momento para concentrarte en tu pregunta o situación. 
                Respira profundamente y deja que tu intuición te guíe al seleccionar las cartas.
              </p>
            )}
          </motion.div>

          <div className="flex justify-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShuffleCards}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors"
            >
              <FaRedo className="mr-2" />
              {showCards ? "Barajar de nuevo" : "Barajar y comenzar"}
            </motion.button>
          </div>

          {showCards && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
              {cards.map((card) => {
                const isRevealed = revealedCards[card.id];
                const isSelected = selectedCards.find(c => c.id === card.id);
                
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      rotate: isShuffling ? (card.isReversed ? 180 : 0) : (card.isReversed && isRevealed ? 180 : 0),
                      y: isShuffling ? (card.id % 2 === 0 ? -8 : -10) : 0
                    }}
                    transition={{ 
                      duration: 0.5,
                      delay: isShuffling ? card.id * 0.1 : 0
                    }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => !isShuffling && handleSelectCard(card)}
                    className={`relative cursor-pointer ${
                      isSelected ? 'ring-4 ring-purple-500' : ''
                    }`}
                  >
                    {isRevealed ? (
                      <div className={`relative w-full h-[350px] bg-gradient-to-br ${card.color} rounded-lg p-4 flex flex-col items-center justify-center ${card.isReversed ? 'rotate-180' : ''}`}>
                        <card.icon className="w-24 h-24 text-white mb-4" />
                        <h3 className="text-white text-xl font-bold text-center">{card.name}</h3>
                        <p className="text-white text-sm mt-2 text-center">
                          {card.isReversed ? card.reversed : card.upright}
                        </p>
                      </div>
                    ) : (
                      <div className="relative w-full h-[350px] bg-gradient-to-br from-indigo-800 to-purple-900 rounded-lg p-4 flex flex-col items-center justify-center">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-full border-[12px] border-amber-600 rounded-lg flex items-center justify-center bg-indigo-900">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-purple-600 flex items-center justify-center">
                              <FaQuestion className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-indigo-950/80 pointer-events-none" />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-24 h-24 border-4 border-amber-500/50 rounded-full" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-40 h-40 border border-amber-500/30 rounded-full" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {isSelected && !isRevealed && (
                      <div className="absolute top-0 left-0 w-full h-full bg-purple-500/20 rounded-lg" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}

          {showReading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-indigo-900/50 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20"
            >
              <h2 className="text-2xl font-semibold text-white mb-6 text-center">Tu Lectura de Tarot</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {selectedCards.map((card, index) => {
                  const position = ["Pasado", "Presente", "Futuro"][index];
                  
                  return (
                    <div key={card.id} className="bg-indigo-800/30 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-purple-300 mb-3">{position}</h3>
                      <div className={`mb-4 w-full aspect-[2/3] rounded-lg overflow-hidden ${card.isReversed ? 'rotate-180' : ''}`}>
                        <div className={`h-full w-full bg-gradient-to-br ${card.color} rounded-lg p-4 flex flex-col items-center justify-center`}>
                          <card.icon className="w-16 h-16 text-white mb-2" />
                          <h4 className="text-white text-lg font-semibold text-center">{card.name}</h4>
                          <p className="text-white/80 text-xs text-center mt-1">{card.isReversed ? '(Invertida)' : '(Derecha)'}</p>
                        </div>
                      </div>
                      <p className="text-white text-sm mb-2">
                        <span className="font-semibold">Significado:</span> {card.isReversed ? card.reversed : card.upright}
                      </p>
                      <p className="text-gray-300 text-sm">
                        {card.isReversed ? card.detailed.reversed : card.detailed.upright}
                      </p>
                    </div>
                  );
                })}
              </div>
              
              {selectedCards.length === 3 && (
                <div className="mt-8 text-center">
                  <p className="text-purple-200 mb-6">
                    Esta lectura muestra tu viaje desde el pasado, a través del presente, y hacia el futuro. 
                    Reflexiona sobre cómo estas energías se manifiestan en tu vida.
                  </p>
                  <button
                    onClick={handleShuffleCards}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg inline-flex items-center transition-colors"
                  >
                    <FaRedo className="mr-2" />
                    Nueva Lectura
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}