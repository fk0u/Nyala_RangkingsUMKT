"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHRASES = [
  "Nyala",
  "Nyala MABA",
  "UMKT 2026",
  "Sahabat MABA",
];

export default function AppleTypewriterTitle() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
        if (displayedText === currentPhrase) {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2400);
          return;
        }
      } else {
        // Deleting backwards
        setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
        if (displayedText === "") {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
          return;
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 60 : typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex, typingSpeed]);

  return (
    <div className="flex items-center justify-center select-none">
      <span className="font-black text-base sm:text-lg tracking-tight text-navy-950 dark:text-white flex items-center">
        <span className="bg-gradient-to-r from-navy-950 via-nyala-600 to-navy-950 dark:from-white dark:via-nyala-400 dark:to-white bg-clip-text text-transparent">
          {displayedText}
        </span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block w-0.5 h-4 bg-nyala-500 ml-0.5 rounded-full"
        />
      </span>
    </div>
  );
}
