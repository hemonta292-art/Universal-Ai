import React, { useState } from 'react';
import { TopicDossier } from '../types/knowledge';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Bookmark,
  BookmarkCheck,
  Printer,
  Sparkles,
  ShieldAlert,
  ChevronRight,
  TrendingUp,
  History,
  Layers,
  MapPin,
  ExternalLink,
  Box,
  Share2,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface CompleteInfoEngineProps {
  dossier: TopicDossier;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
  onOpen3DModel?: (modelType: string) => void;
  onAskTeacherAboutTopic?: (topic: string) => void;
  language?: 'en' | 'hi';
}

export const CompleteInfoEngine: React.FC<CompleteInfoEngineProps> = ({
  dossier,
  isBookmarked = false,
  onToggleBookmark,
  onOpen3DModel,
  onAskTeacherAboutTopic,
  language = 'en',
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'anatomy' | 'history' | 'future' | 'research'>('all');
  const [copiedLink, setCopiedLink] = useState(false);

  // Audio narration
  const toggleAudio = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const textToRead = `${dossier.topic}. ${dossier.summary}. ${dossier.completeExplanation.slice(0, 500)}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* HEADER CARD: Topic Title, Scientific Nomenclature, Taxonomy, & Action Bar */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900/90 to-indigo-950/40 border border-gray-800 p-6 md:p-8 shadow-2xl">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                {dossier.branch}
              </span>
              {dossier.scientificName && (
                <span className="px-3 py-1 rounded-full text-xs font-serif italic bg-gray-800/80 border border-gray-700 text-gray-300">
                  {dossier.scientificName}
                </span>
              )}
              {dossier.commonName && dossier.commonName !== dossier.topic && (
                <span className="text-xs text-gray-400">
                  aka <strong className="text-gray-200">{dossier.commonName}</strong>
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-heading">
              {dossier.topic}
            </h1>

            {dossier.tagline && (
              <p className="text-base md:text-lg text-indigo-200/90 font-medium leading-relaxed">
                {dossier.tagline}
              </p>
            )}
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 self-start no-print">
            <button
              onClick={toggleAudio}
              className={`p-2.5 rounded-xl border transition flex items-center gap-2 text-xs font-medium ${
                isPlayingAudio
                  ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                  : 'bg-gray-800/80 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
              title="Read Aloud"
            >
              {isPlayingAudio ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isPlayingAudio ? 'Stop Voice' : 'Listen'}</span>
            </button>

            {onToggleBookmark && (
              <button
                onClick={onToggleBookmark}
                className={`p-2.5 rounded-xl border transition flex items-center gap-1.5 text-xs font-medium ${
                  isBookmarked
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-gray-800/80 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
                title="Bookmark Topic"
              >
                {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                <span>{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="p-2.5 rounded-xl border border-gray-700 bg-gray-800/80 text-gray-300 hover:text-white hover:bg-gray-700 transition flex items-center gap-1.5 text-xs font-medium"
              title="Print or Save as PDF"
            >
              <Printer size={16} />
              <span>Export PDF</span>
            </button>

            {dossier.suggested3DModel && onOpen3DModel && (
              <button
                onClick={() => onOpen3DModel(dossier.suggested3DModel!)}
                className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-xs transition shadow-lg flex items-center gap-1.5"
              >
                <Box size={16} />
                <span>Launch 3D Explorer</span>
              </button>
            )}
          </div>
        </div>

        {/* MEDICAL OR SAFETY DISCLAIMER IF APPLICABLE */}
        {dossier.safetyGuidanceOrDisclaimer && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-3 text-amber-200 text-xs leading-relaxed">
            <ShieldAlert size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5">Scientific & Health Safety Notice:</strong>
              {dossier.safetyGuidanceOrDisclaimer}
            </div>
          </div>
        )}

        {/* SCIENTIFIC CLASSIFICATION HIERARCHY TREE */}
        {dossier.taxonomy && (
          <div className="mt-6 pt-5 border-t border-gray-800/80">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
              <Layers size={13} className="text-indigo-400" />
              <span>Scientific Classification (Linnaean Hierarchy)</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {Object.entries(dossier.taxonomy).map(([rank, val], idx, arr) => (
                <div key={rank} className="flex items-center gap-1">
                  <div className="px-2.5 py-1 rounded-lg bg-gray-800/70 border border-gray-700/80 text-gray-300">
                    <span className="text-[10px] uppercase text-gray-500 block leading-tight">{rank}</span>
                    <span className="font-medium text-gray-200">{val}</span>
                  </div>
                  {idx < arr.length - 1 && <ChevronRight size={12} className="text-gray-600" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* QUICK FACTS TICKER */}
      {dossier.quickFacts && dossier.quickFacts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {dossier.quickFacts.map((fact, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 flex items-start gap-3 hover:border-gray-700 transition"
            >
              <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0">
                #{i + 1}
              </span>
              <p className="text-xs text-gray-300 leading-relaxed">{fact}</p>
            </div>
          ))}
        </div>
      )}

      {/* SECTION NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-gray-800 pb-2 no-print overflow-x-auto">
        {[
          { id: 'all', label: 'Complete 13-Point Dossier' },
          { id: 'anatomy', label: 'Structures & Anatomy' },
          { id: 'history', label: 'History & Pioneers' },
          { id: 'future', label: 'Future Predictions & Frontier' },
          { id: 'research', label: 'Peer Discoveries & Citations' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* MAIN DOSSIER CONTENT PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLUMNS: Complete Explanations, Anatomy, Mechanisms, History, Applications */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Complete Scientific Explanation */}
          {(activeTab === 'all' || activeTab === 'anatomy') && (
            <div className="p-6 md:p-8 rounded-3xl bg-gray-900/70 border border-gray-800 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
                <BookOpen size={18} className="text-indigo-400" />
                <span>1. Complete Scientific Explanation</span>
              </h2>
              <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 text-indigo-100 text-sm leading-relaxed font-medium">
                {dossier.summary}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                {dossier.completeExplanation}
              </p>
            </div>
          )}

          {/* 2. Body Structures & Functions */}
          {(activeTab === 'all' || activeTab === 'anatomy') &&
            dossier.bodyStructuresAndFunctions &&
            dossier.bodyStructuresAndFunctions.length > 0 && (
              <div className="p-6 md:p-8 rounded-3xl bg-gray-900/70 border border-gray-800 space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
                  <Layers size={18} className="text-cyan-400" />
                  <span>2. Core Structures & Functional Mechanisms</span>
                </h2>
                <div className="space-y-3">
                  {dossier.bodyStructuresAndFunctions.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-gray-800/50 border border-gray-700/70 hover:border-indigo-500/50 transition space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-cyan-400" />
                          {item.structure}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">{item.function}</p>
                      {item.clinicalOrPracticalNote && (
                        <p className="text-[11px] text-indigo-300/80 italic pt-1 border-t border-gray-700/50">
                          Note: {item.clinicalOrPracticalNote}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* 3. Internal & External Anatomy */}
          {(activeTab === 'all' || activeTab === 'anatomy') &&
            dossier.internalExternalAnatomy && (
              <div className="p-6 md:p-8 rounded-3xl bg-gray-900/70 border border-gray-800 space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
                  <Box size={18} className="text-purple-400" />
                  <span>3. Internal vs External Anatomical Architecture</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-gray-800/40 border border-gray-700/70 space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                      External Features & Topology
                    </h3>
                    <ul className="space-y-1.5 text-xs text-gray-300">
                      {dossier.internalExternalAnatomy.externalFeatures?.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-purple-400 mt-0.5">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-800/40 border border-gray-700/70 space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                      Internal Architecture & Core
                    </h3>
                    <ul className="space-y-1.5 text-xs text-gray-300">
                      {dossier.internalExternalAnatomy.internalArchitecture?.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-0.5">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

          {/* 4. History & Development Timeline */}
          {(activeTab === 'all' || activeTab === 'history') &&
            dossier.historyAndDevelopment &&
            dossier.historyAndDevelopment.length > 0 && (
              <div className="p-6 md:p-8 rounded-3xl bg-gray-900/70 border border-gray-800 space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
                  <History size={18} className="text-amber-400" />
                  <span>4. Historical Discovery & Scientific Pioneers</span>
                </h2>
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:to-gray-700">
                  {dossier.historyAndDevelopment.map((milestone, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-amber-400 border-2 border-gray-950 group-hover:scale-125 transition" />
                      <div className="p-4 rounded-2xl bg-gray-800/40 border border-gray-700/70 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-amber-300">
                            {milestone.eraOrYear}
                          </span>
                          {milestone.keyPioneers && (
                            <span className="text-xs text-gray-400">
                              Pioneer: <strong className="text-gray-200">{milestone.keyPioneers}</strong>
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {milestone.discoveryOrMilestone}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* 5. Future Possibilities & Predictions with Epistemic Uncertainty */}
          {(activeTab === 'all' || activeTab === 'future') &&
            dossier.futurePossibilitiesAndPredictions &&
            dossier.futurePossibilitiesAndPredictions.length > 0 && (
              <div className="p-6 md:p-8 rounded-3xl bg-gray-900/70 border border-gray-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
                    <TrendingUp size={18} className="text-emerald-400" />
                    <span>5. Future Possibilities & Scientific Predictions</span>
                  </h2>
                  <span className="text-[11px] text-gray-400 italic">
                    Includes uncertainty ratings (not guaranteed facts)
                  </span>
                </div>

                <div className="space-y-3">
                  {dossier.futurePossibilitiesAndPredictions.map((pred, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-gray-800/40 border border-gray-700/70 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-semibold text-white text-sm">{pred.prediction}</span>
                        {pred.timeframe && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                            {pred.timeframe}
                          </span>
                        )}
                      </div>

                      {/* Uncertainty & Confidence Meter */}
                      <div className="flex items-center gap-4 text-xs pt-2 border-t border-gray-700/50">
                        <div>
                          <span className="text-gray-400 block text-[10px] uppercase">Uncertainty</span>
                          <span
                            className={`font-semibold ${
                              pred.uncertaintyLevel.toLowerCase() === 'high'
                                ? 'text-amber-400'
                                : pred.uncertaintyLevel.toLowerCase() === 'medium'
                                ? 'text-blue-400'
                                : 'text-emerald-400'
                            }`}
                          >
                            {pred.uncertaintyLevel}
                          </span>
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                            <span>Scientific Confidence Score</span>
                            <span className="font-mono text-gray-200">{pred.confidencePercent}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-gray-700 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400"
                              style={{ width: `${pred.confidencePercent}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* RIGHT COLUMN: Habitat, Applications, Pros/Cons Matrix, Peer Discoveries, Academic Sources */}
        <div className="space-y-6">
          {/* Habitat & Distribution */}
          {dossier.habitatAndDistribution && (
            <div className="p-6 rounded-3xl bg-gray-900/70 border border-gray-800 space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                <MapPin size={16} className="text-rose-400" />
                <span>Habitat & Distribution</span>
              </h2>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-gray-400 uppercase text-[10px] block">Primary Habitat / Location</span>
                  <p className="text-gray-200 font-medium">{dossier.habitatAndDistribution.primaryRegion}</p>
                </div>
                {dossier.habitatAndDistribution.biomeOrEnvironment && (
                  <div>
                    <span className="text-gray-400 uppercase text-[10px] block">Biome / Environmental State</span>
                    <p className="text-gray-300">{dossier.habitatAndDistribution.biomeOrEnvironment}</p>
                  </div>
                )}
                {dossier.habitatAndDistribution.distributionDetails && (
                  <p className="text-gray-400 text-[11px] leading-relaxed pt-1 border-t border-gray-800">
                    {dossier.habitatAndDistribution.distributionDetails}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Real-world Importance & Applications */}
          {dossier.importanceAndApplications && dossier.importanceAndApplications.length > 0 && (
            <div className="p-6 rounded-3xl bg-gray-900/70 border border-gray-800 space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                <Sparkles size={16} className="text-amber-400" />
                <span>Importance & Practical Applications</span>
              </h2>
              <ul className="space-y-2 text-xs text-gray-300">
                {dossier.importanceAndApplications.map((app, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">✦</span>
                    <span className="leading-relaxed">{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Advantages vs Disadvantages Matrix */}
          {dossier.advantagesAndDisadvantages && (
            <div className="p-6 rounded-3xl bg-gray-900/70 border border-gray-800 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                <span>Comparative Dynamics Matrix</span>
              </h2>
              <div className="space-y-3">
                {/* Advantages */}
                <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase">
                    <CheckCircle2 size={14} />
                    <span>Biological / Physical Strengths</span>
                  </div>
                  <ul className="space-y-1 text-xs text-emerald-200/90">
                    {dossier.advantagesAndDisadvantages.advantagesOrBenefits?.map((adv, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span>•</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disadvantages / Vulnerabilities */}
                <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase">
                    <XCircle size={14} />
                    <span>Vulnerabilities / Limits / Risks</span>
                  </div>
                  <ul className="space-y-1 text-xs text-rose-200/90">
                    {dossier.advantagesAndDisadvantages.disadvantagesOrRisks?.map((dis, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span>•</span>
                        <span>{dis}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Peer-Reviewed Discoveries & Literature */}
          {dossier.relatedDiscoveriesAndResearch && dossier.relatedDiscoveriesAndResearch.length > 0 && (
            <div className="p-6 rounded-3xl bg-gray-900/70 border border-gray-800 space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                <BookOpen size={16} className="text-indigo-400" />
                <span>Landmark Discoveries & Papers</span>
              </h2>
              <div className="space-y-2.5">
                {dossier.relatedDiscoveriesAndResearch.map((paper, i) => (
                  <div key={i} className="p-3 rounded-xl bg-gray-800/40 border border-gray-700 text-xs space-y-1">
                    <h3 className="font-semibold text-white">{paper.title}</h3>
                    <p className="text-gray-300 text-[11px]">{paper.findings}</p>
                    {paper.journalOrInstitution && (
                      <span className="text-[10px] text-indigo-300 font-mono block">
                        Source: {paper.journalOrInstitution}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Academic References */}
          {dossier.references && dossier.references.length > 0 && (
            <div className="p-6 rounded-3xl bg-gray-900/70 border border-gray-800 space-y-3">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Peer Citations & Verified Sources
              </h2>
              <div className="space-y-2">
                {dossier.references.map((ref, i) => (
                  <div key={i} className="text-xs text-gray-400 space-y-0.5">
                    <span className="text-gray-200 font-medium block">{ref.sourceName}</span>
                    <p className="text-[11px] text-gray-400">{ref.citation}</p>
                    {ref.doiOrUrl && (
                      <span className="text-[10px] font-mono text-indigo-400 block">
                        {ref.doiOrUrl}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ask Personal AI Teacher button */}
          {onAskTeacherAboutTopic && (
            <button
              onClick={() => onAskTeacherAboutTopic(dossier.topic)}
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl transition"
            >
              <Sparkles size={16} />
              <span>Ask World Brain AI Teacher to Explain Simply</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
