import React, { useState, useEffect } from 'react';
import { Customer } from '../../types';
import { customerService } from '../../services/customerService';
import { Search, Mail, Phone, MapPin, Award, DollarSign, Calendar } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const AdminCustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function init() {
      setLoading(true);
      try {
        const data = await customerService.getAll();
        setCustomers(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Voyager Profile Directory</h2>
          <p className="text-xs text-slate-400">View customer lifetime spending, tier status, and communication channels</p>
        </div>
      </div>

      <div className="bg-[#061321] p-4 rounded-2xl border border-white/10 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search travelers by name or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#071A2F] text-xs text-white pl-9 pr-4 py-2 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
          />
        </div>
        <span className="text-xs text-slate-400">{filtered.length} VIP travelers</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="bg-[#061321] rounded-3xl p-6 border border-white/10 space-y-4 shadow-xl hover:border-[#18C8D8]/30 transition"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#18C8D8]/40"
                />
                <div>
                  <h3 className="text-base font-bold text-white">{c.name}</h3>
                  <span className="text-xs text-slate-400">{c.country}</span>
                </div>
              </div>
              <Badge variant={c.status === 'VIP' ? 'gold' : 'cyan'} size="sm">
                {c.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-[#071A2F] p-3 rounded-2xl border border-white/5">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Lifetime Spend</span>
                <span className="font-mono font-bold text-[#D9A441] text-sm">${c.totalSpent.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Expeditions Booked</span>
                <span className="font-mono font-bold text-white text-sm">{c.totalBookings} Trips</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-white/5">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#18C8D8]" />
                <span className="text-slate-200">{c.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#18C8D8]" />
                <span className="text-slate-200">{c.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#D9A441]" />
                <span className="text-slate-400">Last Departure: {c.lastBookingDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
