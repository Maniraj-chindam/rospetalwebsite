"use client";

import React, { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { useBoutique } from "@/context/BoutiqueContext";
import { CONTACT_INFO } from "@/data/boutique-data";

export default function ConsultationModal() {
  const { isConsultationOpen, setIsConsultationOpen } = useBoutique();
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
    const message = `Hello Rosepetal, I'd like to request a consultation.\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nOccasion: ${formData.occasion}\nPreferred date: ${formData.date || "Flexible"}\nNotes: ${formData.notes || "None"}`;
    window.location.assign(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FCECEE] border border-rosepetal-border rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsConsultationOpen(false)}
          className="absolute top-5 right-5 text-rosepetal-muted hover:text-rosepetal-wine p-1 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

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
                    placeholder="+91 90000 00000"
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

              <p className="text-xs text-rosepetal-muted leading-relaxed">
                Continue to WhatsApp, then tap Send to request an appointment. We will confirm the date with you there.
              </p>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-rosepetal-wine hover:bg-rosepetal-wineHover disabled:opacity-60 text-white text-xs uppercase font-medium tracking-[0.2em] rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Continue on WhatsApp →
              </button>
            </form>
          </div>
      </div>
    </div>
  );
}
