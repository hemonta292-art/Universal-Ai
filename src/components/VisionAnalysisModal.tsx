import React, { useState } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Layers,
  Box,
} from 'lucide-react';

interface VisionAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDossier: (topic: string) => void;
  onOpen3DModel?: (modelType: string) => void;
}

export const VisionAnalysisModal: React.FC<VisionAnalysisModalProps> = ({
  isOpen,
  onClose,
  onOpenDossier,
  onOpen3DModel,
}) => {
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  if (!isOpen) return null;

  // Curated demo scientific samples using SVG data URIs
  const demoSamples = [
    {
      title: 'Cardiac Myocardium Specimen',
      type: 'Histology',
      svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23881337"/><circle cx="100" cy="100" r="70" fill="%23be123c"/><path d="M60,100 Q100,50 140,100 T180,100" stroke="%23fda4af" stroke-width="6" fill="none"/></svg>`,
      suggestedTopic: 'Human Heart (Cardiovascular System)',
      model: 'heart',
    },
    {
      title: 'Neural Synaptic Cortex',
      type: 'Neuro-imaging',
      svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%231e1b4b"/><circle cx="70" cy="70" r="30" fill="%236366f1"/><circle cx="130" cy="130" r="25" fill="%23a855f7"/><line x1="70" y1="70" x2="130" y2="130" stroke="%2338bdf8" stroke-width="4"/></svg>`,
      suggestedTopic: 'Human Brain & Synaptic Architecture',
      model: 'brain',
    },
    {
      title: 'Plant Chloroplast Cell',
      type: 'Microscopy',
      svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23064e3b"/><polygon points="40,30 160,30 180,170 30,160" fill="%23047857"/><circle cx="100" cy="100" r="40" fill="%2310b981"/></svg>`,
      suggestedTopic: 'Botanical Plant Cell & Chloroplasts',
      model: 'plantcell',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setSelectedImageBase64(base64);
      analyzeImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async (base64: string) => {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const res = await fetch('/api/vision/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64,
          mimeType: 'image/jpeg',
          prompt: 'Identify the biological or scientific specimen and explain its functional significance.',
        }),
      });
      const data = await res.json();
      setAnalysisResult(data);
    } catch (err: any) {
      alert(`Vision recognition error: ${err?.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gray-950 border border-gray-800 rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
              <Camera size={20} />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                Multimodal Image Recognition
              </div>
              <h2 className="text-lg font-bold text-white font-heading">
                Visual Specimen & Diagram Analyzer
              </h2>
            </div>
          </div>

          <button onClick={onClose} className="text-gray-400 hover:text-white font-mono text-sm px-2">
            ✕
          </button>
        </div>

        {/* Upload Zone & Demo Presets */}
        <div className="space-y-4">
          <label className="block p-6 rounded-2xl border-2 border-dashed border-gray-700 hover:border-cyan-500 bg-gray-900/60 cursor-pointer text-center transition">
            <Upload size={28} className="mx-auto text-gray-400 mb-2" />
            <span className="text-xs font-semibold text-white block">
              Upload Specimen Photo, Diagram, or Micrograph
            </span>
            <span className="text-[11px] text-gray-400 mt-1 block">
              PNG, JPG, or WEBP (Max 20MB)
            </span>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* Quick Demo Samples */}
          <div>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-2">
              Or Try A Preset Educational Sample:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {demoSamples.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImageBase64(sample.svg);
                    analyzeImage(sample.svg);
                  }}
                  className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-cyan-500 text-left transition space-y-1.5"
                >
                  <img src={sample.svg} alt={sample.title} className="w-full h-14 object-cover rounded-lg" />
                  <span className="font-semibold text-[11px] text-white block truncate">{sample.title}</span>
                  <span className="text-[10px] text-cyan-400 block font-mono">{sample.type}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="p-8 rounded-2xl bg-gray-900/60 border border-gray-800 text-center space-y-2">
            <Sparkles size={24} className="text-cyan-400 animate-spin mx-auto" />
            <h4 className="text-xs font-bold text-white">Analyzing Multimodal Visual Geometry</h4>
            <p className="text-[11px] text-gray-400">
              Gemini Vision is inspecting cellular, anatomical, or diagrammatic features...
            </p>
          </div>
        )}

        {/* Results Card */}
        {analysisResult && (
          <div className="p-5 rounded-2xl bg-gray-900 border border-cyan-500/40 space-y-3 overflow-y-auto max-h-64 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400">Identified Subject</span>
                <h3 className="text-base font-bold text-white">{analysisResult.identifiedSubject}</h3>
              </div>
              {analysisResult.confidencePercent && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  {analysisResult.confidencePercent}% Match
                </span>
              )}
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              {analysisResult.educationalExplanation}
            </p>

            {analysisResult.keyVisualFeatures && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Visual Markers Detected:</span>
                <ul className="text-xs text-gray-300 space-y-0.5">
                  {analysisResult.keyVisualFeatures.map((f: string, i: number) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-cyan-400">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2 border-t border-gray-800">
              <button
                onClick={() => {
                  onClose();
                  onOpenDossier(analysisResult.worldBrainTopicSearchQuery || analysisResult.identifiedSubject);
                }}
                className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>Open Full 13-Point Dossier</span>
                <ExternalLink size={14} />
              </button>

              {analysisResult.suggested3DModel && onOpen3DModel && (
                <button
                  onClick={() => {
                    onClose();
                    onOpen3DModel(analysisResult.suggested3DModel);
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1.5"
                >
                  <Box size={14} />
                  <span>View in 3D</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
