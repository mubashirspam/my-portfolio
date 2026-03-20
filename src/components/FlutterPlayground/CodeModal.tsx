'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { FlutterProject } from '@/data/flutterProjects';

interface CodeModalProps {
  project: FlutterProject | null;
  onClose: () => void;
}

export function CodeModal({ project, onClose }: CodeModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (project) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, handleKeyDown]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl max-h-[85vh] rounded-2xl border border-border bg-[#1e1e2e] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm font-mono text-gray-400">
                  {project.id}.dart
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors text-lg leading-none"
              >
                &times;
              </button>
            </div>

            {/* Code */}
            <div className="overflow-auto flex-1">
              <SyntaxHighlighter
                language="dart"
                style={oneDark}
                customStyle={{
                  margin: 0,
                  padding: '1.25rem',
                  background: 'transparent',
                  fontSize: '0.8rem',
                  lineHeight: '1.6',
                }}
                showLineNumbers
                lineNumberStyle={{ color: '#4a5568', marginRight: '1rem' }}
              >
                {project.flutterCode}
              </SyntaxHighlighter>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-border flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {project.title} — Flutter/Dart Implementation
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(project.flutterCode)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-accent-subtle text-accent border border-accent hover:bg-accent hover:text-white transition-colors"
              >
                Copy Code
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
