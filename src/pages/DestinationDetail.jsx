import React from "react";
import { useParams, Link } from "react-router-dom";
import { SEOHead } from "../components/common/SEOHead";
import { Container } from "../components/common/Container";
import { Button } from "../components/common/Button";
import { Star, Clock, Calendar, CheckCircle2, PhoneCall, ArrowLeft } from "lucide-react";
import destinationsData from "../data/destinations.json";
import packagesData from "../data/packages.json";
import { PackageCard } from "../components/packages/PackageCard";
import { useEnquiry } from "../context/EnquiryContext";

export function DestinationDetail() {
  const { slug } = useParams();
  const { openEnquiryModal } = useEnquiry();
  const destination = destinationsData.find((d) => d.slug === slug);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 text-center">
        <Container>
          <h2 className="font-serif text-3xl font-bold mb-4">Destination Not Found</h2>
          <p className="mb-6">The requested destination does not exist or has been relocated.</p>
          <Button to="/destinations">Back to All Destinations</Button>
        </Container>
      </div>
    );
  }

  const relatedPackages = packagesData.filter(
    (p) => p.destinationSlug === destination.slug || p.destination.toLowerCase().includes(destination.name.toLowerCase())
  );

  return (
    <>
      <SEOHead
        title={`${destination.name} Tour Packages & Travel Guide`}
        description={destination.description}
        image={destination.heroImage}
        canonical={`/destinations/${destination.slug}`}
      />

      <main className="bg-[var(--bg)] min-h-screen pb-20">
        {/* Hero Section */}
        <section className="relative h-[65vh] min-h-[450px] flex items-end pb-16">
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

          <Container className="relative z-10 text-white">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 text-sm text-[#F2B84B] hover:underline mb-4 font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Destinations</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="bg-[#E85D3D] text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                {destination.category}
              </span>
              <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-[#F2B84B] stroke-none" />
                <span>{destination.rating} / 5</span>
              </div>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white mb-2">
              {destination.name}
            </h1>
            <p className="text-xl text-[#F2B84B] font-serif italic mb-6">
              "{destination.tagline}"
            </p>
          </Container>
        </section>

        {/* Overview & Quick Info */}
        <section className="py-12 bg-[var(--bg-surface)] border-b border-[var(--border-color)]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="font-serif text-2xl font-bold mb-4 text-[var(--text-primary)]">
                    About {destination.name}
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed text-[var(--text-secondary)]">
                    {destination.description}
                  </p>
                </div>

                {/* Highlights */}
                <div>
                  <h3 className="font-serif text-xl font-bold mb-4 text-[var(--text-primary)]">
                    Key Highlights & Experiences
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {destination.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-2xl bg-[var(--bg)] border border-[var(--border-color)]"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#E85D3D] shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-[var(--text-primary)]">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Quick Card */}
              <div className="bg-[var(--bg)] p-6 md:p-8 rounded-3xl border border-[var(--border-color)] shadow-sm space-y-6 h-fit">
                <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-4">
                  Quick Travel Guide
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#E85D3D]" />
                    <div>
                      <span className="text-xs text-[var(--text-secondary)] block">Best Season to Visit</span>
                      <span className="text-sm font-bold text-[var(--text-primary)]">{destination.bestTimeToVisit}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#E85D3D]" />
                    <div>
                      <span className="text-xs text-[var(--text-secondary)] block">Recommended Duration</span>
                      <span className="text-sm font-bold text-[var(--text-primary)]">{destination.idealDuration}</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  className="w-full"
                  size="md"
                  onClick={() => openEnquiryModal({ destination: destination.name })}
                  icon={PhoneCall}
                >
                  Plan Custom {destination.name} Trip
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Gallery */}
        <section className="section-padding bg-[var(--bg)]">
          <Container>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-[var(--text-primary)]">
              {destination.name} Photo Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destination.gallery.map((img, idx) => (
                <div key={idx} className="h-64 rounded-3xl overflow-hidden shadow-md group">
                  <img
                    src={img}
                    alt={`${destination.name} ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Related Packages */}
        {relatedPackages.length > 0 && (
          <section className="section-padding bg-[var(--bg-surface)] border-t border-[var(--border-color)]">
            <Container>
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-[var(--text-primary)]">
                Handcrafted {destination.name} Tour Packages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPackages.map((pkg) => (
                  <PackageCard key={pkg.id} packageData={pkg} />
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>
    </>
  );
}
