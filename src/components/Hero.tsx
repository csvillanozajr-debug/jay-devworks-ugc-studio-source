import React from "react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import { Play, ArrowRight, Sparkles, Globe2, ShieldCheck } from "lucide-react";

interface HeroProps {
  onViewWorkClick: () => void;
  onStartProjectClick: () => void;
  onPlayFeaturedDemo: () => void;
  onWatchReelClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onViewWorkClick,
  onStartProjectClick,
  onPlayFeaturedDemo,
  onWatchReelClick,
}) => {
  return (
    <section
      id="home"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#0B2437] text-white overflow-hidden"
    >
      {/* Subtle technology grid texture & ambient glow */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(8, 126, 139, 0.45) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -top-40 -right-40 w-96 h-96 bg-[#087E8B]/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#1E88E5]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Availability Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#087E8B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#087E8B]" />
                <span>{PORTFOLIO_CONFIG.creator.eyebrow}</span>
              </div>
              <span className="hidden sm:inline text-slate-600">·</span>
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{PORTFOLIO_CONFIG.creator.bookingStatus}</span>
              </div>
            </div>

            {/* Main headline with balanced wrapping to prevent orphans */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12] text-balance">
              Short-Form UGC for AI, SaaS, Apps &amp; Small-Business Brands.
            </h1>

            {/* Supporting text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Scroll-stopping product demos, tutorials, testimonials, and
              performance-style videos made for TikTok, Instagram Reels,
              Facebook Reels, YouTube Shorts, and paid social campaigns.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onViewWorkClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#087E8B] hover:bg-[#076d78] active:scale-95 transition-all duration-150 rounded-lg shadow-md shadow-[#087E8B]/20 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                onClick={onStartProjectClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 active:scale-95 transition-all duration-150 rounded-lg backdrop-blur-sm cursor-pointer"
              >
                <span>Start a Project</span>
              </button>

              {onWatchReelClick && (
                <button
                  onClick={onWatchReelClick}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white underline underline-offset-4 cursor-pointer py-2 px-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch 45s Showreel</span>
                </button>
              )}
            </div>

            {/* Row of credibility badges (Zero-Pill: unboxed text with typographic separators) */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-slate-400 font-medium">
                {PORTFOLIO_CONFIG.trustBadges.map((badge, index) => (
                  <React.Fragment key={badge}>
                    <span className="text-slate-200">{badge}</span>
                    {index < PORTFOLIO_CONFIG.trustBadges.length - 1 && (
                      <span className="text-slate-600" aria-hidden="true">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Compact notes row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-[#087E8B]" aria-hidden="true" />
                  <span>{PORTFOLIO_CONFIG.creator.availabilityNote}</span>
                </div>
                <span className="text-slate-600">·</span>
                <span className="text-slate-300">Turnaround: 5–7 days</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-300">{PORTFOLIO_CONFIG.creator.responseTime}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Polished vertical video mockup with play trigger */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
              {/* Decorative device glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#087E8B] to-[#1E88E5] rounded-[2.5rem] blur-xl opacity-30 group-hover:opacity-60 transition duration-500" />

              {/* Realistic 9:16 smartphone container */}
              <div
                onClick={onPlayFeaturedDemo}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onPlayFeaturedDemo();
                  }
                }}
                className="group relative aspect-[9/16] w-full rounded-[2.2rem] bg-slate-900 border-4 border-slate-800/80 shadow-2xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#087E8B]"
                aria-label="Play Featured UGC Demo video sample"
              >
                {/* Speaker notch / dynamic island */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-950 rounded-full z-20" />

                {/* Video thumbnail background */}
                <img
                  src="/src/assets/images/ugc_demo_saas_1790932765701.jpg"
                  alt="Featured UGC Product Demo on smartphone screen"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient scrim for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2437]/90 via-[#0B2437]/30 to-black/20" />

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="w-16 h-16 rounded-full bg-[#087E8B] group-hover:bg-[#076d78] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200">
                    <Play className="w-7 h-7 fill-white translate-x-0.5" />
                  </div>
                  <span className="mt-3 text-xs font-bold tracking-wide uppercase text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    Play Sample
                  </span>
                </div>

                {/* Bottom card labels as specified in prompt */}
                <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
                  <div className="text-[11px] font-semibold text-[#087E8B] uppercase tracking-wider">
                    Featured UGC Demo
                  </div>
                  <div className="text-sm font-bold text-white line-clamp-1">
                    AI Tool / SaaS Product Video
                  </div>
                  <div className="text-[11px] text-slate-300">
                    1080×1920 · 9:16 Vertical Video
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
