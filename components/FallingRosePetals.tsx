"use client";

import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number; // percentage across screen (0 - 100)
  size: number; // in px (14 - 24)
  duration: number; // in seconds (14 - 24)
  delay: number; // in seconds (0 - 8)
  drift: number; // sway distance in px (-60 to 60)
  rotation: number; // end rotation degrees
  opacity: number;
  color: string;
}

const PETAL_COLORS = [
  "#D78DA2", // muted rose
  "#CC7D96", // deep blush
  "#DE9CAF", // dusty pink
  "#C57590", // rich rose
  "#D388A0", // soft berry
];

export default function FallingRosePetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Keep the ambient layer intentionally light, so content stays in focus.
    const count = 14;
    const generated: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 96 + 2, // 2% to 98%
      size: Math.floor(Math.random() * 10) + 14, // 14px to 24px
      duration: Math.random() * 10 + 14, // 14s to 24s fall duration
      delay: Math.random() * 12, // staggered entrance
      drift: (Math.random() - 0.5) * 90, // -45px to +45px sway
      rotation: Math.floor(Math.random() * 360) + 180,
      opacity: Math.random() * 0.22 + 0.18, // 0.18 to 0.40
      color: PETAL_COLORS[i % PETAL_COLORS.length],
    }));
    setPetals(generated);
  }, []);

  return (
    <div
      aria-hidden="true"
      data-falling-rose-petals
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute will-change-transform"
          style={{
            left: `${petal.left}%`,
            top: "-40px",
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
            opacity: petal.opacity,
            animation: `rosePetalFall ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
            ["--drift" as string]: `${petal.drift}px`,
            ["--rot" as string]: `${petal.rotation}deg`,
          }}
        >
          {/* Detailed Curved Rose Petal SVG Shape */}
          <svg
            viewBox="0 0 40 52"
            className="w-full h-full drop-shadow-[0_2px_4px_rgba(200,100,120,0.15)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Petal Silhouette */}
            <path
              d="M20 2 C9 10 2 24 6 38 C10 48 24 52 30 46 C36 40 38 26 34 14 C30 6 25 2 20 2 Z"
              fill={petal.color}
            />
            {/* Petal Inner Shadow & Vein Curve */}
            <path
              d="M20 5 C13 14 8 26 12 37 C15 44 24 47 28 42 C24 34 22 22 20 5 Z"
              fill="#FFFFFF"
              opacity="0.14"
            />
            <path
              d="M20 8 Q19 28 24 42"
              stroke="#8E3F5A"
              strokeWidth="0.75"
              strokeLinecap="round"
              opacity="0.3"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
