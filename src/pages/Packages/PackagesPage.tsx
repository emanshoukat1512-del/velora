import React, { useState, useEffect } from 'react';
import { TravelPackage } from '../../types';
import { packageService } from '../../services/packageService';
import { PackageCard } from '../../components/cards/PackageCard';
import { Badge } from '../../components/common/Badge';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

export const PackagesPage: React.FC = () => {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(2000);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await packageService.getAll({
          search: searchQuery,
          maxPrice: maxPrice < 2000 ? maxPrice : undefined
        });
        setPackages(data);
      } catch (err) {
        console.error('Failed to load packages', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [searchQuery, maxPrice]);

  return (
    <div className="min-h-screen bg-[#061321] text-white pt-24 pb-20">
      {/* Header */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#071A2F] to-[#061321] border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <Badge variant="gold" size="md">
            All-Inclusive Journeys
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Curated Travel Packages
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto font-light">
            Meticulously planned travel collections pairing private transport, 5-star suites, and elite localized access.
          </p>

          {/* Search & Filters */}
          <div className="pt-6 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 relative">
              <Search className="w-4 h-4 text-[#18C8D8] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search packages by destination or activity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#071A2F] text-white placeholder-slate-400 pl-11 pr-4 py-3 rounded-full border border-white/10 focus:border-[#18C8D8] focus:outline-none text-xs shadow-lg"
              />
            </div>

            <div className="bg-[#071A2F] rounded-full border border-white/10 px-4 py-2 flex items-center justify-between text-xs">
              <span className="text-slate-400">Under:</span>
              <span className="font-bold text-[#D9A441]">${maxPrice}</span>
              <input
                type="range"
                min="700"
                max="2000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-20 accent-[#D9A441] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {loading ? (
          <div className="text-center py-24 space-y-4">
            <div className="w-10 h-10 border-2 border-[#D9A441] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-400 text-sm">Loading curated packages...</p>
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-20 bg-[#071A2F]/60 rounded-3xl border border-white/10 max-w-lg mx-auto p-8 space-y-4">
            <SlidersHorizontal className="w-12 h-12 text-[#D9A441] mx-auto opacity-70" />
            <h3 className="text-xl font-bold text-white">No packages match criteria</h3>
            <p className="text-slate-400 text-sm">Try increasing your price threshold or search query.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setMaxPrice(2000);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#071A2F] bg-[#D9A441] hover:brightness-110 transition mt-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8 text-xs text-slate-400">
              <span>Showing {packages.length} travel packages</span>
              <span className="text-[#18C8D8] font-medium">Flight + Resort + Itinerary Included</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, idx) => (
                <PackageCard key={pkg.id} pkg={pkg} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
