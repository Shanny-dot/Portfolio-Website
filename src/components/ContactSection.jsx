import React, { useState } from 'react';
import { Mail, Download, Send, CheckCircle2, Terminal } from 'lucide-react';
import { downloadResumeText } from '../data/resumeData';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '', type: 'hiring' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSubmitted(true); }, 900);
  };

  return (
    <section id="contact" className="py-24 bg-[#05080e] relative border-t border-white/4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left: human copy */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <p className="font-mono text-xs text-emerald-400">get in touch</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Let's talk about<br />breaking AI together.
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed font-sans">
                I'm actively looking for AI Quality Engineering or Test Automation roles. Early in dedicated QA, yes — but I come with actual ML internals knowledge and a habit of automating things that were being done manually.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed font-sans">
                If that sounds useful, or you just want to nerd out about LLM evaluation methodology, drop me a line.
              </p>
            </div>

            {/* Links — minimal, honest */}
            <div className="space-y-2.5 font-mono text-sm">
              <a
                href="mailto:shantanu.fadnavis@gmail.com"
                className="flex items-center gap-3 p-3 rounded-lg bg-[#0b1220] border border-white/6 hover:border-white/12 transition-colors text-slate-300 hover:text-white group"
              >
                <Mail className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                <span>shantanufadnavis@protonmail.com</span>
              </a>
              <a
                href="https://github.com/Shanny-dot"
                target="_blank" rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-[#0b1220] border border-white/6 hover:border-white/12 transition-colors text-slate-300 hover:text-white group"
              >
                <GithubIcon className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                <span>github.com/Shanny-dot</span>
              </a>
              <a
                href="https://linkedin.com/in/shantanufadnavis"
                target="_blank" rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-[#0b1220] border border-white/6 hover:border-white/12 transition-colors text-slate-300 hover:text-white group"
              >
                <LinkedinIcon className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                <span>linkedin.com/in/shantanufadnavis</span>
              </a>
              <button
                onClick={downloadResumeText}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-[#0b1220] border border-white/6 hover:border-emerald-500/30 transition-colors text-slate-300 hover:text-white group text-left font-mono text-sm"
              >
                <Download className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                <span>download resume</span>
              </button>
            </div>

            {/* Witty but understated */}
            <p className="text-xs text-slate-600 font-mono italic">
              "No bugs were harmed in the making of this site. A few NaNs were."
            </p>
          </div>

          {/* Right: form — looks like a terminal, not Salesforce */}
          <div className="lg:col-span-6">
            <div className="rounded-xl bg-[#080f1c] border border-white/6 overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 font-mono text-xs text-slate-500">
                <Terminal className="w-3.5 h-3.5" />
                <span>shantanu@contact:~$</span>
              </div>

              <div className="p-5">
                {submitted ? (
                  <div className="py-10 text-center space-y-3">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <p className="font-mono text-sm text-emerald-400">message sent.</p>
                    <p className="text-slate-400 text-xs font-sans">I'll reply within a day or two. Not via autoresponder.</p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '', type: 'hiring' }); }}
                      className="text-xs font-mono text-slate-500 hover:text-slate-300 underline mt-2"
                    >
                      send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                    <div>
                      <label className="block text-slate-500 mb-1.5">name / org</label>
                      <input
                        type="text" required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="who's reaching out?"
                        className="w-full p-2.5 rounded-lg bg-[#04070e] border border-white/6 text-slate-200 focus:border-emerald-500/50 focus:outline-none placeholder:text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1.5">email</label>
                      <input
                        type="email" required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="where do I reply?"
                        className="w-full p-2.5 rounded-lg bg-[#04070e] border border-white/6 text-slate-200 focus:border-emerald-500/50 focus:outline-none placeholder:text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1.5">what's on your mind?</label>
                      <select
                        value={form.type}
                        onChange={e => setForm({ ...form, type: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-[#04070e] border border-white/6 text-slate-400 focus:border-emerald-500/50 focus:outline-none mb-3"
                      >
                        <option value="hiring">hiring / open role</option>
                        <option value="audit">want to audit my AI system</option>
                        <option value="chat">just want to talk</option>
                      </select>
                      <textarea
                        rows="4" required
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        placeholder="what are you working on? what's the QA challenge?"
                        className="w-full p-2.5 rounded-lg bg-[#04070e] border border-white/6 text-slate-200 focus:border-emerald-500/50 focus:outline-none resize-none placeholder:text-slate-700"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      {sending ? 'sending...' : 'send message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/4 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-700 gap-3">
          <span>shantanu fadnavis · 2026</span>
          <span>react + three.js + tailwind v4</span>
        </div>
      </div>
    </section>
  );
}
