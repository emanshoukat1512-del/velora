import React, { useState, useEffect } from 'react';
import { Hotel } from '../../types';
import { hotelService } from '../../services/hotelService';
import { Plus, Edit2, Trash2, Search, X, Star, Eye } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const AdminHotelsPage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    destinationName: 'Turkey',
    country: 'Turkey',
    stars: 5,
    startingPricePerNight: 450,
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    description: '',
    facilities: 'Infinity Pool, Turkish Hammam, Butler Service',
    locationDetails: 'Bosphorus Waterfront'
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await hotelService.getAll({ search });
      setHotels(data);
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
    setEditingHotel(null);
    setFormData({
      name: '',
      destinationName: 'Turkey',
      country: 'Turkey',
      stars: 5,
      startingPricePerNight: 450,
      heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      description: 'Exclusive 5-star sanctuary featuring individual private suites.',
      facilities: 'Private Beach, 24/7 Butler, Michelin Dining, Heliport',
      locationDetails: 'Exclusive Waterfront'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (h: Hotel) => {
    setEditingHotel(h);
    setFormData({
      name: h.name,
      destinationName: h.destinationName,
      country: h.country,
      stars: h.stars,
      startingPricePerNight: h.startingPricePerNight,
      heroImage: h.heroImage,
      description: h.description,
      facilities: h.facilities.join(', '),
      locationDetails: h.locationDetails
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Remove property "${name}"?`)) {
      await hotelService.delete(id);
      loadData();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
      name: formData.name,
      destinationId: 'dest-1',
      destinationName: formData.destinationName,
      country: formData.country,
      rating: 4.96,
      reviewCount: 120,
      stars: Number(formData.stars),
      heroImage: formData.heroImage,
      images: [formData.heroImage],
      startingPricePerNight: Number(formData.startingPricePerNight),
      description: formData.description,
      facilities: formData.facilities.split(',').map((f) => f.trim()),
      locationDetails: formData.locationDetails,
      coordinates: { lat: 41.0, lng: 29.0 },
      has360Tour: true,
      rooms: [
        {
          id: 'rm-def',
          name: 'Executive Sanctuary Suite',
          type: 'Grand Suite',
          capacity: '2 Guests',
          pricePerNight: Number(formData.startingPricePerNight),
          sizeSqM: 80,
          amenities: ['Panoramic balcony', 'Deep soaking tub'],
          image: formData.heroImage
        }
      ]
    };

    if (editingHotel) {
      await hotelService.update(editingHotel.id, payload);
    } else {
      await hotelService.create(payload);
    }
    setModalOpen(false);
    loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Hotel & Sanctuary Portfolio</h2>
          <p className="text-xs text-slate-400">Manage 5-star partner properties, suite categories, and 360 virtual tour links</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-[#18C8D8] text-[#071A2F] hover:brightness-110 transition shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Sanctuary</span>
        </button>
      </div>

      <div className="bg-[#061321] rounded-3xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#071A2F]/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/5">
              <tr>
                <th className="px-6 py-3.5">Sanctuary</th>
                <th className="px-6 py-3.5">Destination</th>
                <th className="px-6 py-3.5">Nightly Rate</th>
                <th className="px-6 py-3.5">Rating</th>
                <th className="px-6 py-3.5">360 Tour</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {hotels.map((h) => (
                <tr key={h.id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={h.heroImage} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <span className="font-bold text-white block">{h.name}</span>
                      <span className="text-slate-400 text-[11px]">{h.locationDetails}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white font-medium">{h.destinationName}</td>
                  <td className="px-6 py-4 font-mono font-bold text-white">${h.startingPricePerNight}</td>
                  <td className="px-6 py-4 flex items-center gap-1 text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{h.rating} ({h.stars}★)</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-[#18C8D8]">
                      <Eye className="w-3 h-3" /> Enabled
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(h)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(h.id, h.name)}
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
          <div className="bg-[#071A2F] border border-white/10 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">{editingHotel ? 'Edit Sanctuary' : 'Add New Property'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Hotel / Resort Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#061321] text-xs text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Destination</label>
                  <input
                    type="text"
                    value={formData.destinationName}
                    onChange={(e) => setFormData({ ...formData, destinationName: e.target.value })}
                    className="w-full bg-[#061321] text-xs text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Nightly Rate ($)</label>
                  <input
                    type="number"
                    value={formData.startingPricePerNight}
                    onChange={(e) => setFormData({ ...formData, startingPricePerNight: Number(e.target.value) })}
                    className="w-full bg-[#061321] text-xs text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                  />
                </div>
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
                  Save Sanctuary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
