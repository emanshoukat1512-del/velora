import React, { useState } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  Compass,
  Building2,
  CalendarCheck2,
  Users,
  Image as ImageIcon,
  Settings,
  ExternalLink,
  Menu,
  X,
  Bell,
  Search,
  ShieldCheck
} from 'lucide-react';
import { Logo } from '../components/common/Logo';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const adminNavItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Destinations', path: '/admin/destinations', icon: MapPin },
    { label: 'Packages', path: '/admin/packages', icon: Compass },
    { label: 'Hotels', path: '/admin/hotels', icon: Building2 },
    { label: 'Bookings', path: '/admin/bookings', icon: CalendarCheck2 },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
    { label: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  const currentTitle =
    adminNavItems.find((item) =>
      item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)
    )?.label || 'Portal';

  return (
    <div className="min-h-screen bg-[#040D17] text-slate-100 flex flex-col md:flex-row antialiased">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#071A2F] border-b border-white/10 px-4 py-3 flex items-center justify-between z-30 sticky top-0">
        <Logo size="sm" light={true} />
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#061321] border-r border-[#18C8D8]/10 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 md:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Logo size="md" light={true} />
          </div>

          <div className="px-4 py-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3">
              Management Suite
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#18C8D8]/10 text-[#18C8D8] border border-[#18C8D8]/20 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#18C8D8]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <Link
            to="/"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition border border-white/5"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#18C8D8]" />
              <span>View Live Website</span>
            </span>
            <span className="text-[10px] text-[#D9A441] font-mono">v1.0</span>
          </Link>

          <div className="flex items-center gap-3 px-3 py-2 bg-[#071A2F] rounded-xl border border-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#086A9A] to-[#18C8D8] flex items-center justify-center text-xs font-bold text-white">
              VS
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-semibold text-white truncate">Curator Console</p>
              <p className="text-[10px] text-[#18C8D8] truncate flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Super Admin
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Admin Content Container */}
      <div data-lenis-prevent className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="h-16 bg-[#061321]/90 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-white tracking-wide">
              {currentTitle}
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] bg-[#18C8D8]/10 text-[#18C8D8] border border-[#18C8D8]/30 font-medium">
              Live Production
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search admin records..."
                className="bg-[#071A2F] text-xs text-white rounded-full pl-9 pr-4 py-2 border border-white/10 focus:border-[#18C8D8] focus:outline-none w-48 focus:w-64 transition-all"
              />
            </div>

            <button
              aria-label="Admin notifications"
              className="relative p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#D9A441] rounded-full animate-pulse" />
            </button>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 md:hidden"
        />
      )}
    </div>
  );
};
