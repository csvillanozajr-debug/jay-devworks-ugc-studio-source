import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Showreel } from "./components/Showreel";
import { BrandFit } from "./components/BrandFit";
import { FeaturedWork } from "./components/FeaturedWork";
import { Services } from "./components/Services";
import { ContentStyles } from "./components/ContentStyles";
import { HowIThink } from "./components/HowIThink";
import { Packages } from "./components/Packages";
import { Process } from "./components/Process";
import { BriefChecklist } from "./components/BriefChecklist";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { VideoModal } from "./components/VideoModal";
import { LegalModal, LegalDocType } from "./components/LegalModal";
import { PORTFOLIO_CONFIG, VideoSample } from "./data/portfolioData";
import { ArrowUp, Play, Sparkles, MessageSquare } from "lucide-react";

export default function App() {
  const [preselectedPackage, setPreselectedPackage] = useState<string>("Starter Pack (3x Videos)");
  const [heroModalSample, setHeroModalSample] = useState<VideoSample | null>(null);
  const [activeLegalModal, setActiveLegalModal] = useState<LegalDocType>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToWork = () => {
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToShowreel = () => {
    const showreelSection = document.getElementById("showreel");
    if (showreelSection) {
      showreelSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectPackage = (packageTitle: string) => {
    setPreselectedPackage(packageTitle);
    scrollToContact();
  };

  const handleSelectSampleForInquiry = (sampleTitle: string) => {
    setPreselectedPackage(`Custom Video: "${sampleTitle}" Format`);
    scrollToContact();
  };

  const handlePlayHeroFeaturedDemo = () => {
    const featured = PORTFOLIO_CONFIG.videoSamples[1] || PORTFOLIO_CONFIG.videoSamples[0];
    setHeroModalSample(featured);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F5F8F9] text-[#0B2437] flex flex-col font-sans selection:bg-[#087E8B] selection:text-white pb-14 md:pb-0">
      {/* Fixed Top Bar */}
      <Navbar onWorkTogetherClick={scrollToContact} />

      {/* Main Flow: Ordered for maximum creative conversion & clarity */}
      <main className="flex-1">
        {/* 1. Hero with primary call to action */}
        <Hero
          onViewWorkClick={scrollToWork}
          onStartProjectClick={scrollToContact}
          onPlayFeaturedDemo={handlePlayHeroFeaturedDemo}
          onWatchReelClick={scrollToShowreel}
        />

        {/* 2. 30–45 second UGC Showreel Montage */}
        <Showreel onStartProjectClick={scrollToContact} />

        {/* 3. Brand-fit / Niches served & Real workflow visuals */}
        <BrandFit />

        {/* 4. Featured UGC Samples (Top 3 prominent with interactive modal) */}
        <FeaturedWork onSelectForInquiry={handleSelectSampleForInquiry} />

        {/* 5. Services */}
        <Services />

        {/* 6. Content Styles (Choose your content style: Faceless, Screen Demo, etc.) */}
        <ContentStyles />

        {/* 7. Strategic Approach / "How I Think" & Problem-Solution Framework */}
        <HowIThink />

        {/* 8. Packages & Add-ons */}
        <Packages onSelectPackage={handleSelectPackage} />

        {/* 9. Work Process */}
        <Process />

        {/* 10. UGC Project Brief Checklist */}
        <BriefChecklist onScrollToContact={scrollToContact} />

        {/* 11. FAQ */}
        <FAQ />

        {/* 12. Contact Form with Anti-Spam & Direct Email Fallback */}
        <Contact
          preselectedPackage={preselectedPackage}
          onOpenPrivacyPolicy={() => setActiveLegalModal("privacy")}
        />
      </main>

      {/* Footer */}
      <Footer onOpenLegalModal={(type) => setActiveLegalModal(type)} />

      {/* Video Lightbox Modal */}
      {heroModalSample && (
        <VideoModal
          sample={heroModalSample}
          onClose={() => setHeroModalSample(null)}
          onSelectForInquiry={handleSelectSampleForInquiry}
        />
      )}

      {/* Legal & Privacy Policy Modal */}
      <LegalModal
        type={activeLegalModal}
        onClose={() => setActiveLegalModal(null)}
      />

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-16 right-4 sm:bottom-6 sm:right-6 z-30 p-2.5 rounded-full bg-[#0B2437] text-white hover:bg-[#087E8B] shadow-xl border border-white/15 transition-all duration-200 cursor-pointer active:scale-95"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Mobile Sticky Action Bar (Strictly capped below 15% viewport height rule) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B2437]/95 backdrop-blur-md border-t border-white/10 px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl">
        <button
          onClick={scrollToShowreel}
          className="flex-1 py-2 px-3 text-xs font-semibold text-slate-300 bg-white/10 hover:bg-white/15 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>Showreel</span>
        </button>

        <button
          onClick={scrollToContact}
          className="flex-1 py-2 px-3 text-xs font-bold text-white bg-[#087E8B] hover:bg-[#076d78] rounded-lg flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Sparkles className="w-3 h-3" />
          <span>Start Project</span>
        </button>
      </div>
    </div>
  );
}
