import React, { useState } from 'react';
import { ArrowRight, FileText, Play } from 'lucide-react';
import Hero3DCanvas from './Hero3DCanvas';
import { downloadResumeText } from '../data/resumeData';

export default function HeroSection() {
  const [terminalOutput, setTerminalOutput] = useState([
    { type: 'cmd',  text: '$ pytest tests/ -v --cov=ai_pipeline' },
    { type: 'pass', text: '  PASSED  test_ml_pipeline_output_validation' },
    { type: 'pass', text: '  PASSED  test_api_endpoint_schema_correctness' },
    { type: 'pass', text: '  PASSED  test_etl_data_quality_snowflake' },
    { type: 'info', text: '  3 passed in 1.42s — coverage: 91%' },
  ]);
  const [running, setRunning] = useState(false);

  const runCheck = () => {
    if (running) return;
    setRunning(true);
    setTerminalOutput([
      { type: 'cmd', text: '$ pytest tests/ -v --tb=short' },
    ]);

    const steps = [
      { delay: 400,  line: { type: 'info', text: '  collecting tests ...' } },
      { delay: 800,  line: { type: 'pass', text: '  PASSED  test_databricks_pipeline_assertions' } },
      { delay: 1200, line: { type: 'pass', text: '  PASSED  test_postman_api_schema_validation' } },
      { delay: 1600, line: { type: 'pass', text: '  PASSED  test_dashboard_data_correctness' } },
      { delay: 2000, line: { type: 'pass', text: '  PASSED  test_regression_pre_deployment_check' } },
      { delay: 2400, line: { type: 'info', text: '  4 passed in 2.07s  ✓  all green' } },
    ];

    steps.forEach(({ delay, line }) => {
      setTimeout(() => {
        setTerminalOutput(prev => [...prev, line]);
        if (delay === 2400) setRunning(false);
      }, delay);
    });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-16 flex items-center bg-[#070a11] overflow-hidden">
      <div className="absolute inset-0 scanline-grid opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-600/8 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: Content */}
          <div className="lg:col-span-7 space-y-7">

            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
              <span>open to work · nagpur, india (remote / relocation)</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-white leading-[1.1]">
                Hi, I'm <span className="text-emerald-400">Shantanu.</span>
              </h1>
              <p className="text-xl sm:text-2xl text-slate-300 font-light leading-snug">
                ML Engineer transitioning into<br />
                <span className="text-emerald-400 font-medium">AI Quality & Test Automation.</span>
              </p>
            </div>

            <div className="space-y-4 text-slate-400 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
              <p>
                I spent 4 months at <span className="text-slate-300 font-medium">DataObserve</span> building ML pipelines and an energy analytics dashboard — and an equal amount of time writing the automated tests that made sure those pipelines actually held up. That's when I realized QA for AI systems is genuinely its own discipline.
              </p>
              <p>
                Also: 5 patents, 2 published books on AI & Data Engineering, and 18+ GitHub repos. So yeah, I stay busy.
              </p>
            </div>

            {/* Stats from real resume */}
            <div className="flex flex-wrap gap-6 pt-1 text-sm font-mono">
              <div>
                <div className="text-emerald-400 font-bold text-xl">5</div>
                <div className="text-slate-500 text-xs mt-0.5">patents granted</div>
              </div>
              <div>
                <div className="text-cyan-400 font-bold text-xl">18+</div>
                <div className="text-slate-500 text-xs mt-0.5">public GitHub repos</div>
              </div>
              <div>
                <div className="text-amber-400 font-bold text-xl">8.5</div>
                <div className="text-slate-500 text-xs mt-0.5">CGPA @ VIT Bhopal</div>
              </div>
              <div>
                <div className="text-purple-400 font-bold text-xl">4 mo</div>
                <div className="text-slate-500 text-xs mt-0.5">DataObserve internship</div>
              </div>
            </div>

            {/* Terminal */}
            <div className="rounded-lg bg-[#040710] border border-white/8 overflow-hidden shadow-xl">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70"></span>
                  <span className="font-mono text-xs text-slate-600 ml-2">shantanu@dataobserve:~/pipeline-tests</span>
                </div>
                <button
                  onClick={runCheck}
                  disabled={running}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono text-emerald-400 border border-emerald-500/25 hover:border-emerald-400 hover:bg-emerald-500/8 transition-all disabled:opacity-40"
                >
                  <Play className="w-3 h-3" />
                  {running ? 'running...' : 'run tests'}
                </button>
              </div>
              <div className="p-4 font-mono text-xs space-y-1.5 min-h-[130px] max-h-[160px] overflow-y-auto">
                {terminalOutput.map((line, i) => (
                  <div key={i} className={
                    line.type === 'cmd'  ? 'text-slate-400' :
                    line.type === 'pass' ? 'text-emerald-400' :
                    'text-slate-500'
                  }>
                    {line.text}
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#what-i-test"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:scale-[1.02] active:scale-[0.98]"
              >
                see what I test
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={downloadResumeText}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm text-slate-300 border border-white/10 hover:border-white/25 hover:text-white transition-all"
              >
                <FileText className="w-4 h-4 text-slate-500" />
                resume
              </button>
            </div>
          </div>

          {/* Right: 3D Canvas */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#09111e]/50 border border-white/6 overflow-hidden">
              <div className="absolute top-3 left-4 z-10 flex items-center gap-2 font-mono text-[11px] text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 inline-block"></span>
                test coverage graph · 80 nodes
              </div>
              <Hero3DCanvas />
              <div className="px-4 py-3 bg-[#040710]/80 border-t border-white/5 font-mono text-[11px] text-slate-600 flex items-center justify-between">
                <span>R3F · Three.js · WebGL</span>
                <span>mouse reactive ↑</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
