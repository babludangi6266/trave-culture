import React from "react";
import { useParams, Link } from "react-router-dom";
import { SEOHead } from "../components/common/SEOHead";
import { Container } from "../components/common/Container";
import { Button } from "../components/common/Button";
import { ItineraryAccordion } from "../components/packages/ItineraryAccordion";
import { Star, Clock, CheckCircle2, XCircle, PhoneCall, ArrowLeft, ShieldCheck } from "lucide-react";
import packagesData from "../data/packages.json";
import { getPackageProductSchema } from "../lib/seo";
import { useEnquiry } from "../context/EnquiryContext";

export function PackageDetail() {
  const { slug } = useParams();
  const { openEnquiryModal } = useEnquiry();
  const pkg = packagesData.find((p) => p.slug === slug);

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 text-center">
        <Container>
          <h2 className="font-serif text-3xl font-bold mb-4">Package Not Found</h2>
          <p className="mb-6">The requested package could not be located.</p>
          <Button to="/packages">Back to All Packages</Button>
        </Container>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${pkg.title} (${pkg.duration})`}
        description={pkg.overview}
        image={pkg.image}
        canonical={`/packages/${pkg.slug}`}
        schema={getPackageProductSchema(pkg)}
      />

      <main className="bg-[var(--bg)] min-h-screen pb-20">
        {/* Package Header / Banner */}
        <section className="relative h-[60vh] min-h-[400px] flex items-end pb-12">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

          <Container className="relative z-10 text-white">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 text-sm text-[#F2B84B] hover:underline mb-4 font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tour Packages</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="bg-[#E85D3D] text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                {pkg.destination}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-semibold">
                {pkg.categoryLabel || pkg.category}
              </span>
              <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-[#F2B84B] stroke-none" />
                <span>{pkg.rating} ({pkg.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              {pkg.title}
            </h1>

            <div className="flex items-center gap-4 text-sm font-medium text-white/90">
              <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-md">
                <Clock className="w-4 h-4 text-[#F2B84B]" />
                {pkg.duration}
              </span>
            </div>
          </Container>
        </section>

        {/* Content & Sticky Sidebar */}
        <section className="pt-12">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Main Details */}
              <div className="lg:col-span-2 space-y-12">
                {/* Overview */}
                <div className="bg-[var(--bg-surface)] p-8 rounded-3xl border border-[var(--border-color)]">
                  <h2 className="font-serif text-2xl font-bold mb-4 text-[var(--text-primary)]">
                    Trip Overview
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed text-[var(--text-secondary)]">
                    {pkg.overview}
                  </p>
                </div>

                {/* Highlights */}
                <div className="bg-[var(--bg-surface)] p-8 rounded-3xl border border-[var(--border-color)]">
                  <h3 className="font-serif text-xl font-bold mb-6 text-[var(--text-primary)]">
                    Package Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pkg.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-[var(--bg)] rounded-xl border border-[var(--border-color)]">
                        <CheckCircle2 className="w-5 h-5 text-[#E85D3D] shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-[var(--text-primary)]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Day by Day Itinerary */}
                <div className="bg-[var(--bg-surface)] p-8 rounded-3xl border border-[var(--border-color)]">
                  <h3 className="font-serif text-2xl font-bold mb-6 text-[var(--text-primary)]">
                    Day-by-Day Itinerary
                  </h3>
                  <ItineraryAccordion itinerary={pkg.itinerary} />
                </div>

                {/* Inclusions & Exclusions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[var(--bg-surface)] p-6 md:p-8 rounded-3xl border border-[var(--border-color)]">
                    <h4 className="font-serif text-lg font-bold mb-4 text-[#3C9A6E] flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>What's Included</span>
                    </h4>
                    <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                      {pkg.inclusions.map((inc, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3C9A6E] mt-2 shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[var(--bg-surface)] p-6 md:p-8 rounded-3xl border border-[var(--border-color)]">
                    <h4 className="font-serif text-lg font-bold mb-4 text-red-500 flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      <span>What's Excluded</span>
                    </h4>
                    <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                      {pkg.exclusions.map((exc, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Sticky Booking Sidebar */}
              <div className="space-y-6">
                <div className="bg-[var(--bg-surface)] p-8 rounded-3xl border border-[var(--border-color)] shadow-lg sticky top-28 space-y-6">
                  <div className="pb-6 border-b border-[var(--border-color)]">
                    <span className="text-xs uppercase font-semibold text-[var(--text-secondary)] block">
                      Starting Package Price
                    </span>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="font-serif text-4xl font-bold text-[var(--text-primary)]">
                        ₹{pkg.price.toLocaleString("en-IN")}
                      </span>
                      {pkg.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{pkg.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#3C9A6E] font-bold block mt-1">
                      Per person on twin-sharing basis
                    </span>
                  </div>

                  <div className="space-y-3">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onClick={() => openEnquiryModal({ packageTitle: pkg.title, destination: pkg.destination })}
                      icon={PhoneCall}
                    >
                      Enquire via WhatsApp
                    </Button>
                    <p className="text-[11px] text-center text-[var(--text-secondary)]">
                      Fill quick form and send details straight to our WhatsApp concierge.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[var(--border-color)] space-y-3 text-xs text-[var(--text-secondary)]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#3C9A6E]" />
                      <span>100% Price & Quality Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#3C9A6E]" />
                      <span>Zero Hidden Charges & Transparent Billing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
