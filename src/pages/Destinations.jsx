import React, { useState } from "react";
import { SEOHead } from "../components/common/SEOHead";
import { Container } from "../components/common/Container";
import { SectionHeading } from "../components/common/SectionHeading";
import { DestinationCard } from "../components/destinations/DestinationCard";
import destinationsData from "../data/destinations.json";

export function Destinations() {
  const [filter, setFilter] = useState("all");

  const filteredDestinations = destinationsData.filter((dest) => {
    if (filter === "all") return true;
    return dest.category === filter;
  });

  return (
    <>
      <SEOHead
        title="Popular Destinations — Kashmir, Kerala, Bali, Dubai & More"
        description="Explore top travel destinations curated by Travel Culture. Luxury honeymoons in Kashmir, backwaters in Kerala, beach villas in Bali, and desert adventures in Dubai."
        canonical="/destinations"
      />

      <main className="pt-28 pb-20 bg-[var(--bg)] min-h-screen">
        <Container>
          <SectionHeading
            eyebrow="Explore Destinations"
            title="Where Dream Journeys Begin"
            subtitle="Browse through our handpicked world-class travel destinations across domestic landscapes and international paradises."
          />

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
            {[
              { id: "all", label: "All Destinations" },
              { id: "domestic", label: "Domestic (India)" },
              { id: "international", label: "International" },
              { id: "adventure", label: "Mountain & Adventure" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  filter === tab.id
                    ? "bg-[#E85D3D] text-white shadow-md"
                    : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[#E85D3D]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </Container>
      </main>
    </>
  );
}
