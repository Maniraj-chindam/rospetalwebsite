"use client";

import React, { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { useBoutique } from "@/context/BoutiqueContext";
import { CONTACT_INFO } from "@/data/boutique-data";
import { useModalKeyboard } from "@/hooks/useModalKeyboard";
import { useEnquirySubmission } from "@/hooks/useEnquirySubmission";

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
  const dialogRef = useModalKeyboard(isConsultationOpen, () => setIsConsultationOpen(false));
  const { submitting, error, reference, submit, reset } = useEnquirySubmission();

  if (!isConsultationOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void submit({kind:"consultation",name:formData.name,phone:formData.phone,email:formData.email,occasion:formData.occasion,preferredDate:formData.date,message:formData.notes});
  };
  const whatsappMessage = `Hello Rosepetal, I'd like to request a consultation.\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nOccasion: ${formData.occasion}\nPreferred date: ${formData.date || "Flexible"}\nNotes: ${formData.notes || "None"}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsConsultationOpen(false); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="consultation-title" tabIndex={-1} className="relative w-full max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto bg-[#FCECEE] border border-rosepetal-border rounded-2xl shadow-2xl p-6 sm:p-8">
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
              <h3 id="consultation-title" className="font-serif-luxury text-3xl text-rosepetal-wine">
                Book a Bespoke Consultation
              </h3>
              <p className="text-xs text-rosepetal-muted max-w-sm mx-auto">
                Share your outfit ideas with Rosepetal and request a personal consultation.
              </p>
            </div>

            {reference ? <div role="status" className="space-y-4 rounded-lg border border-rosepetal-wine/30 bg-white p-5 text-sm text-rosepetal-text"><h4 className="font-serif-luxury text-2xl text-rosepetal-wine">Request saved</h4><p>Your consultation request is in the boutique inbox. We will contact you to confirm a date. Reference: <strong>{reference}</strong>.</p><button type="button" onClick={() => { reset(); setFormData({name:"",phone:"",email:"",occasion:"Bridal Wear",date:"",notes:""}); }} className="font-semibold text-rosepetal-wine underline underline-offset-4">Start another request</button></div> : <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="consultation-name" className="block text-xs uppercase tracking-wider text-rosepetal-muted mb-1 font-medium">
                  Full Name *
                </label>
                <input
                  id="consultation-name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  disabled={submitting}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ananya Rao"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-rosepetal-border text-sm text-rosepetal-text focus:outline-none focus:border-rosepetal-wine transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="consultation-phone" className="block text-xs uppercase tracking-wider text-rosepetal-muted mb-1 font-medium">
                    Phone *
                  </label>
                  <input
                    id="consultation-phone"
                    type="tel"
                    required
                    maxLength={30}
                    autoComplete="tel"
                    disabled={submitting}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 90000 00000"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-rosepetal-border text-sm text-rosepetal-text focus:outline-none focus:border-rosepetal-wine transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="consultation-email" className="block text-xs uppercase tracking-wider text-rosepetal-muted mb-1 font-medium">
                    Email *
                  </label>
                  <input
                    id="consultation-email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    disabled={submitting}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ananya@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-rosepetal-border text-sm text-rosepetal-text focus:outline-none focus:border-rosepetal-wine transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="consultation-occasion" className="block text-xs uppercase tracking-wider text-rosepetal-muted mb-1 font-medium">
                    Occasion / Garment
                  </label>
                  <select
                    id="consultation-occasion"
                    disabled={submitting}
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
                  <label htmlFor="consultation-date" className="block text-xs uppercase tracking-wider text-rosepetal-muted mb-1 font-medium">
                    Preferred Date
                  </label>
                  <input
                    id="consultation-date"
                    type="date"
                    disabled={submitting}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-rosepetal-border text-sm text-rosepetal-text focus:outline-none focus:border-rosepetal-wine transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="consultation-notes" className="block text-xs uppercase tracking-wider text-rosepetal-muted mb-1 font-medium">
                  Style Preferences / Fabric Notes
                </label>
                <textarea
                  id="consultation-notes"
                  rows={2}
                  maxLength={2000}
                  disabled={submitting}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about the colors, silhouette, embroidery details..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-rosepetal-border text-sm text-rosepetal-text focus:outline-none focus:border-rosepetal-wine transition-colors resize-none"
                />
              </div>

              <p className="text-xs text-rosepetal-muted leading-relaxed">We use these details to respond to your request. A preferred date is a request until the boutique confirms it.</p>
              {error && <p role="alert" className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800">{error} <a href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="font-semibold underline">Continue on WhatsApp</a> and tap Send there if you prefer.</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 bg-rosepetal-wine hover:bg-rosepetal-wineHover disabled:opacity-60 text-white text-xs uppercase font-medium tracking-[0.2em] rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {submitting ? "Saving your request…" : "Request consultation"}
              </button>
            </form>}
          </div>
      </div>
    </div>
  );
}
