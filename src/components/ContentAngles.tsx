import React, { useState } from "react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import { Lightbulb, Target, Sparkles, ChevronRight } from "lucide-react";

export const ContentAngles: React.FC = () => {
  const [selectedAngleId, setSelectedAngleId] = useState<string>("pain-point");

  const activeAngle =
    PORTFOLIO_CONFIG.contentAngles.find((a) => a.id === selectedAngleId) ||
    PORTFOLIO_CONFIG.contentAngles[0];

  return (
    <section className="py-20 md:py-28 bg-[#F5F8F9] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-[#087E8B]">
            CREATIVE STRATEGY
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B2437] text-balance">
            One product. Multiple angles worth testing.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Different audiences respond to different stories. I create varied concepts that give
            brands more than one way to earn attention.
          </p>
        </div>

        {/* 8 Angle Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PORTFOLIO_CONFIG.contentAngles.map((angle) => {
            const isSelected = selectedAngleId === angle.id;
            return (
              <div
                key={angle.id}
                onClick={() => setSelectedAngleId(angle.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedAngleId(angle.id);
                  }
                }}
                className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-white border-[#087E8B] shadow-md ring-1 ring-[#087E8B]"
                    : "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#087E8B]">
                      {angle.name}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? "bg-[#087E8B]" : "bg-slate-300"
                      }`}
                    />
                  </div>
                  <p className="text-sm sm:text-base font-bold text-[#0B2437] leading-snug">
                    {angle.hook}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Click to view angle strategy</span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? "rotate-90 text-[#087E8B]" : ""
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Angle Strategy Deep Dive */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#087E8B]">
                <Target className="w-3.5 h-3.5" />
                <span>Strategy Breakdown: {activeAngle.name}</span>
              </div>
              <h3 className="text-xl font-bold text-[#0B2437]">
                {activeAngle.hook}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-800">Objective: </span>
                {activeAngle.objective}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-800">Target Psychology: </span>
                {activeAngle.targetPsychology}
              </p>
            </div>

            <div className="lg:w-80 p-4 rounded-xl bg-[#0B2437] text-white space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#087E8B] flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Sample Script Hook Formula</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed italic">
                "{activeAngle.sampleScriptHook}"
              </p>
            </div>
          </div>
        </div>

        {/* Small footnote */}
        <div className="mt-6 text-center text-xs text-slate-500">
          {PORTFOLIO_CONFIG.contentAngleFootnote}
        </div>
      </div>
    </section>
  );
};
