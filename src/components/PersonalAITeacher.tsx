import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  MessageSquare,
  BookOpen,
  Award,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Languages,
  Sparkles,
  Printer,
  Copy,
  Check,
  RotateCcw,
  ChevronRight,
  HelpCircle,
  CheckCircle2,
  XCircle,
  FileText,
} from 'lucide-react';
import {
  PedagogicalLevel,
  TeacherChatMessage,
  MasterclassLesson,
  QuizTest,
} from '../types/knowledge';

interface PersonalAITeacherProps {
  initialTopic?: string;
  initialLanguage?: 'en' | 'hi';
  onTopicExplored?: (topic: string) => void;
  onSaveNotes?: (topic: string, content: string) => void;
}

export const PersonalAITeacher: React.FC<PersonalAITeacherProps> = ({
  initialTopic = 'Human Heart',
  initialLanguage = 'en',
  onTopicExplored,
  onSaveNotes,
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'lesson' | 'quiz'>('chat');
  const [language, setLanguage] = useState<'en' | 'hi'>(initialLanguage);
  const [learningLevel, setLearningLevel] = useState<PedagogicalLevel>('High School');
  const [topicInput, setTopicInput] = useState<string>(initialTopic);

  // Chat state
  const [chatMessages, setChatMessages] = useState<TeacherChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text:
        initialLanguage === 'hi'
          ? `नमस्ते! मैं आपका वर्ल्ड ब्रेन एआई शिक्षक हूँ। आप किस वैज्ञानिक या ऐतिहासिक विषय को गहराई से और सरल भाषा में समझना चाहते हैं?`
          : `Hello! I am your World Brain AI Personal Teacher. Whether you are curious about quantum physics, cellular biology, or cosmic astrophysics, I can break it down simply or explore advanced mathematics. What would you like to explore today?`,
      timestamp: Date.now(),
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  // Lesson state
  const [lessonData, setLessonData] = useState<MasterclassLesson | null>(null);
  const [isLessonLoading, setIsLessonLoading] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedConceptAnswers, setSelectedConceptAnswers] = useState<Record<number, number>>({});
  const [copiedNotes, setCopiedNotes] = useState(false);

  // Quiz state
  const [quizData, setQuizData] = useState<QuizTest | null>(null);
  const [isQuizLoading, setIsQuizLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatLoading]);

  // Sync if topic passed from outer props
  useEffect(() => {
    if (initialTopic) setTopicInput(initialTopic);
  }, [initialTopic]);

  // Text to speech helper
  const speakText = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (speakingMsgId === id) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 1.0;
    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);
    setSpeakingMsgId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Speech-to-text mic input (Web Speech API)
  const toggleSpeechRecognition = () => {
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

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setChatInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  // Send message to AI Teacher
  const handleSendMessage = async (customPrompt?: string) => {
    const query = (customPrompt || chatInput).trim();
    if (!query || isChatLoading) return;

    const userMsg: TeacherChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: Date.now(),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/teacher/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: chatMessages.slice(-6).map((m) => ({ role: m.role, text: m.text })),
          level: learningLevel,
          language,
          topicContext: topicInput,
        }),
      });

      const data = await response.json();
      const botMsg: TeacherChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: data.reply || 'I am ready to help you continue learning.',
        timestamp: Date.now(),
      };
      setChatMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: 'model',
          text: `My apologies, I encountered a connection hitch: ${err?.message || 'Server error'}. Please try again.`,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Generate structured step-by-step lesson
  const generateLesson = async () => {
    if (!topicInput || isLessonLoading) return;
    setIsLessonLoading(true);
    setCurrentStepIndex(0);
    setSelectedConceptAnswers({});
    try {
      const res = await fetch('/api/teacher/lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicInput,
          level: learningLevel,
          language,
        }),
      });
      const data = await res.json();
      setLessonData(data);
      if (onTopicExplored) onTopicExplored(topicInput);
    } catch (err: any) {
      alert(`Lesson generation error: ${err?.message}`);
    } finally {
      setIsLessonLoading(false);
    }
  };

  // Generate dynamic quiz
  const generateQuiz = async () => {
    if (!topicInput || isQuizLoading) return;
    setIsQuizLoading(true);
    setUserAnswers({});
    setIsQuizSubmitted(false);
    setQuizScore(0);
    try {
      const res = await fetch('/api/teacher/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicInput,
          count: 5,
          level: learningLevel,
          language,
        }),
      });
      const data = await res.json();
      setQuizData(data);
    } catch (err: any) {
      alert(`Quiz generation error: ${err?.message}`);
    } finally {
      setIsQuizLoading(false);
    }
  };

  // Submit quiz & calculate score
  const handleQuizSubmit = () => {
    if (!quizData) return;
    let correct = 0;
    quizData.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    setQuizScore(correct);
    setIsQuizSubmitted(true);

    if (correct >= 4) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const copyStudyNotes = () => {
    if (!lessonData?.printableStudyNotes) return;
    navigator.clipboard.writeText(lessonData.printableStudyNotes);
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 2000);
    if (onSaveNotes) {
      onSaveNotes(lessonData.title, lessonData.printableStudyNotes);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* TEACHER TOP CONTROLLER BAR */}
      <div className="p-5 md:p-6 rounded-3xl bg-gray-900/90 border border-gray-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
            <GraduationCap size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white font-heading">
                {language === 'hi' ? 'वर्ल्ड ब्रेन पर्सनल एआई शिक्षक' : 'Personal AI Teacher'}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Online
              </span>
            </div>
            <p className="text-xs text-gray-400">
              {language === 'hi'
                ? 'कठिन वैज्ञानिक अवधारणाओं को सरल, चरणबद्ध और रोचक रूप में समझें'
                : 'Adaptive step-by-step masterclasses, voice explanations, notes & cognitive exams'}
            </p>
          </div>
        </div>

        {/* Global Controls: Language & Pedagogical Level */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Language Switch */}
          <button
            onClick={() => {
              const next = language === 'en' ? 'hi' : 'en';
              setLanguage(next);
            }}
            className="px-3 py-2 rounded-xl border border-gray-700 bg-gray-800/80 text-xs font-semibold text-gray-300 hover:text-white flex items-center gap-1.5 transition"
          >
            <Languages size={15} className="text-indigo-400" />
            <span>{language === 'en' ? 'English (En)' : 'हिन्दी (Hindi)'}</span>
          </button>

          {/* Student Learning Level Selector */}
          <div className="flex items-center bg-gray-800/80 border border-gray-700 rounded-xl p-1 text-xs">
            {(['Beginner (ELI5)', 'High School', 'University', 'Research Scientist'] as PedagogicalLevel[]).map(
              (lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLearningLevel(lvl)}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition ${
                    learningLevel === lvl
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {lvl.split(' ')[0]}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* THREE INTERACTIVE TEACHER MODES: Chat / Step Lesson / Quiz */}
      <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeTab === 'chat'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <MessageSquare size={16} />
          <span>{language === 'hi' ? 'संवादात्मक चैट' : 'Socratic Chat'}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('lesson');
            if (!lessonData) generateLesson();
          }}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeTab === 'lesson'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <BookOpen size={16} />
          <span>{language === 'hi' ? 'चरणबद्ध पाठ (Lessons)' : 'Step-by-Step Lessons'}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('quiz');
            if (!quizData) generateQuiz();
          }}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeTab === 'quiz'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <Award size={16} />
          <span>{language === 'hi' ? 'अभ्यास परीक्षा (Quiz Arena)' : 'Practice Exam Arena'}</span>
        </button>
      </div>

      {/* MODE 1: SOCRATIC CHAT & VOICE CONVERSATION */}
      {activeTab === 'chat' && (
        <div className="rounded-3xl bg-gray-900/70 border border-gray-800 flex flex-col h-[650px] shadow-2xl overflow-hidden">
          {/* Chat Topic Focus Input */}
          <div className="p-3.5 bg-gray-900/90 border-b border-gray-800 flex items-center gap-2.5">
            <span className="text-xs text-gray-400 font-medium whitespace-nowrap">Focus Topic:</span>
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="e.g. CRISPR, Quantum Entanglement, Black Holes..."
              className="flex-1 bg-gray-800/80 border border-gray-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-500/30">
              Level: {learningLevel.split(' ')[0]}
            </span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md">
                    <GraduationCap size={16} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none shadow-md'
                      : 'bg-gray-800/90 border border-gray-700/80 text-gray-200 rounded-bl-none shadow-lg'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Message Audio Listen Button */}
                  {msg.role === 'model' && (
                    <div className="mt-3 pt-2 border-t border-gray-700/60 flex items-center justify-between">
                      <button
                        onClick={() => speakText(msg.id, msg.text)}
                        className="text-[11px] text-indigo-300 hover:text-white flex items-center gap-1 font-medium transition"
                      >
                        {speakingMsgId === msg.id ? (
                          <>
                            <VolumeX size={13} className="text-rose-400" />
                            <span>Stop Audio</span>
                          </>
                        ) : (
                          <>
                            <Volume2 size={13} className="text-emerald-400" />
                            <span>Read Aloud</span>
                          </>
                        )}
                      </button>
                      <span className="text-[10px] text-gray-500 font-mono">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isChatLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 animate-pulse">
                  <GraduationCap size={16} />
                </div>
                <div className="p-4 rounded-2xl bg-gray-800/80 border border-gray-700 text-xs text-gray-400 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]" />
                  <span>Teacher is formulating explanation...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Quick Chips */}
          <div className="px-4 py-2 border-t border-gray-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] text-gray-400">
            <span className="font-semibold text-indigo-400 whitespace-nowrap">Try:</span>
            {[
              'Explain this with a simple everyday analogy',
              'What are the core mathematical or physical laws?',
              'Why is this significant for the future of humanity?',
              language === 'hi' ? 'इसे हिन्दी में आसान भाषा में समझाएं' : 'Can you give me a 3-step breakdown?',
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                className="px-2.5 py-1 rounded-lg bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white whitespace-nowrap border border-gray-700 transition"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Input Dock */}
          <div className="p-3 md:p-4 bg-gray-900 border-t border-gray-800 flex items-center gap-2">
            <button
              onClick={toggleSpeechRecognition}
              className={`p-3 rounded-xl border transition ${
                isListening
                  ? 'bg-rose-600 border-rose-400 text-white animate-pulse'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:text-white'
              }`}
              title="Speak via Microphone"
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={
                language === 'hi'
                  ? 'यहाँ अपना प्रश्न पूछें (उदा. माइटोकॉन्ड्रिया कैसे काम करता है?)...'
                  : 'Ask any question or concept (e.g. How does quantum entanglement work?)...'
              }
              className="flex-1 bg-gray-800/90 border border-gray-700 rounded-xl px-4 py-3 text-xs md:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!chatInput.trim() || isChatLoading}
              className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium disabled:opacity-50 hover:from-indigo-600 hover:to-purple-700 transition shadow-lg"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* MODE 2: STEP-BY-STEP MASTERCLASS LESSON GENERATOR */}
      {activeTab === 'lesson' && (
        <div className="space-y-6">
          {/* Header & Regenerate Bar */}
          <div className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Interactive Curriculum
              </span>
              <h3 className="text-xl font-bold text-white font-heading">
                Step-by-Step Masterclass: {topicInput}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={generateLesson}
                disabled={isLessonLoading}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
              >
                <RotateCcw size={14} className={isLessonLoading ? 'animate-spin' : ''} />
                <span>{isLessonLoading ? 'Designing Lesson...' : 'Regenerate Lesson'}</span>
              </button>

              {lessonData?.printableStudyNotes && (
                <button
                  onClick={copyStudyNotes}
                  className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  {copiedNotes ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copiedNotes ? 'Copied Notes!' : 'Save / Copy Notes'}</span>
                </button>
              )}
            </div>
          </div>

          {isLessonLoading ? (
            <div className="p-16 rounded-3xl bg-gray-900/60 border border-gray-800 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 text-indigo-400 mx-auto flex items-center justify-center animate-pulse">
                <BookOpen size={24} />
              </div>
              <h4 className="text-base font-bold text-white">Synthesizing Pedagogical Curriculum</h4>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                World Brain AI is structuring learning objectives, real-world analogies, and concept checks tailored for {learningLevel} level.
              </p>
            </div>
          ) : lessonData ? (
            <div className="space-y-6">
              {/* Learning Objectives & Prerequisites */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-gray-900/70 border border-gray-800 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={14} />
                    <span>Learning Objectives</span>
                  </span>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    {lessonData.learningObjectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {lessonData.prerequisites && (
                  <div className="p-5 rounded-2xl bg-gray-900/70 border border-gray-800 space-y-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                      Recommended Prerequisites
                    </span>
                    <ul className="space-y-1.5 text-xs text-gray-300">
                      {lessonData.prerequisites.map((pre, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-indigo-400">•</span>
                          <span>{pre}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Step Navigation Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {lessonData.modules.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStepIndex(idx)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition whitespace-nowrap flex items-center gap-2 ${
                      currentStepIndex === idx
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px]">
                      {step.stepNumber}
                    </span>
                    <span>{step.title}</span>
                  </button>
                ))}
              </div>

              {/* Current Step Card */}
              {lessonData.modules[currentStepIndex] && (
                <div className="p-6 md:p-8 rounded-3xl bg-gray-900/80 border border-gray-800 space-y-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                    <div>
                      <span className="text-[11px] font-mono text-indigo-400 uppercase">
                        Module Step {lessonData.modules[currentStepIndex].stepNumber} of {lessonData.modules.length}
                      </span>
                      <h3 className="text-2xl font-bold text-white font-heading mt-1">
                        {lessonData.modules[currentStepIndex].title}
                      </h3>
                    </div>
                  </div>

                  {/* Core Explanation */}
                  <p className="text-sm md:text-base text-gray-200 leading-relaxed whitespace-pre-line">
                    {lessonData.modules[currentStepIndex].explanation}
                  </p>

                  {/* Real World Intuitive Analogy */}
                  {lessonData.modules[currentStepIndex].realWorldAnalogy && (
                    <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex items-start gap-3">
                      <Sparkles size={20} className="text-indigo-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-xs font-bold text-indigo-300 block mb-1">
                          Intuitive Real-World Analogy:
                        </strong>
                        <p className="text-xs md:text-sm text-indigo-100/90 leading-relaxed">
                          {lessonData.modules[currentStepIndex].realWorldAnalogy}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Formula or Fundamental Law */}
                  {lessonData.modules[currentStepIndex].keyFormulaOrLaw && (
                    <div className="p-4 rounded-2xl bg-gray-800/50 border border-gray-700 font-mono text-xs text-amber-300">
                      <span className="text-gray-400 block text-[10px] uppercase font-sans mb-1">
                        Core Scientific Law / Mathematical Principle
                      </span>
                      {lessonData.modules[currentStepIndex].keyFormulaOrLaw}
                    </div>
                  )}

                  {/* Mini Concept Check Question */}
                  {lessonData.modules[currentStepIndex].conceptCheck && (
                    <div className="p-5 rounded-2xl bg-gray-800/40 border border-gray-700/80 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase">
                        <HelpCircle size={15} />
                        <span>Comprehension Check</span>
                      </div>
                      <p className="text-xs md:text-sm text-white font-medium">
                        {lessonData.modules[currentStepIndex].conceptCheck!.question}
                      </p>

                      <div className="space-y-2">
                        {lessonData.modules[currentStepIndex].conceptCheck!.options.map((opt, optIdx) => {
                          const chosen = selectedConceptAnswers[currentStepIndex] === optIdx;
                          const isCorrect = optIdx === lessonData.modules[currentStepIndex].conceptCheck!.correctIndex;
                          const showResult = selectedConceptAnswers[currentStepIndex] !== undefined;

                          return (
                            <button
                              key={optIdx}
                              onClick={() => {
                                setSelectedConceptAnswers((prev) => ({
                                  ...prev,
                                  [currentStepIndex]: optIdx,
                                }));
                              }}
                              className={`w-full p-3 rounded-xl text-xs text-left transition border flex items-center justify-between ${
                                showResult
                                  ? isCorrect
                                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                                    : chosen
                                    ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                                    : 'bg-gray-800/40 border-gray-700 text-gray-400'
                                  : 'bg-gray-800/60 border-gray-700 text-gray-300 hover:border-gray-500'
                              }`}
                            >
                              <span>{opt}</span>
                              {showResult && isCorrect && <CheckCircle2 size={16} className="text-emerald-400" />}
                              {showResult && chosen && !isCorrect && <XCircle size={16} className="text-rose-400" />}
                            </button>
                          );
                        })}
                      </div>

                      {selectedConceptAnswers[currentStepIndex] !== undefined && (
                        <p className="text-xs text-gray-300 pt-2 border-t border-gray-700/60 italic">
                          Rationale: {lessonData.modules[currentStepIndex].conceptCheck!.explanation}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Next / Previous Module Navigation */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <button
                      onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                      disabled={currentStepIndex === 0}
                      className="px-4 py-2 rounded-xl bg-gray-800 text-xs font-semibold text-gray-300 hover:text-white disabled:opacity-40"
                    >
                      ← Previous Step
                    </button>

                    <button
                      onClick={() =>
                        setCurrentStepIndex((prev) =>
                          Math.min(lessonData.modules.length - 1, prev + 1)
                        )
                      }
                      disabled={currentStepIndex === lessonData.modules.length - 1}
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center gap-1.5 disabled:opacity-40"
                    >
                      <span>Next Step</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Printable Study Notes Preview Box */}
              <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-indigo-400" />
                    <h4 className="text-sm font-bold text-white">Curated Study Notes (Ready for Download & PDF)</h4>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 text-xs text-gray-300 hover:text-white flex items-center gap-1.5"
                  >
                    <Printer size={13} />
                    <span>Print Handout</span>
                  </button>
                </div>
                <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800 font-mono text-xs text-gray-300 max-h-56 overflow-y-auto whitespace-pre-line leading-relaxed">
                  {lessonData.printableStudyNotes}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* MODE 3: PRACTICE QUIZ & EXAMINATION ARENA */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                Cognitive Assessment
              </span>
              <h3 className="text-xl font-bold text-white font-heading">
                Practice Examination: {topicInput}
              </h3>
            </div>

            <button
              onClick={generateQuiz}
              disabled={isQuizLoading}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
            >
              <RotateCcw size={14} className={isQuizLoading ? 'animate-spin' : ''} />
              <span>{isQuizLoading ? 'Generating Exam...' : 'New Quiz Questions'}</span>
            </button>
          </div>

          {isQuizLoading ? (
            <div className="p-16 rounded-3xl bg-gray-900/60 border border-gray-800 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/30 text-purple-400 mx-auto flex items-center justify-center animate-pulse">
                <Award size={24} />
              </div>
              <h4 className="text-base font-bold text-white">Formulating Examination Questions</h4>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                World Brain AI is generating questions testing conceptual grasp, critical thinking, and underlying laws.
              </p>
            </div>
          ) : quizData ? (
            <div className="space-y-6">
              {/* Score Certificate Card if Submitted */}
              {isQuizSubmitted && (
                <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/40 text-center space-y-3 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 mx-auto flex items-center justify-center text-gray-950 shadow-xl">
                    <Award size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-heading">
                    Assessment Result: {quizScore} / {quizData.questions.length} Correct
                  </h3>
                  <p className="text-xs md:text-sm text-purple-200/90 max-w-md mx-auto">
                    {quizScore >= 4
                      ? 'Exceptional mastery! You demonstrate a deep, holistic comprehension of the underlying principles.'
                      : 'Good effort! Review the detailed rationales below to solidify any tricky concepts.'}
                  </p>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400 text-xs font-semibold text-purple-200">
                    Difficulty: {quizData.difficulty || learningLevel}
                  </div>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-4">
                {quizData.questions.map((q, idx) => {
                  const userAnswer = userAnswers[idx];
                  const hasAnswered = userAnswer !== undefined;

                  return (
                    <div
                      key={q.id || idx}
                      className="p-6 rounded-3xl bg-gray-900/70 border border-gray-800 space-y-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="text-sm md:text-base font-semibold text-white leading-relaxed">
                          <span className="text-indigo-400 mr-2 font-mono">Q{idx + 1}.</span>
                          {q.question}
                        </h4>
                        {q.scientificPrinciple && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-gray-800 text-gray-400 shrink-0">
                            {q.scientificPrinciple}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = userAnswer === optIdx;
                          const isCorrect = optIdx === q.correctIndex;

                          let btnStyle = 'bg-gray-800/60 border-gray-700 text-gray-300 hover:border-gray-500';
                          if (isQuizSubmitted) {
                            if (isCorrect) {
                              btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                            } else if (isSelected) {
                              btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                            } else {
                              btnStyle = 'bg-gray-800/30 border-gray-800 text-gray-500';
                            }
                          } else if (isSelected) {
                            btnStyle = 'bg-indigo-600/30 border-indigo-400 text-white font-semibold';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={isQuizSubmitted}
                              onClick={() => {
                                setUserAnswers((prev) => ({
                                  ...prev,
                                  [idx]: optIdx,
                                }));
                              }}
                              className={`p-3.5 rounded-2xl border text-xs text-left transition flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {isQuizSubmitted && isCorrect && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                              {isQuizSubmitted && isSelected && !isCorrect && <XCircle size={16} className="text-rose-400 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Reveal */}
                      {isQuizSubmitted && (
                        <div className="p-3.5 rounded-2xl bg-gray-800/50 border border-gray-700/60 text-xs text-gray-300 leading-relaxed">
                          <strong className="text-indigo-400 block mb-0.5">Scientific Explanation:</strong>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit Quiz Button */}
              {!isQuizSubmitted && (
                <div className="flex justify-center pt-2">
                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(userAnswers).length < quizData.questions.length}
                    className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl transition disabled:opacity-40"
                  >
                    Submit Exam & View Rationale
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
