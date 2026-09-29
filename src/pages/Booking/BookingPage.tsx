import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBookingStore } from '../../hooks/useBookingStore';
import { packageService } from '../../services/packageService';
import { bookingService } from '../../services/bookingService';
import { TravelPackage } from '../../types';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import confetti from 'canvas-confetti';
import {
  Check,
  Plane,
  User,
  Calendar,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Building,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  Download
} from 'lucide-react';

export const BookingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const {
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
  } = useBookingStore();

  // Load packages and handle pre-selection from router state
  useEffect(() => {
    async function init() {
      setIsLoadingPackages(true);
      try {
        const pkgs = await packageService.getAll();
        setPackages(pkgs);

        // Pre-selection from state passed via navigate('/booking', { state: { packageId: ... } })
        if (location.state?.packageId) {
          const matched = pkgs.find((p) => p.id === location.state.packageId);
          if (matched) {
            updateFormData({ selectedPackage: matched, selectedHotelName: matched.hotelName });
          }
        }
      } catch (e) {
        console.error('Failed to load packages for booking', e);
      } finally {
        setIsLoadingPackages(false);
      }
    }
    init();
  }, [location.state]);

  // Validation before advancing to next step
  const validateCurrentStep = (): boolean => {
    const errors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.selectedPackage) {
        errors.package = 'Please select a travel package to proceed.';
      }
    } else if (currentStep === 2) {
      if (!formData.leadTraveler.firstName.trim()) errors.firstName = 'First name is required.';
      if (!formData.leadTraveler.lastName.trim()) errors.lastName = 'Last name is required.';
      if (!formData.leadTraveler.email.trim() || !/\S+@\S+\.\S+/.test(formData.leadTraveler.email)) {
        errors.email = 'A valid email address is required.';
      }
      if (!formData.leadTraveler.phone.trim() || formData.leadTraveler.phone.length < 7) {
        errors.phone = 'A valid phone number is required.';
      }
    } else if (currentStep === 3) {
      if (!formData.travelDate) errors.travelDate = 'Please select a valid departure date.';
      if (formData.travelerCount < 1) errors.travelerCount = 'At least 1 traveler is required.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setFormErrors({});
      nextStep();
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  // Final submission on Step 4
  const handleConfirmBooking = async () => {
    if (!formData.selectedPackage) return;
    setIsSubmitting(true);
    try {
      const created = await bookingService.create({
        packageId: formData.selectedPackage.id,
        packageName: formData.selectedPackage.title,
        destinationName: formData.selectedPackage.destinationName,
        travelDate: formData.travelDate,
        travelerCount: formData.travelerCount,
        leadTraveler: formData.leadTraveler,
        hotelSelected: formData.selectedHotelName || formData.selectedPackage.hotelName,
        pricePerTraveler,
        subtotal,
        taxesAndFees,
        totalAmount,
        specialRequests: formData.specialRequests
      });

      setConfirmedBooking(created);
      goToStep(5);

      // Trigger celebratory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#18C8D8', '#D9A441', '#FFFFFF']
      });
    } catch (e) {
      console.error('Failed to create booking', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, label: 'Choose Package' },
    { num: 2, label: 'Traveler Details' },
    { num: 3, label: 'Travel Dates' },
    { num: 4, label: 'Summary' },
    { num: 5, label: 'Confirmation' }
  ];

  return (
    <div className="min-h-screen bg-[#061321] text-white pt-24 pb-24">
      {/* Header */}
      <div className="relative py-12 px-4 sm:px-6 lg:px-8 bg-[#071A2F] border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <Badge variant="gold" size="sm">
            Bespoke Reservation
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Reserve Your VELORA Journey
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            A frictionless, transparent booking experience backed by 24/7 dedicated concierge coordination.
          </p>

          {/* Stepper Progress Bar */}
          <div className="pt-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-[#18C8D8] to-[#D9A441] -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              />

              {steps.map((s) => {
                const isPassed = currentStep > s.num;
                const isCurrent = currentStep === s.num;
                return (
                  <div key={s.num} className="relative z-10 flex flex-col items-center">
                    <button
                      type="button"
                      disabled={s.num > currentStep}
                      onClick={() => s.num < currentStep && goToStep(s.num)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        isPassed
                          ? 'bg-[#18C8D8] text-[#071A2F]'
                          : isCurrent
                          ? 'bg-[#D9A441] text-[#071A2F] ring-4 ring-[#D9A441]/20 font-black'
                          : 'bg-[#071A2F] text-slate-500 border border-white/10'
                      }`}
                    >
                      {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                    </button>
                    <span
                      className={`text-[10px] uppercase tracking-wider font-semibold mt-2 hidden sm:block ${
                        isCurrent ? 'text-white' : isPassed ? 'text-[#18C8D8]' : 'text-slate-500'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-[#071A2F] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
          {/* ====================================================
              STEP 1: CHOOSE PACKAGE
          ==================================================== */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white">Step 1: Select Your Travel Package</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Choose your preferred curated expedition. All packages include private transfers and accommodations.
                </p>
              </div>

              {formErrors.package && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{formErrors.package}</span>
                </div>
              )}

              {isLoadingPackages ? (
                <div className="py-12 text-center text-slate-400 text-xs">Loading available packages...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {packages.map((pkg) => {
                    const isSelected = formData.selectedPackage?.id === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => updateFormData({ selectedPackage: pkg, selectedHotelName: pkg.hotelName })}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#18C8D8]/10 border-[#18C8D8] shadow-lg shadow-[#18C8D8]/10'
                            : 'bg-white/5 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={pkg.heroImage}
                            alt={pkg.title}
                            className="w-16 h-16 rounded-xl object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] text-[#18C8D8] font-bold uppercase tracking-wider block">
                              {pkg.destinationName}
                            </span>
                            <h4 className="text-sm font-bold text-white truncate">{pkg.title}</h4>
                            <span className="text-xs text-slate-400 block mt-1">{pkg.duration}</span>
                          </div>
                        </div>

                        <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between">
                          <span className="text-xs text-slate-300">
                            Stay: <strong className="text-white">{pkg.hotelName.split('&')[0]}</strong>
                          </span>
                          <span className="text-sm font-bold text-[#D9A441]">
                            ${pkg.price} <span className="text-[10px] text-slate-400 font-normal">/ guest</span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="pt-6 flex justify-end">
                <Button onClick={handleNext} variant="primary" size="md">
                  Continue to Traveler Details →
                </Button>
              </div>
            </div>
          )}

          {/* ====================================================
              STEP 2: TRAVELER INFORMATION
          ==================================================== */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white">Step 2: Primary Traveler Information</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Please provide the lead guest details for security clearance and itinerary dispatch.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">First Name *</label>
                  <input
                    type="text"
                    value={formData.leadTraveler.firstName}
                    onChange={(e) => updateLeadTraveler({ firstName: e.target.value })}
                    placeholder="e.g. Alexander"
                    className="w-full bg-[#061321] text-white text-xs px-4 py-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                  />
                  {formErrors.firstName && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.firstName}</span>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Last Name *</label>
                  <input
                    type="text"
                    value={formData.leadTraveler.lastName}
                    onChange={(e) => updateLeadTraveler({ lastName: e.target.value })}
                    placeholder="e.g. Sterling"
                    className="w-full bg-[#061321] text-white text-xs px-4 py-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                  />
                  {formErrors.lastName && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.lastName}</span>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    value={formData.leadTraveler.email}
                    onChange={(e) => updateLeadTraveler({ email: e.target.value })}
                    placeholder="e.g. alexander@example.com"
                    className="w-full bg-[#061321] text-white text-xs px-4 py-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                  />
                  {formErrors.email && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.email}</span>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Mobile Phone (WhatsApp enabled) *</label>
                  <input
                    type="tel"
                    value={formData.leadTraveler.phone}
                    onChange={(e) => updateLeadTraveler({ phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#061321] text-white text-xs px-4 py-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                  />
                  {formErrors.phone && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.phone}</span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Country of Residence</label>
                  <input
                    type="text"
                    value={formData.leadTraveler.country}
                    onChange={(e) => updateLeadTraveler({ country: e.target.value })}
                    placeholder="e.g. United States, United Kingdom, UAE"
                    className="w-full bg-[#061321] text-white text-xs px-4 py-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Packages
                </button>
                <Button onClick={handleNext} variant="primary" size="md">
                  Continue to Travel Dates →
                </Button>
              </div>
            </div>
          )}

          {/* ====================================================
              STEP 3: TRAVEL DETAILS
          ==================================================== */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white">Step 3: Travel Schedule & Guest Count</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Specify your preferred departure date and the number of travelers in your party.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Departure Date *</label>
                  <input
                    type="date"
                    value={formData.travelDate}
                    onChange={(e) => updateFormData({ travelDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-[#061321] text-white text-xs px-4 py-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                  />
                  {formErrors.travelDate && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.travelDate}</span>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Number of Travelers</label>
                  <select
                    value={formData.travelerCount}
                    onChange={(e) => updateFormData({ travelerCount: Number(e.target.value) })}
                    className="w-full bg-[#061321] text-white text-xs px-4 py-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Special Requests or Dietary Requirements (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.specialRequests}
                    onChange={(e) => updateFormData({ specialRequests: e.target.value })}
                    placeholder="e.g. High floor suite, vegetarian gourmet options, anniversary celebration, airport fast-track requirement..."
                    className="w-full bg-[#061321] text-white text-xs p-4 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Traveler Info
                </button>
                <Button onClick={handleNext} variant="primary" size="md">
                  Review Booking Summary →
                </Button>
              </div>
            </div>
          )}

          {/* ====================================================
              STEP 4: BOOKING SUMMARY
          ==================================================== */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white">Step 4: Itinerary Review & Price Summary</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Verify your expedition details. No payment is charged until confirmed by our senior travel curator.
                </p>
              </div>

              {/* Itemized Card */}
              <div className="bg-[#061321] p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <div>
                    <span className="text-[10px] text-[#18C8D8] uppercase tracking-wider font-bold">
                      {formData.selectedPackage?.destinationName}
                    </span>
                    <h3 className="text-base font-bold text-white">{formData.selectedPackage?.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{formData.selectedPackage?.duration}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Departure</span>
                    <span className="text-xs font-semibold text-white">{formData.travelDate}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-500 block">Lead Guest:</span>
                    <span className="font-semibold text-white">
                      {formData.leadTraveler.firstName} {formData.leadTraveler.lastName}
                    </span>
                    <span className="text-slate-400 block text-[11px]">{formData.leadTraveler.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Accommodations:</span>
                    <span className="font-semibold text-white">{formData.selectedHotelName}</span>
                    <span className="text-slate-400 block text-[11px]">{formData.travelerCount} Travelers</span>
                  </div>
                </div>

                {/* Price Breakdown (Section 21) */}
                <div className="pt-4 border-t border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Base Fare (${pricePerTraveler} × {formData.travelerCount} Guests)</span>
                    <span className="font-mono text-white">${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Resort Fees & Luxury Taxes (8%)</span>
                    <span className="font-mono text-white">${taxesAndFees}</span>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex justify-between text-base font-bold">
                    <span className="text-white">Total Amount</span>
                    <span className="font-mono text-2xl text-[#D9A441]">${totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Security & Concierge Assurance */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-slate-300">
                <ShieldCheck className="w-5 h-5 text-[#18C8D8] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">VELORA Payment Guarantee</strong>
                  <span>
                    Confirming this journey reserves your suite with 0 upfront deposit required today. A senior concierge will review and establish private VIP transfers within 4 hours.
                  </span>
                </div>
              </div>

              <div className="pt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Edit Travel Dates
                </button>
                <Button
                  onClick={handleConfirmBooking}
                  variant="gold"
                  size="lg"
                  isLoading={isSubmitting}
                  icon={<Plane className="w-4 h-4" />}
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}

          {/* ====================================================
              STEP 5: BOOKING CONFIRMATION
          ==================================================== */}
          {currentStep === 5 && confirmedBooking && (
            <div className="space-y-8 text-center animate-fadeIn py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#D9A441] font-bold">
                  Reservation Successful
                </span>
                <h2 className="text-3xl font-black text-white mt-1">
                  Your Journey is Confirmed
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-2">
                  Thank you for placing your trust in VELORA. A dedicated travel dossier has been dispatched to your email.
                </p>
              </div>

              {/* Confirmed Details Card */}
              <div className="bg-[#061321] rounded-2xl p-6 border border-white/10 max-w-lg mx-auto text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Booking Reference
                  </span>
                  <span className="text-sm font-bold font-mono text-[#18C8D8]">
                    {confirmedBooking.bookingReference}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Package:</span>
                    <span className="font-semibold text-white">{confirmedBooking.packageName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Destination:</span>
                    <span className="text-white">{confirmedBooking.destinationName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Departure Date:</span>
                    <span className="text-white">{confirmedBooking.travelDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Travelers:</span>
                    <span className="text-white">{confirmedBooking.travelerCount} Guests</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Primary Guest:</span>
                    <span className="text-white">
                      {confirmedBooking.leadTraveler.firstName} {confirmedBooking.leadTraveler.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/5 font-bold">
                    <span className="text-white">Total Amount:</span>
                    <span className="text-sm font-mono text-[#D9A441]">${confirmedBooking.totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Actions (Section 22: Download Confirmation & Back to Home) */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => alert(`Official confirmation document generated for reference ${confirmedBooking.bookingReference}. Preparing PDF export...`)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#071A2F] bg-white hover:bg-slate-200 transition shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Confirmation</span>
                </button>

                <Button
                  to="/"
                  variant="outline"
                  size="md"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
