import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Search, User, Menu, X, Compass, ChevronRight, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './Button';
import { SearchModal } from './SearchModal';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Destinations', path: '/destinations' },
    { label: 'Packages', path: '/packages' },
    { label: 'Hotels', path: '/hotels' },
    { label: 'Experiences', path: '/experiences' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const isHome = location.pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'glass-nav py-3.5 shadow-xl'
            : isHome
            ? 'bg-transparent py-5'
            : 'bg-[#061321]/90 backdrop-blur-md py-4 border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Logo size="md" light={true} />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-[#18C8D8] font-semibold bg-white/5'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search destinations and packages"
              className="p-2 text-slate-300 hover:text-[#18C8D8] hover:bg-white/10 rounded-full transition duration-200"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                aria-label="User account"
                className="p-2 text-slate-300 hover:text-[#18C8D8] hover:bg-white/10 rounded-full transition duration-200 flex items-center gap-1"
              >
                <User className="w-5 h-5" />
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-3 w-56 bg-[#071A2F] border border-[#18C8D8]/20 rounded-2xl shadow-2xl py-2 z-50 animate-fadeIn text-sm text-slate-200"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-white/10">
                    <p className="font-semibold text-white">Alexander Sterling</p>
                    <p className="text-xs text-[#D9A441]">VIP Voyager Member</p>
                  </div>
                  <Link
                    to="/booking"
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-white/5 hover:text-[#18C8D8] transition"
                  >
                    <Compass className="w-4 h-4 text-[#18C8D8]" />
                    <span>My Trips & Booking</span>
                  </Link>
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-white/5 hover:text-[#D9A441] transition border-t border-white/5"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#D9A441]" />
                    <span>Admin Portal</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Book Now Button */}
            <Button
              to="/booking"
              variant="gold"
              size="sm"
              className="hidden sm:inline-flex shadow-gold"
            >
              Book Now
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl transition"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Animated Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[70px] bottom-0 bg-[#061321]/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col justify-between overflow-y-auto z-40 animate-fadeIn">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition ${
                      isActive
                        ? 'text-[#18C8D8] bg-[#18C8D8]/10 font-semibold'
                        : 'text-slate-200 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </NavLink>
              ))}
              
              <NavLink
                to="/admin"
                className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-[#D9A441] hover:bg-[#D9A441]/10 transition mt-4 border border-[#D9A441]/20"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#D9A441]" />
                  <span>Admin Management</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </NavLink>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <Button
                to="/booking"
                variant="gold"
                size="md"
                className="w-full justify-center"
              >
                Book Your Journey
              </Button>
              <p className="text-center text-xs text-slate-400">
                VELORA • See The World Differently
              </p>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
