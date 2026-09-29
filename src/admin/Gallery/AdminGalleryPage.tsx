import React, { useState } from 'react';
import { mockGalleryItems } from '../../data/mockData';
import { GalleryItem } from '../../types';
import { UploadCloud, Image as ImageIcon, Trash2, Plus, Sparkles } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const AdminGalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>(mockGalleryItems);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [newImage, setNewImage] = useState({
    title: '',
    destination: '',
    country: '',
    category: 'Destinations' as 'Destinations' | 'Hotels' | 'Experiences' | 'Aerial',
    imageUrl: ''
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const created: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: newImage.title,
      destination: newImage.destination,
      country: newImage.country,
      region: 'Europe',
      category: newImage.category,
      imageUrl: newImage.imageUrl,
      likes: 0
    };
    setItems([created, ...items]);
    setShowUploadModal(false);
    setNewImage({ title: '', destination: '', country: '', category: 'Destinations', imageUrl: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Remove image from public gallery?')) {
      setItems(items.filter((i) => i.id !== id));
    }
  };

  const filtered = activeCategory === 'All'
    ? items
    : items.filter((i) => i.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Media & Visual Assets Gallery</h2>
          <p className="text-xs text-slate-400">Manage high-resolution imagery across destinations, properties, and experiences</p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-[#18C8D8] text-[#071A2F] hover:brightness-110 transition shadow-md self-start sm:self-auto"
        >
          <UploadCloud className="w-4 h-4 stroke-[2.5]" />
          <span>Add Media Asset</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['All', 'Destinations', 'Hotels', 'Experiences', 'Aerial'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              activeCategory === cat
                ? 'bg-[#18C8D8] text-[#071A2F]'
                : 'bg-white/5 text-slate-300 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group relative bg-[#061321] rounded-3xl overflow-hidden border border-white/10 hover:border-[#18C8D8]/40 shadow-xl transition"
          >
            <div className="h-56 relative overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061321] via-transparent to-transparent opacity-80" />

              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold text-white bg-black/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-md">
                  {item.category}
                </span>
              </div>

              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-slate-300 hover:text-rose-400 hover:bg-black transition backdrop-blur-md"
                title="Delete Media"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-xs text-slate-400">{item.destination}, {item.country}</p>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">{item.likes} Likes</span>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Asset Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#071A2F] border border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Add New Media Asset</h3>
            <p className="text-xs text-slate-400">
              Prepare asset integration for cloud object storage (S3 / Cloudflare R2 / Local).
            </p>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Asset Title *</label>
                <input
                  type="text"
                  required
                  value={newImage.title}
                  onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                  placeholder="e.g. Sunset over Bosphorus Strait"
                  className="w-full bg-[#061321] text-xs text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Destination</label>
                  <input
                    type="text"
                    value={newImage.destination}
                    onChange={(e) => setNewImage({ ...newImage, destination: e.target.value })}
                    className="w-full bg-[#061321] text-xs text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                  <select
                    value={newImage.category}
                    onChange={(e) => setNewImage({ ...newImage, category: e.target.value as any })}
                    className="w-full bg-[#061321] text-xs text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                  >
                    <option value="Destinations">Destinations</option>
                    <option value="Hotels">Hotels</option>
                    <option value="Experiences">Experiences</option>
                    <option value="Aerial">Aerial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Image URL / S3 CDN Endpoint *</label>
                <input
                  type="url"
                  required
                  value={newImage.imageUrl}
                  onChange={(e) => setNewImage({ ...newImage, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#061321] text-xs text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-full text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full text-xs font-semibold bg-[#18C8D8] text-[#071A2F] hover:brightness-110 transition shadow-md"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
