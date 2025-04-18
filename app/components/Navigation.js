"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHome, FaStar, FaHeart, FaBook, FaSun, FaMoon, FaHistory, FaBars, FaTimes } from 'react-icons/fa';

const navItems = [
  { href: '/', icon: FaHome, label: 'Inicio' },
  { href: '/carta-astral', icon: FaStar, label: 'Carta Astral' },
  { href: '/compatibilidad', icon: FaHeart, label: 'Compatibilidad' },
  { href: '/tarot', icon: FaBook, label: 'Tarot' },
  { href: '/horoscopo', icon: FaSun, label: 'Horóscopo' },
  { href: '/mitologia', icon: FaHistory, label: 'Mitología' },
  { href: '/rituales', icon: FaMoon, label: 'Rituales' }
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo o título para móvil */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-purple-300 hover:text-white transition-colors md:hidden">
              AstroDestinos
            </Link>
          </div>
          
          {/* Menú para escritorio */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-4 lg:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Botón de menú para móvil */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú para móvil */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-indigo-900/90 backdrop-blur-md"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:bg-purple-900/50 hover:text-white transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
} 