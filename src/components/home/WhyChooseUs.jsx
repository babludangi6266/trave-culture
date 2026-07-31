import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Award, ShieldCheck, Headset, Sparkles,
  Clock, ThumbsUp, Star, CheckCircle2,
} from "lucide-react";
import { Container } from "../common/Container";

/* ── Feature cards ── */
const FEATURES = [
  {
    icon: Award,
    title: "Handpicked Luxury Stays",
    description:
      "We personally vet every hotel, resort, and floating houseboat for impeccable hygiene, panoramic views, and world-class service.",
    color: "#E85D3D",
    bg: "from-[#E85D3D]/15 to-[#E85D3D]/5",
    border: "border-[#E85D3D]/25",
  },
  {
    icon: ShieldCheck,
    title: "Best Price Guarantee",
    description:
      "Direct tie-ups with ground operators ensure premium travel luxury at competitive, fully transparent rates — zero hidden charges.",
    color: "#3C9A6E",
    bg: "from-[#3C9A6E]/15 to-[#3C9A6E]/5",
    border: "border-[#3C9A6E]/25",
  },
  {
    icon: Headset,
    title: "24/7 Dedicated Concierge",
    description:
      "A personal travel designer is assigned on WhatsApp — from flight takeoff to hotel check-in, we're always one text away.",
    color: "#4A90D9",
    bg: "from-[#4A90D9]/15 to-[#4A90D9]/5",
    border: "border-[#4A90D9]/25",
  },
  {
    icon: Sparkles,
    title: "Tailor-Made Itineraries",
    description:
      "Customized down to every meal and moment — romantic candle-lit dinners, thrilling adventures, or relaxed family leisure.",
    color: "#F2B84B",
    bg: "from-[#F2B84B]/15 to-[#F2B84B]/5",
    border: "border-[#F2B84B]/25",
  },
  {
    icon: Clock,
    title: "Fast 10-Min Response",
    description:
      "No waiting on hold. Send us a WhatsApp message and receive a fully personalized travel plan within 10 minutes — guaranteed.",
    color: "#9B59B6",
    bg: "from-[#9B59B6]/15 to-[#9B59B6]/5",
    border: "border-[#9B59B6]/25",
  },
  {
    icon: ThumbsUp,
    title: "18,000+ Happy Travellers",
    description:
      "A decade of crafting joyful journeys for Indian families, honeymooners, adventurers, and solo explorers across the globe.",
    color: "#E85D3D",
    bg: "from-[#E85D3D]/15 to-[#E85D3D]/5",
    border: "border-[#E85D3D]/25",
  },
];

/* ── Stats ── */
const STATS = [
  { value: "12+", label: "Years of Excellence" },
  { value: "18,000+", label: "Happy Travellers" },
  { value: "180+", label: "Curated Packages" },
  { value: "4.9/5", label: "Average Rating" },
];

/* ── Promise checklist ── */
const PROMISES = [
  "Zero hidden charges, ever",
  "Fully licensed & IATA-accredited",
  "Emergency 24/7 travel support",
  "Group & family discounts available",
  "Visa assistance included",
  "Instant WhatsApp itinerary",
];

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ══════════════════════════════════════════════════════════════════ */

export function WhyChooseUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background: "linear-gradient(160deg, #0a1f1f 0%, #0F3D3E 40%, #091818 100%)",
      }}
    >
      {/* ── Background mesh dots ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(#F2B84B 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Glowing orbs ── */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(242,184,75,0.08) 0%, transparent 65%)" }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,93,61,0.1) 0%, transparent 65%)" }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <Container className="relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F2B84B]/30 bg-[#F2B84B]/10 text-[#F2B84B] text-xs font-bold uppercase tracking-[0.2em] mb-5"
          >
            <Star className="w-3.5 h-3.5 fill-[#F2B84B] stroke-none" />
            The Travel Culture Promise
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-5"
          >
            Why Discriminating Travelers{" "}
            <span className="text-[#F2B84B] italic font-normal">Choose Us</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-white/60 text-lg font-light leading-relaxed">
            We don't just book trips — we craft{" "}
            <span className="text-white font-medium">lifelong memories</span>, with perfection
            down to every single detail.
          </motion.p>
        </motion.div>

        {/* ── Main 2-Column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start mb-20">

          {/* Left: Feature Cards 3-col grid ── */}
          <motion.div
            className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`relative group p-6 rounded-2xl border bg-gradient-to-br ${feat.bg} ${feat.border} backdrop-blur-sm overflow-hidden cursor-default`}
                >
                  {/* Glow on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${feat.color}18 0%, transparent 60%)` }}
                  />

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 shrink-0"
                    style={{ backgroundColor: `${feat.color}20`, border: `1px solid ${feat.color}35` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: feat.color }} />
                  </div>

                  <h3 className="font-serif text-base font-bold text-white mb-2 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-white/55 text-sm font-light leading-relaxed">
                    {feat.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right: Promise panel + image ── */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Photo collage card */}
            <div className="relative rounded-3xl overflow-hidden h-52 sm:h-64">
              <img
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=85"
                alt="Travel Culture happy travelers"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-4 py-2">
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=60&q=80",
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=60&q=80",
                    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=60&q=80",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="traveler"
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <div>
                  <div className="text-white text-xs font-bold">18,000+ Travelers</div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-[#F2B84B] stroke-none" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Promises checklist */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h4 className="font-serif text-[#F2B84B] text-base font-bold mb-4">
                Our Commitment to You
              </h4>
              <ul className="space-y-3">
                {PROMISES.map((promise, i) => (
                  <motion.li
                    key={promise}
                    className="flex items-center gap-3 text-white/75 text-sm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#3C9A6E] shrink-0" />
                    {promise}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* ── Stats Bar ── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          {STATS.map(({ value, label }, i) => (
            <motion.div
              key={label}
              className="flex flex-col items-center justify-center gap-1 py-8 px-4 bg-white/[0.04] hover:bg-white/[0.08] transition-colors duration-300 cursor-default text-center"
              whileHover={{ y: -3 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
            >
              <span className="font-serif text-4xl md:text-5xl font-bold text-[#F2B84B]">
                {value}
              </span>
              <span className="text-white/50 text-xs uppercase tracking-widest font-medium mt-1">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
