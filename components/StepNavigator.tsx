"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Eye, X } from "lucide-react";

const STEPS = [
  { id: "step-01", label: "01. HOME PAGE" },
  { id: "step-02", label: "02. ABOUT PAGE" },
  { id: "step-03", label: "03. COLLECTIONS PAGE" },
  { id: "step-04", label: "04. LOOKBOOK PAGE" },
  { id: "step-05", label: "05. CUSTOM DESIGN PAGE" },
  { id: "step-06", label: "06. CONTACT PAGE" },
];

export default function StepNavigator() {
  const [activeStep, setActiveStep] = useState("step-01");
  const [showOriginalModal, setShowOriginalModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = STEPS.length - 1; i >= 0; i--) {
        const el = document.getElementById(STEPS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveStep(STEPS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToStep = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Sticky Step Navigation Bar */}
      <div className="sticky top-20 z-40 bg-[#FAF4F3]/95 backdrop-blur-md border-b border-rosepetal-border/80 py-2.5 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden lg:inline-block text-[10px] uppercase font-bold tracking-[0.2em] text-rosepetal-wine">
              SECTIONS:
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {STEPS.map((step) => {
                const isActive = activeStep === step.id;
                return (
                  <button
                    key={step.id}
                    onClick={() => scrollToStep(step.id)}
                    className={`text-[11px] sm:text-xs uppercase tracking-[0.16em] px-2.5 sm:px-3 py-1 rounded transition-all whitespace-nowrap font-medium ${
                      isActive
                        ? "bg-rosepetal-wine text-white shadow-sm"
                        : "text-rosepetal-muted hover:text-rosepetal-wine hover:bg-rosepetal-blushLight/50"
                    }`}
                  >
                    {step.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick View Original Mockup Comparison */}
          <button
            onClick={() => setShowOriginalModal(true)}
            className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-rosepetal-wine hover:bg-rosepetal-wine hover:text-white px-3 py-1 rounded border border-rosepetal-wine/40 transition-all flex-shrink-0"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Compare Mockup</span>
          </button>
        </div>
      </div>

      {/* Original Image Modal Comparison */}
      {showOriginalModal && (
        <div
          onClick={() => setShowOriginalModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[92vh] w-full bg-[#FAF4F3] rounded-xl overflow-hidden shadow-2xl border border-rosepetal-border flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-rosepetal-border bg-white">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-rosepetal-wine">
                Provided Design Reference (100% Fidelity Match)
              </span>
              <button
                onClick={() => setShowOriginalModal(false)}
                className="text-rosepetal-muted hover:text-rosepetal-wine p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative flex-1 overflow-auto p-4 bg-[#F2E8E7]">
              <Image
                src="/rosepetal-reference.jpg"
                alt="Provided Rosepetal Reference Image"
                width={978}
                height={1024}
                className="w-full h-auto object-contain mx-auto rounded shadow"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
