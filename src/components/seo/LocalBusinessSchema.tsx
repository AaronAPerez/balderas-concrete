import { JsonLd } from "./JsonLd";
import { siteConfig, contactInfo, serviceAreas, services } from "@/src/lib/constants";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ConcreteContractor",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: contactInfo.phone,
    email: contactInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contactInfo.address.street,
      addressLocality: contactInfo.address.city,
      addressRegion: contactInfo.address.state,
      postalCode: contactInfo.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      // Update with actual coordinates
      latitude: 29.7604,
      longitude: -95.3698,
    },
    areaServed: serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
      addressRegion: "TX",
      addressCountry: "US",
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    priceRange: "$$",
    image: `${siteConfig.url}/images/concrete/professional-concrete-contractors-houston-tx.jpg`,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      // Add social media URLs when available
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Concrete Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      })),
    },
  };

  return <JsonLd data={schema} />;
}
