import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, ArrowRight, Clock } from "lucide-react";

export function DestinationCard({ destination }) {
  return (
    <Link
      to={`/destinations/${destination.slug}`}
      className="group relative block h-96 rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-[var(--bg-surface)]"
    >
      {/* Background Image */}
      <img
        src={destination.thumbnail}
        alt={destination.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      {/* Gradient Mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Rating Tag */}
      <div className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border border-white/20">
        <Star className="w-3.5 h-3.5 fill-[#F2B84B] stroke-none" />
        <span>{destination.rating}</span>
      </div>

      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10 bg-[#E85D3D] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
        {destination.category}
      </div>

      {/* Info Overlay */}
      <div className="absolute bottom-0 inset-x-0 p-6 z-10 text-white">
        <div className="flex items-center gap-1.5 text-xs text-[#F2B84B] font-semibold mb-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{destination.idealDuration}</span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#F2B84B] transition-colors flex items-center justify-between">
          <span>{destination.name}</span>
          <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#F2B84B]" />
        </h3>

        <p className="text-xs text-white/80 line-clamp-2 mt-2 font-light">
          {destination.description}
        </p>
      </div>
    </Link>
  );
}
