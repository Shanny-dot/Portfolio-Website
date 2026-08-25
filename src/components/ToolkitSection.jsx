import React, { useState } from 'react';

export default function ToolkitSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeSkill, setActiveSkill] = useState(null);

  const skills = [
    { name: "Python", cat: "automation", icon: "🐍", level: "daily driver", desc: "Pytest plugins, async eval runners, data transformers, synthetic test generators. Python is 90% of what I write.", stat: "5k+ assertions written" },
    { name: "Pytest", cat: "automation", icon: "🧪", level: "daily driver", desc: "Fixtures, parametrize, xdist parallel runs, custom plugins, HTML reports. I've set up whole test suite architectures from scratch.", stat: "modular suite design" },
    { name: "DeepEval", cat: "ai_qa", icon: "🤖", level: "advanced", desc: "Hallucination scoring, G-Eval semantic similarity, answer relevance, bias metrics. My primary LLM eval framework.", stat: "used in prod evals" },
    { name: "Ragas", cat: "ai_qa", icon: "📐", level: "advanced", desc: "RAG pipeline evaluation — context recall, faithfulness, answer relevance. Paired with LangSmith for tracing.", stat: "RAG eval pipeline" },
    { name: "Great Expectations", cat: "data", icon: "📊", level: "advanced", desc: "Declarative expectation suites for batch pipelines. Automatically generate data docs. Runs embedded in Databricks jobs.", stat: "data quality guardrails" },
    { name: "Snowflake", cat: "data", icon: "❄️", level: "advanced", desc: "Schema drift monitors, zero-copy clone test envs, query profiling, automated SQL assertion suites.", stat: "cloud data QA" },
    { name: "Databricks / PySpark", cat: "data", icon: "🧱", level: "advanced", desc: "Distributed assertion runners on DataFrames, 50M+ row daily validation, ETL regression suites.", stat: "50M rows / day" },
    { name: "SQL", cat: "data", icon: "🗄️", level: "daily driver", desc: "Window functions, recursive CTEs, data reconciliation queries, schema migration integrity scripts.", stat: "complex data analysis" },
    { name: "REST API Testing", cat: "automation", icon: "⚡", level: "advanced", desc: "Contract testing, OpenAPI spec validation, auth token rotation, stress testing under concurrency.", stat: "<100ms assertions" },
    { name: "Playwright", cat: "automation", icon: "🎭", level: "intermediate", desc: "Cross-browser E2E flows, screenshot diffing, network interceptors. Mostly for validating AI-generated UI output.", stat: "E2E regression" },
    { name: "GitHub Actions", cat: "infra", icon: "⚙️", level: "advanced", desc: "Matrix builds, PR quality gates, Docker test envs, Slack alert hooks. CI that actually catches things.", stat: "zero-downtime gates" },
    { name: "Docker", cat: "infra", icon: "🐳", level: "advanced", desc: "Hermetic containerised test envs — because 'works on my machine' is not a valid test strategy.", stat: "reproducible envs" },
    { name: "Prometheus / Grafana", cat: "infra", icon: "📈", level: "intermediate", desc: "p95/p99 latency tracking, model drift alert panels, anomaly dashboards. Mostly setting these up from scratch.", stat: "real-time telemetry" },
    { name: "Git", cat: "infra", icon: "🌿", level: "daily driver", desc: "Pre-commit hooks, PR quality automation, conventional commits, semantic versioning. Clean git hygiene matters.", stat: "version control" },
  ];

  const categories = [
    { key: 'all', label: 'all' },
    { key: 'ai_qa', label: 'ai & llm eval' },
    { key: 'data', label: 'data & etl' },
    { key: 'automation', label: 'automation' },
    { key: 'infra', label: 'infra & ci/cd' },
  ];

  const filtered = selectedCategory === 'all' ? skills : skills.filter(s => s.cat === selectedCategory);

  return (
    <section id="toolkit" className="py-24 bg-[#070a11] relative border-t border-white/4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <p className="font-mono text-xs text-purple-400">the stack</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Tools I actually use.
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed font-sans">
            Not a keyword dump. Click anything to see what I actually mean by "I know it."
          </p>
        </div>

        {/* Category filters — lowercase, low-key */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all ${selectedCategory === cat.key ? 'bg-purple-500/15 text-purple-300 border border-purple-500/40' : 'text-slate-500 border border-white/6 hover:border-white/15 hover:text-slate-300'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skill grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map(skill => (
            <button
              key={skill.name}
              onClick={() => setActiveSkill(activeSkill?.name === skill.name ? null : skill)}
              className={`p-3.5 rounded-xl text-left transition-all group ${activeSkill?.name === skill.name ? 'bg-[#14192e] border border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.15)]' : 'bg-[#0b101e]/80 border border-white/5 hover:border-white/12 hover:bg-[#0d1424]'}`}
            >
              <div className="text-xl mb-2">{skill.icon}</div>
              <div className="font-mono text-sm font-semibold text-white group-hover:text-purple-200 transition-colors">{skill.name}</div>
              <div className="font-mono text-[10px] text-slate-600 mt-0.5">{skill.level}</div>
            </button>
          ))}
        </div>

        {/* Skill detail — inline, not modal */}
        {activeSkill && (
          <div className="mt-6 p-5 rounded-xl bg-[#0d1526] border border-purple-500/30 flex flex-col sm:flex-row gap-4 items-start">
            <div className="text-3xl flex-shrink-0">{activeSkill.icon}</div>
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-3">
                <h4 className="font-mono font-bold text-white">{activeSkill.name}</h4>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">{activeSkill.stat}</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">{activeSkill.desc}</p>
            </div>
            <button
              onClick={() => setActiveSkill(null)}
              className="text-[11px] font-mono text-slate-600 hover:text-slate-300 flex-shrink-0 self-start"
            >
              close ×
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
