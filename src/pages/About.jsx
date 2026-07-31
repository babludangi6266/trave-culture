import React from "react";
import { SEOHead } from "../components/common/SEOHead";
import { Container } from "../components/common/Container";
import { SectionHeading } from "../components/common/SectionHeading";
import { WhyChooseUs } from "../components/home/WhyChooseUs";
import { Compass, Award, Users, Heart } from "lucide-react";

export function About() {
  return (
    <>
      <SEOHead
        title="About Travel Culture — Premium Travel Story & Mission"
        description="Learn about Travel Culture, our team of passionate travel architects, and our commitment to delivering unforgettable handcrafted luxury vacations."
        canonical="/about"
      />

      <main className="pt-28 pb-20 bg-[var(--bg)] min-h-screen">
        <Container>
          {/* Header */}
          <SectionHeading
            eyebrow="Our Story & Mission"
            title="Redefining Modern Travel With Restrained Luxury"
            subtitle="Founded with a passion for authentic exploration, Travel Culture bridges the gap between editorial magazine aesthetics and seamless personal concierge service."
          />

          {/* Story Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6 text-base md:text-lg leading-relaxed text-[var(--text-secondary)]">
              <h3 className="font-serif text-3xl font-bold text-[var(--text-primary)]">
                Crafting Bespoke Journeys Since 2014
              </h3>
              <p>
                At Travel Culture, we believe travel should be more than just visiting places — it should be an art form. Every houseboat stay in Kashmir, every tea garden walk in Munnar, and every private pool villa in Bali is hand-selected by our team of travel designers.
              </p>
              <p>
                We eliminate the stress of infinite web tabs, hidden surcharges, and impersonal booking bots. When you enquire with us, you speak directly to dedicated human concierges who tailor your itinerary down to the smallest detail.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80"
                alt="Travel Culture Journey"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </Container>

        <WhyChooseUs />
      </main>
    </>
  );
}
