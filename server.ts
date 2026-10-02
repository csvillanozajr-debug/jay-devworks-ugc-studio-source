import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.disable("x-powered-by");
const PORT = parseInt(process.env.PORT || "3000", 10);
const isProduction = process.env.NODE_ENV === "production";

// 1. JSON Parser with strict 50kb limit to prevent payload exhaustion
app.use(express.json({ limit: "50kb" }));

// 2. Comprehensive Security Headers Middleware
app.use((_req: Request, res: Response, next: NextFunction) => {
  // Enforce HSTS
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  // Prevent MIME-sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");
  // Referrer policy
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  // Anti-Clickjacking
  res.setHeader("X-Frame-Options", "DENY");
  // Restrict sensitive device capabilities
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), fullscreen=(self)"
  );
  // Content Security Policy
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "img-src 'self' data: https:",
      "font-src 'self' https: data:",
      "style-src 'self' 'unsafe-inline' https:",
      "script-src 'self' 'unsafe-inline' https:",
      "connect-src 'self' https:",
      "upgrade-insecure-requests",
    ].join("; ")
  );
  next();
});

// 3. Security: In-Memory IP Rate Limiter & Abuse Shield
interface RateLimitRecord {
  count: number;
  firstAttemptAt: number;
  blockedUntil: number;
}
const ipRateLimitStore = new Map<string, RateLimitRecord>();

// Helper to get client IP
const getClientIp = (req: Request): string => {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  return req.socket.remoteAddress || "unknown-ip";
};

// Rate limiter: Max 3 successful/attempted submissions per IP per 1 hour (3600000 ms)
const checkRateLimit = (ip: string): { allowed: boolean; retryAfterSeconds?: number } => {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxAttempts = 3;

  const record = ipRateLimitStore.get(ip);
  if (!record) {
    ipRateLimitStore.set(ip, { count: 1, firstAttemptAt: now, blockedUntil: 0 });
    return { allowed: true };
  }

  // Check if currently blocked
  if (record.blockedUntil > now) {
    const retryAfterSeconds = Math.ceil((record.blockedUntil - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  // Check if window has expired
  if (now - record.firstAttemptAt > windowMs) {
    ipRateLimitStore.set(ip, { count: 1, firstAttemptAt: now, blockedUntil: 0 });
    return { allowed: true };
  }

  // Check if limit exceeded
  if (record.count >= maxAttempts) {
    // Progressive cooldown: 1 hour block
    record.blockedUntil = now + windowMs;
    return { allowed: false, retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }

  record.count += 1;
  return { allowed: true };
};

// Clean up stale rate limit records periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipRateLimitStore.entries()) {
    if (now - record.firstAttemptAt > 2 * 60 * 60 * 1000 && record.blockedUntil < now) {
      ipRateLimitStore.delete(ip);
    }
  }
}, 30 * 60 * 1000);

// 4. Duplicate Submission Filter (checks last 60 seconds)
interface DuplicateCheck {
  hash: string;
  timestamp: number;
}
const recentSubmissions: DuplicateCheck[] = [];

// 5. Secure In-Memory Inquiry Storage (with 12-Month Retention Policy)
export interface SecureInquiry {
  id: string;
  fullName: string;
  brandName?: string;
  workEmail: string;
  productLink?: string;
  productType: string;
  targetAudience: string;
  projectGoal: string;
  deliverables: string[];
  deadline?: string;
  usageType: string;
  budgetRange?: string;
  projectDetails: string;
  pricingConsent: boolean;
  privacyConsent: boolean;
  createdAt: string;
  retentionExpiresAt: string;
}

const secureInquiryStore: SecureInquiry[] = [];

// Clean up expired inquiries (older than 12 months)
const pruneExpiredInquiries = () => {
  const now = new Date().toISOString();
  const initialLength = secureInquiryStore.length;
  for (let i = secureInquiryStore.length - 1; i >= 0; i--) {
    if (secureInquiryStore[i].retentionExpiresAt < now) {
      secureInquiryStore.splice(i, 1);
    }
  }
  if (secureInquiryStore.length !== initialLength) {
    console.log(`[Security/Retention] Pruned ${initialLength - secureInquiryStore.length} expired inquiries.`);
  }
};
setInterval(pruneExpiredInquiries, 24 * 60 * 60 * 1000); // Daily check

// HTML Sanitizer to prevent XSS
const sanitizeString = (str: string): string => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

// 6. Strict Allowlist Constants for Server-Side Validation
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

const ALLOWED_USAGE_TYPES = ["Organic Social", "Paid Ads", "Both", "Unsure"];

const ALLOWED_BUDGET_RANGES = [
  "Under $150 USD",
  "$150 – $300 USD",
  "$300 – $600 USD",
  "$600 – $1,200 USD",
  "$1,200+ USD",
  "Flexible / To Be Discussed",
];

// RFC 5322 compliant email validator
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Name regex: Unicode letters (\p{L}), spaces, hyphens, apostrophes, common punctuation
const NAME_REGEX = /^[\p{L}\s'\-.]+$/u;

// ==========================================
// API ROUTES
// ==========================================

// POST /api/inquiries - Submit Contact & Project Inquiry
app.post("/api/inquiries", (req: Request, res: Response) => {
  try {
    const clientIp = getClientIp(req);

    // Rate Limit Check
    const rateCheck = checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
      console.warn(`[Security/RateLimit] Blocked submission attempt from IP: ${clientIp.slice(0, 7)}***`);
      return res.status(429).json({
        success: false,
        error: "We could not send your inquiry right now. Please try again shortly or contact us directly by email.",
      });
    }

    const {
      fullName,
      brandName,
      workEmail,
      productLink,
      productType,
      targetAudience,
      projectGoal,
      deliverables,
      deadline,
      usageType,
      budgetRange,
      projectDetails,
      pricingConsent,
      privacyConsent,
      // Anti-bot tokens
      honeypot,
      formInitiatedAt,
      elapsedMs,
    } = req.body;

    // A. Anti-Spam: Invisible Honeypot check
    // If bot filled the hidden honeypot, silently return a generic success to burn bot resources
    if (honeypot && typeof honeypot === "string" && honeypot.trim() !== "") {
      console.warn(`[Security/Honeypot] Spambot detected and silently discarded from IP: ${clientIp.slice(0, 7)}***`);
      return res.status(200).json({
        success: true,
        message:
          "Thank you — your inquiry has been received. Jay DevWorks UGC Studio will respond as soon as possible with next steps.",
      });
    }

    // B. Anti-Spam: Minimum Time-To-Submit check (min 2000ms, skew-resilient)
    const now = Date.now();
    const initiatedTime = parseInt(formInitiatedAt, 10);
    const elapsed =
      typeof elapsedMs === "number" && !isNaN(elapsedMs)
        ? elapsedMs
        : initiatedTime && !isNaN(initiatedTime)
        ? Math.abs(now - initiatedTime)
        : 0;

    if (elapsed < 2000) {
      console.warn(`[Security/TimeCheck] Bot-like rapid submission rejected (elapsed: ${elapsed}ms).`);
      return res.status(400).json({
        success: false,
        error: "We could not send your inquiry right now. Please try again shortly or contact us directly by email.",
      });
    }

    // C. Server-Side Field Validation

    // 1. Full Name: Required, 2-100 chars, valid name characters
    if (
      !fullName ||
      typeof fullName !== "string" ||
      fullName.trim().length < 2 ||
      fullName.trim().length > 100 ||
      !NAME_REGEX.test(fullName.trim())
    ) {
      return res.status(400).json({
        success: false,
        error: "We could not send your inquiry right now. Please try again shortly or contact us directly by email.",
      });
    }

    // 2. Company / Brand Name: Optional, max 150 chars
    if (brandName && (typeof brandName !== "string" || brandName.trim().length > 150)) {
      return res.status(400).json({
        success: false,
        error: "We could not send your inquiry right now. Please try again shortly or contact us directly by email.",
      });
    }

    // 3. Work Email: Required, max 254 chars, valid email
    if (
      !workEmail ||
      typeof workEmail !== "string" ||
      workEmail.trim().length > 254 ||
      !EMAIL_REGEX.test(workEmail.trim())
    ) {
      return res.status(400).json({
        success: false,
        error: "We could not send your inquiry right now. Please try again shortly or contact us directly by email.",
      });
    }

    // 4. Website or Product Link: Optional, max 2048 chars, strictly http or https
    if (productLink && typeof productLink === "string" && productLink.trim() !== "") {
      const trimmedLink = productLink.trim();
      if (trimmedLink.length > 2048) {
        return res.status(400).json({
          success: false,
          error: "We could not send your inquiry right now. Please try again shortly or contact us directly by email.",
        });
      }
      try {
        const parsedUrl = new URL(trimmedLink);
        if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
          return res.status(400).json({
            success: false,
            error: "We could not send your inquiry right now. Please try again shortly or contact us directly by email.",
          });
        }
      } catch (err) {
        return res.status(400).json({
          success: false,
          error: "We could not send your inquiry right now. Please try again shortly or contact us directly by email.",
        });
      }
    }

    // 5. Product Type: Required, strictly from allowlist
    if (!productType || typeof productType !== "string" || !ALLOWED_PRODUCT_TYPES.includes(productType.trim())) {
      return res.status(400).json({
        success: false,
        error: "We could not send your inquiry right now. Please try again shortly or contact us directly by email.",
      });
    }

    // 6. Target Audience: Required, max 300 chars
    if (
      !targetAudience ||
      typeof targetAudience !== "string" ||
      targetAudience.trim().length === 0 ||
      targetAudience.trim().length > 300
    ) {
      return res.status(400).json({
        success: false,
        error: "We could not send your inquiry right now. Please try again shortly or contact us directly by email.",
      });
    }

    // 7. Project Goal: Required, strictly from allowlist
    if (!projectGoal || typeof projectGoal !== "string" || !ALLOWED_PROJECT_GOALS.includes(projectGoal.trim())) {
      return res.status(400).json({
        success: false,
        error: "We could not send your inquiry right now. Please try again shortly or contact us directly by email.",
      });
    }

    // 8. Requested Deliverables: Required, array of max 10 strings
    if (!Array.isArray(deliverables) || deliverables.length === 0 || deliverables.length > 10) {
      return res.status(400).json({
        success: false,
        error: "We could not send your inquiry right now. Please try again shortly or contact us directly by email.",
      });
    }

    // 9. Preferred Deadline: Optional, max 50 chars
    if (deadline && (typeof deadline !== "string" || deadline.trim().length > 50)) {
      return res.status(400).json({
        success: false,
        error: "We could not send your inquiry right now. Please try again shortly or contact us directly by email.",
      });
    }

    // 10. Intended Usage: Required, strictly from allowlist
    if (!usageType || typeof usageType !== "string" || !ALLOWED_USAGE_TYPES.includes(usageType.trim())) {
      return res.status(400).json({
        success: false,
        error: "We could not send your inquiry right now. Please try again shortly or contact us directly by email.",
      });
    }

    // 11. Estimated Budget Range: Optional, allowlist only
    if (
      budgetRange &&
      typeof budgetRange === "string" &&
      budgetRange.trim() !== "" &&
      !ALLOWED_BUDGET_RANGES.includes(budgetRange.trim())
    ) {
      return res.status(400).json({
        success: false,
        error: "We could not send your inquiry right now. Please try again shortly or contact us directly by email.",
      });
    }

    // 12. Project Details: Required, min 20, max 2000 chars, plain text sanitized
    if (
      !projectDetails ||
      typeof projectDetails !== "string" ||
      projectDetails.trim().length < 20 ||
      projectDetails.trim().length > 2000
    ) {
      return res.status(400).json({
        success: false,
        error: "We could not send your inquiry right now. Please try again shortly or contact us directly by email.",
      });
    }

    // 13. Pricing Consent Checkbox: Required true
    if (pricingConsent !== true) {
      return res.status(400).json({
        success: false,
        error: "We could not send your inquiry right now. Please try again shortly or contact us directly by email.",
      });
    }

    // 14. Privacy Consent Checkbox: Required true
    if (privacyConsent !== true) {
      return res.status(400).json({
        success: false,
        error: "We could not send your inquiry right now. Please try again shortly or contact us directly by email.",
      });
    }

    // D. Duplicate Submission Check (within 60s)
    const normalizedEmail = workEmail.trim().toLowerCase();
    const submissionHash = `${normalizedEmail}_${projectDetails.trim().slice(0, 30)}`;
    const recentDuplicate = recentSubmissions.find(
      (s) => s.hash === submissionHash && now - s.timestamp < 60000
    );
    if (recentDuplicate) {
      return res.status(400).json({
        success: false,
        error: "We could not send your inquiry right now. Please try again shortly or contact us directly by email.",
      });
    }
    recentSubmissions.push({ hash: submissionHash, timestamp: now });
    // Keep duplicate list small
    if (recentSubmissions.length > 50) recentSubmissions.shift();

    // E. Sanitize & Store (Retention: 12 months)
    const cleanInquiry: SecureInquiry = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      fullName: sanitizeString(fullName.trim()),
      brandName: brandName ? sanitizeString(brandName.trim()) : undefined,
      workEmail: normalizedEmail,
      productLink: productLink ? sanitizeString(productLink.trim()) : undefined,
      productType: sanitizeString(productType.trim()),
      targetAudience: sanitizeString(targetAudience.trim()),
      projectGoal: sanitizeString(projectGoal.trim()),
      deliverables: deliverables.map((d: any) => sanitizeString(String(d).trim().slice(0, 80))),
      deadline: deadline ? sanitizeString(deadline.trim()) : undefined,
      usageType: sanitizeString(usageType.trim()),
      budgetRange: budgetRange ? sanitizeString(budgetRange.trim()) : undefined,
      projectDetails: sanitizeString(projectDetails.trim()),
      pricingConsent: true,
      privacyConsent: true,
      createdAt: new Date().toISOString(),
      // 12 months from now
      retentionExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    };

    secureInquiryStore.push(cleanInquiry);

    // Security logging without logging personal passwords or secrets
    console.log(`[Security/Audit] New valid inquiry stored: ${cleanInquiry.id} (${cleanInquiry.productType})`);

    return res.status(200).json({
      success: true,
      message:
        "Thank you — your inquiry has been received. Jay DevWorks UGC Studio will respond as soon as possible with next steps.",
    });
  } catch (err) {
    console.error("[Security/Error] Unhandled exception during inquiry handling:", (err as Error).message);
    return res.status(500).json({
      success: false,
      error: "We could not send your inquiry right now. Please try again shortly or contact us directly by email.",
    });
  }
});

// POST /api/privacy/request - User Data Access, Correction, or Deletion Request
app.post("/api/privacy/request", (req: Request, res: Response) => {
  try {
    const { email, requestType } = req.body;
    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const validTypes = ["access", "deletion", "correction"];
    const type = validTypes.includes(requestType) ? requestType : "deletion";

    if (type === "deletion") {
      let deletedCount = 0;
      for (let i = secureInquiryStore.length - 1; i >= 0; i--) {
        if (secureInquiryStore[i].workEmail === normalizedEmail) {
          secureInquiryStore.splice(i, 1);
          deletedCount++;
        }
      }
      console.log(`[Privacy] Processed deletion request for email: ${normalizedEmail.slice(0, 3)}*** (${deletedCount} records removed)`);
    }

    return res.status(200).json({
      success: true,
      message: "Your privacy request has been processed in accordance with our Privacy Policy.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Unable to process privacy request at this time.",
    });
  }
});

// 7. Mounting Vite in Dev / Serving Dist in Prod
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Jay DevWorks UGC Studio] Server running on http://0.0.0.0:${PORT} (Production: ${isProduction})`);
  });
}

startServer();
