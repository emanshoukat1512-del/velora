import React, { useState, useEffect } from 'react';
import { Booking, BookingStatus } from '../../types';
import { bookingService } from '../../services/bookingService';
import { Search, Eye, CheckCircle2, XCircle, Clock, Check, X, ShieldCheck } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const AdminBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await bookingService.getAll();
      setBookings(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: BookingStatus) => {
    if (confirm(`Change booking status to "${newStatus}"?`)) {
      await bookingService.updateStatus(id, newStatus);
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      loadData();
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = selectedStatus === 'All' || b.status === selectedStatus;
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      b.bookingReference.toLowerCase().includes(q) ||
      b.packageName.toLowerCase().includes(q) ||
      b.destinationName.toLowerCase().includes(q) ||
      `${b.leadTraveler.firstName} ${b.leadTraveler.lastName}`.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Guest Reservation Management</h2>
          <p className="text-xs text-slate-400">Audit itineraries, verify concierge assignments, and update statuses</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#061321] p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ref, traveler, package..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#071A2F] text-xs text-white pl-9 pr-4 py-2 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedStatus === st
                  ? 'bg-[#18C8D8] text-[#071A2F]'
                  : 'bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-[#061321] rounded-3xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#071A2F]/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/5">
              <tr>
                <th className="px-6 py-3.5">Reference</th>
                <th className="px-6 py-3.5">Lead Guest</th>
                <th className="px-6 py-3.5">Journey Package</th>
                <th className="px-6 py-3.5">Travel Date</th>
                <th className="px-6 py-3.5">Guests</th>
                <th className="px-6 py-3.5">Amount</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 font-mono font-bold text-[#18C8D8]">
                    {b.bookingReference}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium block">
                      {b.leadTraveler.firstName} {b.leadTraveler.lastName}
                    </span>
                    <span className="text-slate-400 text-[11px]">{b.leadTraveler.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium block truncate max-w-xs">{b.packageName}</span>
                    <span className="text-slate-400">{b.destinationName}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-200">{b.travelDate}</td>
                  <td className="px-6 py-4 font-mono">{b.travelerCount}</td>
                  <td className="px-6 py-4 font-mono font-bold text-white">${b.totalAmount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                        b.status === 'Confirmed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : b.status === 'Completed'
                          ? 'bg-[#D9A441]/10 text-[#D9A441] border border-[#D9A441]/20'
                          : b.status === 'Pending'
                          ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedBooking(b)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#18C8D8] hover:text-[#071A2F] text-slate-300 font-semibold transition"
                    >
                      View Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#071A2F] border border-white/10 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-[#18C8D8] font-bold block">
                  {selectedBooking.bookingReference}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">Booking Dossier</h3>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-[#061321] p-4 rounded-xl space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Package:</span>
                  <span className="font-semibold text-white">{selectedBooking.packageName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Destination:</span>
                  <span className="text-white">{selectedBooking.destinationName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Departure:</span>
                  <span className="text-white">{selectedBooking.travelDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hotel Selected:</span>
                  <span className="text-white">{selectedBooking.hotelSelected || 'Primary Sanctuary'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Party Size:</span>
                  <span className="text-white">{selectedBooking.travelerCount} Travelers</span>
                </div>
              </div>

              <div className="bg-[#061321] p-4 rounded-xl space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Lead Voyager:</span>
                  <span className="font-semibold text-white">
                    {selectedBooking.leadTraveler.firstName} {selectedBooking.leadTraveler.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="text-white">{selectedBooking.leadTraveler.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone:</span>
                  <span className="text-white">{selectedBooking.leadTraveler.phone}</span>
                </div>
                {selectedBooking.specialRequests && (
                  <div className="pt-2 border-t border-white/5">
                    <span className="text-slate-400 block mb-1">Special Directives:</span>
                    <p className="text-slate-200 italic">{selectedBooking.specialRequests}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-sm font-bold bg-white/5 p-4 rounded-xl">
                <span>Total Transaction:</span>
                <span className="text-[#D9A441] font-mono text-lg">${selectedBooking.totalAmount}</span>
              </div>
            </div>

            {/* Lifecycle Status Buttons */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 justify-end">
              <button
                onClick={() => handleUpdateStatus(selectedBooking.id, 'Confirmed')}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition border border-emerald-500/30"
              >
                Confirm
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedBooking.id, 'Completed')}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#D9A441]/20 text-[#D9A441] hover:bg-[#D9A441]/30 transition border border-[#D9A441]/30"
              >
                Complete
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedBooking.id, 'Cancelled')}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition border border-rose-500/30"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
