import React, { useState } from 'react';
import { mockGalleryItems } from '../../data/mockData';
import { Region, GalleryItem } from '../../types';
import { Badge } from '../../components/common/Badge';
import { X, Heart, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region | 'All'>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const regions: (Region | 'All')[] = ['All', 'Europe', 'Middle East', 'Asia'];

  const filteredItems = selectedRegion === 'All'
    ? mockGalleryItems
    : mockGalleryItems.filter((item) => item.region === selectedRegion);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#061321] text-white pt-24 pb-24">
      {/* Header */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#071A2F] to-[#061321] border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <Badge variant="cyan" size="md">
            Visual Archive
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Cinematic Global Gallery
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto font-light">
            An immersive spatial retrospective capturing remote valleys, architectural monuments, and pristine waters.
          </p>

          {/* Region Filters */}
          <div className="flex items-center justify-center gap-2 pt-6 flex-wrap">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all border ${
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

      {/* 3D-Style Horizontal Showcase (Section 18 Requirement) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
            Spatial Perspective Carousel
          </span>
          <span className="text-xs text-[#18C8D8]">Click any photo for full immersion</span>
        </div>

        {/* 3D Angled Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-[1000px]">
          {filteredItems.map((item, index) => {
            const isLiked = !!likedMap[item.id];
            // Center element or angled side elements
            const angleClass =
              index % 3 === 0
                ? 'lg:rotate-y-[4deg] lg:hover:rotate-y-0'
                : index % 3 === 2
                ? 'lg:-rotate-y-[4deg] lg:hover:rotate-y-0'
                : 'lg:scale-105';

            return (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`group relative h-96 rounded-3xl overflow-hidden border border-white/10 hover:border-[#18C8D8]/50 shadow-2xl cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-cyan-500/20 transform ${angleClass}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061321] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                    {item.category}
                  </span>

                  <button
                    onClick={(e) => toggleLike(item.id, e)}
                    className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:text-rose-400 transition"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isLiked ? 'fill-rose-500 text-rose-500' : 'text-white'
                      }`}
                    />
                  </button>
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] text-[#D9A441] font-semibold block uppercase tracking-wider">
                      {item.destination}, {item.country}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#18C8D8] transition">
                      {item.title}
                    </h3>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#18C8D8] group-hover:text-[#071A2F] transition">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      {activeItem && (
        <div
          onClick={() => setActiveItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#071A2F] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div>
                <h3 className="text-base font-bold text-white">{activeItem.title}</h3>
                <p className="text-xs text-slate-400">{activeItem.destination}, {activeItem.country} • {activeItem.category}</p>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative max-h-[70vh] flex items-center justify-center bg-black">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
