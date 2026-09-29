import React from 'react';
import { Link } from 'react-router-dom';
import { Hotel } from '../../types';
import { Star, MapPin, ArrowRight, Eye } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface HotelCardProps {
  hotel: Hotel;
  index?: number;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, index = 0 }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const staggerDelay = (index % 3) * 120;

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${staggerDelay}ms`,
        transitionDuration: '750ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity'
      }}
      className={`group relative bg-[#071A2F] rounded-3xl overflow-hidden border border-white/10 hover:border-[#18C8D8]/50 shadow-xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-full transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-[0.96]'
      }`}
    >
      <div className="relative h-60 overflow-hidden bg-[#061321]">
        <img
          src={hotel.heroImage}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071A2F] via-[#071A2F]/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-1 bg-[#061321]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-400/30 text-xs font-bold text-amber-300">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{hotel.rating.toFixed(2)}</span>
            <span className="text-[10px] text-slate-400 font-normal">({hotel.reviewCount})</span>
          </div>

          {hotel.has360Tour && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-[#18C8D8] bg-[#061321]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#18C8D8]/30">
              <Eye className="w-3 h-3 text-[#18C8D8]" /> 360° Tour Available
            </span>
          )}
        </div>

        {/* Destination Location */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1 text-xs text-[#D9A441] font-semibold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          <span>{hotel.destinationName}, {hotel.country}</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-[#18C8D8] transition line-clamp-1">
            {hotel.name}
          </h3>
          <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {hotel.description}
          </p>
        </div>

        {/* Facilities tags */}
        <div className="flex flex-wrap gap-1.5 py-1">
          {hotel.facilities.slice(0, 3).map((f) => (
            <span
              key={f}
              className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5"
            >
              {f}
            </span>
          ))}
          {hotel.facilities.length > 3 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded text-[#18C8D8]">
              +{hotel.facilities.length - 3} more
            </span>
          )}
        </div>

        {/* Price & CTA */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block uppercase tracking-wider">From</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">${hotel.startingPricePerNight}</span>
              <span className="text-xs text-slate-400">/ night</span>
            </div>
          </div>

          <Link
            to={`/hotels/${hotel.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-white/5 hover:bg-[#18C8D8] hover:text-[#071A2F] border border-white/10 hover:border-[#18C8D8] transition group/btn"
          >
            <span>View Hotel</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
