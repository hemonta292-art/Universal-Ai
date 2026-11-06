import React, { useState } from 'react';
import {
  Search,
  Mic,
  MicOff,
  Camera,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Brain,
  Activity,
  Dna,
  Footprints,
  Leaf,
  Atom,
  Globe,
  Orbit,
  Cpu,
  Calculator,
  Wind,
  HeartPulse,
} from 'lucide-react';
import { KNOWLEDGE_BRANCHES } from '../data/branches';
import { KnowledgeBranch } from '../types/knowledge';

const BRANCH_ICONS: Record<string, any> = {
  Dna,
  Activity,
  Brain,
  Footprints,
  Leaf,
  Atom,
  Globe,
  Orbit,
  Cpu,
  Calculator,
  Wind,
  HeartPulse,
  Sparkles,
};

interface UniversalSearchProps {
  onSearch: (query: string, branch?: string) => void;
  onOpenVisionModal: () => void;
  isLoading?: boolean;
  language?: 'en' | 'hi';
}

export const UniversalSearch: React.FC<UniversalSearchProps> = ({
  onSearch,
  onOpenVisionModal,
  isLoading = false,
  language = 'en',
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<KnowledgeBranch | 'all'>('all');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchInput.trim() || isLoading) return;
    const branchName = selectedBranch !== 'all' ? KNOWLEDGE_BRANCHES.find((b) => b.id === selectedBranch)?.name : undefined;
    onSearch(searchInput.trim(), branchName);
  };

  const toggleVoiceSearch = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    rec.onstart = () => setIsListening(true);
    rec.onresult = (ev: any) => {
      const text = ev.results[0][0].transcript;
      setSearchInput(text);
      setIsListening(false);
      onSearch(text);
    };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
    rec.start();
  };

  return (
    <div className="w-full space-y-8">
      {/* HERO BANNER & UNIVERSAL SEARCH INTERFACE */}
      <div className="relative text-center max-w-4xl mx-auto space-y-6 pt-4 pb-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Sparkles size={14} className="text-indigo-400" />
          <span>{language === 'hi' ? 'विश्व का सम्पूर्ण ज्ञान एक ही स्थान पर' : 'Universal Knowledge Engine • 13 Core Branches'}</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight font-heading leading-tight">
          Explore Everything.{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Understand Anything.
          </span>
        </h1>

        <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {language === 'hi'
            ? 'मानव शरीर रचना, ब्रह्मांडीय खगोल विज्ञान, क्वांटम भौतिकी, सूक्ष्म जीव विज्ञान और भविष्य की तकनीक का सम्पूर्ण 13-बिंदु विश्लेषण।'
            : 'Authoritative encyclopedic dossiers, interactive 3D anatomy & physics models, adaptive AI teacher, and peer-reviewed research synthesis.'}
        </p>

        {/* SEARCH BAR INPUT RIG */}
        <form
          onSubmit={handleSubmit}
          className="relative max-w-3xl mx-auto mt-6 group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500 pointer-events-none" />

          <div className="relative flex items-center bg-gray-900 border border-gray-700 rounded-2xl p-2 shadow-2xl">
            <Search size={22} className="text-gray-400 ml-3 mr-2 shrink-0" />

            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'किसी भी विषय को खोजें (उदा. मानव हृदय, ब्लैक होल, क्वांटम उलझाव, डीएनए)...'
                  : 'Search any topic in the universe (e.g., Human Heart, Black Holes, CRISPR, Quantum Atom)...'
              }
              className="flex-1 bg-transparent border-none text-white text-sm md:text-base placeholder-gray-500 focus:outline-none px-2"
            />

            {/* Mic voice search button */}
            <button
              type="button"
              onClick={toggleVoiceSearch}
              className={`p-2.5 rounded-xl border transition mr-1.5 ${
                isListening
                  ? 'bg-rose-600 border-rose-400 text-white animate-pulse'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:text-white'
              }`}
              title="Voice Search"
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            {/* Camera visual recognition button */}
            <button
              type="button"
              onClick={onOpenVisionModal}
              className="p-2.5 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 hover:text-white mr-1.5 transition"
              title="Visual Specimen Recognition"
            >
              <Camera size={18} />
            </button>

            {/* Submit search button */}
            <button
              type="submit"
              disabled={isLoading || !searchInput.trim()}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold text-xs md:text-sm shadow-lg transition flex items-center gap-1.5 disabled:opacity-50"
            >
              <span>{isLoading ? 'Synthesizing...' : 'Search'}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </form>

        {/* TRENDING QUICK TOPICS */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
          <span className="text-gray-400 flex items-center gap-1 text-[11px]">
            <TrendingUp size={13} className="text-indigo-400" />
            Trending:
          </span>
          {[
            'Human Heart (Cardiovascular System)',
            'Human Brain & Synaptic Architecture',
            'Quantum Atom & Electron Orbitals',
            'Solar System & Planetary Dynamics',
            'DNA Double Helix & Gene Expression',
            'Botanical Plant Cell & Chloroplasts',
            'CRISPR-Cas9 Gene Editing',
          ].map((topic, i) => (
            <button
              key={i}
              onClick={() => {
                setSearchInput(topic);
                onSearch(topic);
              }}
              className="px-2.5 py-1 rounded-full bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:border-gray-600 transition text-[11px]"
            >
              {topic.split(' (')[0].split(' &')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* 13 FOUNDATIONAL KNOWLEDGE BRANCHES SELECTOR */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white font-heading">
            {language === 'hi' ? '13 मूलभूत ज्ञान शाखाएँ' : '13 Foundational Knowledge Branches'}
          </h2>
          {selectedBranch !== 'all' && (
            <button
              onClick={() => setSelectedBranch('all')}
              className="text-xs text-indigo-400 hover:underline"
            >
              Show All Branches
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2.5">
          {KNOWLEDGE_BRANCHES.map((b) => {
            const Icon = BRANCH_ICONS[b.iconName] || Atom;
            const isSelected = selectedBranch === b.id;

            return (
              <button
                key={b.id}
                onClick={() => {
                  setSelectedBranch(isSelected ? 'all' : b.id);
                }}
                className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 group ${
                  isSelected
                    ? 'bg-gradient-to-b from-indigo-900/50 to-gray-900 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                    : 'bg-gray-900/60 border-gray-800/90 hover:border-gray-700 hover:bg-gray-900'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-gray-800 flex items-center justify-center text-indigo-400 group-hover:text-white group-hover:bg-indigo-600 transition">
                  <Icon size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-xs text-white leading-tight">
                    {language === 'hi' ? b.nameHi.split(' ')[0] : b.name.split(' &')[0]}
                  </h3>
                  <span className="text-[10px] text-gray-500 block truncate mt-0.5">
                    {b.sampleTopics[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
