import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Layers,
  Eye,
  Camera,
  Info,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export type ModelType = 'heart' | 'brain' | 'solarsystem' | 'dna' | 'atom' | 'plantcell';

interface ModelOption {
  id: ModelType;
  title: string;
  category: string;
  description: string;
  pins: { id: string; name: string; position: [number, number, number]; info: string }[];
}

export const MODEL_OPTIONS: ModelOption[] = [
  {
    id: 'heart',
    title: 'Human Heart (Cardiovascular System)',
    category: 'Human Anatomy',
    description: '4-Chambered electromechanical muscular pump with contracting systolic/diastolic cycles.',
    pins: [
      { id: 'aorta', name: 'Ascending Aorta', position: [0.2, 1.6, 0.2], info: 'Carries oxygenated blood under ~120 mmHg pressure to systemic circulation.' },
      { id: 'left_ventricle', name: 'Left Ventricle', position: [0.6, -0.4, 0.4], info: 'Thickest muscular chamber; pumps against peripheral vascular resistance.' },
      { id: 'right_atrium', name: 'Right Atrium & SA Node', position: [-0.9, 0.4, 0.3], info: 'Receives deoxygenated systemic venous return; hosts the sinoatrial pacemaker.' },
      { id: 'pulmonary_artery', name: 'Pulmonary Trunk', position: [-0.3, 1.2, 0.7], info: 'Directs deoxygenated blood to alveolar capillary beds in lungs.' },
    ],
  },
  {
    id: 'brain',
    title: 'Human Brain & Synaptic Network',
    category: 'Neuroscience',
    description: '86 billion neurons and cortical folding coordinating consciousness and cognition.',
    pins: [
      { id: 'frontal', name: 'Prefrontal Cortex', position: [0, 0.7, 1.1], info: 'Executive reasoning, impulse control, working memory, and personality.' },
      { id: 'cerebellum', name: 'Cerebellum', position: [0, -0.8, -1.0], info: 'Contains >50% of brain neurons; synchronizes fine motor precision and balance.' },
      { id: 'synapse', name: 'Synaptic Transmission Nodes', position: [0.7, 0.2, 0.4], info: 'Nanometer junctions where action potentials release chemical neurotransmitters.' },
      { id: 'brainstem', name: 'Brainstem (Medulla & Pons)', position: [0, -1.4, -0.2], info: 'Controls vital autonomic functions: respiratory drive, cardiac rate, blood pressure.' },
    ],
  },
  {
    id: 'solarsystem',
    title: 'Solar System & Planetary Dynamics',
    category: 'Space & Astronomy',
    description: 'Central G2V star anchoring 8 planetary bodies, asteroid debris, and orbital mechanics.',
    pins: [
      { id: 'sun', name: 'The Sun (Sol)', position: [0, 0, 0], info: 'Fuses 600M tons of hydrogen per second, providing 99.86% of solar system mass.' },
      { id: 'earth', name: 'Earth & Moon', position: [2.5, 0, 0], info: 'Only known habitat for carbon life, shielded by an active geodynamo magnetosphere.' },
      { id: 'jupiter', name: 'Jupiter (Gas Giant)', position: [4.4, 0, 0], info: 'Largest planet with Great Red Spot storm and gravitational shield deflecting comets.' },
      { id: 'saturn', name: 'Saturn & Ring System', position: [5.8, 0, 0], info: 'Breathtaking icy ring system spanning 282,000 km but only 10 meters thick.' },
    ],
  },
  {
    id: 'dna',
    title: 'DNA Double Helix & Base Pairs',
    category: 'Biology & Genetics',
    description: 'Antiparallel sugar-phosphate ribbons connected by complementary hydrogen bonds.',
    pins: [
      { id: 'backbone', name: 'Sugar-Phosphate Ribbon', position: [0.9, 0.8, 0], info: 'Deoxyribose sugars linked by covalent phosphodiester bonds, highly water-soluble.' },
      { id: 'at_pair', name: 'Adenine-Thymine Pair (A=T)', position: [0, 0.2, 0], info: 'Joined by 2 hydrogen bonds; easier for helicase enzymes to unzip during replication.' },
      { id: 'gc_pair', name: 'Guanine-Cytosine Pair (G≡C)', position: [0, -0.6, 0], info: 'Joined by 3 hydrogen bonds; confers thermal and structural stability to genomes.' },
      { id: 'major_groove', name: 'Major Groove', position: [-0.8, 1.4, 0.3], info: 'Wide helical indentation where transcription factor proteins read nucleotide sequences.' },
    ],
  },
  {
    id: 'atom',
    title: 'Quantum Atom & Electron Orbitals',
    category: 'Physics & Chemistry',
    description: 'Dense baryonic nucleus enveloped in probabilistic wavefunctions and electron shells.',
    pins: [
      { id: 'nucleus', name: 'Protons & Neutrons Nucleus', position: [0, 0, 0], info: 'Contains 99.94% of atomic mass, bound tightly by the residual strong nuclear force.' },
      { id: 'shell_1', name: 'K-Shell (1s Orbital)', position: [0.9, 0.4, 0], info: 'Lowest energy spherical probability cloud holding maximum 2 electrons.' },
      { id: 'shell_2', name: 'L-Shell (2p Orbitals)', position: [1.8, -0.8, 0.5], info: 'Dumbbell-shaped orthogonal orbital lobes governing covalent molecular geometry.' },
      { id: 'quantum_leap', name: 'Photon Emission Horizon', position: [-1.4, 1.2, -0.4], info: 'Electrons releasing quantized photons (E = hf) when dropping to ground states.' },
    ],
  },
  {
    id: 'plantcell',
    title: 'Botanical Plant Cell & Chloroplasts',
    category: 'Botany & Microbiology',
    description: 'Cellulose-walled photosynthetic factory maintaining hydrostatic turgor pressure.',
    pins: [
      { id: 'chloroplast', name: 'Chloroplast & Thylakoids', position: [0.8, 0.7, 0.3], info: 'Splits water molecules via photolysis, converting sunlight into chemical glucose.' },
      { id: 'vacuole', name: 'Central Turgor Vacuole', position: [-0.2, -0.2, 0], info: 'Stores fluid and minerals, exerting osmotic pressure that keeps plants upright.' },
      { id: 'cell_wall', name: 'Cellulose Cell Wall', position: [1.5, 0, 0], info: 'Rigid tensile matrix of cross-linked microfibrils preventing osmotic bursting.' },
      { id: 'nucleus_plant', name: 'Cell Nucleus', position: [-0.9, 0.8, 0.2], info: 'Houses genomic DNA instructing botanical hormone synthesis (auxins, gibberellins).' },
    ],
  },
];

interface VisualLearning3DProps {
  initialModel?: ModelType;
  onExploreTopicDossier?: (topicName: string) => void;
  language?: 'en' | 'hi';
}

export const VisualLearning3D: React.FC<VisualLearning3DProps> = ({
  initialModel = 'heart',
  onExploreTopicDossier,
  language = 'en',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedModel, setSelectedModel] = useState<ModelType>(initialModel);
  const [explodedRatio, setExplodedRatio] = useState<number>(0);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [activePin, setActivePin] = useState<{ id: string; name: string; info: string } | null>(null);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [isAudioNarration, setIsAudioNarration] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Sync if prop changes
  useEffect(() => {
    if (initialModel) setSelectedModel(initialModel);
  }, [initialModel]);

  // Audio speech narration
  const narrate = (text: string) => {
    if (!isAudioNarration || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // State refs for Three.js animation loop without recreation
  const modelRef = useRef<ModelType>(selectedModel);
  modelRef.current = selectedModel;
  const explodedRef = useRef<number>(explodedRatio);
  explodedRef.current = explodedRatio;
  const speedRef = useRef<number>(rotationSpeed);
  speedRef.current = rotationSpeed;
  const wireframeRef = useRef<boolean>(isWireframe);
  wireframeRef.current = isWireframe;

  // Scene references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const activeGroupRef = useRef<THREE.Group | null>(null);
  const animationFrameId = useRef<number>(0);

  // Set camera preset
  const setCameraView = (view: 'front' | 'top' | 'iso' | 'close') => {
    if (!cameraRef.current) return;
    const cam = cameraRef.current;
    if (view === 'front') {
      cam.position.set(0, 0, 5.2);
    } else if (view === 'top') {
      cam.position.set(0, 5.5, 0.1);
    } else if (view === 'iso') {
      cam.position.set(3.5, 2.5, 3.8);
    } else if (view === 'close') {
      cam.position.set(0, 0, 3.2);
    }
    cam.lookAt(0, 0, 0);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL as per Three.js guidelines
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x030712);
    scene.fog = new THREE.FogExp2(0x030712, 0.05);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    cameraRef.current = camera;
    camera.position.set(2.8, 1.8, 4.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio 3-Point Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0x818cf8, 0x064e3b, 0.85); // Warm sky, cool ground fill
    scene.add(hemisphereLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    rimLight.position.set(-6, -2, -5);
    scene.add(rimLight);

    // Ground contact shadow disc
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.8;
    scene.add(shadowMesh);

    // Mouse rotation interaction variables
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;
      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = THREE.MathUtils.clamp(camera.position.z + e.deltaY * 0.004, 2.0, 9.0);
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // Touch support for mobile
    let touchStartDist = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMousePos.x;
        const deltaY = e.touches[0].clientY - prevMousePos.y;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const diff = touchStartDist - dist;
        camera.position.z = THREE.MathUtils.clamp(camera.position.z + diff * 0.01, 2.0, 9.0);
        touchStartDist = dist;
      }
    };
    const onTouchEnd = () => {
      isDragging = false;
    };
    dom.addEventListener('touchstart', onTouchStart);
    dom.addEventListener('touchmove', onTouchMove);
    dom.addEventListener('touchend', onTouchEnd);

    // BUILD PROCEDURAL COMPOSITE 3D MODELS
    const rootModelGroup = new THREE.Group();
    scene.add(rootModelGroup);
    activeGroupRef.current = rootModelGroup;

    // Helper references for per-frame animation inside tick()
    let heartVentricle: THREE.Mesh | null = null;
    let brainSynapsePoints: THREE.Points | null = null;
    let planetaryBodies: { mesh: THREE.Object3D; speed: number; dist: number; angle: number }[] = [];
    let electronMeshes: { mesh: THREE.Mesh; orbitRadius: number; speed: number; angle: number; tilt: number }[] = [];
    let dnaBasePairGroup: THREE.Group | null = null;

    // MODEL BUILDERS
    const buildHeart = () => {
      const group = new THREE.Group();
      // Left ventricle muscle body
      const lvGeo = new THREE.SphereGeometry(0.85, 32, 32);
      lvGeo.scale(0.85, 1.25, 0.85);
      const muscleMat = new THREE.MeshStandardMaterial({
        color: 0xbe123c,
        roughness: 0.35,
        metalness: 0.15,
      });
      heartVentricle = new THREE.Mesh(lvGeo, muscleMat);
      heartVentricle.position.set(0.2, -0.3, 0);
      group.add(heartVentricle);

      // Right ventricle
      const rvGeo = new THREE.SphereGeometry(0.7, 24, 24);
      rvGeo.scale(0.8, 1.1, 0.7);
      const rvMesh = new THREE.Mesh(rvGeo, muscleMat);
      rvMesh.position.set(-0.55, -0.2, 0.2);
      group.add(rvMesh);

      // Ascending Aorta (Arch)
      const aortaCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.1, 0.5, 0),
        new THREE.Vector3(0.1, 1.4, 0),
        new THREE.Vector3(-0.3, 1.8, -0.1),
        new THREE.Vector3(-0.7, 1.4, -0.3),
        new THREE.Vector3(-0.8, 0.2, -0.4),
      ]);
      const aortaGeo = new THREE.TubeGeometry(aortaCurve, 32, 0.28, 16, false);
      const arteryMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.25, metalness: 0.3 });
      const aortaMesh = new THREE.Mesh(aortaGeo, arteryMat);
      group.add(aortaMesh);

      // 3 Aortic Arch Branches (Brachiocephalic, Carotid, Subclavian)
      for (let i = 0; i < 3; i++) {
        const branchGeo = new THREE.CylinderGeometry(0.06, 0.08, 0.45, 12);
        const branchMesh = new THREE.Mesh(branchGeo, arteryMat);
        branchMesh.position.set(-0.15 + i * 0.22, 1.85, -0.05);
        branchMesh.rotation.z = -0.1 + i * 0.1;
        group.add(branchMesh);
      }

      // Pulmonary Trunk (Blue Vein)
      const pulmCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.4, 0.4, 0.3),
        new THREE.Vector3(-0.2, 1.1, 0.4),
        new THREE.Vector3(0.4, 1.3, 0.2),
      ]);
      const pulmGeo = new THREE.TubeGeometry(pulmCurve, 24, 0.24, 16, false);
      const veinMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.3, metalness: 0.2 });
      const pulmMesh = new THREE.Mesh(pulmGeo, veinMat);
      group.add(pulmMesh);

      // Superior Vena Cava
      const svcGeo = new THREE.CylinderGeometry(0.2, 0.22, 0.9, 16);
      const svcMesh = new THREE.Mesh(svcGeo, veinMat);
      svcMesh.position.set(-0.8, 1.1, -0.2);
      group.add(svcMesh);

      // Coronary Arteries (Vascular net over myocardium)
      const coronaryMat = new THREE.MeshBasicMaterial({ color: 0xfecaca });
      for (let i = 0; i < 8; i++) {
        const cCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0.1, 0.4 - i * 0.12, 0.7),
          new THREE.Vector3(0.3 + (i % 2) * 0.15, 0.1 - i * 0.18, 0.7),
          new THREE.Vector3(0.15, -0.3 - i * 0.1, 0.6),
        ]);
        const cGeo = new THREE.TubeGeometry(cCurve, 12, 0.02, 6, false);
        group.add(new THREE.Mesh(cGeo, coronaryMat));
      }

      return group;
    };

    const buildBrain = () => {
      const group = new THREE.Group();
      // Left and Right Hemispheres with folded procedural texturing
      const cortexMat = new THREE.MeshStandardMaterial({
        color: 0xec4899,
        roughness: 0.6,
        metalness: 0.1,
      });

      // Left Hemisphere
      const leftHemiGeo = new THREE.SphereGeometry(1.2, 32, 32);
      leftHemiGeo.scale(0.85, 1.0, 1.25);
      const leftMesh = new THREE.Mesh(leftHemiGeo, cortexMat);
      leftMesh.position.set(-0.45, 0.3, 0);
      group.add(leftMesh);

      // Right Hemisphere
      const rightHemiGeo = leftHemiGeo.clone();
      const rightMesh = new THREE.Mesh(rightHemiGeo, cortexMat);
      rightMesh.position.set(0.45, 0.3, 0);
      group.add(rightMesh);

      // Cerebellum (Posterior-inferior lobes)
      const cerebMat = new THREE.MeshStandardMaterial({ color: 0xd946ef, roughness: 0.7 });
      const leftCereb = new THREE.Mesh(new THREE.SphereGeometry(0.55, 20, 20), cerebMat);
      leftCereb.scale.set(0.9, 0.7, 0.9);
      leftCereb.position.set(-0.4, -0.7, -0.7);
      group.add(leftCereb);

      const rightCereb = leftCereb.clone();
      rightCereb.position.set(0.4, -0.7, -0.7);
      group.add(rightCereb);

      // Brainstem (Pons & Medulla)
      const stemCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -0.2, -0.1),
        new THREE.Vector3(0, -0.8, -0.3),
        new THREE.Vector3(0, -1.6, -0.4),
      ]);
      const stemGeo = new THREE.TubeGeometry(stemCurve, 20, 0.28, 16, false);
      const stemMesh = new THREE.Mesh(stemGeo, new THREE.MeshStandardMaterial({ color: 0xfbcfe8, roughness: 0.4 }));
      group.add(stemMesh);

      // Glowing Synaptic Particle Cloud
      const particleCount = 600;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const c1 = new THREE.Color(0x38bdf8);
      const c2 = new THREE.Color(0xa855f7);

      for (let i = 0; i < particleCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 1.1 + Math.random() * 0.4;
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 0.9;
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) + 0.3;
        positions[i * 3 + 2] = r * Math.cos(phi) * 1.2;

        const mixed = c1.clone().lerp(c2, Math.random());
        colors[i * 3] = mixed.r;
        colors[i * 3 + 1] = mixed.g;
        colors[i * 3 + 2] = mixed.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const pMat = new THREE.PointsMaterial({
        size: 0.055,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });
      brainSynapsePoints = new THREE.Points(pGeo, pMat);
      group.add(brainSynapsePoints);

      return group;
    };

    const buildSolarSystem = () => {
      const group = new THREE.Group();
      planetaryBodies = [];

      // The Sun
      const sunGeo = new THREE.SphereGeometry(0.9, 32, 32);
      const sunMat = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0xf59e0b,
        emissiveIntensity: 0.8,
        roughness: 0.1,
      });
      const sun = new THREE.Mesh(sunGeo, sunMat);
      group.add(sun);

      // Corona Flare Ring
      const coronaGeo = new THREE.RingGeometry(0.95, 1.4, 32);
      const coronaMat = new THREE.MeshBasicMaterial({
        color: 0xfef08a,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
      });
      const corona = new THREE.Mesh(coronaGeo, coronaMat);
      corona.rotation.x = Math.PI / 2;
      group.add(corona);

      // Planets definitions: [color, size, distance, speed, hasRings]
      const planetsData = [
        { name: 'Mercury', color: 0x9ca3af, size: 0.12, dist: 1.5, speed: 1.8 },
        { name: 'Venus', color: 0xf59e0b, size: 0.22, dist: 2.1, speed: 1.4 },
        { name: 'Earth', color: 0x38bdf8, size: 0.25, dist: 2.8, speed: 1.0, moon: true },
        { name: 'Mars', color: 0xef4444, size: 0.18, dist: 3.5, speed: 0.8 },
        { name: 'Jupiter', color: 0xd97706, size: 0.52, dist: 4.6, speed: 0.45 },
        { name: 'Saturn', color: 0xfde047, size: 0.42, dist: 5.8, speed: 0.3, rings: true },
      ];

      planetsData.forEach((p) => {
        // Orbit line
        const orbitCurve = new THREE.EllipseCurve(0, 0, p.dist, p.dist, 0, 2 * Math.PI, false, 0);
        const points = orbitCurve.getPoints(64);
        const orbitGeo = new THREE.BufferGeometry().setFromPoints(points.map((pt) => new THREE.Vector3(pt.x, 0, pt.y)));
        const orbitMat = new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.35 });
        const orbitLine = new THREE.Line(orbitGeo, orbitMat);
        group.add(orbitLine);

        // Planet mesh
        const pGeo = new THREE.SphereGeometry(p.size, 20, 20);
        const pMat = new THREE.MeshStandardMaterial({ color: p.color, roughness: 0.5 });
        const pMesh = new THREE.Mesh(pGeo, pMat);

        if (p.rings) {
          const rGeo = new THREE.RingGeometry(p.size * 1.4, p.size * 2.3, 32);
          const rMat = new THREE.MeshStandardMaterial({
            color: 0xfef08a,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.7,
          });
          const ringsMesh = new THREE.Mesh(rGeo, rMat);
          ringsMesh.rotation.x = Math.PI / 2.5;
          pMesh.add(ringsMesh);
        }

        if (p.moon) {
          const mGeo = new THREE.SphereGeometry(0.06, 12, 12);
          const mMesh = new THREE.Mesh(mGeo, new THREE.MeshStandardMaterial({ color: 0xe2e8f0 }));
          mMesh.position.set(0.4, 0, 0);
          pMesh.add(mMesh);
        }

        group.add(pMesh);
        planetaryBodies.push({
          mesh: pMesh,
          dist: p.dist,
          speed: p.speed,
          angle: Math.random() * Math.PI * 2,
        });
      });

      return group;
    };

    const buildDNA = () => {
      const group = new THREE.Group();
      dnaBasePairGroup = new THREE.Group();
      group.add(dnaBasePairGroup);

      const height = 4.2;
      const turns = 3;
      const radius = 1.0;
      const steps = 60;

      const strand1Points: THREE.Vector3[] = [];
      const strand2Points: THREE.Vector3[] = [];

      const atColor = new THREE.Color(0xef4444); // Red: Adenine-Thymine
      const gcColor = new THREE.Color(0x3b82f6); // Blue: Guanine-Cytosine

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const angle = t * turns * Math.PI * 2;
        const y = (t - 0.5) * height;

        const x1 = Math.cos(angle) * radius;
        const z1 = Math.sin(angle) * radius;
        const x2 = Math.cos(angle + Math.PI) * radius;
        const z2 = Math.sin(angle + Math.PI) * radius;

        strand1Points.push(new THREE.Vector3(x1, y, z1));
        strand2Points.push(new THREE.Vector3(x2, y, z2));

        // Base pair rungs every 2 steps
        if (i % 2 === 0 && i < steps) {
          const isAT = i % 4 === 0;
          const rungMat = new THREE.MeshStandardMaterial({
            color: isAT ? atColor : gcColor,
            roughness: 0.3,
            metalness: 0.2,
          });
          const rungCurve = new THREE.LineCurve3(new THREE.Vector3(x1, y, z1), new THREE.Vector3(x2, y, z2));
          const rungGeo = new THREE.TubeGeometry(rungCurve, 8, 0.045, 8, false);
          const rungMesh = new THREE.Mesh(rungGeo, rungMat);
          dnaBasePairGroup.add(rungMesh);

          // Central Hydrogen Bond node
          const hbGeo = new THREE.SphereGeometry(0.08, 10, 10);
          const hbMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
          const hbNode = new THREE.Mesh(hbGeo, hbMat);
          hbNode.position.set((x1 + x2) / 2, y, (z1 + z2) / 2);
          dnaBasePairGroup.add(hbNode);
        }
      }

      // Sugar-Phosphate Strands (Ribbons)
      const curve1 = new THREE.CatmullRomCurve3(strand1Points);
      const tubeGeo1 = new THREE.TubeGeometry(curve1, 80, 0.085, 12, false);
      const backboneMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        roughness: 0.25,
        metalness: 0.4,
      });
      const strand1Mesh = new THREE.Mesh(tubeGeo1, backboneMat);
      group.add(strand1Mesh);

      const curve2 = new THREE.CatmullRomCurve3(strand2Points);
      const tubeGeo2 = new THREE.TubeGeometry(curve2, 80, 0.085, 12, false);
      const strand2Mesh = new THREE.Mesh(tubeGeo2, backboneMat);
      group.add(strand2Mesh);

      return group;
    };

    const buildAtom = () => {
      const group = new THREE.Group();
      electronMeshes = [];

      // Central Nucleus Cluster (Protons in Red, Neutrons in Grey)
      const nucleonRadius = 0.16;
      const nucleonGeo = new THREE.SphereGeometry(nucleonRadius, 16, 16);
      const protonMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
      const neutronMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.4 });

      for (let i = 0; i < 14; i++) {
        const mat = i % 2 === 0 ? protonMat : neutronMat;
        const nucleon = new THREE.Mesh(nucleonGeo, mat);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = Math.random() * 0.35;
        nucleon.position.set(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
        group.add(nucleon);
      }

      // Orbital Rings and Orbiting Electrons
      const orbitConfigs = [
        { radius: 1.4, tilt: 0, speed: 2.2 },
        { radius: 1.8, tilt: Math.PI / 3, speed: 1.8 },
        { radius: 2.3, tilt: -Math.PI / 3, speed: 1.5 },
        { radius: 2.7, tilt: Math.PI / 2, speed: 1.2 },
      ];

      orbitConfigs.forEach((cfg) => {
        // Orbit ring path
        const ringGeo = new THREE.RingGeometry(cfg.radius - 0.015, cfg.radius + 0.015, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.4,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = cfg.tilt;
        ringMesh.rotation.y = cfg.tilt * 0.5;
        group.add(ringMesh);

        // Electron with luminous trail
        const eleGeo = new THREE.SphereGeometry(0.09, 16, 16);
        const eleMat = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          emissive: 0x0284c7,
          emissiveIntensity: 1.0,
        });
        const eleMesh = new THREE.Mesh(eleGeo, eleMat);
        group.add(eleMesh);

        electronMeshes.push({
          mesh: eleMesh,
          orbitRadius: cfg.radius,
          speed: cfg.speed,
          angle: Math.random() * Math.PI * 2,
          tilt: cfg.tilt,
        });
      });

      return group;
    };

    const buildPlantCell = () => {
      const group = new THREE.Group();

      // Cellulose Cell Wall (Hexagonal Prism / Rounded Box)
      const wallGeo = new THREE.BoxGeometry(2.8, 2.2, 1.6);
      const wallMat = new THREE.MeshStandardMaterial({
        color: 0x15803d,
        wireframe: false,
        roughness: 0.4,
        transparent: true,
        opacity: 0.45,
      });
      const cellWall = new THREE.Mesh(wallGeo, wallMat);
      group.add(cellWall);

      // Central Vacuole (Large clear aqueous sac)
      const vacuoleGeo = new THREE.SphereGeometry(0.9, 24, 24);
      vacuoleGeo.scale(1.2, 0.9, 0.7);
      const vacuoleMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.55,
        roughness: 0.1,
      });
      const vacuole = new THREE.Mesh(vacuoleGeo, vacuoleMat);
      vacuole.position.set(-0.2, -0.1, 0);
      group.add(vacuole);

      // Chloroplasts (Oval green disks with internal thylakoids)
      const chloroGeo = new THREE.SphereGeometry(0.32, 16, 16);
      chloroGeo.scale(1.2, 0.5, 0.7);
      const chloroMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.3 });

      const chloroPositions = [
        [0.85, 0.65, 0.3],
        [0.9, -0.5, 0.25],
        [-0.8, 0.7, -0.2],
        [0.4, 0.75, -0.3],
        [-0.9, -0.65, 0.3],
      ];

      chloroPositions.forEach((pos) => {
        const chloro = new THREE.Mesh(chloroGeo, chloroMat);
        chloro.position.set(pos[0], pos[1], pos[2]);
        chloro.rotation.z = Math.random() * 0.5;
        group.add(chloro);
      });

      // Cell Nucleus with Nucleolus
      const nucleusGeo = new THREE.SphereGeometry(0.48, 24, 24);
      const nucleusMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, roughness: 0.4 });
      const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
      nucleus.position.set(-0.7, 0.45, 0.2);
      group.add(nucleus);

      const nucleolusGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const nucleolusMat = new THREE.MeshBasicMaterial({ color: 0x7e22ce });
      const nucleolus = new THREE.Mesh(nucleolusGeo, nucleolusMat);
      nucleolus.position.set(-0.7, 0.45, 0.35);
      group.add(nucleolus);

      return group;
    };

    // Instantiate selected model
    const loadSelectedModel = (type: ModelType) => {
      while (rootModelGroup.children.length > 0) {
        const child = rootModelGroup.children[0];
        rootModelGroup.remove(child);
      }
      heartVentricle = null;
      brainSynapsePoints = null;
      planetaryBodies = [];
      electronMeshes = [];
      dnaBasePairGroup = null;

      let built: THREE.Group;
      if (type === 'heart') built = buildHeart();
      else if (type === 'brain') built = buildBrain();
      else if (type === 'solarsystem') built = buildSolarSystem();
      else if (type === 'dna') built = buildDNA();
      else if (type === 'atom') built = buildAtom();
      else built = buildPlantCell();

      rootModelGroup.add(built);
    };

    loadSelectedModel(selectedModel);

    // Animation Tick Loop
    let clock = new THREE.Clock();
    let heartBeatPhase = 0;

    const tick = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();
      const currentSpeed = speedRef.current;

      // Smooth mouse rotation damping
      rootModelGroup.rotation.y = THREE.MathUtils.damp(rootModelGroup.rotation.y, targetRotationY, 4, delta);
      rootModelGroup.rotation.x = THREE.MathUtils.damp(rootModelGroup.rotation.x, targetRotationX, 4, delta);

      // Continuous auto-rotation when not dragging
      if (!isDragging && currentSpeed > 0) {
        targetRotationY += 0.005 * currentSpeed;
      }

      // Update Wireframe mode on all materials
      const wireframeOn = wireframeRef.current;
      rootModelGroup.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mat = (obj as THREE.Mesh).material;
          if (Array.isArray(mat)) {
            mat.forEach((m) => {
              if ('wireframe' in m) {
                (m as THREE.MeshStandardMaterial).wireframe = wireframeOn;
              }
            });
          } else if (mat && 'wireframe' in mat) {
            (mat as THREE.MeshStandardMaterial).wireframe = wireframeOn;
          }
        }
      });

      // Exploded-view separation
      const explodeVal = explodedRef.current;
      rootModelGroup.children.forEach((topChild) => {
        topChild.children.forEach((part, index) => {
          if (explodeVal > 0) {
            const factor = 1 + explodeVal * 0.7;
            const targetX = (part.userData.originalX ?? (part.userData.originalX = part.position.x)) * factor;
            const targetY = (part.userData.originalY ?? (part.userData.originalY = part.position.y)) * factor;
            const targetZ = (part.userData.originalZ ?? (part.userData.originalZ = part.position.z)) * factor;
            part.position.x = THREE.MathUtils.damp(part.position.x, targetX, 5, delta);
            part.position.y = THREE.MathUtils.damp(part.position.y, targetY, 5, delta);
            part.position.z = THREE.MathUtils.damp(part.position.z, targetZ, 5, delta);
          } else if (part.userData.originalX !== undefined) {
            part.position.x = THREE.MathUtils.damp(part.position.x, part.userData.originalX, 5, delta);
            part.position.y = THREE.MathUtils.damp(part.position.y, part.userData.originalY, 5, delta);
            part.position.z = THREE.MathUtils.damp(part.position.z, part.userData.originalZ, 5, delta);
          }
        });
      });

      // Heartbeat pulse animation
      if (modelRef.current === 'heart' && heartVentricle) {
        heartBeatPhase += delta * 4.5 * Math.max(0.5, currentSpeed);
        const beat = 1 + Math.sin(heartBeatPhase) * 0.07 * (Math.sin(heartBeatPhase) > 0.4 ? 1.6 : 0.4);
        heartVentricle.scale.set(0.85 * beat, 1.25 * beat, 0.85 * beat);
      }

      // Brain synaptic glow pulse
      if (modelRef.current === 'brain' && brainSynapsePoints) {
        const pMat = brainSynapsePoints.material as THREE.PointsMaterial;
        pMat.opacity = 0.5 + Math.sin(time * 3) * 0.35;
      }

      // Solar system planetary orbit movement
      if (modelRef.current === 'solarsystem' && planetaryBodies.length > 0) {
        planetaryBodies.forEach((p) => {
          p.angle += delta * p.speed * 0.4 * currentSpeed;
          p.mesh.position.x = Math.cos(p.angle) * p.dist;
          p.mesh.position.z = Math.sin(p.angle) * p.dist;
          p.mesh.rotation.y += delta * 1.5;
        });
      }

      // Quantum Atom electron orbits
      if (modelRef.current === 'atom' && electronMeshes.length > 0) {
        electronMeshes.forEach((ele) => {
          ele.angle += delta * ele.speed * 1.8 * currentSpeed;
          const x = Math.cos(ele.angle) * ele.orbitRadius;
          const y = Math.sin(ele.angle) * Math.sin(ele.tilt) * ele.orbitRadius;
          const z = Math.sin(ele.angle) * Math.cos(ele.tilt) * ele.orbitRadius;
          ele.mesh.position.set(x, y, z);
        });
      }

      // DNA unwinding / base pair rotation
      if (modelRef.current === 'dna' && dnaBasePairGroup) {
        dnaBasePairGroup.rotation.y += delta * 0.2 * currentSpeed;
      }

      renderer.render(scene, camera);
      animationFrameId.current = requestAnimationFrame(tick);
    };

    tick();

    // Window Resize Handling
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('touchstart', onTouchStart);
      dom.removeEventListener('touchmove', onTouchMove);
      dom.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
    };
  }, [selectedModel]);

  const currentOption = MODEL_OPTIONS.find((m) => m.id === selectedModel) || MODEL_OPTIONS[0];

  return (
    <div className={`relative w-full overflow-hidden bg-gray-950 select-none ${isFullscreen ? 'fixed inset-0 z-50 h-screen' : 'h-[640px] rounded-2xl border border-gray-800 shadow-2xl'}`}>
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* TOP HEADER HUD: Title, Category, Model Selector & Audio Switch */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="bg-gray-900/90 backdrop-blur-md border border-gray-700/80 px-4 py-2.5 rounded-xl shadow-lg pointer-events-auto flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">{currentOption.category}</div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              {currentOption.title}
            </h2>
          </div>
        </div>

        {/* Quick Model Selector Pills */}
        <div className="bg-gray-900/90 backdrop-blur-md border border-gray-700/80 p-1.5 rounded-xl shadow-lg pointer-events-auto flex items-center gap-1 overflow-x-auto max-w-full">
          {MODEL_OPTIONS.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setSelectedModel(m.id);
                setActivePin(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedModel === m.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {m.id === 'heart'
                ? 'Heart'
                : m.id === 'brain'
                ? 'Brain'
                : m.id === 'solarsystem'
                ? 'Solar System'
                : m.id === 'dna'
                ? 'DNA Helix'
                : m.id === 'atom'
                ? 'Atom Orbitals'
                : 'Plant Cell'}
            </button>
          ))}
        </div>

        {/* Top-Right Action Badges */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsAudioNarration(!isAudioNarration)}
            title="Toggle Voice Narration"
            className="p-2.5 rounded-xl bg-gray-900/90 backdrop-blur-md border border-gray-700/80 text-gray-300 hover:text-white hover:bg-gray-800 transition"
          >
            {isAudioNarration ? <Volume2 size={16} className="text-emerald-400" /> : <VolumeX size={16} className="text-gray-500" />}
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title="Toggle Fullscreen"
            className="p-2.5 rounded-xl bg-gray-900/90 backdrop-blur-md border border-gray-700/80 text-gray-300 hover:text-white hover:bg-gray-800 transition"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* INTERACTIVE 3D INSPECTION PIN OVERLAYS */}
      <div className="absolute top-24 left-4 flex flex-col gap-2 max-w-xs pointer-events-auto z-10">
        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Sparkles size={12} className="text-indigo-400" />
          {language === 'hi' ? 'संरचनात्मक पिन (क्लिक करें)' : 'Interactive Anatomy Pins'}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {currentOption.pins.map((pin) => (
            <button
              key={pin.id}
              onClick={() => {
                setActivePin(pin);
                narrate(`${pin.name}. ${pin.info}`);
              }}
              className={`px-2.5 py-1 text-xs rounded-lg border transition-all text-left flex items-center gap-1.5 ${
                activePin?.id === pin.id
                  ? 'bg-indigo-600 border-indigo-400 text-white font-semibold shadow-[0_0_12px_rgba(99,102,241,0.5)]'
                  : 'bg-gray-900/80 border-gray-700 text-gray-300 hover:border-gray-500'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              {pin.name}
            </button>
          ))}
        </div>

        {/* Selected Pin Info Card */}
        {activePin && (
          <div className="mt-2 p-3 rounded-xl bg-gray-900/95 border border-indigo-500/50 text-xs shadow-xl animate-in fade-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-gray-800">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Info size={14} className="text-cyan-400" />
                {activePin.name}
              </span>
              <button
                onClick={() => setActivePin(null)}
                className="text-gray-400 hover:text-white font-mono text-xs"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-300 leading-relaxed">{activePin.info}</p>
            {onExploreTopicDossier && (
              <button
                onClick={() => onExploreTopicDossier(currentOption.title)}
                className="mt-2.5 w-full py-1.5 px-2 bg-indigo-600/80 hover:bg-indigo-600 text-white font-medium rounded-lg text-center transition flex items-center justify-center gap-1 text-[11px]"
              >
                <span>{language === 'hi' ? 'पूर्ण 13-बिंदु ज्ञान पढ़ें' : 'Read Full 13-Point Dossier'}</span>
                →
              </button>
            )}
          </div>
        )}
      </div>

      {/* UNIFIED COLLAPSIBLE BOTTOM CONTROL DOCK (Zero Viewport Occlusion) */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-3xl transition-transform duration-300 pointer-events-auto z-20 ${
          isDockCollapsed ? 'translate-y-[calc(100%-36px)]' : 'translate-y-0'
        }`}
      >
        {/* Collapse Toggle Tab */}
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="px-4 py-1 rounded-t-lg bg-gray-900/90 border-t border-x border-gray-700 text-[11px] font-medium text-gray-300 hover:text-white flex items-center gap-1 shadow-md"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp size={14} />
                <span>Show 3D Controls</span>
              </>
            ) : (
              <>
                <ChevronDown size={14} />
                <span>Hide Controls (Zen Mode)</span>
              </>
            )}
          </button>
        </div>

        {/* Control Dock Surface */}
        <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/80 rounded-2xl p-3.5 shadow-2xl flex flex-wrap items-center justify-between gap-4 text-xs">
          {/* Exploded View Slider */}
          <div className="flex items-center gap-2 min-w-[170px]">
            <Layers size={15} className="text-indigo-400" />
            <span className="text-gray-300 font-medium">Explode</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={explodedRatio}
              onChange={(e) => setExplodedRatio(parseFloat(e.target.value))}
              className="w-24 accent-indigo-500 cursor-pointer"
            />
            <span className="font-mono text-gray-400 w-8">{Math.round(explodedRatio * 100)}%</span>
          </div>

          {/* Speed Slider */}
          <div className="flex items-center gap-2 min-w-[150px]">
            <RotateCcw size={15} className="text-cyan-400" />
            <span className="text-gray-300 font-medium">Spin</span>
            <input
              type="range"
              min="0"
              max="2.5"
              step="0.25"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
              className="w-20 accent-cyan-500 cursor-pointer"
            />
            <span className="font-mono text-gray-400 w-8">{rotationSpeed}x</span>
          </div>

          {/* Wireframe Toggle */}
          <button
            onClick={() => setIsWireframe(!isWireframe)}
            className={`px-3 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition ${
              isWireframe
                ? 'bg-purple-600 border-purple-400 text-white'
                : 'bg-gray-800 border-gray-700 text-gray-300 hover:text-white'
            }`}
          >
            <Eye size={13} />
            <span>Wireframe</span>
          </button>

          {/* Camera View Angle Presets */}
          <div className="flex items-center gap-1 bg-gray-800/80 p-1 rounded-lg border border-gray-700">
            <Camera size={13} className="text-gray-400 ml-1" />
            {(['front', 'top', 'iso', 'close'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setCameraView(view)}
                className="px-2 py-1 rounded text-[11px] font-medium text-gray-300 hover:text-white hover:bg-gray-700 uppercase"
              >
                {view}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
