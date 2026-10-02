import React from "react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import { Clock, Zap, ArrowRight, CheckCircle2 } from "lucide-react";

export const Process: React.FC = () => {
  return (
    <section id="process" className="py-20 md:py-28 bg-[#F5F8F9] border-b border-slate-200/80 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#087E8B]">
            HOW IT WORKS
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B2437] text-balance">
            A simple, organized production process.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From raw product link to high-converting vertical ad creatives, every milestone is
            collaborative, structured, and deadline-driven.
          </p>
        </div>

        {/* 5-Step Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {PORTFOLIO_CONFIG.processSteps.map((step, index) => (
            <div
              key={step.number}
              className="relative p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-[#087E8B]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-mono font-extrabold text-[#087E8B]">
                    {step.number}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-slate-200" />
                </div>

                <h3 className="text-lg font-bold text-[#0B2437] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.text}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#087E8B]" />
                <span>Phase {index + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Highlighted Turnaround Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#087E8B]/10 text-[#087E8B] flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#087E8B]">
                {PORTFOLIO_CONFIG.turnaround.title}
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-[#0B2437] mt-0.5">
                {PORTFOLIO_CONFIG.turnaround.timeframe}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {PORTFOLIO_CONFIG.turnaround.note}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B2437] text-white text-xs font-semibold self-start sm:self-center shrink-0">
            <Zap className="w-4 h-4 text-[#F59E0B]" />
            <span>Rush Turnaround Available</span>
          </div>
        </div>
      </div>
    </section>
  );
};
