import { motion } from 'framer-motion';
import { FaStar, FaExclamationTriangle } from 'react-icons/fa';

export default function AspectCard({ aspect }) {
  const { planets, type, interpretation, harmonic } = aspect;

  const aspectColors = {
    conjunction: 'from-blue-500 to-blue-600',
    opposition: 'from-red-500 to-red-600',
    trine: 'from-green-500 to-green-600',
    square: 'from-yellow-500 to-yellow-600',
    sextile: 'from-purple-500 to-purple-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg ${
        harmonic ? 'bg-green-900/50' : 'bg-red-900/50'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            harmonic ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            {harmonic ? (
              <FaStar className="text-green-400" />
            ) : (
              <FaExclamationTriangle className="text-red-400" />
            )}
          </div>
          <span className="font-semibold text-white">
            {planets[0]} - {planets[1]}
          </span>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          harmonic ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </div>
      
      <div className="relative">
        <div className={`absolute inset-0 bg-gradient-to-r ${aspectColors[type]} opacity-20 rounded-lg`} />
        <p className="relative text-purple-200">{interpretation}</p>
      </div>
    </motion.div>
  );
} 