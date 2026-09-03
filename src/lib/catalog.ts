export const industries = [
  "Structural",
  "Transportation",
  "Water",
  "Construction",
  "Buildings",
  "Energy",
] as const;

export const productCategories = [
  "Structural analysis and detailing",
  "Civil and transportation",
  "Water and construction",
  "CAD and MEP",
] as const;

export const categoryMeta: Record<
  ProductCategory,
  {
    slug: string;
    shortName: string;
    tagline: string;
    description: string;
    image: string;
    imageAlt: string;
  }
> = {
  "Structural analysis and detailing": {
    slug: "structural-analysis",
    shortName: "Structural",
    tagline: "Analysis, design, and foundations",
    description:
      "STAAD.Pro and Structural WorkSuite for steel, concrete, timber, and complex frames — analysis, design, and foundation tools licensed and supported in India.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Steel structure under construction",
  },
  "Civil and transportation": {
    slug: "civil-and-transportation",
    shortName: "Civil & transport",
    tagline: "Roads, rail, and bridges",
    description:
      "OpenRoads, OpenRail, and OpenBridge for highways, rail, and corridor modelling — from survey through construction-ready plans.",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Highway corridor at dusk",
  },
  "Water and construction": {
    slug: "water-and-construction",
    shortName: "Water & construction",
    tagline: "Networks and 4D planning",
    description:
      "WaterGEMS and SYNCHRO for water networks and 4D construction planning so teams can design, sequence, and deliver with confidence.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Construction site with tower cranes",
  },
  "CAD and MEP": {
    slug: "cad-and-mep",
    shortName: "CAD & MEP",
    tagline: "Drafting and building services",
    description:
      "BricsCAD, GstarCAD, and AX3000 MEP for drafting, 3D modelling, and building services — familiar CAD without lock-in.",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Engineer working at a CAD workstation",
  },
};

export const vendors = [
  "Bentley Systems",
  "Bricsys",
  "Gstarsoft",
  "Cadline",
] as const;

export const workflows = [
  "Analysis",
  "Design",
  "CAD drafting",
  "BIM",
  "Construction",
] as const;

export type Industry = (typeof industries)[number];
export type ProductCategory = (typeof productCategories)[number];
export type Vendor = (typeof vendors)[number];
export type Workflow = (typeof workflows)[number];
export type SortKey = "az" | "za" | "featured";

export type CatalogProduct = {
  slug: string;
  name: string;
  vendor: Vendor;
  category: ProductCategory;
  industries: Industry[];
  workflows: Workflow[];
  line: string;
  description: string;
  price: string;
  featured: boolean;
  image: string;
  hoverImage: string;
  imageAlt: string;
  highlights: string[];
};

export const softwarePortfolio = [
  {
    name: "Bentley Systems",
    category: "Infrastructure Engineering",
    line: "Infrastructure engineering, asset management and digital project delivery technology.",
    featured: true,
  },
  {
    name: "BricsCAD",
    category: "CAD / BIM",
    line: "Professional CAD and design technology for modern engineering workflows.",
    featured: true,
  },
  {
    name: "GstarCAD",
    category: "Professional CAD",
    line: "DWG-based CAD solutions for architecture, engineering and design organizations.",
    featured: false,
  },
  {
    name: "AX3000 MEP",
    category: "MEP Engineering",
    line: "Engineering software for MEP design and building services workflows.",
    featured: false,
  },
] as const;

const productAliases: Record<string, string> = {
  BricsCAD: "bricscad-pro",
  "BricsCAD Pro": "bricscad-pro",
  AX3000: "ax3000-mep",
  "AX3000 MEP": "ax3000-mep",
  "Ax3000 MEP": "ax3000-mep",
};

export const catalog: CatalogProduct[] = [
  {
    slug: "bentley-systems",
    name: "Bentley Systems",
    vendor: "Bentley Systems",
    category: "Civil and transportation",
    industries: ["Structural", "Transportation", "Water", "Construction", "Buildings", "Energy"],
    workflows: ["Analysis", "Design", "BIM", "Construction"],
    line: "Infrastructure engineering, asset management and digital project delivery technology.",
    description:
      "Infrastructure engineering, asset management and digital project delivery technology — from structural analysis and civil design through construction sequencing, licensed and supported in India through Synergic.",
    price: "Contact us",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1400&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Infrastructure corridor representing Bentley engineering software",
    highlights: [
      "Infrastructure engineering across roads, rail, buildings, and water",
      "Asset management and digital project delivery on one platform",
      "Licensed and supported in India through Synergic",
    ],
  },
  {
    slug: "staad-pro",
    name: "STAAD.Pro",
    vendor: "Bentley Systems",
    category: "Structural analysis and detailing",
    industries: ["Structural", "Buildings", "Energy"],
    workflows: ["Analysis", "Design"],
    line: "3D structural analysis and design",
    description:
      "Analyse and design steel, concrete, timber, and aluminium structures with a proven finite-element engine used on projects across India.",
    price: "Contact us",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Steel structure under construction",
    highlights: [
      "Physical member modelling with steel, concrete, and timber design codes",
      "Interoperability with AutoPIPE, RAM, and OpenBuildings",
      "Licensed and supported in India through Synergic",
    ],
  },
  {
    slug: "staad-pro-advanced",
    name: "STAAD.Pro Advanced",
    vendor: "Bentley Systems",
    category: "Structural analysis and detailing",
    industries: ["Structural", "Energy"],
    workflows: ["Analysis"],
    line: "Advanced nonlinear and buckling analysis",
    description:
      "Extend STAAD.Pro with nonlinear, buckling, and cable analysis for towers, industrial frames, and complex structures.",
    price: "Contact us",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Modern concrete and glass building structure",
    highlights: [
      "Geometric and material nonlinear analysis",
      "Time-history and response-spectrum workflows",
      "Ideal for industrial plants and high-rise frames",
    ],
  },
  {
    slug: "structural-worksuite",
    name: "Structural WorkSuite",
    vendor: "Bentley Systems",
    category: "Structural analysis and detailing",
    industries: ["Structural", "Buildings"],
    workflows: ["Analysis", "Design"],
    line: "Complete structural analysis toolkit",
    description:
      "A bundled structural portfolio covering analysis, design, and documentation so teams can move from model to drawings on one licence.",
    price: "Contact us",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Architectural structure with exposed steel framing",
    highlights: [
      "STAAD, RAM, and documentation tools in one suite",
      "Shared models across analysis and drawing production",
      "Best value for multi-discipline structural offices",
    ],
  },
  {
    slug: "staad-foundation-advanced",
    name: "STAAD Foundation Advanced",
    vendor: "Bentley Systems",
    category: "Structural analysis and detailing",
    industries: ["Structural", "Buildings", "Energy"],
    workflows: ["Analysis", "Design"],
    line: "Foundation analysis and design",
    description:
      "Design isolated, combined, pile, and mat foundations with code checking and production-ready drawings.",
    price: "Contact us",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1400&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Concrete foundation works on a construction site",
    highlights: [
      "Plant, building, and tower foundation types",
      "Import reactions from STAAD.Pro",
      "Automated drawings and calculation reports",
    ],
  },
  {
    slug: "openroads-designer",
    name: "OpenRoads Designer",
    vendor: "Bentley Systems",
    category: "Civil and transportation",
    industries: ["Transportation"],
    workflows: ["Design", "BIM"],
    line: "End-to-end detailed road design",
    description:
      "Detailed corridor modelling for highways, urban streets, and sites — from survey through construction-ready plans.",
    price: "Contact us",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1400&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Highway corridor at dusk",
    highlights: [
      "3D corridor modelling with live geometry",
      "Survey, drainage, and quantity workflows",
      "BIM-ready deliverables for Indian road projects",
    ],
  },
  {
    slug: "openrail-designer",
    name: "OpenRail Designer",
    vendor: "Bentley Systems",
    category: "Civil and transportation",
    industries: ["Transportation"],
    workflows: ["Design", "BIM"],
    line: "BIM-ready railway corridor design",
    description:
      "Design track, overhead line, and rail corridors with geometry tools built for metro, mainline, and high-speed work.",
    price: "Contact us",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1400&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Railway tracks stretching into the distance",
    highlights: [
      "Track geometry, cant, and turnout design",
      "Integration with OpenRoads and OpenBridge",
      "Used on metro and mainline programmes",
    ],
  },
  {
    slug: "openbridge-designer",
    name: "OpenBridge Designer",
    vendor: "Bentley Systems",
    category: "Civil and transportation",
    industries: ["Transportation", "Structural"],
    workflows: ["Analysis", "Design", "BIM"],
    line: "Bridge modelling, analysis, and documentation",
    description:
      "Model, analyse, and document bridges in a connected civil workflow alongside road and rail corridors.",
    price: "Contact us",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Bridge spanning an urban waterfront",
    highlights: [
      "Parametric superstructure and substructure modelling",
      "Analysis and drawing production in one environment",
      "Works with OpenRoads and OpenRail alignments",
    ],
  },
  {
    slug: "civil-worksuite",
    name: "Civil WorkSuite",
    vendor: "Bentley Systems",
    category: "Civil and transportation",
    industries: ["Transportation", "Construction"],
    workflows: ["Design", "BIM"],
    line: "Civil design applications in one licence",
    description:
      "A civil software bundle for road, site, and drainage teams that need several Bentley civil applications together.",
    price: "Contact us",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=1400&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Multi-lane highway interchange",
    highlights: [
      "OpenRoads and related civil tools in one suite",
      "Shared survey and terrain data",
      "Practical for growing civil consultancies",
    ],
  },
  {
    slug: "plateia",
    name: "Plateia",
    vendor: "Bentley Systems",
    category: "Civil and transportation",
    industries: ["Transportation"],
    workflows: ["Design", "CAD drafting"],
    line: "Road design on a CAD platform",
    description:
      "Professional road design with alignments, corridors, and quantities — a strong fit for highway and municipal work.",
    price: "Contact us",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1400&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Elevated roadway through a city",
    highlights: [
      "Alignment, profile, and cross-section tools",
      "Quantity take-off and reporting",
      "CAD-familiar interface for design offices",
    ],
  },
  {
    slug: "ferrovia",
    name: "Ferrovia",
    vendor: "Bentley Systems",
    category: "Civil and transportation",
    industries: ["Transportation"],
    workflows: ["Design"],
    line: "Railway geometry and corridor design",
    description:
      "Specialised rail design for track geometry, stations, and corridor modelling on metro and mainline projects.",
    price: "Contact us",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1400&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Passenger train on an urban rail corridor",
    highlights: [
      "Track layout and station geometry",
      "Corridor modelling for rail alignments",
      "Complements OpenRail on mixed fleets",
    ],
  },
  {
    slug: "watergems",
    name: "WaterGEMS",
    vendor: "Bentley Systems",
    category: "Water and construction",
    industries: ["Water"],
    workflows: ["Analysis", "Design"],
    line: "Water distribution analysis and design",
    description:
      "Model potable water networks for pressure, demand, quality, and operations — from city utilities to industrial campuses.",
    price: "Contact us",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1400&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Water infrastructure and treatment plant",
    highlights: [
      "Steady-state and extended-period simulation",
      "Pump, tank, and valve optimisation",
      "GIS and CAD interoperability",
    ],
  },
  {
    slug: "urbano",
    name: "Urbano",
    vendor: "Bentley Systems",
    category: "Water and construction",
    industries: ["Water", "Construction"],
    workflows: ["Design"],
    line: "Pipe network design for urban infrastructure",
    description:
      "Design water, sewer, and storm networks with terrain-aware layouts for municipal and land-development projects.",
    price: "Contact us",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "City skyline representing urban infrastructure",
    highlights: [
      "Water, sewer, and storm network layouts",
      "Terrain and alignment-driven design",
      "Quantities for tender and construction",
    ],
  },
  {
    slug: "synchro",
    name: "SYNCHRO",
    vendor: "Bentley Systems",
    category: "Water and construction",
    industries: ["Construction", "Buildings"],
    workflows: ["Construction", "BIM"],
    line: "4D construction planning and management",
    description:
      "Link the model to the programme so construction teams can sequence work, spot clashes in time, and communicate the build.",
    price: "Contact us",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Construction site with tower cranes",
    highlights: [
      "4D scheduling from 3D models and Gantt data",
      "Look-ahead planning for site teams",
      "Clear visuals for owners and contractors",
    ],
  },
  {
    slug: "bricscad-pro",
    name: "BricsCAD",
    vendor: "Bricsys",
    category: "CAD and MEP",
    industries: ["Buildings", "Energy"],
    workflows: ["CAD drafting", "Design", "BIM"],
    line: "Professional CAD and design technology for modern engineering workflows.",
    description:
      "Professional CAD and design technology for modern engineering workflows — a DWG-native platform for 2D drafting, 3D modelling, and BIM production, licensed and supported in India.",
    price: "Contact us",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1400&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Engineer working at a CAD workstation",
    highlights: [
      "Full DWG compatibility",
      "2D drafting plus 3D solid modelling",
      "Perpetual and subscription options",
    ],
  },
  {
    slug: "bricscad-lite",
    name: "BricsCAD Lite",
    vendor: "Bricsys",
    category: "CAD and MEP",
    industries: ["Buildings"],
    workflows: ["CAD drafting"],
    line: "Fast, familiar 2D CAD drafting",
    description:
      "A lightweight DWG editor for production drafting — ideal for teams that need reliable 2D CAD at a lower licence cost.",
    price: "Contact us",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Engineers collaborating over digital drawings",
    highlights: [
      "2D drafting in native DWG",
      "Familiar command line and ribbon",
      "A practical step up from basic CAD",
    ],
  },
  {
    slug: "gstarcad",
    name: "GstarCAD",
    vendor: "Gstarsoft",
    category: "CAD and MEP",
    industries: ["Buildings"],
    workflows: ["CAD drafting", "Design"],
    line: "DWG-based CAD solutions for architecture, engineering and design organizations.",
    description:
      "DWG-based CAD solutions for architecture, engineering and design organizations — dependable production drafting at scale, licensed and supported in India.",
    price: "Contact us",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Workspace with technical drawings and a laptop",
    highlights: [
      "DWG compatibility for everyday production",
      "2D drafting with optional 3D tools",
      "Licensed for Indian design offices",
    ],
  },
  {
    slug: "ax3000-mep",
    name: "AX3000 MEP",
    vendor: "Cadline",
    category: "CAD and MEP",
    industries: ["Buildings"],
    workflows: ["Design", "BIM"],
    line: "Engineering software for MEP design and building services workflows.",
    description:
      "Engineering software for MEP design and building services workflows — HVAC, electrical, and plumbing with energy analysis and visualisation for building-services teams.",
    price: "Contact us",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1400&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Mechanical building services in a plant room",
    highlights: [
      "HVAC, electrical, and plumbing design",
      "Energy and load calculations",
      "VR walkthroughs for coordination",
    ],
  },
];

export function productPath(nameOrSlug: string) {
  const resolved = productAliases[nameOrSlug] ?? nameOrSlug;
  const match = catalog.find(
    (item) =>
      item.slug === resolved ||
      item.name === resolved ||
      item.slug === nameOrSlug ||
      item.name === nameOrSlug
  );
  return match ? `/products/${match.slug}` : "/products";
}

export function categoryPath(category: ProductCategory) {
  return `/categories/${categoryMeta[category].slug}`;
}

export function getCategoryBySlug(slug: string) {
  return productCategories.find(
    (category) => categoryMeta[category].slug === slug
  );
}

export function productsInCategory(category: ProductCategory) {
  return catalog.filter((item) => item.category === category);
}

export function getProduct(slug: string) {
  return catalog.find((item) => item.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 3) {
  const product = getProduct(slug);
  if (!product) return [];
  if (product.slug === "bentley-systems") {
    return catalog
      .filter(
        (item) =>
          item.vendor === "Bentley Systems" &&
          item.slug !== slug &&
          item.featured
      )
      .slice(0, limit);
  }
  return catalog
    .filter((item) => item.slug !== slug && item.category === product.category)
    .slice(0, limit);
}

function inScope(item: CatalogProduct, category?: ProductCategory) {
  return !category || item.category === category;
}

export function industryCount(industry: Industry, category?: ProductCategory) {
  return catalog.filter(
    (item) => item.industries.includes(industry) && inScope(item, category)
  ).length;
}

export function categoryCount(category: ProductCategory) {
  return catalog.filter((item) => item.category === category).length;
}

export function vendorCount(vendor: Vendor, category?: ProductCategory) {
  return catalog.filter(
    (item) => item.vendor === vendor && inScope(item, category)
  ).length;
}

export function workflowCount(workflow: Workflow, category?: ProductCategory) {
  return catalog.filter(
    (item) => item.workflows.includes(workflow) && inScope(item, category)
  ).length;
}

export function featuredCount(category?: ProductCategory) {
  return catalog.filter((item) => item.featured && inScope(item, category)).length;
}

export function filterCatalog({
  query,
  selectedIndustries,
  selectedCategories,
  selectedVendors,
  selectedWorkflows,
  featuredOnly,
  sort,
}: {
  query: string;
  selectedIndustries: Industry[];
  selectedCategories: ProductCategory[];
  selectedVendors: Vendor[];
  selectedWorkflows: Workflow[];
  featuredOnly: boolean;
  sort: SortKey;
}) {
  const needle = query.trim().toLowerCase();

  const filtered = catalog.filter((item) => {
    const matchesQuery =
      needle.length === 0 ||
      item.name.toLowerCase().includes(needle) ||
      item.line.toLowerCase().includes(needle) ||
      item.description.toLowerCase().includes(needle) ||
      item.vendor.toLowerCase().includes(needle) ||
      item.category.toLowerCase().includes(needle);

    const matchesIndustry =
      selectedIndustries.length === 0 ||
      selectedIndustries.some((industry) => item.industries.includes(industry));

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);

    const matchesVendor =
      selectedVendors.length === 0 || selectedVendors.includes(item.vendor);

    const matchesWorkflow =
      selectedWorkflows.length === 0 ||
      selectedWorkflows.some((workflow) => item.workflows.includes(workflow));

    const matchesFeatured = !featuredOnly || item.featured;

    return (
      matchesQuery &&
      matchesIndustry &&
      matchesCategory &&
      matchesVendor &&
      matchesWorkflow &&
      matchesFeatured
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "za") return b.name.localeCompare(a.name);
    if (sort === "featured") {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.name.localeCompare(b.name);
    }
    return a.name.localeCompare(b.name);
  });

  return sorted;
}
