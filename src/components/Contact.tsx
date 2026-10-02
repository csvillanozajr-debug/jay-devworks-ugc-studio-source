import React, { useState, useEffect } from "react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import {
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  Globe2,
  ExternalLink,
  ShieldCheck,
  Lock,
} from "lucide-react";

interface ContactProps {
  preselectedPackage?: string;
  onOpenPrivacyPolicy?: () => void;
}

const ALLOWED_PRODUCT_TYPES = [
  "AI Tool",
  "SaaS Product",
  "Mobile App",
  "Website or No-Code Tool",
  "CRM / POS / Inventory System",
  "Digital Product",
  "E-commerce Product",
  "Business Service",
  "Other",
];

const ALLOWED_PROJECT_GOALS = [
  "Product Awareness",
  "App Installs",
  "Free-Trial Sign-Ups",
  "Website Traffic",
  "Lead Generation",
  "Sales / Conversions",
  "Organic Social Content",
  "Paid Ad Creative",
  "Other",
];

const AVAILABLE_DELIVERABLES = [
  "Single Video (15–30s)",
  "Starter Pack (3x Videos)",
  "Content Test Pack (5x Videos)",
  "SaaS Demo Video (30–60s)",
  "Raw Footage Add-On",
  "Extra Hook Variations",
  "Additional Revisions",
  "Paid-Ad Usage Rights",
  "Rush Delivery",
  "Custom Deliverables",
];

const ALLOWED_BUDGET_RANGES = [
  "Under $150 USD",
  "$150 – $300 USD",
  "$300 – $600 USD",
  "$600 – $1,200 USD",
  "$1,200+ USD",
  "Flexible / To Be Discussed",
];

export const Contact: React.FC<ContactProps> = ({
  preselectedPackage,
  onOpenPrivacyPolicy,
}) => {
  // Form State
  const [fullName, setFullName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [productLink, setProductLink] = useState("");
  const [productType, setProductType] = useState("SaaS Product");
  const [targetAudience, setTargetAudience] = useState("");
  const [projectGoal, setProjectGoal] = useState("Sales / Conversions");
  const [deliverables, setDeliverables] = useState<string[]>([
    "Starter Pack (3x Videos)",
  ]);
  const [deadline, setDeadline] = useState("");
  const [usageType, setUsageType] = useState<"Organic Social" | "Paid Ads" | "Both" | "Unsure">(
    "Organic Social"
  );
  const [budgetRange, setBudgetRange] = useState("$150 – $300 USD");
  const [projectDetails, setProjectDetails] = useState("");
  const [pricingConsent, setPricingConsent] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  // Anti-Spam Security States
  const [honeypot, setHoneypot] = useState(""); // Bot trap
  const [formInitiatedAt, setFormInitiatedAt] = useState<number>(Date.now());

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Record timestamp when user reached or loaded form
    setFormInitiatedAt(Date.now());
  }, []);

  // Update deliverables if preselected from package card or sample
  useEffect(() => {
    if (preselectedPackage) {
      if (preselectedPackage.toLowerCase().includes("single")) {
        setDeliverables(["Single Video (15–30s)"]);
      } else if (preselectedPackage.toLowerCase().includes("starter")) {
        setDeliverables(["Starter Pack (3x Videos)"]);
      } else if (preselectedPackage.toLowerCase().includes("test")) {
        setDeliverables(["Content Test Pack (5x Videos)"]);
      } else if (preselectedPackage.toLowerCase().includes("demo")) {
        setDeliverables(["SaaS Demo Video (30–60s)"]);
      } else {
        setDeliverables(["Custom Deliverables"]);
        setProjectDetails((prev) =>
          prev.includes(preselectedPackage)
            ? prev
            : prev
            ? `${prev}\n\n[Requested Scope/Sample: ${preselectedPackage}]`
            : `[Requested Scope/Sample: ${preselectedPackage}]`
        );
      }
    }
  }, [preselectedPackage]);

  const toggleDeliverable = (item: string) => {
    setDeliverables((prev) => {
      if (prev.includes(item)) {
        // Prevent deselecting everything
        if (prev.length <= 1) return prev;
        return prev.filter((d) => d !== item);
      } else {
        if (prev.length >= 10) return prev;
        return [...prev, item];
      }
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side Validation (strictly for immediate UX assistance)
    const trimmedName = fullName.trim();
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      setErrorMessage("Please enter a valid full name (2–100 characters).");
      return;
    }
    const nameRegex = /^[\p{L}\s'\-.]+$/u;
    if (!nameRegex.test(trimmedName)) {
      setErrorMessage("Please enter letters, spaces, hyphens, and standard punctuation for your name.");
      return;
    }

    const trimmedEmail = workEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || trimmedEmail.length > 254 || !emailRegex.test(trimmedEmail)) {
      setErrorMessage("Please provide a valid work email address.");
      return;
    }

    if (productLink.trim()) {
      const link = productLink.trim();
      if (!link.startsWith("http://") && !link.startsWith("https://")) {
        setErrorMessage("Website or product link must begin with http:// or https://");
        return;
      }
    }

    if (!targetAudience.trim() || targetAudience.trim().length > 300) {
      setErrorMessage("Please specify your target audience (up to 300 characters).");
      return;
    }

    if (deliverables.length === 0 || deliverables.length > 10) {
      setErrorMessage("Please select at least 1 and up to 10 requested deliverables.");
      return;
    }

    const trimmedDetails = projectDetails.trim();
    if (trimmedDetails.length < 20 || trimmedDetails.length > 2000) {
      setErrorMessage("Please provide project details between 20 and 2,000 characters.");
      return;
    }

    if (!pricingConsent) {
      setErrorMessage("Please confirm you understand that final pricing varies based on scope and usage rights.");
      return;
    }

    if (!privacyConsent) {
      setErrorMessage("Please agree to the privacy policy consent to proceed.");
      return;
    }

    setIsSubmitting(true);

    try {
      // POST securely to the protected server endpoint
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: trimmedName,
          brandName: brandName.trim(),
          workEmail: trimmedEmail,
          productLink: productLink.trim(),
          productType,
          targetAudience: targetAudience.trim(),
          projectGoal,
          deliverables,
          deadline: deadline.trim(),
          usageType,
          budgetRange,
          projectDetails: trimmedDetails,
          pricingConsent,
          privacyConsent,
          // Security / anti-bot payloads
          honeypot,
          formInitiatedAt,
          elapsedMs: Date.now() - formInitiatedAt,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        // Generic friendly error without technical leakage
        setErrorMessage(
          data.error ||
            "We could not send your inquiry right now. Please try again shortly or contact us directly by email."
        );
      }
    } catch (err) {
      // Network or parsing failure
      setErrorMessage(
        "We could not send your inquiry right now. Please try again shortly or contact us directly by email."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFullName("");
    setBrandName("");
    setWorkEmail("");
    setProductLink("");
    setTargetAudience("");
    setProjectDetails("");
    setPricingConsent(false);
    setPrivacyConsent(false);
    setFormInitiatedAt(Date.now());
    setSubmitted(false);
    setErrorMessage(null);
  };

  const mailtoUrl = `mailto:${PORTFOLIO_CONFIG.creator.email}?subject=Project%20Inquiry%20-%20Jay%20DevWorks%20UGC%20Studio&body=Hi%20Jay,%0D%0A%0D%0AI'm%20interested%20in%20short-form%20product%20videos%20for%20our%20product.%0D%0A%0D%0AProduct%20Link:%20%0D%0ATarget%20Goal:%20%0D%0ADeadline:%20%0D%0A%0D%0ABest,%0D%0A`;

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#0B2437] text-white relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#087E8B]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1E88E5]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Positioning & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#087E8B]">
                LET’S WORK TOGETHER
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
                Let’s make your product impossible to scroll past.
              </h2>
              <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Need short-form content that makes your AI tool, app, SaaS product, website, or
                  business solution easier to understand—and easier to want?
                </p>
                <p>
                  Let’s create product videos designed to educate, build trust, and move viewers toward
                  action.
                </p>
              </div>
            </div>

            {/* Direct Contact & Security Assurance Card */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Direct Channels &amp; Verification
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#087E8B]">
                  <Lock className="w-3 h-3" />
                  <span>Secure Submission</span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-xs text-slate-400">Email Address</div>
                  <a
                    href={`mailto:${PORTFOLIO_CONFIG.creator.email}`}
                    className="font-medium text-white hover:text-[#087E8B] transition-colors break-all"
                  >
                    {PORTFOLIO_CONFIG.creator.email}
                  </a>
                </div>

                <div>
                  <div className="text-xs text-slate-400">Facebook</div>
                  <div className="font-medium text-slate-200">
                    {PORTFOLIO_CONFIG.creator.facebook}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-400">YouTube Channel</div>
                  <div className="font-medium text-slate-200">
                    {PORTFOLIO_CONFIG.creator.youtube}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-400">TikTok / Instagram</div>
                  <div className="font-medium text-slate-200">
                    {PORTFOLIO_CONFIG.creator.tiktok}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-start gap-2 text-xs text-slate-300">
                  <Globe2 className="w-4 h-4 text-[#087E8B] shrink-0 mt-0.5" />
                  <span>{PORTFOLIO_CONFIG.creator.location}</span>
                </div>
              </div>

              {/* Direct Email Fallback */}
              <div className="pt-2">
                <a
                  href={mailtoUrl}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#087E8B]" />
                  <span>Email Me Directly</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Protected Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0e2c42] border border-white/10 shadow-2xl">
              {submitted ? (
                <div className="py-12 px-4 text-center space-y-5 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#087E8B]/20 text-[#087E8B] flex items-center justify-center mx-auto border border-[#087E8B]/40">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Inquiry Received</h3>
                  <p className="text-base text-slate-200 max-w-lg mx-auto leading-relaxed">
                    Thank you — your inquiry has been received. Jay DevWorks UGC Studio will respond
                    as soon as possible with next steps.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={resetForm}
                      className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                  <div className="border-b border-white/10 pb-4 mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">Project Inquiry Form</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Tell me about your product or tool to receive a proposal and rate quote.
                      </p>
                    </div>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#087E8B]" />
                      <span>Encrypted in Transit</span>
                    </span>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Anti-Spam Invisible Honeypot (hidden from human visitors) */}
                  <div
                    style={{ display: "none", opacity: 0, position: "absolute", left: "-9999px" }}
                    aria-hidden="true"
                  >
                    <label htmlFor="hp_company_fax">Leave this field blank</label>
                    <input
                      type="text"
                      id="hp_company_fax"
                      name="hp_company_fax"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Row 1: Full Name & Company / Brand Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Full Name <span className="text-[#087E8B]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B2437] border border-white/15 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#087E8B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Company / Brand Name
                      </label>
                      <input
                        type="text"
                        maxLength={150}
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder="e.g. FlowCraft AI"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B2437] border border-white/15 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#087E8B]"
                      />
                    </div>
                  </div>

                  {/* Row 2: Work Email & Website or Product Link */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Work Email <span className="text-[#087E8B]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        maxLength={254}
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B2437] border border-white/15 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#087E8B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Website or Product Link
                      </label>
                      <input
                        type="url"
                        maxLength={2048}
                        value={productLink}
                        onChange={(e) => setProductLink(e.target.value)}
                        placeholder="https://yourapp.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B2437] border border-white/15 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#087E8B]"
                      />
                    </div>
                  </div>

                  {/* Row 3: Product Type & Target Audience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Product Type <span className="text-[#087E8B]">*</span>
                      </label>
                      <select
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B2437] border border-white/15 text-white text-sm focus:outline-none focus:border-[#087E8B]"
                      >
                        {ALLOWED_PRODUCT_TYPES.map((pt) => (
                          <option key={pt} value={pt}>
                            {pt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Target Audience <span className="text-[#087E8B]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={300}
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        placeholder="e.g. Solo founders, B2B agencies, SMB owners"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B2437] border border-white/15 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#087E8B]"
                      />
                    </div>
                  </div>

                  {/* Row 4: Project Goal & Estimated Budget Range */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Project Goal <span className="text-[#087E8B]">*</span>
                      </label>
                      <select
                        value={projectGoal}
                        onChange={(e) => setProjectGoal(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B2437] border border-white/15 text-white text-sm focus:outline-none focus:border-[#087E8B]"
                      >
                        {ALLOWED_PROJECT_GOALS.map((goal) => (
                          <option key={goal} value={goal}>
                            {goal}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Estimated Budget Range
                      </label>
                      <select
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B2437] border border-white/15 text-white text-sm focus:outline-none focus:border-[#087E8B]"
                      >
                        {ALLOWED_BUDGET_RANGES.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Requested Deliverables (Controlled Multi-Select Checkboxes) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Requested Deliverables <span className="text-[#087E8B]">*</span> (Max 10)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {AVAILABLE_DELIVERABLES.map((item) => {
                        const isSelected = deliverables.includes(item);
                        return (
                          <button
                            type="button"
                            key={item}
                            onClick={() => toggleDeliverable(item)}
                            className={`p-2 rounded-lg text-xs font-medium text-left border transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? "bg-[#087E8B]/20 border-[#087E8B] text-white"
                                : "bg-[#0B2437] border-white/10 text-slate-300 hover:border-white/30"
                            }`}
                          >
                            <span className="truncate pr-1">{item}</span>
                            <span
                              className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 ${
                                isSelected ? "bg-[#087E8B] text-white" : "border border-white/30"
                              }`}
                            >
                              {isSelected && <span className="text-[9px]">✓</span>}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 6: Intended Usage & Preferred Deadline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Intended Usage <span className="text-[#087E8B]">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                        {(["Organic Social", "Paid Ads", "Both", "Unsure"] as const).map(
                          (usage) => (
                            <button
                              type="button"
                              key={usage}
                              onClick={() => setUsageType(usage)}
                              className={`py-2 px-1 text-center rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                                usageType === usage
                                  ? "bg-[#087E8B] border-[#087E8B] text-white"
                                  : "bg-[#0B2437] border-white/15 text-slate-300 hover:border-slate-400"
                              }`}
                            >
                              {usage}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Preferred Deadline
                      </label>
                      <input
                        type="text"
                        maxLength={50}
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        placeholder="e.g. Within 2 weeks / Oct 25"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B2437] border border-white/15 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#087E8B]"
                      />
                    </div>
                  </div>

                  {/* Row 7: Project Details (20–2000 chars) */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                        Project Details <span className="text-[#087E8B]">*</span>
                      </label>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {projectDetails.length}/2000 (min 20)
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      required
                      minLength={20}
                      maxLength={2000}
                      value={projectDetails}
                      onChange={(e) => setProjectDetails(e.target.value)}
                      placeholder="Describe what your tool or software does, key workflow features to demonstrate, or creative references..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B2437] border border-white/15 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#087E8B] resize-y"
                    />
                  </div>

                  {/* Required Consent Checkboxes */}
                  <div className="pt-2 space-y-2.5 border-t border-white/10">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={pricingConsent}
                        onChange={(e) => setPricingConsent(e.target.checked)}
                        className="mt-0.5 rounded text-[#087E8B] focus:ring-[#087E8B] w-4 h-4 bg-[#0B2437] border-white/20"
                      />
                      <span className="text-xs text-slate-300 leading-normal">
                        I understand that final pricing may vary based on scope and usage rights.
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={privacyConsent}
                        onChange={(e) => setPrivacyConsent(e.target.checked)}
                        className="mt-0.5 rounded text-[#087E8B] focus:ring-[#087E8B] w-4 h-4 bg-[#0B2437] border-white/20"
                      />
                      <span className="text-xs text-slate-300 leading-normal">
                        I agree that Jay DevWorks UGC Studio may use the information in this form to
                        respond to my project inquiry, in accordance with the{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            if (onOpenPrivacyPolicy) onOpenPrivacyPolicy();
                          }}
                          className="text-[#087E8B] underline hover:text-white"
                        >
                          Privacy Policy
                        </button>
                        .
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#087E8B] hover:bg-[#076d78] disabled:opacity-50 active:scale-95 transition-all duration-150 rounded-xl shadow-lg shadow-[#087E8B]/20 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Validating &amp; Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Project Inquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
