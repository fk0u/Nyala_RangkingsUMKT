"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Fire, 
  Sparkle, 
  Code, 
  Laptop, 
  Heartbeat, 
  CalendarCheck, 
  CheckSquare, 
  BookOpenText 
} from "@phosphor-icons/react";

export const MOBILE_NAV_ITEMS = [
  { href: "/", label: "Beranda", icon: Fire },
  { href: "/companion", label: "Tanya AI", icon: Sparkle, badge: "AI" },
  { href: "/panduan-ti", label: "Prodi TI", icon: Code, badge: "2026" },
  { href: "/panduan-sikad", label: "SIKAD", icon: Laptop },
  { href: "/health-check", label: "Health", icon: Heartbeat },
  { href: "/jadwal", label: "Alur", icon: CalendarCheck },
  { href: "/checklist", label: "Checklist", icon: CheckSquare },
  { href: "/tentang-masta", label: "Edukasi", icon: BookOpenText },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-2 pointer-events-none">
      <nav className="pointer-events-auto max-w-lg mx-auto glass rounded-2xl border border-navy-200/60 dark:border-navy-700/60 shadow-2xl p-1 flex items-center justify-between overflow-x-auto no-scrollbar">
        {MOBILE_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[9px] font-medium transition-all relative flex-shrink-0 min-w-[50px] ${
                isActive
                  ? "text-nyala-600 dark:text-nyala-400 bg-nyala-500/10 font-bold"
                  : "text-navy-500 dark:text-navy-400 hover:text-navy-800 dark:hover:text-navy-200"
              }`}
            >
              <div className="relative">
                <Icon weight={isActive ? "fill" : "bold"} className={`w-4 h-4 ${isActive ? "text-nyala-500" : ""}`} />
                {item.badge && (
                  <span className={`absolute -top-1 -right-2 text-[7px] font-bold px-1 rounded-full text-white ${
                    item.badge === "AI" ? "bg-nyala-500" : "bg-emerald-600"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="mt-0.5 truncate max-w-[52px] text-center">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
