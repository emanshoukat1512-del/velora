import { Customer } from '../types';
import { mockCustomers } from '../data/mockData';
import { simulateDelay } from './api';

export const customerService = {
  async getAll(): Promise<Customer[]> {
    await simulateDelay(200);
    return mockCustomers;
  },

  async getById(id: string): Promise<Customer | null> {
    await simulateDelay(150);
    return mockCustomers.find((c) => c.id === id) || null;
  }
};
