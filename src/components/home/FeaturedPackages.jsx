import React from "react";
import { Link } from "react-router-dom";
import { Clock, Star, ArrowRight, Tag } from "lucide-react";
import { SectionHeading } from "../common/SectionHeading";
import { Container } from "../common/Container";
import { Button } from "../common/Button";
import packagesData from "../../data/packages.json";
import { useEnquiry } from "../../context/EnquiryContext";

export function FeaturedPackages() {
  const { openEnquiryModal } = useEnquiry();
  const featured = packagesData.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="section-padding bg-[var(--bg-surface)] border-y border-[var(--border-color)]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Curated Itineraries"
            title="Featured Tour Packages"
            subtitle="Handcrafted packages with top hotels, sight-seeing, and instant WhatsApp booking."
            align="left"
            className="!mb-0"
          />
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 text-[#E85D3D] font-semibold hover:text-[#B8452E] transition-colors mt-4 md:mt-0"
          >
            <span>View All Packages ({packagesData.length})</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((pkg, idx) => (
            <div
              key={pkg.id}
              className={`group bg-[var(--bg)] rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between ${
                idx === 0 ? "lg:col-span-2" : ""
              }`}
            >
              {/* Image & Badges */}
              <div className="relative h-64 md:h-72 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-[#E85D3D] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  {pkg.discount}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#F2B84B] stroke-none" />
                  <span>{pkg.rating}</span>
                </div>

                {/* Duration */}
                <div className="absolute bottom-4 left-4 text-white text-xs font-medium flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-md">
                  <Clock className="w-3.5 h-3.5 text-[#F2B84B]" />
                  <span>{pkg.duration}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-[#E85D3D] tracking-wider">
                    {pkg.destination}
                  </span>
                  <Link to={`/packages/${pkg.slug}`}>
                    <h3 className="font-serif text-xl font-bold mt-1 mb-2 group-hover:text-[#E85D3D] transition-colors line-clamp-2">
                      {pkg.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 font-light">
                    {pkg.overview}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="pt-6 mt-6 border-t border-[var(--border-color)] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[var(--text-secondary)] block">Starting from</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold font-serif text-[var(--text-primary)]">
                        ₹{pkg.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{pkg.originalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEnquiryModal({ packageTitle: pkg.title, destination: pkg.destination })}
                  >
                    Enquire
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
