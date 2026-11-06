import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '25mb' }));

// Initialize GoogleGenAI SDK with required telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper for safe JSON extraction from Gemini response
function cleanJsonResponse(raw: string): any {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  return JSON.parse(cleaned);
}

// 1. Universal Knowledge Search Engine (13-Point Complete Information Dossier)
app.post('/api/knowledge/search', async (req, res) => {
  try {
    const { query, branch, language = 'en' } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const systemInstruction = `You are WORLD BRAIN AI's Universal Knowledge and Research Information Engine.
Your mission is to provide an exhaustive, authoritative, scientific 13-point encyclopedic dossier on ANY topic in the universe across Biology, Anatomy, Neuroscience, Animals, Botany, Physics, Chemistry, History, Space, AI, Engineering, Climate, Medicine, and Future Science.

You must respond in strict JSON matching the schema.
Language: ${language === 'hi' ? 'Hindi (हिन्दी) where appropriate with technical terms in parentheses' : 'English'}.

Structure all knowledge rigorously:
- Ensure scientific classification is provided if biological/astronomical/physical.
- Categorize future possibilities with explicit uncertainty ratings ('High', 'Medium', 'Low') and confidence percentage (0-100%). Never present predictions as guaranteed facts.
- Include medical or safety disclaimers if dealing with health, pharmacology, or hazardous topics.
- Pick the best 3D model if applicable from: 'brain', 'heart', 'solarsystem', 'dna', 'atom', 'plantcell', or 'general'.`;

    const prompt = `Generate a complete 13-point comprehensive scientific dossier for: "${query}".
Subject Branch: ${branch || 'General Science'}.
Return exhaustive, high-depth educational content.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topic: { type: Type.STRING },
            scientificName: { type: Type.STRING },
            commonName: { type: Type.STRING },
            branch: { type: Type.STRING },
            tagline: { type: Type.STRING },
            summary: { type: Type.STRING },
            completeExplanation: { type: Type.STRING },
            taxonomy: {
              type: Type.OBJECT,
              properties: {
                domain: { type: Type.STRING },
                kingdom: { type: Type.STRING },
                phylum: { type: Type.STRING },
                class: { type: Type.STRING },
                order: { type: Type.STRING },
                family: { type: Type.STRING },
                genus: { type: Type.STRING },
                species: { type: Type.STRING },
              },
            },
            bodyStructuresAndFunctions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  structure: { type: Type.STRING },
                  function: { type: Type.STRING },
                  clinicalOrPracticalNote: { type: Type.STRING },
                },
                required: ['structure', 'function'],
              },
            },
            internalExternalAnatomy: {
              type: Type.OBJECT,
              properties: {
                externalFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
                internalArchitecture: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
            },
            habitatAndDistribution: {
              type: Type.OBJECT,
              properties: {
                primaryRegion: { type: Type.STRING },
                biomeOrEnvironment: { type: Type.STRING },
                distributionDetails: { type: Type.STRING },
              },
            },
            historyAndDevelopment: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  eraOrYear: { type: Type.STRING },
                  discoveryOrMilestone: { type: Type.STRING },
                  keyPioneers: { type: Type.STRING },
                },
                required: ['eraOrYear', 'discoveryOrMilestone'],
              },
            },
            importanceAndApplications: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            advantagesAndDisadvantages: {
              type: Type.OBJECT,
              properties: {
                advantagesOrBenefits: { type: Type.ARRAY, items: { type: Type.STRING } },
                disadvantagesOrRisks: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
            },
            relatedDiscoveriesAndResearch: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  findings: { type: Type.STRING },
                  journalOrInstitution: { type: Type.STRING },
                },
              },
            },
            futurePossibilitiesAndPredictions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  prediction: { type: Type.STRING },
                  timeframe: { type: Type.STRING },
                  uncertaintyLevel: { type: Type.STRING, description: 'High, Medium, or Low' },
                  confidencePercent: { type: Type.INTEGER },
                },
                required: ['prediction', 'uncertaintyLevel', 'confidencePercent'],
              },
            },
            diagramLabels: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  description: { type: Type.STRING },
                  position: { type: Type.STRING },
                },
              },
            },
            suggested3DModel: {
              type: Type.STRING,
              description: "One of: 'brain', 'heart', 'solarsystem', 'dna', 'atom', 'plantcell', or 'general'",
            },
            curatedVisualKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            quickFacts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            references: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sourceName: { type: Type.STRING },
                  citation: { type: Type.STRING },
                  doiOrUrl: { type: Type.STRING },
                },
              },
            },
            safetyGuidanceOrDisclaimer: {
              type: Type.STRING,
            },
          },
          required: [
            'topic',
            'summary',
            'completeExplanation',
            'importanceAndApplications',
            'futurePossibilitiesAndPredictions',
          ],
        },
      },
    });

    const parsed = cleanJsonResponse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/knowledge/search:', error);
    return res.status(500).json({
      error: 'Failed to search universal knowledge',
      details: error?.message || 'Gemini API call failed',
    });
  }
});

// 2. Personal AI Teacher Chat (Bilingual English & Hindi, Adaptive Level)
app.post('/api/teacher/chat', async (req, res) => {
  try {
    const { message, history = [], level = 'High School', language = 'en', topicContext } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemInstruction = `You are the World Brain AI Personal Teacher.
Role & Persona: An empathetic, world-class educator and mentor passionate about making the most intricate concepts crystal clear to anyone.
Language: ${language === 'hi' ? 'Hindi (हिन्दी). Communicate primarily in warm, encouraging Hindi with key English scientific terms in brackets where helpful for clarity.' : 'English. Warm, articulate, inspiring, and engaging.'}
Student Learning Level: ${level} (Adapt vocabulary, analogies, depth, and pacing strictly to this level. If Beginner, use everyday analogies; if University/Scientist, use rigorous academic terminology and mathematics).
Current Topic Context: ${topicContext || 'Universal Knowledge Exploration'}.

Formatting instructions:
- Provide clear, well-structured explanations with bullet points or numbered steps.
- Conclude with an inspiring thought or an intuitive question to test understanding.
- Never output dry generic answers; use vivid imagery, analogies, and real-world intuition.`;

    const contents = history.map((h: any) => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }],
    }));

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
      },
    });

    return res.json({
      reply: response.text || 'I am ready to help you learn.',
    });
  } catch (error: any) {
    console.error('Error in /api/teacher/chat:', error);
    return res.status(500).json({
      error: 'Teacher assistant error',
      details: error?.message || 'Failed to process chat',
    });
  }
});

// 3. Step-by-Step Lesson & Study Notes Generator
app.post('/api/teacher/lesson', async (req, res) => {
  try {
    const { topic, level = 'High School', language = 'en' } = req.body;
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const systemInstruction = `You are the World Brain AI Curriculum Designer.
Generate a comprehensive step-by-step masterclass lesson module on "${topic}".
Level: ${level}.
Language: ${language === 'hi' ? 'Hindi (हिन्दी)' : 'English'}.
Return pure JSON with clear chapters, pedagogical analogies, interactive concept check questions, and downloadable study notes.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Design a 4-to-5 step structured lesson for topic: "${topic}" at level: "${level}".`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            level: { type: Type.STRING },
            estimatedMinutes: { type: Type.INTEGER },
            prerequisites: { type: Type.ARRAY, items: { type: Type.STRING } },
            learningObjectives: { type: Type.ARRAY, items: { type: Type.STRING } },
            modules: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stepNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                  realWorldAnalogy: { type: Type.STRING },
                  keyFormulaOrLaw: { type: Type.STRING },
                  conceptCheck: {
                    type: Type.OBJECT,
                    properties: {
                      question: { type: Type.STRING },
                      options: { type: Type.ARRAY, items: { type: Type.STRING } },
                      correctIndex: { type: Type.INTEGER },
                      explanation: { type: Type.STRING },
                    },
                  },
                },
                required: ['stepNumber', 'title', 'explanation'],
              },
            },
            takeawaySummary: { type: Type.ARRAY, items: { type: Type.STRING } },
            printableStudyNotes: { type: Type.STRING, description: 'Formatted comprehensive Markdown study sheet ready for PDF download' },
          },
          required: ['title', 'learningObjectives', 'modules', 'takeawaySummary', 'printableStudyNotes'],
        },
      },
    });

    const parsed = cleanJsonResponse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/teacher/lesson:', error);
    return res.status(500).json({ error: 'Failed to generate lesson', details: error?.message });
  }
});

// 4. Practice Quiz & Examination Generator
app.post('/api/teacher/quiz', async (req, res) => {
  try {
    const { topic, count = 5, level = 'High School', language = 'en' } = req.body;
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const systemInstruction = `You are World Brain AI's Examination & Cognitive Assessment Engine.
Generate an engaging, rigorous multiple-choice practice test on "${topic}".
Level: ${level}.
Language: ${language === 'hi' ? 'Hindi (हिन्दी)' : 'English'}.
Ensure questions test true conceptual understanding rather than rote recall. Provide detailed rationale for every option.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Create ${count} multiple-choice examination questions for topic: "${topic}".`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quizTitle: { type: Type.STRING },
            topic: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                  scientificPrinciple: { type: Type.STRING },
                },
                required: ['id', 'question', 'options', 'correctIndex', 'explanation'],
              },
            },
          },
          required: ['quizTitle', 'questions'],
        },
      },
    });

    const parsed = cleanJsonResponse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/teacher/quiz:', error);
    return res.status(500).json({ error: 'Failed to generate quiz', details: error?.message });
  }
});

// 5. Advanced AI Research Assistant (Epistemic Tri-Tier Analysis)
app.post('/api/research/analyze', async (req, res) => {
  try {
    const { topic, compareWithTopic } = req.body;
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const isComparison = Boolean(compareWithTopic && compareWithTopic.trim().length > 0);
    const systemInstruction = `You are World Brain AI's Advanced Epistemic Research Assistant.
Your mandate is to provide deep scientific research synthesis, strictly classifying all knowledge into:
1. VERIFIED FACTS (Peer-reviewed empirical consensus, established laws)
2. SCIENTIFIC HYPOTHESES & THEORIES (Active scientific debates, testable models)
3. SPECULATIVE FRONTIERS & PREDICTIONS (Emergent possibilities with explicit uncertainty bounds)

${isComparison ? `You must also provide an in-depth comparative breakdown between "${topic}" and "${compareWithTopic}".` : ''}
Include reliable scientific citations (PubMed, Nature, Science, NASA, arXiv, CERN).`;

    const prompt = isComparison
      ? `Conduct deep scientific research analysis comparing "${topic}" vs "${compareWithTopic}".`
      : `Conduct an exhaustive epistemic scientific research breakdown for: "${topic}".`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topic: { type: Type.STRING },
            executiveAbstract: { type: Type.STRING },
            verifiedFacts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  claim: { type: Type.STRING },
                  empiricalEvidence: { type: Type.STRING },
                  consensusLevel: { type: Type.STRING, description: 'Universal, High, or Strong' },
                  landmarkReference: { type: Type.STRING },
                },
                required: ['claim', 'empiricalEvidence', 'consensusLevel'],
              },
            },
            scientificHypotheses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  hypothesis: { type: Type.STRING },
                  competingSchoolsOfThought: { type: Type.STRING },
                  currentTestingMethodology: { type: Type.STRING },
                  unresolvedControversy: { type: Type.STRING },
                },
                required: ['hypothesis', 'currentTestingMethodology'],
              },
            },
            speculativeFrontiersAndPredictions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  predictionOrHorizon: { type: Type.STRING },
                  timeHorizonYears: { type: Type.STRING },
                  confidenceScorePercent: { type: Type.INTEGER },
                  epistemicUncertainty: { type: Type.STRING, description: 'High, Moderate, Speculative' },
                  breakthroughRequired: { type: Type.STRING },
                },
                required: ['predictionOrHorizon', 'confidenceScorePercent', 'epistemicUncertainty'],
              },
            },
            criticalKnowledgeGaps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            comparativeMatrix: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dimension: { type: Type.STRING },
                  itemAAnalysis: { type: Type.STRING },
                  itemBAnalysis: { type: Type.STRING },
                  scientificVerdict: { type: Type.STRING },
                },
              },
            },
            authoritativeCitations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  source: { type: Type.STRING },
                  year: { type: Type.STRING },
                  significance: { type: Type.STRING },
                },
              },
            },
          },
          required: ['topic', 'executiveAbstract', 'verifiedFacts', 'scientificHypotheses', 'speculativeFrontiersAndPredictions'],
        },
      },
    });

    const parsed = cleanJsonResponse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/research/analyze:', error);
    return res.status(500).json({ error: 'Research assistant error', details: error?.message });
  }
});

// 6. Multimodal Image Recognition / Visual Query
app.post('/api/vision/analyze', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', prompt = 'Analyze this scientific or educational specimen or diagram.' } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    const cleanBase64 = imageBase64.replace(/^data:[a-zA-Z0-9/]+;base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType,
              data: cleanBase64,
            },
          },
          {
            text: `You are World Brain AI's Multimodal Visual Learning Engine.
Identify what is depicted in this image (specimen, anatomical organ, celestial body, chemical structure, biological cell, archaeological artifact, or scientific diagram).
Provide a structured analysis matching the JSON schema.
Prompt: ${prompt}`,
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            identifiedSubject: { type: Type.STRING },
            scientificClassification: { type: Type.STRING },
            confidencePercent: { type: Type.INTEGER },
            keyVisualFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
            anatomicalOrStructuralComponents: { type: Type.ARRAY, items: { type: Type.STRING } },
            educationalExplanation: { type: Type.STRING },
            worldBrainTopicSearchQuery: { type: Type.STRING },
            suggested3DModel: { type: Type.STRING },
          },
          required: ['identifiedSubject', 'educationalExplanation', 'worldBrainTopicSearchQuery'],
        },
      },
    });

    const parsed = cleanJsonResponse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/vision/analyze:', error);
    return res.status(500).json({ error: 'Vision analysis failed', details: error?.message });
  }
});

// Setup Vite middleware in dev or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`World Brain AI Server running at http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup failed:', err);
  process.exit(1);
});
