"use client";

import Link from "next/link";
import { Dumbbell, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#030303] border-t border-white/5 py-12 relative overflow-hidden">
      {/* Subtle Glow Backgrounds */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-electric-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Logo & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-neon-green to-electric-blue p-2 rounded-lg">
                <Dumbbell className="h-6 w-6 text-black" />
              </div>
              <span className="font-extrabold text-2xl tracking-wider text-white">
                POWER<span className="text-neon-green">FIT</span>
                <span className="text-xs font-medium text-neon-green block -mt-1 tracking-widest uppercase">Pune</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-sm text-sm sm:text-base leading-relaxed">
              Pune's ultimate premium fitness destination. Equipping you with state-of-the-art facilities, elite trainers, and a powerful community to unlock your peak potential.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-neon-green hover:border-neon-green/30 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-neon-green hover:border-neon-green/30 transition-all duration-300"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-neon-green hover:border-neon-green/30 transition-all duration-300"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-neon-green hover:border-neon-green/30 transition-all duration-300"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base sm:text-lg tracking-wider uppercase border-l-2 border-neon-green pl-3">
              Explore
            </h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link href="/" className="text-gray-400 hover:text-neon-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-neon-green transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-gray-400 hover:text-neon-green transition-colors">
                  Classes & Schedule
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-gray-400 hover:text-neon-green transition-colors">
                  Membership Plans
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="text-gray-400 hover:text-neon-green transition-colors">
                  Our Trainers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-neon-green transition-colors">
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base sm:text-lg tracking-wider uppercase border-l-2 border-neon-green pl-3">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm sm:text-base text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-neon-green shrink-0 mt-0.5" />
                <span>1st Floor, Pride House, Near FC Road, Shivaji Nagar, Pune, Maharashtra 411005</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-neon-green shrink-0" />
                <span>+91 98230 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-neon-green shrink-0" />
                <span>info@powerfitpune.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-500">
          <p>© {currentYear} PowerFit Pune. All Rights Reserved.</p>
          <p>
            Designed by{" "}
            <span className="text-neon-green font-semibold">LynkDigital</span> — Premium Web Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
