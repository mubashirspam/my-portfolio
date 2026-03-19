'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type TerminalStep } from './terminal-data';

interface TerminalLineProps {
  step: TerminalStep;
  isActive: boolean;
  isCompleted: boolean;
  isTyping: boolean;
  prefersReducedMotion: boolean;
}

export function TerminalLine({
  step,
  isActive,
  isCompleted,
  isTyping,
  prefersReducedMotion,
}: TerminalLineProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [showOutput, setShowOutput] = useState(false);

  // Typing effect for commands
  useEffect(() => {
    if (!isActive || step.type !== 'command') return;

    if (prefersReducedMotion) {
      setDisplayedText(step.content);
      return;
    }

    let currentIndex = 0;
    const text = step.content;

    const typeInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50 + Math.random() * 30);

    return () => clearInterval(typeInterval);
  }, [isActive, step, prefersReducedMotion]);

  // Show output after command is typed
  useEffect(() => {
    if (isCompleted && step.type === 'command') {
      const timer = setTimeout(
        () => setShowOutput(true),
        prefersReducedMotion ? 0 : 100
      );
      return () => clearTimeout(timer);
    }
  }, [isCompleted, step.type, prefersReducedMotion]);

  // Reset when not active
  useEffect(() => {
    if (!isActive && !isCompleted) {
      setDisplayedText('');
      setShowOutput(false);
    }
  }, [isActive, isCompleted]);

  if (!isActive && !isCompleted) return null;

  return (
    <div className="mb-1">
      {/* Command line */}
      <div className="flex items-center">
        <span className="text-emerald-400 mr-2 select-none">&#10095;</span>
        <span className="text-slate-100">
          {isCompleted ? step.content : displayedText}
        </span>
        {isTyping && !isCompleted && (
          <span className="inline-block w-2 h-5 bg-slate-300 ml-0.5 animate-pulse" />
        )}
      </div>

      {/* Output lines */}
      <AnimatePresence>
        {showOutput && step.output && (
          <motion.div
            initial={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -5 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-2 ml-5"
          >
            {step.output.map((line, index) => (
              <motion.div
                key={index}
                initial={
                  prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -10 }
                }
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: prefersReducedMotion ? 0 : index * 0.1,
                  ease: 'easeOut',
                }}
              >
                <OutputLine line={line} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OutputLine({
  line,
}: {
  line: TerminalStep['output'][number];
}) {
  const colorClasses: Record<string, string> = {
    green: 'text-emerald-400',
    blue: 'text-sky-400',
    yellow: 'text-amber-400',
    purple: 'text-purple-400',
    gray: 'text-slate-400',
    white: 'text-slate-100',
    cyan: 'text-cyan-400',
  };

  if (line.isJson) {
    return (
      <pre className="text-sm leading-relaxed">
        <SyntaxHighlightedJson content={line.content} />
      </pre>
    );
  }

  return (
    <div className={`${colorClasses[line.color || 'white']} leading-relaxed`}>
      {line.content}
    </div>
  );
}

function SyntaxHighlightedJson({ content }: { content: string }) {
  const highlighted = content
    .replace(/"([^"]+)":/g, '<span class="text-purple-400">"$1"</span>:')
    .replace(/: "([^"]+)"/g, ': <span class="text-emerald-400">"$1"</span>')
    .replace(/: (\d+)/g, ': <span class="text-amber-400">$1</span>')
    .replace(/\[([^\]]+)\]/g, (_match, inner) => {
      const items = inner
        .split(',')
        .map(
          (item: string) =>
            `<span class="text-emerald-400">${item.trim()}</span>`
        )
        .join(', ');
      return `[${items}]`;
    });

  return (
    <code
      className="text-slate-300"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
}
