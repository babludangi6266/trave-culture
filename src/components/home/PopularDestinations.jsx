import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { SectionHeading } from "../common/SectionHeading";
import { Container } from "../common/Container";
import destinationsData from "../../data/destinations.json";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function PopularDestinations() {
  return (
    <section className="section-padding bg-[var(--bg)] relative">
      <Container>
        <SectionHeading
          eyebrow="Popular Destinations"
          title="Handpicked Paradises For You"
          subtitle="Explore our top travel hotspots curated with exclusive luxury stays, guided tours, and unforgettable scenery."
        />

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-14 !pt-2"
          >
            {destinationsData.map((dest) => (
              <SwiperSlide key={dest.id}>
                <Link
                  to={`/destinations/${dest.slug}`}
                  className="group relative block h-[420px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  {/* Background Image with Zoom */}
                  <img
                    src={dest.thumbnail}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-medium border border-white/20">
                    <Star className="w-3.5 h-3.5 fill-[#F2B84B] stroke-none" />
                    <span>{dest.rating}</span>
                    <span className="text-white/60">({dest.reviewsCount})</span>
                  </div>

                  {/* Bottom Info Content */}
                  <div className="absolute bottom-0 inset-x-0 p-6 z-10 text-white flex flex-col justify-end">
                    <span className="text-xs uppercase tracking-widest text-[#F2B84B] font-semibold mb-1">
                      {dest.idealDuration}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#F2B84B] transition-colors flex items-center justify-between">
                      <span>{dest.name}</span>
                      <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#F2B84B]" />
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-2 mt-2 font-light">
                      {dest.description}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}
