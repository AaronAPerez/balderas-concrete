// Site configuration - Update these values with actual business information

// Helper function to ensure URL has protocol
const ensureProtocol = (url: string): string => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

export const siteConfig = {
  name: "Balderas Concrete",
  tagline: "Built to Last. Designed to Impress.",
  description:
    "Professional concrete and earthwork contractor serving Houston and surrounding areas. 30+ years experience specializing in turnkey concrete, earthwork & site work, and underground utilities, tilt Wall, mid rise, WWTP, for commercial, industrial, and residential projects. Licensed & insured.",
  url: ensureProtocol(process.env.NEXT_PUBLIC_SITE_URL || "https://www.balderasconcrete.com"),
  ogImage: "/images/og-image.png",
};

export const contactInfo = {
  phone: "(281) 720-9070", // Update with actual phone
  phoneRaw: "+12817209070", // For tel: links
  email: "contact@balderasconcrete.com", // Update with actual email
  address: {
    street: "", // Update with actual address
    city: "Houston",
    state: "TX",
    zip: "77001",
    full: "Houston, TX 77001",
  },
  hours: "Monday - Friday: 7:00 AM - 6:00 PM",
  hoursStructured: "Mo-Fr 07:00-18:00",
};

// Service area radius: approximately 75 miles from Houston
export const serviceAreaRadius = "75 miles from Houston";

export const serviceAreas = [
  "Houston",
  "Katy",
  "Sugar Land",
  "Pearland",
  "Cypress",
  "Spring",
  "The Woodlands",
  "Pasadena",
  "Baytown",
  "League City",
  "Conroe",
  "Galveston",
  "Texas City",
  "Friendswood",
  "Missouri City",
];

export const services = [
  {
    id: "earthwork",
    title: "Earthwork & Site Work",
    shortDescription: "Complete site preparation services",
    description:
      "Comprehensive earthwork and site preparation for commercial and industrial projects. From land clearing to final grading, we handle all aspects of site development to ensure your project starts on solid ground.",
    features: [
      "Land Clearing & Grubbing",
      "Demolition",
      "Subgrade & Soil Stabilization",
      "Building Pads",
      "Detention & Retention Ponds",
      "Surveying & Layout",
      "Grading & Mass Grading",
      "Excavating",
    ],
  },
  {
    id: "turnkey-concrete",
    title: "Turnkey Concrete",
    shortDescription: "Full-service concrete solutions",
    description:
      "Complete concrete services for residential, commercial, and industrial projects. From foundations to decorative finishes, we deliver turnkey solutions with expert craftsmanship and attention to detail.",
    features: [
      "Foundations",
      "Slab On Grade",
      "Post Tension Slabs",
      "Elevated Slabs",
      "Industrial Concrete",
      "WWTP (Wastewater Treatment Plants)",
      "Tilt-Up Panels",
      "Retaining Walls",
      "Concrete Pavement",
      "Sidewalks",
      "Decorative Concrete",
      "Multi-Level Construction",
      "Residential Concrete",
    ],
  },
  {
    id: "underground-utilities",
    title: "Underground Utilities",
    shortDescription: "Expert utility infrastructure",
    description:
      "Professional underground utility installation for commercial and municipal projects. We specialize in sanitary, water, and storm systems with precision and compliance to all local codes and standards.",
    features: [
      "Sanitary Sewer Systems",
      "Waterline Installation",
      "Storm Sewer Systems",
      "Trench Drains",
    ],
  },
];

export const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Areas", href: "/areas" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ],
  services: services.map((s) => ({ name: s.title, href: `/services#${s.id}` })),
};

// export const stats = [
//   { value: "30+", label: "Years Experience" },
//   { value: "500+", label: "Projects Completed" },
//   { value: "100%", label: "Satisfaction Rate" },
//   { value: "10+", label: "Cities Served" },
// ];

export const processSteps = [
  {
    step: 1,
    title: "Contact Us",
    description: "Reach out by phone or our contact form to tell us about your project.",
  },
  {
    step: 2,
    title: "Get an Estimate",
    description: "We visit your property, assess the work, and provide a detailed quote.",
  },
  {
    step: 3,
    title: "Schedule Work",
    description: "Once approved, we schedule your project at a time that works for you.",
  },
  {
    step: 4,
    title: "Quality Results",
    description: "Our team completes your project with attention to detail and quality.",
  },
];
