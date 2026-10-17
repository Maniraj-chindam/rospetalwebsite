"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { PRODUCTS_CATALOG } from "@/data/boutique-data";
import { BagItem, getBagLines, isPurchasable } from "@/lib/commerce";

const validProductIds = new Set(PRODUCTS_CATALOG.map((product) => product.id));

interface BoutiqueContextType {
  storageReady: boolean;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  bag: BagItem[];
  addToBag: (productId: string, size: string) => void;
  updateBagQuantity: (productId: string, size: string, quantity: number) => void;
  removeFromBag: (productId: string, size: string) => void;
  clearBag: () => void;
  isConsultationOpen: boolean;
  setIsConsultationOpen: (open: boolean) => void;
}

const BoutiqueContext = createContext<BoutiqueContextType | undefined>(undefined);

export function BoutiqueProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [bag, setBag] = useState<BagItem[]>([]);
  const [storageReady, setStorageReady] = useState(false);
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

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("rosepetal_bag") || "[]");
      if (Array.isArray(saved)) {
        const valid = getBagLines(saved).map(({ productId, size, quantity, stock }) => ({ productId, size, quantity: Math.min(quantity, stock) }));
        setBag(valid);
        localStorage.setItem("rosepetal_bag", JSON.stringify(valid));
      }
    } catch { /* storage can be disabled */ }
    setStorageReady(true);
  }, []);

  const saveBag = (update: (current: BagItem[]) => BagItem[]) => {
    setBag((current) => {
      const next = update(current);
      try { localStorage.setItem("rosepetal_bag", JSON.stringify(next)); } catch { /* storage can be disabled */ }
      return next;
    });
  };

  const addToBag = (productId: string, size: string) => {
    const product = PRODUCTS_CATALOG.find((item) => item.id === productId);
    const stock = product?.variants?.find((variant) => variant.size === size)?.stock ?? 0;
    if (!product || !isPurchasable(product) || stock < 1) return;
    saveBag((current) => {
      const existing = current.find((item) => item.productId === productId && item.size === size);
      if (existing) return current.map((item) => item === existing ? { ...item, quantity: Math.min(item.quantity + 1, stock) } : item);
      return [...current, { productId, size, quantity: 1 }];
    });
  };

  const updateBagQuantity = (productId: string, size: string, quantity: number) => {
    const product = PRODUCTS_CATALOG.find((item) => item.id === productId);
    const stock = product?.variants?.find((variant) => variant.size === size)?.stock ?? 0;
    if (!Number.isSafeInteger(quantity)) return;
    saveBag((current) => current.flatMap((item) => item.productId === productId && item.size === size
      ? quantity < 1 || stock < 1 ? [] : [{ ...item, quantity: Math.min(quantity, stock) }]
      : [item]));
  };

  const removeFromBag = (productId: string, size: string) => {
    saveBag((current) => current.filter((item) => item.productId !== productId || item.size !== size));
  };

  const clearBag = useCallback(() => {
    setBag([]);
    try { localStorage.setItem("rosepetal_bag", "[]"); } catch { /* storage can be disabled */ }
  }, []);

  const toggleWishlist = (id: string) => {
    setWishlist((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      try { localStorage.setItem("rosepetal_wishlist", JSON.stringify(next)); } catch { /* storage can be disabled */ }
      return next;
    });
  };

  return <BoutiqueContext.Provider value={{ storageReady, wishlist, toggleWishlist, bag, addToBag, updateBagQuantity, removeFromBag, clearBag, isConsultationOpen, setIsConsultationOpen }}>{children}</BoutiqueContext.Provider>;
}

export function useBoutique() {
  const context = useContext(BoutiqueContext);
  if (!context) throw new Error("useBoutique must be used within a BoutiqueProvider");
  return context;
}
