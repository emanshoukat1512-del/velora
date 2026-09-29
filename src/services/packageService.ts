import { TravelPackage } from '../types';
import { mockPackages } from '../data/mockData';
import { simulateDelay } from './api';

const STORAGE_KEY = 'velora_packages';

function getStoredPackages(): TravelPackage[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed reading packages from localStorage', e);
  }
  return mockPackages;
}

function savePackages(items: TravelPackage[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed saving packages to localStorage', e);
  }
}

export const packageService = {
  async getAll(params?: { destinationId?: string; search?: string; maxPrice?: number; featured?: boolean }): Promise<TravelPackage[]> {
    await simulateDelay(250);
    let results = getStoredPackages();

    if (params?.destinationId) {
      results = results.filter((p) => p.destinationId === params.destinationId);
    }

    if (params?.featured !== undefined) {
      results = results.filter((p) => p.featured === params.featured);
    }

    if (params?.maxPrice) {
      results = results.filter((p) => p.price <= params.maxPrice!);
    }

    if (params?.search) {
      const q = params.search.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.destinationName.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q) ||
          p.activities.some((a) => a.toLowerCase().includes(q))
      );
    }

    return results;
  },

  async getBySlug(slug: string): Promise<TravelPackage | null> {
    await simulateDelay(150);
    const packages = getStoredPackages();
    return packages.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null;
  },

  async getById(id: string): Promise<TravelPackage | null> {
    await simulateDelay(150);
    const packages = getStoredPackages();
    return packages.find((p) => p.id === id) || null;
  },

  async create(packageData: Omit<TravelPackage, 'id'>): Promise<TravelPackage> {
    await simulateDelay(300);
    const packages = getStoredPackages();
    const newPackage: TravelPackage = {
      ...packageData,
      id: `pkg-${Date.now()}`
    };
    packages.unshift(newPackage);
    savePackages(packages);
    return newPackage;
  },

  async update(id: string, updates: Partial<TravelPackage>): Promise<TravelPackage> {
    await simulateDelay(300);
    const packages = getStoredPackages();
    const index = packages.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Package with ID ${id} not found`);
    }
    packages[index] = { ...packages[index], ...updates };
    savePackages(packages);
    return packages[index];
  },

  async delete(id: string): Promise<boolean> {
    await simulateDelay(250);
    let packages = getStoredPackages();
    packages = packages.filter((p) => p.id !== id);
    savePackages(packages);
    return true;
  }
};
