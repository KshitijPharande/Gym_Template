"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Dumbbell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Classes", href: "/classes" },
  { name: "Membership", href: "/membership" },
  { name: "Trainers", href: "/trainers" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll effect: add border-glow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 left-0 w-full transition-all duration-300 ${
        isScrolled
          ? "glass-panel shadow-[0_4px_30px_rgba(0,0,0,0.4)] border-b border-white/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-neon-green to-electric-blue p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <Dumbbell className="h-6 w-6 text-black" />
            </div>
            <span className="font-extrabold text-xl sm:text-2xl tracking-wider text-white">
              POWER<span className="text-neon-green text-glow-green">FIT</span>
              <span className="text-xs font-medium text-neon-green block -mt-1 tracking-widest uppercase">Pune</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-semibold tracking-wide py-2 transition-colors hover:text-neon-green text-gray-300"
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-neon-green shadow-[0_0_8px_#FF3B30] origin-left"
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Join Now CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/membership"
              className="relative group px-6 py-2.5 rounded-full overflow-hidden font-bold text-sm tracking-wider uppercase transition-all duration-300 bg-white text-black hover:bg-neon-green hover:text-black hover:shadow-[0_0_20px_rgba(255,59,48,0.4)]"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-neon-green hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/5 glass-panel"
          >
            <div className="px-4 pt-4 pb-6 space-y-2 flex flex-col">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-lg font-medium text-base transition-colors ${
                      isActive
                        ? "bg-neon-green/10 text-neon-green border-l-2 border-neon-green"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-white/5">
                <Link
                  href="/membership"
                  onClick={() => setIsOpen(false)}
                  className="w-full block py-3 rounded-lg text-center font-bold tracking-wider uppercase bg-neon-green text-black hover:bg-neon-green/90 transition-all duration-300 shadow-[0_0_15px_rgba(255,59,48,0.3)]"
                >
                  Join Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
