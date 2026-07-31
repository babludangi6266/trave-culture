import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Calendar, Compass, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "../common/Button";

/* ------------------------------------------------------------------ */
/*  Hero Slides — Popular Destinations, Scenes & Cultures              */
/* ------------------------------------------------------------------ */
const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=90",
    location: "Kashmir, India",
    tagline: "Paradise on Earth",
    description: "Snow-capped Himalayas, shikara boats on Dal Lake & saffron meadows",
    category: "🏔️ Mountain",
    accent: "#4A90D9",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1559628129-67cf63b72248?auto=format&fit=crop&w=2000&q=90",
    location: "Kerala, India",
    tagline: "God's Own Country",
    description: "Emerald backwaters, Kathakali dance & spice-scented hill stations",
    category: "🌿 Coastal",
    accent: "#3C9A6E",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2000&q=90",
    location: "Bali, Indonesia",
    tagline: "Island of the Gods",
    description: "Sacred temples, terraced rice paddies & vibrant Hindu ceremonies",
    category: "🛕 Culture",
    accent: "#E85D3D",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=90",
    location: "Dubai, UAE",
    tagline: "City of Superlatives",
    description: "Glittering skylines, desert safaris & futuristic architecture",
    category: "🌆 Luxury",
    accent: "#F2B84B",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=2000&q=90",
    location: "Rajasthan, India",
    tagline: "Land of Royal Splendor",
    description: "Majestic forts, vibrant festivals & regal desert camel caravans",
    category: "🏰 Heritage",
    accent: "#E85D3D",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=2000&q=90",
    location: "Thailand",
    tagline: "Land of Golden Temples",
    description: "Ornate wats, floating markets & pristine turquoise beaches",
    category: "🙏 Spiritual",
    accent: "#F2B84B",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&w=2000&q=90",
    location: "Maldives",
    tagline: "Where the Ocean Shines",
    description: "Overwater villas, crystal lagoons & the world's finest coral reefs",
    category: "🌊 Beach",
    accent: "#4A90D9",
  },
];

const INTERVAL = 5000; // 5 seconds per slide

/* ------------------------------------------------------------------ */

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isPaused, setIsPaused] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const goTo = useCallback(
    (index, dir = 1) => {
      setDirection(dir);
      setCurrent((index + SLIDES.length) % SLIDES.length);
    },
    []
  );

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  /* Auto-advance */
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(next, INTERVAL);
    return () => clearTimeout(timerRef.current);
  }, [current, isPaused, next]);

  const handleSearch = (e) => {
    e.preventDefault();
    let q = [];
    if (selectedDestination) q.push(`dest=${selectedDestination}`);
    if (selectedCategory) q.push(`category=${selectedCategory}`);
    navigate(`/packages${q.length ? `?${q.join("&")}` : ""}`);
  };

  const slide = SLIDES[current];

  /* Framer Motion variants */
  const imgVariants = {
    enter: (dir) => ({ opacity: 0, scale: 1.08, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, scale: 1, x: 0, transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (dir) => ({ opacity: 0, scale: 0.96, x: dir > 0 ? -60 : 60, transition: { duration: 0.8, ease: "easeIn" } }),
  };

  const textVariants = {
    enter: { opacity: 0, y: 40 },
    center: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* ── Slideshow Background ── */}
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={slide.id}
          className="absolute inset-0 z-0"
          custom={direction}
          variants={imgVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <img
            src={slide.image}
            alt={slide.location}
            className="w-full h-full object-cover"
            draggable={false}
          />
          {/* Multi-layer gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
          {/* Colored tint accent at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1.5"
            style={{ backgroundColor: slide.accent }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Slide Location Badge (top-left) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`badge-${slide.id}`}
          className="absolute top-28 left-6 sm:left-10 z-20 flex flex-col gap-2"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.4 } }}
          exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
        >
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm text-white border border-white/20"
            style={{ backgroundColor: `${slide.accent}30` }}
          >
            <span>{slide.category}</span>
          </span>
          <div className="flex items-center gap-2 text-white/80">
            <MapPin className="w-4 h-4 text-[#F2B84B]" />
            <span className="text-sm font-semibold tracking-wide">{slide.location}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Slide Counter (top-right) ── */}
      <div className="absolute top-28 right-6 sm:right-10 z-20 flex items-center gap-2 text-white/60 text-sm font-mono">
        <span className="text-white font-bold text-lg">{String(current + 1).padStart(2, "0")}</span>
        <span>/</span>
        <span>{String(SLIDES.length).padStart(2, "0")}</span>
      </div>

      {/* ── Slide Thumbnail Strip (right side, desktop) ── */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col gap-3">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className={`relative w-16 h-10 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
              i === current ? "border-white scale-110 shadow-xl" : "border-white/20 opacity-50 hover:opacity-80"
            }`}
          >
            <img src={s.image} alt={s.location} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* ── Hero Content (bottom area) ── */}
      <div className="relative z-10 pb-10 pt-32">
        <div className="container-custom">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold text-[#F2B84B] mb-5"
          >
            <Compass className="w-4 h-4" />
            <span>Curated Wanderlust Experiences</span>
          </motion.div>

          {/* Slide Headline */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${slide.id}`}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="mb-4"
            >
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white leading-tight max-w-4xl">
                {slide.tagline}
              </h1>
              <p className="mt-3 text-base sm:text-lg text-white/75 max-w-2xl font-light leading-relaxed">
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* ── Search / Filter Widget ── */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onSubmit={handleSearch}
            className="mt-8 bg-white/95 dark:bg-[#182121]/95 backdrop-blur-xl p-3 md:p-4 rounded-2xl md:rounded-full shadow-2xl border border-white/20 max-w-3xl text-[var(--text-primary)] flex flex-col md:flex-row gap-3 items-stretch md:items-center"
          >
            {/* Destination */}
            <div className="flex items-center gap-3 px-4 py-2 flex-1 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
              <MapPin className="w-5 h-5 text-[#E85D3D] shrink-0" />
              <div className="flex flex-col text-left w-full">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Destination</label>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="bg-transparent text-sm font-semibold focus:outline-none cursor-pointer w-full text-[var(--text-primary)]"
                >
                  <option value="">Where to?</option>
                  <option value="kashmir">Kashmir</option>
                  <option value="kerala">Kerala</option>
                  <option value="rajasthan">Rajasthan</option>
                  <option value="bali">Bali</option>
                  <option value="dubai">Dubai</option>
                  <option value="maldives">Maldives</option>
                  <option value="manali">Manali</option>
                  <option value="thailand">Thailand</option>
                </select>
              </div>
            </div>

            {/* Category */}
            <div className="flex items-center gap-3 px-4 py-2 flex-1 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
              <Calendar className="w-5 h-5 text-[#E85D3D] shrink-0" />
              <div className="flex flex-col text-left w-full">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent text-sm font-semibold focus:outline-none cursor-pointer w-full text-[var(--text-primary)]"
                >
                  <option value="">All Packages</option>
                  <option value="honeymoon">Honeymoon</option>
                  <option value="family">Family</option>
                  <option value="adventure">Adventure</option>
                  <option value="international">International</option>
                  <option value="domestic">Domestic</option>
                  <option value="group">Group Tour</option>
                  <option value="weekend">Weekend Getaway</option>
                </select>
              </div>
            </div>

            {/* CTA */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="rounded-full px-8 shrink-0 w-full md:w-auto"
              icon={Search}
            >
              Search
            </Button>
          </motion.form>

          {/* ── Slide Controls & Dots ── */}
          <div className="mt-8 flex items-center gap-6">
            {/* Prev / Next */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Previous slide"
                className="w-10 h-10 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-200 hover:scale-110 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next slide"
                className="w-10 h-10 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-200 hover:scale-110 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dot indicators with progress */}
            <div className="flex items-center gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  aria-label={`Go to slide ${i + 1}: ${s.location}`}
                  className={`rounded-full transition-all duration-500 cursor-pointer ${
                    i === current
                      ? "w-8 h-2 bg-white"
                      : "w-2 h-2 bg-white/35 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            {/* Pause / Play */}
            <button
              onClick={() => setIsPaused((p) => !p)}
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
              className="ml-auto w-8 h-8 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Progress Bar at very bottom ── */}
      {!isPaused && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
          <motion.div
            key={`progress-${slide.id}`}
            className="h-full"
            style={{ backgroundColor: slide.accent }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: INTERVAL / 1000, ease: "linear" }}
          />
        </div>
      )}

      {/* ── Scroll hint ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2 text-white/50">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-5 h-8 border border-white/25 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
