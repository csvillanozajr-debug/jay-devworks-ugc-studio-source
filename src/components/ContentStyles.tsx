import React from "react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import {
  Video,
  Monitor,
  BookOpen,
  UserCheck,
  Hand,
  MessageSquareQuote,
  Target,
  Sparkles,
} from "lucide-react";

export const ContentStyles: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    "faceless-ugc": <Video className="w-5 h-5 text-[#087E8B]" />,
    "screen-demo": <Monitor className="w-5 h-5 text-[#087E8B]" />,
    "tutorial-content": <BookOpen className="w-5 h-5 text-[#087E8B]" />,
    "face-to-camera": <UserCheck className="w-5 h-5 text-slate-500" />,
    "hands-only": <Hand className="w-5 h-5 text-slate-500" />,
    "testimonial-style": <MessageSquareQuote className="w-5 h-5 text-slate-500" />,
    "paid-ad-creative": <Target className="w-5 h-5 text-slate-500" />,
  };

  return (
    <section id="styles" className="py-20 md:py-28 bg-[#F5F8F9] border-b border-slate-200/80 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-[#087E8B]">
            CHOOSE YOUR CONTENT STYLE
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B2437] text-balance leading-tight">
            Content styles for different campaign goals.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Whether your goal is product awareness, free-trial sign-ups, app installs, lead
            generation, or paid-ad testing, I can create content in the format that fits your
            product and audience.
          </p>
        </div>

        {/* 7 Content Styles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_CONFIG.contentStyles.map((style) => {
            const isSpecialty = style.isSpecialty;

            return (
              <div
                key={style.id}
                className={`relative rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between ${
                  isSpecialty
                    ? "bg-white border-2 border-[#087E8B] shadow-lg shadow-[#087E8B]/5 ring-1 ring-[#087E8B]/20"
                    : "bg-white/70 border border-slate-200 hover:border-slate-300 hover:bg-white hover:shadow-xs"
                }`}
              >
                {/* Specialty Pill / Badge */}
                {isSpecialty && (
                  <div className="absolute -top-3 right-5 bg-[#087E8B] text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-3 h-3" />
                    <span>{style.specialtyTag}</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    {iconMap[style.id] || <Video className="w-5 h-5" />}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#0B2437]">{style.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5">
                      {style.description}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F5F8F9] border border-slate-200/60 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#087E8B] block">
                      Sample Hook Angle
                    </span>
                    <p className="text-xs font-semibold text-slate-800 italic">
                      {style.hookExample}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Best for: </span>
                  {style.idealFor}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
