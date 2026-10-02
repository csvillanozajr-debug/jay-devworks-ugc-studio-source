import React from "react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import { Cpu, Smartphone, CheckCircle2 } from "lucide-react";

export const TrustIntro: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    "product-aware": <Cpu className="w-6 h-6 text-[#087E8B]" aria-hidden="true" />,
    "vertical-native": <Smartphone className="w-6 h-6 text-[#087E8B]" aria-hidden="true" />,
    "reliable-delivery": <CheckCircle2 className="w-6 h-6 text-[#087E8B]" aria-hidden="true" />,
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B2437] text-balance">
            UGC that makes complex products easy to understand.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Jay DevWorks UGC Studio creates short-form product content for software,
            AI tools, digital products, and growing businesses. Every video is designed
            to help viewers quickly understand what a product does, which problem it
            solves, and why they should take action.
          </p>
        </div>

        {/* 3 Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PORTFOLIO_CONFIG.valueCards.map((card) => (
            <div
              key={card.id}
              className="group p-8 rounded-2xl bg-[#F5F8F9] border border-slate-200/90 hover:border-[#087E8B]/40 hover:shadow-md transition-all duration-200 flex flex-col space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
                {iconMap[card.id]}
              </div>
              <h3 className="text-xl font-bold text-[#0B2437] tracking-tight">
                {card.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
