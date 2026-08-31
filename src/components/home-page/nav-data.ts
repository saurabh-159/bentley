export const productGroups = [
  {
    title: "Structural",
    items: [
      { label: "STAAD.Pro", href: "/#products" },
      { label: "STAAD.Pro Advanced", href: "/#products" },
      { label: "Structural WorkSuite", href: "/#products" },
      { label: "STAAD Foundation Advanced", href: "/#products" },
    ],
  },
  {
    title: "Civil & Transport",
    items: [
      { label: "OpenRoads Designer", href: "/#products" },
      { label: "OpenRail Designer", href: "/#products" },
      { label: "OpenBridge Designer", href: "/#products" },
      { label: "Civil WorkSuite", href: "/#products" },
      { label: "Plateia", href: "/#products" },
      { label: "Ferrovia", href: "/#products" },
    ],
  },
  {
    title: "Water & Construction",
    items: [
      { label: "WaterGEMS", href: "/#products" },
      { label: "Urbano", href: "/#products" },
      { label: "SYNCHRO", href: "/#products" },
    ],
  },
  {
    title: "CAD & MEP",
    items: [
      { label: "BricsCAD Pro", href: "/#products" },
      { label: "BricsCAD Lite", href: "/#products" },
      { label: "GstarCAD", href: "/#products" },
      { label: "Ax3000 MEP", href: "/#products" },
    ],
  },
] as const;

export const featuredProducts = [
  { label: "STAAD.Pro", href: "/#products", description: "Structural analysis and design" },
  { label: "SYNCHRO", href: "/#products", description: "4D construction planning" },
  { label: "WaterGEMS", href: "/#products", description: "Water distribution modeling" },
  { label: "OpenRoads Designer", href: "/#products", description: "Civil and road design" },
  { label: "BricsCAD Pro", href: "/#products", description: "DWG-based CAD drafting" },
  { label: "Structural WorkSuite", href: "/#products", description: "Complete structural toolkit" },
  { label: "STAAD Foundation Advanced", href: "/#products", description: "Foundation analysis and design" },
  { label: "OpenRail Designer", href: "/#products", description: "Rail corridor design" },
  { label: "Ax3000 MEP", href: "/#products", description: "Building services design" },
] as const;

export const productExpandLinks = [
  {
    label: "Find a local partner",
    description: "Authorized sales experts near you",
    href: "/#contact",
  },
  {
    label: "Student & educator access",
    description: "Free products for academic use",
    href: "/#resources",
  },
  {
    label: "Software catalog",
    description: "CAD and engineering apps for India",
    href: "/#products",
  },
  {
    label: "Professional services",
    description: "Get expert project advice",
    href: "/#contact",
  },
] as const;

export const solutions = [
  { label: "Architectural", href: "/#solutions" },
  { label: "Structural", href: "/#solutions" },
  { label: "Rail & Road", href: "/#solutions" },
  { label: "MEP", href: "/#solutions" },
  { label: "Construction", href: "/#solutions" },
  { label: "Water", href: "/#solutions" },
] as const;

export const whoWeServe = [
  {
    label: "Engineering firms",
    description: "Deliver on time & within budget",
    href: "/#solutions",
  },
  {
    label: "Asset owners",
    description: "Maximize the value of infrastructure",
    href: "/#solutions",
  },
  {
    label: "Governments",
    description: "Build for communities",
    href: "/#solutions",
  },
  {
    label: "Academia",
    description: "Prepare the next generation",
    href: "/#solutions",
  },
] as const;

export const solutionFeature = {
  image:
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  imageAlt: "Engineer working with digital infrastructure tools",
  title: "AI and you",
  links: [
    {
      label: "Watch the latest webinar on using MCP",
      href: "/#resources",
    },
    {
      label: "See where infrastructure and AI meet",
      href: "/#resources",
    },
    {
      label: "Learn about engineering workflows",
      href: "/#resources",
    },
  ],
} as const;

export const companyLinks = [
  { label: "About us", href: "/#about" },
  { label: "Career", href: "/#career" },
  { label: "Resource center", href: "/#resources" },
  { label: "Contact us", href: "/#contact" },
] as const;

export const contact = {
  address: "2/91/20, BP Raju Marg, Laxmi Cyber City, Whitefields, Kondapur, Telangana 500084",
  phone: "+91 98490 07830",
  phoneHref: "tel:+919849007830",
  email: "Info@synergicinfo.com",
  emailHref: "mailto:Info@synergicinfo.com",
  website: "www.synergicinfo.com",
  websiteHref: "https://synergicinfo.com",
} as const;
