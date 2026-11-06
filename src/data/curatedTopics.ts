import { TopicDossier } from '../types/knowledge';

export const CURATED_TOPICS: Record<string, TopicDossier> = {
  'human-heart': {
    topic: 'Human Heart (Cardiovascular System)',
    scientificName: 'Cor humanum',
    commonName: 'Human Heart',
    branch: 'Human Anatomy & Physiology',
    tagline: 'The electromechanical bio-pump sustaining 80 beats per minute across a century of life.',
    summary: 'The human heart is a four-chambered, muscular organ situated in the mediastinum of the thoracic cavity, responsible for rhythmically propelling oxygenated blood through systemic circulation and deoxygenated blood through pulmonary circulation.',
    completeExplanation: 'Acting as the core hydraulic engine of human biology, the heart beats approximately 100,000 times each day, circulating over 7,500 liters of blood through a vascular network extending over 96,000 kilometers. It is divided into left and right halves by the cardiac septum, and further separated into atria (receiving chambers) and ventricles (pumping chambers). The cardiac cycle is synchronized by an intrinsic electrical conduction system spearheaded by the sinoatrial (SA) node, the natural biological pacemaker located in the right atrium. Excitation spreads across the atrioventricular (AV) node, the bundle of His, and Purkinje fibers, initiating coordinated systolic contraction and diastolic filling under autonomic fine-tuning.',
    taxonomy: {
      domain: 'Eukaryota',
      kingdom: 'Animalia',
      phylum: 'Chordata',
      class: 'Mammalia',
      order: 'Primates',
      family: 'Hominidae',
      genus: 'Homo',
      species: 'Homo sapiens',
    },
    bodyStructuresAndFunctions: [
      {
        structure: 'Left Ventricle',
        function: 'Thick muscular chamber that pumps oxygen-rich blood into the aorta against systemic arterial resistance (~120 mmHg).',
        clinicalOrPracticalNote: 'Hypertrophy occurs when adapting to chronic hypertension or intense athletic conditioning.',
      },
      {
        structure: 'Right Ventricle',
        function: 'Ejects deoxygenated blood into the pulmonary artery toward alveolar capillary beds at low pressure (~25 mmHg).',
        clinicalOrPracticalNote: 'Low resistance prevents pulmonary edema in fragile lung tissue.',
      },
      {
        structure: 'Sinoatrial (SA) Node',
        function: 'Primary autorhythmic pacemaker cells generating 60-100 spontaneous electrical depolarizations per minute via funny (If) sodium channels.',
        clinicalOrPracticalNote: 'Can be replaced by electronic lithium-powered pacemakers when sick sinus syndrome manifests.',
      },
      {
        structure: 'Aortic & Mitral Valves',
        function: 'Unidirectional fibrous cusps that prevent retrograde backflow of high-pressure blood during ventricular systole and diastole.',
        clinicalOrPracticalNote: 'Stenosis or regurgitation can be corrected with mechanical or biological prosthetic valves.',
      },
      {
        structure: 'Coronary Arteries (LAD, RCA, LCx)',
        function: 'Direct arterial branches off the aortic root that supply the high metabolic demands of the myocardium during diastole.',
        clinicalOrPracticalNote: 'Blockage of the Left Anterior Descending (LAD) is known as the "widow-maker" infarction.',
      },
    ],
    internalExternalAnatomy: {
      externalFeatures: [
        'Pericardial sac (fibrous outer protective layer with serous lubricating fluid)',
        'Coronary sulcus separating atria from ventricles',
        'Apex directed anteroinferiorly toward the 5th left intercostal space',
        'Ascending aorta, aortic arch, and superior/inferior vena cava',
      ],
      internalArchitecture: [
        'Endocardium (smooth endothelial inner lining)',
        'Myocardium (thick specialized cardiac muscle with intercalated discs and gap junctions)',
        'Papillary muscles anchoring chordae tendineae to atrioventricular valves',
        'Interventricular and interatrial septa preventing shunt of deoxygenated blood',
      ],
    },
    habitatAndDistribution: {
      primaryRegion: 'Mediastinum of the Human Thoracic Cavity',
      biomeOrEnvironment: 'Internal Human Physiological Milieu (37°C, pH 7.35-7.45)',
      distributionDetails: 'Present in all 8 billion living humans globally, positioned between the lungs, rotated slightly leftwards behind the sternum.',
    },
    historyAndDevelopment: [
      {
        eraOrYear: 'c. 350 BCE',
        discoveryOrMilestone: 'Aristotle identified the heart as the primary seat of intelligence, warmth, and emotion in animals.',
        keyPioneers: 'Aristotle',
      },
      {
        eraOrYear: '1242 CE',
        discoveryOrMilestone: 'Ibn al-Nafis published the first accurate description of pulmonary circulation, refuting Galen’s notion of invisible cardiac pores.',
        keyPioneers: 'Ibn al-Nafis (Damascus)',
      },
      {
        eraOrYear: '1628 CE',
        discoveryOrMilestone: 'William Harvey demonstrated that the heart acts as a closed hydraulic pump circulating blood continuously throughout the body.',
        keyPioneers: 'William Harvey',
      },
      {
        eraOrYear: '1967 CE',
        discoveryOrMilestone: 'First successful human-to-human heart transplant performed at Groote Schuur Hospital.',
        keyPioneers: 'Dr. Christiaan Barnard',
      },
    ],
    importanceAndApplications: [
      'Cardiopulmonary resuscitation (CPR) and Automated External Defibrillator (AED) life-support protocols.',
      'Extracorporeal Membrane Oxygenation (ECMO) and Left Ventricular Assist Devices (LVADs) as bridges to transplantation.',
      'Echocardiography, cardiac MRI, and coronary angiography for precision diagnostics.',
      'Hemodynamic modeling in bio-fluid engineering and artificial valve design.',
    ],
    advantagesAndDisadvantages: {
      advantagesOrBenefits: [
        'Extraordinary biological durability: contracts over 2.5 billion times in an average human lifespan without pausing.',
        'Intrinsic autorhythmicity: can continue beating independently outside the body if provided oxygenated perfusion.',
        'Adaptive Frank-Starling law: automatically increases stroke volume in response to increased venous return.',
      ],
      disadvantagesOrRisks: [
        'Minimal post-natal regenerative capacity: adult cardiac myocytes rarely divide after myocardial infarction, leading to permanent fibrous scarring.',
        'High susceptibility to ischemic atherosclerosis due to end-arterial coronary blood supply.',
      ],
    },
    relatedDiscoveriesAndResearch: [
      {
        title: 'Induced Pluripotent Stem Cell (iPSC) Cardiomyocyte Patches',
        findings: 'Engineered human heart muscle tissue successfully restored contractile function in damaged animal infracted regions.',
        journalOrInstitution: 'Nature Biotechnology / Stanford Cardiovascular Institute',
      },
      {
        title: 'Genetically Modified Porcine Xenotransplantation',
        findings: '10-gene-edited pig hearts transplanted into human recipients with immunosuppression demonstrated viable mechanical output.',
        journalOrInstitution: 'University of Maryland School of Medicine / Lancet',
      },
    ],
    futurePossibilitiesAndPredictions: [
      {
        prediction: 'Total 3D Bioprinting of vascularized, patient-specific autologous hearts from reprogrammed skin fibroblasts, eliminating donor shortages.',
        timeframe: '2035 - 2045',
        uncertaintyLevel: 'Medium',
        confidencePercent: 78,
      },
      {
        prediction: 'In vivo CRISPR lipid-nanoparticle gene therapy permanently silencing PCSK9 to eliminate hypercholesterolemia and coronary artery disease globally.',
        timeframe: '2028 - 2035',
        uncertaintyLevel: 'Low',
        confidencePercent: 92,
      },
      {
        prediction: 'Wireless bio-electronic pulse energy harvesting using piezoelectric cardiac motion to power lifetime pacemakers without battery changes.',
        timeframe: '2030 - 2038',
        uncertaintyLevel: 'Low',
        confidencePercent: 88,
      },
    ],
    diagramLabels: [
      { label: 'Superior Vena Cava', description: 'Brings deoxygenated blood from upper body', position: 'Top-Right' },
      { label: 'Ascending Aorta', description: 'Distributes high-pressure systemic oxygenated blood', position: 'Top-Center' },
      { label: 'Left Ventricle', description: 'Primary power pumping chamber', position: 'Bottom-Left' },
      { label: 'Right Atrium', description: 'Receives systemic venous return; houses SA node', position: 'Mid-Right' },
    ],
    suggested3DModel: 'heart',
    curatedVisualKeywords: ['Cardiovascular', 'Myocardium', 'Ventricular Systole', 'SA Node Pacemaker'],
    quickFacts: [
      'Your heart beats about 100,000 times each day and pumps roughly 2,000 gallons of blood.',
      'The heart has its own electrical generator and will continue beating for hours if placed in an oxygenated fluid bath.',
      'A blue whale’s heart is the size of a small golf cart and weighs over 180 kilograms (400 pounds).',
    ],
    references: [
      { sourceName: 'Guyton and Hall Textbook of Medical Physiology, 14th Ed.', citation: 'Cardiac Muscle and Circulation, Chapters 9-13', doiOrUrl: 'ISBN: 9780323597128' },
      { sourceName: 'Circulation Journal (AHA)', citation: 'Heart Disease and Stroke Statistics 2024 Update', doiOrUrl: 'doi:10.1161/CIR.0000000000001209' },
    ],
    safetyGuidanceOrDisclaimer: 'Educational Reference Only: Any chest pain, sudden shortness of breath, radiating arm discomfort, or acute palpitations requires immediate emergency medical attention (Call 911 / 112).',
  },

  'human-brain': {
    topic: 'Human Brain & Synaptic Architecture',
    scientificName: 'Encephalon humanum',
    commonName: 'Human Brain',
    branch: 'Psychology & Neuroscience',
    tagline: '86 billion neurons and 100 trillion synaptic connections forming the seat of consciousness.',
    summary: 'The human brain is the command center of the central nervous system, consuming 20% of resting metabolic energy while weighing just 1.4 kilograms, coordinating perception, cognition, emotion, motor control, and self-awareness.',
    completeExplanation: 'Encapsulated within the neurocranium and bathed in protective cerebrospinal fluid (CSF), the human brain consists of the cerebrum, cerebellum, and brainstem. The cerebral cortex is characterized by intricate gyri (ridges) and sulci (grooves) that maximize surface area within the cranial vault. Information flows along complex axonal tracts via bioelectrical action potentials and biochemical neurotransmission across synaptic clefts measuring mere nanometers. Plasticity—the brain’s capacity to dynamically rewire synaptic connections based on experience and learning—serves as the foundational substrate for memory, intelligence, and behavioral adaptation.',
    taxonomy: {
      domain: 'Eukaryota',
      kingdom: 'Animalia',
      phylum: 'Chordata',
      class: 'Mammalia',
      order: 'Primates',
      family: 'Hominidae',
      genus: 'Homo',
      species: 'Homo sapiens',
    },
    bodyStructuresAndFunctions: [
      {
        structure: 'Frontal Lobe (Prefrontal Cortex)',
        function: 'Executes higher-order executive functioning, decision-making, planning, working memory, and social inhibition.',
        clinicalOrPracticalNote: 'Damage can radically alter personality and impulse control (classic case of Phineas Gage).',
      },
      {
        structure: 'Hippocampus (Limbic System)',
        function: 'Consolidates short-term information into long-term declarative memories and maintains spatial navigation maps via place and grid cells.',
        clinicalOrPracticalNote: 'Primary site of early neurodegeneration in Alzheimer’s pathology.',
      },
      {
        structure: 'Cerebellum',
        function: 'Contains over 50% of all brain neurons, coordinating sensorimotor timing, balance, equilibrium, and fine muscle coordination.',
        clinicalOrPracticalNote: 'Lesions cause intention tremors, ataxia, and loss of smooth pursuit eye movements.',
      },
      {
        structure: 'Synaptic Cleft & Dendritic Spines',
        function: 'Nanometer junctions where neurotransmitters (glutamate, GABA, dopamine, serotonin) bind post-synaptic receptors to modulate voltage.',
        clinicalOrPracticalNote: 'Long-Term Potentiation (LTP) is the cellular cornerstone of learning and memory formation.',
      },
    ],
    internalExternalAnatomy: {
      externalFeatures: [
        'Cerebral hemispheres divided by the longitudinal fissure and connected by the corpus callosum',
        'Four primary lobes: Frontal, Parietal, Temporal, Occipital',
        'Cerebellar folia and brainstem exiting through the foramen magnum',
      ],
      internalArchitecture: [
        'Cerebral cortex grey matter (neuronal cell bodies, dendrites, synapses)',
        'Subcortical white matter (myelinated axonal projection and association tracts)',
        'Ventricular system containing ~150 mL of continuously circulating cerebrospinal fluid',
        'Basal ganglia (striatum, globus pallidus, substantia nigra) gating motor behavior',
      ],
    },
    habitatAndDistribution: {
      primaryRegion: 'Cranial Cavity of Homo sapiens',
      biomeOrEnvironment: 'Central Nervous System behind the Blood-Brain Barrier (BBB)',
      distributionDetails: 'Present in all conscious human individuals across all geographic regions.',
    },
    historyAndDevelopment: [
      {
        eraOrYear: 'c. 1600 BCE',
        discoveryOrMilestone: 'Edwin Smith Surgical Papyrus recorded the earliest written observations of brain anatomy and cranial sutures.',
        keyPioneers: 'Ancient Egyptian Physicians',
      },
      {
        eraOrYear: '1888 CE',
        discoveryOrMilestone: 'Santiago Ramón y Cajal utilized Golgi silver staining to prove the Neuron Doctrine: the brain is made of individual distinct cells.',
        keyPioneers: 'Santiago Ramón y Cajal & Camillo Golgi',
      },
      {
        eraOrYear: '1952 CE',
        discoveryOrMilestone: 'Hodgkin and Huxley developed the quantitative mathematical model for neuronal action potential propagation.',
        keyPioneers: 'Alan Hodgkin & Andrew Huxley',
      },
      {
        eraOrYear: '2024 CE',
        discoveryOrMilestone: 'Electron microscopy cubic millimeter synaptic connectome reconstruction of human cortex published with 57,000 cells and 150 million synapses.',
        keyPioneers: 'Harvard University / Google Connectomics',
      },
    ],
    importanceAndApplications: [
      'Neurotechnology and Brain-Computer Interfaces (BCI) restoring speech and motor autonomy to paralyzed individuals.',
      'Deep Brain Stimulation (DBS) for Parkinson’s tremor control and refractory depression.',
      'Foundation of artificial neural networks, deep learning architectures, and neuromorphic chip computing.',
      'Cognitive neuroscience and targeted psychopharmacology for neurodevelopmental and psychiatric disorders.',
    ],
    advantagesAndDisadvantages: {
      advantagesOrBenefits: [
        'Incomparable computational energy efficiency: processes sensory data, language, and abstract thought on just 20 Watts of power.',
        'Synaptic neuroplasticity allows lifelong learning and partial functional recovery following stroke through cortical remapping.',
      ],
      disadvantagesOrRisks: [
        'High vulnerability to hypoxia: irreversible ischemic neuronal apoptosis begins after just 4 to 5 minutes of oxygen deprivation.',
        'Blood-Brain Barrier impedes 98% of small-molecule therapeutics and antibodies from reaching targeted brain tumors or pathogens.',
      ],
    },
    relatedDiscoveriesAndResearch: [
      {
        title: 'Whole-Brain Neural Connectome Mapping',
        findings: 'High-throughput serial electron microscopy unveiled previously unknown polysynaptic axon whorls in cortical layers.',
        journalOrInstitution: 'Science / Lichtman Laboratory',
      },
      {
        title: 'High-Density Intracortical Brain-Computer Interfaces',
        findings: 'Paralyzed participants translated imagined speech into digital synthesized audio at 62 words per minute with 97% accuracy.',
        journalOrInstitution: 'Nature / Stanford Neural Prosthetics Lab',
      },
    ],
    futurePossibilitiesAndPredictions: [
      {
        prediction: 'High-bandwidth bi-directional neural lace interfaces allowing direct neural synthesis of digital knowledge without physical screens.',
        timeframe: '2035 - 2050',
        uncertaintyLevel: 'High',
        confidencePercent: 64,
      },
      {
        prediction: 'Reversal of neurodegenerative tau and amyloid pathology through targeted focused-ultrasound transient blood-brain barrier opening.',
        timeframe: '2029 - 2036',
        uncertaintyLevel: 'Medium',
        confidencePercent: 82,
      },
      {
        prediction: 'Neuromorphic artificial cognitive architectures matching biological synaptic plasticity density on 3D memristor wafer-scale systems.',
        timeframe: '2032 - 2040',
        uncertaintyLevel: 'Medium',
        confidencePercent: 75,
      },
    ],
    diagramLabels: [
      { label: 'Frontal Cortex', description: 'Executive control and language generation (Broca)', position: 'Front-Top' },
      { label: 'Temporal Lobe', description: 'Auditory processing and language comprehension (Wernicke)', position: 'Mid-Lateral' },
      { label: 'Occipital Lobe', description: 'Primary visual cortex (V1-V5 retinotopic mapping)', position: 'Rear' },
      { label: 'Cerebellum', description: 'Fine motor coordination and balance calibration', position: 'Postero-inferior' },
    ],
    suggested3DModel: 'brain',
    curatedVisualKeywords: ['Neuroscience', 'Synaptic Firing', 'Cerebral Cortex', 'Action Potential'],
    quickFacts: [
      'The human brain has roughly 86 billion neurons, each connected to up to 10,000 others.',
      'Information travels along nerve fibers at speeds ranging from 1 to over 100 meters per second (up to 270 mph).',
      'Memories are not stored in one specific filing cabinet; they are distributed patterns of synaptic weights throughout the neocortex.',
    ],
    references: [
      { sourceName: 'Principles of Neural Science, 6th Ed.', citation: 'Kandel, Koester, Mack, Siegelbaum', doiOrUrl: 'ISBN: 9781259642234' },
      { sourceName: 'Nature', citation: 'A Petavoxel Fragment of Human Cerebral Cortex Reconstructed at Ultrastructural Resolution', doiOrUrl: 'doi:10.1038/s41586-024-07369-3' },
    ],
    safetyGuidanceOrDisclaimer: 'Educational Neuroscience Reference: Clinical neurological symptoms (sudden facial drooping, arm weakness, slurred speech) require immediate emergency FAST stroke evaluation.',
  },

  'solar-system': {
    topic: 'Solar System & Planetary Dynamics',
    scientificName: 'Systema Solare',
    commonName: 'Solar System',
    branch: 'Space & Astronomy',
    tagline: 'A gravitationally bound star system spanning 100,000 astronomical units into the Oort Cloud.',
    summary: 'Formed 4.6 billion years ago from the gravitational collapse of a giant interstellar molecular cloud, the Solar System comprises our G-type main-sequence star (the Sun), eight major planets, hundreds of dwarf planets, moons, asteroids, and comets.',
    completeExplanation: 'The Solar System is structured into three distinct concentric zones: the inner terrestrial realm (Mercury, Venus, Earth, Mars) dominated by silicate rock and iron cores; the outer gas and ice giants (Jupiter, Saturn, Uranus, Neptune) containing the vast majority of non-solar planetary mass; and the trans-Neptunian trans-orbital debris belts including the Kuiper Belt, the scattered disc, and the distant spherical Oort Cloud extending halfway to Alpha Centauri. Kepler’s laws of planetary motion and Einstein’s General Relativity dictate the elliptical orbital dynamics of every body revolving around the Sun’s 99.86% gravitational mass share.',
    taxonomy: {
      domain: 'Cosmic Structure',
      kingdom: 'Milky Way Galaxy',
      phylum: 'Orion-Cygnus Arm',
      class: 'Local Interstellar Cloud',
      order: 'Heliosphere',
      family: 'Solar System',
      genus: 'Sol',
      species: 'Sol-Planetary System',
    },
    bodyStructuresAndFunctions: [
      {
        structure: 'The Sun (Sol)',
        function: 'Fuses 600 million tons of hydrogen into helium every second via the proton-proton chain, radiating thermal photon flux sustaining all planetary climates.',
        clinicalOrPracticalNote: 'Solar coronal mass ejections (CMEs) can induce catastrophic geomagnetic currents in modern power grids.',
      },
      {
        structure: 'Jupiter',
        function: 'Shields inner terrestrial worlds by gravitationally deflecting or capturing hazardous long-period comets and stabilizing the asteroid belt.',
        clinicalOrPracticalNote: 'Possesses the strongest planetary magnetic field, creating lethal radiation belts around Europa and Io.',
      },
      {
        structure: 'Earth (Tellus)',
        function: 'Possesses liquid water oceans, an active geodynamo magnetosphere, and nitrogen-oxygen atmosphere sustaining complex biological life.',
        clinicalOrPracticalNote: 'Only known habitat for carbon-based life in the observable universe.',
      },
      {
        structure: 'Kuiper Belt & Oort Cloud',
        function: 'Pristine volatile-rich cryogenic reservoirs of water ice, methane, ammonia, and pre-biotic organics dating back to primordial planetary accretion.',
        clinicalOrPracticalNote: 'Source of short-period and long-period cometary bombardment on Earth.',
      },
    ],
    internalExternalAnatomy: {
      externalFeatures: [
        'Heliosphere bubble shielding planets from galactic cosmic ray rays',
        'Zodiacal dust cloud in the ecliptic plane scattering sunlight',
        'Kuiper belt ring and spherical Oort Cloud boundary out to 1.5 light years',
      ],
      internalArchitecture: [
        'Solar core (15 million K thermonuclear furnace)',
        'Ecliptic orbital plane with orbital inclinations under 7 degrees for major planets',
        'Main Asteroid Belt between Mars and Jupiter with dwarf planet Ceres',
      ],
    },
    habitatAndDistribution: {
      primaryRegion: 'Local Bubble, Orion Arm, Milky Way Galaxy',
      biomeOrEnvironment: 'Galactic Habitable Zone (~26,000 light-years from Sagittarius A*)',
      distributionDetails: 'Orbits the supermassive black hole at the center of the Milky Way once every 230 million Earth years (one Galactic Year).',
    },
    historyAndDevelopment: [
      {
        eraOrYear: '1543 CE',
        discoveryOrMilestone: 'Nicolaus Copernicus published "De revolutionibus orbium coelestium", establishing the heliocentric model of the cosmos.',
        keyPioneers: 'Nicolaus Copernicus',
      },
      {
        eraOrYear: '1610 CE',
        discoveryOrMilestone: 'Galileo Galilei observed Jupiter’s four largest moons (Io, Europa, Ganymede, Callisto), proving objects orbit other bodies besides Earth.',
        keyPioneers: 'Galileo Galilei',
      },
      {
        eraOrYear: '1687 CE',
        discoveryOrMilestone: 'Isaac Newton published Principia, formulating universal gravitation and mathematical laws governing orbital motion.',
        keyPioneers: 'Isaac Newton',
      },
      {
        eraOrYear: '1977 CE',
        discoveryOrMilestone: 'Voyager 1 and 2 probes launched, executing grand tours of outer planets and crossing into true interstellar space in 2012.',
        keyPioneers: 'NASA Jet Propulsion Laboratory',
      },
    ],
    importanceAndApplications: [
      'Space weather monitoring protecting satellite communications, GPS navigation, and terrestrial electric grids.',
      'Asteroid redirection and planetary defense (NASA DART mission kinetic impactor success).',
      'In-situ resource utilization (ISRU) for lunar water ice and asteroid mining (platinum-group metals, rare earth minerals).',
      'Astrobiology exploration seeking extraterrestrial biosignatures in sub-surface oceans of Europa and Enceladus.',
    ],
    advantagesAndDisadvantages: {
      advantagesOrBenefits: [
        'Long solar main-sequence stability: Sun will provide steady luminosity for another 5 billion years before expanding into a red giant.',
        'Vast water and mineral resources across asteroids and icy moons sufficient to support trillions of future space-faring humans.',
      ],
      disadvantagesOrRisks: [
        'Lethal vacuum and radiation environment: intense solar particle events and unshielded galactic cosmic rays cause rapid DNA damage.',
        'Vast interplanetary distances: traveling to Mars requires 6-9 months using current chemical rocketry.',
      ],
    },
    relatedDiscoveriesAndResearch: [
      {
        title: 'James Webb Space Telescope (JWST) Kuiper Belt Spectroscopy',
        findings: 'Direct spectroscopic detection of carbon dioxide and hydrogen peroxide on Charon and trans-Neptunian planetesimals.',
        journalOrInstitution: 'Nature Astronomy / NASA JWST Science Team',
      },
      {
        title: 'NASA Europa Clipper Mission',
        findings: 'Launched on 1.8-billion-mile journey to map the habitability of Europa’s subsurface liquid ocean containing twice the water of Earth.',
        journalOrInstitution: 'NASA / JPL',
      },
    ],
    futurePossibilitiesAndPredictions: [
      {
        prediction: 'Permanent self-sustaining human research colonies established on the Moon (Artemis Base Camp) and Mars (Chryse Planitia).',
        timeframe: '2030 - 2045',
        uncertaintyLevel: 'Low',
        confidencePercent: 86,
      },
      {
        prediction: 'Direct robotic ice-penetrating melt-probe entry into Europa’s ocean discovering chemoautotrophic extraterrestrial life.',
        timeframe: '2038 - 2055',
        uncertaintyLevel: 'Medium',
        confidencePercent: 71,
      },
      {
        prediction: 'Deployment of laser-driven relativistic lightsail micro-probes (Breakthrough Starshot) traveling to Alpha Centauri at 20% speed of light.',
        timeframe: '2042 - 2060',
        uncertaintyLevel: 'High',
        confidencePercent: 62,
      },
    ],
    diagramLabels: [
      { label: 'Sun', description: 'Central G2V star anchoring 99.8% of mass', position: 'Center' },
      { label: 'Inner Planets', description: 'Mercury, Venus, Earth, Mars (Rocky)', position: 'Inner zone' },
      { label: 'Asteroid Belt', description: 'Millions of rock/metal remnants', position: 'Mid orbit' },
      { label: 'Gas Giants', description: 'Jupiter & Saturn (Hydrogen/Helium)', position: 'Outer zone' },
    ],
    suggested3DModel: 'solarsystem',
    curatedVisualKeywords: ['Solar System', 'Heliocentric Orbit', 'Planetary Mechanics', 'Sun Corona'],
    quickFacts: [
      'The Sun is so immense that 1.3 million Earths could fit inside it.',
      'A year on Neptune takes nearly 165 Earth years—it has completed only one full orbit since its discovery in 1846.',
      'Olympus Mons on Mars is the largest volcano in the Solar System, three times taller than Mount Everest.',
    ],
    references: [
      { sourceName: 'NASA Solar System Exploration Database', citation: 'Planetary Fact Sheets & Orbital Ephemerides', doiOrUrl: 'solarsystem.nasa.gov' },
      { sourceName: 'Carroll & Ostlie: An Introduction to Modern Astrophysics', citation: 'Celestial Mechanics & Planetary Systems, Part III', doiOrUrl: 'ISBN: 9781108422161' },
    ],
    safetyGuidanceOrDisclaimer: 'Astronomical Observation Safety: Never look directly at the Sun through optical binoculars or un-filtered telescopes without certified ISO 12312-2 solar filters to prevent permanent retinal blindness.',
  },

  'dna-helix': {
    topic: 'DNA Double Helix & Gene Expression',
    scientificName: 'Acidum desoxyribonucleinicum',
    commonName: 'DNA (Deoxyribonucleic Acid)',
    branch: 'Biology & Microbiology',
    tagline: 'The molecular software of terrestrial life, encoding billions of years of biological heritage.',
    summary: 'Deoxyribonucleic acid (DNA) is a polymer composed of two polynucleotide chains that coil around each other to form a double helix, carrying genetic instructions for the development, functioning, growth, and reproduction of all known organisms.',
    completeExplanation: 'DNA consists of repeating units called nucleotides, each comprising a deoxyribose five-carbon sugar, a phosphate group, and one of four nitrogenous bases: adenine (A), thymine (T), cytosine (C), and guanine (G). The chains are held together by complementary hydrogen bonding—adenine pairing exclusively with thymine via two hydrogen bonds, and cytosine pairing with guanine via three hydrogen bonds. Running in antiparallel directions (5\' to 3\' opposite 3\' to 5\'), the helical structure facilitates semi-conservative replication by DNA polymerase enzymes and serves as the template for transcription into messenger RNA (mRNA) and subsequent ribosomal translation into functional proteins.',
    taxonomy: {
      domain: 'Biomacromolecule',
      kingdom: 'Nucleic Acids',
      phylum: 'Polynucleotides',
      class: 'Genetic Material',
      order: 'Antiparallel Double Helix',
      family: 'Deoxyribose Polymers',
      genus: 'DNA',
      species: 'B-DNA (canonical physiological form)',
    },
    bodyStructuresAndFunctions: [
      {
        structure: 'Major and Minor Grooves',
        function: 'Helical surface indentations providing sequence-specific access for transcription factors and regulatory zinc-finger proteins.',
        clinicalOrPracticalNote: 'Chemotherapy agents such as cisplatin cross-link bases in these grooves to halt cancer division.',
      },
      {
        structure: 'Sugar-Phosphate Backbone',
        function: 'Phosphodiester linkages that provide structural tensile integrity and a negatively charged outer surface soluble in aqueous cytoplasm.',
        clinicalOrPracticalNote: 'Requires histone proteins to neutralize negative charges for dense chromatin compaction.',
      },
      {
        structure: 'Base Pairs (A-T & G-C)',
        function: 'Stores binary-like genetic code in triplets (codons) specifying the 20 universal standard amino acids.',
        clinicalOrPracticalNote: 'High GC content increases thermal stability and melting temperature due to three hydrogen bonds.',
      },
    ],
    internalExternalAnatomy: {
      externalFeatures: [
        'Helical pitch of 3.4 nanometers per 10.5 base pairs in canonical B-form',
        'Outer diameter of 2.0 nanometers',
        'Alternating major (2.2 nm) and minor (1.2 nm) external grooves',
      ],
      internalArchitecture: [
        'Hydrophobic base stacking interactions at core shielded from solvent',
        'Purine-pyrimidine hydrogen bonding geometry',
        'Major conformation variants: B-DNA (physiological), A-DNA (dehydrated), Z-DNA (left-handed)',
      ],
    },
    habitatAndDistribution: {
      primaryRegion: 'Cellular Nuclei and Mitochondria in Eukaryotes; Nucleoid in Prokaryotes',
      biomeOrEnvironment: 'Every living terrestrial organism, virus (DNA viruses), and fossilized remains under cold permafrost',
      distributionDetails: 'Present across the entirety of Earth’s biosphere from deep hydrothermal vent archaea to human cells.',
    },
    historyAndDevelopment: [
      {
        eraOrYear: '1869 CE',
        discoveryOrMilestone: 'Friedrich Miescher isolated a phosphorus-rich acidic substance from white blood cells, naming it "nuclein".',
        keyPioneers: 'Friedrich Miescher',
      },
      {
        eraOrYear: '1952 CE',
        discoveryOrMilestone: 'Rosalind Franklin and Raymond Gosling captured Photo 51 via X-ray crystallography, revealing the distinctive helical diffraction pattern.',
        keyPioneers: 'Rosalind Franklin & Raymond Gosling',
      },
      {
        eraOrYear: '1953 CE',
        discoveryOrMilestone: 'James Watson and Francis Crick deduced the double helix structure and base-pairing mechanism of DNA.',
        keyPioneers: 'James Watson & Francis Crick',
      },
      {
        eraOrYear: '2003 CE',
        discoveryOrMilestone: 'The Human Genome Project announced the completed sequencing of the 3-billion-base-pair human genome.',
        keyPioneers: 'International Human Genome Consortium',
      },
    ],
    importanceAndApplications: [
      'CRISPR-Cas9, prime editing, and base editing for targeted correction of monogenic inherited diseases (e.g. sickle cell disease).',
      'Forensic DNA profiling via short tandem repeat (STR) loci for criminal justice and ancestral genealogy.',
      'Recombinant biopharmaceuticals (synthetic human insulin, monoclonal antibodies, viral vector vaccines).',
      'DNA digital data storage: theoretical density of 215 petabytes per gram of synthetic DNA.',
    ],
    advantagesAndDisadvantages: {
      advantagesOrBenefits: [
        'Unmatched informational density: all knowledge ever produced by humanity could physically fit inside a teaspoon of DNA.',
        'High chemical stability compared to RNA: lack of 2\'-hydroxyl group makes deoxyribose far less prone to spontaneous alkaline hydrolysis.',
      ],
      disadvantagesOrRisks: [
        'Vulnerability to reactive oxygen species (ROS), ultraviolet thymine dimerization, and ionizing radiation causing double-strand breaks.',
        'Replication fidelity errors (1 in 10 billion bases) can initiate oncogenic mutations if DNA mismatch repair fails.',
      ],
    },
    relatedDiscoveriesAndResearch: [
      {
        title: 'Telomere-to-Telomere (T2T) Complete Human Genome',
        findings: 'Resolved final 8% of complex heterochromatic repeats, adding 200 million bases of novel sequence.',
        journalOrInstitution: 'Science / T2T Consortium',
      },
      {
        title: 'FDA Approval of Casgevy (Exa-cel) CRISPR Therapy',
        findings: 'First approved CRISPR-based therapeutic for sickle-cell disease correcting BCL11A enhancer.',
        journalOrInstitution: 'Vertex / CRISPR Therapeutics / New England Journal of Medicine',
      },
    ],
    futurePossibilitiesAndPredictions: [
      {
        prediction: 'Synthetic artificial mammalian genomes with expanded 6-base or 8-base (Hachimoji) genetic alphabets encoding synthetic proteins.',
        timeframe: '2028 - 2038',
        uncertaintyLevel: 'Medium',
        confidencePercent: 84,
      },
      {
        prediction: 'Epigenetic Yamanaka factor gene reprogramming reversing biological age and tissue damage in humans in vivo.',
        timeframe: '2032 - 2045',
        uncertaintyLevel: 'Medium',
        confidencePercent: 77,
      },
    ],
    diagramLabels: [
      { label: 'Sugar-Phosphate Backbone', description: 'Deoxyribose + phosphate linked by phosphodiester bonds', position: 'Outer Edge' },
      { label: 'Adenine-Thymine Pair', description: '2 hydrogen bonds connecting purine to pyrimidine', position: 'Inner Rung' },
      { label: 'Guanine-Cytosine Pair', description: '3 hydrogen bonds providing high thermal stability', position: 'Inner Rung' },
      { label: 'Major Groove', description: 'Wide regulatory protein binding pocket', position: 'Lateral indent' },
    ],
    suggested3DModel: 'dna',
    curatedVisualKeywords: ['Double Helix', 'Base Pairing', 'CRISPR Cas9', 'Nucleotide Sequence'],
    quickFacts: [
      'If you uncoiled all the DNA in your body and laid it end-to-end, it would stretch about 10 billion miles—from Earth to Pluto and back!',
      'Humans share roughly 99.9% of their DNA with every other human on Earth, and about 60% with a banana.',
      'DNA can survive for hundreds of thousands of years in frozen bone, allowing scientists to reconstruct Neanderthal genomes.',
    ],
    references: [
      { sourceName: 'Molecular Biology of the Cell, 7th Ed.', citation: 'Alberts, Heald, Johnson, Morgan', doiOrUrl: 'ISBN: 9780393884821' },
      { sourceName: 'Nature', citation: 'Molecular Structure of Nucleic Acids: A Structure for Deoxyribose Nucleic Acid (1953)', doiOrUrl: 'doi:10.1038/171737a0' },
    ],
    safetyGuidanceOrDisclaimer: 'Biosafety Reference: Genetic modification experiments must comply with NIH/WHO Dual-Use Research of Concern (DURC) guidelines and strict biosafety level protocols.',
  },

  'quantum-atom': {
    topic: 'Quantum Atom & Electron Orbitals',
    scientificName: 'Atomus quanticus',
    commonName: 'Quantum Atom',
    branch: 'Physics & Chemistry',
    tagline: 'The building block of all elements, governed by wavefunctions and quantum probability.',
    summary: 'The atom is the fundamental constituent unit of ordinary matter, consisting of a dense central nucleus of protons and neutrons surrounded by a cloud of negatively charged electrons inhabiting probabilistic quantum wavefunctions.',
    completeExplanation: 'Transitioning from the historic classical planetary model of Rutherford and Bohr to the modern quantum mechanical picture formulated by Schrödinger, Heisenberg, and Dirac, electrons do not follow circular tracks. Instead, they occupy atomic orbitals (s, p, d, f) defined by four quantum numbers: principal (n), angular momentum (l), magnetic (m), and spin (s). The Heisenberg Uncertainty Principle dictates that an electron’s exact position and momentum cannot be simultaneously measured, meaning orbitals represent three-dimensional probability density clouds (|Ψ|²) where electrons are most likely to be detected.',
    taxonomy: {
      domain: 'Subatomic Physics',
      kingdom: 'Standard Model of Particle Physics',
      phylum: 'Fermions and Bosons',
      class: 'Hadrons and Leptons',
      order: 'Atomic Nuclei and Electron Shells',
      family: 'Elements of the Periodic Table',
      genus: 'Nuclide',
      species: 'Isotope',
    },
    bodyStructuresAndFunctions: [
      {
        structure: 'Atomic Nucleus',
        function: 'Contains 99.94% of atomic mass confined within 10^-15 meters, held together by the strong nuclear force overcoming electrostatic proton repulsion.',
        clinicalOrPracticalNote: 'Nuclear fission and fusion release immense binding energy per nucleon.',
      },
      {
        structure: 'Electron Shells & Orbitals',
        function: 'Determine chemical valence, electronegativity, ionization energy, and molecular bonding behavior.',
        clinicalOrPracticalNote: 'Photon emission occurs when electrons jump down from excited states to lower energy levels (spectroscopy).',
      },
      {
        structure: 'Quarks & Gluons',
        function: 'Up and down quarks bound by gluon exchange forming the composite baryons (protons and neutrons).',
        clinicalOrPracticalNote: 'Confinement ensures isolated quarks are never observed free in nature.',
      },
    ],
    internalExternalAnatomy: {
      externalFeatures: [
        'Spherical s-orbitals, dumbbell-shaped p-orbitals, cloverleaf d-orbitals',
        'Atomic radius measured in Angstroms (10^-10 meters)',
        'Electron cloud shielding nuclear charge from neighboring atoms',
      ],
      internalArchitecture: [
        'Protons (charge +1e) and neutrons (charge 0) in the central core',
        'Pauli Exclusion Principle preventing identical quantum states',
        'Quantum spin states (+1/2 and -1/2)',
      ],
    },
    habitatAndDistribution: {
      primaryRegion: 'Everywhere in the Observable Universe',
      biomeOrEnvironment: 'Interstellar gas, stars, planets, and living cells',
      distributionDetails: 'Hydrogen and helium make up ~98% of all baryonic matter created during Big Bang nucleosynthesis.',
    },
    historyAndDevelopment: [
      {
        eraOrYear: 'c. 450 BCE',
        discoveryOrMilestone: 'Democritus proposed that all matter is composed of indivisible particles called "atomos".',
        keyPioneers: 'Democritus',
      },
      {
        eraOrYear: '1911 CE',
        discoveryOrMilestone: 'Ernest Rutherford’s gold foil experiment revealed the small, dense, positively charged nucleus.',
        keyPioneers: 'Ernest Rutherford',
      },
      {
        eraOrYear: '1926 CE',
        discoveryOrMilestone: 'Erwin Schrödinger formulated the wave equation Ψ, describing electrons as quantum probability waves.',
        keyPioneers: 'Erwin Schrödinger',
      },
      {
        eraOrYear: '2012 CE',
        discoveryOrMilestone: 'Discovery of the Higgs Boson at CERN’s Large Hadron Collider, confirming the mechanism that gives fundamental particles mass.',
        keyPioneers: 'ATLAS & CMS Collaborations / CERN',
      },
    ],
    importanceAndApplications: [
      'Semiconductor microelectronics, transistors, and modern computer processors.',
      'Magnetic Resonance Imaging (MRI) utilizing hydrogen nuclear spin precessions.',
      'Quantum computing utilizing superconducting transmon qubits and trapped-ion quantum states.',
      'Nuclear power generation, radiocarbon dating, and radiation cancer radiotherapy.',
    ],
    advantagesAndDisadvantages: {
      advantagesOrBenefits: [
        'Infinite chemical diversity: 118 elements combine into millions of distinct molecular structures and materials.',
        'Quantized energy states enable laser technology, atomic clocks, and precision satellite navigation.',
      ],
      disadvantagesOrRisks: [
        'Radioactive decay of unstable isotopes (alpha, beta, gamma emission) creates ionizing cellular damage and hazardous nuclear waste.',
      ],
    },
    relatedDiscoveriesAndResearch: [
      {
        title: 'Room-Temperature Superconductivity Search',
        findings: 'High-pressure hydride compounds exhibiting quantum electron pairing at record-high temperatures.',
        journalOrInstitution: 'Physical Review Letters / Nature',
      },
      {
        title: 'Optical Lattice Atomic Clocks',
        findings: 'Strontium clocks achieving precision of losing less than 1 second over 30 billion years.',
        journalOrInstitution: 'JILA / NIST',
      },
    ],
    futurePossibilitiesAndPredictions: [
      {
        prediction: 'Fault-tolerant quantum computers with 1 million logical qubits simulating complex molecular catalysts to solve nitrogen fixation.',
        timeframe: '2030 - 2040',
        uncertaintyLevel: 'Low',
        confidencePercent: 88,
      },
      {
        prediction: 'Commercial net-energy magnetic confinement nuclear fusion power plants feeding municipal electric grids.',
        timeframe: '2035 - 2048',
        uncertaintyLevel: 'Medium',
        confidencePercent: 79,
      },
    ],
    diagramLabels: [
      { label: 'Nucleus', description: 'Protons + Neutrons bound by strong force', position: 'Center' },
      { label: '1s Orbital', description: 'Innermost spherical lowest energy state', position: 'Inner sphere' },
      { label: '2p Orbitals', description: 'Dumbbell-shaped probability clouds along X, Y, Z axes', position: 'Outer lobes' },
      { label: 'Valence Electron', description: 'Outermost electron participating in chemical bonding', position: 'Perimeter' },
    ],
    suggested3DModel: 'atom',
    curatedVisualKeywords: ['Quantum Mechanics', 'Bohr Model', 'Electron Cloud', 'Nuclear Force'],
    quickFacts: [
      'An atom is more than 99.9999999% empty space; if the nucleus were the size of a marble, the electron cloud would be the size of a football stadium.',
      'Every hydrogen atom in your body was forged during the Big Bang 13.8 billion years ago.',
      'All carbon, oxygen, and iron atoms inside you were forged in the thermonuclear cores of dying giant stars.',
    ],
    references: [
      { sourceName: 'Griffiths: Introduction to Quantum Mechanics, 3rd Ed.', citation: 'The Hydrogen Atom & Angular Momentum', doiOrUrl: 'ISBN: 9781107189638' },
      { sourceName: 'The Feynman Lectures on Physics, Vol III', citation: 'Quantum Behavior & Atomic Shells', doiOrUrl: 'feynmanlectures.caltech.edu' },
    ],
    safetyGuidanceOrDisclaimer: 'Radiation Safety: Radioisotopes emitting ionizing radiation require certified lead shielding, dosimetry badges, and strict ALARA (As Low As Reasonably Achievable) adherence.',
  },

  'plant-cell': {
    topic: 'Botanical Plant Cell & Chloroplasts',
    scientificName: 'Cellula plantarum',
    commonName: 'Plant Cell',
    branch: 'Plants & Botany',
    tagline: 'The microscopic green solar factories converting sunlight into chemical energy and atmospheric oxygen.',
    summary: 'Plant cells are eukaryotic cells distinguished by rigid cellulose cell walls, large central vacuoles maintaining turgor pressure, and chloroplasts capable of photosynthesis, forming the primary trophic base of terrestrial food webs.',
    completeExplanation: 'Unlike animal cells, plant cells possess specialized organelles tailored for sessile life and autotrophic nutrition. The chloroplast contains thylakoid membranes embedded with chlorophyll pigments that absorb blue and red photons, splitting water molecules (photolysis) to release molecular oxygen (O2) and generate ATP and NADPH. These chemical carriers power the light-independent Calvin cycle in the stroma to fix atmospheric carbon dioxide (CO2) into glucose. The rigid primary and secondary cell walls composed of cellulose microfibrils and lignin provide structural tensile strength, allowing vascular trees to grow over 100 meters high against gravity.',
    taxonomy: {
      domain: 'Eukaryota',
      kingdom: 'Plantae',
      phylum: 'Tracheophyta',
      class: 'Magnoliopsida',
      order: 'Viridiplantae',
      family: 'Embryophyta',
      genus: 'Cellula',
      species: 'Cellula plantarum',
    },
    bodyStructuresAndFunctions: [
      {
        structure: 'Chloroplasts & Thylakoids',
        function: 'Harvests solar photons to execute photosynthetic water-splitting and carbon fixation, synthesizing glucose and oxygen.',
        clinicalOrPracticalNote: 'Endosymbiotic origin from ancient cyanobacteria engulfed over 1.5 billion years ago.',
      },
      {
        structure: 'Central Vacuole',
        function: 'Occupies up to 90% of cellular volume, storing water, ions, and waste, creating hydrostatic turgor pressure against the cell wall.',
        clinicalOrPracticalNote: 'Loss of turgor pressure results in noticeable plant wilting.',
      },
      {
        structure: 'Cellulose Cell Wall',
        function: 'Provides mechanical tensile strength, prevents osmotic lysis, and shields from fungal pathogens.',
        clinicalOrPracticalNote: 'Primary component of dietary fiber, wood, cotton, and paper.',
      },
      {
        structure: 'Plasmodesmata',
        function: 'Microscopic cytoplasmic tunnels bridging adjacent cells, allowing symplastic nutrient and hormone signaling across tissues.',
        clinicalOrPracticalNote: 'Can be exploited by plant viruses to spread systemically.',
      },
    ],
    internalExternalAnatomy: {
      externalFeatures: [
        'Rigid polyhedral polygonal cell wall',
        'Middle lamella rich in pectins adhering adjacent cells',
        'Pores containing plasmodesmata cytoplasmic bridges',
      ],
      internalArchitecture: [
        'Endomembrane system: rough and smooth endoplasmic reticulum, Golgi dictyosomes',
        'Thylakoid grana stacks suspended in chloroplast stroma',
        'Large central vacuole bound by tonoplast membrane',
        'Nucleus with prominent nucleolus synthesizing ribosomal RNA',
      ],
    },
    habitatAndDistribution: {
      primaryRegion: 'Global Terrestrial and Freshwater Ecosystems',
      biomeOrEnvironment: 'Present across all photosynthetic plant tissues (leaves, stems, roots)',
      distributionDetails: 'Ubiquitous across Earth’s biosphere from Arctic tundra mosses to tropical Amazonian rainforest canopies.',
    },
    historyAndDevelopment: [
      {
        eraOrYear: '1665 CE',
        discoveryOrMilestone: 'Robert Hooke observed cork tissue under a compound microscope, coining the term "cell".',
        keyPioneers: 'Robert Hooke',
      },
      {
        eraOrYear: '1838 CE',
        discoveryOrMilestone: 'Matthias Schleiden formulated the foundational cell theory: all plants are composed of cells.',
        keyPioneers: 'Matthias Schleiden',
      },
      {
        eraOrYear: '1945 CE',
        discoveryOrMilestone: 'Melvin Calvin used carbon-14 isotopes to trace the biochemical pathway of carbon fixation (Calvin Cycle).',
        keyPioneers: 'Melvin Calvin & Andrew Benson',
      },
    ],
    importanceAndApplications: [
      'Origin of all human food calories (direct agricultural crops and livestock feed).',
      'Atmospheric oxygen generation and carbon dioxide sequestration mitigating climate change.',
      'Plant metabolic engineering producing pharmaceuticals, vaccines, and bio-plastics.',
      'Cellulose biomaterials, timber construction, paper manufacturing, and biofuel production.',
    ],
    advantagesAndDisadvantages: {
      advantagesOrBenefits: [
        'Self-sustaining autotrophic nutrition requiring only sunlight, ambient air, and mineralized water.',
        'Cell wall turgidity enables immense structural heights without heavy internal skeletons.',
      ],
      disadvantagesOrRisks: [
        'Sessile immobility makes plant cells unable to escape environmental stressors (drought, salinity, frost, herbivore predation).',
        'Rubisco enzyme inefficiency: frequently binds oxygen instead of carbon dioxide (photorespiration), wasting up to 25% of energy in C3 plants.',
      ],
    },
    relatedDiscoveriesAndResearch: [
      {
        title: 'C4 Rice Engineering Consortium',
        findings: 'Introducing C4 photosynthetic enzymes into C3 rice to boost crop yields by 50% and double water efficiency.',
        journalOrInstitution: 'International Rice Research Institute (IRRI) / Science',
      },
      {
        title: 'Chloroplast Genome Transformation (Transplastomics)',
        findings: 'High-level expression of therapeutic human serum proteins inside tobacco chloroplasts with zero pollen outcrossing risk.',
        journalOrInstitution: 'Nature Plants / Max Planck Institute',
      },
    ],
    futurePossibilitiesAndPredictions: [
      {
        prediction: 'Engineered synthetic RuBisCO variants with 3x catalytic turnover, dramatically accelerating carbon drawdown from the atmosphere.',
        timeframe: '2029 - 2038',
        uncertaintyLevel: 'Low',
        confidencePercent: 85,
      },
      {
        prediction: 'Bioluminescent plant trees engineered with fungal luciferase genes providing off-grid urban street illumination.',
        timeframe: '2030 - 2040',
        uncertaintyLevel: 'Medium',
        confidencePercent: 73,
      },
    ],
    diagramLabels: [
      { label: 'Cell Wall', description: 'Cellulose structural matrix with pectin middle lamella', position: 'Perimeter' },
      { label: 'Chloroplast', description: 'Thylakoid stacks performing photosynthetic water splitting', position: 'Mid-cytoplasm' },
      { label: 'Central Vacuole', description: 'Large fluid reservoir maintaining turgor pressure', position: 'Center' },
      { label: 'Nucleus', description: 'Chromatin and nucleolus coordinating plant development', position: 'Lateral interior' },
    ],
    suggested3DModel: 'plantcell',
    curatedVisualKeywords: ['Photosynthesis', 'Chloroplast', 'Cell Wall', 'Plant Biology'],
    quickFacts: [
      'Photosynthesis by plants and marine cyanobacteria produces over 150 billion tons of biomass every single year.',
      'The largest living plant is a seagrass meadow (Posidonia australis) in Australia spanning over 180 square kilometers from a single cloned seed.',
      'Some redwoods have lived for over 2,000 years, sustained by cells dividing continuously in their vascular cambium.',
    ],
    references: [
      { sourceName: 'Taiz and Zeiger: Plant Physiology and Development, 7th Ed.', citation: 'Photosynthesis: Light Reactions & Carbon Assimilation', doiOrUrl: 'ISBN: 9780197614198' },
      { sourceName: 'Cell', citation: 'Engineering Photosynthesis for Enhanced Crop Productivity in a Changing Climate', doiOrUrl: 'doi:10.1016/j.cell.2021.05.008' },
    ],
  },
};
