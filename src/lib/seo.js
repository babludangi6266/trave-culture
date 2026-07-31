/**
 * SEO metadata & Schema.org JSON-LD helpers
 */
export const SITE_NAME = "Travel Culture";
export const SITE_URL = "https://travelculture.com";
export const DEFAULT_DESCRIPTION = "Travel Culture offers curated luxury travel packages, honeymoon getaways, family holidays, and adventure trips across Kashmir, Kerala, Bali, Dubai, Thailand, and more.";

export function getTravelAgencySchema() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "description": DEFAULT_DESCRIPTION,
    "telephone": "+91-9999999999",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "New Delhi",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://facebook.com/travelculture",
      "https://instagram.com/travelculture"
    ]
  });
}

export function getPackageProductSchema(pkg) {
  if (!pkg) return "";
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": pkg.title,
    "description": pkg.overview,
    "image": pkg.image,
    "touristType": [pkg.categoryLabel || "Holiday Package"],
    "offers": {
      "@type": "Offer",
      "price": pkg.price,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-01-01"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": pkg.rating,
      "reviewCount": pkg.reviewsCount
    }
  });
}
