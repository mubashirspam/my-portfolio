'use client';

import { ReactNode } from 'react';

interface TerminalWindowProps {
  children: ReactNode;
  title?: string;
}

export function TerminalWindow({
  children,
  title = 'mubashir@portfolio',
}: TerminalWindowProps) {
  return (
    <div className="relative group">
      {/* Glow effect on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

      {/* Terminal container */}
      <div className="relative bg-terminal-bg rounded-xl overflow-hidden shadow-2xl shadow-slate-900/20 border border-slate-700/50">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-terminal-header border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-slate-500 font-mono">
              {title} &mdash; zsh
            </span>
          </div>
          <div className="w-14" />
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 font-mono text-sm sm:text-base min-h-[320px] sm:min-h-[380px]">
          {children}
        </div>
      </div>
    </div>
  );
}
