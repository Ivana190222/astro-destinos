"use client";

import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-indigo-950/50 backdrop-blur-sm border-t border-purple-500/20 mt-6 md:mt-12 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <h3 className="text-xl font-bold text-purple-300">AstroDestinos</h3>
            <p className="text-gray-400 mt-1 md:mt-2 text-sm md:text-base">
              Tu guía en el viaje astrológico
            </p>
          </div>

          <div className="flex space-x-6 md:space-x-8">
            <a
              href="https://github.com/Ivana190222/astro-destinos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-300 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="text-xl md:text-2xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-300 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter className="text-xl md:text-2xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-300 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="text-xl md:text-2xl" />
            </a>
          </div>
        </div>

        <div className="mt-6 md:mt-8 text-center text-gray-400 text-xs md:text-sm">
          <p>© {new Date().getFullYear()} AstroDestinos. Todos los derechos reservados.</p>
        </div>
      </div>
    </motion.footer>
  );
} 