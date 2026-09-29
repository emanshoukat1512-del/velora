import React, { useState } from 'react';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destinationInterest: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#061321] text-white pt-24 pb-24">
      {/* Header */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#071A2F] to-[#061321] border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <Badge variant="cyan" size="md">
            VIP Advisory
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Connect With Our Curators
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto font-light">
            Whether you require a bespoke private jet itinerary or have questions regarding an existing expedition, our global desk is at your disposal.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details & Office Locations */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#071A2F] rounded-3xl p-8 border border-white/10 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-white">Global Concierge Desks</h3>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#18C8D8]/10 text-[#18C8D8] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Email</span>
                    <a href="mailto:concierge@velora.luxury" className="text-white hover:text-[#18C8D8] transition font-medium">
                      concierge@velora.luxury
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#D9A441]/10 text-[#D9A441] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Direct Line</span>
                    <span className="text-white font-medium">+1 (800) 835-6721 (US & International)</span>
                    <span className="text-[11px] text-slate-400 block">+971 4 800 VELORA (Dubai DIFC)</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Operating Hours</span>
                    <span className="text-white font-medium">24 Hours / 7 Days a Week</span>
                    <span className="text-[11px] text-slate-400 block">Dedicated timezone matching for each guest</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#18C8D8]/10 text-[#18C8D8] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Offices</span>
                    <p className="text-xs leading-relaxed text-slate-300">
                      <strong>New York:</strong> One World Trade Center, Suite 7800<br />
                      <strong>Dubai:</strong> Gate Village 04, DIFC Financial Center<br />
                      <strong>Geneva:</strong> Rue du Rhône 42, 1204 Geneva
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Location Map Integration Point */}
            <div className="bg-[#071A2F] rounded-3xl p-6 border border-white/10 space-y-3">
              <span className="text-xs text-[#18C8D8] font-bold uppercase tracking-wider block">
                Regional Hub Locator
              </span>
              <div className="h-44 rounded-2xl bg-[#061321] relative overflow-hidden border border-white/5 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                  alt="Global Map"
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-[#061321]/60 flex flex-col items-center justify-center p-4 text-center">
                  <MapPin className="w-6 h-6 text-[#D9A441] animate-bounce mb-1" />
                  <span className="text-xs font-semibold text-white">VELORA Global Operations Hub</span>
                  <span className="text-[10px] text-slate-400">Real-Time VIP Telemetry Enabled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#071A2F] rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white">Send Direct Inquiry</h3>
                <p className="text-xs text-slate-400 mt-1">
                  A designated private travel designer will reply to your submission within two hours.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Inquiry Received</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Thank you, {formData.name}. Our senior travel manager has received your dossier and will reach out via {formData.email || 'phone'} promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', destinationInterest: 'General Inquiry', message: '' });
                    }}
                    className="text-xs text-[#18C8D8] underline hover:text-white pt-2"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Lord Harrington"
                        className="w-full bg-[#061321] text-white text-xs px-4 py-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. harrington@estate.co.uk"
                        className="w-full bg-[#061321] text-white text-xs px-4 py-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+44 20 7946 0912"
                        className="w-full bg-[#061321] text-white text-xs px-4 py-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Destination of Interest</label>
                      <select
                        value={formData.destinationInterest}
                        onChange={(e) => setFormData({ ...formData, destinationInterest: e.target.value })}
                        className="w-full bg-[#061321] text-white text-xs px-4 py-3 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none"
                      >
                        <option value="General Inquiry">General Inquiries & Bespoke Charter</option>
                        <option value="Turkey">Turkey (Istanbul & Cappadocia)</option>
                        <option value="Dubai">Dubai & Emirates Oasis</option>
                        <option value="Maldives">Maldives Atolls</option>
                        <option value="Switzerland">Swiss Alps & Glaciers</option>
                        <option value="Paris">France & French Riviera</option>
                        <option value="Pakistan">Pakistan (Hunza & Karakoram)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Your Vision or Travel Requirements *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your desired dates, party size, preferred aircraft, luxury expectations, or special celebration details..."
                      className="w-full bg-[#061321] text-white text-xs p-4 rounded-xl border border-white/10 focus:border-[#18C8D8] focus:outline-none leading-relaxed"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="gold"
                      size="lg"
                      isLoading={isSending}
                      icon={<Send className="w-4 h-4" />}
                    >
                      Transmit Dossier to Concierge
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
