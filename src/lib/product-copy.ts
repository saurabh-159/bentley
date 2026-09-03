import { categoryMeta, type CatalogProduct } from "./catalog";

export type ProductBenefit = {
  title: string;
  body: string;
};

export type ProductCapability = {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
};

export type ProductTechnicalGroup = {
  title: string;
  items: string[];
};

export type ProductFaq = {
  question: string;
  answer: string;
};

export type ProductPageContent = {
  overviewTitle: string;
  overviewBody: string;
  benefits: ProductBenefit[];
  capabilities: ProductCapability[];
  technical: ProductTechnicalGroup[];
  faqs: ProductFaq[];
};

type ProductExtra = {
  overviewTitle: string;
  overviewBody: string;
  benefits: ProductBenefit[];
  capabilities: { title: string; body: string }[];
};

const capabilityImages: Record<CatalogProduct["category"], string[]> = {
  "Structural analysis and detailing": [
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1600&q=80",
  ],
  "Civil and transportation": [
    "https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80",
  ],
  "Water and construction": [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80",
  ],
  "CAD and MEP": [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=80",
  ],
};

const extras: Record<string, ProductExtra> = {
  "bentley-systems": {
    overviewTitle: "Infrastructure engineering on one connected platform",
    overviewBody:
      "Bentley Systems is infrastructure engineering, asset management and digital project delivery technology. From structural analysis and civil design through construction sequencing, it is the foundation Synergic licences and supports for infrastructure teams in India.",
    benefits: [
      {
        title: "Infrastructure engineering",
        body: "Design and analyse roads, rail, buildings, water networks, and industrial assets with applications used on live infrastructure programmes.",
      },
      {
        title: "Asset management",
        body: "Keep models, drawings, and asset data in the same digital thread so owners and consultants can operate what they designed.",
      },
      {
        title: "Digital project delivery",
        body: "Move from survey and analysis to construction-ready deliverables without rebuilding the project in a second system.",
      },
    ],
    capabilities: [
      {
        title: "Civil, structural, and water in one stack",
        body: "OpenRoads, STAAD.Pro, WaterGEMS, and related applications cover the disciplines infrastructure offices actually run.",
      },
      {
        title: "From design into construction",
        body: "SYNCHRO and connected BIM workflows take the model from the design office onto the programme and the site.",
      },
      {
        title: "Digital twins for operating assets",
        body: "Asset management tools keep the as-built record useful after handover, not only during design.",
      },
      {
        title: "Licensed in India through Synergic",
        body: "Bentley Systems through Synergic with Indian commercial terms, onboarding, and a team that knows the AEC workflow.",
      },
    ],
  },
  "staad-pro": {
    overviewTitle: "3D structural analysis that teams trust on live projects",
    overviewBody:
      "STAAD.Pro helps structural engineers analyse and design steel, concrete, timber, and aluminium frames with a proven finite-element engine. From high-rise towers to industrial plants, it turns complex loading into code-checked members — licensed and supported in India through Synergic.",
    benefits: [
      {
        title: "Faster, better design decisions",
        body: "Run physical member modelling, load combinations, and code checks in one environment so the design office can move from analysis to drawings without switching tools.",
      },
      {
        title: "Proven on complex frames",
        body: "Steel, concrete, timber, and mixed structures — including towers, industrial frames, and building skeletons used across Indian infrastructure programmes.",
      },
      {
        title: "Connected structural workflow",
        body: "Interoperate with AutoPIPE, RAM, and OpenBuildings so analysis results stay in the same digital thread as the rest of the project.",
      },
    ],
    capabilities: [
      {
        title: "Model, analyse, and design in 3D",
        body: "Build physical members, apply gravity, wind, and seismic loads, and review displacements, forces, and utilisation in a single model.",
      },
      {
        title: "Code-checked member design",
        body: "Check steel, concrete, and timber against the design codes your office uses, then iterate until utilisation and detailing line up.",
      },
      {
        title: "Share results across the suite",
        body: "Pass reactions, geometry, and analysis results to foundation, piping, and documentation tools without rebuilding the model.",
      },
      {
        title: "Local licence and support",
        body: "Get STAAD.Pro through Synergic with Indian commercial terms, onboarding, and a team that knows the AEC workflow.",
      },
    ],
  },
  "staad-pro-advanced": {
    overviewTitle: "Nonlinear and buckling analysis for demanding structures",
    overviewBody:
      "STAAD.Pro Advanced extends the core engine with geometric and material nonlinearity, buckling, cables, and time-history workflows. Use it when linear analysis is not enough — towers, industrial frames, and long-span systems that need a closer look.",
    benefits: [
      {
        title: "See behaviour beyond linear",
        body: "Capture large-displacement, buckling, and nonlinear material response so the model matches how the structure actually behaves under load.",
      },
      {
        title: "Dynamic and seismic insight",
        body: "Time-history and response-spectrum workflows help teams evaluate performance under wind, blast, and earthquake loading.",
      },
      {
        title: "Built for industrial and high-rise work",
        body: "A practical next step when STAAD.Pro is already on the desk and the next project is more demanding.",
      },
    ],
    capabilities: [
      {
        title: "Nonlinear static and buckling analysis",
        body: "Investigate geometric and material nonlinearity, cable behaviour, and buckling modes before they become site surprises.",
      },
      {
        title: "Time-history and spectrum workflows",
        body: "Evaluate dynamic response with the same model your team already uses for static design.",
      },
      {
        title: "Stay inside the STAAD family",
        body: "Add Advanced without changing file formats, training culture, or how drawings are produced.",
      },
      {
        title: "Supported in India",
        body: "Licensed through Synergic so advanced analysis sits next to the rest of your Bentley structural stack.",
      },
    ],
  },
  "structural-worksuite": {
    overviewTitle: "A complete structural toolkit on one licence",
    overviewBody:
      "Structural WorkSuite bundles analysis, design, and documentation so offices do not juggle separate products for STAAD, RAM, and drawing production. One licence, shared models, and a clearer path from analysis to issued drawings.",
    benefits: [
      {
        title: "More software, one commercial conversation",
        body: "Cover analysis, design, and documentation without stacking individual licences for every tool the team needs this quarter.",
      },
      {
        title: "Shared models across the office",
        body: "Move geometry and results between analysis and drawing production instead of rebuilding the same frame in two applications.",
      },
      {
        title: "Best value for multi-discipline teams",
        body: "A practical bundle for growing structural offices that already mix steel, concrete, and building work.",
      },
    ],
    capabilities: [
      {
        title: "STAAD, RAM, and documentation together",
        body: "Keep analysis and drawing production in one suite so the design office stays coordinated.",
      },
      {
        title: "From model to issued drawings",
        body: "Reduce hand-offs between analysis engineers and detailing teams with shared project data.",
      },
      {
        title: "Scale as the office grows",
        body: "Add seats and workflows without renegotiating a different product for every new hire.",
      },
      {
        title: "Licensed through Synergic",
        body: "Indian commercial terms, local onboarding, and a partner who already supports your Bentley stack.",
      },
    ],
  },
  "staad-foundation-advanced": {
    overviewTitle: "Foundation analysis and drawings from the superstructure model",
    overviewBody:
      "STAAD Foundation Advanced designs isolated, combined, pile, and mat foundations with code checking and production-ready drawings. Import reactions from STAAD.Pro and keep plant, building, and tower foundations in one place.",
    benefits: [
      {
        title: "Foundations that follow the analysis",
        body: "Bring reactions straight from STAAD.Pro so foundation loads stay consistent with the superstructure model.",
      },
      {
        title: "Plant, building, and tower types",
        body: "Cover isolated, combined, pile, and mat foundations without a separate tool for each typology.",
      },
      {
        title: "Drawings and calculation reports",
        body: "Produce documentation the site and the checker can use, not just a screen of utilisation ratios.",
      },
    ],
    capabilities: [
      {
        title: "Import STAAD.Pro reactions",
        body: "Skip re-entering column loads. Bring analysis results into the foundation model and iterate as the frame changes.",
      },
      {
        title: "Design the foundation types you actually build",
        body: "Isolated, combined, pile, and mat foundations with code checking for plant, building, and tower work.",
      },
      {
        title: "Automated drawings and reports",
        body: "Generate production drawings and calculation output for tenders, checkers, and construction teams.",
      },
      {
        title: "Local licence and support",
        body: "Get Foundation Advanced with the rest of your STAAD stack through Synergic.",
      },
    ],
  },
  "openroads-designer": {
    overviewTitle: "End-to-end corridor modelling for highways and streets",
    overviewBody:
      "OpenRoads Designer takes road projects from survey through construction-ready plans. Live 3D corridor modelling, drainage, and quantities help civil teams deliver BIM-ready highways, urban streets, and sites across India.",
    benefits: [
      {
        title: "Live 3D corridor design",
        body: "Geometry, templates, and terrain stay connected so a change in alignment updates sections, volumes, and plans.",
      },
      {
        title: "Survey to construction in one model",
        body: "Bring survey, drainage, and quantity workflows into the same environment instead of stitching CAD files at the end.",
      },
      {
        title: "BIM-ready Indian road projects",
        body: "Produce deliverables that owners, contractors, and reviewers can use on highway and municipal programmes.",
      },
    ],
    capabilities: [
      {
        title: "Corridor modelling with live geometry",
        body: "Design alignments, profiles, and templates that update the 3D corridor as the design evolves.",
      },
      {
        title: "Survey, drainage, and quantities",
        body: "Keep terrain, drainage networks, and earthwork volumes in the same civil model.",
      },
      {
        title: "Construction-ready plans",
        body: "Issue sections, plans, and BIM deliverables without rebuilding the corridor in a second tool.",
      },
      {
        title: "Licensed for Indian civil offices",
        body: "OpenRoads through Synergic, with support that understands highway and urban street practice in India.",
      },
    ],
  },
  "openrail-designer": {
    overviewTitle: "BIM-ready railway corridors for metro and mainline",
    overviewBody:
      "OpenRail Designer is built for track, overhead line, and rail corridor geometry. Use it on metro, mainline, and high-speed work — with the same civil environment as OpenRoads and OpenBridge.",
    benefits: [
      {
        title: "Rail geometry without a general CAD workaround",
        body: "Track geometry, cant, and turnouts are first-class tools, not a road template stretched to look like rail.",
      },
      {
        title: "Connected civil corridor",
        body: "Work with OpenRoads and OpenBridge so road, rail, and structures share alignments and terrain.",
      },
      {
        title: "Metro and mainline ready",
        body: "A fit for the programmes Indian rail and metro teams are delivering now.",
      },
    ],
    capabilities: [
      {
        title: "Track, cant, and turnout design",
        body: "Lay out geometry to rail standards and keep the 3D corridor in sync as the alignment changes.",
      },
      {
        title: "Overhead line and corridor modelling",
        body: "Coordinate OLE and corridor elements with the same terrain and alignment data.",
      },
      {
        title: "Integrate with OpenRoads and OpenBridge",
        body: "Share alignments, surfaces, and structures across the civil suite.",
      },
      {
        title: "Supported through Synergic",
        body: "Licence OpenRail in India with a partner already on your civil desk.",
      },
    ],
  },
  "openbridge-designer": {
    overviewTitle: "Bridge modelling, analysis, and drawings in the civil workflow",
    overviewBody:
      "OpenBridge Designer lets teams model, analyse, and document bridges alongside the road or rail corridor. Parametric superstructure and substructure keep the bridge in the same digital environment as the alignment.",
    benefits: [
      {
        title: "Bridges that follow the alignment",
        body: "Work with OpenRoads and OpenRail alignments so the bridge is not a disconnected CAD file.",
      },
      {
        title: "Parametric structure and analysis",
        body: "Model superstructure and substructure, then analyse and produce drawings without leaving the environment.",
      },
      {
        title: "One civil conversation",
        body: "Road, rail, and bridge teams can share geometry instead of trading 2D sheets late in the job.",
      },
    ],
    capabilities: [
      {
        title: "Parametric superstructure and substructure",
        body: "Build the bridge from the alignment and keep members parametric as geometry changes.",
      },
      {
        title: "Analysis and drawing production",
        body: "Analyse and document in the same environment the civil team already uses.",
      },
      {
        title: "Corridor-aware bridge design",
        body: "Stay connected to OpenRoads and OpenRail so the structure sits correctly on the alignment.",
      },
      {
        title: "Licensed in India",
        body: "OpenBridge through Synergic for transportation and structural offices.",
      },
    ],
  },
  "civil-worksuite": {
    overviewTitle: "Civil design applications together on one licence",
    overviewBody:
      "Civil WorkSuite bundles Bentley civil tools so road, site, and drainage teams can share survey and terrain data without buying every application separately. A practical suite for growing consultancies.",
    benefits: [
      {
        title: "Several civil tools, one licence",
        body: "Cover OpenRoads and related civil applications without a separate commercial path for each seat of each product.",
      },
      {
        title: "Shared survey and terrain",
        body: "Keep the same surfaces and survey data across road, site, and drainage workflows.",
      },
      {
        title: "Made for growing civil offices",
        body: "Add capability as the practice expands instead of rebuilding the software stack every year.",
      },
    ],
    capabilities: [
      {
        title: "OpenRoads and related civil tools",
        body: "Give the office a civil bundle that covers the work that actually comes through the door.",
      },
      {
        title: "Shared project data",
        body: "Survey, terrain, and corridor data stay available across the suite.",
      },
      {
        title: "One partner for the civil stack",
        body: "Licence, onboard, and support through Synergic instead of juggling vendors.",
      },
      {
        title: "Indian commercial terms",
        body: "A suite conversation that matches how consultancies actually buy software in India.",
      },
    ],
  },
  plateia: {
    overviewTitle: "Road design on a CAD platform your team already knows",
    overviewBody:
      "Plateia brings professional alignments, corridors, and quantities to a CAD-familiar interface. A strong fit for highway and municipal offices that want civil tools without a full platform change.",
    benefits: [
      {
        title: "Alignment, profile, and sections",
        body: "Design roads with the geometry tools highway and municipal teams expect, on a CAD-familiar desktop.",
      },
      {
        title: "Quantities for tenders",
        body: "Take-off and reporting sit next to the design so estimates stay tied to the model.",
      },
      {
        title: "Lower change-management cost",
        body: "A practical step for offices that live in CAD and need dedicated road tools.",
      },
    ],
    capabilities: [
      {
        title: "Corridor and cross-section tools",
        body: "Build alignments, profiles, and sections without leaving a CAD-like environment.",
      },
      {
        title: "Quantity take-off and reporting",
        body: "Produce volumes and reports for tender and construction packages.",
      },
      {
        title: "Familiar CAD interface",
        body: "Reduce training time for teams that already draft in DWG-centric offices.",
      },
      {
        title: "Licensed through Synergic",
        body: "Plateia with Indian support alongside the rest of your civil software.",
      },
    ],
  },
  ferrovia: {
    overviewTitle: "Railway geometry for metro, stations, and mainline corridors",
    overviewBody:
      "Ferrovia is specialised rail design for track geometry, stations, and corridor modelling. It complements OpenRail on mixed fleets and is a focused tool when the job is rail-first.",
    benefits: [
      {
        title: "Track and station geometry",
        body: "Lay out rail alignments and station geometry with tools built for rail, not adapted from highways.",
      },
      {
        title: "Corridor modelling for rail",
        body: "Keep the 3D corridor tied to track geometry as the design develops.",
      },
      {
        title: "Works beside OpenRail",
        body: "A practical option when the office mixes dedicated rail tools with the wider Bentley civil suite.",
      },
    ],
    capabilities: [
      {
        title: "Track layout to rail standards",
        body: "Design geometry for metro and mainline work with dedicated rail tools.",
      },
      {
        title: "Station and corridor modelling",
        body: "Coordinate station geometry with the corridor as both evolve.",
      },
      {
        title: "Complement OpenRail on mixed fleets",
        body: "Use Ferrovia where it fits and stay connected to the rest of the civil stack.",
      },
      {
        title: "Supported in India",
        body: "Licence Ferrovia through Synergic with the same partner as your other Bentley civil products.",
      },
    ],
  },
  watergems: {
    overviewTitle: "Water distribution analysis for utilities and campuses",
    overviewBody:
      "WaterGEMS models potable water networks for pressure, demand, quality, and operations. From city utilities to industrial campuses, it helps teams design, operate, and optimise networks with GIS and CAD interoperability.",
    benefits: [
      {
        title: "See pressure, demand, and quality",
        body: "Steady-state and extended-period simulation so operators and designers can test the network before it fails in the field.",
      },
      {
        title: "Optimise pumps, tanks, and valves",
        body: "Tune operations and capital works with a model that reflects how the system actually runs.",
      },
      {
        title: "GIS and CAD interoperability",
        body: "Bring network data from the systems the utility already uses, then send results back out.",
      },
    ],
    capabilities: [
      {
        title: "Steady-state and EPS modelling",
        body: "Analyse the network through a day, a week, or a design horizon — not just a single snapshot.",
      },
      {
        title: "Pump, tank, and valve optimisation",
        body: "Test operating strategies and capital options against pressure and demand targets.",
      },
      {
        title: "Connect GIS and CAD data",
        body: "Keep the hydraulic model aligned with the utility's maps and drawings.",
      },
      {
        title: "Licensed and supported in India",
        body: "WaterGEMS through Synergic for municipal, industrial, and consultant teams.",
      },
    ],
  },
  urbano: {
    overviewTitle: "Pipe networks for water, sewer, and storm on real terrain",
    overviewBody:
      "Urbano designs water, sewer, and storm networks with terrain-aware layouts for municipal and land-development projects. Quantities for tender and construction sit next to the design.",
    benefits: [
      {
        title: "Three networks, one design environment",
        body: "Water, sewer, and storm layouts without a separate product for each utility.",
      },
      {
        title: "Terrain-aware pipe design",
        body: "Alignments follow the ground so cover, invert, and clashes are visible early.",
      },
      {
        title: "Quantities the estimator can use",
        body: "Tender and construction quantities stay tied to the network model.",
      },
    ],
    capabilities: [
      {
        title: "Water, sewer, and storm layouts",
        body: "Design urban networks with tools that understand each system, not a generic CAD polyline.",
      },
      {
        title: "Terrain and alignment-driven design",
        body: "Keep pipes on the terrain and alignments as the site grading changes.",
      },
      {
        title: "Quantities for tender and construction",
        body: "Produce lengths, fittings, and earthwork that the commercial team can price.",
      },
      {
        title: "Local licence through Synergic",
        body: "Urbano with Indian support for municipal and land-development offices.",
      },
    ],
  },
  synchro: {
    overviewTitle: "4D construction planning that links the model to the programme",
    overviewBody:
      "SYNCHRO connects 3D models to the construction programme so teams can sequence work, spot clashes in time, and communicate the build. Look-ahead planning for the site, clear visuals for owners and contractors.",
    benefits: [
      {
        title: "See the build before it happens",
        body: "Link model objects to Gantt data so sequence, access, and temporary works are visible in 4D — not only on a bar chart.",
      },
      {
        title: "Look-ahead the site can use",
        body: "Give supervisors a visual plan for the next weeks instead of a spreadsheet they will not open.",
      },
      {
        title: "One story for owner and contractor",
        body: "Communicate progress and remaining work with visuals that non-planners can follow.",
      },
    ],
    capabilities: [
      {
        title: "4D from 3D models and Gantt data",
        body: "Bring BIM and the programme together so time and geometry stay in the same conversation.",
      },
      {
        title: "Look-ahead planning for site teams",
        body: "Sequence work, crane positions, and access with a model the site can actually watch.",
      },
      {
        title: "Clear visuals for reviews",
        body: "Show owners and contractors what happens next without translating a 2,000-line programme.",
      },
      {
        title: "Licensed in India through Synergic",
        body: "SYNCHRO with local commercial terms and a partner who supports construction teams.",
      },
    ],
  },
  "bricscad-pro": {
    overviewTitle: "Professional CAD and design for modern engineering workflows",
    overviewBody:
      "BricsCAD is professional CAD and design technology for modern engineering workflows. A DWG-native platform for 2D drafting, 3D modelling, and BIM production — familiar commands without being trapped on a single vendor's licence path.",
    benefits: [
      {
        title: "Full DWG compatibility",
        body: "Open, edit, and issue DWG files with a command line and ribbon your drafters already understand.",
      },
      {
        title: "2D drafting plus 3D solids",
        body: "Move from production drawings to 3D modelling in the same licence when the project needs it.",
      },
      {
        title: "Perpetual and subscription options",
        body: "Choose a commercial model that fits the office instead of a one-size licence.",
      },
    ],
    capabilities: [
      {
        title: "Native DWG production",
        body: "Keep the DWG workflow your consultants, clients, and contractors already exchange.",
      },
      {
        title: "3D solid modelling when you need it",
        body: "Draft in 2D and model in 3D without buying a second CAD platform.",
      },
      {
        title: "Familiar interface, lower lock-in",
        body: "A practical alternative for teams that want CAD they control.",
      },
      {
        title: "Licensed through Synergic",
        body: "BricsCAD with Indian terms, training, and a partner on call.",
      },
    ],
  },
  "bricscad-lite": {
    overviewTitle: "Fast, familiar 2D CAD for production drafting",
    overviewBody:
      "BricsCAD Lite is a lightweight DWG editor for offices that need reliable 2D CAD at a lower licence cost. Familiar commands, a real command line, and a practical step up from basic CAD.",
    benefits: [
      {
        title: "2D drafting in native DWG",
        body: "Produce and mark up drawings in the format the rest of the industry already uses.",
      },
      {
        title: "Familiar command line and ribbon",
        body: "Shorter training for drafters coming from other DWG editors.",
      },
      {
        title: "A practical cost step",
        body: "Give production seats a capable 2D tool without paying for 3D they will not use.",
      },
    ],
    capabilities: [
      {
        title: "Production 2D CAD",
        body: "Draft, annotate, and issue DWG drawings at production speed.",
      },
      {
        title: "Familiar drafting environment",
        body: "Command line, ribbon, and DWG habits your team already has.",
      },
      {
        title: "Right-sized for 2D seats",
        body: "Keep 3D licences for the people who need them; Lite for everyone else.",
      },
      {
        title: "Supported in India",
        body: "BricsCAD Lite through Synergic with the same partner as Pro.",
      },
    ],
  },
  gstarcad: {
    overviewTitle: "DWG-based CAD for architecture, engineering and design",
    overviewBody:
      "GstarCAD is a DWG-based CAD solution for architecture, engineering and design organizations. Dependable production drafting at scale — everyday drawings without inflating the licence bill.",
    benefits: [
      {
        title: "DWG for everyday production",
        body: "Open and issue drawings that consultants and contractors can use without translation drama.",
      },
      {
        title: "2D first, 3D when required",
        body: "Draft at volume, with optional 3D tools for the seats that need them.",
      },
      {
        title: "Licensed for Indian design offices",
        body: "A commercial fit for teams that need many seats of reliable CAD.",
      },
    ],
    capabilities: [
      {
        title: "DWG-compatible production CAD",
        body: "Keep the file format your projects already run on.",
      },
      {
        title: "2D drafting with optional 3D",
        body: "Scale from drafting-only seats to mixed 2D/3D without changing vendors.",
      },
      {
        title: "Built for volume drafting",
        body: "A practical choice when the office is measured in drawings issued, not licences held.",
      },
      {
        title: "Local partner support",
        body: "GstarCAD through Synergic for architecture and engineering offices in India.",
      },
    ],
  },
  "ax3000-mep": {
    overviewTitle: "MEP design and building services in one engineering workflow",
    overviewBody:
      "AX3000 MEP is engineering software for MEP design and building services workflows. HVAC, electrical, and plumbing with energy analysis and visualisation — built for teams that need calculations and coordination, not only 3D geometry.",
    benefits: [
      {
        title: "HVAC, electrical, and plumbing",
        body: "Design the services in one environment instead of three disconnected tools.",
      },
      {
        title: "Energy and load calculations",
        body: "Size systems with analysis next to the model so the drawing matches the calc.",
      },
      {
        title: "Coordination you can walk through",
        body: "VR walkthroughs help teams review services before they clash on site.",
      },
    ],
    capabilities: [
      {
        title: "MEP design for building services",
        body: "Model HVAC, electrical, and plumbing with tools aimed at services engineers.",
      },
      {
        title: "Energy and load workflows",
        body: "Run calculations in the same environment as the layout.",
      },
      {
        title: "VR walkthroughs for reviews",
        body: "Take owners and contractors through the services model before construction.",
      },
      {
        title: "Licensed through Synergic",
        body: "AX3000 MEP with Indian commercial terms and a partner who supports CAD and MEP desks.",
      },
    ],
  },
};

function fallbackExtra(product: CatalogProduct): ProductExtra {
  return {
    overviewTitle: product.line,
    overviewBody: product.description,
    benefits: product.highlights.slice(0, 3).map((item) => ({
      title: item.split(/[,—–]/)[0]?.trim() || item,
      body: item,
    })),
    capabilities: [
      ...product.highlights.slice(0, 3).map((item) => ({
        title: item.split(/[,—–]/)[0]?.trim() || item,
        body: item,
      })),
      {
        title: "Licensed and supported in India",
        body: `${product.name} is available through Synergic with local commercial terms and a team that knows the AEC workflow.`,
      },
    ],
  };
}

export function getProductPageContent(product: CatalogProduct): ProductPageContent {
  const extra = extras[product.slug] ?? fallbackExtra(product);
  const images = [
    product.image,
    product.hoverImage,
    ...(capabilityImages[product.category] ?? []),
    categoryMeta[product.category].image,
  ];
  const uniqueImages = [...new Set(images)];

  const capabilities: ProductCapability[] = extra.capabilities.slice(0, 4).map((item, index) => ({
    ...item,
    image: uniqueImages[index] ?? product.image,
    imageAlt: product.imageAlt,
  }));

  return {
    overviewTitle: extra.overviewTitle,
    overviewBody: extra.overviewBody,
    benefits: extra.benefits.slice(0, 3),
    capabilities,
    technical: [
      {
        title: "Workflows",
        items: product.workflows.map((workflow) => `${workflow} workflows inside ${product.name}`),
      },
      {
        title: "What you can do",
        items: product.highlights,
      },
      {
        title: "Licensing and support",
        items: [
          `${product.price} — talk to Synergic for a quote`,
          `Vendor: ${product.vendor}`,
          "Licensed and supported in India",
          `Fits ${product.industries.join(", ").toLowerCase()} teams`,
        ],
      },
    ],
    faqs: [
      {
        question: `What is ${product.name}?`,
        answer: `${product.name} is ${product.line.toLowerCase()}. ${product.description}`,
      },
      {
        question: `Who is ${product.name} for?`,
        answer: `It is a fit for ${product.industries.join(", ").toLowerCase()} teams working in ${product.category.toLowerCase()}. Typical workflows include ${product.workflows.join(", ").toLowerCase()}.`,
      },
      {
        question: `How do I licence ${product.name} in India?`,
        answer: `${product.name} is licensed and supported through Synergic Information Solutions. Pricing is ${product.price.toLowerCase()} — enquire for a quote, demo, or seat count that matches your office.`,
      },
      {
        question: `Does ${product.name} work with the rest of our software?`,
        answer: product.highlights.find((item) => /interoper|integrat|DWG|BIM|shared|import/i.test(item))
          ?? `${product.name} is part of the ${product.vendor} stack we licence in India. Tell us what else is on your desk and we will map the workflow.`,
      },
    ],
  };
}
