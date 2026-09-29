import React from 'react';
import { Link } from 'react-router-dom';
import { Experience } from '../../types';
import { Clock, Star, MapPin, ArrowRight, Users } from 'lucide-react';
import { Badge } from '../common/Badge';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface ExperienceCardProps {
  experience: Experience;
  index?: number;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index = 0 }) => {
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
      className={`group relative bg-[#071A2F] rounded-3xl overflow-hidden border border-white/10 hover:border-[#18C8D8]/50 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#18C8D8]/15 flex flex-col h-full transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-[0.96]'
      }`}
    >
      <div className="relative h-64 overflow-hidden bg-[#061321]">
        <img
          src={experience.heroImage}
          alt={experience.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071A2F] via-[#071A2F]/30 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Badge variant="cyan" size="sm">
            {experience.category}
          </Badge>

          <div className="flex items-center gap-1 bg-[#061321]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-400/30 text-xs font-bold text-amber-300">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{experience.rating.toFixed(2)}</span>
          </div>
        </div>

        {/* Location */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-[#D9A441] font-semibold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          <span>{experience.destinationName}, {experience.country}</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-[#18C8D8] transition line-clamp-2">
            {experience.title}
          </h3>
          <p className="text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">
            {experience.description}
          </p>
        </div>

        <div className="flex items-center justify-between py-2 border-y border-white/5 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#18C8D8]" />
            {experience.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#D9A441]" />
            {experience.groupSize}
          </span>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">${experience.price}</span>
              <span className="text-xs text-slate-400">/ guest</span>
            </div>
          </div>

          <Link
            to="/booking"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-white/5 hover:bg-[#18C8D8] hover:text-[#071A2F] border border-white/10 hover:border-[#18C8D8] transition group/btn"
          >
            <span>Book Experience</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
