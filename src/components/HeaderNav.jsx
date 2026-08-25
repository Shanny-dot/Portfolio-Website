import React, { useState, useEffect } from 'react';
import { Terminal, Download, Activity, Menu, X } from 'lucide-react';
import { downloadResumeText } from '../data/resumeData';

export default function HeaderNav() {
  const [timeStr, setTimeStr] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toISOString().slice(11, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'what i test', href: '#what-i-test' },
    { label: 'bug hunt', href: '#bug-hunt' },
    { label: 'toolkit', href: '#toolkit' },
    { label: 'projects', href: '#projects' },
    { label: 'telemetry', href: '#telemetry' },
    { label: 'contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#070a11]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-colors">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white tracking-wide font-mono">shantanu.fadnavis</div>
              <div className="text-[11px] text-slate-500 font-mono hidden sm:block">ml → ai quality</div>
            </div>
          </a>

          {/* Ticker — just clean, no shouting */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-slate-500 border-x border-white/5 px-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
              <span className="text-emerald-400">systems ok</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-slate-600" />
              <span>{timeStr || '--:--:-- UTC'}</span>
            </div>
          </div>

          {/* Nav links — lower case, less aggressive */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-slate-400">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-emerald-400 transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Resume CTA */}
          <div className="hidden md:flex items-center">
            <button
              onClick={downloadResumeText}
              className="flex items-center gap-2 px-3 py-1.5 rounded font-mono text-xs text-emerald-400 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-500/10 transition-all"
            >
              <Download className="w-3 h-3" />
              resume
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="flex md:hidden p-2 text-slate-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0e1a] border-b border-white/5 px-4 py-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-2 border-b border-white/5">
            <span className="text-emerald-400">● online</span>
            <span>{timeStr}</span>
          </div>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-mono text-slate-300 hover:text-emerald-400 py-1.5"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/5">
            <button
              onClick={() => { downloadResumeText(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded font-mono text-xs text-emerald-400 border border-emerald-500/30"
            >
              <Download className="w-3.5 h-3.5" />
              download resume
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
