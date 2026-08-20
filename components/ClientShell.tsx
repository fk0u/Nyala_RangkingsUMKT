"use client";

import React, { useState, useEffect } from "react";
import TopNotificationBar from "./TopNotificationBar";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import Footer from "./Footer";
import CommandSearchModal from "./CommandSearchModal";
import MascotPageTransition from "./MascotPageTransition";
import RegisterServiceWorker from "./RegisterServiceWorker";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchOpen, setSearchOpen] = useState(false);

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

  return (
    <>
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
        <CommandSearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />
      </div>
    </>
  );
}
