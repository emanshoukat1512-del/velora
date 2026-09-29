import React from 'react';
import { Link } from 'react-router-dom';
import { TravelPackage } from '../../types';
import { Clock, Star, MapPin, Building, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface PackageCardProps {
  pkg: TravelPackage;
  index?: number;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, index = 0 }) => {
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
      className={`group relative bg-[#071A2F] rounded-3xl overflow-hidden border border-white/10 hover:border-[#D9A441]/50 shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#D9A441]/10 flex flex-col h-full transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-[0.96]'
      }`}
    >
      {/* Image with Tag and Restrained Zoom */}
      <div className="relative h-60 overflow-hidden bg-[#061321]">
        <img
          src={pkg.heroImage}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071A2F] via-[#071A2F]/20 to-transparent" />

        {/* Rating and Duration Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <Badge variant="navy" size="sm">
            <Clock className="w-3 h-3 text-[#18C8D8]" />
            <span>{pkg.duration}</span>
          </Badge>

          <div className="flex items-center gap-1 bg-[#061321]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-400/30 text-xs font-bold text-amber-300">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{pkg.rating.toFixed(2)}</span>
            <span className="text-[10px] text-slate-400 font-normal">({pkg.reviewCount})</span>
          </div>
        </div>

        {/* Destination Tag */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-[#18C8D8] font-semibold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          <span>{pkg.destinationName}, {pkg.country}</span>
        </div>
      </div>

      {/* Body Info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-[#D9A441] transition line-clamp-1">
            {pkg.title}
          </h3>
          <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {pkg.overview}
          </p>
        </div>

        {/* Key Features Preview */}
        <div className="space-y-2 py-2 border-y border-white/5 text-xs text-slate-300">
          <div className="flex items-center gap-2 truncate">
            <Building className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
            <span className="truncate">{pkg.hotelName}</span>
          </div>
          <div className="flex items-center gap-2 truncate">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#18C8D8] shrink-0" />
            <span className="truncate">{pkg.activities.slice(0, 2).join(' • ')}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-2 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block uppercase tracking-wider">From</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-white">${pkg.price}</span>
              {pkg.originalPrice && (
                <span className="text-xs text-slate-500 line-through">
                  ${pkg.originalPrice}
                </span>
              )}
              <span className="text-xs text-slate-400">/ person</span>
            </div>
          </div>

          <Link
            to={`/packages/${pkg.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#071A2F] bg-gradient-to-r from-[#D9A441] to-[#FBE08D] hover:brightness-110 shadow-md transition group/btn"
          >
            <span>View Package</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
