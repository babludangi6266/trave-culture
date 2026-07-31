import React from "react";
import { SEOHead } from "../components/common/SEOHead";
import { Container } from "../components/common/Container";
import { SectionHeading } from "../components/common/SectionHeading";
import { EnquiryForm } from "../components/forms/EnquiryForm";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Button } from "../components/common/Button";
import { openWhatsAppEnquiry } from "../lib/whatsapp";

export function Contact() {
  return (
    <>
      <SEOHead
        title="Contact Us & Plan Your Trip — Travel Culture"
        description="Get in touch with Travel Culture's concierge team via phone, email, or direct WhatsApp message. Plan your bespoke holiday today."
        canonical="/contact"
      />

      <main className="pt-28 pb-20 bg-[var(--bg)] min-h-screen">
        <Container>
          <SectionHeading
            eyebrow="Get In Touch"
            title="We'd Love To Plan Your Next Journey"
            subtitle="Send us an enquiry form or message us directly on WhatsApp for an instant response."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Info & WhatsApp Quick Card */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#0F3D3E] text-white p-8 md:p-10 rounded-3xl space-y-6 relative overflow-hidden">
                <h3 className="font-serif text-2xl font-bold text-[#F2B84B]">
                  Direct WhatsApp Concierge
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Skip the form and chat directly with our head travel designer on WhatsApp for instant assistance.
                </p>

                <Button
                  variant="accent"
                  size="lg"
                  className="w-full"
                  onClick={() => openWhatsAppEnquiry({ message: "Hi Travel Culture! I would like to enquire about holiday packages." })}
                  icon={MessageCircle}
                >
                  Start WhatsApp Chat
                </Button>
              </div>

              {/* Office Details */}
              <div className="bg-[var(--bg-surface)] p-8 rounded-3xl border border-[var(--border-color)] space-y-6">
                <h4 className="font-serif text-xl font-bold text-[var(--text-primary)]">
                  Head Office Details
                </h4>

                <div className="space-y-4 text-sm text-[var(--text-secondary)]">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-[#E85D3D] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[var(--text-primary)] font-semibold">Address</strong>
                      Level 4, Inner Circle, Connaught Place, New Delhi, India 110001
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-[#E85D3D] shrink-0" />
                    <div>
                      <strong className="block text-[var(--text-primary)] font-semibold">Phone</strong>
                      +91 99999 99999
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-[#E85D3D] shrink-0" />
                    <div>
                      <strong className="block text-[var(--text-primary)] font-semibold">Email</strong>
                      hello@travelculture.com
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-[#E85D3D] shrink-0" />
                    <div>
                      <strong className="block text-[var(--text-primary)] font-semibold">Working Hours</strong>
                      Mon - Sat: 9:30 AM - 7:30 PM (IST)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Enquiry Form */}
            <div className="lg:col-span-7">
              <EnquiryForm />
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
