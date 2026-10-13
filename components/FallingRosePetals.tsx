"use client";

import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number; // percentage across screen (0 - 100)
  size: number; // in px (14 - 32)
  duration: number; // in seconds (9 - 18)
  delay: number; // in seconds (0 - 8)
  drift: number; // sway distance in px (-60 to 60)
  rotation: number; // end rotation degrees
  opacity: number;
  color: string;
}

const PETAL_COLORS = [
  "#E89DA6", // soft dusty rose
  "#F2A9B2", // bright blush pink
  "#DE8893", // deep rose petal
  "#F7BFCE", // light pastel pink
  "#E48796", // petal edge pink
];

export default function FallingRosePetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate a fixed set of diverse petals on client load
    const count = 22;
    const generated: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 96 + 2, // 2% to 98%
      size: Math.floor(Math.random() * 16) + 16, // 16px to 32px
      duration: Math.random() * 7 + 9, // 9s to 16s fall duration
      delay: Math.random() * 8, // staggered entrance
      drift: (Math.random() - 0.5) * 120, // -60px to +60px sway
      rotation: Math.floor(Math.random() * 360) + 180,
      opacity: Math.random() * 0.35 + 0.35, // 0.35 to 0.70
      color: PETAL_COLORS[i % PETAL_COLORS.length],
    }));
    setPetals(generated);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
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
              opacity="0.25"
            />
            <path
              d="M20 8 Q19 28 24 42"
              stroke="#B35B68"
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
