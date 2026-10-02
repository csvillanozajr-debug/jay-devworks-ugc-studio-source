import React from "react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import {
  CheckCircle,
  Cpu,
  Workflow,
  Laptop,
  Smartphone,
  Layers,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

export const BrandFit: React.FC = () => {
  return (
    <section id="brand-fit" className="py-20 md:py-28 bg-white border-b border-slate-200/80 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-[#087E8B]">
            BRAND FIT &amp; PRODUCT NICHES
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B2437] text-balance leading-tight">
            {PORTFOLIO_CONFIG.brandFit.heading}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {PORTFOLIO_CONFIG.brandFit.subheading}
          </p>
        </div>

        {/* 6 Category Fit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PORTFOLIO_CONFIG.brandFit.categories.map((cat) => (
            <div
              key={cat.name}
              className="p-6 rounded-2xl bg-[#F5F8F9] border border-slate-200/90 hover:border-[#087E8B]/40 hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-[#0B2437]">
                    {cat.name}
                  </h3>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      cat.badge === "Specialty"
                        ? "bg-[#087E8B]/10 text-[#087E8B] border border-[#087E8B]/20"
                        : "bg-slate-200/80 text-slate-700"
                    }`}
                  >
                    {cat.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] text-[#087E8B] font-medium">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Ready for remote product access</span>
              </div>
            </div>
          ))}
        </div>

        {/* Real Workflow Visuals Spotlight */}
        <div className="rounded-3xl bg-[#0B2437] text-white p-6 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Side: CapCut / OBS / Studio Timeline & Dashboard Mockup */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-slate-950 shadow-xl group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src="/src/assets/images/showreel_workflow_1790933441001.jpg"
                    alt="CapCut and DaVinci Resolve production timeline and screen recording workflow"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2437]/90 via-transparent to-black/30" />

                  {/* Overlaid status tags */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                    <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded">
                      60 FPS LOSSLESS
                    </span>
                    <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded">
                      KINETIC CAPTIONS
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs text-slate-300">
                    <span className="font-semibold text-white">Studio Editing &amp; Screen Capture Suite</span>
                    <span className="font-mono text-[11px] text-slate-400">9:16 Master Render</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Side: Why technical understanding matters */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#087E8B]">
                <Workflow className="w-4 h-4" />
                <span>Real Workflow Demonstration</span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
                I understand software workflows, dashboards, and developer systems.
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                Generic influencers struggle with SaaS and tech products because they don't understand what the buttons do, how the dashboard connects to the database, or why the user cares.
              </p>

              <ul className="space-y-3 pt-2">
                {PORTFOLIO_CONFIG.brandFit.realWorkflowPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <span className="w-4 h-4 rounded-full bg-[#087E8B] text-white flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
