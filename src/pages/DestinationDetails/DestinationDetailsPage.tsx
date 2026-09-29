import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Destination, TravelPackage, Hotel } from '../../types';
import { destinationService } from '../../services/destinationService';
import { packageService } from '../../services/packageService';
import { hotelService } from '../../services/hotelService';
import { PackageCard } from '../../components/cards/PackageCard';
import { HotelCard } from '../../components/cards/HotelCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Sparkles,
  Info,
  CheckCircle2,
  ArrowRight,
  Plane
} from 'lucide-react';

export const DestinationDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      setLoading(true);
      try {
        const dest = await destinationService.getBySlug(slug);
        setDestination(dest);
        if (dest) {
          const [pkgs, htls] = await Promise.all([
            packageService.getAll({ destinationId: dest.id }),
            hotelService.getAll({ destinationId: dest.id })
          ]);
          setPackages(pkgs);
          setHotels(htls);
        }
      } catch (err) {
        console.error('Failed to load destination details', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#061321] flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#18C8D8] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-400 text-sm">Loading destination dossier...</p>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-[#061321] flex items-center justify-center text-white p-6">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-2xl font-bold">Destination Not Found</h2>
          <p className="text-slate-400 text-sm">
            We couldn't locate the requested territory. It may be temporarily unavailable or unlisted.
          </p>
          <Button to="/destinations" variant="primary" size="md">
            Return to Destinations
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#061321] text-white">
      {/* ====================================================
          CINEMATIC HERO HEADER
      ==================================================== */}
      <section className="relative h-[75vh] min-h-[500px] overflow-hidden">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061321] via-[#061321]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061321]/80 via-transparent to-transparent" />

        <div className="absolute bottom-12 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="cyan" size="md">
                {destination.region}
              </Badge>
              <span className="text-xs uppercase tracking-widest text-[#D9A441] font-bold">
                {destination.country}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
              {destination.name}
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 font-light italic">
              "{destination.tagline}"
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                to={`/booking`}
                variant="gold"
                size="md"
                icon={<Plane className="w-4 h-4" />}
              >
                Book This Journey
              </Button>
              <a
                href="#packages"
                className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition"
              >
                Explore Packages ({packages.length})
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          KEY METRICS STRIP
      ==================================================== */}
      <section className="bg-[#071A2F] border-y border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center gap-3.5 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#18C8D8]/10 flex items-center justify-center text-[#18C8D8] shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Best Season</span>
                <span className="text-sm font-semibold text-white">{destination.bestTimeToVisit}</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#D9A441]/10 flex items-center justify-center text-[#D9A441] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Average Duration</span>
                <span className="text-sm font-semibold text-white">{destination.averageTripDuration}</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#18C8D8]/10 flex items-center justify-center text-[#18C8D8] shrink-0">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Packages From</span>
                <span className="text-sm font-semibold text-white">${destination.startingPrice} / person</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Popular Centers</span>
                <span className="text-sm font-semibold text-white truncate max-w-[180px] block">
                  {destination.popularCities.slice(0, 2).join(', ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          OVERVIEW & HIGHLIGHTS
      ==================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Overview */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Territory Overview
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              {destination.description}
            </p>

            <div className="pt-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D9A441]" />
                <span>Signature Highlights & Experiences</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#071A2F] border border-white/5 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#18C8D8] shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Travel Information Box */}
          <div className="lg:col-span-5">
            <div className="bg-[#071A2F] rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 shadow-xl">
              <div className="flex items-center gap-2 text-sm font-bold text-[#D9A441] uppercase tracking-wider">
                <Info className="w-4 h-4 text-[#D9A441]" />
                <span>Travel Intelligence & Protocol</span>
              </div>

              <div className="space-y-4">
                {destination.travelTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-[#18C8D8] shrink-0 font-bold">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-xs text-slate-400 block mb-2 font-medium">Key Cities Included:</span>
                <div className="flex flex-wrap gap-2">
                  {destination.popularCities.map((city) => (
                    <span
                      key={city}
                      className="px-3 py-1 rounded-full bg-white/5 text-xs text-slate-200 border border-white/10"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          DESTINATION GALLERY PREVIEW
      ==================================================== */}
      {destination.galleryImages.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Visual Dossier</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {destination.galleryImages.map((img, i) => (
              <div key={i} className="h-56 rounded-2xl overflow-hidden group">
                <img
                  src={img}
                  alt={`${destination.name} ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ====================================================
          PACKAGES IN THIS DESTINATION
      ==================================================== */}
      <section id="packages" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#040E19] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <Badge variant="cyan" size="sm" className="mb-2">
                Curated Packages
              </Badge>
              <h2 className="text-3xl font-extrabold text-white">
                Available Journeys in {destination.name}
              </h2>
            </div>
          </div>

          {packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">Custom private itineraries available upon request with your concierge.</p>
          )}
        </div>
      </section>

      {/* ====================================================
          HOTELS IN THIS DESTINATION
      ==================================================== */}
      {hotels.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-10">
            <Badge variant="gold" size="sm" className="mb-2">
              Luxury Sanctuary
            </Badge>
            <h2 className="text-3xl font-extrabold text-white">
              Accommodations in {destination.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
