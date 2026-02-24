// Site configuration - Update these values with actual business information

export const siteConfig = {
  name: "Balderas Concrete",
  tagline: "Built to Last. Designed to Impress.",
  // tagline: "Quality Concrete Services in Texas",
  description:
    "Professional concrete contractor in Texas. Driveways, patios, foundations, sidewalks, and stamped concrete. Licensed & insured.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  ogImage: "/og-image.jpg",
};

export const contactInfo = {
  phone: "(555) 123-4567", // Update with actual phone
  phoneRaw: "+15551234567", // For tel: links
  email: "contact@balderasconcrete.com", // Update with actual email
  address: {
    street: "123 Main Street", // Update with actual address
    city: "Houston",
    state: "TX",
    zip: "77001",
    full: "123 Main Street, Houston, TX 77001",
  },
  hours: "Monday - Friday: 7:00 AM - 6:00 PM",
  hoursStructured: "Mo-Fr 07:00-18:00",
};

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
];

export const services = [
  {
    id: "driveways",
    title: "Concrete Driveways",
    shortDescription: "Durable driveways built to last",
    description:
      "Professional driveway installation, replacement, and repair. We use high-quality concrete and proper reinforcement for driveways that withstand Texas weather and daily use.",
    features: [
      "New driveway installation",
      "Driveway replacement",
      "Crack repair and resurfacing",
      "Expansion and extensions",
    ],
  },
  {
    id: "patios",
    title: "Patios & Outdoor Living",
    shortDescription: "Beautiful outdoor spaces",
    description:
      "Transform your backyard with a custom concrete patio. From simple slabs to decorative stamped designs, we create outdoor living spaces perfect for Texas entertaining.",
    features: [
      "Custom patio design",
      "Pool decks",
      "Outdoor kitchens",
      "Fire pit areas",
    ],
  },
  {
    id: "foundations",
    title: "Foundations",
    shortDescription: "Solid foundations for your projects",
    description:
      "Expert foundation work for residential and commercial projects. We ensure proper preparation, reinforcement, and curing for foundations that stand the test of time.",
    features: [
      "Residential foundations",
      "Commercial foundations",
      "Garage slabs",
      "Building pads",
    ],
  },
  {
    id: "sidewalks",
    title: "Sidewalks & Walkways",
    shortDescription: "Safe, attractive walkways",
    description:
      "Professional sidewalk and walkway installation. We create smooth, level surfaces with proper drainage for safe pedestrian access around your property.",
    features: [
      "Sidewalk installation",
      "Garden pathways",
      "Entry walkways",
      "ADA-compliant surfaces",
    ],
  },
  {
    id: "stamped",
    title: "Stamped & Decorative",
    shortDescription: "Artistic concrete designs",
    description:
      "Elevate your concrete with decorative stamping and coloring. Choose from patterns that mimic stone, brick, tile, or wood for a custom look at a fraction of the cost.",
    features: [
      "Pattern stamping",
      "Integral coloring",
      "Exposed aggregate",
      "Stained concrete",
    ],
  },
  {
    id: "repair",
    title: "Concrete Repair",
    shortDescription: "Restore and renew existing concrete",
    description:
      "Don't replace when you can repair. We fix cracks, spalling, and surface damage to extend the life of your existing concrete and restore its appearance.",
    features: [
      "Crack repair",
      "Surface resurfacing",
      "Leveling and lifting",
      "Sealing and protection",
    ],
  },
];

export const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ],
  services: services.map((s) => ({ name: s.title, href: `/services#${s.id}` })),
};

export const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "10+", label: "Cities Served" },
];

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
