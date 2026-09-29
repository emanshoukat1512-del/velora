export type Region = 'Asia' | 'Europe' | 'Middle East' | 'Africa' | 'Americas' | 'Oceania';

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: Region;
  tagline: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
  startingPrice: number;
  packageCount: number;
  hotelCount: number;
  bestTimeToVisit: string;
  averageTripDuration: string;
  popularCities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  highlights: string[];
  travelTips: string[];
  featured?: boolean;
}

export interface DailyItineraryItem {
  day: number;
  title: string;
  description: string;
  highlights: string[];
  accommodation: string;
  mealsIncluded: string;
}

export interface TravelPackage {
  id: string;
  slug: string;
  title: string;
  destinationId: string;
  destinationName: string;
  country: string;
  duration: string; // e.g. "7 Days / 6 Nights"
  durationDays: number;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  heroImage: string;
  images: string[];
  hotelName: string;
  hotelRating: number;
  overview: string;
  itinerary: DailyItineraryItem[];
  included: string[];
  excluded: string[];
  activities: string[];
  transportation: string;
  featured?: boolean;
  status: 'active' | 'draft' | 'archived';
}

export interface HotelRoom {
  id: string;
  name: string;
  type: string;
  capacity: string;
  pricePerNight: number;
  sizeSqM: number;
  amenities: string[];
  image: string;
}

export interface Hotel {
  id: string;
  slug: string;
  name: string;
  destinationId: string;
  destinationName: string;
  country: string;
  rating: number;
  reviewCount: number;
  stars: number;
  heroImage: string;
  images: string[];
  startingPricePerNight: number;
  description: string;
  facilities: string[];
  locationDetails: string;
  rooms: HotelRoom[];
  has360Tour: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  featured?: boolean;
}

export interface Experience {
  id: string;
  slug: string;
  title: string;
  category: 'Desert Safari' | 'Island Cruise' | 'Mountain Adventure' | 'City Tour' | 'Cultural Experience' | 'Luxury Dining' | 'Wildlife Adventure';
  destinationId: string;
  destinationName: string;
  country: string;
  duration: string;
  price: number;
  rating: number;
  reviewCount: number;
  heroImage: string;
  description: string;
  highlights: string[];
  included: string[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  groupSize: string;
  featured?: boolean;
}

export interface Traveler {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  passportNumber?: string;
  dietaryRequirements?: string;
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';

export interface Booking {
  id: string;
  bookingReference: string;
  packageId: string;
  packageName: string;
  destinationName: string;
  travelDate: string;
  travelerCount: number;
  leadTraveler: Traveler;
  hotelSelected?: string;
  pricePerTraveler: number;
  subtotal: number;
  taxesAndFees: number;
  totalAmount: number;
  specialRequests?: string;
  status: BookingStatus;
  createdAt: string;
  paymentStatus: 'Pending Verification' | 'Deposit Paid' | 'Paid in Full';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  totalBookings: number;
  totalSpent: number;
  lastBookingDate: string;
  status: 'Active' | 'VIP' | 'Inactive';
  avatar?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  destination: string;
  country: string;
  region: Region;
  imageUrl: string;
  category: 'Destinations' | 'Hotels' | 'Experiences' | 'Aerial';
  likes: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Travel Curator' | 'Support Agent';
  avatar: string;
}
