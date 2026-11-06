import React, { useState } from 'react';
import {
  Sparkles,
  Cpu,
  Globe,
  Share2,
  Printer,
  CheckCircle2,
  Send,
  Building,
  Target,
  Rocket,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';

interface OpenAICollaborationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OpenAICollaborationModal: React.FC<OpenAICollaborationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [inquirySent, setInquirySent] = useState<boolean>(false);
  const [contactEmail, setContactEmail] = useState<string>('hemonta292@gmail.com');
  const [contactName, setContactName] = useState<string>('World Brain AI Project Lead');

  if (!isOpen) return null;

  const slides = [
    {
      title: 'Executive Charter & Shared Mission',
      subtitle: 'Universal Knowledge, Research & Education for 8 Billion Humans',
      content: (
        <div className="space-y-4 text-xs md:text-sm text-gray-300 leading-relaxed">
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/40 text-indigo-100">
            <strong>Proposed Initiative:</strong> WORLD BRAIN AI — A collaborative next-generation AI educational and research ecosystem uniting universal search, 3D visual learning, epistemic research synthesis, and bilingual personal teaching.
          </div>
          <p>
            OpenAI's charter commits to ensuring artificial general intelligence benefits all of humanity. Educational inequality remains one of the greatest barriers to human progress. World Brain AI creates an open, universally accessible cognitive accelerator where anyone—from a school student in rural India to an astrophysicist at an observatory—can explore, visualize, and master any scientific concept without limits.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-gray-800/50 border border-gray-700">
              <strong className="text-white block text-xs mb-1">Tagline & Motto</strong>
              <span className="text-xs text-indigo-300 italic font-heading">
                "Explore Everything. Understand Anything. Learn Without Limits."
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-gray-800/50 border border-gray-700">
              <strong className="text-white block text-xs mb-1">Target Collaboration Scope</strong>
              <span className="text-xs text-purple-300">
                Joint technical guidance, research compute grant, API fine-tuning, and pedagogical safety alignment.
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Technical Architecture & Joint R&D Roadmap',
      subtitle: 'Combining Frontier Multimodal Reasoning with Interactive 3D Spatial Knowledge',
      content: (
        <div className="space-y-3 text-xs text-gray-300 leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-gray-800/60 border border-gray-700 space-y-1.5">
              <Cpu size={18} className="text-cyan-400" />
              <h4 className="font-bold text-white text-xs">1. Epistemic Grounding Engine</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Automated multi-tier classification classifying peer-reviewed consensus vs. active scientific hypotheses vs. speculative frontiers with explicit confidence metrics.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-800/60 border border-gray-700 space-y-1.5">
              <Globe size={18} className="text-emerald-400" />
              <h4 className="font-bold text-white text-xs">2. 3D Spatial Simulation</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Direct integration with procedural 3D anatomical, planetary, and molecular viewports for multimodal kinesthetic learning.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-800/60 border border-gray-700 space-y-1.5">
              <Sparkles size={18} className="text-purple-400" />
              <h4 className="font-bold text-white text-xs">3. Real-Time Multilingual Voice</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Sub-200ms latency voice dialogue in English and Hindi, adapting dynamically between beginner analogies and graduate-level mathematics.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gray-900 border border-gray-800 font-mono text-[11px] text-gray-300 space-y-1">
            <span className="text-indigo-400 block font-bold font-sans">System Pipeline:</span>
            <code>[User Voice/Query] → [Epistemic Classifier] → [Complete 13-Point Engine] ⇄ [Three.js 3D Viewport] ⇄ [Personal Adaptive Teacher]</code>
          </div>
        </div>
      ),
    },
    {
      title: 'Feasibility Analysis & Phased Milestones',
      subtitle: 'Path to Global Alpha, Institutional Piloting & Open Deployment',
      content: (
        <div className="space-y-3 text-xs text-gray-300 leading-relaxed">
          <div className="space-y-2">
            {[
              { phase: 'Phase I (Months 1-3)', title: 'Core Epistemic Engine & 3D Knowledge Graph', desc: 'Deploy 13-branch universal search with 100+ procedural 3D models and verified peer-review citation bridges.' },
              { phase: 'Phase II (Months 4-6)', title: 'Adaptive Voice Mentor & Multilingual Matrix', desc: 'Deploy sub-200ms real-time audio teacher in English, Hindi, Spanish, and Mandarin with automatic note generation.' },
              { phase: 'Phase III (Months 7-10)', title: 'University & High School Pilot Program', desc: 'Partner with STEM faculties to evaluate comprehension gains, cognitive test accuracy, and student retention.' },
              { phase: 'Phase IV (Months 11-14)', title: 'Global Public Deployment & Open Science API', desc: 'Open World Brain AI to millions of global students, researchers, and autodidacts as a universal public good.' },
            ].map((m, i) => (
              <div key={i} className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/80 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-white text-xs">{m.title}</strong>
                    <span className="text-[10px] text-indigo-400 font-mono">{m.phase}</span>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'Collaboration Proposal Request Form',
      subtitle: 'Initiating Exploratory Dialog with OpenAI Partnerships & Research Teams',
      content: (
        <div className="space-y-4 text-xs">
          {inquirySent ? (
            <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-center space-y-2">
              <CheckCircle2 size={32} className="text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white font-heading">
                Collaboration Proposal Recorded
              </h4>
              <p className="text-xs text-emerald-200/90 max-w-md mx-auto">
                Thank you! The formal executive brief for WORLD BRAIN AI has been staged for presentation to OpenAI’s research and developer partnership coordinators.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-300">
                Submit this structured proposal request to formally document the collaboration pitch:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-semibold text-gray-400 block mb-1">
                    Project Lead / Organization
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-semibold text-gray-400 block mb-1">
                    Contact Email Address
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-semibold text-gray-400 block mb-1">
                  Primary Areas of Interest
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Technical Architecture Guidance',
                    'OpenAI Research Grant / Compute',
                    'Multimodal API Optimization',
                    'Safety & Epistemic Alignment',
                    'Institutional Co-Development',
                  ].map((area, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 text-[10px] font-medium"
                    >
                      ✓ {area}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setInquirySent(true)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
              >
                <Send size={15} />
                <span>Submit Collaboration Proposal Request</span>
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gray-950 border border-gray-800 rounded-3xl max-w-3xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <Building size={20} />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-indigo-400">
                Official Partnership Dossier
              </div>
              <h2 className="text-lg md:text-xl font-bold text-white font-heading">
                WORLD BRAIN AI ⇄ OpenAI Collaboration Request
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white font-mono text-sm px-2 py-1"
          >
            ✕
          </button>
        </div>

        {/* Slide Navigation Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-1.5 rounded-full transition-all ${
                  activeSlide === i ? 'w-8 bg-indigo-500' : 'w-2.5 bg-gray-800 hover:bg-gray-700'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-mono text-gray-400">
            Slide {activeSlide + 1} of {slides.length}
          </span>
        </div>

        {/* Slide Body */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          <div>
            <h3 className="text-xl font-bold text-white font-heading">{slides[activeSlide].title}</h3>
            <p className="text-xs text-indigo-300 font-medium">{slides[activeSlide].subtitle}</p>
          </div>
          <div className="pt-2">{slides[activeSlide].content}</div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between border-t border-gray-800 pt-4">
          <button
            onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
            disabled={activeSlide === 0}
            className="px-4 py-2 rounded-xl bg-gray-800 text-xs font-semibold text-gray-300 hover:text-white disabled:opacity-40"
          >
            ← Previous
          </button>

          <button
            onClick={() => window.print()}
            className="px-3 py-2 rounded-xl border border-gray-700 bg-gray-900 text-xs text-gray-300 hover:text-white flex items-center gap-1.5"
          >
            <Printer size={13} />
            <span>Print Executive Brief</span>
          </button>

          <button
            onClick={() => setActiveSlide((prev) => Math.min(slides.length - 1, prev + 1))}
            disabled={activeSlide === slides.length - 1}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white disabled:opacity-40"
          >
            Next Slide →
          </button>
        </div>
      </div>
    </div>
  );
};
