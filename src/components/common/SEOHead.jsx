import React from "react";
import { Helmet } from "react-helmet-async";
import { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION, getTravelAgencySchema } from "../../lib/seo";

export function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  image = `${SITE_URL}/og-image.jpg`,
  canonical,
  schema
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Premium Travel Agency & Curated Packages`;

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      {canonical && <link rel="canonical" href={`${SITE_URL}${canonical}`} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {schema || getTravelAgencySchema()}
      </script>
    </Helmet>
  );
}
