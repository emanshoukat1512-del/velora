import { useState } from 'react';
import { TravelPackage, Traveler, Booking } from '../types';
import { mockPackages } from '../data/mockData';

export interface BookingFormData {
  selectedPackage: TravelPackage | null;
  travelDate: string;
  travelerCount: number;
  leadTraveler: Traveler;
  specialRequests: string;
  selectedHotelName?: string;
}

const initialTraveler: Traveler = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: 'United States',
  dietaryRequirements: ''
};

export const defaultBookingState: BookingFormData = {
  selectedPackage: mockPackages[0],
  travelDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  travelerCount: 2,
  leadTraveler: initialTraveler,
  specialRequests: '',
  selectedHotelName: mockPackages[0]?.hotelName
};

export function useBookingStore() {
  const [formData, setFormData] = useState<BookingFormData>(defaultBookingState);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const updateFormData = (patch: Partial<BookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  };

  const updateLeadTraveler = (patch: Partial<Traveler>) => {
    setFormData((prev) => ({
      ...prev,
      leadTraveler: { ...prev.leadTraveler, ...patch }
    }));
  };

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));
  const goToStep = (step: number) => setCurrentStep(step);

  const resetBooking = () => {
    setFormData(defaultBookingState);
    setCurrentStep(1);
    setConfirmedBooking(null);
  };

  // Pricing calculations
  const pricePerTraveler = formData.selectedPackage ? formData.selectedPackage.price : 0;
  const subtotal = pricePerTraveler * formData.travelerCount;
  const taxesAndFees = Math.round(subtotal * 0.08); // 8% luxury resort & service fee
  const totalAmount = subtotal + taxesAndFees;

  return {
    formData,
    currentStep,
    confirmedBooking,
    pricePerTraveler,
    subtotal,
    taxesAndFees,
    totalAmount,
    updateFormData,
    updateLeadTraveler,
    nextStep,
    prevStep,
    goToStep,
    setConfirmedBooking,
    resetBooking
  };
}
