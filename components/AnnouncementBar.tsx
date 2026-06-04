"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check local storage to see if user has already dismissed it
    const dismissed = localStorage.getItem("announcement-dismissed");
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("announcement-dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="relative z-50 w-full bg-gradient-to-r from-neon-green to-electric-blue text-black py-2 px-4 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300">
      <span>🔥 New Batch Starting July 1 — Limited Seats Available!</span>
      <button
        onClick={handleDismiss}
        className="absolute right-3 p-1 hover:bg-black/10 rounded-full transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="h-4 w-4 text-black" />
      </button>
    </div>
  );
}
