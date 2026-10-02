import React, { useState } from "react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import { ChevronDown, HelpCircle } from "lucide-react";

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-white border-b border-slate-200/80 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-[#087E8B]">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B2437] text-balance">
            Everything you need to know about working together.
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Got questions about process, licensing, or physical versus digital products? Find
            straightforward answers below.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {PORTFOLIO_CONFIG.faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-[#F5F8F9] border-[#087E8B]/40 shadow-xs"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-[#0B2437] pr-2">
                    {faq.question}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "rotate-180 bg-[#087E8B] text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-200/60 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
