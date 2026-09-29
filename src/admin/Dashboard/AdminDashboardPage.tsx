import React from 'react';
import { mockDashboardMetrics, mockBookings } from '../../data/mockData';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  CalendarCheck2,
  Users,
  Compass,
  ArrowUpRight,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboardPage: React.FC = () => {
  const { totalBookings, monthlyRevenue, activeCustomers, activePackages, revenueByMonth, statusDistribution, popularDestinations } =
    mockDashboardMetrics;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Monthly Revenue */}
        <div className="bg-[#061321] p-6 rounded-2xl border border-white/10 space-y-3 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Gross Revenue</span>
            <div className="w-8 h-8 rounded-full bg-[#18C8D8]/10 text-[#18C8D8] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              ${monthlyRevenue.toLocaleString()}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+24.8% vs last month</span>
            </div>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-[#061321] p-6 rounded-2xl border border-white/10 space-y-3 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Total Bookings</span>
            <div className="w-8 h-8 rounded-full bg-[#D9A441]/10 text-[#D9A441] flex items-center justify-center">
              <CalendarCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {totalBookings}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.2% new expeditions</span>
            </div>
          </div>
        </div>

        {/* VIP Customers */}
        <div className="bg-[#061321] p-6 rounded-2xl border border-white/10 space-y-3 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Active Voyagers</span>
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {activeCustomers}
            </span>
            <span className="text-xs text-slate-400 block mt-1">VIP & Regular Travelers</span>
          </div>
        </div>

        {/* Active Packages */}
        <div className="bg-[#061321] p-6 rounded-2xl border border-white/10 space-y-3 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Live Packages</span>
            <div className="w-8 h-8 rounded-full bg-[#086A9A]/30 text-[#18C8D8] flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {activePackages}
            </span>
            <span className="text-xs text-[#18C8D8] block mt-1">100% Curated & Live</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Over Time Area Chart */}
        <div className="lg:col-span-8 bg-[#061321] p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Revenue Growth Trajectory</h3>
              <p className="text-xs text-slate-400">Monthly booking revenue (USD) across all global packages</p>
            </div>
            <span className="text-xs text-[#18C8D8] font-mono font-semibold">2026 Season</span>
          </div>

          <div className="h-64 sm:h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueByMonth}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#18C8D8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#18C8D8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#071A2F',
                    borderColor: 'rgba(24,200,216,0.3)',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                  itemStyle={{ color: '#18C8D8' }}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#18C8D8"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution Pie Chart */}
        <div className="lg:col-span-4 bg-[#061321] p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Booking Status</h3>
            <p className="text-xs text-slate-400">Current lifecycle distribution of trips</p>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#071A2F',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
            {statusDistribution.map((item) => (
              <div key={item.status} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300">{item.status}:</span>
                <span className="font-bold text-white font-mono">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings Table (Section 26 Requirement) */}
      <div className="bg-[#061321] rounded-3xl border border-white/10 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Recent Traveler Reservations</h3>
            <p className="text-xs text-slate-400">Latest active bookings and concierge assignments</p>
          </div>
          <Link
            to="/admin/bookings"
            className="text-xs text-[#18C8D8] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View All ({mockBookings.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#071A2F]/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/5">
              <tr>
                <th className="px-6 py-3.5">Reference & Customer</th>
                <th className="px-6 py-3.5">Package</th>
                <th className="px-6 py-3.5">Departure Date</th>
                <th className="px-6 py-3.5">Travelers</th>
                <th className="px-6 py-3.5">Amount</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {mockBookings.map((b) => (
                <tr key={b.id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4">
                    <span className="font-mono text-[#18C8D8] font-bold block">{b.bookingReference}</span>
                    <span className="text-white font-medium">
                      {b.leadTraveler.firstName} {b.leadTraveler.lastName}
                    </span>
                    <span className="text-slate-400 block text-[11px]">{b.leadTraveler.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium block truncate max-w-xs">{b.packageName}</span>
                    <span className="text-slate-400">{b.destinationName}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-200">{b.travelDate}</td>
                  <td className="px-6 py-4 font-mono">{b.travelerCount} Guests</td>
                  <td className="px-6 py-4 font-mono font-bold text-white">${b.totalAmount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
