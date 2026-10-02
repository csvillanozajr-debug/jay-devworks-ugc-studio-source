import React from "react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import {
  MonitorPlay,
  AlertCircle,
  Video,
  ScreenShare,
  MessageSquareQuote,
  Sparkles,
  Smartphone,
  SplitSquareVertical,
  CheckCircle,
} from "lucide-react";

export const Services: React.FC = () => {
  const serviceIcons: Record<string, React.ReactNode> = {
    "product-demos": <MonitorPlay className="w-5 h-5 text-[#087E8B]" aria-hidden="true" />,
    "problem-solution": <AlertCircle className="w-5 h-5 text-[#087E8B]" aria-hidden="true" />,
    "ugc-video-ads": <Video className="w-5 h-5 text-[#087E8B]" aria-hidden="true" />,
    "screen-tutorials": <ScreenShare className="w-5 h-5 text-[#087E8B]" aria-hidden="true" />,
    "testimonial-videos": <MessageSquareQuote className="w-5 h-5 text-[#087E8B]" aria-hidden="true" />,
    "feature-highlights": <Sparkles className="w-5 h-5 text-[#087E8B]" aria-hidden="true" />,
    "app-walkthroughs": <Smartphone className="w-5 h-5 text-[#087E8B]" aria-hidden="true" />,
    "creative-variations": <SplitSquareVertical className="w-5 h-5 text-[#087E8B]" aria-hidden="true" />,
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-white border-y border-slate-200/80 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#087E8B]">
            SERVICES
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B2437] text-balance">
            Content formats built for product discovery and conversion.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From native-style organic content to direct-response paid-ad creatives, every deliverable
            is tailored to the product, audience, and campaign goal.
          </p>
        </div>

        {/* 8 Responsive Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PORTFOLIO_CONFIG.services.map((service) => (
            <div
              key={service.id}
              className="group p-6 rounded-2xl bg-[#F5F8F9] border border-slate-200/80 hover:border-[#087E8B]/40 hover:bg-white hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-200">
                    {serviceIcons[service.id]}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {service.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#0B2437] group-hover:text-[#087E8B] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mt-2">
                    {service.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Deliverables
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-[#087E8B] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 italic">
                Ideal for: {service.idealFor}
              </div>
            </div>
          ))}
        </div>

        {/* Horizontal Highlight Banner */}
        <div className="mt-14 p-6 sm:p-7 rounded-2xl bg-[#0B2437] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#087E8B]/30">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#087E8B] animate-ping" />
            <div className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#087E8B]">
              {PORTFOLIO_CONFIG.deliveryFormats.label}
            </div>
          </div>
          <div className="text-xs sm:text-sm md:text-base font-medium text-slate-200 text-center sm:text-right">
            {PORTFOLIO_CONFIG.deliveryFormats.details}
          </div>
        </div>
      </div>
    </section>
  );
};
