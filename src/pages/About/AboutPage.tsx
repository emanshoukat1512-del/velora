import React from 'react';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Globe, Compass, ShieldCheck, Award, Sparkles, Plane } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#061321] text-white pt-24 pb-24">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-gradient-to-b from-[#071A2F] to-[#061321]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <Badge variant="gold" size="md">
            The VELORA Philosophy
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            SEE THE WORLD DIFFERENTLY
          </h1>
          <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            We built VELORA to bridge the gap between cinematic 3D exploration and hyper-personalized luxury expedition planning.
          </p>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#18C8D8]">
              Our Genesis
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Crafted for discerning explorers who crave authenticity without compromise.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Traditional travel agencies rely on outdated brochures and generic tour buses. At VELORA, we believe travel is an art form. Every itinerary we design begins with spatial exploration — understanding how geography, culture, and climate intersect.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              From our headquarters in New York and Dubai, our reconnaissance teams scout the globe to partner exclusively with 5-star heritage properties, Michelin-starred chefs, private yacht charters, and certified historians.
            </p>

            <div className="pt-4 flex items-center gap-6">
              <div>
                <span className="text-2xl font-bold text-white block">84+</span>
                <span className="text-xs text-slate-400">Territories Scouted</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <span className="text-2xl font-bold text-white block">100%</span>
                <span className="text-xs text-slate-400">Carbon Offset Expeditions</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <span className="text-2xl font-bold text-white block">24 / 7</span>
                <span className="text-xs text-slate-400">Concierge Desk</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"
                alt="VELORA Global Exploration"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061321] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#061321]/80 backdrop-blur-md border border-white/10">
                <span className="text-xs font-bold text-[#D9A441] block">
                  "Travel is the only expense that enriches your legacy."
                </span>
                <span className="text-[11px] text-slate-400">VELORA Founders Council</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#040E19] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="cyan" size="md" className="mb-3">
              Core Principles
            </Badge>
            <h2 className="text-3xl font-extrabold text-white">
              The Four Pillars of VELORA
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#071A2F] p-8 rounded-3xl border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#18C8D8]/10 border border-[#18C8D8]/30 flex items-center justify-center text-[#18C8D8]">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Spatial Intelligence</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We leverage cinematic 3D mapping to visualize sunlight angles, flight routes, and elevation profiles before your journey begins.
              </p>
            </div>

            <div className="bg-[#071A2F] p-8 rounded-3xl border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D9A441]/10 border border-[#D9A441]/30 flex items-center justify-center text-[#D9A441]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Uncompromising Luxury</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Never second-tier. We only book premier suites, private chartered transport, and VIP fast-track airport clearances.
              </p>
            </div>

            <div className="bg-[#071A2F] p-8 rounded-3xl border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#18C8D8]/10 border border-[#18C8D8]/30 flex items-center justify-center text-[#18C8D8]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Guaranteed Transparency</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Zero hidden booking markups or unexpected resort surprises. All tariffs and terms are presented in pristine clarity.
              </p>
            </div>

            <div className="bg-[#071A2F] p-8 rounded-3xl border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Authentic Immersion</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Meet native historians, access closed monument salons, and dine in centuries-old private estates away from crowded tourist trails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-white">
          Begin your journey with VELORA today.
        </h2>
        <div className="flex items-center justify-center gap-4">
          <Button to="/destinations" variant="primary" size="md">
            Explore Destinations
          </Button>
          <Button to="/booking" variant="gold" size="md" icon={<Plane className="w-4 h-4" />}>
            Book a Journey
          </Button>
        </div>
      </section>
    </div>
  );
};
