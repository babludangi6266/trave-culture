import React from "react";
import { Link } from "react-router-dom";
import { Compass, Phone, Mail, MapPin } from "lucide-react";
import { Container } from "../common/Container";

export function Footer() {
  return (
    <footer className="bg-[#0F3D3E] text-white pt-16 pb-8 border-t border-[#185354]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#E85D3D] flex items-center justify-center text-white">
                <Compass className="w-6 h-6" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Travel <span className="text-[#F2B84B]">Culture</span>
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Crafting bespoke luxury travel experiences, handpicked holiday packages, and unforgettable journeys across India and international paradises.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* Instagram SVG */}
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#E85D3D] transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* Facebook SVG */}
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#E85D3D] transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              {/* Twitter SVG */}
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#E85D3D] transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#F2B84B] mb-5">Quick Links</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li><Link to="/destinations" className="hover:text-[#F2B84B] transition-colors">All Destinations</Link></li>
              <li><Link to="/packages" className="hover:text-[#F2B84B] transition-colors">Curated Packages</Link></li>
              <li><Link to="/about" className="hover:text-[#F2B84B] transition-colors">About Travel Culture</Link></li>
              <li><Link to="/gallery" className="hover:text-[#F2B84B] transition-colors">Travel Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-[#F2B84B] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 3: Top Destinations */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#F2B84B] mb-5">Top Destinations</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li><Link to="/destinations/kashmir" className="hover:text-[#F2B84B] transition-colors">Kashmir Tour Packages</Link></li>
              <li><Link to="/destinations/kerala" className="hover:text-[#F2B84B] transition-colors">Kerala Backwaters & Hills</Link></li>
              <li><Link to="/destinations/bali" className="hover:text-[#F2B84B] transition-colors">Bali Honeymoon Packages</Link></li>
              <li><Link to="/destinations/dubai" className="hover:text-[#F2B84B] transition-colors">Dubai Luxury Tour</Link></li>
              <li><Link to="/destinations/manali" className="hover:text-[#F2B84B] transition-colors">Manali Adventure Trip</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#F2B84B] mb-5">Contact Details</h3>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E85D3D] shrink-0 mt-0.5" />
                <span>Level 4, Connaught Place, New Delhi, India 110001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#E85D3D] shrink-0" />
                <span>+91 99999 99999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#E85D3D] shrink-0" />
                <span>hello@travelculture.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© {new Date().getFullYear()} Travel Culture. All Rights Reserved. Crafted for wanderlust travelers.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <a href="#terms" className="hover:underline">Terms of Service</a>
            <a href="#sitemap" className="hover:underline">Sitemap</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
