import React, { useState } from "react";
import { SEOHead } from "../components/common/SEOHead";
import { Container } from "../components/common/Container";
import { SectionHeading } from "../components/common/SectionHeading";

export function Gallery() {
  const [filter, setFilter] = useState("all");

  const images = [
    { id: 1, title: "Dal Lake Shikara", category: "kashmir", src: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "Alleppey Backwaters", category: "kerala", src: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "Ubud Rice Terraces", category: "bali", src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80" },
    { id: 4, title: "Dubai Skyline", category: "dubai", src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80" },
    { id: 5, title: "Solang Valley Snow", category: "manali", src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80" },
    { id: 6, title: "Phi Phi Islands", category: "thailand", src: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80" },
    { id: 7, title: "Gulmarg Gondola", category: "kashmir", src: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80" },
    { id: 8, title: "Munnar Tea Gardens", category: "kerala", src: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80" },
  ];

  const filteredImages = filter === "all" ? images : images.filter((img) => img.category === filter);

  return (
    <>
      <SEOHead
        title="Travel Photo Gallery — High Definition Scenery"
        description="Immerse yourself in breathtaking photos from Kashmir, Kerala, Bali, Dubai, Thailand, and Manali captured during Travel Culture trips."
        canonical="/gallery"
      />

      <main className="pt-28 pb-20 bg-[var(--bg)] min-h-screen">
        <Container>
          <SectionHeading
            eyebrow="Visual Wanderlust"
            title="Travel Photo Gallery"
            subtitle="Real moments, pristine landscapes, and unforgettable stays captured on location."
          />

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
            {[
              { id: "all", label: "All Photos" },
              { id: "kashmir", label: "Kashmir" },
              { id: "kerala", label: "Kerala" },
              { id: "bali", label: "Bali" },
              { id: "dubai", label: "Dubai" },
              { id: "thailand", label: "Thailand" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filter === tab.id
                    ? "bg-[#E85D3D] text-white shadow-sm"
                    : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[#E85D3D]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="masonry-grid">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 bg-[var(--bg-surface)]"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end">
                  <span className="font-serif text-lg font-bold text-white">
                    {img.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </main>
    </>
  );
}
