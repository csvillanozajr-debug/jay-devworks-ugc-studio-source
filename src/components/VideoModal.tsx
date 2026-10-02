import React, { useState, useEffect } from "react";
import { VideoSample } from "../data/portfolioData";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  FileText,
} from "lucide-react";

interface VideoModalProps {
  sample: VideoSample | null;
  onClose: () => void;
  onSelectForInquiry: (sampleTitle: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  sample,
  onClose,
  onSelectForInquiry,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(35);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "script">("preview");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Simulated video playback timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  if (!sample) return null;

  const sampleSeconds = parseInt(sample.duration.split(":")[1], 10) || 30;
  const currentSec = Math.floor((progress * sampleSeconds) / 100);

  const handleScrubClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.min(Math.max((clickX / rect.width) * 100, 0), 100);
    setProgress(newProgress);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0B2437] text-white rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 text-slate-300 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#087E8B]"
          aria-label="Close video sample dialog"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Left Side: 9:16 Vertical Video Player Simulation */}
        <div className="lg:w-1/2 bg-slate-950 p-4 sm:p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="relative w-full max-w-[260px] sm:max-w-[280px] aspect-[9/16] rounded-3xl bg-slate-900 border-4 border-slate-800 shadow-2xl overflow-hidden flex flex-col justify-between">
            {/* Phone speaker notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black rounded-full z-20" />

            {/* Visual simulation content */}
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={sample.thumbnailUrl}
                alt={sample.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-b ${sample.mockVideoColor} opacity-75`}
              />

              {/* Watermark badge showing Concept Sample */}
              <div className="absolute top-7 left-3 z-10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/20">
                  Concept Sample
                </span>
              </div>

              {/* Sound & Format badge */}
              <div className="absolute top-7 right-3 z-10 flex items-center gap-1.5">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label={isMuted ? "Unmute audio simulation" : "Mute audio simulation"}
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Hook text callout on video frame */}
              <div className="absolute inset-x-3 top-16 z-10">
                <div className="bg-black/70 backdrop-blur-md rounded-xl p-3 border border-white/15 text-center shadow-lg">
                  <span className="text-[10px] font-bold text-[#087E8B] uppercase tracking-wider block mb-0.5">
                    Opening Hook
                  </span>
                  <p className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                    {sample.hook}
                  </p>
                </div>
              </div>

              {/* Center Play/Pause Floating Controller */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#087E8B]/90 hover:bg-[#087E8B] text-white flex items-center justify-center shadow-2xl transition-all active:scale-95 z-20 cursor-pointer"
                aria-label={isPlaying ? "Pause video sample" : "Play video sample"}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-white" />
                ) : (
                  <Play className="w-6 h-6 fill-white translate-x-0.5" />
                )}
              </button>

              {/* Simulated Voiceover Captions */}
              <div className="absolute bottom-12 inset-x-3 z-10">
                <div className="bg-[#0B2437]/90 backdrop-blur-md p-2.5 rounded-lg border border-white/10 text-center">
                  <div className="text-[9px] uppercase tracking-wider text-[#087E8B] font-bold mb-0.5">
                    Sync Caption Stream
                  </div>
                  <p className="text-[11px] font-medium text-slate-100 line-clamp-2">
                    {isPlaying
                      ? `"...${sample.problemSolved.slice(0, 75)}..."`
                      : "[Playback paused - press play to preview simulated flow]"}
                  </p>
                </div>
              </div>

              {/* Bottom Video Progress Scrub Bar */}
              <div className="absolute bottom-2 inset-x-3 z-10 space-y-1">
                <div
                  onClick={handleScrubClick}
                  className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer"
                  title="Click to seek"
                >
                  <div
                    className="bg-[#087E8B] h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-300 font-mono">
                  <span>
                    0:{currentSec.toString().padStart(2, "0")}
                  </span>
                  <span>{sample.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Sample Information, Script Breakdown & Action */}
        <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            {/* Top metadata tags */}
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="text-[#087E8B] uppercase tracking-wider">
                {sample.label}
              </span>
              <span className="text-slate-500" aria-hidden="true">
                ·
              </span>
              <span className="text-slate-300">{sample.category}</span>
              <span className="text-slate-500" aria-hidden="true">
                ·
              </span>
              <span className="text-slate-300">{sample.duration}</span>
            </div>

            <h3
              id="modal-title"
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
            >
              {sample.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {sample.description}
            </p>

            {/* Tab switch for Preview vs Script */}
            <div className="flex items-center gap-2 p-1 bg-white/5 rounded-lg border border-white/10 w-fit">
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === "preview"
                    ? "bg-[#087E8B] text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Visual Highlights
              </button>
              <button
                onClick={() => setActiveTab("script")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === "script"
                    ? "bg-[#087E8B] text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Script &amp; Pacing Breakdown
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "preview" ? (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Target Product Solution
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-200">
                  {sample.problemSolved}
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 pt-1">
                  Key Visual Elements
                </div>
                <ul className="space-y-2">
                  {sample.visualHighlights.map((hl, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-xs sm:text-sm text-slate-300"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#087E8B] shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Timeline Flow Structure
                </div>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {sample.scriptOutline.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200"
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                onSelectForInquiry(sample.title);
                onClose();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#087E8B] hover:bg-[#076d78] rounded-xl transition-colors shadow-lg shadow-[#087E8B]/20 cursor-pointer"
            >
              <span>Inquire About This Video Format</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-slate-400">
              Need a custom script or feature walkthrough for your tool? Let's discuss your product.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
