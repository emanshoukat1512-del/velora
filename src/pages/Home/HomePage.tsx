import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobeCanvas } from '../../3d/scenes/GlobeCanvas';
import { HeroBackgroundSlider } from '../../components/home/HeroBackgroundSlider';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { mockDestinations, mockPackages, mockExperiences } from '../../data/mockData';
import { DestinationCard } from '../../components/cards/DestinationCard';
import { PackageCard } from '../../components/cards/PackageCard';
import { ExperienceCard } from '../../components/cards/ExperienceCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import {
  ArrowRight,
  ShieldCheck,
  Star,
  Play,
  X,
  Sparkles,
  Plane,
  ChevronDown
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const scrollProgress = useScrollProgress();
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeStoryDestination, setActiveStoryDestination] = useState<string>('turkey');

  const storyDestinations = [
    { slug: 'turkey', name: 'Turkey', label: 'Cappadocia Valleys & Bosphorus' },
    { slug: 'dubai', name: 'Dubai', label: 'Futuristic Skyline & Crimson Dunes' },
    { slug: 'maldives', name: 'Maldives', label: 'Bioluminescent Overwater Atolls' },
    { slug: 'switzerland', name: 'Switzerland', label: 'Alpine Peaks & Panoramic Glaciers' },
    { slug: 'pakistan', name: 'Pakistan', label: 'Karakoram High Passes & Hunza' },
    { slug: 'france', name: 'Paris', label: 'Haute Couture & Seine Twilight' }
  ];

  const currentDestinationData =
    mockDestinations.find((d) => d.slug === activeStoryDestination) || mockDestinations[0];

  // Subtle hero parallax offset derived smoothly from scroll
  const heroParallaxY = scrollProgress * 120;

  return (
    <div className="relative bg-[#061321] text-white overflow-hidden">
      {/* ====================================================
          SECTION 1 & 2: CINEMATIC 3D EARTH HERO WITH ROTATING DESTINATION BACKGROUND
      ==================================================== */}
      <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Cinematic Animated Rotating Destination Background */}
        <HeroBackgroundSlider scrollProgress={scrollProgress} />

        {/* Three.js 3D Canvas Background with subtle parallax */}
        <div
          className="absolute inset-0 z-[2] opacity-90 will-change-transform pointer-events-none"
          style={{ transform: `translate3d(0, ${heroParallaxY * 0.4}px, 0)` }}
        >
          <div className="w-full h-full pointer-events-auto">
            <GlobeCanvas
              scrollProgress={scrollProgress}
              onSelectDestination={(slug) => setActiveStoryDestination(slug)}
            />
          </div>
        </div>

        {/* Hero Content with Smooth Entrance Motion */}
        <div className="relative z-20 max-w-4xl mx-auto text-center mt-8 sm:mt-16 pointer-events-none">
          {/* Badge Reveal */}
          <div className="animate-fadeIn inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#18C8D8]/30 backdrop-blur-md mb-6 pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-[#18C8D8] animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-[#18C8D8] font-bold">
              Autonomous Global Exploration
            </span>
          </div>

          {/* Heading with Elegant Slide/Fade */}
          <h1
            style={{ animationDuration: '0.9s', animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            className="animate-fadeIn text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] mb-6 font-sans will-change-transform"
          >
            SEE THE WORLD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2E8F0] to-[#18C8D8]">
              DIFFERENTLY
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{ animationDuration: '1.1s', animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            className="animate-fadeIn text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-10"
          >
            Discover extraordinary destinations, unforgettable bespoke experiences, and journeys meticulously designed around you.
          </p>

          {/* Hero CTAs */}
          <div
            style={{ animationDuration: '1.2s' }}
            className="animate-fadeIn flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
          >
            <Button
              to="/destinations"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Destinations
            </Button>

            <Button
              to="/booking"
              variant="gold"
              size="lg"
              icon={<Plane className="w-4 h-4" />}
            >
              Book Your Journey
            </Button>

            <button
              onClick={() => setVideoModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 transition duration-300"
            >
              <div className="w-7 h-7 rounded-full bg-[#18C8D8]/20 flex items-center justify-center text-[#18C8D8]">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <span>Watch Experience</span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-20 text-center pointer-events-none">
          <div className="inline-flex flex-col items-center gap-2 text-slate-400">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-[#18C8D8]">
              Scroll to begin journey
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#18C8D8]" />
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 3: 3D INTERACTIVE STORYTELLING HIGHLIGHT
      ==================================================== */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-gradient-to-b from-[#061321] via-[#071A2F]/90 to-[#061321]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal variant="fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <Badge variant="cyan" size="md" className="mb-3">
                  Curated Storytelling
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Where will you go next?
                </h2>
                <p className="text-slate-400 text-sm mt-2 max-w-xl">
                  The globe spins to your command. Select an anchor destination below to preview signature highlights and private flight pairings.
                </p>
              </div>

              <Link
                to="/destinations"
                className="inline-flex items-center gap-2 text-sm text-[#18C8D8] hover:text-white transition font-medium group"
              >
                <span>View All 84 Destinations</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Destination Selector Tabs */}
          <ScrollReveal variant="fade-in" delay={100}>
            <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
              {storyDestinations.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => setActiveStoryDestination(item.slug)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 border ${
                    activeStoryDestination === item.slug
                      ? 'bg-[#18C8D8] text-[#071A2F] border-[#18C8D8] shadow-lg shadow-[#18C8D8]/20'
                      : 'bg-[#071A2F] text-slate-300 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Active Story Spotlight Card with Scale-in */}
          <ScrollReveal variant="scale-in" delay={150}>
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#071A2F] shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
              {/* Visual Preview */}
              <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden bg-[#061321]">
                <img
                  src={currentDestinationData.heroImage}
                  alt={currentDestinationData.name}
                  className="w-full h-full object-cover transition-all duration-700 ease-out hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2F] via-transparent to-transparent lg:hidden" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#071A2F] hidden lg:block" />
              </div>

              {/* Details Column */}
              <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-widest text-[#D9A441] font-bold">
                      {currentDestinationData.country}
                    </span>
                    <span className="text-xs text-slate-400">
                      From ${currentDestinationData.startingPrice}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {currentDestinationData.name}
                  </h3>
                  <p className="text-sm text-[#18C8D8] font-medium mb-4 italic">
                    "{currentDestinationData.tagline}"
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {currentDestinationData.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-6 space-y-2">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                      Signature Inclusions:
                    </span>
                    {currentDestinationData.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                        <Sparkles className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <Button
                    to={`/destinations/${currentDestinationData.slug}`}
                    variant="primary"
                    size="md"
                  >
                    Explore Destination
                  </Button>
                  <Link
                    to={`/booking`}
                    className="text-xs font-semibold text-[#D9A441] hover:underline"
                  >
                    Instant Reservation →
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ====================================================
          SECTION 4: FEATURED DESTINATIONS (STAGGERED REVEAL)
      ==================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal variant="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="gold" size="md" className="mb-3">
              Handpicked Paradises
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Destinations Worth Remembering
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every destination is selected by our global reconnaissance teams for culture, serenity, and architectural prestige.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockDestinations.slice(0, 6).map((dest, idx) => (
            <DestinationCard key={dest.id} destination={dest} index={idx} />
          ))}
        </div>
      </section>

      {/* ====================================================
          SECTION 5: FEATURED TRAVEL PACKAGES (STAGGERED)
      ==================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#040E19] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal variant="fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <Badge variant="cyan" size="md" className="mb-3">
                  All-Inclusive Journeys
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Bespoke Travel Packages
                </h2>
                <p className="text-slate-400 text-sm mt-2 max-w-lg">
                  Complete itineraries with 5-star suites, private guides, domestic transfers, and priority monument admissions.
                </p>
              </div>

              <Button
                to="/packages"
                variant="outline"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Browse All Packages
              </Button>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPackages.map((pkg, idx) => (
              <PackageCard key={pkg.id} pkg={pkg} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 6: SIGNATURE EXPERIENCES
      ==================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal variant="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="gold" size="md" className="mb-3">
              Moments That Transcend
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Curated Rare Experiences
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              From dawn hot air ballooning in Cappadocia to after-hours tours of the Louvre and private Arabian desert dune dinners.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockExperiences.slice(0, 3).map((exp, idx) => (
            <ExperienceCard key={exp.id} experience={exp} index={idx} />
          ))}
        </div>
      </section>

      {/* ====================================================
          SECTION 7: TRUST & BOOKING CALL-TO-ACTION
      ==================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-r from-[#071A2F] via-[#086A9A]/30 to-[#071A2F] border-t border-white/10">
        <ScrollReveal variant="fade-up">
          <div className="max-w-5xl mx-auto relative z-10 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D9A441]/15 text-[#D9A441] border border-[#D9A441]/30 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Guaranteed Luxury & Transparent Pricing</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Ready to experience travel <br />
              without compromise?
            </h2>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              Reserve your bespoke journey with VELORA. Our 24/7 private concierge coordinates your itinerary, transfers, and accommodations from touchdown to departure.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                to="/booking"
                variant="gold"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Start Your Booking
              </Button>
              <Button
                to="/contact"
                variant="glass"
                size="lg"
              >
                Speak to a Travel Curator
              </Button>
            </div>

            {/* Social Proof Stats */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">4.98 / 5</div>
                <div className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#D9A441] text-[#D9A441]" />
                  <span>Client Rating</span>
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">100%</div>
                <div className="text-xs text-slate-400 mt-1">Verified 5-Star Partners</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">84+</div>
                <div className="text-xs text-slate-400 mt-1">Global Destinations</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">24 / 7</div>
                <div className="text-xs text-slate-400 mt-1">Personal VIP Concierge</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Video Modal Demo */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#071A2F] border border-[#18C8D8]/30 rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="text-sm font-semibold text-white">VELORA Cinematic Reel</span>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-full bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=80"
                alt="Cinematic Video Preview"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#18C8D8]/20 border border-[#18C8D8] flex items-center justify-center mb-4 text-[#18C8D8] animate-pulse">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
                <h4 className="text-xl font-bold text-white">VELORA: SEE THE WORLD DIFFERENTLY</h4>
                <p className="text-xs text-slate-300 max-w-md mt-2">
                  Official 4K Brand Film showcasing Cappadocia dawn, Dubai skyline, and Maldives overwater lagoons.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
