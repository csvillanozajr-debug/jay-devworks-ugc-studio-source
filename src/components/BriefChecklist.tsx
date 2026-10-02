import React, { useState } from "react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import {
  FileText,
  CheckSquare,
  Copy,
  Check,
  Download,
  ArrowDown,
  Printer,
  Sparkles,
} from "lucide-react";

interface BriefChecklistProps {
  onScrollToContact: () => void;
}

export const BriefChecklist: React.FC<BriefChecklistProps> = ({ onScrollToContact }) => {
  const [copied, setCopied] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    b1: true,
    b2: true,
    b3: true,
  });

  const { briefChecklist } = PORTFOLIO_CONFIG;

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyBriefTemplate = () => {
    const textToCopy = `--- JAY DEVWORKS UGC STUDIO - PROJECT BRIEF ---
1. Website/Product Link:
2. Target Customer/Audience:
3. Main Campaign Goal:
4. Key Problem the Product Solves:
5. Top 1-3 Features to Highlight:
6. Approved Claims / Required Wording:
7. Brand Style References (Optional):
8. Desired Deliverables & Formats (e.g. 9:16 vertical):
9. Desired Deadline:
10. Intended Usage (Organic Social / Paid Ads / Both):
-------------------------------------------------`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(
        () => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        },
        () => {
          // Fallback
          fallbackCopy(textToCopy);
        }
      );
    } else {
      fallbackCopy(textToCopy);
    }
  };

  const fallbackCopy = (text: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignored
    }
  };

  const handlePrintDownload = () => {
    window.print();
  };

  return (
    <section id="checklist" className="py-20 md:py-28 bg-[#F5F8F9] border-b border-slate-200/80 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-6 sm:p-10 border border-slate-200 shadow-lg space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#087E8B]">
                <FileText className="w-4 h-4" />
                <span>Client Resource</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2437] tracking-tight">
                {briefChecklist.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                {briefChecklist.description}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={copyBriefTemplate}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#0B2437] hover:bg-slate-800 text-white transition-colors cursor-pointer shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied Template!" : "Copy Brief Template"}</span>
              </button>

              <button
                onClick={handlePrintDownload}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print / Save PDF</span>
              </button>
            </div>
          </div>

          {/* Checklist Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {briefChecklist.items.map((item, idx) => {
              const isChecked = !!checkedItems[item.id];

              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleCheck(item.id);
                    }
                  }}
                  className={`p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-start gap-3 ${
                    isChecked
                      ? "bg-[#087E8B]/5 border-[#087E8B]/40 text-[#0B2437]"
                      : "bg-[#F5F8F9] border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isChecked
                        ? "bg-[#087E8B] text-white"
                        : "border border-slate-300 bg-white"
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </span>

                  <div className="flex-1">
                    <span className="font-semibold text-slate-900">{idx + 1}. </span>
                    <span>{item.label}</span>
                    {item.required && (
                      <span className="ml-1 text-[#087E8B] text-xs font-bold">*</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0B2437] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-[#087E8B] uppercase tracking-wider">
                Ready with your details?
              </div>
              <p className="text-xs text-slate-300">
                Paste your brief directly into the inquiry form below for a rapid response within 1–2 business days.
              </p>
            </div>

            <button
              onClick={onScrollToContact}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#087E8B] hover:bg-[#076d78] text-white transition-colors cursor-pointer shrink-0"
            >
              <span>Proceed to Project Inquiry Form</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
