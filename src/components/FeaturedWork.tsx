import React, { useState } from "react";
import { PORTFOLIO_CONFIG, VideoSample } from "../data/portfolioData";
import { Play, Eye, Sparkles, Filter, Info } from "lucide-react";
import { VideoModal } from "./VideoModal";

interface FeaturedWorkProps {
  onSelectForInquiry: (sampleTitle: string) => void;
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({ onSelectForInquiry }) => {
  const [selectedSample, setSelectedSample] = useState<VideoSample | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "SaaS & CRM", "AI & Automation", "Mobile Apps"];

  const filteredSamples =
    activeCategory === "All"
      ? PORTFOLIO_CONFIG.videoSamples
      : PORTFOLIO_CONFIG.videoSamples.filter(
          (s) => s.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <section id="work" className="py-20 md:py-28 bg-[#0B2437] text-white scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#087E8B]">
              FEATURED WORK
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white text-balance">
              UGC samples created for modern digital products.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              A selection of vertical-video concepts that combine strong hooks, product proof,
              practical benefits, and clear calls to action.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#087E8B] text-white shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          {filteredSamples.map((sample, index) => {
            // First three video cards are larger and more prominent (lg:col-span-4 for top 3, lg:col-span-6 for remaining)
            const isTopThree = index < 3;
            const colSpanClass = isTopThree ? "lg:col-span-4" : "lg:col-span-6";

            return (
              <div
                key={sample.id}
                onClick={() => setSelectedSample(sample)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedSample(sample);
                  }
                }}
                className={`group relative rounded-2xl bg-white/5 border border-white/10 hover:border-[#087E8B]/60 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl cursor-pointer ${colSpanClass}`}
              >
                {/* 9:16 Video Thumbnail Container */}
                <div className="relative aspect-[9/14] sm:aspect-[9/13] w-full overflow-hidden bg-slate-900">
                  <img
                    src={sample.thumbnailUrl}
                    alt={sample.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Dynamic gradient overlay scrim */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${sample.mockVideoColor} opacity-70 group-hover:opacity-60 transition-opacity`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2437] via-transparent to-black/30" />

                  {/* Prominent Concept Sample Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
                      Concept Sample
                    </span>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-[10px] font-mono font-medium text-slate-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md">
                      {sample.duration}
                    </span>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#087E8B] group-hover:bg-[#076d78] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200">
                      <Play className="w-6 h-6 fill-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Opening Hook Snippet on Thumbnail */}
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <div className="bg-black/60 backdrop-blur-sm p-2 rounded-lg border border-white/10">
                      <div className="text-[9px] uppercase tracking-wider text-[#087E8B] font-bold">
                        Hook
                      </div>
                      <p className="text-xs font-semibold text-white line-clamp-1">
                        "{sample.hook}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Content Footer */}
                <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between bg-white/[0.02]">
                  <div className="space-y-1.5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#087E8B]">
                      {sample.label}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#087E8B] transition-colors leading-snug">
                      {sample.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                      {sample.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Interactive Preview</span>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSample(sample);
                      }}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#087E8B] hover:bg-[#076d78] rounded-lg transition-colors cursor-pointer"
                    >
                      Watch Sample
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Small mandatory disclaimer beneath gallery */}
        <div className="mt-12 p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#087E8B] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs text-slate-400 leading-relaxed">
            {PORTFOLIO_CONFIG.portfolioDisclaimer}
          </p>
        </div>
      </div>

      {/* Video Lightbox Modal */}
      <VideoModal
        sample={selectedSample}
        onClose={() => setSelectedSample(null)}
        onSelectForInquiry={onSelectForInquiry}
      />
    </section>
  );
};
