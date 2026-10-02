import React, { useState, useEffect, useRef } from "react";
import { PORTFOLIO_CONFIG, ShowreelSegment } from "../data/portfolioData";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  MonitorSmartphone,
  Clapperboard,
  Layers,
  ChevronRight,
} from "lucide-react";

interface ShowreelProps {
  onStartProjectClick: () => void;
}

export const Showreel: React.FC<ShowreelProps> = ({ onStartProjectClick }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(6);
  const [isMuted, setIsMuted] = useState(false);
  const totalDuration = PORTFOLIO_CONFIG.showreel.totalDuration; // 45s

  const segments = PORTFOLIO_CONFIG.showreel.segments;

  // Find active segment based on currentTime
  const activeSegmentIndex = segments.findIndex(
    (seg) => currentTime >= seg.startSec && currentTime < seg.endSec
  );
  const activeSegment =
    activeSegmentIndex !== -1 ? segments[activeSegmentIndex] : segments[0];

  // Simulated playback timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev >= totalDuration ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration]);

  const jumpToSegment = (seg: ShowreelSegment) => {
    setCurrentTime(seg.startSec);
    setIsPlaying(true);
  };

  const handleScrubClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.min(Math.max(clickX / rect.width, 0), 1);
    const newTime = Math.floor(ratio * totalDuration);
    setCurrentTime(newTime);
  };

  const progressPercent = (currentTime / totalDuration) * 100;

  return (
    <section id="showreel" className="py-20 md:py-28 bg-[#071926] text-white relative overflow-hidden border-b border-white/10 scroll-mt-20 sm:scroll-mt-24">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-[#087E8B]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#1E88E5]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#087E8B]">
            <Clapperboard className="w-4 h-4" />
            <span>{PORTFOLIO_CONFIG.showreel.title}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white text-balance leading-tight">
            {PORTFOLIO_CONFIG.showreel.subtitle}
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {PORTFOLIO_CONFIG.showreel.description}
          </p>
        </div>

        {/* Showreel Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 9:16 Vertical Video Showreel Player */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[310px] aspect-[9/16] rounded-[2.5rem] bg-slate-950 border-4 border-slate-800 shadow-2xl overflow-hidden flex flex-col justify-between">
              {/* Speaker Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-full z-30" />

              {/* Background Video Montage Visual */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={
                    currentTime < 14
                      ? "/src/assets/images/ugc_demo_saas_1790932765701.jpg"
                      : currentTime < 27
                      ? "/src/assets/images/showreel_workflow_1790933441001.jpg"
                      : "/src/assets/images/tech_creator_desk_1790932808175.jpg"
                  }
                  alt="Showreel vertical demo playback"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-opacity duration-500"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2437]/95 via-black/40 to-black/30" />

                {/* Reel Badge & Audio Control */}
                <div className="absolute top-8 left-4 right-4 z-20 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#087E8B] animate-ping" />
                    <span>30–45s Showreel Montage</span>
                  </span>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-colors cursor-pointer"
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Overlaid Kinetic Hook Display */}
                <div className="absolute inset-x-4 top-20 z-20">
                  <div className="bg-black/75 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 shadow-xl text-center">
                    <span className="text-[10px] font-bold text-[#087E8B] uppercase tracking-wider block mb-0.5">
                      {activeSegment.timecode} · {activeSegment.title}
                    </span>
                    <p className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                      {activeSegment.hookText}
                    </p>
                  </div>
                </div>

                {/* Center Play/Pause Trigger */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#087E8B]/90 hover:bg-[#087E8B] text-white flex items-center justify-center shadow-2xl transition-all active:scale-95 z-20 cursor-pointer"
                  aria-label={isPlaying ? "Pause showreel" : "Play showreel"}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-white" />
                  ) : (
                    <Play className="w-6 h-6 fill-white translate-x-0.5" />
                  )}
                </button>

                {/* Real-time Voiceover & Caption Simulator */}
                <div className="absolute bottom-14 inset-x-4 z-20">
                  <div className="bg-[#0B2437]/90 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center">
                    <div className="text-[9px] uppercase tracking-wider text-[#087E8B] font-bold mb-1">
                      Visual Focus
                    </div>
                    <p className="text-[11px] font-medium text-slate-100 line-clamp-2">
                      {activeSegment.visualDesc}
                    </p>
                  </div>
                </div>

                {/* Scrub Bar & Timecode */}
                <div className="absolute bottom-3 inset-x-4 z-20 space-y-1">
                  <div
                    onClick={handleScrubClick}
                    className="w-full bg-white/20 h-2 rounded-full overflow-hidden cursor-pointer"
                    title="Click to seek anywhere in the showreel"
                  >
                    <div
                      className="bg-[#087E8B] h-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-300 font-mono">
                    <span>
                      0:{currentTime.toString().padStart(2, "0")}
                    </span>
                    <span>0:{totalDuration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Montage Timeline Breakdown & Click-to-Jump */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Pacing &amp; Retention Blueprint
              </div>
              <span className="text-xs text-[#087E8B] font-mono">
                Click any clip to preview
              </span>
            </div>

            <div className="space-y-2">
              {segments.map((seg, idx) => {
                const isActive = activeSegment.timecode === seg.timecode;

                return (
                  <div
                    key={seg.timecode}
                    onClick={() => jumpToSegment(seg)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        jumpToSegment(seg);
                      }
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isActive
                        ? "bg-[#087E8B]/15 border-[#087E8B] ring-1 ring-[#087E8B]"
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-mono font-bold px-2 py-1 rounded ${
                          isActive
                            ? "bg-[#087E8B] text-white"
                            : "bg-white/10 text-slate-400"
                        }`}
                      >
                        {seg.timecode}
                      </span>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                          <span>{seg.title}</span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#087E8B] animate-pulse" />
                          )}
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5 line-clamp-1 italic">
                          {seg.hookText}
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:block text-right shrink-0">
                      <span className="text-[11px] text-slate-400">
                        {seg.techHighlight}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA action underneath showreel */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-slate-400 max-w-sm">
                Every video is edited specifically for 9:16 vertical feeds with strong first-3s hooks and clean caption styling.
              </p>
              <button
                onClick={onStartProjectClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#087E8B] hover:bg-[#076d78] rounded-xl transition-all shadow-md cursor-pointer"
              >
                <span>Request a Showreel-Style Video</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
