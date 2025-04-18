"use client";

import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-indigo-950/50 backdrop-blur-sm border-t border-purple-500/20 mt-12 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-purple-300">AstroDestinos</h3>
            <p className="text-gray-400 mt-2">
              Tu guía en el viaje astrológico
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-300 transition-colors"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-300 transition-colors"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-300 transition-colors"
            >
              <FaInstagram className="text-2xl" />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} AstroDestinos. Todos los derechos reservados.</p>
        </div>
      </div>
    </motion.footer>
  );
} 