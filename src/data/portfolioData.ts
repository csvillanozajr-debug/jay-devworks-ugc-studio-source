export interface VideoSample {
  id: string;
  title: string;
  category: string;
  label: string;
  isSpecSample: boolean;
  duration: string;
  hook: string;
  description: string;
  problemSolved: string;
  scriptOutline: string[];
  visualHighlights: string[];
  thumbnailUrl: string;
  mockVideoColor: string;
  videoPlaceholderUrl?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  idealFor: string;
}

export interface ContentStyleItem {
  id: string;
  title: string;
  description: string;
  isSpecialty?: boolean;
  specialtyTag?: string;
  idealFor: string;
  hookExample: string;
}

export interface ContentAngle {
  id: string;
  name: string;
  hook: string;
  objective: string;
  targetPsychology: string;
  sampleScriptHook: string;
}

export interface PricingPackage {
  id: string;
  title: string;
  isPopular?: boolean;
  priceUSD: number;
  pricePHP: number;
  duration: string;
  features: string[];
  bestFor: string;
  ctaText: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ShowreelSegment {
  timecode: string;
  title: string;
  hookText: string;
  visualDesc: string;
  techHighlight: string;
  startSec: number;
  endSec: number;
}

export const PORTFOLIO_CONFIG = {
  creator: {
    brandName: "JAY DEVWORKS UGC STUDIO",
    creatorName: "Jay Villanoza",
    tagline: "Short-form product videos for AI, SaaS, apps, and small-business brands.",
    eyebrow: "PHILIPPINES-BASED UGC CREATOR FOR TECH BRANDS",
    headline: "Short-Form UGC for AI, SaaS, Apps & Small-Business Brands.",
    subheadline:
      "Scroll-stopping product demos, tutorials, testimonials, and performance-style videos made for TikTok, Instagram Reels, Facebook Reels, YouTube Shorts, and paid social campaigns.",
    email: "jaydevworks.ugc@gmail.com",
    facebook: "RJ Creative Solutions and Web Development Services",
    facebookUrl: "https://facebook.com",
    youtube: "Jay DevWorks",
    youtubeUrl: "https://youtube.com/@jaydevworks",
    tiktok: "@jaydevworks.ugc",
    tiktokUrl: "https://tiktok.com",
    instagram: "@jaydevworks.ugc",
    instagramUrl: "https://instagram.com",
    location: "Philippines — available for remote collaborations worldwide.",
    availabilityNote: "Available for remote collaborations worldwide.",
    bookingStatus: "Now booking: October 2026 projects",
    responseTime: "Replies within 1–2 business days",
    calendarBookingUrl: "https://calendly.com", // 15-min discovery call link
  },

  trustBadges: [
    "AI Tools",
    "SaaS",
    "Mobile Apps",
    "Business Software",
    "Vertical Video",
  ],

  showreel: {
    title: "Watch the Reel",
    subtitle: "Short-form product videos built to stop the scroll.",
    description:
      "A quick look at how Jay DevWorks UGC Studio combines strong hooks, clean captions, product demonstrations, screen recordings, and clear calls to action for modern digital products.",
    totalDuration: 45,
    segments: [
      {
        timecode: "0–3s",
        startSec: 0,
        endSec: 3,
        title: "Fast Hook",
        hookText: "“Still managing your business with disconnected tools?”",
        visualDesc: "Holding phone displaying chaotic multi-app notifications and error alerts.",
        techHighlight: "Immediate attention capture in first 3 seconds",
      },
      {
        timecode: "3–8s",
        startSec: 3,
        endSec: 8,
        title: "AI & Dashboard Recording",
        hookText: "“Here is the exact automation workflow that fixes this.”",
        visualDesc: "Crisp 60fps screen recording zooming into AI prompt generation and node connections.",
        techHighlight: "High-resolution zoomed UI walkthrough",
      },
      {
        timecode: "8–14s",
        startSec: 8,
        endSec: 14,
        title: "SaaS Product Demo",
        hookText: "“Every client lead automatically appears on this kanban pipeline.”",
        visualDesc: "Dynamic kinetic captions synced to voiceover with instant UI drag-and-drop proof.",
        techHighlight: "Clear synchronization of voiceover & kinetic captions",
      },
      {
        timecode: "14–20s",
        startSec: 14,
        endSec: 20,
        title: "Before & After Visual",
        hookText: "“Before: 4 spreadsheets and lost follow-ups. After: One click.”",
        visualDesc: "Split-screen comparison: red spreadsheet formula errors vs sleek dark-mode CRM.",
        techHighlight: "Dramatic visual transformation contrast",
      },
      {
        timecode: "20–27s",
        startSec: 20,
        endSec: 27,
        title: "3 Features Quick-Cut",
        hookText: "“Feature 1: Auto-sync. Feature 2: SMS triggers. Feature 3: Deposits.”",
        visualDesc: "High-tempo 3-beat rhythm showcasing mobile booking and auto-timezone adjustments.",
        techHighlight: "Fast-paced retention-optimized editing",
      },
      {
        timecode: "27–35s",
        startSec: 27,
        endSec: 35,
        title: "App Onboarding Walkthrough",
        hookText: "“Setting this up took literally less than 3 minutes.”",
        visualDesc: "Mobile app onboarding sequence with smooth finger-tap indicators and zero friction.",
        techHighlight: "Beginner-friendly accessibility demonstration",
      },
      {
        timecode: "35–45s",
        startSec: 35,
        endSec: 45,
        title: "Call to Action",
        hookText: "“UGC for AI, apps, SaaS, and small-business brands.”",
        visualDesc: "Clean brand lockup with direct email contact and website URL link in bio.",
        techHighlight: "Clear, frictionless direct response close",
      },
    ] as ShowreelSegment[],
  },

  brandFit: {
    heading: "Built for brands whose products need to be understood.",
    subheading:
      "Best for AI tools, SaaS, websites, apps, CRM/POS, digital products, business services, and selected e-commerce tech products.",
    description:
      "If your product solves a real problem but requires more than a 3-second lifestyle glance to appreciate, you need UGC created by someone who understands the software, workflows, and decision-maker pain points.",
    categories: [
      {
        name: "AI Tools & Generators",
        desc: "Prompt tools, generative platforms, AI copywriters, automation agents, image & voice tools.",
        badge: "Specialty",
      },
      {
        name: "SaaS & Cloud Platforms",
        desc: "B2B productivity tools, analytics dashboards, collaboration workspaces, developer platforms.",
        badge: "Specialty",
      },
      {
        name: "Mobile Apps (iOS & Android)",
        desc: "Utility apps, booking engines, fitness & habit trackers, personal finance, business apps.",
        badge: "High Fit",
      },
      {
        name: "Websites & No-Code Systems",
        desc: "Website builders, Bubble / Webflow portals, Notion systems, Zapier & Make integrations.",
        badge: "Specialty",
      },
      {
        name: "CRM, POS & Inventory Systems",
        desc: "Customer pipeline managers, retail POS systems, multi-location stock managers.",
        badge: "High Fit",
      },
      {
        name: "Selected Tech Accessories",
        desc: "Creator desk setups, ergonomic tech accessories, peripherals, productivity hardware.",
        badge: "Selective",
      },
    ],
    realWorkflowPoints: [
      "Software Dashboard Navigation: Authentic UI interactions, zero fake dummy frames.",
      "Browser Workflow Screen Recording: 1080×1920 60fps vertical capture with cursor zooming.",
      "Mobile Onboarding Capture: Direct device recording in portrait orientation.",
      "Studio Editing Timeline: CapCut & DaVinci Resolve color grading, custom sound effects & precise kinetic text.",
    ],
  },

  contentStyles: [
    {
      id: "faceless-ugc",
      title: "Faceless UGC",
      description: "Product-focused videos using visuals, captions, voiceover, B-roll, and screen recordings.",
      isSpecialty: true,
      specialtyTag: "CORE SPECIALTY",
      idealFor: "SaaS tools, developer platforms, and tools where the product interface is the star.",
      hookExample: "“Watch what happens when I feed this 2-page brief to this AI tool…”",
    },
    {
      id: "screen-demo",
      title: "Screen-Recorded Demo",
      description: "Clear app, website, dashboard, or feature walkthroughs for digital products.",
      isSpecialty: true,
      specialtyTag: "CORE SPECIALTY",
      idealFor: "Dashboards, CRM systems, web applications, and onboarding guides.",
      hookExample: "“Here is how you automate client invoices in under 45 seconds.”",
    },
    {
      id: "tutorial-content",
      title: "Tutorial Content",
      description: "Step-by-step educational videos that make a tool easier to start using.",
      isSpecialty: true,
      specialtyTag: "CORE SPECIALTY",
      idealFor: "No-code platforms, multi-step workflows, and complex business software.",
      hookExample: "“Step 1: Link your database. Step 2: Hit publish. You're done.”",
    },
    {
      id: "face-to-camera",
      title: "Face-to-Camera UGC",
      description: "Natural, direct-to-viewer delivery that builds trust and feels native in-feed.",
      isSpecialty: false,
      idealFor: "Organic social feeds, founder endorsements, and relatable peer recommendations.",
      hookExample: "“I honestly didn't expect this productivity app to replace 3 of my tools.”",
    },
    {
      id: "hands-only",
      title: "Hands-Only Demo",
      description: "Tactile product demonstrations, setup videos, unboxing, or creator-tool content.",
      isSpecialty: false,
      idealFor: "Smartphones, tablets with styluses, keyboard setups, and tech accessories.",
      hookExample: "“This one small desk upgrade cleared 80% of my cable clutter.”",
    },
    {
      id: "testimonial-style",
      title: "Testimonial-Style Video",
      description: "Conversational social-proof content using only approved, truthful product claims.",
      isSpecialty: false,
      idealFor: "Retargeting paid campaigns and overcoming hesitation on pricing pages.",
      hookExample: "“The reason our team switched from spreadsheets to this tool comes down to one feature.”",
    },
    {
      id: "paid-ad-creative",
      title: "Paid-Ad Creative",
      description: "Direct-response content with hooks, product proof, benefits, and a strong CTA.",
      isSpecialty: false,
      idealFor: "Meta Ads, TikTok Spark Ads, YouTube Shorts campaigns with measurable CPA/ROAS targets.",
      hookExample: "“Stop losing leads in your DMs. Test this automated booking flow today.”",
    },
  ] as ContentStyleItem[],

  howIThink: {
    eyebrow: "STRATEGIC APPROACH",
    heading: "More than a product video.",
    subheading: "Great UGC does not just show a feature. It connects that feature to a real customer problem.",
    intro:
      "Most UGC creators treat software like a beauty product or apparel item. Because of my background in web development, automation, and business systems, I approach every video like a product marketer and engineer.",
    fourQuestions: [
      {
        number: "01",
        question: "Who is the viewer?",
        answer: "A founder, small-business owner, freelancer, creator, or everyday app user looking for leverage.",
      },
      {
        number: "02",
        question: "What frustrates them now?",
        answer: "Manual tasks, slow workflows, scattered information, missed leads, unclear reporting, or complicated software.",
      },
      {
        number: "03",
        question: "What is the simplest product outcome?",
        answer: "Save time, reduce mistakes, organize work, respond faster, or make a difficult task easier.",
      },
      {
        number: "04",
        question: "What action should they take next?",
        answer: "Start a trial, download the app, book a demo, visit the website, or make a purchase.",
      },
    ],
    proofFramework: {
      title: "Built for thoughtful product storytelling",
      note: "This portfolio currently features concept samples created to demonstrate product storytelling, short-form editing, screen-recorded demos, and UGC creative strategy. Verified client metrics, views, and case studies are added only with explicit client permission.",
      caseStudyFormula: "Problem → Creative Strategy → Deliverables → Outcome",
    },
  },

  briefChecklist: {
    title: "UGC Project Brief Checklist",
    description:
      "To create your content efficiently and ensure maximum conversion impact, please prepare these 10 items before production begins:",
    items: [
      { id: "b1", label: "Your website, app-store, or product link", required: true },
      { id: "b2", label: "The target customer or audience (e.g. SMB founders, freelancers)", required: true },
      { id: "b3", label: "Your main campaign goal (e.g. Free trial sign-ups, conversions, paid testing)", required: true },
      { id: "b4", label: "One key problem the product solves (the core pain point)", required: true },
      { id: "b5", label: "The main features or benefits to highlight (top 1–3 items)", required: true },
      { id: "b6", label: "Approved product claims and required wording / terminology", required: true },
      { id: "b7", label: "Brand style references or example videos you admire", required: false },
      { id: "b8", label: "Desired deliverables and platform formats (9:16 vertical 1080×1920)", required: true },
      { id: "b9", label: "Desired deadline or campaign flight date", required: false },
      { id: "b10", label: "Intended usage: organic social, paid ads, or both", required: true },
    ],
  },

  about: {
    eyebrow: "ABOUT JAY DEVWORKS UGC STUDIO",
    heading: "Professional short-form content for products that need to be understood.",
    paragraphs: [
      "Hello, I'm Jay Villanoza, the creator behind Jay DevWorks UGC Studio.",
      "I am a UGC creator and web-development professional focused on turning software, digital products, and business tools into clear, engaging short-form videos.",
      "My background in web development, automation, AI platforms, business systems, inventory tools, websites, and dashboards allows me to create product content that is not only visually polished, but also practical, accurate, and easy to understand.",
    ],
    highlights: [
      "What the product does",
      "Which problem it solves",
      "Why it is useful",
      "How to get started",
    ],
    highlightStatement: "I turn complex features into simple, scroll-stopping product stories.",
    skills: [
      "Web Development (Full-Stack)",
      "Workflow Automation & Zapier/Make",
      "SaaS Dashboards & CRM Systems",
      "Inventory & POS Management",
      "AI Prompts & Generative Tooling",
      "Vertical 9:16 Video Editing & Captions",
    ],
  },

  valueCards: [
    {
      id: "product-aware",
      title: "Product-Aware Content",
      description:
        "Clear content informed by real understanding of software workflows, dashboards, features, websites, and business systems.",
    },
    {
      id: "vertical-native",
      title: "Built for Vertical Video",
      description:
        "Native-feeling content optimized for TikTok, Instagram Reels, Facebook Reels, YouTube Shorts, and paid social campaigns.",
    },
    {
      id: "reliable-delivery",
      title: "Clear, Professional Delivery",
      description:
        "Organized briefs, concise scripts, polished editing, accurate captions, and reliable project communication.",
    },
  ],

  services: [
    {
      id: "product-demos",
      number: "01",
      title: "Product Demos",
      description:
        "A clear, visually engaging walkthrough that shows how the product works and why it matters.",
      deliverables: ["Curated feature flow", "Clean UI screen recording", "Sync voiceover + captions"],
      idealFor: "SaaS tools, web platforms & feature announcements",
    },
    {
      id: "problem-solution",
      number: "02",
      title: "Problem–Solution UGC",
      description:
        "Relatable customer pain points followed by a simple, convincing product solution.",
      deliverables: ["Pain-point hook in first 3s", "Rapid friction relief demo", "Direct call-to-action"],
      idealFor: "Performance marketing & conversion ads",
    },
    {
      id: "ugc-video-ads",
      number: "03",
      title: "UGC-Style Video Ads",
      description:
        "Native vertical videos designed for organic social media or performance marketing campaigns.",
      deliverables: ["High-retention pacing", "Platform-native aesthetic", "Multiple hook testing formats"],
      idealFor: "TikTok Ads, Meta Reels & YouTube Shorts",
    },
    {
      id: "screen-tutorials",
      number: "04",
      title: "Screen-Recorded Tutorials",
      description:
        "Screen capture, voiceover, captions, and product demonstrations for apps, websites, AI tools, and SaaS platforms.",
      deliverables: ["Step-by-step guidance", "Zoomed-in UI highlights", "Concise under-60s pacing"],
      idealFor: "Onboarding users & educational marketing",
    },
    {
      id: "testimonial-videos",
      number: "05",
      title: "Testimonial-Style Videos",
      description:
        "Conversational, natural review-style videos using only approved brand messaging and truthful claims.",
      deliverables: ["Authentic tone", "Truthful benefit highlights", "Subtle branding integration"],
      idealFor: "Retargeting campaigns & trust building",
    },
    {
      id: "feature-highlights",
      number: "06",
      title: "Feature Highlights",
      description:
        "Fast-paced “3 reasons,” feature breakdown, and benefit-led videos built for short-form feeds.",
      deliverables: ["Rapid 3-part structure", "Kinetic text callouts", "High-energy sound design cues"],
      idealFor: "Feature releases & viral social formats",
    },
    {
      id: "app-walkthroughs",
      number: "07",
      title: "App & Website Walkthroughs",
      description:
        "First-use experiences, onboarding flows, key-feature demos, and simple how-to content.",
      deliverables: ["Mobile/desktop device framing", "First-time user perspective", "Frictionless setup demo"],
      idealFor: "Mobile iOS/Android apps & modern web apps",
    },
    {
      id: "creative-variations",
      number: "08",
      title: "Creative Testing Variations",
      description:
        "Alternative hooks, calls to action, video intros, and messaging angles for brands testing multiple ad creatives.",
      deliverables: ["3 distinct hook variations", "Split-tested CTAs", "Formatted for Meta & TikTok Ads Manager"],
      idealFor: "Growth marketers & media buyers",
    },
  ] as ServiceItem[],

  deliveryFormats: {
    label: "DELIVERY FORMATS",
    details: "9:16 Vertical Video · 1080 × 1920 · TikTok · Instagram Reels · Facebook Reels · YouTube Shorts · Paid Social",
  },

  videoSamples: [
    {
      id: "sample-1",
      title: "Stop Losing Customer Leads",
      label: "Problem–Solution SaaS UGC",
      category: "SaaS & CRM",
      isSpecSample: true,
      duration: "0:28",
      hook: "Still losing track of leads in messy spreadsheets?",
      description:
        "A customer-follow-up pain point transformed into a clear CRM workflow demonstration.",
      problemSolved: "Eliminates forgotten follow-ups and scattered inquiries with automated pipeline staging.",
      scriptOutline: [
        "0:00 - 0:04 | Hook: Holding phone showing 14 missed client inquiries across WhatsApp and email.",
        "0:04 - 0:12 | Agitation: Showing the chaotic multi-tab spreadsheet that takes 20 minutes to update.",
        "0:12 - 0:22 | Resolution: One-tap lead capture straight into a clean pipeline board with automatic follow-up reminders.",
        "0:22 - 0:28 | Call to Action: Try the 14-day free trial through the link in bio.",
      ],
      visualHighlights: [
        "Messy lead capture vs clean kanban CRM board",
        "Automated push notification confirmation",
        "Mobile-optimized dashboard interface",
      ],
      thumbnailUrl: "/src/assets/images/ugc_demo_saas_1790932765701.jpg",
      mockVideoColor: "from-[#087E8B]/30 to-[#0B2437]",
      videoPlaceholderUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "sample-2",
      title: "I Tested This AI Business Tool",
      label: "AI Tool Product Demo",
      category: "AI & Automation",
      isSpecSample: true,
      duration: "0:34",
      hook: "I didn’t expect this AI tool to save me 4 hours a week.",
      description:
        "A curiosity-led demonstration that introduces a useful AI feature and shows the real workflow.",
      problemSolved: "Automates repetitive customer inquiry drafting and documentation summary in seconds.",
      scriptOutline: [
        "0:00 - 0:03 | Hook: Screen showing a 2-page complex client brief.",
        "0:03 - 0:14 | Workflow: Prompt input and instantaneous generation of an actionable 5-step task breakdown.",
        "0:14 - 0:26 | Real-world result: Comparing 45 minutes of manual writing vs 15 seconds with the AI workspace.",
        "0:26 - 0:34 | CTA: Link below to claim free trial credits.",
      ],
      visualHighlights: [
        "Real-time streaming text generation demo",
        "Side-by-side time efficiency comparison",
        "Crisp screen capture with clear voiceover",
      ],
      thumbnailUrl: "/src/assets/images/ugc_demo_saas_1790932765701.jpg",
      mockVideoColor: "from-[#1E88E5]/30 to-[#0B2437]",
      videoPlaceholderUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "sample-3",
      title: "3 Features Small Businesses Need",
      label: "App Feature Highlight",
      category: "Mobile Apps",
      isSpecSample: true,
      duration: "0:31",
      hook: "If you run an appointment business, you need these 3 settings turned on.",
      description:
        "A fast-paced feature breakdown built for busy entrepreneurs and decision-makers.",
      problemSolved: "Reduces client no-shows and streamlines online bookings with 0 manual coordination.",
      scriptOutline: [
        "0:00 - 0:03 | Hook: 'Stop texting back and forth just to schedule a consultation.'",
        "0:03 - 0:11 | Feature 1: Instant calendar sync with auto-time-zone detection.",
        "0:11 - 0:20 | Feature 2: Automated SMS reminders that cut no-shows by 70%.",
        "0:20 - 0:26 | Feature 3: Integrated deposit payments upon booking.",
        "0:26 - 0:31 | CTA: Set up your booking page in 5 minutes.",
      ],
      visualHighlights: [
        "Instant booking flow in vertical phone frame",
        "Automated WhatsApp/SMS reminder preview",
        "One-click appointment confirmation",
      ],
      thumbnailUrl: "/src/assets/images/ugc_demo_saas_1790932765701.jpg",
      mockVideoColor: "from-[#087E8B]/30 to-[#0B2437]",
      videoPlaceholderUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "sample-4",
      title: "From Spreadsheet Chaos to One Dashboard",
      label: "Business Software Transformation",
      category: "SaaS & CRM",
      isSpecSample: true,
      duration: "0:36",
      hook: "This is what running your inventory feels like when you ditch 10 spreadsheets.",
      description:
        "A before-and-after content angle showing how one connected system simplifies everyday operations.",
      problemSolved: "Centralizes stock levels, purchase orders, and sales trends into one real-time dashboard.",
      scriptOutline: [
        "0:00 - 0:05 | Hook: Red cell warnings and broken formulas on an overwhelming spreadsheet.",
        "0:05 - 0:15 | The shift: Logging into the centralized inventory manager on iPad and phone.",
        "0:15 - 0:28 | Key proof: Live barcode scanning and auto-reorder notification demo.",
        "0:28 - 0:36 | Call to Action: Book a personalized demo link in the comments.",
      ],
      visualHighlights: [
        "Dramatic split-screen: messy sheets vs sleek dark-mode dashboard",
        "Live stock alert push notification",
        "Executive analytics summary chart",
      ],
      thumbnailUrl: "/src/assets/images/tech_creator_desk_1790932808175.jpg",
      mockVideoColor: "from-[#0B2437] to-[#1E88E5]/40",
      videoPlaceholderUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "sample-5",
      title: "Build an App Without Coding",
      label: "Tutorial UGC",
      category: "AI & Automation",
      isSpecSample: true,
      duration: "0:42",
      hook: "You don't need to hire a developer to build an internal company portal.",
      description:
        "A beginner-friendly walkthrough that makes a no-code app-building product feel accessible.",
      problemSolved: "Shows non-technical founders how to publish functional custom web tools in an afternoon.",
      scriptOutline: [
        "0:00 - 0:05 | Hook: 'I built this client onboarding portal in literally 30 minutes.'",
        "0:05 - 0:18 | Drag-and-drop builder demo: Connecting Google Sheets database to sleek UI components.",
        "0:18 - 0:32 | Testing the live app: Form submission on iPhone displaying instantly in database.",
        "0:32 - 0:42 | Call to Action: Duplicate the starter template for free.",
      ],
      visualHighlights: [
        "Drag-and-drop visual component builder",
        "Instant live preview on mobile mockup",
        "Clear step-by-step voice guidance",
      ],
      thumbnailUrl: "/src/assets/images/tech_creator_desk_1790932808175.jpg",
      mockVideoColor: "from-[#087E8B]/40 to-[#0B2437]",
      videoPlaceholderUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ] as VideoSample[],

  portfolioDisclaimer:
    "Concept samples are created to demonstrate creative style, product storytelling, and video-production capabilities. Brand names, product claims, campaign results, and client partnerships are shown only with permission.",

  contentAngles: [
    {
      id: "pain-point",
      name: "Pain Point",
      hook: "“Still doing this manually every day?”",
      objective: "Disrupt autopilot habits and highlight the friction cost of legacy workflows.",
      targetPsychology: "Frustration with wasted time or human error in daily tasks.",
      sampleScriptHook: "If your team spends more than an hour copying data between tools every morning, watch this.",
    },
    {
      id: "curiosity",
      name: "Curiosity",
      hook: "“I didn’t expect this AI tool to be this useful.”",
      objective: "Overcome skepticism by presenting an honest, surprising discovery of real functionality.",
      targetPsychology: "Desire for high-leverage shortcuts without marketing hype.",
      sampleScriptHook: "Most AI tools are just gimmicks, but this workflow automation actually changed my week.",
    },
    {
      id: "before-after",
      name: "Before and After",
      hook: "“This is how I used to manage client tasks—then I changed one thing.”",
      objective: "Contrast the chaotic old method with the streamlined new reality.",
      targetPsychology: "Relief and aspiration for an organized, stress-free setup.",
      sampleScriptHook: "Left: 4 different apps and 2 missed deadlines. Right: One unified dashboard.",
    },
    {
      id: "tutorial",
      name: "Tutorial",
      hook: "“Here’s how to do this in under one minute.”",
      objective: "Demonstrate ease-of-use and eliminate perceived setup complexity.",
      targetPsychology: "Action-oriented users wanting quick implementation.",
      sampleScriptHook: "Step 1: Connect your workspace. Step 2: Pick your trigger. You're done.",
    },
    {
      id: "feature-highlight",
      name: "Feature Highlight",
      hook: "“The one feature small businesses should not ignore.”",
      objective: "Spotlight a high-impact, high-converting feature with singular focus.",
      targetPsychology: "Business owners seeking high return on minimal effort.",
      sampleScriptHook: "Everyone talks about the fancy charts, but this auto-invoice toggle is what actually saves revenue.",
    },
    {
      id: "social-proof",
      name: "Social Proof",
      hook: "“Here’s why creators and small teams are switching to this tool.”",
      objective: "Validate the buying decision by showcasing momentum and adoption.",
      targetPsychology: "Fear of missing out on superior industry standards.",
      sampleScriptHook: "Over 500 solo founders made the switch this month for one simple reason.",
    },
    {
      id: "founder-story",
      name: "Founder-Style Story",
      hook: "“This tool was built to solve one frustrating business problem.”",
      objective: "Humanize the product and create an authentic connection around the core problem.",
      targetPsychology: "Empathy with real builders solving real operational headaches.",
      sampleScriptHook: "The founder was tired of losing track of inventory every weekend—so they built this.",
    },
    {
      id: "direct-response",
      name: "Direct Response",
      hook: "“If you need a simpler way to manage [task], try this.”",
      objective: "Drive immediate clicks and conversions with unambiguous product utility.",
      targetPsychology: "High-intent prospects with an urgent problem needing an immediate fix.",
      sampleScriptHook: "If you need an easier way to schedule client bookings without back-and-forth emails, check this out.",
    },
  ] as ContentAngle[],

  contentAngleFootnote:
    "Each concept is adapted to the brand’s audience, messaging guidelines, campaign goal, and approved product claims.",

  packages: [
    {
      id: "single-video",
      title: "Single Video",
      priceUSD: 50,
      pricePHP: 2900,
      duration: "15–30 sec",
      features: [
        "One 15–30 second vertical UGC video",
        "Basic script or approved concept",
        "Captions and basic editing",
        "One revision round",
        "1080x1920 (9:16) format delivery",
      ],
      bestFor: "Testing a single creative hook or product announcement",
      ctaText: "Request This Package",
    },
    {
      id: "starter-pack",
      title: "Starter Pack",
      isPopular: true,
      priceUSD: 135,
      pricePHP: 7800,
      duration: "3x 15–30 sec",
      features: [
        "Three 15–30 second UGC videos",
        "Different hooks or creative concepts",
        "Captions and polished editing",
        "One revision round per video",
        "Optimized for organic social feeds",
      ],
      bestFor: "Brands wanting multiple angles to find winning creative",
      ctaText: "Start a Project",
    },
    {
      id: "content-test-pack",
      title: "Content Test Pack",
      priceUSD: 220,
      pricePHP: 12700,
      duration: "5x Videos/Variations",
      features: [
        "Five UGC videos or creative variations",
        "Multiple hooks and content angles",
        "Designed for organic posting or testing",
        "Captions and polished editing",
        "Priority scheduling",
      ],
      bestFor: "Paid social split testing & rapid ad testing campaigns",
      ctaText: "Request a Quote",
    },
    {
      id: "saas-demo",
      title: "SaaS Demo Video",
      priceUSD: 85,
      pricePHP: 4900,
      duration: "30–60 sec",
      features: [
        "One 30–60 second screen-recorded product walkthrough",
        "Voiceover or text-led narration",
        "Captions and feature callouts",
        "One revision round",
        "In-depth software or workflow demo",
      ],
      bestFor: "Software, CRM, dashboard & onboarding workflows",
      ctaText: "Book a Demo Video",
    },
  ] as PricingPackage[],

  addOns: [
    "Raw Footage",
    "Extra Hook Variations",
    "Additional Revisions",
    "Custom Scripting",
    "Rush Delivery",
    "Paid-Ad Usage Rights",
    "Extended Licensing",
    "Extra Platform Formats",
  ],

  pricingDisclaimer:
    "Usage rights, paid advertising permissions, raw footage, and extended licensing are quoted separately where applicable. Please include your intended usage when submitting an inquiry.",

  processSteps: [
    {
      number: "01",
      title: "Share Your Brief",
      text: "Send your product link, target audience, campaign goal, core features, required messaging, visual references, and desired deadline.",
    },
    {
      number: "02",
      title: "Approve the Concept",
      text: "I develop a content angle, hook, video flow, and call to action for review before production begins.",
    },
    {
      number: "03",
      title: "Production",
      text: "I film, screen-record, edit, caption, and prepare the content in the required format.",
    },
    {
      number: "04",
      title: "Review",
      text: "You receive a preview for feedback and the included revision round.",
    },
    {
      number: "05",
      title: "Final Delivery",
      text: "Receive polished, platform-ready video files for your organic social channels or approved campaign usage.",
    },
  ],

  turnaround: {
    title: "TYPICAL TURNAROUND",
    timeframe: "5–7 business days",
    note: "after receiving a complete brief and required product access. Rush delivery is available by request.",
  },

  faqs: [
    {
      question: "Do I need to send a physical product?",
      answer:
        "Not always. For software, apps, AI tools, websites, and digital products, I can create content using product access, screen recordings, approved assets, and a clear brief. Physical products may need to be shipped when hands-on filming is required.",
    },
    {
      question: "Do you work with brands outside the Philippines?",
      answer:
        "Yes. Jay DevWorks UGC Studio is based in the Philippines and works remotely with brands, startups, agencies, and digital-product teams worldwide.",
    },
    {
      question: "Can you create content for paid ads?",
      answer:
        "Yes. Paid-ad usage can be arranged as an add-on. Please state the intended platforms, duration, territories, and usage type when submitting your project inquiry.",
    },
    {
      question: "Do you post the content on your own social accounts?",
      answer:
        "This portfolio primarily offers content creation for the brand’s own social channels and campaigns. Posting to creator-owned channels can be discussed separately where relevant.",
    },
    {
      question: "Can you write the script?",
      answer:
        "Yes. I can work from an approved brand script or develop a concise video concept and script based on your product, audience, and campaign objective.",
    },
    {
      question: "Can you create multiple variations for testing?",
      answer:
        "Yes. Hook variations, alternate calls to action, different product angles, and multi-video testing packages are available.",
    },
    {
      question: "What do you need before starting?",
      answer:
        "A product link or product access, target customer, campaign goal, key benefits, approved claims, brand references, deadline, and usage requirements.",
    },
  ] as FAQItem[],
};
