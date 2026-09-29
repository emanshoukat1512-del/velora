import React, { useState, useEffect } from 'react';
import { Region, Destination } from '../../types';
import { destinationService } from '../../services/destinationService';
import { DestinationCard } from '../../components/cards/DestinationCard';
import { Badge } from '../../components/common/Badge';
import { Search, Compass, RotateCcw } from 'lucide-react';

export const DestinationsPage: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<Region | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const regions: (Region | 'All')[] = [
    'All',
    'Europe',
    'Middle East',
    'Asia',
    'Africa',
    'Americas',
    'Oceania'
  ];

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await destinationService.getAll({
          region: selectedRegion === 'All' ? undefined : (selectedRegion as Region),
          search: searchQuery
        });
        setDestinations(data);
      } catch (err) {
        console.error('Failed to load destinations', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedRegion, searchQuery]);

  const handleClearFilters = () => {
    setSelectedRegion('All');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#061321] text-white pt-24 pb-20">
      {/* Hero Header */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#071A2F] to-[#061321] border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <Badge variant="cyan" size="md">
            Global Destinations
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Explore the World
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto font-light">
            Discover places worth remembering. Handpicked worldwide territories known for cultural heritage, natural wonder, and architectural splendor.
          </p>

          {/* Search Bar */}
          <div className="pt-6 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-[#18C8D8] absolute left-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by country, city, or territory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#071A2F]/90 text-white placeholder-slate-400 pl-12 pr-4 py-3.5 rounded-full border border-white/10 focus:border-[#18C8D8] focus:outline-none shadow-xl text-sm transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Region Filter Buttons */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-6">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border ${
                  selectedRegion === region
                    ? 'bg-[#18C8D8] text-[#071A2F] border-[#18C8D8] shadow-md shadow-[#18C8D8]/20'
                    : 'bg-[#071A2F] text-slate-300 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {loading ? (
          <div className="text-center py-24 space-y-4">
            <div className="w-10 h-10 border-2 border-[#18C8D8] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-400 text-sm">Mapping global destinations...</p>
          </div>
        ) : destinations.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-[#071A2F]/60 rounded-3xl border border-white/10 max-w-lg mx-auto p-8 space-y-4">
            <Compass className="w-12 h-12 text-[#18C8D8] mx-auto opacity-70" />
            <h3 className="text-xl font-bold text-white">No journeys found</h3>
            <p className="text-slate-400 text-sm">
              We couldn’t find any destinations matching your current filters.
            </p>
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#071A2F] bg-[#18C8D8] hover:brightness-110 transition mt-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8 text-xs text-slate-400">
              <span>Showing {destinations.length} destinations</span>
              <span className="text-[#D9A441] font-medium">100% Curated by VELORA</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((dest, idx) => (
                <DestinationCard key={dest.id} destination={dest} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
