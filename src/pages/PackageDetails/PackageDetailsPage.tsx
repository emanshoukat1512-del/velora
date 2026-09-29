import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TravelPackage } from '../../types';
import { packageService } from '../../services/packageService';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  Clock,
  Star,
  MapPin,
  Building,
  Check,
  X as XIcon,
  ShieldCheck,
  Plane,
  Sparkles,
  Calendar,
  Users,
  Compass
} from 'lucide-react';

export const PackageDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [pkg, setPkg] = useState<TravelPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      setLoading(true);
      try {
        const item = await packageService.getBySlug(slug);
        setPkg(item);
        if (item) setActiveImage(item.heroImage);
      } catch (err) {
        console.error('Failed to load package details', err);
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
          <div className="w-10 h-10 border-2 border-[#D9A441] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-400 text-sm">Loading package dossier...</p>
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen bg-[#061321] flex items-center justify-center text-white p-6">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-2xl font-bold">Package Not Found</h2>
          <p className="text-slate-400 text-sm">
            The requested travel package is no longer active or could not be found.
          </p>
          <Button to="/packages" variant="primary" size="md">
            View All Packages
          </Button>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    // Navigate to booking with pre-selected package
    navigate('/booking', { state: { packageId: pkg.id } });
  };

  return (
    <div className="min-h-screen bg-[#061321] text-white pt-24 pb-24">
      {/* Top Breadcrumb & Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <Link to="/packages" className="hover:text-white transition">Packages</Link>
          <span>/</span>
          <span className="text-[#18C8D8] truncate">{pkg.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="cyan" size="sm">
                <Clock className="w-3 h-3 text-[#18C8D8]" />
                <span>{pkg.duration}</span>
              </Badge>
              <span className="flex items-center gap-1 text-xs text-amber-300 font-semibold bg-white/5 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                <Star className="w-3 h-3 fill-current" /> {pkg.rating.toFixed(2)} ({pkg.reviewCount} reviews)
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {pkg.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-400 mt-2">
              <MapPin className="w-4 h-4 text-[#D9A441]" />
              <span>{pkg.destinationName}, {pkg.country}</span>
            </div>
          </div>

          <div className="text-left lg:text-right">
            <span className="text-xs text-slate-400 block uppercase tracking-wider">All-Inclusive Rate</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white">${pkg.price}</span>
              {pkg.originalPrice && (
                <span className="text-sm text-slate-500 line-through">${pkg.originalPrice}</span>
              )}
              <span className="text-xs text-slate-400">/ person</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Gallery Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main Hero Shot */}
          <div className="lg:col-span-3 h-96 sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl relative">
            <img
              src={activeImage || pkg.heroImage}
              alt={pkg.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
            {[pkg.heroImage, ...pkg.images].slice(0, 4).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`relative h-24 lg:h-[110px] w-32 lg:w-full rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                  activeImage === img ? 'border-[#18C8D8] scale-[0.98]' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Itinerary & Details + Booking Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Itinerary, Accommodations & Inclusions */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Journey Overview</h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {pkg.overview}
              </p>
            </div>

            {/* Daily Timeline Itinerary (Section 15) */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Compass className="w-6 h-6 text-[#18C8D8]" />
                  <span>Day-by-Day Timeline Itinerary</span>
                </h2>
                <span className="text-xs text-slate-400">{pkg.durationDays} Planned Days</span>
              </div>

              <div className="relative pl-6 sm:pl-8 border-l-2 border-[#18C8D8]/30 space-y-8">
                {pkg.itinerary.map((day) => (
                  <div key={day.day} className="relative group">
                    {/* Circle Node */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full bg-[#071A2F] border-2 border-[#18C8D8] flex items-center justify-center text-[10px] font-bold text-[#18C8D8] group-hover:bg-[#18C8D8] group-hover:text-[#071A2F] transition-colors">
                      {day.day}
                    </div>

                    <div className="bg-[#071A2F] rounded-2xl p-5 sm:p-6 border border-white/10 space-y-3 hover:border-[#18C8D8]/40 transition">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#D9A441]">
                          DAY 0{day.day}
                        </span>
                        <span className="text-xs text-slate-400">
                          Meals: {day.mealsIncluded}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white">{day.title}</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {day.description}
                      </p>

                      <div className="pt-2 flex flex-wrap gap-2">
                        {day.highlights.map((h, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 text-xs text-[#18C8D8] bg-[#18C8D8]/10 px-2.5 py-1 rounded-md"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>{h}</span>
                          </span>
                        ))}
                      </div>

                      <div className="pt-2 text-xs text-slate-400 flex items-center gap-2 border-t border-white/5">
                        <Building className="w-3.5 h-3.5 text-slate-500" />
                        <span>Stay: <strong className="text-slate-200">{day.accommodation}</strong></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Included & Excluded Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {/* Included */}
              <div className="bg-[#071A2F] p-6 rounded-2xl border border-emerald-500/20 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span>What's Included</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {pkg.included.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excluded */}
              <div className="bg-[#071A2F] p-6 rounded-2xl border border-rose-500/20 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <XIcon className="w-5 h-5 text-rose-400" />
                  <span>Not Included</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {pkg.excluded.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <XIcon className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Transportation Details */}
            <div className="bg-[#071A2F] p-6 rounded-2xl border border-white/10 space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plane className="w-4 h-4 text-[#18C8D8]" />
                <span>Executive Transportation & Chauffeur Services</span>
              </h3>
              <p className="text-xs text-slate-300">
                {pkg.transportation}. Private airport meet & greet with luggage handling is included on all arrivals and departures.
              </p>
            </div>
          </div>

          {/* Right Column: Sticky Booking Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-[#071A2F] border border-[#D9A441]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Reservation Summary
                </span>
                <span className="text-xs font-bold text-[#D9A441] bg-[#D9A441]/15 px-2.5 py-0.5 rounded-full border border-[#D9A441]/30">
                  Instant Confirmation
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="text-slate-400">Package:</span>
                  <span className="font-semibold text-white truncate max-w-[170px]">{pkg.title}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="text-slate-400">Destination:</span>
                  <span className="text-white">{pkg.destinationName}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="text-slate-400">Duration:</span>
                  <span className="text-white">{pkg.duration}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="text-slate-400">Resort Sanctuary:</span>
                  <span className="text-white truncate max-w-[170px]">{pkg.hotelName}</span>
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Price per traveler:</span>
                  <span className="font-semibold text-white">${pkg.price}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Standard 2 Guests estimate:</span>
                  <span>${pkg.price * 2}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Resort fee & local taxes (8%):</span>
                  <span>${Math.round(pkg.price * 2 * 0.08)}</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Estimated Total:</span>
                  <span className="text-xl font-bold text-[#D9A441]">
                    ${pkg.price * 2 + Math.round(pkg.price * 2 * 0.08)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleBookNow}
                variant="gold"
                size="lg"
                className="w-full justify-center shadow-gold"
                icon={<Plane className="w-4 h-4" />}
              >
                Book This Journey
              </Button>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 justify-center">
                <ShieldCheck className="w-4 h-4 text-[#18C8D8]" />
                <span>Zero cancellation fees up to 14 days before departure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
