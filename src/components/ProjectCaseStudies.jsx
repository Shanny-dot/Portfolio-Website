import React, { useState } from 'react';
import { FileCheck } from 'lucide-react';

export default function ProjectCaseStudies() {
  const [selectedReport, setSelectedReport] = useState(null);

  const projects = [
    {
      id: "sneakerhead",
      name: "SneakerHeadLM",
      headline: "AI marketplace assistant for buying and selling rare sneakers",
      story: "I built a fine-tuned LLM to handle pricing estimates, condition grading, and authenticity questions for a sneaker marketplace. Then I spent almost as much time testing it as building it — because an AI that confidently gives you the wrong price for a $400 Air Jordan is worse than no AI at all.",
      whatITested: "150+ synthetic prompts covering edge cases: rare colorways the model hadn't seen in training, inflated resale prices, adversarial injection attempts, and hallucinated release year claims.",
      metrics: [
        { label: "Assertion pass rate", val: "98.4%" },
        { label: "Hallucination index", val: "0.02%" },
        { label: "Latency p95", val: "185ms" },
      ],
      code: '# One of the 150 synthetic test cases\n' +
        'def test_jordan1_pricing_accuracy():\n' +
        '    query = "What\'s a fair price for 2019 Jordan 1 Retro Chicago size 10?"\n' +
        '    response = model.generate(query)\n' +
        '    \n' +
        '    price = extract_price(response)\n' +
        '    # Market range from historical data\n' +
        '    assert 280 <= price <= 420, f"Price anomaly: ${price}"\n' +
        '    \n' +
        '    # Make sure it did not fabricate the release year\n' +
        '    assert "2019" in response or "2018" in response\n' +
        '    assert not contains_hallucinated_facts(response, known_facts)',
    },
    {
      id: "smallanime",
      name: "SmallAnimeLM",
      headline: "3B param SLM for fast anime metadata and character queries",
      story: "Fine-tuned a 3 billion parameter model on structured anime metadata. The goal was sub-50ms responses with accurate JSON output. Sounds straightforward until you realize small models get weird under concurrency — malformed JSON, truncated outputs, confidence where there should be none.",
      whatITested: "10,000 concurrent queries through a stress test harness. Schema compliance via Pydantic. Perplexity tracking across fine-tuning epochs. ROUGE-L for semantic drift.",
      metrics: [
        { label: "JSON parse failures", val: "0 / 10k" },
        { label: "ROUGE-L score", val: "0.91" },
        { label: "p99 latency", val: "48ms" },
      ],
      code: '# Stress test: 10k concurrent queries\n' +
        'async def test_slm_concurrent_output_integrity():\n' +
        '    queries = load_anime_test_queries(n=10000)\n' +
        '    results = await asyncio.gather(*[\n' +
        '        slm.generate(q) for q in queries\n' +
        '    ])\n' +
        '    \n' +
        '    parse_failures = sum(\n' +
        '        1 for r in results\n' +
        '        if not is_valid_json(r)\n' +
        '    )\n' +
        '    assert parse_failures == 0  # strict: zero tolerance',
    },
    {
      id: "story-gen",
      name: "Beautiful Story Generator",
      headline: "Multi-agent creative writing pipeline with autonomous chapter agents",
      story: "Built a multi-agent system where each character has its own context agent, and a plot controller manages chapter transitions. The challenge: generative systems are *really* good at drifting into places you don't want them to go. Safety classification can't be an afterthought.",
      whatITested: "State machine transition testing (can the agents deadlock?), narrative coherence decay over 5+ chapters using semantic similarity, and a toxicity classifier running on every chapter output before it's ever returned.",
      metrics: [
        { label: "Toxic output rejected", val: "100%" },
        { label: "Coherence score avg", val: "4.8 / 5" },
        { label: "Agent deadlocks", val: "0" },
      ],
      code: '# Safety is not optional\n' +
        'def test_chapter_safety_pipeline(agent_cluster):\n' +
        '    sim = agent_cluster.run(chapters=5, theme="dark")\n' +
        '    \n' +
        '    # Every chapter must pass the classifier before returning\n' +
        '    for chapter in sim.chapters:\n' +
        '        score = toxicity_classifier.score(chapter.text)\n' +
        '        assert score < 0.15, f"Chapter failed safety check"\n' +
        '    \n' +
        '    # No infinite wait states between agents\n' +
        '    assert len(sim.deadlock_events) == 0',
    },
  ];

  return (
    <section id="projects" className="py-24 bg-[#05080e] relative border-t border-white/4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-2xl mb-14 space-y-3">
          <p className="font-mono text-xs text-emerald-400">projects</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Things I built — and then tested.
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed font-sans">
            These are framed as evaluation case studies because the testing decisions are usually more interesting than the build decisions.
          </p>
        </div>

        <div className="space-y-6">
          {projects.map(proj => (
            <div key={proj.id} className="rounded-xl bg-[#0b1220] border border-white/6 p-6 hover:border-white/10 transition-colors">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left: Story */}
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-white">{proj.name}</h3>
                      <span className="text-[11px] font-mono text-slate-600">{proj.headline}</span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed font-sans">{proj.story}</p>

                  <div className="p-3.5 rounded-lg bg-[#050c18] border border-white/5 space-y-1">
                    <p className="font-mono text-xs text-emerald-400 font-semibold">what i tested</p>
                    <p className="text-sm text-slate-300 leading-relaxed font-sans">{proj.whatITested}</p>
                  </div>
                </div>

                {/* Right: Metrics + CTA */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {proj.metrics.map((m, i) => (
                      <div key={i} className="bg-[#080f1c] border border-white/5 rounded-lg p-3 text-center">
                        <div className="font-mono text-base font-bold text-emerald-400">{m.val}</div>
                        <div className="text-[10px] font-mono text-slate-500 mt-0.5 leading-tight">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedReport(proj)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-mono text-xs text-slate-400 border border-white/8 hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    view test code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Report Modal */}
        {selectedReport && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={() => setSelectedReport(null)}
          >
            <div
              className="max-w-2xl w-full bg-[#09101e] border border-white/10 rounded-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/6">
                <div>
                  <h3 className="font-mono font-bold text-white">{selectedReport.name}</h3>
                  <p className="text-xs font-mono text-slate-500 mt-0.5">actual test code from this project</p>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-xs font-mono text-slate-500 hover:text-slate-300 px-2 py-1 border border-white/8 rounded"
                >
                  close
                </button>
              </div>
              <pre className="p-4 bg-[#030608] rounded-lg border border-white/5 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
                {selectedReport.code}
              </pre>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
