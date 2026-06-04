"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-foam/95 backdrop-blur-md shadow-sm border-b border-cream-dark"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <span className="font-display text-2xl font-bold text-espresso leading-none">
            Coffee
          </span>
          <span className="font-mono text-lg text-caramel font-medium">.Dev</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm text-mocha hover:text-caramel transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#contact"
            className="bg-espresso text-foam font-body text-sm font-medium px-5 py-2.5 rounded-full hover:bg-mocha transition-colors duration-200 tracking-wide"
          >
            Contact
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-espresso"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-foam border-t border-cream-dark px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-body text-base text-mocha hover:text-caramel transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className="bg-espresso text-foam font-body text-sm font-medium px-5 py-3 rounded-full text-center hover:bg-mocha transition-colors"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
