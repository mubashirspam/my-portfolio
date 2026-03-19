'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Command {
  name: string;
  description: string;
  execute: () => string[];
}

const commands: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'Show available commands',
    execute: () => [
      'Available commands:',
      '  whoami     - About me',
      '  skills     - My technical skills',
      '  projects   - Featured projects',
      '  contact    - Get in touch',
      '  clear      - Clear terminal',
    ],
  },
  whoami: {
    name: 'whoami',
    description: 'About me',
    execute: () => [
      'Mubashir Ahmed',
      'Senior Flutter Engineer & Mobile Architect',
      'Kerala, India',
    ],
  },
  skills: {
    name: 'skills',
    description: 'My technical skills',
    execute: () => [
      'Core: Flutter, Dart, Clean Architecture',
      'State: BLoC, Riverpod, GetX',
      'Backend: Firebase, Supabase, Node.js',
      'Web: Next.js, React, TypeScript',
      'Experience: 6+ years',
    ],
  },
  projects: {
    name: 'projects',
    description: 'Featured projects',
    execute: () => [
      'Raasta Realty - Real estate platform',
      'Bishertalks - Community platform',
      'Marketing Nizam - Agency website',
      'Eduport - E-learning platform (600K+ downloads)',
    ],
  },
  contact: {
    name: 'contact',
    description: 'Get in touch',
    execute: () => [
      'Email: getmemubashir@gmail.com',
      'GitHub: github.com/mubashirspam',
      'LinkedIn: linkedin.com/in/mubashir-ahmad',
    ],
  },
};

export function InteractiveTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; content: string[] }>>([
    {
      type: 'output',
      content: [
        'Welcome to my terminal! 👋',
        'Type "help" to see available commands',
        'Try typing the first letter and press Tab for suggestions',
      ],
    },
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const updateSuggestions = (value: string) => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const matches = Object.keys(commands).filter((cmd) =>
      cmd.startsWith(value.toLowerCase())
    );
    setSuggestions(matches);
    setSelectedSuggestion(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    updateSuggestions(value);
  };

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setHistory((prev) => [...prev, { type: 'input', content: [trimmed] }]);

    if (trimmed === 'clear') {
      setHistory([]);
      setInput('');
      setSuggestions([]);
      return;
    }

    const command = commands[trimmed];
    if (command) {
      const output = command.execute();
      setHistory((prev) => [...prev, { type: 'output', content: output }]);
    } else {
      setHistory((prev) => [
        ...prev,
        { type: 'output', content: [`Command not found: ${trimmed}. Type "help" for available commands.`] },
      ]);
    }

    setInput('');
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(input);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[selectedSuggestion]);
        setSuggestions([]);
      }
    } else if (e.key === 'ArrowDown' && suggestions.length > 0) {
      e.preventDefault();
      setSelectedSuggestion((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp' && suggestions.length > 0) {
      e.preventDefault();
      setSelectedSuggestion((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const handleCommandClick = (cmd: string) => {
    executeCommand(cmd);
  };

  return (
    <div className="w-full">
      {/* Terminal Window Header - macOS Style */}
      <div className="bg-gradient-to-b from-slate-700 to-slate-800 rounded-t-2xl px-4 py-3 flex items-center justify-between border-b border-slate-600">
        <div className="flex items-center gap-3">
          {/* Traffic Light Buttons */}
          <button className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" aria-label="Close" />
          <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors" aria-label="Minimize" />
          <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" aria-label="Maximize" />
        </div>
        <div className="text-xs font-medium text-slate-300">Terminal</div>
        <div className="w-12" />
      </div>

      {/* Terminal Output */}
      <div
        ref={terminalRef}
        className="bg-[#1a1b26] px-6 py-4 font-mono text-sm text-slate-100 h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
      >
        <AnimatePresence>
          {history.map((entry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-3"
            >
              {entry.type === 'input' ? (
                <div className="flex items-center">
                  <span className="text-emerald-400 mr-2">➜</span>
                  <span className="text-slate-100">{entry.content[0]}</span>
                </div>
              ) : (
                <div className="ml-5 text-slate-300">
                  {entry.content.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="bg-[#16161e] rounded-b-2xl px-6 py-4 border-t border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-emerald-400 font-mono text-base">➜</span>
          <span className="text-slate-400 font-mono text-sm">portfolio</span>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a command..."
              className="w-full bg-transparent text-slate-100 font-mono text-sm outline-none placeholder-slate-500"
              autoFocus
            />

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute top-full left-0 mt-2 bg-slate-800 rounded-lg border border-slate-700 overflow-hidden z-50 w-full"
                >
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`w-full text-left px-4 py-2 font-mono text-sm transition-colors ${
                        idx === selectedSuggestion
                          ? 'bg-purple-600 text-white'
                          : 'text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <span className="text-emerald-400">{suggestion}</span>
                      <span className="text-slate-500 ml-2">
                        - {commands[suggestion].description}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Quick Commands */}
        <div className="flex flex-wrap gap-2">
          {Object.keys(commands).map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommandClick(cmd)}
              className="px-3 py-1.5 text-xs font-mono bg-slate-700 hover:bg-purple-600 text-slate-200 rounded transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
