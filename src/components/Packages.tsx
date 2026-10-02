import React, { useState } from "react";
import { PORTFOLIO_CONFIG, PricingPackage } from "../data/portfolioData";
import { Check, Sparkles, ArrowRight, ShieldAlert, Plus } from "lucide-react";

interface PackagesProps {
  onSelectPackage: (packageTitle: string) => void;
}

export const Packages: React.FC<PackagesProps> = ({ onSelectPackage }) => {
  const [currency, setCurrency] = useState<"USD" | "PHP">("USD");

  return (
    <section id="packages" className="py-20 md:py-28 bg-white border-b border-slate-200/80 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#087E8B]">
              STARTER PACKAGES
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B2437] text-balance">
              Flexible content packages for brands at every stage.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Simple starting options for product launches, social content, creative testing, and
              ongoing campaigns. Final pricing depends on the project scope, product complexity,
              deadline, and usage rights.
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-2 p-1 bg-[#F5F8F9] border border-slate-200 rounded-xl self-start md:self-end">
            <span className="text-xs font-medium text-slate-500 pl-2">Currency:</span>
            <button
              onClick={() => setCurrency("USD")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                currency === "USD"
                  ? "bg-[#0B2437] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency("PHP")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                currency === "PHP"
                  ? "bg-[#0B2437] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              PHP (₱)
            </button>
          </div>
        </div>

        {/* 4 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PORTFOLIO_CONFIG.packages.map((pkg) => {
            const isPopular = pkg.isPopular;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 ${
                  isPopular
                    ? "bg-[#0B2437] text-white border-2 border-[#087E8B] shadow-xl shadow-[#087E8B]/10 lg:-translate-y-2"
                    : "bg-[#F5F8F9] text-[#0B2437] border border-slate-200 hover:border-slate-300 hover:shadow-md"
                }`}
              >
                {/* Popular Ribbon */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#087E8B] text-white text-[11px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>MOST POPULAR</span>
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <h3
                      className={`text-xl font-bold tracking-tight ${
                        isPopular ? "text-white" : "text-[#0B2437]"
                      }`}
                    >
                      {pkg.title}
                    </h3>
                    <div className="text-xs text-slate-400 mt-1">{pkg.duration}</div>
                  </div>

                  {/* Price Block */}
                  <div className="pt-2">
                    <div className="text-xs text-slate-400 font-medium">Starting at</div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span
                        className={`text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums ${
                          isPopular ? "text-white" : "text-[#0B2437]"
                        }`}
                      >
                        {currency === "USD"
                          ? `$${pkg.priceUSD}`
                          : `₱${pkg.pricePHP.toLocaleString()}`}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {currency === "USD"
                          ? `(₱${pkg.pricePHP.toLocaleString()})`
                          : `($${pkg.priceUSD} USD)`}
                      </span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div
                    className={`pt-4 border-t ${
                      isPopular ? "border-white/10" : "border-slate-200"
                    }`}
                  >
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                      Includes
                    </div>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                              isPopular
                                ? "bg-[#087E8B] text-white"
                                : "bg-[#087E8B]/10 text-[#087E8B]"
                            }`}
                          >
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </span>
                          <span className={isPopular ? "text-slate-200" : "text-slate-600"}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-8 pt-4">
                  <div className="text-[11px] text-slate-400 mb-3 italic">
                    Best for: {pkg.bestFor}
                  </div>
                  <button
                    onClick={() => onSelectPackage(pkg.title)}
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isPopular
                        ? "bg-[#087E8B] hover:bg-[#076d78] text-white shadow-lg shadow-[#087E8B]/20 active:scale-95"
                        : "bg-white hover:bg-slate-100 text-[#0B2437] border border-slate-300 hover:border-slate-400 active:scale-95"
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Available Add-Ons Strip */}
        <div className="mt-14 p-6 rounded-2xl bg-[#F5F8F9] border border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#087E8B]">
              <Plus className="w-4 h-4" />
              <span>Available Add-Ons</span>
            </div>
            <span className="text-xs text-slate-500">
              Customize any package based on your campaign needs
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {PORTFOLIO_CONFIG.addOns.map((addon) => (
              <span
                key={addon}
                className="text-xs font-medium text-slate-700 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-2xs"
              >
                {addon}
              </span>
            ))}
          </div>
        </div>

        {/* Important note */}
        <div className="mt-6 p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 leading-relaxed font-medium">
            {PORTFOLIO_CONFIG.pricingDisclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};
