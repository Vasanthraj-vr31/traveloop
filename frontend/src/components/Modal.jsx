import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, size = 'md', footer }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[1400px]',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#1F241D]/40 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className={`relative bg-[#F7F5EF] rounded-[48px] shadow-editorial w-full ${sizes[size]} max-h-[90vh] flex flex-col z-10 border border-[#CBD3C7]/30 overflow-hidden`}
          >
            <div className="flex items-center justify-between p-10 border-b border-[#CBD3C7]/20">
              <h2 className="editorial-title text-3xl font-black text-[#1F241D] tracking-tighter italic">{title}</h2>
              <button
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-[#EEF1EA] hover:bg-[#DDE3DC] transition-all text-[#1F241D]/50 hover:text-[#1F241D]"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="overflow-y-auto flex-1 p-10 hide-scrollbar">{children}</div>
            
            {footer && (
              <div className="p-10 border-t border-[#CBD3C7]/20 flex items-center justify-end gap-4 bg-[#EEF1EA]/30">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
