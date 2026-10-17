"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { PRODUCTS_CATALOG } from "@/data/boutique-data";

const validProductIds = new Set(PRODUCTS_CATALOG.map((product) => product.id));

interface BoutiqueContextType {
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isConsultationOpen: boolean;
  setIsConsultationOpen: (open: boolean) => void;
}

const BoutiqueContext = createContext<BoutiqueContextType | undefined>(undefined);

export function BoutiqueProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("rosepetal_wishlist") || "[]");
      if (Array.isArray(saved)) {
        const valid = saved.filter((value): value is string => typeof value === "string" && validProductIds.has(value));
        setWishlist(valid);
        localStorage.setItem("rosepetal_wishlist", JSON.stringify(valid));
      }
    } catch { /* storage can be disabled */ }
  }, []);

  const toggleWishlist = (id: string) => {
    setWishlist((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      try { localStorage.setItem("rosepetal_wishlist", JSON.stringify(next)); } catch { /* storage can be disabled */ }
      return next;
    });
  };

  return <BoutiqueContext.Provider value={{ wishlist, toggleWishlist, isConsultationOpen, setIsConsultationOpen }}>{children}</BoutiqueContext.Provider>;
}

export function useBoutique() {
  const context = useContext(BoutiqueContext);
  if (!context) throw new Error("useBoutique must be used within a BoutiqueProvider");
  return context;
}
