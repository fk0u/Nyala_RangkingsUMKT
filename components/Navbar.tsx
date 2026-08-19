"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Sparkles, 
  MessageSquareHeart, 
  HeartPulse, 
  CalendarDays, 
  CheckSquare, 
  BookOpenText,
  Flame
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import MascotFlame from "./MascotFlame";

export const NAV_ITEMS = [
  { href: "/", label: "Beranda", icon: Flame },
  { href: "/companion", label: "Tanya Nyala", icon: MessageSquareHeart, badge: "AI" },
  { href: "/health-check", label: "Health Check", icon: HeartPulse },
  { href: "/jadwal", label: "Alur MASTA", icon: CalendarDays },
  { href: "/checklist", label: "Checklist", icon: CheckSquare },
  { href: "/tentang-masta", label: "Edukasi MASTA", icon: BookOpenText },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-navy-200/50 dark:border-navy-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <MascotFlame size="sm" className="w-8 h-8 group-hover:rotate-6 transition-transform" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-navy-900 dark:text-white">
                Nyala
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-nyala-500/15 text-nyala-600 dark:text-nyala-400">
                UMKT '26
              </span>
            </div>
            <span className="text-[11px] font-medium text-navy-500 dark:text-navy-400 hidden sm:inline -mt-0.5">
              Teman perjalanan MABA-mu.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "text-nyala-600 dark:text-nyala-400 bg-nyala-50 dark:bg-navy-800 font-semibold"
                    : "text-navy-600 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white hover:bg-navy-100/50 dark:hover:bg-navy-800/50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-nyala-500" : "text-navy-400"}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-nyala-500 text-white leading-none">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-nyala-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle & Quick CTA */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href="/companion"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-nyala-500 to-nyala-600 text-white text-xs sm:text-sm font-semibold shadow-fire hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chat AI Nyala</span>
          </Link>
        </div>

      </div>
    </header>
  );
}
