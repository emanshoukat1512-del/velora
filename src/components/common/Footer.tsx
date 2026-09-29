import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Compass, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#061321] text-slate-300 pt-20 pb-12 border-t border-[#18C8D8]/10 overflow-hidden">
      {/* Subtle background ambient glow & grid effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#18C8D8]/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#18C8D8_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Logo size="lg" light={true} />
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              VELORA is a luxury travel technology brand redefining global exploration. We engineer unforgettable journeys, combining cinematic discovery with bespoke concierge service.
            </p>
            <div className="flex items-center gap-4 text-xs tracking-wider text-[#D9A441] uppercase font-semibold">
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#18C8D8]" /> 84 Global Destinations
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#18C8D8]" /> 24/7 VIP Concierge
              </span>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/destinations" className="hover:text-[#18C8D8] transition">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-[#18C8D8] transition">
                  Travel Packages
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-[#18C8D8] transition">
                  Luxury Hotels
                </Link>
              </li>
              <li>
                <Link to="/experiences" className="hover:text-[#18C8D8] transition">
                  Curated Experiences
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations Column */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Destinations
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/destinations/turkey" className="hover:text-[#18C8D8] transition">
                  Turkey (Cappadocia & Istanbul)
                </Link>
              </li>
              <li>
                <Link to="/destinations/dubai" className="hover:text-[#18C8D8] transition">
                  Dubai & Emirates
                </Link>
              </li>
              <li>
                <Link to="/destinations/maldives" className="hover:text-[#18C8D8] transition">
                  Maldives Atolls
                </Link>
              </li>
              <li>
                <Link to="/destinations/switzerland" className="hover:text-[#18C8D8] transition">
                  Swiss Alps & Zermatt
                </Link>
              </li>
              <li>
                <Link to="/destinations/france" className="hover:text-[#18C8D8] transition">
                  Paris & French Riviera
                </Link>
              </li>
              <li>
                <Link to="/destinations/pakistan" className="hover:text-[#18C8D8] transition">
                  Pakistan (Hunza & K2)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              VIP Contact
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#18C8D8] shrink-0" />
                <a href="mailto:concierge@veloratravel.com" className="hover:text-white transition">
                  concierge@velora.luxury
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#18C8D8] shrink-0" />
                <span>+1 (800) 835-6721</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#18C8D8] shrink-0 mt-0.5" />
                <span>One World Trade Center, Suite 7800, New York & Dubai DIFC</span>
              </li>
            </ul>

            <div className="mt-5 pt-4 border-t border-white/10">
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-[#D9A441] hover:underline"
              >
                <span>Partner & Admin Portal</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} VELORA Global Luxury Travel Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-300 transition">
              About
            </Link>
            <Link to="/contact" className="hover:text-slate-300 transition">
              Contact
            </Link>
            <span className="cursor-pointer hover:text-slate-300 transition">
              Privacy Policy
            </span>
            <span className="cursor-pointer hover:text-slate-300 transition">
              Terms & Conditions
            </span>
            <span className="text-[#18C8D8]/80">See The World Differently</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
