import React, { useState, useEffect } from 'react';
import { Navbar, ActiveView } from './components/Navbar';
import { UniversalSearch } from './components/UniversalSearch';
import { CompleteInfoEngine } from './components/CompleteInfoEngine';
import { VisualLearning3D, ModelType } from './components/VisualLearning3D';
import { PersonalAITeacher } from './components/PersonalAITeacher';
import { ResearchAssistant } from './components/ResearchAssistant';
import { StudentDashboard } from './components/StudentDashboard';
import { OpenAICollaborationModal } from './components/OpenAICollaborationModal';
import { VisionAnalysisModal } from './components/VisionAnalysisModal';
import { CURATED_TOPICS } from './data/curatedTopics';
import { TopicDossier, UserProfile } from './types/knowledge';
import { Sparkles, Brain, ShieldAlert, Heart, Building2 } from 'lucide-react';

const STORAGE_KEY = 'world_brain_ai_profile_v1';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('search');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [active3DModel, setActive3DModel] = useState<ModelType>('heart');
  const [teacherTopicFocus, setTeacherTopicFocus] = useState<string>('Human Heart');

  // Currently loaded encyclopedic dossier
  const [currentDossier, setCurrentDossier] = useState<TopicDossier>(
    CURATED_TOPICS['human-heart']
  );
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Modals
  const [isOpenAIModalOpen, setIsOpenAIModalOpen] = useState<boolean>(false);
  const [isVisionModalOpen, setIsVisionModalOpen] = useState<boolean>(false);

  // Student Profile State (persisted in localStorage)
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return {
      name: 'Hemonta',
      learningLevel: 'High School',
      language: 'en',
      xp: 450,
      streakDays: 4,
      topicsMastered: [
        'Human Heart (Cardiovascular System)',
        'DNA Double Helix & Gene Expression',
        'Quantum Atom & Electron Orbitals',
      ],
      bookmarks: [
        'Human Heart (Cardiovascular System)',
        'Human Brain & Synaptic Architecture',
        'Solar System & Planetary Dynamics',
      ],
      savedNotes: [
        {
          id: 'note-1',
          topic: 'Cardiac Hemodynamics & Action Potentials',
          date: '2026-11-05',
          content: `# Cardiac Hemodynamics Masterclass Notes
- Sinoatrial (SA) Node: intrinsic biological pacemaker (~70 bpm).
- Left Ventricle produces high systemic stroke volume (120 mmHg).
- Coronary circulation perfuses the myocardium exclusively during diastole.`,
        },
      ],
    };
  });

  // Save profile to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userProfile));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [userProfile]);

  // Universal Search Logic: Checks curated master list or calls Gemini AI
  const handleUniversalSearch = async (query: string, branch?: string) => {
    const qLower = query.toLowerCase().trim();
    setIsSearching(true);
    setSearchError(null);

    // 1. Instant Curated Check
    const matchedCuratedKey = Object.keys(CURATED_TOPICS).find((key) => {
      const item = CURATED_TOPICS[key];
      return (
        item.topic.toLowerCase().includes(qLower) ||
        (item.commonName && item.commonName.toLowerCase().includes(qLower)) ||
        (item.scientificName && item.scientificName.toLowerCase().includes(qLower)) ||
        qLower.includes(key.replace('-', ' '))
      );
    });

    if (matchedCuratedKey) {
      setCurrentDossier(CURATED_TOPICS[matchedCuratedKey]);
      setIsSearching(false);
      setActiveView('search');

      // Award XP
      setUserProfile((prev) => ({
        ...prev,
        xp: prev.xp + 25,
      }));
      return;
    }

    // 2. Dynamic Server-Side Gemini API Call
    try {
      const response = await fetch('/api/knowledge/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          branch,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error(`Knowledge engine returned ${response.status}`);
      }

      const dossierData: TopicDossier = await response.json();
      setCurrentDossier(dossierData);
      setActiveView('search');

      // Award XP & add to mastered if unique
      setUserProfile((prev) => ({
        ...prev,
        xp: prev.xp + 50,
        topicsMastered: prev.topicsMastered.includes(dossierData.topic)
          ? prev.topicsMastered
          : [...prev.topicsMastered, dossierData.topic],
      }));
    } catch (err: any) {
      console.error('Search error:', err);
      setSearchError(
        err?.message || 'Could not connect to World Brain AI knowledge engine.'
      );
    } finally {
      setIsSearching(false);
    }
  };

  // Bookmark Toggle
  const handleToggleBookmark = () => {
    const topic = currentDossier.topic;
    setUserProfile((prev) => {
      const isAlready = prev.bookmarks.includes(topic);
      return {
        ...prev,
        bookmarks: isAlready
          ? prev.bookmarks.filter((b) => b !== topic)
          : [...prev.bookmarks, topic],
      };
    });
  };

  // Remove bookmark from dashboard
  const handleRemoveBookmark = (topic: string) => {
    setUserProfile((prev) => ({
      ...prev,
      bookmarks: prev.bookmarks.filter((b) => b !== topic),
    }));
  };

  // Save notes from lesson generator
  const handleSaveNotes = (topic: string, content: string) => {
    const newNote = {
      id: `note-${Date.now()}`,
      topic,
      date: new Date().toISOString().split('T')[0],
      content,
    };
    setUserProfile((prev) => ({
      ...prev,
      savedNotes: [newNote, ...prev.savedNotes],
      xp: prev.xp + 40,
    }));
  };

  // Delete note
  const handleDeleteNote = (noteId: string) => {
    setUserProfile((prev) => ({
      ...prev,
      savedNotes: prev.savedNotes.filter((n) => n.id !== noteId),
    }));
  };

  // Launch 3D Model Explorer
  const handleOpen3DModel = (modelType: string) => {
    const validModels: ModelType[] = ['heart', 'brain', 'solarsystem', 'dna', 'atom', 'plantcell'];
    if (validModels.includes(modelType as ModelType)) {
      setActive3DModel(modelType as ModelType);
    } else {
      setActive3DModel('heart');
    }
    setActiveView('visual3d');
  };

  // Jump to AI Teacher for Socratic Dialogue on Current Topic
  const handleAskTeacherAboutTopic = (topic: string) => {
    setTeacherTopicFocus(topic);
    setActiveView('teacher');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col selection:bg-indigo-500/30 selection:text-white">
      {/* GLOBAL NAVBAR */}
      <Navbar
        activeView={activeView}
        onSelectView={setActiveView}
        onOpenOpenAIModal={() => setIsOpenAIModalOpen(true)}
        userProfile={userProfile}
        language={language}
        onToggleLanguage={() => setLanguage((l) => (l === 'en' ? 'hi' : 'en'))}
      />

      {/* MAIN VIEWPORT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* VIEW 1: UNIVERSAL SEARCH & COMPLETE INFORMATION ENGINE */}
        {activeView === 'search' && (
          <div className="space-y-10">
            {/* Search Bar & 13 Branches Selector */}
            <UniversalSearch
              onSearch={handleUniversalSearch}
              onOpenVisionModal={() => setIsVisionModalOpen(true)}
              isLoading={isSearching}
              language={language}
            />

            {/* Error Message if dynamic search failed */}
            {searchError && (
              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs">
                {searchError}
              </div>
            )}

            {/* Complete 13-Point Dossier View */}
            <CompleteInfoEngine
              dossier={currentDossier}
              isBookmarked={userProfile.bookmarks.includes(currentDossier.topic)}
              onToggleBookmark={handleToggleBookmark}
              onOpen3DModel={handleOpen3DModel}
              onAskTeacherAboutTopic={handleAskTeacherAboutTopic}
              language={language}
            />
          </div>
        )}

        {/* VIEW 2: 3D VISUAL LEARNING EXPLORER */}
        {activeView === 'visual3d' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Interactive Spatial Cognition
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-white font-heading">
                  3D Visual Learning & Anatomy Engine
                </h1>
                <p className="text-xs text-gray-400 mt-0.5">
                  Rotate, inspect structural pins, slide exploded layers, and listen to physiological pronunciations.
                </p>
              </div>

              <button
                onClick={() => handleUniversalSearch(active3DModel)}
                className="px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-700 hover:border-gray-500 text-xs text-gray-300 hover:text-white transition flex items-center gap-1.5 self-start"
              >
                <span>Read Full 13-Point Dossier for this Model</span>
                →
              </button>
            </div>

            <VisualLearning3D
              initialModel={active3DModel}
              onExploreTopicDossier={handleUniversalSearch}
              language={language}
            />
          </div>
        )}

        {/* VIEW 3: PERSONAL AI TEACHER */}
        {activeView === 'teacher' && (
          <PersonalAITeacher
            initialTopic={teacherTopicFocus}
            initialLanguage={language}
            onTopicExplored={(top) =>
              setUserProfile((prev) => ({
                ...prev,
                xp: prev.xp + 30,
              }))
            }
            onSaveNotes={handleSaveNotes}
          />
        )}

        {/* VIEW 4: ADVANCED AI RESEARCH ASSISTANT */}
        {activeView === 'research' && (
          <ResearchAssistant
            initialTopic={currentDossier.topic}
            onExploreDossier={handleUniversalSearch}
          />
        )}

        {/* VIEW 5: STUDENT LEARNING DASHBOARD */}
        {activeView === 'dashboard' && (
          <StudentDashboard
            userProfile={userProfile}
            onSelectTopic={handleUniversalSearch}
            onRemoveBookmark={handleRemoveBookmark}
            onDeleteNote={handleDeleteNote}
            language={language}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-gray-900 bg-gray-950/90 py-8 px-4 text-xs text-gray-500 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Brain size={16} className="text-indigo-400" />
            <span className="font-bold text-gray-300 font-heading">WORLD BRAIN AI</span>
            <span>—</span>
            <span>Universal Knowledge, Research & Education Platform</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setIsOpenAIModalOpen(true)}
              className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
            >
              <Building2 size={13} />
              <span>OpenAI Collaboration Pitch</span>
            </button>
            <span>•</span>
            <span className="text-gray-400">
              "Explore Everything. Understand Anything. Learn Without Limits."
            </span>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <OpenAICollaborationModal
        isOpen={isOpenAIModalOpen}
        onClose={() => setIsOpenAIModalOpen(false)}
      />

      <VisionAnalysisModal
        isOpen={isVisionModalOpen}
        onClose={() => setIsVisionModalOpen(false)}
        onOpenDossier={handleUniversalSearch}
        onOpen3DModel={handleOpen3DModel}
      />
    </div>
  );
}
