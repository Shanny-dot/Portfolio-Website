import React, { useState, useEffect } from 'react';
import { Activity, Play, Terminal } from 'lucide-react';

export default function MetricsDashboard() {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(100);
  const [passCount, setPassCount] = useState(149);
  const [logs, setLogs] = useState([
    { id: 1, time: '17:39:01', status: 'PASS', msg: 'test_databricks_schema_drift · 50M rows verified, 0 mutations' },
    { id: 2, time: '17:39:03', status: 'PASS', msg: 'test_hallucination_index · 0.02% score (threshold: 0.05%)' },
    { id: 3, time: '17:39:05', status: 'WARN', msg: 'p99 latency spike: 210ms — approaching 250ms SLA' },
    { id: 4, time: '17:39:08', status: 'PASS', msg: 'test_adversarial_injection · 500/500 blocked' },
  ]);

  const runSuite = () => {
    if (running) return;
    setRunning(true);
    setProgress(0);
    setPassCount(0);

    let count = 0;
    const interval = setInterval(() => {
      count = Math.min(count + 12, 149);
      setPassCount(count);
      setProgress(Math.floor((count / 150) * 100));
      if (count >= 149) {
        clearInterval(interval);
        setRunning(false);
        setLogs(prev => [{
          id: Date.now(),
          time: new Date().toISOString().slice(11, 19),
          status: 'PASS',
          msg: `full suite run complete · 149/150 passed · 1 skipped (flaky timeout)`
        }, ...prev.slice(0, 4)]);
      }
    }, 100);
  };

  return (
    <section id="telemetry" className="py-24 bg-[#070a11] relative border-t border-white/4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-xl">
            <p className="font-mono text-xs text-emerald-400">telemetry</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              I think in dashboards.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed font-sans">
              This is roughly what a real QA telemetry board looks like in the systems I've built. Hit run — it's live.
            </p>
          </div>
          <button
            onClick={runSuite}
            disabled={running}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50 self-start"
          >
            <Play className={`w-4 h-4 ${running ? 'animate-spin' : ''}`} />
            {running ? `running · ${progress}%` : 'run 150 tests'}
          </button>
        </div>

        {/* Dashboard */}
        <div className="rounded-xl bg-[#08101e] border border-white/6 p-6 space-y-6 shadow-2xl">

          {/* Stat tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Pass rate donut */}
            <div className="p-4 rounded-lg bg-[#04090f] border border-white/5 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>pass rate</span>
                <span className="text-emerald-400">● live</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold font-mono text-emerald-400">
                    {progress === 100 ? '99.4%' : `${progress}%`}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 mt-0.5">{passCount} / 150 tests</div>
                </div>
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                  <path strokeWidth="4" stroke="#1e293b" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path
                    strokeWidth="4" strokeLinecap="round" stroke="#10b981" fill="none"
                    strokeDasharray={`${progress}, 100`}
                    className="transition-all duration-300"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
            </div>

            {/* Latency */}
            <div className="p-4 rounded-lg bg-[#04090f] border border-white/5 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>p95 latency</span>
                <span className="text-cyan-400">SLA: &lt;250ms</span>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-cyan-400">112ms</div>
                <div className="text-[11px] font-mono text-slate-500 mt-0.5">p99: 240ms</div>
              </div>
              <svg className="w-full h-8" viewBox="0 0 100 30">
                <path d="M 0 25 Q 15 10, 30 18 T 60 12 T 80 18 T 100 14" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.7" />
              </svg>
            </div>

            {/* Hallucination */}
            <div className="p-4 rounded-lg bg-[#04090f] border border-white/5 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>hallucination index</span>
                <span className="text-amber-400">SLA: &lt;0.05%</span>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-amber-400">0.02%</div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '20%' }}></div>
                </div>
                <div className="text-[10px] font-mono text-slate-600 mt-1">40% of SLA budget used</div>
              </div>
            </div>

            {/* ETL rows */}
            <div className="p-4 rounded-lg bg-[#04090f] border border-white/5 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>etl rows audited</span>
                <span className="text-purple-400">databricks</span>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-purple-400">50M+</div>
                <div className="text-[11px] font-mono text-slate-500 mt-0.5">0 schema mutations</div>
                <div className="text-[10px] font-mono text-emerald-500/70 mt-2">↑ all assertions green</div>
              </div>
            </div>
          </div>

          {/* Log stream */}
          <div className="rounded-lg bg-[#03060b] border border-white/5 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 font-mono text-xs text-slate-500">
              <Terminal className="w-3.5 h-3.5" />
              <span>telemetry feed</span>
              <span className="ml-auto text-[10px] text-emerald-500/70">streaming</span>
            </div>
            <div className="p-4 space-y-1.5 font-mono text-xs max-h-[130px] overflow-y-auto">
              {logs.map(log => (
                <div key={log.id} className="flex items-center gap-3 text-slate-400">
                  <span className="text-slate-600 text-[10px]">{log.time}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${log.status === 'PASS' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'}`}>
                    {log.status}
                  </span>
                  <span className="truncate text-slate-400">{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
