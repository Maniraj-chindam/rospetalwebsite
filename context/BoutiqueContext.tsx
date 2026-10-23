"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface BoutiqueContextType {
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  bag: Array<{ productId: string; qty: number }>;
  addToBag: (productId: string) => void;
  setBagQuantity: (productId: string, qty: number) => void;
  removeFromBag: (productId: string) => void;
  isConsultationOpen: boolean;
  setIsConsultationOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const BoutiqueContext = createContext<BoutiqueContextType | undefined>(undefined);

export function BoutiqueProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [bag, setBag] = useState<Array<{ productId: string; qty: number }>>([]);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("rosepetal_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
      const savedBag = localStorage.getItem("rosepetal_bag_v1");
      if (savedBag) {
        const parsed: unknown = JSON.parse(savedBag);
        if (Array.isArray(parsed)) {
          const seen = new Set<string>();
          setBag(parsed.filter((item): item is { productId: string; qty: number } => {
            if (!item || typeof item.productId !== "string" || !/^[a-zA-Z0-9-]{1,100}$/.test(item.productId) || !Number.isInteger(item.qty) || item.qty < 1 || item.qty > 10 || seen.has(item.productId)) return false;
            seen.add(item.productId);
            return true;
          }).slice(0, 20));
        }
      }
    } catch {
      // Fallback if localStorage is not accessible
    }
  }, []);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("rosepetal_wishlist", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const saveBag = (update: (items: Array<{ productId: string; qty: number }>) => Array<{ productId: string; qty: number }>) => {
    setBag((previous) => {
      const next = update(previous);
      try { localStorage.setItem("rosepetal_bag_v1", JSON.stringify(next)); } catch {}
      return next;
    });
  };
  const addToBag = (productId: string) => saveBag((items) => {
    const existing = items.find((item) => item.productId === productId);
    return existing ? items.map((item) => item.productId === productId ? { ...item, qty: Math.min(10, item.qty + 1) } : item) : items.length < 20 ? [...items, { productId, qty: 1 }] : items;
  });
  const setBagQuantity = (productId: string, qty: number) => saveBag((items) => items.map((item) => item.productId === productId ? { ...item, qty: Math.min(10, Math.max(1, Math.trunc(qty))) } : item));
  const removeFromBag = (productId: string) => saveBag((items) => items.filter((item) => item.productId !== productId));

  return (
    <BoutiqueContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        bag,
        addToBag,
        setBagQuantity,
        removeFromBag,
        isConsultationOpen,
        setIsConsultationOpen,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
      }}
    >
      {children}
    </BoutiqueContext.Provider>
  );
}

export function useBoutique() {
  const context = useContext(BoutiqueContext);
  if (!context) {
    throw new Error("useBoutique must be used within a BoutiqueProvider");
  }
  return context;
}
