import { Booking, BookingStatus } from '../types';
import { mockBookings } from '../data/mockData';
import { simulateDelay } from './api';

const STORAGE_KEY = 'velora_bookings';

function getStoredBookings(): Booking[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed reading bookings from localStorage', e);
  }
  return mockBookings;
}

function saveBookings(items: Booking[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed saving bookings to localStorage', e);
  }
}

export const bookingService = {
  async getAll(): Promise<Booking[]> {
    await simulateDelay(200);
    return getStoredBookings();
  },

  async getById(id: string): Promise<Booking | null> {
    await simulateDelay(150);
    const bookings = getStoredBookings();
    return bookings.find((b) => b.id === id || b.bookingReference === id) || null;
  },

  async create(bookingData: Omit<Booking, 'id' | 'bookingReference' | 'createdAt' | 'status' | 'paymentStatus'>): Promise<Booking> {
    await simulateDelay(400);
    const bookings = getStoredBookings();
    const newRef = `VEL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      bookingReference: newRef,
      status: 'Confirmed',
      paymentStatus: 'Pending Verification',
      createdAt: new Date().toISOString()
    };
    bookings.unshift(newBooking);
    saveBookings(bookings);
    return newBooking;
  },

  async updateStatus(id: string, status: BookingStatus): Promise<Booking> {
    await simulateDelay(200);
    const bookings = getStoredBookings();
    const index = bookings.findIndex((b) => b.id === id || b.bookingReference === id);
    if (index === -1) {
      throw new Error(`Booking ${id} not found`);
    }
    bookings[index].status = status;
    saveBookings(bookings);
    return bookings[index];
  }
};
