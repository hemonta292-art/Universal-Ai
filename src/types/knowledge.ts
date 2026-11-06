export type KnowledgeBranch =
  | 'biology'
  | 'anatomy'
  | 'neuroscience'
  | 'wildlife'
  | 'botany'
  | 'physics_chemistry'
  | 'history_geography'
  | 'space_astronomy'
  | 'technology_ai'
  | 'engineering_math'
  | 'environment_climate'
  | 'medicine_health'
  | 'future_science';

export interface BranchInfo {
  id: KnowledgeBranch;
  name: string;
  nameHi: string;
  description: string;
  iconName: string;
  gradient: string;
  sampleTopics: string[];
}

export interface Taxonomy {
  domain?: string;
  kingdom?: string;
  phylum?: string;
  class?: string;
  order?: string;
  family?: string;
  genus?: string;
  species?: string;
}

export interface BodyStructureFunction {
  structure: string;
  function: string;
  clinicalOrPracticalNote?: string;
}

export interface HistoryMilestone {
  eraOrYear: string;
  discoveryOrMilestone: string;
  keyPioneers?: string;
}

export interface RelatedDiscovery {
  title: string;
  findings: string;
  journalOrInstitution?: string;
}

export interface FuturePrediction {
  prediction: string;
  timeframe?: string;
  uncertaintyLevel: 'High' | 'Medium' | 'Low' | string;
  confidencePercent: number;
}

export interface DiagramLabel {
  label: string;
  description: string;
  position?: string;
}

export interface ReferenceCitation {
  sourceName: string;
  citation: string;
  doiOrUrl?: string;
}

export interface TopicDossier {
  topic: string;
  scientificName?: string;
  commonName?: string;
  branch: string;
  tagline?: string;
  summary: string;
  completeExplanation: string;
  taxonomy?: Taxonomy;
  bodyStructuresAndFunctions?: BodyStructureFunction[];
  internalExternalAnatomy?: {
    externalFeatures?: string[];
    internalArchitecture?: string[];
  };
  habitatAndDistribution?: {
    primaryRegion?: string;
    biomeOrEnvironment?: string;
    distributionDetails?: string;
  };
  historyAndDevelopment?: HistoryMilestone[];
  importanceAndApplications: string[];
  advantagesAndDisadvantages?: {
    advantagesOrBenefits?: string[];
    disadvantagesOrRisks?: string[];
  };
  relatedDiscoveriesAndResearch?: RelatedDiscovery[];
  futurePossibilitiesAndPredictions: FuturePrediction[];
  diagramLabels?: DiagramLabel[];
  suggested3DModel?: 'brain' | 'heart' | 'solarsystem' | 'dna' | 'atom' | 'plantcell' | 'general';
  curatedVisualKeywords?: string[];
  quickFacts?: string[];
  references?: ReferenceCitation[];
  safetyGuidanceOrDisclaimer?: string;
}

export type PedagogicalLevel = 'Beginner (ELI5)' | 'High School' | 'University' | 'Research Scientist';

export interface TeacherChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface LessonModuleStep {
  stepNumber: number;
  title: string;
  explanation: string;
  realWorldAnalogy?: string;
  keyFormulaOrLaw?: string;
  conceptCheck?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface MasterclassLesson {
  title: string;
  level: string;
  estimatedMinutes?: number;
  prerequisites?: string[];
  learningObjectives: string[];
  modules: LessonModuleStep[];
  takeawaySummary: string[];
  printableStudyNotes: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  scientificPrinciple?: string;
}

export interface QuizTest {
  quizTitle: string;
  topic: string;
  difficulty: string;
  questions: QuizQuestion[];
}

export interface VerifiedFact {
  claim: string;
  empiricalEvidence: string;
  consensusLevel: string;
  landmarkReference?: string;
}

export interface ScientificHypothesis {
  hypothesis: string;
  competingSchoolsOfThought?: string;
  currentTestingMethodology: string;
  unresolvedControversy?: string;
}

export interface SpeculativeFrontier {
  predictionOrHorizon: string;
  timeHorizonYears?: string;
  confidenceScorePercent: number;
  epistemicUncertainty: 'High' | 'Moderate' | 'Speculative' | string;
  breakthroughRequired?: string;
}

export interface ComparativeMatrixItem {
  dimension: string;
  itemAAnalysis: string;
  itemBAnalysis: string;
  scientificVerdict?: string;
}

export interface ResearchDossier {
  topic: string;
  executiveAbstract: string;
  verifiedFacts: VerifiedFact[];
  scientificHypotheses: ScientificHypothesis[];
  speculativeFrontiersAndPredictions: SpeculativeFrontier[];
  criticalKnowledgeGaps?: string[];
  comparativeMatrix?: ComparativeMatrixItem[];
  authoritativeCitations?: {
    source: string;
    year?: string;
    significance?: string;
  }[];
}

export interface UserProfile {
  name: string;
  learningLevel: PedagogicalLevel;
  language: 'en' | 'hi';
  xp: number;
  streakDays: number;
  topicsMastered: string[];
  bookmarks: string[];
  savedNotes: {
    id: string;
    topic: string;
    date: string;
    content: string;
  }[];
}
