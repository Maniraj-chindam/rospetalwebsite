"use client";

import React from "react";
import { X, Play } from "lucide-react";
import { useModalKeyboard } from "@/hooks/useModalKeyboard";

export default function StoryVideoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const dialogRef = useModalKeyboard(isOpen, onClose);
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-video-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90dvh] max-w-2xl w-full bg-[#FCECEE] rounded-2xl overflow-y-auto shadow-2xl border border-rosepetal-border"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-rosepetal-muted hover:text-rosepetal-wine p-2 rounded-full bg-white/80"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 sm:p-10 space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-rosepetal-wine/10 text-rosepetal-wine flex items-center justify-center mx-auto">
            <Play className="w-7 h-7 fill-current ml-1" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-rosepetal-wine font-semibold">
              OUR JOURNEY & CRAFT
            </span>
            <h3 id="story-video-title" className="font-serif-luxury text-3xl sm:text-4xl text-rosepetal-wine">
              The Story of Rosepetal
            </h3>
            <p className="text-xs sm:text-sm text-rosepetal-muted max-w-md mx-auto leading-relaxed">
              Explore a glimpse of the Rosepetal collection and the styles that inspire it.
            </p>
          </div>

          {/* Decorative video preview container */}
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-inner bg-black/5 border border-rosepetal-border flex items-center justify-center">
            <video
              className="w-full h-full object-cover"
              controls
              autoPlay
              muted
            >
              <source
                src="/rosepetal-footer-reel.mp4"
                type="video/mp4"
              />
              Your browser does not support video playback.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
