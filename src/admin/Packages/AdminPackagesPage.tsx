import React, { useState, useEffect } from 'react';
import { TravelPackage } from '../../types';
import { packageService } from '../../services/packageService';
import { Plus, Edit2, Trash2, Search, X, Check, Eye } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const AdminPackagesPage: React.FC = () => {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<TravelPackage | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    destinationName: 'Turkey',
    country: 'Turkey',
    duration: '7 Days / 6 Nights',
    price: 899,
    hotelName: 'Ciragan Palace Kempinski',
    overview: '',
    heroImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
    status: 'active' as 'active' | 'draft'
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await packageService.getAll({ search });
      setPackages(data);
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
    setEditingPkg(null);
    setFormData({
      title: '',
      destinationName: 'Turkey',
      country: 'Turkey',
      duration: '7 Days / 6 Nights',
      price: 899,
      hotelName: 'Ciragan Palace Kempinski',
      overview: 'Curated luxury journey with private transfers and 5-star suites.',
      heroImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
      status: 'active'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (p: TravelPackage) => {
    setEditingPkg(p);
    setFormData({
      title: p.title,
      destinationName: p.destinationName,
      country: p.country,
      duration: p.duration,
      price: p.price,
      hotelName: p.hotelName,
      overview: p.overview,
      heroImage: p.heroImage,
      status: p.status === 'archived' ? 'draft' : p.status
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to permanently delete package "${title}"?`)) {
      await packageService.delete(id);
      loadData();
    }
  };

  const toggleStatus = async (pkg: TravelPackage) => {
    const nextStatus = pkg.status === 'active' ? 'draft' : 'active';
    await packageService.update(pkg.id, { status: nextStatus });
    loadData();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
      title: formData.title,
      destinationId: 'dest-1',
      destinationName: formData.destinationName,
      country: formData.country,
      duration: formData.duration,
      durationDays: 7,
      price: Number(formData.price),
      rating: 4.95,
      reviewCount: 42,
      heroImage: formData.heroImage,
      images: [formData.heroImage],
      hotelName: formData.hotelName,
      hotelRating: 5,
      overview: formData.overview,
      itinerary: [
        {
          day: 1,
          title: 'Arrival & Welcome Reception',
          description: 'Private chauffeur transfer to resort.',
          highlights: ['VIP airport escort'],
          accommodation: formData.hotelName,
          mealsIncluded: 'Dinner'
        }
      ],
      included: ['Private Mercedes-Benz transfers', '5-Star Suite accommodation', 'Daily breakfast'],
      excluded: ['International airfare', 'Gratuities'],
      activities: ['Historic Walking Tour', 'Private Yacht Cruise'],
      transportation: 'Chauffeured Mercedes V-Class',
      status: formData.status
    };

    if (editingPkg) {
      await packageService.update(editingPkg.id, payload);
    } else {
      await packageService.create(payload);
    }
    setModalOpen(false);
    loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Travel Package Management</h2>
          <p className="text-xs text-slate-400">Configure all-inclusive journeys, daily itineraries, and publish states</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-[#D9A441] text-[#071A2F] hover:brightness-110 transition shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Create New Package</span>
        </button>
      </div>

      <div className="bg-[#061321] p-4 rounded-2xl border border-white/10 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search packages by title or destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#071A2F] text-xs text-white pl-9 pr-4 py-2 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
          />
        </div>
        <span className="text-xs text-slate-400">{packages.length} packages listed</span>
      </div>

      <div className="bg-[#061321] rounded-3xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#071A2F]/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/5">
              <tr>
                <th className="px-6 py-3.5">Package Title</th>
                <th className="px-6 py-3.5">Destination</th>
                <th className="px-6 py-3.5">Duration</th>
                <th className="px-6 py-3.5">Price</th>
                <th className="px-6 py-3.5">Featured Hotel</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {packages.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={p.heroImage} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <span className="font-bold text-white block truncate max-w-xs">{p.title}</span>
                      <span className="text-slate-400 text-[11px]">{p.rating} ★ ({p.reviewCount} reviews)</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-white">{p.destinationName}</td>
                  <td className="px-6 py-4 text-slate-300">{p.duration}</td>
                  <td className="px-6 py-4 font-mono font-bold text-white">${p.price}</td>
                  <td className="px-6 py-4 text-slate-300 truncate max-w-[160px]">{p.hotelName}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(p)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition ${
                        p.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                          : 'bg-slate-500/10 text-slate-400 border border-slate-500/20 hover:bg-slate-500/20'
                      }`}
                    >
                      {p.status === 'active' ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-white/10 rounded-lg transition"
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#071A2F] border border-white/10 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingPkg ? 'Edit Package' : 'Create New Travel Package'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Package Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Turkey Explorer: Empires & Bosphorus"
                  className="w-full bg-[#061321] text-xs text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Destination *</label>
                  <input
                    type="text"
                    required
                    value={formData.destinationName}
                    onChange={(e) => setFormData({ ...formData, destinationName: e.target.value })}
                    className="w-full bg-[#061321] text-xs text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-[#061321] text-xs text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Duration *</label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 7 Days / 6 Nights"
                    className="w-full bg-[#061321] text-xs text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Base Price ($) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-[#061321] text-xs text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Featured Resort / Hotel</label>
                <input
                  type="text"
                  value={formData.hotelName}
                  onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
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
                <label className="text-xs font-semibold text-slate-300 block mb-1">Package Overview</label>
                <textarea
                  rows={3}
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
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
                  className="px-5 py-2 rounded-full text-xs font-semibold bg-[#D9A441] text-[#071A2F] hover:brightness-110 transition shadow-md"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
