"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./Navbar";

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-2 pointer-events-none">
      <nav className="pointer-events-auto max-w-md mx-auto glass rounded-2xl border border-navy-200/60 dark:border-navy-700/60 shadow-2xl p-1.5 flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center p-1.5 rounded-xl text-[10px] font-medium transition-all relative ${
                isActive
                  ? "text-nyala-600 dark:text-nyala-400 bg-nyala-500/10 font-bold"
                  : "text-navy-500 dark:text-navy-400 hover:text-navy-800 dark:hover:text-navy-200"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? "text-nyala-500" : ""}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 text-[8px] font-bold px-1 rounded-full bg-nyala-500 text-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="mt-0.5 truncate max-w-[55px] text-center">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
