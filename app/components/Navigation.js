"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHome, FaStar, FaHeart, FaBook, FaSun, FaMoon, FaHistory } from 'react-icons/fa';

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
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="flex items-center space-x-8">
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
      </div>
    </motion.nav>
  );
} 