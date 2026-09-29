import { Hotel } from '../types';
import { mockHotels } from '../data/mockData';
import { simulateDelay } from './api';

const STORAGE_KEY = 'velora_hotels';

function getStoredHotels(): Hotel[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed reading hotels from localStorage', e);
  }
  return mockHotels;
}

function saveHotels(items: Hotel[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed saving hotels to localStorage', e);
  }
}

export const hotelService = {
  async getAll(params?: { destinationId?: string; search?: string }): Promise<Hotel[]> {
    await simulateDelay(200);
    let results = getStoredHotels();

    if (params?.destinationId) {
      results = results.filter((h) => h.destinationId === params.destinationId);
    }

    if (params?.search) {
      const q = params.search.toLowerCase().trim();
      results = results.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.destinationName.toLowerCase().includes(q) ||
          h.facilities.some((f) => f.toLowerCase().includes(q))
      );
    }

    return results;
  },

  async getBySlug(slug: string): Promise<Hotel | null> {
    await simulateDelay(150);
    const hotels = getStoredHotels();
    return hotels.find((h) => h.slug.toLowerCase() === slug.toLowerCase()) || null;
  },

  async getById(id: string): Promise<Hotel | null> {
    await simulateDelay(150);
    const hotels = getStoredHotels();
    return hotels.find((h) => h.id === id) || null;
  },

  async create(hotelData: Omit<Hotel, 'id'>): Promise<Hotel> {
    await simulateDelay(300);
    const hotels = getStoredHotels();
    const newHotel: Hotel = {
      ...hotelData,
      id: `hotel-${Date.now()}`
    };
    hotels.unshift(newHotel);
    saveHotels(hotels);
    return newHotel;
  },

  async update(id: string, updates: Partial<Hotel>): Promise<Hotel> {
    await simulateDelay(300);
    const hotels = getStoredHotels();
    const index = hotels.findIndex((h) => h.id === id);
    if (index === -1) {
      throw new Error(`Hotel with ID ${id} not found`);
    }
    hotels[index] = { ...hotels[index], ...updates };
    saveHotels(hotels);
    return hotels[index];
  },

  async delete(id: string): Promise<boolean> {
    await simulateDelay(250);
    let hotels = getStoredHotels();
    hotels = hotels.filter((h) => h.id !== id);
    saveHotels(hotels);
    return true;
  }
};
