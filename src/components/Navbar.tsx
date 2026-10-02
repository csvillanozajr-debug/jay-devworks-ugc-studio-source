import React, { useState, useEffect } from "react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onWorkTogetherClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onWorkTogetherClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Showreel", href: "#showreel" },
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Packages", href: "#packages" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? "bg-[#0B2437]/90 backdrop-blur-md border-b border-[#087E8B]/20 py-3 shadow-lg shadow-black/10"
          : "bg-[#0B2437] border-b border-white/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly follow 1-row, 3-zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-[#087E8B] transition-colors whitespace-nowrap"
          >
            {PORTFOLIO_CONFIG.creator.brandName}
          </a>

          {/* Zone 2: 4–6 nav links, 1–2 word labels, single-line text links with subtle hover underlines */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative py-1 hover:underline underline-offset-8 decoration-[#087E8B] decoration-2 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1–2 primary actions + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onWorkTogetherClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#087E8B] hover:bg-[#076d78] active:scale-95 transition-all duration-150 rounded-lg shadow-sm whitespace-nowrap cursor-pointer"
            >
              <span>Let's Work Together</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B2437] border-b border-[#087E8B]/30 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in fade-in duration-150">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onWorkTogetherClick();
                }}
                className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-[#087E8B] hover:bg-[#076d78] rounded-lg transition-colors cursor-pointer"
              >
                Let's Work Together
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
