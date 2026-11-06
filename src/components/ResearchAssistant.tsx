import React, { useState } from 'react';
import {
  Search,
  Scale,
  ShieldCheck,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ResearchDossier } from '../types/knowledge';

interface ResearchAssistantProps {
  initialTopic?: string;
  onExploreDossier?: (topic: string) => void;
}

export const ResearchAssistant: React.FC<ResearchAssistantProps> = ({
  initialTopic = 'Quantum Computing & Qubits',
  onExploreDossier,
}) => {
  const [topicA, setTopicA] = useState(initialTopic);
  const [topicB, setTopicB] = useState('');
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [researchData, setResearchData] = useState<ResearchDossier | null>(null);

  const runAnalysis = async () => {
    if (!topicA.trim() || isLoading) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/research/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicA.trim(),
          compareWithTopic: isCompareMode ? topicB.trim() : undefined,
        }),
      });
      const data = await response.json();
      setResearchData(data);
    } catch (err: any) {
      alert(`Research analysis error: ${err?.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* RESEARCH LAB HERO HEADER */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900/90 to-cyan-950/40 border border-gray-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Epistemic Rigor
            </span>
            <span className="text-xs text-gray-400">
              Verified Facts • Active Hypotheses • Speculative Predictions
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-heading">
            Advanced AI Scientific Research Lab
          </h1>

          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
            Synthesize peer-reviewed literature, separate empirical consensus from speculative frontiers, and compare competing scientific paradigms side-by-side.
          </p>
        </div>

        {/* QUERY INPUT CONTROLS */}
        <div className="mt-6 pt-5 border-t border-gray-800/80 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={topicA}
                onChange={(e) => setTopicA(e.target.value)}
                placeholder="Target topic (e.g., Room-Temperature Superconductivity, CRISPR, AGI)..."
                className="w-full bg-gray-800/90 border border-gray-700 rounded-2xl pl-10 pr-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-cyan-500"
              />
              <Search size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
            </div>

            {isCompareMode && (
              <div className="flex-1 relative animate-in fade-in slide-in-from-right duration-200">
                <input
                  type="text"
                  value={topicB}
                  onChange={(e) => setTopicB(e.target.value)}
                  placeholder="Compare against (e.g., Traditional High-Tc Cuprates, Zinc Fingers)..."
                  className="w-full bg-gray-800/90 border border-gray-700 rounded-2xl pl-10 pr-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-purple-500"
                />
                <Scale size={16} className="absolute left-3.5 top-3.5 text-purple-400" />
              </div>
            )}

            <button
              onClick={() => setIsCompareMode(!isCompareMode)}
              className={`px-4 py-3 rounded-2xl border text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                isCompareMode
                  ? 'bg-purple-600/20 border-purple-400 text-purple-300'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:text-white'
              }`}
            >
              <Scale size={15} />
              <span>{isCompareMode ? 'Comparison Mode Active' : '+ Compare 2 Topics'}</span>
            </button>

            <button
              onClick={runAnalysis}
              disabled={isLoading || !topicA.trim()}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-xs md:text-sm shadow-xl transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Sparkles size={16} className={isLoading ? 'animate-spin' : ''} />
              <span>{isLoading ? 'Synthesizing Literature...' : 'Run Epistemic Analysis'}</span>
            </button>
          </div>

          {/* Quick Comparison Presets */}
          <div className="flex items-center gap-2 text-xs text-gray-400 overflow-x-auto pb-1">
            <span className="font-semibold text-cyan-400 whitespace-nowrap">Suggested comparisons:</span>
            {[
              ['CRISPR-Cas9', 'Prime Editing'],
              ['General Relativity', 'Quantum Loop Gravity'],
              ['Nuclear Fusion', 'Nuclear Fission'],
              ['Transformer Neural Networks', 'Biological Synaptic Plasticity'],
            ].map(([a, b], idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTopicA(a);
                  setTopicB(b);
                  setIsCompareMode(true);
                }}
                className="px-2.5 py-1 rounded-lg bg-gray-800/60 border border-gray-700/80 hover:bg-gray-700 text-gray-300 text-[11px] whitespace-nowrap transition"
              >
                {a} vs {b}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ANALYSIS RESULTS VIEW */}
      {isLoading ? (
        <div className="p-16 rounded-3xl bg-gray-900/60 border border-gray-800 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-600/30 text-cyan-400 mx-auto flex items-center justify-center animate-spin">
            <Sparkles size={24} />
          </div>
          <h3 className="text-base font-bold text-white">Synthesizing Peer-Reviewed Literature</h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Categorizing empirical facts from academic journals, analyzing competing theoretical hypotheses, and calculating uncertainty probabilities.
          </p>
        </div>
      ) : researchData ? (
        <div className="space-y-6">
          {/* Executive Abstract */}
          <div className="p-6 md:p-8 rounded-3xl bg-gray-900/80 border border-gray-800 space-y-3 shadow-xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <BookOpen size={16} />
              <span>Executive Research Abstract: {researchData.topic}</span>
            </h2>
            <p className="text-sm md:text-base text-gray-200 leading-relaxed font-medium">
              {researchData.executiveAbstract}
            </p>
          </div>

          {/* TRI-TIER EPISTEMIC CLASSIFIER */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* TIER 1: VERIFIED FACTS */}
            <div className="p-6 rounded-3xl bg-gray-900/70 border border-emerald-500/30 space-y-4 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase font-heading">
                      1. Verified Facts
                    </h3>
                    <span className="text-[10px] text-emerald-400 block">
                      Peer-Reviewed Consensus
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                  High Consensus
                </span>
              </div>

              <div className="space-y-3">
                {researchData.verifiedFacts.map((fact, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-gray-800/40 border border-gray-700/60 space-y-1.5"
                  >
                    <p className="text-xs font-semibold text-emerald-200 leading-snug">
                      {fact.claim}
                    </p>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      {fact.empiricalEvidence}
                    </p>
                    {fact.landmarkReference && (
                      <span className="text-[10px] font-mono text-emerald-400 block pt-1 border-t border-gray-700/50">
                        Ref: {fact.landmarkReference}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* TIER 2: SCIENTIFIC HYPOTHESES & THEORIES */}
            <div className="p-6 rounded-3xl bg-gray-900/70 border border-indigo-500/30 space-y-4 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <HelpCircle size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase font-heading">
                      2. Hypotheses & Models
                    </h3>
                    <span className="text-[10px] text-indigo-400 block">
                      Under Active Testing
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-500/40">
                  Investigative
                </span>
              </div>

              <div className="space-y-3">
                {researchData.scientificHypotheses.map((hyp, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-gray-800/40 border border-gray-700/60 space-y-1.5"
                  >
                    <p className="text-xs font-semibold text-indigo-200 leading-snug">
                      {hyp.hypothesis}
                    </p>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      Methodology: {hyp.currentTestingMethodology}
                    </p>
                    {hyp.competingSchoolsOfThought && (
                      <p className="text-[10px] text-gray-400 italic">
                        Debate: {hyp.competingSchoolsOfThought}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* TIER 3: SPECULATIVE FRONTIERS & PREDICTIONS */}
            <div className="p-6 rounded-3xl bg-gray-900/70 border border-purple-500/30 space-y-4 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <TrendingUp size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase font-heading">
                      3. Speculative Frontiers
                    </h3>
                    <span className="text-[10px] text-purple-400 block">
                      Future Horizons & Predictions
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-500/40">
                  Uncertainty Bounds
                </span>
              </div>

              <div className="space-y-3">
                {researchData.speculativeFrontiersAndPredictions.map((spec, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-gray-800/40 border border-gray-700/60 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-purple-200 leading-snug">
                        {spec.predictionOrHorizon}
                      </p>
                      {spec.timeHorizonYears && (
                        <span className="text-[10px] font-mono text-purple-400 whitespace-nowrap">
                          {spec.timeHorizonYears}
                        </span>
                      )}
                    </div>

                    <div className="pt-1 border-t border-gray-700/50 flex items-center justify-between text-[10px]">
                      <span className="text-gray-400">
                        Uncertainty:{' '}
                        <strong className="text-amber-400">{spec.epistemicUncertainty}</strong>
                      </span>
                      <span className="font-mono text-gray-300">
                        Confidence: {spec.confidenceScorePercent}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COMPARATIVE MATRIX (If comparison was requested) */}
          {researchData.comparativeMatrix && researchData.comparativeMatrix.length > 0 && (
            <div className="p-6 md:p-8 rounded-3xl bg-gray-900/80 border border-gray-800 space-y-4 shadow-xl">
              <h2 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                <Scale size={18} className="text-purple-400" />
                <span>Side-by-Side Comparative Matrix: {topicA} vs {topicB}</span>
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400 uppercase text-[10px]">
                      <th className="py-3 px-4 font-bold">Dimension</th>
                      <th className="py-3 px-4 font-bold text-cyan-300">{topicA}</th>
                      <th className="py-3 px-4 font-bold text-purple-300">{topicB}</th>
                      <th className="py-3 px-4 font-bold text-amber-300">Scientific Verdict</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 text-gray-300">
                    {researchData.comparativeMatrix.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-800/30 transition">
                        <td className="py-3 px-4 font-semibold text-white">{item.dimension}</td>
                        <td className="py-3 px-4 leading-relaxed">{item.itemAAnalysis}</td>
                        <td className="py-3 px-4 leading-relaxed">{item.itemBAnalysis}</td>
                        <td className="py-3 px-4 font-medium text-amber-200/90 leading-relaxed">
                          {item.scientificVerdict}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CRITICAL KNOWLEDGE GAPS & OPEN QUESTIONS */}
          {researchData.criticalKnowledgeGaps && researchData.criticalKnowledgeGaps.length > 0 && (
            <div className="p-6 rounded-3xl bg-amber-950/20 border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase">
                <AlertTriangle size={16} />
                <span>Critical Unresolved Knowledge Gaps in Current Science</span>
              </div>
              <ul className="space-y-1.5 text-xs text-amber-200/90">
                {researchData.criticalKnowledgeGaps.map((gap, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">?</span>
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* AUTHORITATIVE CITATIONS */}
          {researchData.authoritativeCitations && researchData.authoritativeCitations.length > 0 && (
            <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Authoritative Academic Sources (PubMed / Nature / arXiv / NASA)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {researchData.authoritativeCitations.map((cite, i) => (
                  <div key={i} className="p-3 rounded-xl bg-gray-800/40 border border-gray-700/60">
                    <strong className="text-white block">{cite.source}</strong>
                    <span className="text-[11px] text-gray-400">{cite.significance}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
