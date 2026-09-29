import React, { useState, useEffect } from 'react';
import { Destination, Region } from '../../types';
import { destinationService } from '../../services/destinationService';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Plus, Edit2, Trash2, MapPin, Eye, Search, X } from 'lucide-react';

export const AdminDestinationsPage: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDest, setEditingDest] = useState<Destination | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    region: 'Europe' as Region,
    tagline: '',
    description: '',
    heroImage: '',
    startingPrice: 999,
    bestTimeToVisit: 'May - October',
    averageTripDuration: '7 to 10 Days',
    popularCities: 'Capital City, Historic Harbor',
    highlights: 'Sunrise expedition, Private yacht cruise'
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await destinationService.getAll({ search });
      setDestinations(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [search]);

  const handleOpenCreate = () => {
    setEditingDest(null);
    setFormData({
      name: '',
      country: '',
      region: 'Europe',
      tagline: '',
      description: '',
      heroImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
      startingPrice: 999,
      bestTimeToVisit: 'May - October',
      averageTripDuration: '7 to 10 Days',
      popularCities: 'City Center, Coastal Haven',
      highlights: 'Private historic tour, Executive transfers'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (d: Destination) => {
    setEditingDest(d);
    setFormData({
      name: d.name,
      country: d.country,
      region: d.region,
      tagline: d.tagline,
      description: d.description,
      heroImage: d.heroImage,
      startingPrice: d.startingPrice,
      bestTimeToVisit: d.bestTimeToVisit,
      averageTripDuration: d.averageTripDuration,
      popularCities: d.popularCities.join(', '),
      highlights: d.highlights.join(', ')
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove destination "${name}" from the active database?`)) {
      await destinationService.delete(id);
      loadData();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
      name: formData.name,
      country: formData.country,
      region: formData.region,
      tagline: formData.tagline,
      description: formData.description,
      heroImage: formData.heroImage,
      galleryImages: [formData.heroImage],
      startingPrice: Number(formData.startingPrice),
      packageCount: 3,
      hotelCount: 6,
      bestTimeToVisit: formData.bestTimeToVisit,
      averageTripDuration: formData.averageTripDuration,
      popularCities: formData.popularCities.split(',').map((s) => s.trim()),
      coordinates: { lat: 40.0, lng: 30.0 },
      highlights: formData.highlights.split(',').map((s) => s.trim()),
      travelTips: ['Valid passport required', 'Luxury concierge coordinated transfers']
    };

    if (editingDest) {
      await destinationService.update(editingDest.id, payload);
    } else {
      await destinationService.create(payload);
    }
    setModalOpen(false);
    loadData();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Destination Management</h2>
          <p className="text-xs text-slate-400">Configure global territories, regional groupings and starting rates</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-[#18C8D8] text-[#071A2F] hover:brightness-110 transition shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Destination</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-[#061321] p-4 rounded-2xl border border-white/10 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#071A2F] text-xs text-white pl-9 pr-4 py-2 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
          />
        </div>
        <span className="text-xs text-slate-400 hidden sm:inline">{destinations.length} records</span>
      </div>

      {/* Table */}
      <div className="bg-[#061321] rounded-3xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#071A2F]/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/5">
              <tr>
                <th className="px-6 py-3.5">Territory</th>
                <th className="px-6 py-3.5">Region</th>
                <th className="px-6 py-3.5">Starting Price</th>
                <th className="px-6 py-3.5">Best Time</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {destinations.map((d) => (
                <tr key={d.id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={d.heroImage} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <span className="font-bold text-white block">{d.name}</span>
                      <span className="text-slate-400 text-[11px]">{d.country}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="cyan" size="sm">{d.region}</Badge>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-white">${d.startingPrice}</td>
                  <td className="px-6 py-4 text-slate-300">{d.bestTimeToVisit}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(d)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition"
                        title="Edit Destination"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(d.id, d.name)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-white/10 rounded-lg transition"
                        title="Delete Destination"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#071A2F] border border-white/10 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingDest ? 'Edit Destination' : 'Add New Destination'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Destination Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#061321] text-xs text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Country *</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-[#061321] text-xs text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Region *</label>
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value as Region })}
                    className="w-full bg-[#061321] text-xs text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                  >
                    <option value="Europe">Europe</option>
                    <option value="Middle East">Middle East</option>
                    <option value="Asia">Asia</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Oceania">Oceania</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Starting Price ($) *</label>
                  <input
                    type="number"
                    required
                    value={formData.startingPrice}
                    onChange={(e) => setFormData({ ...formData, startingPrice: Number(e.target.value) })}
                    className="w-full bg-[#061321] text-xs text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Where Continents and Epochs Collide"
                  className="w-full bg-[#061321] text-xs text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Hero Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.heroImage}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                  className="w-full bg-[#061321] text-xs text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#061321] text-xs text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-full text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full text-xs font-semibold bg-[#18C8D8] text-[#071A2F] hover:brightness-110 transition shadow-md"
                >
                  Save Destination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
