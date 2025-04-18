"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaStar, FaBook, FaHistory } from "react-icons/fa";

const zodiacMyths = [
  {
    sign: "Aries",
    symbol: "♈",
    element: "Fuego",
    myth: "El carnero dorado de la mitología griega que salvó a Frixo y Hele. Su vellocino de oro fue buscado por Jasón y los Argonautas.",
    meaning: "Representa el coraje, la iniciativa y el espíritu pionero. Simboliza el comienzo de la primavera y la renovación de la vida.",
    image: "/zodiac/aries.jpg",
    color: "from-red-500 to-orange-500"
  },
  {
    sign: "Tauro",
    symbol: "♉",
    element: "Tierra",
    myth: "Representa al toro blanco en el que Zeus se transformó para raptar a Europa. También está relacionado con el Minotauro de Creta.",
    meaning: "Simboliza la fuerza, la estabilidad y la determinación. Representa la conexión con la tierra y la naturaleza.",
    image: "/zodiac/taurus.jpg",
    color: "from-green-500 to-emerald-500"
  },
  {
    sign: "Géminis",
    symbol: "♊",
    element: "Aire",
    myth: "Representa a los gemelos Cástor y Pólux, hijos de Zeus. Su historia simboliza la dualidad y la inmortalidad del alma.",
    meaning: "Simboliza la dualidad, la comunicación y la adaptabilidad. Representa la conexión entre el mundo material y espiritual.",
    image: "/zodiac/gemini.jpg",
    color: "from-yellow-500 to-amber-500"
  },
  {
    sign: "Cáncer",
    symbol: "♋",
    element: "Agua",
    myth: "El cangrejo enviado por Hera para distraer a Hércules durante su lucha con la Hidra. Fue inmortalizado en el cielo por su valentía.",
    meaning: "Representa la protección, la intuición y las emociones profundas. Simboliza el hogar y la familia.",
    image: "/zodiac/cancer.jpg",
    color: "from-blue-500 to-cyan-500"
  },
  {
    sign: "Leo",
    symbol: "♌",
    element: "Fuego",
    myth: "El león de Nemea, una bestia invulnerable que fue derrotada por Hércules en su primer trabajo. Su piel se convirtió en su armadura.",
    meaning: "Simboliza el poder, la creatividad y el liderazgo. Representa la fuerza del sol y la vitalidad.",
    image: "/zodiac/leo.jpg",
    color: "from-orange-500 to-yellow-500"
  },
  {
    sign: "Virgo",
    symbol: "♍",
    element: "Tierra",
    myth: "Representa a Astrea, la diosa de la justicia y la pureza, que fue la última inmortal en abandonar la Tierra durante la Edad de Hierro.",
    meaning: "Simboliza la perfección, el servicio y la sabiduría práctica. Representa la cosecha y la abundancia.",
    image: "/zodiac/virgo.jpg",
    color: "from-green-500 to-teal-500"
  },
  {
    sign: "Libra",
    symbol: "♎",
    element: "Aire",
    myth: "Representa la balanza de Astrea, diosa de la justicia. También está asociado con Temis, la diosa de la ley y el orden.",
    meaning: "Simboliza el equilibrio, la justicia y la armonía. Representa la búsqueda de la verdad y la equidad.",
    image: "/zodiac/libra.jpg",
    color: "from-pink-500 to-rose-500"
  },
  {
    sign: "Escorpio",
    symbol: "♏",
    element: "Agua",
    myth: "El escorpión enviado por Artemisa para matar a Orión. Su historia representa la transformación y el renacimiento.",
    meaning: "Simboliza la transformación, la pasión y la intensidad. Representa el ciclo de muerte y renacimiento.",
    image: "/zodiac/scorpio.jpg",
    color: "from-red-500 to-purple-500"
  },
  {
    sign: "Sagitario",
    symbol: "♐",
    element: "Fuego",
    myth: "Representa al centauro Quirón, el más sabio de los centauros, maestro de héroes como Aquiles y Jasón.",
    meaning: "Simboliza la sabiduría, la aventura y la búsqueda de la verdad. Representa el viaje espiritual.",
    image: "/zodiac/sagittarius.jpg",
    color: "from-purple-500 to-indigo-500"
  },
  {
    sign: "Capricornio",
    symbol: "♑",
    element: "Tierra",
    myth: "Representa a Amaltea, la cabra que amamantó a Zeus. También está asociado con Pan, el dios de la naturaleza.",
    meaning: "Simboliza la ambición, la disciplina y la perseverancia. Representa la escalada hacia el éxito.",
    image: "/zodiac/capricorn.jpg",
    color: "from-gray-500 to-slate-500"
  },
  {
    sign: "Acuario",
    symbol: "♒",
    element: "Aire",
    myth: "Representa a Ganimedes, el copero de los dioses, que fue llevado al Olimpo por Zeus en forma de águila.",
    meaning: "Simboliza la innovación, la humanidad y la libertad. Representa el flujo de ideas y conocimientos.",
    image: "/zodiac/aquarius.jpg",
    color: "from-blue-500 to-sky-500"
  },
  {
    sign: "Piscis",
    symbol: "♓",
    element: "Agua",
    myth: "Representa a los peces que salvaron a Afrodita y Eros de Tifón. Están unidos por un cordón dorado.",
    meaning: "Simboliza la compasión, la intuición y la espiritualidad. Representa la conexión con el inconsciente.",
    image: "/zodiac/pisces.jpg",
    color: "from-indigo-500 to-violet-500"
  }
];

export default function MythologyPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-purple-300 mb-4">Mitología Zodiacal</h1>
          <p className="text-gray-300 text-lg">
            Descubre las fascinantes historias mitológicas detrás de cada signo zodiacal
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {zodiacMyths.map((sign, index) => (
            <motion.div
              key={sign.sign}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-indigo-950/50 backdrop-blur-sm rounded-lg overflow-hidden border border-purple-500/20"
            >
              <div className="relative h-48">
                <Image
                  src={sign.image}
                  alt={sign.sign}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-950/80" />
                <div className="absolute bottom-4 left-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${sign.color} text-white text-sm font-medium`}>
                    <span className="text-lg mr-2">{sign.symbol}</span>
                    {sign.sign}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex items-center text-gray-400 mr-4">
                    <FaBook className="mr-2" />
                    <span>{sign.element}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FaHistory className="mr-2" />
                    <span>Mitología</span>
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-white mb-2">La Historia</h2>
                <p className="text-gray-300 mb-4">{sign.myth}</p>

                <h2 className="text-xl font-semibold text-white mb-2">Significado</h2>
                <p className="text-gray-300">{sign.meaning}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 