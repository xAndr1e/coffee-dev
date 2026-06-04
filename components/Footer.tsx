import Link from "next/link";

const footerLinks = {
  "Coffee.Dev": [
    { label: "Home", href: "/" },
    { label: "Menu", href: "#menu" },
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
  ],
  "About Us": [
    { label: "Our Story", href: "#about" },
    { label: "Team", href: "#team" },
    { label: "Sustainability", href: "#sustainability" },
    { label: "Careers", href: "#careers" },
  ],
  "Go On": [
    { label: "Menu PDF", href: "#menu" },
    { label: "Reserve a Table", href: "#contact" },
    { label: "Events", href: "#events" },
    { label: "Gift Cards", href: "#gift" },
  ],
  "Follow Us": [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "TikTok", href: "https://tiktok.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Twitter / X", href: "https://x.com" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-espresso text-foam px-6 lg:px-10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-14 border-b border-foam/10">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="font-mono text-[10px] text-foam/40 uppercase tracking-widest mb-5">
                {heading}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-foam/60 hover:text-latte transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <span className="font-display text-xl font-bold text-foam">Coffee</span>
            <span className="font-mono text-base text-caramel">.Dev</span>
          </div>

          <p className="font-body text-xs text-foam/30 text-center">
            © {new Date().getFullYear()} Coffee.Dev. All rights reserved. Built
            with ☕ and Next.js.
          </p>

          <div className="flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-foam/10 hover:bg-caramel/20 rounded-full flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              {/* Instagram icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-foam/70">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-foam/10 hover:bg-caramel/20 rounded-full flex items-center justify-center transition-colors"
              aria-label="TikTok"
            >
              {/* TikTok icon */}
              <svg width="14" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-foam/70">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.79 1.53V6.77a4.86 4.86 0 01-1.02-.08z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
