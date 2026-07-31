import React, { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  MessageCircle,
  Compass,
  Star,
  MapPin,
  ArrowRight,
  Plane,
  Shield,
  Clock,
  HeartHandshake,
} from "lucide-react";
import { Container } from "../common/Container";
import { Button } from "../common/Button";
import { useEnquiry } from "../../context/EnquiryContext";

/* ── Floating destination cards data ── */
const FLOATING_CARDS = [
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80",
    place: "Kashmir",
    price: "₹18,999",
    rating: "4.9",
    top: "8%",
    left: "2%",
    delay: 0,
    rotate: -6,
  },
  {
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80",
    place: "Bali",
    price: "₹45,999",
    rating: "4.8",
    top: "55%",
    left: "0%",
    delay: 0.15,
    rotate: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80",
    place: "Dubai",
    price: "₹62,999",
    rating: "4.7",
    top: "10%",
    right: "2%",
    delay: 0.1,
    rotate: 7,
  },
  {
    image: "https://images.unsplash.com/photo-1559628129-67cf63b72248?auto=format&fit=crop&w=400&q=80",
    place: "Kerala",
    price: "₹22,499",
    rating: "4.9",
    top: "58%",
    right: "0%",
    delay: 0.2,
    rotate: -4,
  },
];

/* ── Trust indicators ── */
const TRUST_ITEMS = [
  { icon: Shield, label: "100% Safe & Trusted", value: "Since 2015" },
  { icon: Plane, label: "Trips Organised", value: "5,000+" },
  { icon: HeartHandshake, label: "Happy Travellers", value: "18,000+" },
  { icon: Clock, label: "Response Time", value: "< 10 mins" },
];

/* ── Stagger container ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ── Magnetic hover helper ── */
function MagneticCard({ children, className, style, rotate }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.2);
    y.set((e.clientY - cy) * 0.2);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY, rotate, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */

export function CTABanner() {
  const { openEnquiryModal } = useEnquiry();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-36"
      style={{
        background: "linear-gradient(135deg, #0a1a1a 0%, #0F3D3E 35%, #1a2a1a 60%, #0E1414 100%)",
      }}
    >
      {/* ── Animated background blobs ── */}
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,93,61,0.18) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(242,184,75,0.14) 0%, transparent 70%)" }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(15,61,62,0.5) 0%, transparent 65%)" }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* ── Grid lines texture ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Floating destination mini-cards (desktop) ── */}
      {FLOATING_CARDS.map((card, i) => (
        <motion.div
          key={card.place}
          className="absolute hidden lg:block z-10"
          style={{
            top: card.top,
            left: card.left,
            right: card.right,
            width: 140,
          }}
          initial={{ opacity: 0, y: 60, rotate: card.rotate }}
          animate={isInView ? { opacity: 1, y: 0, rotate: card.rotate } : {}}
          transition={{ duration: 0.9, delay: 0.4 + card.delay, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagneticCard rotate={card.rotate}>
            <motion.div
              className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
              whileHover={{ scale: 1.08, rotate: 0, transition: { duration: 0.3 } }}
              animate={{ y: [0, -8, 0] }}
              transition={{
                y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 },
              }}
            >
              <img
                src={card.image}
                alt={card.place}
                className="w-full h-20 object-cover"
              />
              <div className="p-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-xs font-bold">{card.place}</span>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-[#F2B84B] stroke-none" />
                    <span className="text-[#F2B84B] text-[10px] font-semibold">{card.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 text-[#E85D3D]" />
                  <span className="text-white/60 text-[10px]">from {card.price}</span>
                </div>
              </div>
            </motion.div>
          </MagneticCard>
        </motion.div>
      ))}

      {/* ── Main content ── */}
      <Container className="relative z-20 max-w-3xl text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Eyebrow pill */}
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#E85D3D]/40 bg-[#E85D3D]/10 text-[#F2B84B] text-xs font-bold uppercase tracking-[0.2em]">
              <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "8s" }} />
              Start Your Journey
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeUp}>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-2">
              Ready for Your Next{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(90deg, #F2B84B, #E85D3D, #F2B84B)", backgroundSize: "200%" }}>
                  <AnimatedGradientText>Unforgettable</AnimatedGradientText>
                </span>
              </span>
            </h2>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-8">
              Wanderlust Journey?
            </h2>
          </motion.div>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-white/65 text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed mb-10"
          >
            Get a <strong className="text-white font-semibold">personalized custom itinerary</strong> directly on WhatsApp within 10 minutes. No bots — talk to our real human travel designers!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            {/* Primary WhatsApp CTA */}
            <motion.button
              onClick={() => openEnquiryModal()}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base text-[#1A1A1A] overflow-hidden cursor-pointer shadow-xl"
              style={{ background: "linear-gradient(135deg, #F2B84B 0%, #E8A020 100%)" }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Shine sweep */}
              <motion.span
                className="absolute inset-0 bg-white/25 -skew-x-12 -translate-x-full"
                whileHover={{ x: "250%" }}
                transition={{ duration: 0.5 }}
              />
              <MessageCircle className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Chat With Travel Designer</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Secondary */}
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button variant="ghost" size="lg" to="/packages"
                className="border border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full"
              >
                Browse All Packages
              </Button>
            </motion.div>
          </motion.div>

          {/* ── Trust stat bar ── */}
          <motion.div
            variants={fadeScale}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10"
          >
            {TRUST_ITEMS.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                className="flex flex-col items-center gap-2 py-5 px-4 bg-white/5 hover:bg-white/10 transition-colors duration-300 cursor-default"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
              >
                <Icon className="w-5 h-5 text-[#F2B84B]" />
                <span className="text-white font-bold text-xl font-serif">{value}</span>
                <span className="text-white/50 text-xs text-center leading-tight">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {/* ── Decorative bottom wave ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z"
            fill="var(--bg)"
            fillOpacity="0.15"
          />
        </svg>
      </div>
    </section>
  );
}

/* ── Animated gradient text with motion ── */
function AnimatedGradientText({ children }) {
  return (
    <motion.span
      style={{
        backgroundImage: "linear-gradient(90deg, #F2B84B 0%, #E85D3D 50%, #F2B84B 100%)",
        backgroundSize: "200%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        display: "inline",
      }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.span>
  );
}
