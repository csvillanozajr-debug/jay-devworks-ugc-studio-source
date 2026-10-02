import React, { useState } from "react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import { LegalModal, LegalDocType } from "./LegalModal";
import { ArrowUp, Mail, ExternalLink } from "lucide-react";

export interface FooterProps {
  onOpenLegalModal?: (type: LegalDocType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegalModal }) => {
  const [internalLegalDoc, setInternalLegalDoc] = useState<LegalDocType>(null);

  const openDoc = (type: LegalDocType) => {
    if (onOpenLegalModal) {
      onOpenLegalModal(type);
    } else {
      setInternalLegalDoc(type);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Showreel", href: "#showreel" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Packages", href: "#packages" },
    { label: "Process", href: "#process" },
    { label: "Brief Checklist", href: "#checklist" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-[#071926] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-6 space-y-4">
            <a
              href="#home"
              className="text-lg font-bold tracking-tight text-white hover:text-[#087E8B] transition-colors"
            >
              {PORTFOLIO_CONFIG.creator.brandName}
            </a>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              {PORTFOLIO_CONFIG.creator.tagline}
            </p>
            <div className="text-xs text-slate-500">
              {PORTFOLIO_CONFIG.creator.location}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Navigation
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Channels & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Connect &amp; Channels
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a
                  href={`mailto:${PORTFOLIO_CONFIG.creator.email}`}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Email: {PORTFOLIO_CONFIG.creator.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={PORTFOLIO_CONFIG.creator.facebookUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-white transition-colors"
                >
                  Facebook: {PORTFOLIO_CONFIG.creator.facebook}
                </a>
              </li>
              <li>
                <a
                  href={PORTFOLIO_CONFIG.creator.youtubeUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-white transition-colors"
                >
                  YouTube: {PORTFOLIO_CONFIG.creator.youtube}
                </a>
              </li>
              <li>
                <span className="text-slate-400">
                  TikTok: {PORTFOLIO_CONFIG.creator.tiktok}
                </span>
              </li>
              <li>
                <span className="text-slate-400">
                  Instagram: {PORTFOLIO_CONFIG.creator.instagram}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Legal and Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 Jay DevWorks UGC Studio. All rights reserved.</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => openDoc("privacy")}
                className="hover:text-slate-300 underline underline-offset-4 cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => openDoc("terms")}
                className="hover:text-slate-300 underline underline-offset-4 cursor-pointer"
              >
                Terms of Service
              </button>
              <button
                onClick={() => openDoc("usage")}
                className="hover:text-slate-300 underline underline-offset-4 cursor-pointer"
              >
                Usage Rights
              </button>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {!onOpenLegalModal && (
        <LegalModal
          type={internalLegalDoc}
          onClose={() => setInternalLegalDoc(null)}
        />
      )}
    </footer>
  );
};
