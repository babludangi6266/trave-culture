import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SEOHead } from "../components/common/SEOHead";
import { Container } from "../components/common/Container";
import { SectionHeading } from "../components/common/SectionHeading";
import { PackageCard } from "../components/packages/PackageCard";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import packagesData from "../data/packages.json";

export function Packages() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialDest = searchParams.get("dest") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialDest);
  const [sortBy, setSortBy] = useState("recommended");

  const categories = [
    { id: "all", label: "All Packages" },
    { id: "honeymoon", label: "Honeymoon & Luxury" },
    { id: "family", label: "Family & Nature" },
    { id: "international", label: "International Escapes" },
    { id: "adventure", label: "Adventure & Thrill" },
  ];

  const filteredPackages = useMemo(() => {
    return packagesData
      .filter((pkg) => {
        const matchesCategory =
          selectedCategory === "all" || pkg.category === selectedCategory;
        const matchesQuery =
          !searchQuery ||
          pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.destination.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return b.featured ? 1 : -1;
      });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <>
      <SEOHead
        title="Handcrafted Tour Packages — Luxury Travel Culture"
        description="Browse our complete list of travel packages across Kashmir, Kerala, Bali, Dubai, Manali, and Thailand with full itineraries and instant WhatsApp booking."
        canonical="/packages"
      />

      <main className="pt-28 pb-20 bg-[var(--bg)] min-h-screen">
        <Container>
          <SectionHeading
            eyebrow="Explore Packages"
            title="Curated Tour Packages"
            subtitle="Find your perfect trip — filter by travel style, destination, or price."
          />

          {/* Filter Bar */}
          <div className="bg-[var(--bg-surface)] p-6 rounded-3xl border border-[var(--border-color)] shadow-sm mb-12 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              {/* Search Box */}
              <div className="relative w-full md:w-96">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destination or package title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-[var(--bg)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[#E85D3D] text-[var(--text-primary)]"
                />
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <ArrowUpDown className="w-4 h-4 text-[#E85D3D]" />
                <span className="text-xs font-semibold uppercase text-[var(--text-secondary)]">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[var(--bg)] border border-[var(--border-color)] text-sm font-semibold rounded-full px-4 py-2.5 focus:outline-none text-[var(--text-primary)] cursor-pointer"
                >
                  <option value="recommended">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-[var(--border-color)]">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-[#E85D3D] text-white shadow-sm"
                      : "bg-[var(--bg)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[#E85D3D]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} packageData={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-color)]">
              <h3 className="font-serif text-2xl font-bold mb-2">No packages match your search</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-6">
                Try clearing your search query or switching categories.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="px-6 py-2.5 bg-[#E85D3D] text-white rounded-full text-sm font-semibold hover:bg-[#B8452E] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </Container>
      </main>
    </>
  );
}
