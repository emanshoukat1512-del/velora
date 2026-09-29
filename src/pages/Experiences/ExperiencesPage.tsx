import React, { useState, useEffect } from 'react';
import { Experience } from '../../types';
import { experienceService } from '../../services/experienceService';
import { ExperienceCard } from '../../components/cards/ExperienceCard';
import { Badge } from '../../components/common/Badge';

export const ExperiencesPage: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Desert Safari',
    'Island Cruise',
    'Mountain Adventure',
    'Cultural Experience',
    'Wildlife Adventure'
  ];

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await experienceService.getAll(selectedCategory);
        setExperiences(data);
      } catch (err) {
        console.error('Failed to load experiences', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#061321] text-white pt-24 pb-20">
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#071A2F] to-[#061321] border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <Badge variant="gold" size="md">
            Unforgettable Moments
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Curated Experiences
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto font-light">
            Singular adventures handcrafted to forge unforgettable memories, from after-hours museum curations to private superyacht sunsets.
          </p>

          <div className="flex items-center justify-center gap-2 pt-6 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                  selectedCategory === cat
                    ? 'bg-[#D9A441] text-[#071A2F] border-[#D9A441] shadow-md shadow-[#D9A441]/20 font-bold'
                    : 'bg-[#071A2F] text-slate-300 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {loading ? (
          <div className="text-center py-24 space-y-4">
            <div className="w-10 h-10 border-2 border-[#D9A441] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-400 text-sm">Loading curated experiences...</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8 text-xs text-slate-400">
              <span>Showing {experiences.length} unique activities</span>
              <span className="text-[#18C8D8] font-medium">Private & Small Groups Only</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experiences.map((exp, idx) => (
                <ExperienceCard key={exp.id} experience={exp} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
