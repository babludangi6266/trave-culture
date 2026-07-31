import React from "react";
import { SEOHead } from "../components/common/SEOHead";
import { Hero } from "../components/home/Hero";
import { PopularDestinations } from "../components/home/PopularDestinations";
import { FeaturedPackages } from "../components/home/FeaturedPackages";
import { WhyChooseUs } from "../components/home/WhyChooseUs";
import { Testimonials } from "../components/home/Testimonials";
import { InstagramStrip } from "../components/home/InstagramStrip";
import { CTABanner } from "../components/home/CTABanner";

export function Home() {
  return (
    <>
      <SEOHead
        title="Luxury Travel Agency & Curated Holiday Packages"
        description="Book handpicked travel packages, luxury houseboats in Kashmir & Kerala, tropical villas in Bali, and desert safaris in Dubai with Travel Culture."
        canonical="/"
      />

      <main>
        <Hero />
        <PopularDestinations />
        <FeaturedPackages />
        <WhyChooseUs />
        <Testimonials />
        <InstagramStrip />
        <CTABanner />
      </main>
    </>
  );
}
