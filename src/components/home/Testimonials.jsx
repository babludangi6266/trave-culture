import React, { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Container } from "../common/Container";
import testimonialsData from "../../data/testimonials.json";

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Single testimonial card ── */
function TestimonialCard({ item, index, isInView }) {
  return (
    <motion.div
      className="group relative flex flex-col rounded-3xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 + index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Destination background photo (top strip) */}
      {item.destination_image && (
        <div className="relative h-36 overflow-hidden">
          <img
            src={item.destination_image}
            alt={item.trip}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Trip label */}
          <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-[#F2B84B]" />
            <span className="text-white text-xs font-semibold tracking-wide">{item.trip}</span>
          </div>

          {/* Big decorative quote */}
          <Quote className="absolute top-3 right-3 w-8 h-8 text-white/20" />
        </div>
      )}

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-6">
        {/* Stars */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(item.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#F2B84B] stroke-none" />
          ))}
        </div>

        {/* Comment */}
        <p className="text-[var(--text-primary)] text-sm md:text-base italic font-serif leading-relaxed flex-1 mb-6">
          "{item.comment}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-5 border-t border-[var(--border-color)]">
          <div className="relative shrink-0">
            <img
              src={item.avatar}
              alt={item.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#E85D3D]"
              loading="lazy"
            />
            {/* Verified badge */}
            <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#3C9A6E] rounded-full flex items-center justify-center">
              <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none">
                <path d="M2 5.5L4 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
          </div>
          <div>
            <p className="font-bold text-sm text-[var(--text-primary)]">{item.name}</p>
            <p className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5" />
              {item.location}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════ */

export function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

  // Mobile carousel state
  const [activeIndex, setActiveIndex] = useState(0);
  const prev = useCallback(() =>
    setActiveIndex((i) => (i - 1 + testimonialsData.length) % testimonialsData.length), []);
  const next = useCallback(() =>
    setActiveIndex((i) => (i + 1) % testimonialsData.length), []);

  const activeItem = testimonialsData[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-[var(--bg)] overflow-hidden"
    >
      <Container>
        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-14 max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E85D3D]/10 border border-[#E85D3D]/25 text-[#E85D3D] text-xs font-bold uppercase tracking-[0.2em] mb-5"
          >
            <Star className="w-3.5 h-3.5 fill-[#E85D3D] stroke-none" />
            Traveler Stories
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight mb-4"
          >
            Loved By Thousands of{" "}
            <span className="italic font-normal text-[#E85D3D]">Indian Explorers</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-[var(--text-secondary)] text-base md:text-lg font-light"
          >
            Real stories from real families, couples & adventurers who journeyed with us.
          </motion.p>
        </motion.div>

        {/* ── Desktop Grid (3 col) ── */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonialsData.map((item, i) => (
            <TestimonialCard key={item.id} item={item} index={i} isInView={isInView} />
          ))}
        </div>

        {/* ── Mobile Carousel ── */}
        <div className="md:hidden mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <TestimonialCard item={activeItem} index={0} isInView={true} />
            </motion.div>
          </AnimatePresence>

          {/* Mobile controls */}
          <div className="flex items-center justify-center gap-5 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[#E85D3D] hover:text-[#E85D3D] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIndex
                      ? "w-6 h-2 bg-[#E85D3D]"
                      : "w-2 h-2 bg-[var(--border-color)] hover:bg-[#E85D3D]/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[#E85D3D] hover:text-[#E85D3D] transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Aggregate rating bar ── */}
        <motion.div
          className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {/* Left: Big rating */}
          <div className="flex items-center gap-5">
            <div className="text-center">
              <div className="font-serif text-6xl font-bold text-[var(--text-primary)]">4.9</div>
              <div className="flex justify-center gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F2B84B] stroke-none" />
                ))}
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1">out of 5.0</p>
            </div>

            <div className="w-px h-16 bg-[var(--border-color)] hidden sm:block" />

            {/* Rating bars */}
            <div className="space-y-1.5 min-w-[180px]">
              {[
                { label: "5 stars", width: "90%", count: "16,200+" },
                { label: "4 stars", width: "8%", count: "1,440" },
                { label: "3 stars", width: "2%", count: "360" },
              ].map(({ label, width, count }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-xs text-[var(--text-secondary)] w-14 shrink-0">{label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-[var(--border-color)] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-[#F2B84B]"
                      initial={{ width: 0 }}
                      animate={isInView ? { width } : {}}
                      transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-xs text-[var(--text-secondary)] w-12 text-right shrink-0">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Platform badges */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-3">
            {[
              { platform: "Google", rating: "4.9 ★", reviews: "6,800+ reviews", color: "#4285F4" },
              { platform: "TripAdvisor", rating: "4.9 ★", reviews: "2,400+ reviews", color: "#34A853" },
              { platform: "Facebook", rating: "4.8 ★", reviews: "3,900+ reviews", color: "#1877F2" },
            ].map(({ platform, rating, reviews, color }) => (
              <div
                key={platform}
                className="flex flex-col items-center px-5 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg)] min-w-[110px] hover:shadow-md transition-shadow"
              >
                <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide mb-1">{platform}</span>
                <span className="font-serif text-lg font-bold" style={{ color }}>{rating}</span>
                <span className="text-[10px] text-[var(--text-secondary)] text-center">{reviews}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
