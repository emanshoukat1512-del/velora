import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { ShieldCheck, Save, Globe, Bell, Database, RefreshCw, Key } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [apiBaseUrl, setApiBaseUrl] = useState(import.meta.env.VITE_API_BASE_URL || 'https://api.velora.luxury/v1');
  const [currency, setCurrency] = useState('USD ($)');
  const [bookingAlerts, setBookingAlerts] = useState(true);
  const [vipEscalations, setVipEscalations] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResetData = () => {
    if (confirm('Reset stored local administrative data back to clean production seed defaults?')) {
      localStorage.removeItem('velora_destinations');
      localStorage.removeItem('velora_packages');
      localStorage.removeItem('velora_hotels');
      localStorage.removeItem('velora_bookings');
      alert('Local repository cache reset to initial seed values.');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold text-white">Platform Settings & Enterprise APIs</h2>
        <p className="text-xs text-slate-400">Configure global currency, API endpoints, and real-time concierge alerts</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Backend & API Configuration (Section 32) */}
        <div className="bg-[#061321] rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-sm font-bold text-[#18C8D8] uppercase tracking-wider">
            <Key className="w-4 h-4 text-[#18C8D8]" />
            <span>Backend API Connectivity (Section 32)</span>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Active API Base URL (VITE_API_BASE_URL)
            </label>
            <input
              type="text"
              value={apiBaseUrl}
              onChange={(e) => setApiBaseUrl(e.target.value)}
              className="w-full bg-[#071A2F] text-xs font-mono text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Default fallback is active mock service layer. Point to production microservice endpoints when deploying.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Standard Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-[#071A2F] text-xs text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
              >
                <option value="USD ($)">USD — United States Dollar ($)</option>
                <option value="EUR (€)">EUR — Euro (€)</option>
                <option value="GBP (£)">GBP — British Pound (£)</option>
                <option value="AED (د.إ)">AED — UAE Dirham (AED)</option>
                <option value="CHF (Fr)">CHF — Swiss Franc (CHF)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">3D Engine Performance Profile</label>
              <select
                defaultValue="Ultra High-Performance"
                className="w-full bg-[#071A2F] text-xs text-white p-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
              >
                <option value="Ultra High-Performance">Ultra High-Performance (Adaptive DPR)</option>
                <option value="Battery Saver">Battery Saver (Low Polygon Fallback)</option>
                <option value="Static Fallback">Static 2D Mode Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications & Concierge Dispatch */}
        <div className="bg-[#061321] rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-sm font-bold text-[#D9A441] uppercase tracking-wider">
            <Bell className="w-4 h-4 text-[#D9A441]" />
            <span>Concierge Dispatch Notifications</span>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={bookingAlerts}
                onChange={(e) => setBookingAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-[#18C8D8] accent-[#18C8D8]"
              />
              <div>
                <span className="text-xs font-semibold text-white block">Real-time New Booking Alerts</span>
                <span className="text-[11px] text-slate-400">Receive instant push notification when a voyager submits a reservation</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={vipEscalations}
                onChange={(e) => setVipEscalations(e.target.checked)}
                className="w-4 h-4 rounded text-[#18C8D8] accent-[#18C8D8]"
              />
              <div>
                <span className="text-xs font-semibold text-white block">VIP High-Net-Worth Escalations</span>
                <span className="text-[11px] text-slate-400">Instantly route bookings over $10,000 directly to senior partner desk</span>
              </div>
            </label>
          </div>
        </div>

        {/* Database & Cache Management */}
        <div className="bg-[#061321] rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-wider">
            <Database className="w-4 h-4 text-slate-400" />
            <span>Local Cache & Seed Reset</span>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400 max-w-md">
              Clears customized destination, package and hotel modifications stored in browser local storage and restores default verified seed data.
            </p>
            <button
              type="button"
              onClick={handleResetData}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Local Seed</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {saved && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 animate-fadeIn">
              <ShieldCheck className="w-4 h-4" /> Platform preferences saved successfully.
            </span>
          )}
          {!saved && <span />}

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#18C8D8] text-[#071A2F] hover:brightness-110 shadow-lg shadow-[#18C8D8]/20 transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
