import {
  categoryCount,
  categoryMeta,
  categoryPath,
  productCategories,
  productPath,
} from "@/lib/catalog";

export type NavLink = {
  label: string;
  href: string;
};

export const productGroups: {
  title: string;
  items: NavLink[];
}[] = [
  {
    title: "Structural",
    items: [
      { label: "STAAD.Pro", href: productPath("STAAD.Pro") },
      { label: "STAAD.Pro Advanced", href: productPath("STAAD.Pro Advanced") },
      { label: "Structural WorkSuite", href: productPath("Structural WorkSuite") },
      { label: "STAAD Foundation Advanced", href: productPath("STAAD Foundation Advanced") },
    ],
  },
  {
    title: "Civil & Transport",
    items: [
      { label: "OpenRoads Designer", href: productPath("OpenRoads Designer") },
      { label: "OpenRail Designer", href: productPath("OpenRail Designer") },
      { label: "OpenBridge Designer", href: productPath("OpenBridge Designer") },
      { label: "Civil WorkSuite", href: productPath("Civil WorkSuite") },
      { label: "Plateia", href: productPath("Plateia") },
      { label: "Ferrovia", href: productPath("Ferrovia") },
    ],
  },
  {
    title: "Water & Construction",
    items: [
      { label: "WaterGEMS", href: productPath("WaterGEMS") },
      { label: "Urbano", href: productPath("Urbano") },
      { label: "SYNCHRO", href: productPath("SYNCHRO") },
    ],
  },
  {
    title: "CAD & MEP",
    items: [
      { label: "BricsCAD Pro", href: productPath("BricsCAD Pro") },
      { label: "BricsCAD Lite", href: productPath("BricsCAD Lite") },
      { label: "GstarCAD", href: productPath("GstarCAD") },
      { label: "Ax3000 MEP", href: productPath("Ax3000 MEP") },
    ],
  },
];

export const categoryNav = productCategories.map((category, index) => ({
  label: categoryMeta[category].shortName,
  href: categoryPath(category),
  description: categoryMeta[category].tagline,
  image: categoryMeta[category].image,
  imageAlt: categoryMeta[category].imageAlt,
  count: categoryCount(category),
  products: productGroups[index]?.items.slice(0, 4) ?? [],
}));

export const categoryLinks = categoryNav.map(({ label, href, description }) => ({
  label,
  href,
  description,
}));

export const featuredProducts = [
  { label: "STAAD.Pro", href: productPath("STAAD.Pro"), description: "Structural analysis and design" },
  { label: "SYNCHRO", href: productPath("SYNCHRO"), description: "4D construction planning" },
  { label: "WaterGEMS", href: productPath("WaterGEMS"), description: "Water distribution modeling" },
  { label: "OpenRoads Designer", href: productPath("OpenRoads Designer"), description: "Civil and road design" },
  { label: "BricsCAD Pro", href: productPath("BricsCAD Pro"), description: "DWG-based CAD drafting" },
  { label: "Structural WorkSuite", href: productPath("Structural WorkSuite"), description: "Complete structural toolkit" },
  { label: "STAAD Foundation Advanced", href: productPath("STAAD Foundation Advanced"), description: "Foundation analysis and design" },
  { label: "OpenRail Designer", href: productPath("OpenRail Designer"), description: "Rail corridor design" },
  { label: "Ax3000 MEP", href: productPath("Ax3000 MEP"), description: "Building services design" },
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
    label: "Browse categories",
    description: "Software grouped by discipline",
    href: "/categories",
  },
  {
    label: "Software catalog",
    description: "CAD and engineering apps for India",
    href: "/products",
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
  { label: "About us", href: "/about" },
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
