"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import TopNotificationBar from "./TopNotificationBar";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import Footer from "./Footer";
import CommandSearchModal from "./CommandSearchModal";
import MascotPageTransition from "./MascotPageTransition";
import RegisterServiceWorker from "./RegisterServiceWorker";
import MobileOnboarding from "./MobileOnboarding";
import WelcomingPreloader from "./WelcomingPreloader";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const isMobileRoute = pathname?.startsWith("/mobile");

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // When on dedicated /mobile routes, render only the native mobile experience without root web shell
  if (isMobileRoute) {
    return (
      <WelcomingPreloader>
        <RegisterServiceWorker />
        <MascotPageTransition>
          {children}
        </MascotPageTransition>
        <CommandSearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />
      </WelcomingPreloader>
    );
  }

  return (
    <WelcomingPreloader>
      <RegisterServiceWorker />
      <div className="flex flex-col min-h-screen">
        <TopNotificationBar onOpenSearch={() => setSearchOpen(true)} />
        <Navbar onOpenSearch={() => setSearchOpen(true)} />
        <main className="flex-grow">
          <MascotPageTransition>
            {children}
          </MascotPageTransition>
        </main>
        <Footer />
        <MobileNav />
        <MobileOnboarding />
        <CommandSearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />
      </div>
    </WelcomingPreloader>
  );
}
