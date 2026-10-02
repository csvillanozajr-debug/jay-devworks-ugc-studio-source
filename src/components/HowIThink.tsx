import React from "react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import { BrainCircuit, Lightbulb, Compass, ArrowRight, CheckCircle2 } from "lucide-react";

export const HowIThink: React.FC = () => {
  const { howIThink } = PORTFOLIO_CONFIG;

  return (
    <section id="how-i-think" className="py-20 md:py-28 bg-white border-b border-slate-200/80 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#087E8B]">
            {howIThink.eyebrow}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B2437] text-balance leading-tight">
            {howIThink.heading}
          </h2>
          <p className="text-lg sm:text-xl font-bold text-[#087E8B]">
            {howIThink.subheading}
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {howIThink.intro}
          </p>
        </div>

        {/* 4 Strategic Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {howIThink.fourQuestions.map((q) => (
            <div
              key={q.number}
              className="p-6 rounded-2xl bg-[#F5F8F9] border border-slate-200/90 hover:border-[#087E8B]/40 hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-2xl font-mono font-extrabold text-[#087E8B]">
                  {q.number}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#0B2437]">
                  {q.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {q.answer}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-[#087E8B] font-semibold">
                Customer-Led Formulation
              </div>
            </div>
          ))}
        </div>

        {/* Proof / Case Study Architecture Blueprint */}
        <div className="p-8 rounded-3xl bg-[#0B2437] text-white border border-slate-800 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#087E8B]">
                <Compass className="w-4 h-4" />
                <span>Strategic Case Study Blueprint</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {howIThink.proofFramework.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {howIThink.proofFramework.note}
              </p>
            </div>

            {/* Formula Block */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 shrink-0">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#087E8B]">
                Production Blueprint
              </div>
              <div className="text-xs sm:text-sm font-mono font-bold text-white tracking-wide">
                {howIThink.proofFramework.caseStudyFormula}
              </div>
              <p className="text-[11px] text-slate-400">
                Guarantees every second serves conversion intent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
