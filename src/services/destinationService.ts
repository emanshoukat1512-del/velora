import { Destination, Region } from '../types';
import { mockDestinations } from '../data/mockData';
import { simulateDelay } from './api';

const STORAGE_KEY = 'velora_destinations';

function getStoredDestinations(): Destination[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed reading destinations from localStorage', e);
  }
  return mockDestinations;
}

function saveDestinations(items: Destination[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed saving destinations to localStorage', e);
  }
}

export const destinationService = {
  async getAll(params?: { region?: Region; search?: string }): Promise<Destination[]> {
    await simulateDelay(250);
    let results = getStoredDestinations();

    if (params?.region) {
      results = results.filter((d) => d.region === params.region);
    }

    if (params?.search) {
      const q = params.search.toLowerCase().trim();
      results = results.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.popularCities.some((c) => c.toLowerCase().includes(q))
      );
    }

    return results;
  },

  async getBySlug(slug: string): Promise<Destination | null> {
    await simulateDelay(150);
    const destinations = getStoredDestinations();
    return destinations.find((d) => d.slug.toLowerCase() === slug.toLowerCase()) || null;
  },

  async getById(id: string): Promise<Destination | null> {
    await simulateDelay(150);
    const destinations = getStoredDestinations();
    return destinations.find((d) => d.id === id) || null;
  },

  async create(destinationData: Omit<Destination, 'id'>): Promise<Destination> {
    await simulateDelay(300);
    const destinations = getStoredDestinations();
    const newDestination: Destination = {
      ...destinationData,
      id: `dest-${Date.now()}`
    };
    destinations.unshift(newDestination);
    saveDestinations(destinations);
    return newDestination;
  },

  async update(id: string, updates: Partial<Destination>): Promise<Destination> {
    await simulateDelay(300);
    const destinations = getStoredDestinations();
    const index = destinations.findIndex((d) => d.id === id);
    if (index === -1) {
      throw new Error(`Destination with ID ${id} not found`);
    }
    destinations[index] = { ...destinations[index], ...updates };
    saveDestinations(destinations);
    return destinations[index];
  },

  async delete(id: string): Promise<boolean> {
    await simulateDelay(250);
    let destinations = getStoredDestinations();
    destinations = destinations.filter((d) => d.id !== id);
    saveDestinations(destinations);
    return true;
  }
};
