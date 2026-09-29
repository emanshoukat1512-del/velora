import React from 'react';
import { Link } from 'react-router-dom';
import { Destination } from '../../types';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface DestinationCardProps {
  destination: Destination;
  index?: number;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, index = 0 }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const staggerDelay = (index % 3) * 120; // Stagger per row: 0ms, 120ms, 240ms

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${staggerDelay}ms`,
        transitionDuration: '750ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity'
      }}
      className={`group relative bg-[#071A2F] rounded-3xl overflow-hidden border border-white/10 hover:border-[#18C8D8]/50 shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#18C8D8]/10 flex flex-col h-full transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-[0.96]'
      }`}
    >
      {/* Image Container with Restrained Zoom (scale 1.04) */}
      <div className="relative h-64 overflow-hidden bg-[#061321]">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071A2F] via-[#071A2F]/30 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <Badge variant="cyan" size="sm">
            {destination.region}
          </Badge>
          {destination.featured && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-[#D9A441] bg-[#061321]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#D9A441]/30">
              <Sparkles className="w-3 h-3 text-[#D9A441]" /> Featured
            </span>
          )}
        </div>

        {/* Bottom overlay in image */}
        <div className="absolute bottom-3 left-4 right-4">
          <span className="text-xs text-[#D9A441] font-semibold uppercase tracking-wider block mb-0.5">
            {destination.country}
          </span>
          <h3 className="text-2xl font-bold text-white group-hover:text-[#18C8D8] transition duration-300">
            {destination.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
          {destination.description}
        </p>

        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Starting from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-white">${destination.startingPrice}</span>
              <span className="text-xs text-slate-400">/ person</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-[#18C8D8] font-medium block">
              {destination.packageCount} Packages
            </span>
            <span className="text-[11px] text-slate-400">
              {destination.hotelCount} Luxury Stays
            </span>
          </div>
        </div>

        <Link
          to={`/destinations/${destination.slug}`}
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-white/5 hover:bg-[#18C8D8] hover:text-[#071A2F] border border-white/10 hover:border-[#18C8D8] transition-all duration-300 group/btn"
        >
          <span>Explore Destination</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
