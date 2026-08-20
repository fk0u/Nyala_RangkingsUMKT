"use client";

import { useEffect } from "react";

export default function RegisterServiceWorker() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      const handleLoad = () => {
        navigator.serviceWorker
          .register("/sw.js", { scope: "/" })
          .then((registration) => {
            // Check for service worker updates
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
                    console.log("[Nyala PWA] Konten baru tersedia. Versi diperbarui.");
                  }
                };
              }
            };
          })
          .catch((err) => {
            console.warn("[Nyala PWA] Registrasi service worker dilewati:", err.message);
          });
      };

      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad, { once: true });
        return () => window.removeEventListener("load", handleLoad);
      }
    }
  }, []);

  return null;
}
