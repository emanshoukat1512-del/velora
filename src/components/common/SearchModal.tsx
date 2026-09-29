import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin, Compass, Building2, ArrowRight } from 'lucide-react';
import { mockDestinations, mockPackages, mockHotels } from '../../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle modal
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredDestinations = q
    ? mockDestinations.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.region.toLowerCase().includes(q)
      )
    : mockDestinations.slice(0, 3);

  const filteredPackages = q
    ? mockPackages.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.destinationName.toLowerCase().includes(q) ||
          p.activities.some((a) => a.toLowerCase().includes(q))
      )
    : mockPackages.slice(0, 3);

  const filteredHotels = q
    ? mockHotels.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.destinationName.toLowerCase().includes(q)
      )
    : mockHotels.slice(0, 2);

  const handleSelect = (url: string) => {
    navigate(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#061321]/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#071A2F] border border-[#18C8D8]/20 rounded-2xl shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-[#18C8D8]" />
          <input
            type="text"
            placeholder="Search destinations, packages, hotels, experiences..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none text-base font-light"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-white/5"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div data-lenis-prevent className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
          {/* Destinations */}
          {filteredDestinations.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#18C8D8] tracking-wider uppercase mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>Destinations</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    onClick={() => handleSelect(`/destinations/${dest.slug}`)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition border border-transparent hover:border-[#18C8D8]/20 group"
                  >
                    <img
                      src={dest.heroImage}
                      alt={dest.name}
                      className="w-11 h-11 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white group-hover:text-[#18C8D8] transition truncate">
                        {dest.name}
                      </p>
                      <p className="text-xs text-slate-400 truncate">{dest.country} • From ${dest.startingPrice}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#18C8D8] group-hover:translate-x-1 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Packages */}
          {filteredPackages.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D9A441] tracking-wider uppercase mb-3">
                <Compass className="w-3.5 h-3.5" />
                <span>Travel Packages</span>
              </div>
              <div className="space-y-2">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => handleSelect(`/packages/${pkg.slug}`)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition border border-transparent hover:border-[#D9A441]/20 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={pkg.heroImage}
                        alt={pkg.title}
                        className="w-11 h-11 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white group-hover:text-[#D9A441] transition truncate">
                          {pkg.title}
                        </p>
                        <p className="text-xs text-slate-400">
                          {pkg.duration} • {pkg.destinationName}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 pl-3">
                      <span className="text-sm font-semibold text-white">${pkg.price}</span>
                      <span className="text-[11px] text-slate-400 block">/ traveler</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hotels */}
          {filteredHotels.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 tracking-wider uppercase mb-3">
                <Building2 className="w-3.5 h-3.5" />
                <span>Luxury Hotels</span>
              </div>
              <div className="space-y-2">
                {filteredHotels.map((htl) => (
                  <div
                    key={htl.id}
                    onClick={() => handleSelect(`/hotels/${htl.slug}`)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition border border-transparent hover:border-white/10 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={htl.heroImage}
                        alt={htl.name}
                        className="w-11 h-11 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-white group-hover:text-[#18C8D8] transition">
                          {htl.name}
                        </p>
                        <p className="text-xs text-slate-400">{htl.destinationName}</p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-300">From ${htl.startingPricePerNight}/nt</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredDestinations.length === 0 && filteredPackages.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-400 text-sm">No journeys found matching "{query}"</p>
              <button
                onClick={() => setQuery('')}
                className="mt-3 text-xs text-[#18C8D8] underline hover:text-white"
              >
                Reset search
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#061321]/90 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span>Press ESC to dismiss</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#18C8D8]" /> VELORA Global Search
          </span>
        </div>
      </div>
    </div>
  );
};
