import React, { useState, useEffect } from 'react';
import { Hotel } from '../../types';
import { hotelService } from '../../services/hotelService';
import { HotelCard } from '../../components/cards/HotelCard';
import { Badge } from '../../components/common/Badge';
import { Search, Building2, RotateCcw } from 'lucide-react';

export const HotelsPage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await hotelService.getAll({ search: searchQuery });
        setHotels(data);
      } catch (err) {
        console.error('Failed to load hotels', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#061321] text-white pt-24 pb-20">
      {/* Header */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#071A2F] to-[#061321] border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <Badge variant="cyan" size="md">
            World-Class Sanctuaries
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Luxury Stays & Palaces
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto font-light">
            Iconic overwater villas, Ottoman imperial palaces, and alpine chalets selected for architecture and discreet service.
          </p>

          <div className="pt-6 max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 text-[#18C8D8] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search hotels by name or territory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#071A2F] text-white placeholder-slate-400 pl-12 pr-4 py-3 rounded-full border border-white/10 focus:border-[#18C8D8] focus:outline-none text-sm shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {loading ? (
          <div className="text-center py-24 space-y-4">
            <div className="w-10 h-10 border-2 border-[#18C8D8] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-400 text-sm">Loading luxury properties...</p>
          </div>
        ) : hotels.length === 0 ? (
          <div className="text-center py-20 bg-[#071A2F]/60 rounded-3xl border border-white/10 max-w-lg mx-auto p-8 space-y-4">
            <Building2 className="w-12 h-12 text-[#18C8D8] mx-auto opacity-70" />
            <h3 className="text-xl font-bold text-white">No properties found</h3>
            <p className="text-slate-400 text-sm">Try searching for another destination or keyword.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#071A2F] bg-[#18C8D8] hover:brightness-110 transition mt-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Search</span>
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8 text-xs text-slate-400">
              <span>Showing {hotels.length} luxury properties</span>
              <span className="text-[#D9A441] font-medium">5-Star Standards Guaranteed</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotels.map((hotel, idx) => (
                <HotelCard key={hotel.id} hotel={hotel} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
