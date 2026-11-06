import React from 'react';
import {
  Brain,
  Search,
  Box,
  GraduationCap,
  Microscope,
  User,
  Building2,
  Languages,
} from 'lucide-react';
import { UserProfile } from '../types/knowledge';

export type ActiveView = 'search' | 'visual3d' | 'teacher' | 'research' | 'dashboard' | 'openai';

interface NavbarProps {
  activeView: ActiveView;
  onSelectView: (view: ActiveView) => void;
  onOpenOpenAIModal: () => void;
  userProfile: UserProfile;
  language: 'en' | 'hi';
  onToggleLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onSelectView,
  onOpenOpenAIModal,
  userProfile,
  language,
  onToggleLanguage,
}) => {
  const navItems = [
    { id: 'search', label: language === 'hi' ? 'सार्वभौमिक खोज' : 'Universal Search', icon: Search },
    { id: 'visual3d', label: language === 'hi' ? '3D दृश्य शिक्षण' : '3D Visual Learning', icon: Box },
    { id: 'teacher', label: language === 'hi' ? 'पर्सनल AI शिक्षक' : 'Personal AI Teacher', icon: GraduationCap },
    { id: 'research', label: language === 'hi' ? 'रिसर्च लैब' : 'AI Research Lab', icon: Microscope },
    { id: 'dashboard', label: language === 'hi' ? 'छात्र डैशबोर्ड' : 'Student Portfolio', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-gray-950/85 backdrop-blur-xl border-b border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* LOGO & BRANDING */}
        <button
          onClick={() => onSelectView('search')}
          className="flex items-center gap-3 text-left group shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-lg group-hover:scale-105 transition">
            <div className="w-full h-full rounded-[14px] bg-gray-950 flex items-center justify-center text-cyan-400">
              <Brain size={22} className="group-hover:text-white transition" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base md:text-lg tracking-tight text-white font-heading">
                WORLD BRAIN
              </span>
              <span className="px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-400 font-mono text-[10px] font-bold border border-indigo-500/40">
                AI
              </span>
            </div>
            <span className="text-[10px] text-gray-400 block -mt-0.5 font-medium">
              Explore Everything. Learn Without Limits.
            </span>
          </div>
        </button>

        {/* CENTER NAVIGATION PILLS */}
        <nav className="hidden lg:flex items-center gap-1 bg-gray-900/90 border border-gray-800 p-1.5 rounded-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id as ActiveView)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* RIGHT CONTROLS: Language, OpenAI Proposal & Profile Badge */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={onToggleLanguage}
            className="px-2.5 py-1.5 rounded-xl border border-gray-800 bg-gray-900 text-xs font-semibold text-gray-300 hover:text-white flex items-center gap-1.5 transition"
            title="Toggle English / हिन्दी"
          >
            <Languages size={14} className="text-indigo-400" />
            <span className="font-mono uppercase">{language}</span>
          </button>

          {/* OpenAI Collaboration Dossier Button */}
          <button
            onClick={onOpenOpenAIModal}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
          >
            <Building2 size={14} className="text-emerald-400" />
            <span className="hidden sm:inline">OpenAI Collaboration</span>
            <span className="sm:hidden">Proposal</span>
          </button>

          {/* Profile XP Indicator */}
          <button
            onClick={() => onSelectView('dashboard')}
            className="p-1.5 pl-2.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 flex items-center gap-2 text-xs text-gray-300"
          >
            <span className="font-mono text-purple-400 font-bold hidden sm:inline">
              {userProfile.xp} XP
            </span>
            <div className="w-7 h-7 rounded-lg bg-purple-600/30 text-purple-300 flex items-center justify-center font-bold text-xs">
              {userProfile.name[0]}
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="lg:hidden flex items-center justify-around border-t border-gray-800/80 bg-gray-950/95 px-2 py-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id as ActiveView)}
              className={`p-2 rounded-xl text-[10px] flex flex-col items-center gap-0.5 transition ${
                isActive ? 'text-indigo-400 font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon size={16} />
              <span>{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
