import React, { useState } from 'react';
import { Database, Sparkles, Activity, RefreshCw } from 'lucide-react';

export default function WhatITestSection() {
  const [flippedCards, setFlippedCards] = useState({ 1: false, 2: false, 3: false });
  const [activePrompt, setActivePrompt] = useState(0);
  const [anomalyValue, setAnomalyValue] = useState(1.2);

  const toggleFlip = (id) => setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));

  const samplePrompts = [
    { prompt: "GET /api/dashboard/energy?date=2026-01-32", score: "400", verdict: "CAUGHT", reason: "Invalid date param. This slipped through the client's own validation. Postman collection caught it on day one." },
    { prompt: "GET /api/dashboard/energy?date=2026-01-15", score: "200", verdict: "PASSED", reason: "Valid request, response matches expected schema — device_id, timestamp, kwh_reading all present." },
    { prompt: "POST /api/ingest with 0-byte payload", score: "500", verdict: "CAUGHT", reason: "Server crashed instead of returning 400. Logged as P1. Fixed before client demo." }
  ];

  return (
    <section id="what-i-test" className="py-24 bg-[#070a11] relative border-t border-white/4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-2xl mb-14 space-y-3">
          <p className="font-mono text-xs text-emerald-400">what i actually test</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Not unit tests. The hard stuff.
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed font-sans">
            Three areas from my actual internship at DataObserve — click the cards to see what the work really looked like.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* CARD 1: ML Pipeline Validation */}
          <div className="perspective-1000 min-h-[420px]">
            <div
              className={`relative w-full h-full duration-500 transform-style-3d transition-transform cursor-pointer ${flippedCards[1] ? 'rotate-y-180' : ''}`}
              onClick={() => toggleFlip(1)}
            >
              {/* FRONT */}
              <div className="absolute inset-0 w-full h-full rounded-xl p-6 flex flex-col justify-between backface-hidden bg-[#0b1220] border border-white/6 hover:border-emerald-500/30 transition-colors">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Database className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] text-slate-500">01 · DataObserve</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">ML Pipeline & ETL Validation</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Snowflake + Databricks ETL pipelines for a US energy client. Wrote pytest scripts to validate ML model output and pipeline data quality before each deployment — automated what was previously done manually per-run.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['Pytest', 'Snowflake', 'Databricks', 'Data Validation', 'Python'].map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-slate-900/80 text-slate-400 border border-white/5">{t}</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs font-mono text-slate-600 pt-4 border-t border-white/5">flip to see how it worked →</p>
              </div>

              {/* BACK */}
              <div className="absolute inset-0 w-full h-full rounded-xl p-6 flex flex-col justify-between backface-hidden rotate-y-180 bg-[#0b1a12] border border-emerald-500/30">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="font-mono text-xs text-emerald-400 font-semibold">DataObserve · energy analytics pipeline</span>
                    <span className="text-[10px] font-mono text-slate-500">pre-deployment</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Each ETL run loaded data from Databricks into Snowflake tables powering the dashboard. Before I joined, validation was manual spot-checks. I added an automated pytest suite that ran assertions on every batch — row counts, null rates, schema conformance — before the data was considered "clean."
                  </p>
                  <pre className="p-3 bg-[#04070e] rounded border border-white/5 text-[11px] font-mono text-emerald-400 leading-relaxed overflow-x-auto">{`# Pre-deployment data quality gate
def test_pipeline_output_integrity(snowflake_conn):
    df = snowflake_conn.query(
        "SELECT * FROM energy_readings LIMIT 10000"
    )
    assert df['kwh_reading'].notna().all()
    assert df['device_id'].nunique() > 0
    assert (df['timestamp'] > '2025-01-01').all()`}</pre>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-3 border-t border-white/5">
                  <span>reduced defects reaching prod</span>
                  <span className="text-emerald-400">← flip back</span>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: API Testing */}
          <div className="perspective-1000 min-h-[420px]">
            <div
              className={`relative w-full h-full duration-500 transform-style-3d transition-transform cursor-pointer ${flippedCards[2] ? 'rotate-y-180' : ''}`}
              onClick={() => toggleFlip(2)}
            >
              {/* FRONT */}
              <div className="absolute inset-0 w-full h-full rounded-xl p-6 flex flex-col justify-between backface-hidden bg-[#0b1220] border border-white/6 hover:border-cyan-500/30 transition-colors">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] text-slate-500">02 · DataObserve</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">API Endpoint Validation</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Built and ran Postman test collections against the client-facing dashboard's API layer. Validated response schemas, error codes, auth flows, and edge cases — things that look fine in happy-path testing but fail under real conditions.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['Postman', 'REST API', 'Schema Validation', 'Edge Cases', 'Bug Triage'].map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-slate-900/80 text-slate-400 border border-white/5">{t}</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs font-mono text-slate-600 pt-4 border-t border-white/5">flip to test the API validator →</p>
              </div>

              {/* BACK — interactive API tester */}
              <div className="absolute inset-0 w-full h-full rounded-xl p-6 flex flex-col justify-between backface-hidden rotate-y-180 bg-[#0b1620] border border-cyan-500/30">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="font-mono text-xs text-cyan-400 font-semibold">API edge case simulator</span>
                    <span className="text-[10px] font-mono text-slate-500">Postman-style</span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-500 mb-1">pick a test request:</p>
                  <div className="space-y-1" onClick={e => e.stopPropagation()}>
                    {samplePrompts.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePrompt(idx)}
                        className={`w-full text-left p-2 rounded text-[11px] font-mono border transition-colors truncate ${activePrompt === idx ? 'bg-cyan-500/15 border-cyan-400/50 text-cyan-200' : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200'}`}
                      >
                        {p.prompt}
                      </button>
                    ))}
                    <div className="p-2.5 bg-[#030810] rounded border border-white/5 font-mono text-[11px] space-y-1.5 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">HTTP status:</span>
                        <span className={samplePrompts[activePrompt].score === '200' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                          {samplePrompts[activePrompt].score}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">verdict:</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${samplePrompts[activePrompt].verdict === 'PASSED' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'}`}>
                          {samplePrompts[activePrompt].verdict}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 pt-1">{samplePrompts[activePrompt].reason}</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs font-mono text-cyan-400 pt-3 border-t border-white/5 text-right">← flip back</p>
              </div>
            </div>
          </div>

          {/* CARD 3: LLM & AI Output Testing */}
          <div className="perspective-1000 min-h-[420px]">
            <div
              className={`relative w-full h-full duration-500 transform-style-3d transition-transform cursor-pointer ${flippedCards[3] ? 'rotate-y-180' : ''}`}
              onClick={() => toggleFlip(3)}
            >
              {/* FRONT */}
              <div className="absolute inset-0 w-full h-full rounded-xl p-6 flex flex-col justify-between backface-hidden bg-[#0b1220] border border-white/6 hover:border-amber-500/30 transition-colors">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                      <Activity className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] text-slate-500">03 · Projects</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">LLM Output Quality Evaluation</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Testing non-deterministic AI outputs on personal projects. How do you put a number on "does this model's answer make sense?" — benchmarks, evaluation suites, and manual review all have a role.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['NLP Benchmarks', 'Prompt Engineering', 'Model Evaluation', 'Output Consistency', 'LLMs'].map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-slate-900/80 text-slate-400 border border-white/5">{t}</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs font-mono text-slate-600 pt-4 border-t border-white/5">flip to see the drift concept →</p>
              </div>

              {/* BACK */}
              <div className="absolute inset-0 w-full h-full rounded-xl p-6 flex flex-col justify-between backface-hidden rotate-y-180 bg-[#19130a] border border-amber-500/30">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="font-mono text-xs text-amber-400 font-semibold">model quality drift detector</span>
                    <span className="text-[10px] font-mono text-slate-500">SneakerHeadLM</span>
                  </div>
                  <div className="space-y-3" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between font-mono text-xs">
                      <span className="text-slate-400">output quality deviation (σ):</span>
                      <span className={`font-bold ${anomalyValue > 2.5 ? 'text-rose-400' : 'text-emerald-400'}`}>{anomalyValue}σ</span>
                    </div>
                    <input
                      type="range" min="0.5" max="4.0" step="0.1"
                      value={anomalyValue}
                      onChange={e => setAnomalyValue(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-amber-400"
                    />
                    <div className={`p-3 rounded border text-[11px] font-mono transition-colors ${anomalyValue > 2.5 ? 'bg-rose-500/10 border-rose-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
                      <div className={`font-bold mb-1 ${anomalyValue > 2.5 ? 'text-rose-300' : 'text-emerald-300'}`}>
                        {anomalyValue > 2.5 ? '⚠ model output drifting' : '✓ output quality nominal'}
                      </div>
                      <p className="text-slate-400 text-[10px] leading-relaxed">
                        {anomalyValue > 2.5
                          ? 'Deviation above 2.5σ threshold. Model responses diverging from baseline benchmarks. Likely needs re-evaluation or fine-tuning review.'
                          : 'Benchmark scores stable. ROUGE-L and semantic similarity within expected range. No intervention needed.'}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-xs font-mono text-amber-400 pt-3 border-t border-white/5 text-right">← flip back</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
