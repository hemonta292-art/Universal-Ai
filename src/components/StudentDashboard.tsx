import React, { useState } from 'react';
import {
  User,
  Flame,
  Award,
  BookOpen,
  Bookmark,
  FileText,
  CheckCircle,
  Clock,
  Printer,
  Trash2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { UserProfile } from '../types/knowledge';
import { KNOWLEDGE_BRANCHES } from '../data/branches';

interface StudentDashboardProps {
  userProfile: UserProfile;
  onSelectTopic: (topicName: string) => void;
  onRemoveBookmark: (topicName: string) => void;
  onDeleteNote: (noteId: string) => void;
  language?: 'en' | 'hi';
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  userProfile,
  onSelectTopic,
  onRemoveBookmark,
  onDeleteNote,
  language = 'en',
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'bookmarks' | 'notes'>('overview');
  const [previewNote, setPreviewNote] = useState<{ topic: string; content: string } | null>(null);

  return (
    <div className="w-full space-y-6">
      {/* STUDENT PROFILE HERO CARD */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900/90 to-purple-950/40 border border-gray-800 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-1 flex items-center justify-center shadow-xl">
              <div className="w-full h-full rounded-[22px] bg-gray-950 flex items-center justify-center text-white">
                <User size={30} className="text-purple-300" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white font-heading">{userProfile.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  {userProfile.learningLevel}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                {language === 'hi'
                  ? 'व्यक्तिगत छात्र शिक्षण डैशबोर्ड और प्रगति ट्रैकिंग'
                  : 'Universal Student Learning & Research Portfolio'}
              </p>
            </div>
          </div>

          {/* Gamification Stats: Streak, XP, Mastered Topics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-gray-800/60 border border-gray-700/80 text-center min-w-[90px]">
              <div className="flex items-center justify-center text-amber-400 gap-1 mb-1">
                <Flame size={16} />
                <span className="font-extrabold text-base text-white">{userProfile.streakDays}</span>
              </div>
              <span className="text-[10px] font-semibold text-gray-400 uppercase">Day Streak</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-800/60 border border-gray-700/80 text-center min-w-[90px]">
              <div className="flex items-center justify-center text-indigo-400 gap-1 mb-1">
                <Award size={16} />
                <span className="font-extrabold text-base text-white">{userProfile.xp}</span>
              </div>
              <span className="text-[10px] font-semibold text-gray-400 uppercase">Learning XP</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-800/60 border border-gray-700/80 text-center min-w-[90px]">
              <div className="flex items-center justify-center text-emerald-400 gap-1 mb-1">
                <CheckCircle size={16} />
                <span className="font-extrabold text-base text-white">{userProfile.topicsMastered.length}</span>
              </div>
              <span className="text-[10px] font-semibold text-gray-400 uppercase">Mastered</span>
            </div>
          </div>
        </div>
      </div>

      {/* DASHBOARD NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-gray-800 pb-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: TrendingUp },
          { id: 'curriculum', label: '13-Branch Curriculum Tracks', icon: BookOpen },
          { id: 'bookmarks', label: `Saved Bookmarks (${userProfile.bookmarks.length})`, icon: Bookmark },
          { id: 'notes', label: `Study Notes & PDF (${userProfile.savedNotes.length})`, icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & RECENT PROGRESS */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Recommended Next Topics & Mastery */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-3xl bg-gray-900/70 border border-gray-800 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                <BookOpen size={18} className="text-indigo-400" />
                <span>Next Recommended Learning Steps</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { topic: 'Human Heart', branch: 'Anatomy', xp: '+100 XP', est: '12 min' },
                  { topic: 'Quantum Atom & Orbitals', branch: 'Physics', xp: '+120 XP', est: '15 min' },
                  { topic: 'Solar System Dynamics', branch: 'Astronomy', xp: '+90 XP', est: '10 min' },
                  { topic: 'DNA Double Helix', branch: 'Genetics', xp: '+110 XP', est: '14 min' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-gray-800/40 border border-gray-700/70 hover:border-indigo-500/50 transition flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-mono text-indigo-400 block">{item.branch}</span>
                      <h3 className="font-semibold text-white text-xs mt-0.5">{item.topic}</h3>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                        <span className="text-emerald-400 font-bold">{item.xp}</span>
                        <span>•</span>
                        <span>{item.est}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectTopic(item.topic)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white font-medium text-xs flex items-center gap-1"
                    >
                      <span>Study</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recently Mastered Topics */}
            <div className="p-6 rounded-3xl bg-gray-900/70 border border-gray-800 space-y-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-gray-400">
                Verified Mastered Topics ({userProfile.topicsMastered.length})
              </h2>
              <div className="flex flex-wrap gap-2">
                {userProfile.topicsMastered.map((topic, i) => (
                  <button
                    key={i}
                    onClick={() => onSelectTopic(topic)}
                    className="px-3 py-1.5 rounded-xl bg-gray-800/80 hover:bg-gray-700 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-1.5 transition"
                  >
                    <CheckCircle size={13} className="text-emerald-400" />
                    <span>{topic}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Global Study Goals & Streak Badges */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-gray-900/70 border border-gray-800 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-gray-400">
                Weekly Study Commitment
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-300">
                  <span>Weekly Goal: 5 hours</span>
                  <span className="font-mono text-purple-400">3.8 / 5.0 hrs (76%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-800 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[76%]" />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-800 space-y-2 text-xs text-gray-300">
                <div className="flex items-center justify-between">
                  <span>Daily Study Streak</span>
                  <span className="font-bold text-amber-400">🔥 {userProfile.streakDays} Days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Global Ranking</span>
                  <span className="font-bold text-indigo-400">Top 3% of Learners</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 13-BRANCH CURRICULUM TRACKS */}
      {activeTab === 'curriculum' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {KNOWLEDGE_BRANCHES.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-3xl bg-gray-900/70 border border-gray-800 hover:border-gray-700 transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-indigo-400 font-semibold uppercase">
                    Core Branch
                  </span>
                  <span className="text-[10px] text-gray-500">Track 101</span>
                </div>

                <h3 className="text-base font-bold text-white font-heading">
                  {language === 'hi' ? b.nameHi : b.name}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                  {b.description}
                </p>
              </div>

              {/* Sample chapters */}
              <div className="space-y-1.5 pt-2 border-t border-gray-800">
                <span className="text-[10px] font-semibold text-gray-400 uppercase block">
                  Curriculum Modules:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {b.sampleTopics.map((top, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSelectTopic(top)}
                      className="px-2 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-[11px] text-gray-300 hover:text-white transition"
                    >
                      {top}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: SAVED BOOKMARKS */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          {userProfile.bookmarks.length === 0 ? (
            <div className="p-12 rounded-3xl bg-gray-900/50 border border-gray-800 text-center text-xs text-gray-400 space-y-2">
              <Bookmark size={24} className="mx-auto text-gray-600" />
              <p>No saved topics yet. Click "Save" on any knowledge dossier to bookmark it here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {userProfile.bookmarks.map((topic, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-gray-700 transition flex items-center justify-between"
                >
                  <span className="font-semibold text-xs text-white">{topic}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onSelectTopic(topic)}
                      className="p-2 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs transition"
                      title="Open Dossier"
                    >
                      <ExternalLink size={14} />
                    </button>
                    <button
                      onClick={() => onRemoveBookmark(topic)}
                      className="p-2 rounded-lg bg-gray-800 hover:bg-rose-950 text-gray-400 hover:text-rose-400 transition"
                      title="Remove Bookmark"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SAVED STUDY NOTES & PDF HANDOUTS */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          {userProfile.savedNotes.length === 0 ? (
            <div className="p-12 rounded-3xl bg-gray-900/50 border border-gray-800 text-center text-xs text-gray-400 space-y-2">
              <FileText size={24} className="mx-auto text-gray-600" />
              <p>No study notes saved yet. Generate lessons in the AI Teacher tab and click "Save Notes".</p>
            </div>
          ) : (
            <div className="space-y-3">
              {userProfile.savedNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-5 rounded-2xl bg-gray-900/80 border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-sm">{note.topic}</h3>
                      <span className="text-[10px] font-mono text-gray-500">{note.date}</span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-1 max-w-xl">
                      {note.content.slice(0, 150)}...
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewNote(note)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium"
                    >
                      View Notes
                    </button>
                    <button
                      onClick={() => {
                        const win = window.open('', '_blank');
                        if (win) {
                          win.document.write(`<pre style="font-family:sans-serif;padding:30px;line-height:1.6">${note.content}</pre>`);
                          win.print();
                        }
                      }}
                      className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300"
                      title="Print"
                    >
                      <Printer size={15} />
                    </button>
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      className="p-2 rounded-lg bg-gray-800 hover:bg-rose-950 text-gray-400 hover:text-rose-400"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Note Preview Modal */}
          {previewNote && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-gray-900 border border-gray-800 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[85vh] flex flex-col">
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <h3 className="text-lg font-bold text-white font-heading">{previewNote.topic}</h3>
                  <button
                    onClick={() => setPreviewNote(null)}
                    className="text-gray-400 hover:text-white text-sm font-mono"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto font-mono text-xs text-gray-200 leading-relaxed whitespace-pre-line p-3 bg-gray-950 rounded-2xl border border-gray-800">
                  {previewNote.content}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(previewNote.content);
                      alert('Copied study notes to clipboard!');
                    }}
                    className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold"
                  >
                    Copy Markdown
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                  >
                    Print Handout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
