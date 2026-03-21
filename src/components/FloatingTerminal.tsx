'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X } from 'lucide-react';
import { InteractiveTerminal } from '@/components/hero/InteractiveTerminal';

export function FloatingTerminal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.4 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 liquid-glass w-14 h-14 rounded-2xl flex items-center justify-center text-foreground hover:scale-105 transition-transform shadow-lg group"
        aria-label="Open terminal"
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <Terminal className="w-6 h-6 group-hover:text-accent transition-colors" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-2xl border border-accent/30 animate-ping opacity-20" />
      </motion.button>

      {/* Terminal Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setIsOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Terminal window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-full max-w-4xl h-[75vh] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close terminal"
              >
                <X className="w-4 h-4" />
              </button>

              <InteractiveTerminal />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
