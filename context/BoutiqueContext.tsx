"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface BoutiqueContextType {
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  cartCount: number;
  addToCart: () => void;
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
  const [cartCount, setCartCount] = useState<number>(0);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("rosepetal_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
      const savedCart = localStorage.getItem("rosepetal_cart_count");
      if (savedCart) {
        setCartCount(parseInt(savedCart, 10));
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

  const addToCart = () => {
    setCartCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem("rosepetal_cart_count", next.toString());
      } catch {}
      return next;
    });
  };

  return (
    <BoutiqueContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        cartCount,
        addToCart,
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
