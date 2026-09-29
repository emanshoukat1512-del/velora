import { Experience } from '../types';
import { mockExperiences } from '../data/mockData';
import { simulateDelay } from './api';

export const experienceService = {
  async getAll(category?: string): Promise<Experience[]> {
    await simulateDelay(200);
    if (category && category !== 'All') {
      return mockExperiences.filter((e) => e.category === category);
    }
    return mockExperiences;
  },

  async getBySlug(slug: string): Promise<Experience | null> {
    await simulateDelay(150);
    return mockExperiences.find((e) => e.slug.toLowerCase() === slug.toLowerCase()) || null;
  }
};
