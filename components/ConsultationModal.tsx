"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Calendar, Sparkles } from "lucide-react";
import { useBoutique } from "@/context/BoutiqueContext";

export default function ConsultationModal() {
  const { isConsultationOpen, setIsConsultationOpen } = useBoutique();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    occasion: "Bridal Wear",
    date: "",
    notes: "",
  });

  if (!isConsultationOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after 3 seconds
      setSubmitted(false);
      setIsConsultationOpen(false);
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FAF4F3] border border-rosepetal-border rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsConsultationOpen(false)}
          className="absolute top-5 right-5 text-rosepetal-muted hover:text-rosepetal-wine p-1 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-rosepetal-wine/10 text-rosepetal-wine rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif-luxury text-2xl text-rosepetal-wine">
              Consultation Requested
            </h3>
            <p className="text-sm text-rosepetal-muted max-w-sm mx-auto">
              Thank you, <strong className="text-rosepetal-text">{formData.name}</strong>! Our master stylist from the Banjara Hills boutique will contact you shortly to confirm your appointment.
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center space-y-2 mb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-rosepetal-wine font-semibold flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Rosepetal Atelier
              </span>
              <h3 className="font-serif-luxury text-3xl text-rosepetal-wine">
                Book a Bespoke Consultation
              </h3>
              <p className="text-xs text-rosepetal-muted max-w-sm mx-auto">
                Share your dream outfit vision with our master designers and handcraft artisans.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-rosepetal-muted mb-1 font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ananya Rao"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-rosepetal-border text-sm text-rosepetal-text focus:outline-none focus:border-rosepetal-wine transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-rosepetal-muted mb-1 font-medium">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-rosepetal-border text-sm text-rosepetal-text focus:outline-none focus:border-rosepetal-wine transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-rosepetal-muted mb-1 font-medium">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ananya@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-rosepetal-border text-sm text-rosepetal-text focus:outline-none focus:border-rosepetal-wine transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-rosepetal-muted mb-1 font-medium">
                    Occasion / Garment
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-rosepetal-border text-sm text-rosepetal-text focus:outline-none focus:border-rosepetal-wine transition-colors"
                  >
                    <option>Bridal Wear</option>
                    <option>Custom Saree & Blouse</option>
                    <option>Reception Lehenga</option>
                    <option>Festive Handloom</option>
                    <option>Other Bespoke Couture</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-rosepetal-muted mb-1 font-medium">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-rosepetal-border text-sm text-rosepetal-text focus:outline-none focus:border-rosepetal-wine transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-rosepetal-muted mb-1 font-medium">
                  Style Preferences / Fabric Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about the colors, silhouette, embroidery details..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-rosepetal-border text-sm text-rosepetal-text focus:outline-none focus:border-rosepetal-wine transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-rosepetal-wine hover:bg-rosepetal-wineHover text-white text-xs uppercase font-medium tracking-[0.2em] rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Confirm Appointment Request →
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
