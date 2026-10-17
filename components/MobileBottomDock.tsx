"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, ShoppingBag, Mail } from "lucide-react";
import { useBoutique } from "@/context/BoutiqueContext";

export default function MobileBottomDock() {
  const pathname = usePathname();
  const { bag } = useBoutique();
  const bagCount = bag.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      name: "Collections",
      href: "/collections",
      icon: Sparkles,
      isActive: pathname === "/collections",
    },
    {
      name: "Bag",
      href: "/bag",
      icon: ShoppingBag,
      isActive: pathname === "/bag" || pathname === "/checkout",
      badge: bagCount > 0 ? bagCount : null,
    },
    {
      name: "Contact",
      href: "/contact",
      icon: Mail,
      isActive: pathname === "/contact",
    },
  ];

  return (
    <aside
      aria-label="Mobile Navigation Dock"
      className="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-[#FFF9F7]/95 backdrop-blur-xl border-t border-rosepetal-wine/15 shadow-[0_-8px_30px_rgba(82,31,42,0.12)] pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 px-2"
    >
      <div className="grid grid-cols-4 items-center justify-items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center min-h-[44px] w-full py-1 rounded-lg transition-colors relative active:scale-95 ${
                item.isActive
                  ? "text-rosepetal-wine font-semibold"
                  : "text-rosepetal-text/75 hover:text-rosepetal-wine"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 ${item.isActive ? "stroke-[2.2]" : "stroke-[1.6]"}`}
                  aria-hidden="true"
                />
                {item.badge !== null && item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 bg-rosepetal-wine text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight leading-none">
                {item.name}
              </span>
            </Link>
          );
        })}

      </div>
    </aside>
  );
}
