/**
 * Service Area Data
 * City-specific information for local SEO pages
 * Each city gets its own landing page optimized for local search
 */

import { serviceAreas, services } from "./constants";

export interface CityData {
  name: string;
  slug: string;
  county: string;
  description: string;
  highlights: string[];
  nearbyAreas: string[];
}

// City-specific data for SEO-optimized landing pages
export const cityData: Record<string, CityData> = {
  houston: {
    name: "Houston",
    slug: "houston",
    county: "Harris County",
    description:
      "As Houston's trusted concrete contractor, Balderas Concrete provides comprehensive earthwork, turnkey concrete, and underground utility services throughout the Greater Houston metropolitan area. From the Energy Corridor to the Medical Center, we deliver quality concrete solutions for commercial, industrial, and residential projects.",
    highlights: [
      "Serving all Houston neighborhoods and business districts",
      "Commercial and industrial concrete specialists",
      "Fast response times across the metro area",
      "Licensed and insured for large-scale projects",
    ],
    nearbyAreas: ["Katy", "Sugar Land", "Pearland", "Pasadena", "Cypress"],
  },
  katy: {
    name: "Katy",
    slug: "katy",
    county: "Harris/Fort Bend/Waller Counties",
    description:
      "Balderas Concrete proudly serves the Katy area with professional concrete and earthwork services. From the master-planned communities to commercial developments along I-10, we deliver quality concrete work that meets the high standards of Katy residents and businesses.",
    highlights: [
      "Experienced with Katy's clay soil conditions",
      "Serving residential communities and commercial centers",
      "Quick mobilization from Houston headquarters",
      "Familiar with local permitting requirements",
    ],
    nearbyAreas: ["Houston", "Cypress", "Sugar Land", "Fulshear", "Richmond"],
  },
  "sugar-land": {
    name: "Sugar Land",
    slug: "sugar-land",
    county: "Fort Bend County",
    description:
      "Balderas Concrete is your premier concrete contractor in Sugar Land. We serve the growing commercial and residential sectors with expert turnkey concrete, site preparation, and underground utility services throughout Fort Bend County.",
    highlights: [
      "Trusted by Sugar Land businesses and developers",
      "Experience with Fort Bend County regulations",
      "Commercial and residential concrete expertise",
      "Serving Sugar Land and surrounding communities",
    ],
    nearbyAreas: ["Houston", "Missouri City", "Stafford", "Richmond", "Katy"],
  },
  pearland: {
    name: "Pearland",
    slug: "pearland",
    county: "Brazoria/Harris Counties",
    description:
      "Balderas Concrete delivers professional concrete services to Pearland's thriving community. From commercial developments to residential projects, we provide complete earthwork, concrete, and utility solutions tailored to Pearland's growing needs.",
    highlights: [
      "Serving Pearland's rapid growth and development",
      "Commercial and industrial project specialists",
      "Local knowledge of soil and drainage conditions",
      "Competitive pricing for Pearland projects",
    ],
    nearbyAreas: ["Houston", "Friendswood", "League City", "Pasadena", "Missouri City"],
  },
  cypress: {
    name: "Cypress",
    slug: "cypress",
    county: "Harris County",
    description:
      "Balderas Concrete provides comprehensive concrete and earthwork services throughout the Cypress area. We serve the booming commercial corridors and master-planned communities with quality concrete solutions built to last.",
    highlights: [
      "Experienced in Cypress-area development projects",
      "Commercial and residential concrete services",
      "Familiar with local soil and drainage requirements",
      "Fast service throughout Northwest Houston",
    ],
    nearbyAreas: ["Houston", "Katy", "Spring", "Tomball", "Jersey Village"],
  },
  spring: {
    name: "Spring",
    slug: "spring",
    county: "Harris/Montgomery Counties",
    description:
      "Balderas Concrete serves the Spring and Klein areas with professional concrete contractor services. From The Woodlands border to Champions, we deliver quality earthwork, concrete, and utility infrastructure for all project types.",
    highlights: [
      "Serving Spring and North Houston communities",
      "Commercial and residential project experience",
      "Familiar with local development standards",
      "Quick mobilization throughout the area",
    ],
    nearbyAreas: ["Houston", "The Woodlands", "Cypress", "Tomball", "Humble"],
  },
  "the-woodlands": {
    name: "The Woodlands",
    slug: "the-woodlands",
    county: "Montgomery/Harris Counties",
    description:
      "Balderas Concrete provides premium concrete and earthwork services to The Woodlands community. We understand the high standards expected in this premier master-planned community and deliver quality that matches.",
    highlights: [
      "Experience with Woodlands development standards",
      "Commercial and residential concrete expertise",
      "Serving Town Center and surrounding villages",
      "Quality craftsmanship for discerning clients",
    ],
    nearbyAreas: ["Spring", "Conroe", "Tomball", "Magnolia", "Houston"],
  },
  pasadena: {
    name: "Pasadena",
    slug: "pasadena",
    county: "Harris County",
    description:
      "Balderas Concrete is a trusted concrete contractor serving Pasadena's industrial and residential sectors. With extensive experience in the petrochemical corridor, we deliver heavy-duty concrete solutions built for demanding environments.",
    highlights: [
      "Industrial concrete specialists",
      "Experience in petrochemical facility projects",
      "Heavy-duty pavement and foundations",
      "Serving Pasadena and the Ship Channel area",
    ],
    nearbyAreas: ["Houston", "Deer Park", "La Porte", "Baytown", "Pearland"],
  },
  baytown: {
    name: "Baytown",
    slug: "baytown",
    county: "Harris/Chambers Counties",
    description:
      "Balderas Concrete delivers professional concrete services to Baytown's industrial and residential communities. We specialize in heavy industrial concrete work while also serving commercial and residential clients throughout the area.",
    highlights: [
      "Industrial and commercial concrete specialists",
      "Experience with refinery and plant projects",
      "Serving Baytown and Chambers County",
      "Heavy-duty concrete and site work",
    ],
    nearbyAreas: ["Pasadena", "La Porte", "Houston", "Mont Belvieu", "Crosby"],
  },
  "league-city": {
    name: "League City",
    slug: "league-city",
    county: "Galveston/Harris Counties",
    description:
      "Balderas Concrete serves League City with comprehensive concrete and earthwork services. From Clear Lake to Kemah, we provide quality concrete solutions for the growing Bay Area communities.",
    highlights: [
      "Serving League City and Clear Lake area",
      "Commercial and residential expertise",
      "Coastal soil condition experience",
      "Quick response for Bay Area projects",
    ],
    nearbyAreas: ["Houston", "Friendswood", "Pearland", "Texas City", "Webster"],
  },
  conroe: {
    name: "Conroe",
    slug: "conroe",
    county: "Montgomery County",
    description:
      "Balderas Concrete provides professional concrete contractor services throughout Conroe and Montgomery County. We serve the rapidly growing commercial and residential developments with quality concrete and site work.",
    highlights: [
      "Serving Conroe's rapid growth",
      "Commercial and residential projects",
      "Montgomery County expertise",
      "Site preparation and concrete services",
    ],
    nearbyAreas: ["The Woodlands", "Spring", "Willis", "Magnolia", "Huntsville"],
  },
  galveston: {
    name: "Galveston",
    slug: "galveston",
    county: "Galveston County",
    description:
      "Balderas Concrete delivers specialized concrete services to Galveston Island and the surrounding coastal area. We understand the unique challenges of coastal construction and provide concrete solutions built to withstand the Gulf environment.",
    highlights: [
      "Coastal construction expertise",
      "Salt-resistant concrete solutions",
      "Commercial and residential services",
      "Experience with island building codes",
    ],
    nearbyAreas: ["Texas City", "League City", "La Marque", "Dickinson", "Houston"],
  },
  "texas-city": {
    name: "Texas City",
    slug: "texas-city",
    county: "Galveston County",
    description:
      "Balderas Concrete serves Texas City with industrial-grade concrete and earthwork services. From refineries to residential developments, we deliver quality concrete solutions throughout Galveston County.",
    highlights: [
      "Industrial concrete specialists",
      "Refinery and plant experience",
      "Commercial and residential services",
      "Galveston County expertise",
    ],
    nearbyAreas: ["Galveston", "League City", "La Marque", "Dickinson", "Houston"],
  },
  friendswood: {
    name: "Friendswood",
    slug: "friendswood",
    county: "Galveston/Harris Counties",
    description:
      "Balderas Concrete provides premium concrete services to Friendswood's family-oriented community. We deliver quality residential and commercial concrete work that meets the high standards of Friendswood residents.",
    highlights: [
      "Quality residential concrete services",
      "Commercial project expertise",
      "Serving Friendswood families since establishment",
      "Trusted by local builders and developers",
    ],
    nearbyAreas: ["Pearland", "League City", "Houston", "Clear Lake", "Webster"],
  },
  "missouri-city": {
    name: "Missouri City",
    slug: "missouri-city",
    county: "Fort Bend/Harris Counties",
    description:
      "Balderas Concrete serves Missouri City with professional concrete and earthwork services. From Sienna to Lake Olympia, we provide quality concrete solutions for residential and commercial projects throughout the area.",
    highlights: [
      "Serving Missouri City communities",
      "Residential and commercial expertise",
      "Fort Bend County experience",
      "Quality craftsmanship guaranteed",
    ],
    nearbyAreas: ["Sugar Land", "Houston", "Pearland", "Stafford", "Richmond"],
  },
};

/**
 * Get city data by slug
 */
export function getCityBySlug(slug: string): CityData | undefined {
  return cityData[slug];
}

/**
 * Get all city slugs for static generation
 */
export function getAllCitySlugs(): string[] {
  return Object.keys(cityData);
}

/**
 * Generate SEO-optimized page title for a city
 */
export function getCityPageTitle(city: CityData): string {
  return `Concrete Contractor in ${city.name}, TX`;
}

/**
 * Generate SEO-optimized meta description for a city
 */
export function getCityPageDescription(city: CityData): string {
  return `Professional concrete contractor serving ${city.name}, Texas. Balderas Concrete offers earthwork, turnkey concrete, and underground utilities. Licensed & insured. Call (281) 720-9070 for an estimate.`;
}

/**
 * Get services formatted for city pages
 */
export function getServicesForCity() {
  return services;
}

/**
 * Validate that all serviceAreas have corresponding cityData
 */
export function validateCityData(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];

  for (const area of serviceAreas) {
    const slug = area.toLowerCase().replace(/\s+/g, "-");
    if (!cityData[slug]) {
      missing.push(area);
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  };
}
