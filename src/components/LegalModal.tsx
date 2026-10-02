import React, { useEffect, useState } from "react";
import { X, Shield, Lock, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";

export type LegalDocType = "privacy" | "terms" | "usage" | null;

interface LegalModalProps {
  type: LegalDocType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const [requestEmail, setRequestEmail] = useState("");
  const [requestType, setRequestType] = useState<"deletion" | "access">("deletion");
  const [requestStatus, setRequestStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [activeTab, setActiveTab] = useState<"policy" | "request">("policy");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!type) return null;

  const handlePrivacySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestEmail || !requestEmail.includes("@")) return;

    setRequestStatus("submitting");
    try {
      const res = await fetch("/api/privacy/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: requestEmail, requestType }),
      });
      if (res.ok) {
        setRequestStatus("success");
      } else {
        setRequestStatus("error");
      }
    } catch {
      setRequestStatus("error");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-[#0B2437] max-h-[88vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#087E8B]"
          aria-label="Close legal dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#087E8B] mb-2">
          <Shield className="w-4 h-4" />
          <span>Legal &amp; Data Governance</span>
        </div>

        {type === "privacy" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-2xl font-bold text-[#0B2437]">Privacy Policy</h3>
                <p className="text-xs text-slate-500">Last updated: March 2026</p>
              </div>

              {/* Toggle between reading policy and exercising data rights */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
                <button
                  onClick={() => setActiveTab("policy")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeTab === "policy"
                      ? "bg-white text-[#0B2437] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Policy Overview
                </button>
                <button
                  onClick={() => setActiveTab("request")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeTab === "request"
                      ? "bg-white text-[#0B2437] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Manage My Data
                </button>
              </div>
            </div>

            {activeTab === "policy" ? (
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <div>
                  <h4 className="font-bold text-[#0B2437] text-sm mb-1">1. Information We Collect</h4>
                  <p>
                    When you submit a project inquiry, we collect your Full Name, Company or Brand Name,
                    Work Email, Website or Product URL, Product Type, Target Audience, Project Goals,
                    Requested Deliverables, Estimated Budget, and Project Brief Details.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#0B2437] text-sm mb-1">2. Purpose &amp; Use of Information</h4>
                  <p>
                    Collected information is used exclusively to evaluate project feasibility, prepare
                    accurate rate quotes, draft video concepts, and communicate with you regarding your
                    inquiry. We do not use your information for unsolicited commercial newsletters or marketing.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#0B2437] text-sm mb-1">3. Third-Party Service Providers</h4>
                  <p>
                    We do not sell, rent, or trade your personal data. Data is processed securely through
                    trusted infrastructure providers strictly for hosting (HTTPS cloud platform), secure
                    server operations, and transactional email notifications.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#0B2437] text-sm mb-1">4. Data Retention Policy</h4>
                  <p>
                    Inquiry submissions are retained on our secure server for up to <strong>12 months</strong>,
                    after which records are automatically pruned unless an active ongoing commercial
                    contract or accounting requirement necessitates longer retention.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#0B2437] text-sm mb-1">5. Cookies &amp; Tracking</h4>
                  <p>
                    This portfolio does not use invasive third-party tracking cookies, advertising pixels,
                    or session recording tools. We only use functional session headers strictly necessary
                    for secure form submission and anti-spam verification.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#0B2437] text-sm mb-1">6. Your Data Rights (Access &amp; Deletion)</h4>
                  <p>
                    You have the right to request access to, correction of, or permanent deletion of your
                    submitted personal data at any time. You can use the "Manage My Data" tab in this window
                    or email us directly at <strong>{PORTFOLIO_CONFIG.creator.email}</strong>.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-sm text-[#0B2437] mb-1">
                    Request Data Access or Permanent Deletion
                  </h4>
                  <p className="text-xs text-slate-600">
                    Enter the work email used when submitting your project inquiry.
                  </p>
                </div>

                {requestStatus === "success" ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>
                      Your request has been processed. All associated inquiry records have been purged.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handlePrivacySubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        value={requestEmail}
                        onChange={(e) => setRequestEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#087E8B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Request Type
                      </label>
                      <select
                        value={requestType}
                        onChange={(e) => setRequestType(e.target.value as any)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#087E8B]"
                      >
                        <option value="deletion">Permanently Delete My Data</option>
                        <option value="access">Request Access / Data Report</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={requestStatus === "submitting"}
                      className="w-full py-2.5 px-4 bg-[#0B2437] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      {requestStatus === "submitting" ? "Processing..." : "Submit Privacy Request"}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        )}

        {type === "terms" && (
          <div>
            <h3 className="text-2xl font-bold text-[#0B2437] mb-1">Terms of Service</h3>
            <p className="text-xs text-slate-500 mb-6">Last updated: March 2026</p>
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div>
                <h4 className="font-bold text-[#0B2437] text-sm mb-1">1. Scope of Engagement</h4>
                <p>
                  Project timelines begin once a finalized brief, product access or demo credentials,
                  and agreed package deposit are confirmed in writing.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#0B2437] text-sm mb-1">2. Production &amp; Revisions</h4>
                <p>
                  Standard packages include the stated number of revision rounds for pacing, voiceover
                  emphasis, or caption adjustments. Fundamental alterations to feature logic after final
                  script approval are quoted as additional scope.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#0B2437] text-sm mb-1">3. Delivery &amp; Turnaround</h4>
                <p>
                  Typical turnaround is 5–7 business days following brief receipt. Rush delivery options
                  are confirmed prior to contract kickoff.
                </p>
              </div>
            </div>
          </div>
        )}

        {type === "usage" && (
          <div>
            <h3 className="text-2xl font-bold text-[#0B2437] mb-1">Usage Rights &amp; Commercial Licensing</h3>
            <p className="text-xs text-slate-500 mb-6">Last updated: March 2026</p>
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div>
                <h4 className="font-bold text-[#0B2437] text-sm mb-1">1. Organic Social Usage</h4>
                <p>
                  All completed videos include perpetual organic distribution rights across the client's
                  owned social media profiles (TikTok, Instagram Reels, YouTube Shorts, LinkedIn, Facebook).
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#0B2437] text-sm mb-1">2. Paid Advertising Licensing</h4>
                <p>
                  Usage in paid ad campaigns (Meta Ads Manager, TikTok Spark Ads, YouTube Ads) requires
                  explicit licensing rights quoted separately based on flight length (e.g. 30 days, 90 days,
                  or 12 months) and geographical territories.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#0B2437] text-sm mb-1">3. Spec &amp; Concept Attribution</h4>
                <p>
                  Concept samples on this portfolio demonstrate creative ability and format storytelling.
                  Client marks and endorsements are displayed only with written client permission.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#0B2437] hover:bg-slate-800 text-white rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
