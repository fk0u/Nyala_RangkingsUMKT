"use client";

import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms per character
  delay?: number; // initial delay ms
  className?: string;
  onComplete?: () => void;
  showCursor?: boolean;
}

export default function TypewriterText({
  text,
  speed = 12,
  delay = 0,
  className = "",
  onComplete,
  showCursor = true,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let charIndex = 0;
    setDisplayedText("");
    setIsTyping(true);

    const startTyping = () => {
      const intervalId = setInterval(() => {
        if (charIndex < text.length) {
          // Increment in chunks for natural typing sensation
          const step = Math.min(text.length - charIndex, text[charIndex] === " " ? 2 : 1);
          charIndex += step;
          setDisplayedText(text.slice(0, charIndex));
        } else {
          clearInterval(intervalId);
          setIsTyping(false);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(intervalId);
    };

    if (delay > 0) {
      timeoutId = setTimeout(() => {
        startTyping();
      }, delay);
    } else {
      startTyping();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay, onComplete]);

  return (
    <span className={`inline-block ${className}`}>
      {displayedText}
      {isTyping && showCursor && (
        <span className="inline-block w-1.5 h-4 ml-0.5 bg-nyala-500 animate-pulse align-middle" />
      )}
    </span>
  );
}
