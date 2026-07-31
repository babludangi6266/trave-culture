import React from "react";
import { Link } from "react-router-dom";
import { Clock, Star, ArrowRight, Tag } from "lucide-react";
import { Button } from "../common/Button";
import { useEnquiry } from "../../context/EnquiryContext";

export function PackageCard({ packageData }) {
  const { openEnquiryModal } = useEnquiry();

  return (
    <div className="group bg-[var(--bg-surface)] rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between h-full">
      {/* Top Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={packageData.image}
          alt={packageData.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Discount Badge */}
        {packageData.discount && (
          <div className="absolute top-4 left-4 bg-[#E85D3D] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
            {packageData.discount}
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-[#F2B84B] stroke-none" />
          <span>{packageData.rating}</span>
        </div>

        {/* Duration */}
        <div className="absolute bottom-4 left-4 text-white text-xs font-medium flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-md">
          <Clock className="w-3.5 h-3.5 text-[#F2B84B]" />
          <span>{packageData.duration}</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-xs uppercase font-bold text-[#E85D3D] tracking-wider">
            {packageData.destination}
          </span>
          <Link to={`/packages/${packageData.slug}`}>
            <h3 className="font-serif text-xl font-bold mt-1 mb-2 group-hover:text-[#E85D3D] transition-colors line-clamp-2">
              {packageData.title}
            </h3>
          </Link>
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 font-light">
            {packageData.overview}
          </p>
        </div>

        {/* Footer Price & Action */}
        <div className="pt-6 mt-6 border-t border-[var(--border-color)] flex items-center justify-between">
          <div>
            <span className="text-xs text-[var(--text-secondary)] block">Starting from</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-serif text-[var(--text-primary)]">
                ₹{packageData.price.toLocaleString("en-IN")}
              </span>
              {packageData.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{packageData.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => openEnquiryModal({ packageTitle: packageData.title, destination: packageData.destination })}
          >
            Enquire
          </Button>
        </div>
      </div>
    </div>
  );
}
