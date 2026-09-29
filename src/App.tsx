import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { SmoothScrollProvider } from './components/common/SmoothScrollProvider';

// Public Pages (Lazy Loaded for optimum performance - Section 34)
const HomePage = lazy(() => import('./pages/Home/HomePage').then((m) => ({ default: m.HomePage })));
const DestinationsPage = lazy(() => import('./pages/Destinations/DestinationsPage').then((m) => ({ default: m.DestinationsPage })));
const DestinationDetailsPage = lazy(() => import('./pages/DestinationDetails/DestinationDetailsPage').then((m) => ({ default: m.DestinationDetailsPage })));
const PackagesPage = lazy(() => import('./pages/Packages/PackagesPage').then((m) => ({ default: m.PackagesPage })));
const PackageDetailsPage = lazy(() => import('./pages/PackageDetails/PackageDetailsPage').then((m) => ({ default: m.PackageDetailsPage })));
const HotelsPage = lazy(() => import('./pages/Hotels/HotelsPage').then((m) => ({ default: m.HotelsPage })));
const HotelDetailsPage = lazy(() => import('./pages/HotelDetails/HotelDetailsPage').then((m) => ({ default: m.HotelDetailsPage })));
const ExperiencesPage = lazy(() => import('./pages/Experiences/ExperiencesPage').then((m) => ({ default: m.ExperiencesPage })));
const AboutPage = lazy(() => import('./pages/About/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage').then((m) => ({ default: m.ContactPage })));
const BookingPage = lazy(() => import('./pages/Booking/BookingPage').then((m) => ({ default: m.BookingPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

// Admin Pages (Lazy Loaded)
const AdminDashboardPage = lazy(() => import('./admin/Dashboard/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })));
const AdminDestinationsPage = lazy(() => import('./admin/Destinations/AdminDestinationsPage').then((m) => ({ default: m.AdminDestinationsPage })));
const AdminPackagesPage = lazy(() => import('./admin/Packages/AdminPackagesPage').then((m) => ({ default: m.AdminPackagesPage })));
const AdminHotelsPage = lazy(() => import('./admin/Hotels/AdminHotelsPage').then((m) => ({ default: m.AdminHotelsPage })));
const AdminBookingsPage = lazy(() => import('./admin/Bookings/AdminBookingsPage').then((m) => ({ default: m.AdminBookingsPage })));
const AdminCustomersPage = lazy(() => import('./admin/Customers/AdminCustomersPage').then((m) => ({ default: m.AdminCustomersPage })));
const AdminSettingsPage = lazy(() => import('./admin/Settings/AdminSettingsPage').then((m) => ({ default: m.AdminSettingsPage })));

/**
 * Premium Loading Screen (Section 37)
 */
const LoadingScreen: React.FC = () => (
  <div className="fixed inset-0 z-50 bg-[#061321] flex flex-col items-center justify-center p-6 text-center select-none">
    <div className="relative mb-6">
      <div className="absolute inset-0 rounded-full bg-[#18C8D8]/20 blur-xl animate-pulse" />
      <img
        src="/logo.jpg"
        alt="VELORA"
        className="w-16 h-16 rounded-full object-cover relative z-10 border border-[#18C8D8]/40 shadow-2xl animate-spin-slow"
      />
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-bold tracking-[0.2em] text-white uppercase">VELORA</h3>
      <p className="text-xs tracking-widest text-[#D9A441] uppercase font-semibold">
        Preparing your journey...
      </p>
    </div>
    <div className="w-40 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
      <div className="w-full h-full bg-gradient-to-r from-[#18C8D8] to-[#D9A441] animate-pulse" />
    </div>
  </div>
);

export function App() {
  return (
    <Router>
      <SmoothScrollProvider>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Public Portal Routes with MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/destinations" element={<DestinationsPage />} />
              <Route path="/destinations/:slug" element={<DestinationDetailsPage />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route path="/packages/:slug" element={<PackageDetailsPage />} />
              <Route path="/hotels" element={<HotelsPage />} />
              <Route path="/hotels/:slug" element={<HotelDetailsPage />} />
              <Route path="/experiences" element={<ExperiencesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Admin Suite Routes with AdminLayout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="destinations" element={<AdminDestinationsPage />} />
              <Route path="packages" element={<AdminPackagesPage />} />
              <Route path="hotels" element={<AdminHotelsPage />} />
              <Route path="bookings" element={<AdminBookingsPage />} />
              <Route path="customers" element={<AdminCustomersPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>
          </Routes>
        </Suspense>
      </SmoothScrollProvider>
    </Router>
  );
}

export default App;
