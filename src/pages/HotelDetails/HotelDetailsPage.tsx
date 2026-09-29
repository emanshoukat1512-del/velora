import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Hotel, HotelRoom } from '../../types';
import { hotelService } from '../../services/hotelService';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  Star,
  MapPin,
  Building2,
  CheckCircle2,
  Sparkles,
  Eye,
  ShieldCheck,
  Plane,
  RotateCw,
  Compass
} from 'lucide-react';

export const HotelDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [show360Modal, setShow360Modal] = useState(false);
  const [tourAngle, setTourAngle] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      setLoading(true);
      try {
        const item = await hotelService.getBySlug(slug);
        setHotel(item);
      } catch (err) {
        console.error('Failed to load hotel details', err);
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
          <p className="text-slate-400 text-sm">Loading sanctuary portfolio...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-[#061321] flex items-center justify-center text-white p-6">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-2xl font-bold">Property Not Found</h2>
          <p className="text-slate-400 text-sm">This hotel is currently not listed.</p>
          <Button to="/hotels" variant="primary" size="md">
            View All Hotels
          </Button>
        </div>
      </div>
    );
  }

  const handleBookRoom = (room: HotelRoom) => {
    navigate('/booking', { state: { hotelName: `${hotel.name} (${room.name})` } });
  };

  return (
    <div className="min-h-screen bg-[#061321] text-white pt-24 pb-24">
      {/* Hero Header */}
      <section className="relative h-[65vh] min-h-[440px] overflow-hidden">
        <img
          src={hotel.heroImage}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061321] via-[#061321]/40 to-transparent" />

        <div className="absolute bottom-12 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 bg-[#061321]/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/30 text-xs font-bold text-amber-300">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{hotel.rating.toFixed(2)} ({hotel.reviewCount} verified reviews)</span>
              </span>
              <Badge variant="cyan" size="sm">
                {hotel.stars}-Star Resort
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {hotel.name}
            </h1>

            <div className="flex items-center gap-2 text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-[#D9A441]" />
              <span>{hotel.locationDetails}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Button
                to="/booking"
                variant="gold"
                size="md"
                icon={<Plane className="w-4 h-4" />}
              >
                Reserve Stay
              </Button>

              {hotel.has360Tour && (
                <button
                  onClick={() => setShow360Modal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#18C8D8]/40 transition"
                >
                  <Eye className="w-4 h-4 text-[#18C8D8]" />
                  <span>Interactive 360° Suite Tour</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Overview & Rooms */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">About The Sanctuary</h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {hotel.description}
              </p>
            </div>

            {/* Facilities */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#18C8D8]" />
                <span>Featured Amenities & Services</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hotel.facilities.map((fac, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[#071A2F] border border-white/5 flex items-center gap-3 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#18C8D8] shrink-0" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suite & Room Options */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Suites & Private Villas</h3>
              <div className="space-y-6">
                {hotel.rooms.map((room) => (
                  <div
                    key={room.id}
                    className="bg-[#071A2F] rounded-3xl overflow-hidden border border-white/10 hover:border-[#18C8D8]/40 transition grid grid-cols-1 sm:grid-cols-12 shadow-xl"
                  >
                    <div className="sm:col-span-5 h-52 sm:h-auto relative overflow-hidden">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="sm:col-span-7 p-6 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[#D9A441] font-semibold uppercase tracking-wider">
                            {room.type}
                          </span>
                          <span className="text-xs text-slate-400">{room.sizeSqM} m² • {room.capacity}</span>
                        </div>
                        <h4 className="text-lg font-bold text-white mt-1">{room.name}</h4>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {room.amenities.map((amenity, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/5"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold text-white">${room.pricePerNight}</span>
                          <span className="text-xs text-slate-400"> / night</span>
                        </div>

                        <Button
                          onClick={() => handleBookRoom(room)}
                          variant="primary"
                          size="sm"
                        >
                          Book Room
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#071A2F] rounded-3xl p-6 border border-white/10 space-y-6 shadow-xl sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Starting Price
                </span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">${hotel.startingPricePerNight}</span>
                  <span className="text-xs text-slate-400 block">/ night</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#18C8D8]" />
                  <span>Best Rate Guarantee with VELORA Concierge</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D9A441]" />
                  <span>Complimentary VIP upgrade subject to availability</span>
                </div>
              </div>

              <Button
                to="/booking"
                variant="gold"
                size="lg"
                className="w-full justify-center shadow-gold"
                icon={<Plane className="w-4 h-4" />}
              >
                Inquire & Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 360° Demo Tour Modal (Section 16 Specification: clearly marked demo experience) */}
      {show360Modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#071A2F] border border-[#18C8D8]/50 rounded-3xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#18C8D8] animate-pulse" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Interactive 360° Suite Tour [Interactive Demo Experience]
                </h3>
              </div>
              <button
                onClick={() => setShow360Modal(false)}
                className="text-slate-400 hover:text-white text-xs px-3 py-1 rounded-full bg-white/10"
              >
                Close (ESC)
              </button>
            </div>

            {/* Clearly marked demo banner as requested */}
            <div className="bg-[#086A9A]/30 border-b border-[#18C8D8]/20 px-6 py-2.5 text-xs text-cyan-200 flex items-center justify-between">
              <span>Notice: Demonstrating VELORA 360° Panoramic Engine Simulation for {hotel.name}</span>
              <span className="text-[11px] text-amber-300 font-mono">360° VR Compatible</span>
            </div>

            {/* Interactive Panoramic Viewer */}
            <div className="relative h-[480px] bg-black overflow-hidden select-none">
              <div
                className="w-[200%] h-full flex transition-transform duration-200"
                style={{ transform: `translateX(-${tourAngle}%)` }}
              >
                <img
                  src={hotel.heroImage}
                  alt="360 view 1"
                  className="w-1/2 h-full object-cover shrink-0 pointer-events-none"
                />
                <img
                  src={hotel.images[0] || hotel.heroImage}
                  alt="360 view 2"
                  className="w-1/2 h-full object-cover shrink-0 pointer-events-none"
                />
              </div>

              {/* Controls Overlay */}
              <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-4">
                <button
                  onClick={() => setTourAngle((prev) => Math.max(prev - 10, 0))}
                  className="px-4 py-2 rounded-full bg-[#061321]/80 hover:bg-[#061321] text-xs font-semibold text-white border border-white/20 backdrop-blur-md transition flex items-center gap-1.5"
                >
                  <RotateCw className="w-3.5 h-3.5 -scale-x-100" />
                  <span>Pan Left</span>
                </button>

                <div className="px-4 py-1.5 rounded-full bg-[#061321]/90 border border-[#18C8D8]/40 text-[11px] text-[#18C8D8] font-mono">
                  Orientation: {Math.round(tourAngle * 3.6)}°
                </div>

                <button
                  onClick={() => setTourAngle((prev) => Math.min(prev + 10, 50))}
                  className="px-4 py-2 rounded-full bg-[#061321]/80 hover:bg-[#061321] text-xs font-semibold text-white border border-white/20 backdrop-blur-md transition flex items-center gap-1.5"
                >
                  <span>Pan Right</span>
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
