"use client";

import React from "react";

/**
 * Lightweight Passthrough Component (Splash screen removed for instant zero-lag loading).
 */
export default function WelcomingPreloader({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
