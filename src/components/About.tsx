import React from "react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import { Check, Code2, Workflow, Layers, Sparkles } from "lucide-react";

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#F5F8F9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual representation of technology workspace & video editing */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-white group">
              {/* Primary workspace image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src="/src/assets/images/tech_creator_desk_1790932808175.jpg"
                  alt="Jay DevWorks UGC Studio tech creator workspace and video editing desk"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2437]/80 via-transparent to-black/10" />

                {/* Overlaid software workflow indicator */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-medium tracking-wide">Developer &amp; Creator Workflow</span>
                  </div>
                  <span className="text-slate-300 font-mono text-[11px]">1080×1920 60FPS</span>
                </div>
              </div>

              {/* Technical background skillset tags */}
              <div className="p-6 bg-white border-t border-slate-100">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Technical Foundation
                </div>
                <div className="flex flex-wrap gap-2">
                  {PORTFOLIO_CONFIG.about.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#087E8B]">
              {PORTFOLIO_CONFIG.about.eyebrow}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B2437] text-balance leading-tight">
              {PORTFOLIO_CONFIG.about.heading}
            </h2>

            <div className="space-y-4 text-base text-slate-600 leading-relaxed">
              {PORTFOLIO_CONFIG.about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Checklist */}
            <div className="pt-2">
              <div className="text-sm font-semibold text-[#0B2437] mb-3">
                I create content that helps viewers quickly understand:
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PORTFOLIO_CONFIG.about.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#087E8B]/10 text-[#087E8B] flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Small highlighted statement */}
            <div className="p-5 rounded-xl bg-white border-l-4 border-[#087E8B] shadow-xs">
              <p className="text-base sm:text-lg font-bold text-[#0B2437] italic">
                “{PORTFOLIO_CONFIG.about.highlightStatement}”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
