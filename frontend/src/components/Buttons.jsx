import React from 'react';
import { motion } from 'framer-motion';

// Primary Button - Deep Olive Luxury
export const BtnPrimary = ({ children, onClick, className = '', icon: Icon, loading = false, type = 'button' }) => (
  <motion.button
    type={type}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    disabled={loading}
    className={`flex items-center justify-center gap-3 px-10 py-4 rounded-full font-black text-[11px] text-[#F8F4EA] transition-all
      bg-[#263322] shadow-xl shadow-gray-400/20 disabled:opacity-60 disabled:cursor-not-allowed uppercase tracking-[0.25em] ${className}`}
  >
    {loading ? (
      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    ) : Icon ? <Icon size={14} strokeWidth={3} /> : null}
    {children}
  </motion.button>
);

// Secondary Button - Bali Border Style
export const BtnSecondary = ({ children, onClick, className = '', icon: Icon }) => (
  <motion.button
    whileHover={{ scale: 1.05, backgroundColor: '#26332210' }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`flex items-center justify-center gap-3 px-10 py-4 rounded-full font-black text-[11px] text-[#263322] 
      bg-transparent border-2 border-[#263322] transition-all uppercase tracking-[0.2em] ${className}`}
  >
    {Icon && <Icon size={14} strokeWidth={3} />}
    {children}
  </motion.button>
);

// Ghost / Minimal Sage
export const BtnGhost = ({ children, onClick, className = '', icon: Icon }) => (
  <motion.button
    whileHover={{ scale: 1.05, color: '#3F4F37' }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`flex items-center justify-center gap-2 px-5 py-2 rounded-full font-black text-[9px] text-[#6F756B] 
      transition-all uppercase tracking-[0.2em] ${className}`}
  >
    {Icon && <Icon size={12} strokeWidth={3} />}
    {children}
  </motion.button>
);

// Highlight / Sage Earthly CTA
export const BtnHighlight = ({ children, onClick, className = '', icon: Icon }) => (
  <motion.button
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`flex items-center justify-center gap-3 px-10 py-4 rounded-full font-black text-[11px] text-[#F8F4EA]
      bg-[#3F4F37] transition-all shadow-xl shadow-[#3F4F37]/20 uppercase tracking-[0.25em] ${className}`}
  >
    {Icon && <Icon size={14} strokeWidth={3} />}
    {children}
  </motion.button>
);
