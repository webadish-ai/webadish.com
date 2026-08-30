export const SITE_URL = "https://www.webadish.com";
export const SITE_NAME = "WebAdish";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph.jpg`;
export const DEFAULT_DESCRIPTION =
  "WebAdish helps growth-focused businesses protect and recover WordPress websites with protection plans, security retainers, audits, and emergency incident response.";
export const PRERENDER_ROUTES = [
  "/",
  "/maintenance",
  "/security",
  "/hacked-site-recovery",
  "/retainer",
  "/pricing",
  "/india",
  "/india/dpdp-compliance-wordpress",
  "/india/dpdp-lp",
  "/india/hacked-site-recovery-lp",
  "/lp/wordpress-maintenance-india",
  "/lp/google-workspace-india",
  "/maintenance-retainer-lp",
  "/india/cert-in-incident-readiness",
  "/security-score",
  "/resources/wordpress-hack-recovery-checklist",
  "/agency-partners",
  "/about",
  "/blog",
  "/blog/wordpress-malware-keeps-coming-back",
  "/blog/hidden-wordpress-backdoors-database-triggers",
  "/blog/wordpress-hacked-india-what-to-do",
  "/blog/dpdp-act-wordpress-website-guide",
  "/blog/wordpress-malware-removal",
  "/blog/wordpress-security-hardening-checklist",
  "/blog/wordpress-firewall-explained",
  "/blog/wordpress-security-monitoring",
  "/blog/state-of-wordpress-security-2025-business-takeaways",
  "/blog/dpdp-checklist-wordpress-india",
  "/10-website-hacking-methods-that-put-your-site-at-risk-in-2025",
  "/blog/woocommerce-attack-target-2026",
  "/blog/wordpress-plugin-audit",
  "/blog/hosting-vs-managed-security",
  "/blog/wordpress-security-audit-frequency",
  "/blog/wordpress-downtime-cost",
  "/blog/hire-wordpress-security-team",
  "/blog/wordpress-security-agency-vs-freelancer",
  "/blog/hacked-wordpress-site-recovery-cost",
  "/blog/wordpress-security-retainer-includes",
  "/blog/woocommerce-hacked-what-to-do",
  "/blog/wordpress-google-blacklist-removal",
  "/blog/woocommerce-maintenance-checklist",
  "/blog/protect-your-digital-assets",
  "/blog/how-hackers-break-into-websites",
  "/blog/wordpress-maintenance-guide",
  "/blog/wordpress-security-mistakes",
  "/blog/site-hacked-what-to-do",
  "/blog/why-plugin-updates-matter",
  "/case-studies",
  "/case-studies/verofax",
  "/case-studies/shivamautozone",
  "/case-studies/crystalgroup",
  "/case-studies/agency-portfolio-recovery",
  "/contact",
  "/web-design",
  "/privacy-policy",
  "/terms",
  "/refund-policy",
];

type SeoData = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  keywords?: string[];
  noindex?: boolean;
  ogImage?: string;
  ogImageAlt?: string;
  breadcrumbs?: Array<{ name: string; path: string }>;
  schema?: Array<Record<string, unknown>>;
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "WebAdish LLP",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.webp`,
  email: "hello@webadish.com",
  telephone: "+91 9998757045",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vadodara",
    addressRegion: "Gujarat",
    postalCode: "390001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.313541,
    longitude: 73.1635065,
  },
  hasMap:
    "https://www.google.com/maps/place/WebAdish+LLP/@22.313541,73.1635065,17z/data=!3m1!4b1!4m6!3m5!1s0x395fc916a5705195:0xf66db78eb0df563!8m2!3d22.313541!4d73.1635065!16s%2Fg%2F11xnvmfj70",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "10",
    bestRating: "5",
    worstRating: "1",
  },
  knowsAbout: [
    "WordPress Security",
    "Hacked Website Recovery",
    "Malware Removal",
    "WordPress Maintenance Contracts & SLA Retainers",
    "AI Workflow Automation for SMBs",
    "Custom ERP Development",
  ],
  sameAs: [
    "https://www.linkedin.com/company/webadish",
    "https://www.facebook.com/webadish",
    "https://www.instagram.com/webadish",
    "https://x.com/webadish",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@webadish.com",
      telephone: "+91 9998757045",
      areaServed: "Worldwide",
      availableLanguage: ["English"],
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en",
};

const serviceSchema = (
  name: string,
  description: string,
  path: string,
  serviceType: string,
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType,
  name,
  description,
  url: `${SITE_URL}${path}`,
  provider: {
    "@type": "Organization",
    name: "WebAdish LLP",
    url: SITE_URL,
  },
  areaServed: "Worldwide",
});

const faqSchema = (items: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

const itemListSchema = (
  name: string,
  items: Array<{ name: string; path: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${SITE_URL}${item.path}`,
    name: item.name,
  })),
});

const maintenanceFaqs = [
  {
    question: "How do you handle plugin updates safely?",
    answer:
      "WebAdish tests WordPress core, theme, and plugin updates in staging before applying them to the live website to avoid unexpected breakage.",
  },
  {
    question: "What if my site breaks after an update?",
    answer:
      "A fresh backup is taken before changes and the team can roll back quickly if an update creates an issue.",
  },
  {
    question: "Do I need to give you admin access?",
    answer:
      "Yes. WebAdish typically needs WordPress admin access and, when relevant, hosting access to perform maintenance safely.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Protection plans are month-to-month with no long lock-in contract, subject to the notice terms on the website.",
  },
];

const pricingFaqs = [
  {
    question: "Are there setup fees?",
    answer: "No. The plans shown on the website do not include hidden setup fees.",
  },
  {
    question: "Can I upgrade or downgrade?",
    answer:
      "Yes. Clients can move between plans as needs change, with upgrades taking effect quickly and downgrades handled on the next billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "WebAdish accepts common online payment methods including cards, bank transfers, and PayPal.",
  },
  {
    question: "Do you offer custom plans?",
    answer:
      "Yes. Custom plans are available for agencies, WooCommerce stores, and high-traffic or enterprise WordPress environments.",
  },
];

const breadcrumbs = (name: string, path: string) => [
  { name: "Home", path: "/" },
  { name, path },
];

const pageSeo: Record<string, SeoData> = {
  "/": {
    title: "WordPress Security Agency & Maintenance Services | WebAdish",
    description:
      "WebAdish provides WordPress security, protection plans, hacked site recovery, and support retainers for businesses that cannot afford downtime, breaches, or slow support.",
    path: "/",
    type: "website",
    keywords: [
      "wordpress security agency",
      "wordpress protection plans",
      "hacked wordpress site recovery",
      "wordpress support retainer",
    ],
    schema: [
      organizationSchema,
      websiteSchema,
      serviceSchema(
        "WordPress Security and Protection Services",
        "Managed WordPress security, protection plans, hacked site recovery, and proactive support for business websites.",
        "/",
        "WordPress security and protection",
      ),
    ],
  },
  "/maintenance": {
    title: "WordPress Maintenance Services & Support Plans | WebAdish",
    description:
      "Proactive, security-led WordPress maintenance plans for growing business sites. safe updates, daily backups, 24/7 uptime monitoring & expert developer support.",
    path: "/maintenance",
    keywords: [
      "wordpress maintenance services",
      "wordpress maintenance service",
      "wordpress protection plan",
      "wordpress maintenance agency",
      "wordpress support plan",
    ],
    breadcrumbs: breadcrumbs("Protection Plans", "/maintenance"),
    schema: [
      serviceSchema(
        "WordPress Protection Plans",
        "Ongoing WordPress protection with safe updates, backups, uptime monitoring, and support.",
        "/maintenance",
        "WordPress protection plan",
      ),
      faqSchema(maintenanceFaqs),
    ],
  },
  "/security": {
    title: "WordPress Security Services & Website Hardening | WebAdish",
    description:
      "Protect your website with firewall management, daily malware scans, patch automation, security audits, and 24/7 expert threat monitoring.",
    path: "/security",
    keywords: [
      "wordpress security service",
      "wordpress malware protection",
      "wordpress hardening service",
    ],
    breadcrumbs: breadcrumbs("Security", "/security"),
    schema: [
      serviceSchema(
        "WordPress Security Services",
        "Firewall, hardening, malware scanning, and proactive WordPress protection for business websites.",
        "/security",
        "WordPress security",
      ),
    ],
  },
  "/hacked-site-recovery": {
    title: "Hacked WordPress Website Repair & Emergency Recovery",
    description:
      "Hacked WordPress site? WebAdish removes malware, eradicates backdoors, and clears Google blacklist warnings within 24 hours. 30-day reinfection guarantee.",
    path: "/hacked-site-recovery",
    keywords: [
      "my wordpress site was hacked",
      "my wordpress has been hacked",
      "hacked wordpress site recovery",
      "wordpress malware removal service",
      "wordpress blacklist removal",
    ],
    breadcrumbs: breadcrumbs("Hacked Site Recovery", "/hacked-site-recovery"),
    schema: [
      serviceSchema(
        "Hacked WordPress Site Recovery",
        "Emergency malware cleanup, blacklist removal, and incident response for compromised WordPress websites.",
        "/hacked-site-recovery",
        "WordPress hacked site recovery",
      ),
      faqSchema([
        {
          question: "What should I do if my WordPress site has been hacked?",
          answer:
            "Take the site offline or enable maintenance mode immediately to prevent further damage. Do not delete files — preserve evidence. Contact a professional recovery service like WebAdish to perform forensic cleanup, remove backdoors, and close the entry point. Avoid using free scanner plugins as your only remediation step; they miss obfuscated infections and database-injected malware.",
        },
        {
          question: "How long does WordPress hack recovery take?",
          answer:
            "WebAdish targets 24-hour recovery for most compromised WordPress sites. Complex infections with unknown entry points, database injections, or multi-site architectures may take 24–48 hours. You will receive updates throughout the process.",
        },
        {
          question: "Will my WordPress site be hacked again after recovery?",
          answer:
            "Not if the entry point is properly closed and post-recovery hardening is applied. WebAdish includes 30 days of re-infection cover. If the same infection returns within 30 days of cleanup, it is remediated at no additional charge. Ongoing protection plans prevent future incidents.",
        },
        {
          question: "How much does it cost to recover a hacked WordPress site?",
          answer:
            "Recovery cost depends on infection severity, whether blacklist removal is needed, and urgency. WebAdish provides transparent pricing after an initial assessment. Most standard recoveries are priced as a one-time flat engagement.",
        },
        {
          question: "Can you recover a WordPress site that has been blacklisted by Google?",
          answer:
            "Yes. WebAdish handles Google Safe Browsing blacklist removal as part of the standard recovery process. This includes malware removal, blacklist review submission to Google, and monitoring until the flag is lifted.",
        },
      ]),
    ],
  },
  "/retainer": {
    title: "WordPress Business Continuity Retainer",
    description:
      "Retained WordPress security for agencies, WooCommerce stores, and high-value businesses needing a dedicated expert, response SLAs, ongoing audits, and white-label support.",
    path: "/retainer",
    keywords: [
      "wordpress security retainer",
      "wordpress security consultant",
      "wordpress support SLA",
    ],
    breadcrumbs: breadcrumbs("Retainer", "/retainer"),
    schema: [
      serviceSchema(
        "WordPress Business Continuity Retainer",
        "Dedicated ongoing WordPress security support with audits, SLAs, and incident response.",
        "/retainer",
        "WordPress security retainer",
      ),
    ],
  },
  "/india": {
    title: "WordPress Protection Plans for India",
    description:
      "Dedicated INR pricing for Indian businesses needing WordPress maintenance, security hardening, audits, and hacked site recovery without mixing local pricing into global plans.",
    path: "/india",
    keywords: [
      "wordpress maintenance india",
      "wordpress security india",
      "wordpress hacked site recovery india",
    ],
    breadcrumbs: breadcrumbs("India Pricing", "/india"),
    schema: [
      serviceSchema(
        "WordPress Protection Plans India",
        "INR-priced WordPress security and protection services for Indian businesses.",
        "/india",
        "WordPress security India",
      ),
    ],
  },
  "/india/dpdp-compliance-wordpress": {
    title: "DPDP Act Website Implementation Support India",
    description:
      "India-focused DPDP Act implementation support for WordPress websites, lead forms, plugin stacks, consent flows, data handling, and technical readiness for SMEs.",
    path: "/india/dpdp-compliance-wordpress",
    keywords: [
      "dpdp act compliance india",
      "dpdp implementation partner",
      "wordpress dpdp compliance",
      "dpdp website implementation india",
      "dpdp act implementation support",
    ],
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "India", path: "/india" },
      { name: "DPDP Implementation", path: "/india/dpdp-compliance-wordpress" },
    ],
    schema: [
      serviceSchema(
        "DPDP Act Website Implementation Support India",
        "Technical implementation support for WordPress websites, consent flows, forms, access controls, and data-handling workflows related to DPDP readiness in India.",
        "/india/dpdp-compliance-wordpress",
        "DPDP implementation support",
      ),
      faqSchema([
        {
          question: "Can WebAdish help implement DPDP-related website changes?",
          answer:
            "Yes. WebAdish helps with the technical implementation side, including forms, consent journeys, plugin behavior, access controls, storage patterns, and security readiness on WordPress websites.",
        },
        {
          question: "Does WebAdish provide legal certification of DPDP compliance?",
          answer:
            "No. WebAdish is not a law firm. The service supports technical implementation and readiness so internal teams and legal advisors can move faster.",
        },
        {
          question: "Who is this service suitable for?",
          answer:
            "It is suitable for Indian SMEs, lead-generation websites, education brands, dealerships, and WordPress businesses that need practical implementation help across websites, forms, plugins, and workflows.",
        },
      ]),
    ],
  },
  "/india/dpdp-lp": {
    title: "DPDP Act WordPress Compliance — Free Site Assessment",
    description:
      "Is your WordPress site ready for DPDP compliance? WebAdish finds and fixes consent, form, and data gaps — alongside your legal advisor. Get a free site assessment.",
    path: "/india/dpdp-lp",
    noindex: true,
  },
  "/india/hacked-site-recovery-lp": {
    title: "Website Hacked? Emergency Recovery for Indian Businesses — WebAdish",
    description:
      "Malware removed, blacklists cleared, site restored — within 24 hours. Flat INR pricing, 30-day guarantee. Emergency response for hacked websites across India.",
    path: "/india/hacked-site-recovery-lp",
    noindex: true,
  },
  "/lp/wordpress-maintenance-india": {
    title: "WordPress Maintenance Plans India — INR Pricing",
    description:
      "INR-priced WordPress maintenance plans for Indian business websites. Safe updates, backups, uptime monitoring, malware checks, and WhatsApp-first response.",
    path: "/lp/wordpress-maintenance-india",
    noindex: true,
  },
  "/lp/google-workspace-india": {
    title: "Google Workspace Setup India — Authorised Partner",
    description:
      "Google Workspace Authorised Partner offering business email setup, email migration (Gmail / cPanel / Outlook), and full Workspace configuration for Indian businesses. INR pricing, GST invoice, same-day setup.",
    path: "/lp/google-workspace-india",
    keywords: [
      "google workspace setup india",
      "google workspace migration india",
      "business email setup india",
      "google workspace authorised partner india",
      "gsuite setup india",
      "professional email setup india",
      "migrate email to google workspace india",
    ],
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "India", path: "/india" },
      { name: "Google Workspace Setup", path: "/lp/google-workspace-india" },
    ],
    schema: [
      serviceSchema(
        "Google Workspace Setup & Migration India",
        "Google Workspace Authorised Partner providing business email setup, full email migration from Gmail, cPanel, Outlook or Zoho, and Google Drive / Meet / Calendar configuration for Indian businesses.",
        "/lp/google-workspace-india",
        "IT Setup Service",
      ),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Google Workspace Setup India",
        "serviceType": "Google Workspace Partner Service",
        "provider": {
          "@type": "Organization",
          "name": "WebAdish LLP",
          "url": "https://www.webadish.com",
          "sameAs": ["https://www.webadish.com"],
        },
        "areaServed": { "@type": "Country", "name": "India" },
        "offers": [
          {
            "@type": "Offer",
            "name": "Starter Setup (1–5 users)",
            "price": "4999",
            "priceCurrency": "INR",
            "description": "New Google Workspace setup or migration from Gmail / cPanel for up to 5 users.",
          },
          {
            "@type": "Offer",
            "name": "Business Setup (6–25 users)",
            "price": "9999",
            "priceCurrency": "INR",
            "description": "Full migration and admin console handover for 6–25 users.",
          },
        ],
      },
      faqSchema([
        {
          question: "Do I keep my existing emails when migrating to Google Workspace?",
          answer: "Yes. WebAdish migrates all existing emails, contacts, and calendar events to Google Workspace before switching over — nothing is lost.",
        },
        {
          question: "How much does Google Workspace cost per month in India?",
          answer: "Google charges approximately ₹125–₹672 per user per month depending on the plan (Business Starter to Business Plus). This subscription is paid directly to Google. WebAdish charges a one-time setup fee.",
        },
        {
          question: "How long does Google Workspace setup take?",
          answer: "New setups are completed the same day. Migrations with existing email history typically take 1–2 business days.",
        },
        {
          question: "Is WebAdish an authorised Google Workspace partner?",
          answer: "Yes. WebAdish LLP is an authorised Google Workspace reseller and setup partner serving Indian businesses.",
        },
        {
          question: "What payment methods are accepted?",
          answer: "UPI, bank transfer, and cards are all accepted. A GST invoice is provided for every setup.",
        },
      ]),
    ],
  },
  "/maintenance-retainer-lp": {
    title: "WordPress Maintenance & Retainer Review — WebAdish",
    description:
      "Schedule a global WordPress maintenance and security retainer review. WebAdish helps business websites with safe updates, backups, monitoring, incident response, and higher-touch retained support.",
    path: "/maintenance-retainer-lp",
    noindex: true,
  },
  "/india/cert-in-incident-readiness": {
    title: "CERT-In Incident Readiness for Indian SMEs",
    description:
      "Technical incident-readiness support for Indian SMEs using WordPress websites, forms, plugin stacks, and business websites that need better breach-response preparation.",
    path: "/india/cert-in-incident-readiness",
    keywords: [
      "cert-in incident readiness",
      "cert-in compliance website india",
      "incident readiness wordpress india",
      "cert-in reporting readiness sme",
    ],
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "India", path: "/india" },
      { name: "CERT-In Readiness", path: "/india/cert-in-incident-readiness" },
    ],
    schema: [
      serviceSchema(
        "CERT-In Incident Readiness India",
        "Technical incident-readiness support for Indian SMEs using WordPress websites, plugin stacks, forms, logging, and access controls.",
        "/india/cert-in-incident-readiness",
        "Incident readiness support",
      ),
    ],
  },
  "/security-score": {
    title: "Free WordPress Security Score",
    description:
      "Run a free WordPress security score for your website and get a practical snapshot of plugin risk, backup confidence, audit cadence, and commercial exposure.",
    path: "/security-score",
    keywords: [
      "wordpress security score",
      "wordpress website security check",
      "wordpress risk assessment",
      "wordpress security audit free",
    ],
    breadcrumbs: breadcrumbs("Free Security Score", "/security-score"),
    schema: [
      serviceSchema(
        "Free WordPress Security Score",
        "A practical WordPress security score and self-assessment page for business websites that need a clearer view of operational risk.",
        "/security-score",
        "WordPress security assessment",
      ),
    ],
  },
  "/resources/wordpress-hack-recovery-checklist": {
    title: "Free WordPress Hack Recovery Checklist",
    description:
      "A free, practical WordPress hack recovery checklist covering triage, finding the real entry point, cleanup verification, and hardening — drawn from a real 263-site recovery engagement.",
    path: "/resources/wordpress-hack-recovery-checklist",
    keywords: [
      "wordpress hack recovery checklist",
      "wordpress malware removal checklist",
      "how to recover hacked wordpress site",
      "wordpress backdoor removal steps",
    ],
    breadcrumbs: breadcrumbs("Recovery Checklist", "/resources/wordpress-hack-recovery-checklist"),
    schema: [
      serviceSchema(
        "WordPress Hack Recovery Checklist",
        "A free triage-to-hardening checklist for recovering a hacked WordPress site, based on a real multi-site recovery engagement.",
        "/resources/wordpress-hack-recovery-checklist",
        "WordPress hack recovery guide",
      ),
    ],
  },
  "/agency-partners": {
    title: "Agency White-Label WordPress Security",
    description:
      "White-label WordPress security, monitoring, and incident response for agencies managing multiple client websites worldwide.",
    path: "/agency-partners",
    keywords: [
      "white label wordpress security",
      "agency wordpress security partner",
      "wordpress retainer for agencies",
    ],
    breadcrumbs: breadcrumbs("Agency Partners", "/agency-partners"),
    schema: [
      serviceSchema(
        "Agency White-Label WordPress Security",
        "White-label monitoring, audits, and incident response for agencies managing WordPress portfolios.",
        "/agency-partners",
        "Agency WordPress security partner",
      ),
    ],
  },
  "/pricing": {
    title: "WordPress Maintenance & Security Pricing",
    description:
      "Compare WebAdish plans for WordPress maintenance, security, emergency recovery, and premium retainers for growing businesses and enterprise teams.",
    path: "/pricing",
    keywords: [
      "wordpress maintenance pricing",
      "wordpress security pricing",
      "wordpress support plans",
    ],
    breadcrumbs: breadcrumbs("Pricing", "/pricing"),
    schema: [faqSchema(pricingFaqs)],
  },
  "/blog": {
    title: "WordPress Security Blog for Business-Critical Websites",
    description:
      "Buyer-intent guides on WordPress security, protection plans, audits, and hacked site recovery for serious businesses, agencies, and digital teams.",
    path: "/blog",
    keywords: [
      "wordpress security blog",
      "wordpress security guides",
      "wordpress recovery guides",
    ],
    breadcrumbs: breadcrumbs("Blog", "/blog"),
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "WebAdish Blog",
        url: `${SITE_URL}/blog`,
        description:
          "WordPress security buying guides, recovery advice, and operational insights for business-critical websites.",
      },
      itemListSchema("Featured Blog Posts", [
        { name: "What the State of WordPress Security in 2025 Means for Business Websites in 2026", path: "/blog/state-of-wordpress-security-2025-business-takeaways" },
        { name: "Why WooCommerce Stores Are the #1 Target for WordPress Attacks in 2026", path: "/blog/woocommerce-attack-target-2026" },
        { name: "The WordPress Plugin Audit: How to Find and Close Vulnerabilities Before Attackers Do", path: "/blog/wordpress-plugin-audit" },
        { name: "When Your Hosting Provider Isn't Enough: What Managed WordPress Security Actually Covers", path: "/blog/hosting-vs-managed-security" },
        { name: "How Often Should a WordPress Site Be Security Audited?", path: "/blog/wordpress-security-audit-frequency" },
        { name: "WordPress Downtime: What It Really Costs", path: "/blog/wordpress-downtime-cost" },
        { name: "Before You Hire a WordPress Security Team", path: "/blog/hire-wordpress-security-team" },
      ]),
    ],
  },
  "/case-studies": {
    title: "WordPress Security Case Studies | Verofax, Shivam Autozone, Crystal Group",
    description:
      "See how WebAdish supported Verofax, Shivam Autozone, Crystal Group, and a 263-site agency portfolio with WordPress incident response, security hardening, performance improvement, and ongoing support.",
    path: "/case-studies",
    keywords: [
      "wordpress case studies",
      "wordpress security case study",
      "verofax wordpress case study",
      "shivamautozone wordpress case study",
    ],
    breadcrumbs: breadcrumbs("Case Studies", "/case-studies"),
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "WebAdish Case Studies",
        url: `${SITE_URL}/case-studies`,
        description:
          "Case studies covering WordPress incident response, security hardening, performance improvement, and ongoing protection.",
      },
      itemListSchema("Client Case Studies", [
        { name: "Verofax", path: "/case-studies/verofax" },
        { name: "Shivam Autozone", path: "/case-studies/shivamautozone" },
        { name: "Crystal Group", path: "/case-studies/crystalgroup" },
        { name: "Agency Portfolio Recovery", path: "/case-studies/agency-portfolio-recovery" },
      ]),
    ],
  },
  "/case-studies/agency-portfolio-recovery": {
    title: "263 WordPress Sites Recovered | Agency Portfolio Case Study",
    description:
      "How WebAdish recovered 263 WordPress sites for a real estate marketing agency — including two previously-undocumented database-trigger backdoors that file-based malware scanners can't detect.",
    path: "/case-studies/agency-portfolio-recovery",
    keywords: [
      "multiple wordpress sites hacked",
      "wordpress agency portfolio recovery",
      "wordpress database backdoor",
      "wordpress reinfection after cleanup",
    ],
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Case Studies", path: "/case-studies" },
      { name: "Agency Portfolio Recovery", path: "/case-studies/agency-portfolio-recovery" },
    ],
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline:
          "Recovering 168 WordPress Sites From a Multi-Layer Malware Campaign — Including a Database Backdoor Automated Scanners Can't See",
        description:
          "A real estate marketing agency's 263-site WordPress portfolio was reinfected after a first cleanup attempt. WebAdish found layered malware, a vulnerable reinfection vector, and two previously-undocumented database-trigger backdoors.",
        author: { "@type": "Organization", name: "WebAdish" },
        publisher: { "@type": "Organization", name: "WebAdish", url: SITE_URL },
      },
    ],
  },
  "/case-studies/verofax": {
    title: "Verofax Case Study | WordPress Recovery and Reinfection Prevention",
    description:
      "How WebAdish recovered verofax.com after a malware and admin-compromise incident, removed hidden access, and stabilised the site with ongoing protection.",
    path: "/case-studies/verofax",
    keywords: [
      "verofax case study",
      "wordpress recovery case study",
      "wordpress malware recovery example",
    ],
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Case Studies", path: "/case-studies" },
      { name: "Verofax", path: "/case-studies/verofax" },
    ],
  },
  "/case-studies/shivamautozone": {
    title: "Shivam Autozone Case Study | Website Rebuild and Security Hardening",
    description:
      "How WebAdish improved shivamautozone.com with a WordPress rebuild, stronger security, better performance, and ongoing support.",
    path: "/case-studies/shivamautozone",
    keywords: [
      "shivamautozone case study",
      "wordpress rebuild case study",
      "wordpress security hardening example",
    ],
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Case Studies", path: "/case-studies" },
      { name: "Shivam Autozone", path: "/case-studies/shivamautozone" },
    ],
  },
  "/case-studies/crystalgroup": {
    title: "Crystal Group Case Study | Trust, SEO Readiness, and WordPress Support",
    description:
      "How WebAdish supported crystalgroup.in with WordPress improvements focused on trust, clarity, SEO readiness, and ongoing reliability.",
    path: "/case-studies/crystalgroup",
    keywords: [
      "crystal group case study",
      "wordpress support case study",
      "business website improvement example",
    ],
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Case Studies", path: "/case-studies" },
      { name: "Crystal Group", path: "/case-studies/crystalgroup" },
    ],
  },
  "/about": {
    title: "About WebAdish — WordPress Security Agency Since 2004",
    description:
      "WebAdish is a specialist WordPress security and maintenance agency with 20+ years of experience. Learn who we are, how we work, and the businesses we protect.",
    path: "/about",
    keywords: [
      "about webadish",
      "wordpress security agency",
      "wordpress maintenance agency",
      "wordpress security company",
    ],
    breadcrumbs: breadcrumbs("About", "/about"),
    schema: [
      organizationSchema,
      serviceSchema(
        "WordPress Security and Maintenance Agency",
        "Specialist WordPress security, protection plans, hacked site recovery, and maintenance for business-critical websites.",
        "/about",
        "WordPress security agency",
      ),
    ],
  },
  "/contact": {
    title: "Contact WebAdish | WordPress Security & Protection Team",
    description:
      "Talk to WebAdish about WordPress protection plans, security audits, emergency hacked site recovery, or a high-touch retainer for your business website.",
    path: "/contact",
    keywords: [
      "contact wordpress security agency",
      "wordpress emergency support",
      "wordpress maintenance consultation",
    ],
    breadcrumbs: breadcrumbs("Contact", "/contact"),
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact WebAdish",
        url: `${SITE_URL}/contact`,
        telephone: "+91 9998757045",
        email: "hello@webadish.com",
      },
    ],
  },
  "/web-design": {
    title: "WordPress Web Design Services",
    description:
      "Conversion-focused WordPress web design with performance, SEO readiness, and ongoing support for brands that need a polished, secure website.",
    path: "/web-design",
    keywords: [
      "wordpress web design agency",
      "business wordpress website design",
      "seo-ready wordpress web design",
    ],
    breadcrumbs: breadcrumbs("Web Design", "/web-design"),
    schema: [
      serviceSchema(
        "WordPress Web Design Services",
        "Custom WordPress website design for businesses that want credibility, performance, and growth.",
        "/web-design",
        "WordPress web design",
      ),
    ],
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    description: "Read the WebAdish privacy policy.",
    path: "/privacy-policy",
    noindex: true,
    breadcrumbs: breadcrumbs("Privacy Policy", "/privacy-policy"),
  },
  "/terms": {
    title: "Terms of Service",
    description: "Read the WebAdish terms of service.",
    path: "/terms",
    noindex: true,
    breadcrumbs: breadcrumbs("Terms", "/terms"),
  },
  "/refund-policy": {
    title: "Refund Policy",
    description: "Read the WebAdish refund policy.",
    path: "/refund-policy",
    noindex: true,
    breadcrumbs: breadcrumbs("Refund Policy", "/refund-policy"),
  },
};

const articleSchema = (data: {
  title: string;
  description: string;
  path: string;
  published: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: data.title,
  description: data.description,
  datePublished: data.published,
  dateModified: data.published,
  mainEntityOfPage: `${SITE_URL}${data.path}`,
  image: [DEFAULT_OG_IMAGE],
  author: {
    "@type": "Organization",
    name: "WebAdish",
  },
  publisher: {
    "@type": "Organization",
    name: "WebAdish LLP",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.webp`,
    },
  },
});

const blogPosts: Record<string, SeoData> = {
  "/blog/wordpress-malware-keeps-coming-back": {
    title: "Why WordPress Malware Keeps Coming Back After Cleanup",
    description:
      "If your site was cleaned and got reinfected, the malware wasn't the real problem — the entry point was never closed. What actually causes reinfection, from a real 263-site recovery.",
    path: "/blog/wordpress-malware-keeps-coming-back",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "Why WordPress Malware Keeps Coming Back", path: "/blog/wordpress-malware-keeps-coming-back" },
    ],
    schema: [
      articleSchema({
        title: "Why WordPress Malware Keeps Coming Back After Cleanup",
        description:
          "Why reinfection happens after a WordPress cleanup — unclosed entry points, self-healing droppers, and database-level persistence — with a real case example.",
        path: "/blog/wordpress-malware-keeps-coming-back",
        published: "2026-08-23",
      }),
      faqSchema([
        {
          question: "My host says they already cleaned my site — why did it get hacked again?",
          answer:
            "Hosting-level cleanups typically remove obvious malicious files from the filesystem only. They rarely audit the database for hidden triggers or admin accounts, and they don't usually identify or close the original vulnerability, so the same entry point remains open.",
        },
        {
          question: "How long should I monitor a site after cleanup before trusting it's clean?",
          answer:
            "At least 30 days. Some persistence mechanisms, like comment-activated database triggers, sit dormant until a specific condition is met, so a few clean days is not proof of a complete recovery.",
        },
        {
          question: "Can a plugin-based scanner catch a database trigger?",
          answer:
            "No. WordPress security plugins scan files and, at best, known malicious database content patterns. They do not check for triggers, stored procedures, or scheduled events, since WordPress itself never creates these on its own.",
        },
      ]),
    ],
  },
  "/blog/hidden-wordpress-backdoors-database-triggers": {
    title: "How to Identify and Remove Hidden WordPress Backdoors",
    description:
      "Most WordPress backdoors are files. The ones that survive a cleanup are the ones nobody checks for — including a MySQL trigger that creates an admin account when someone posts a comment.",
    path: "/blog/hidden-wordpress-backdoors-database-triggers",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "Hidden WordPress Backdoors", path: "/blog/hidden-wordpress-backdoors-database-triggers" },
    ],
    schema: [
      articleSchema({
        title: "How to Identify and Remove Hidden WordPress Backdoors",
        description:
          "File-based and database-level WordPress backdoors explained, including a real database-trigger backdoor that let an anonymous comment create a full admin account.",
        path: "/blog/hidden-wordpress-backdoors-database-triggers",
        published: "2026-08-23",
      }),
      faqSchema([
        {
          question: "Can Wordfence, Sucuri, or MalCare detect database triggers?",
          answer:
            "No. These tools are built to scan files and known malicious code patterns, not database schema objects like triggers, stored procedures, or scheduled events. A clean scan result from these tools does not rule out database-level persistence.",
        },
        {
          question: "How would an attacker even plant a database trigger?",
          answer:
            "The same way they gain any other access — a compromised admin account, a vulnerable plugin with SQL execution capability, or direct database credentials obtained from a leaked config file. Once they have any way to run SQL, planting a trigger is straightforward.",
        },
        {
          question: "Is it safe to just drop every trigger I find?",
          answer:
            "Only after confirming it isn't something your own team or a legitimate plugin created, since some plugins use triggers for caching or logging. Investigate what a trigger does before removing it, but any trigger you can't account for should be treated as hostile.",
        },
      ]),
    ],
  },
  "/blog/wordpress-malware-removal": {
    title: "How to Remove Malware from WordPress (Without Missing the Backdoor)",
    description:
      "A step-by-step professional WordPress malware removal process — from isolating the site and finding every infection point to post-cleanup hardening and Google blacklist removal.",
    path: "/blog/wordpress-malware-removal",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "WordPress Malware Removal", path: "/blog/wordpress-malware-removal" },
    ],
    schema: [
      articleSchema({
        title: "How to Remove Malware from a WordPress Site (Without Missing the Backdoor)",
        description:
          "Professional WordPress malware removal: isolation, forensic documentation, systematic cleanup, entry point closure, and hardening so the site stays clean.",
        path: "/blog/wordpress-malware-removal",
        published: "2026-04-22",
      }),
      faqSchema([
        {
          question: "How long does WordPress malware removal take?",
          answer:
            "A straightforward single-site cleanup with a known entry point typically takes 4–8 hours of professional work. More complex infections spread across the database, filesystem, and with unknown entry points can take 1–3 days depending on site size and available logs.",
        },
        {
          question: "Can I use a plugin to remove WordPress malware?",
          answer:
            "Plugins like Wordfence, MalCare, and Sucuri can identify and remove many common malware variants. However, they miss obfuscated injections, database-based malware, and backdoors in non-standard file locations. Plugin-based cleanup should always be followed by a manual file integrity review.",
        },
        {
          question: "What if my hosting company cleaned the site — is that enough?",
          answer:
            "Hosting companies typically remove obvious malware from the filesystem. They rarely review the database, check for hidden admin users, close the entry point, or harden the site afterward. A hosting-level clean is a starting point, not a complete remediation.",
        },
        {
          question: "How do I know if malware has been completely removed?",
          answer:
            "Run multiple independent scanners, compare all core and plugin files against official checksums, audit the database for injected content and unknown admin users, review server access logs for post-cleanup suspicious activity, and check Google Safe Browsing and blacklist databases for your domain.",
        },
      ]),
    ],
  },
  "/blog/wordpress-security-hardening-checklist": {
    title: "WordPress Security Hardening Checklist: 15 Steps That Matter",
    description:
      "The 15 WordPress security hardening controls that security specialists apply to business-critical sites — ranked by the attack surface they close, with implementation details.",
    path: "/blog/wordpress-security-hardening-checklist",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "WordPress Security Hardening", path: "/blog/wordpress-security-hardening-checklist" },
    ],
    schema: [
      articleSchema({
        title: "WordPress Security Hardening Checklist: 15 Steps Security Teams Actually Use",
        description:
          "A ranked security hardening checklist for WordPress business sites covering authentication, file permissions, configuration, WAF, and monitoring.",
        path: "/blog/wordpress-security-hardening-checklist",
        published: "2026-04-20",
      }),
      faqSchema([
        {
          question: "Is security hardening a one-time task?",
          answer:
            "No. Hardening creates a baseline configuration, but maintaining it requires ongoing effort: credential rotation, plugin audits, reviewing new vulnerabilities as they are disclosed, and re-testing after major changes.",
        },
        {
          question: "Do security plugins handle hardening automatically?",
          answer:
            "Partially. Plugins like Wordfence, iThemes Security, and Solid Security automate some controls but cannot move wp-config.php, set server-level headers, or restrict directory access at the web server level. Plugin-based hardening should be combined with server-level configuration.",
        },
        {
          question: "How long does WordPress hardening take?",
          answer:
            "For an experienced security engineer, a full baseline hardening engagement on a standard WordPress site takes 4–8 hours. Complex multisite installations, WooCommerce stores, or sites with large plugin stacks take longer.",
        },
        {
          question: "Can hardening break my site?",
          answer:
            "Some controls can break specific functionality if applied without testing. Disabling XML-RPC breaks some mobile app integrations. Aggressive CSP headers can break third-party scripts. Hardening should be staged and tested — ideally in a staging environment first.",
        },
      ]),
    ],
  },
  "/blog/wordpress-firewall-explained": {
    title: "WordPress Firewall Explained: What a WAF Covers and What It Misses",
    description:
      "What a WordPress web application firewall actually blocks, the difference between cloud WAF and plugin WAF, and where a WAF leaves your site exposed.",
    path: "/blog/wordpress-firewall-explained",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "WordPress Firewall Explained", path: "/blog/wordpress-firewall-explained" },
    ],
    schema: [
      articleSchema({
        title: "WordPress Firewall Explained: What a WAF Covers and What It Misses",
        description:
          "A practical guide to WordPress WAFs — what they block, cloud vs plugin architecture, Cloudflare vs Sucuri vs Wordfence, and what managed security adds on top.",
        path: "/blog/wordpress-firewall-explained",
        published: "2026-04-18",
      }),
      faqSchema([
        {
          question: "Do I need a firewall if I already have a security plugin?",
          answer:
            "Security plugins and firewalls serve overlapping but different functions. Plugins like Wordfence include a WAF component, but they run inside your WordPress application, which means a serious compromise can disable them. Adding a cloud-based WAF like Cloudflare at the DNS level provides an independent protection layer.",
        },
        {
          question: "Will a WAF slow down my WordPress site?",
          answer:
            "A cloud WAF typically improves performance rather than degrading it — cloud providers run geographically distributed networks and cache content closer to visitors. Plugin-based WAFs add some PHP overhead, but well-optimised options keep this minimal.",
        },
        {
          question: "Can a WAF block all WordPress attacks?",
          answer:
            "No. A WAF blocks attacks that match its rule set — primarily known exploit patterns, automated scanners, and signature-based threats. It does not protect against credential compromise, authenticated attacks, zero-days, or malware already on the server.",
        },
        {
          question: "How much does a WordPress WAF cost?",
          answer:
            "Cloudflare's free tier provides baseline protection for most small sites. Cloudflare Pro is around $20/month. Sucuri's firewall plan starts at around $10/month. Wordfence Premium runs around $119/year.",
        },
      ]),
    ],
  },
  "/blog/wordpress-security-monitoring": {
    title: "What WordPress Security Monitoring Actually Covers",
    description:
      "What genuine WordPress security monitoring includes beyond uptime checks — file integrity, login anomalies, vulnerability feeds, blacklist monitoring, and alert triage.",
    path: "/blog/wordpress-security-monitoring",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "WordPress Security Monitoring", path: "/blog/wordpress-security-monitoring" },
    ],
    schema: [
      articleSchema({
        title: "What WordPress Security Monitoring Actually Covers on Business Sites",
        description:
          "The difference between uptime monitoring and genuine WordPress security monitoring, what each layer covers, and what a professional monitoring setup looks like.",
        path: "/blog/wordpress-security-monitoring",
        published: "2026-04-16",
      }),
      faqSchema([
        {
          question: "Is Wordfence enough for WordPress security monitoring?",
          answer:
            "Wordfence Premium provides file integrity monitoring, malware scanning, login protection, and real-time vulnerability alerts. It covers most of the monitoring checklist. The gap is triage and response — Wordfence generates the alerts, but a human or managed process still needs to review and act on them.",
        },
        {
          question: "How often should a WordPress site be scanned for malware?",
          answer:
            "Daily automated scanning is the standard for business sites. Sites with high traffic, frequent plugin updates, or active WooCommerce transactions should run continuous or near-continuous scanning.",
        },
        {
          question: "What is the difference between security monitoring and a security audit?",
          answer:
            "Monitoring is ongoing and automated — it watches for changes and anomalies continuously. A security audit is a periodic, manual deep-dive: reviewing configuration, access controls, plugin versions, and risk posture at a point in time. Both are necessary.",
        },
        {
          question: "How quickly should a security alert be investigated?",
          answer:
            "Severity determines urgency. A new admin user created at 3am is a same-day investigation. A known malware signature found in an active plugin file is immediate. A failed login attempt from an unfamiliar IP may be logged and tracked but not escalated unless part of a pattern.",
        },
      ]),
    ],
  },
  "/blog/state-of-wordpress-security-2025-business-takeaways": {
    title: "What the State of WordPress Security in 2025 Means for Business Websites in 2026",
    description:
      "Patchstack's latest WordPress ecosystem data explains why plugin sprawl, slow patching, and weak vulnerability prioritisation now create real business risk.",
    path: "/blog/state-of-wordpress-security-2025-business-takeaways",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "State of WordPress Security 2025", path: "/blog/state-of-wordpress-security-2025-business-takeaways" },
    ],
    schema: [
      articleSchema({
        title: "What the State of WordPress Security in 2025 Means for Business Websites in 2026",
        description:
          "A practical business take on Patchstack's latest WordPress security report, focused on plugin risk, prioritisation, and operational hardening.",
        path: "/blog/state-of-wordpress-security-2025-business-takeaways",
        published: "2026-04-02",
      }),
    ],
  },
  "/blog/woocommerce-attack-target-2026": {
    title: "Why WooCommerce Stores Are the #1 Target for WordPress Attacks in 2026",
    description:
      "Why WooCommerce stores are attacked more aggressively than standard WordPress sites and what revenue-focused teams should do to reduce risk.",
    path: "/blog/woocommerce-attack-target-2026",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "WooCommerce Attacks in 2026", path: "/blog/woocommerce-attack-target-2026" },
    ],
    schema: [
      articleSchema({
        title: "Why WooCommerce Stores Are the #1 Target for WordPress Attacks in 2026",
        description:
          "Payment plugins, customer data, and high traffic make WooCommerce sites a prime WordPress target. This guide explains what to protect first.",
        path: "/blog/woocommerce-attack-target-2026",
        published: "2026-04-26",
      }),
    ],
  },
  "/blog/wordpress-plugin-audit": {
    title: "The WordPress Plugin Audit Guide",
    description:
      "A practical framework for auditing WordPress plugins, reducing vulnerability exposure, and closing risky attack paths before they are exploited.",
    path: "/blog/wordpress-plugin-audit",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "WordPress Plugin Audit", path: "/blog/wordpress-plugin-audit" },
    ],
    schema: [
      articleSchema({
        title: "The WordPress Plugin Audit: How to Find and Close Vulnerabilities Before Attackers Do",
        description:
          "How to audit your plugin stack the way security specialists do and reduce avoidable WordPress risk.",
        path: "/blog/wordpress-plugin-audit",
        published: "2025-10-14",
      }),
    ],
  },
  "/blog/hosting-vs-managed-security": {
    title: "When Hosting Is Not Enough for WordPress Security",
    description:
      "Understand the gap between hosting-layer monitoring and true managed WordPress security before you assume your infrastructure provider has you covered.",
    path: "/blog/hosting-vs-managed-security",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "Hosting vs Managed Security", path: "/blog/hosting-vs-managed-security" },
    ],
    schema: [
      articleSchema({
        title: "When Your Hosting Provider Isn't Enough: What Managed WordPress Security Actually Covers",
        description:
          "Where hosting stops, where application-layer risk begins, and how serious WordPress security coverage differs.",
        path: "/blog/hosting-vs-managed-security",
        published: "2024-06-09",
      }),
    ],
  },
  "/blog/wordpress-security-audit-frequency": {
    title: "How Often Should a WordPress Site Be Security Audited?",
    description:
      "A business-focused framework for choosing the right WordPress security audit cadence based on revenue risk, change frequency, and operational exposure.",
    path: "/blog/wordpress-security-audit-frequency",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "WordPress Security Audit Frequency", path: "/blog/wordpress-security-audit-frequency" },
    ],
    schema: [
      articleSchema({
        title: "How Often Should a WordPress Site Be Security Audited? A Framework for Revenue-Critical Businesses",
        description:
          "How to set the right audit schedule for WordPress websites that matter commercially.",
        path: "/blog/wordpress-security-audit-frequency",
        published: "2023-11-21",
      }),
    ],
  },
  "/blog/wordpress-downtime-cost": {
    title: "WordPress Downtime Cost Guide",
    description:
      "A clear breakdown of the commercial cost of WordPress downtime and the protection investments that reduce revenue, trust, and SEO loss.",
    path: "/blog/wordpress-downtime-cost",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "WordPress Downtime Cost", path: "/blog/wordpress-downtime-cost" },
    ],
    schema: [
      articleSchema({
        title: "WordPress Downtime: What It Really Costs a Revenue-Driven Site — And How to Prevent It",
        description:
          "What downtime really costs and how proactive WordPress protection reduces business exposure.",
        path: "/blog/wordpress-downtime-cost",
        published: "2022-08-18",
      }),
    ],
  },
  "/blog/hire-wordpress-security-team": {
    title: "Questions to Ask Before Hiring a WordPress Security Team",
    description:
      "Use these seven questions to evaluate WordPress security providers, separate serious operators from generic maintenance vendors, and choose the right fit.",
    path: "/blog/hire-wordpress-security-team",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "Hiring a WordPress Security Team", path: "/blog/hire-wordpress-security-team" },
    ],
    schema: [
      articleSchema({
        title: "Before You Hire a WordPress Security Team: 7 Questions That Reveal the Right Fit",
        description:
          "A buyer-focused checklist for evaluating WordPress security partners before you hand over operational responsibility.",
        path: "/blog/hire-wordpress-security-team",
        published: "2021-05-04",
      }),
    ],
  },
  "/blog/wordpress-security-agency-vs-freelancer": {
    title: "WordPress Security Agency vs Freelancer",
    description:
      "A buyer-focused guide to choosing between a freelancer and an agency for WordPress security, maintenance, and incident response.",
    path: "/blog/wordpress-security-agency-vs-freelancer",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "WordPress Security Agency vs Freelancer", path: "/blog/wordpress-security-agency-vs-freelancer" },
    ],
    schema: [
      articleSchema({
        title: "WordPress Security Agency vs Freelancer: Which Is Right for a Revenue-Critical Website?",
        description:
          "How to choose the right WordPress support model when your website has commercial, operational, or brand risk.",
        path: "/blog/wordpress-security-agency-vs-freelancer",
        published: "2020-09-28",
      }),
    ],
  },
  "/blog/hacked-wordpress-site-recovery-cost": {
    title: "How Much Does Hacked WordPress Site Recovery Cost?",
    description:
      "A practical buyer guide to the cost of hacked WordPress site recovery, malware cleanup, blacklist removal, and hardening.",
    path: "/blog/hacked-wordpress-site-recovery-cost",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "Hacked WordPress Site Recovery Cost", path: "/blog/hacked-wordpress-site-recovery-cost" },
    ],
    schema: [
      articleSchema({
        title: "How Much Does Hacked WordPress Site Recovery Cost?",
        description:
          "The real cost drivers behind emergency WordPress recovery and what buyers should expect from a serious provider.",
        path: "/blog/hacked-wordpress-site-recovery-cost",
        published: "2020-07-16",
      }),
    ],
  },
  "/blog/wordpress-security-retainer-includes": {
    title: "What a WordPress Business Continuity Retainer Includes",
    description:
      "A decision-stage guide to what buyers should expect from a WordPress security retainer, including audits, monitoring, incident response, and SLAs.",
    path: "/blog/wordpress-security-retainer-includes",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "WordPress Business Continuity Retainer Includes", path: "/blog/wordpress-security-retainer-includes" },
    ],
    schema: [
      articleSchema({
        title: "What Does a WordPress Business Continuity Retainer Actually Include?",
        description:
          "What premium WordPress security retainers usually cover, who they are for, and how to evaluate providers.",
        path: "/blog/wordpress-security-retainer-includes",
        published: "2020-02-11",
      }),
    ],
  },
  "/blog/woocommerce-maintenance-checklist": {
    title: "WooCommerce Maintenance Checklist for Growing Stores",
    description:
      "A buyer-intent guide to WooCommerce maintenance, covering staging, updates, rollback, monitoring, and support expectations for growing stores.",
    path: "/blog/woocommerce-maintenance-checklist",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "WooCommerce Maintenance Checklist", path: "/blog/woocommerce-maintenance-checklist" },
    ],
    schema: [
      articleSchema({
        title: "WordPress Maintenance for WooCommerce: What Growing Stores Should Expect",
        description:
          "A practical checklist for WooCommerce owners evaluating WordPress maintenance partners and support processes.",
        path: "/blog/woocommerce-maintenance-checklist",
        published: "2019-10-03",
      }),
    ],
  },
  "/blog/protect-your-digital-assets": {
    title: "Why Cybersecurity Is Critical for Modern Businesses",
    description:
      "Learn why cybersecurity is now a core business function and what modern companies should do to protect their websites, data, and reputation.",
    path: "/blog/protect-your-digital-assets",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "Why Cybersecurity Is Critical for Modern Businesses", path: "/blog/protect-your-digital-assets" },
    ],
    schema: [
      articleSchema({
        title: "Protect Your Digital Assets: Why Cybersecurity Is Critical for Modern Businesses",
        description:
          "A practical overview of why cybersecurity matters for modern businesses and how website security affects revenue, trust, and operations.",
        path: "/blog/protect-your-digital-assets",
        published: "2019-03-16",
      }),
    ],
  },
  "/blog/how-hackers-break-into-websites": {
    title: "How Hackers Break Into Websites and How to Stop Them",
    description:
      "A practical breakdown of the most common website attack paths and what businesses can do to reduce risk on WordPress sites.",
    path: "/blog/how-hackers-break-into-websites",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "How Hackers Break Into Websites", path: "/blog/how-hackers-break-into-websites" },
    ],
    schema: [
      articleSchema({
        title: "How Hackers Break Into Websites – And How to Stop Them",
        description:
          "Common website attack methods and practical WordPress defenses for businesses that need stronger protection.",
        path: "/blog/how-hackers-break-into-websites",
        published: "2019-12-12",
      }),
    ],
  },
  "/blog/wordpress-maintenance-guide": {
    title: "The Ultimate Guide to WordPress Maintenance",
    description:
      "A comprehensive guide to WordPress maintenance, uptime, updates, backups, and security for businesses that depend on their websites.",
    path: "/blog/wordpress-maintenance-guide",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "The Ultimate Guide to WordPress Maintenance", path: "/blog/wordpress-maintenance-guide" },
    ],
    schema: [
      articleSchema({
        title: "The Ultimate Guide to WordPress Maintenance for Australian Businesses",
        description:
          "A business-focused guide to keeping WordPress sites healthy, secure, and high-performing over time.",
        path: "/blog/wordpress-maintenance-guide",
        published: "2021-07-25",
      }),
    ],
  },
  "/blog/wordpress-security-mistakes": {
    title: "Common WordPress Security Mistakes",
    description:
      "The most common WordPress security mistakes businesses make and the steps needed to fix them before attackers exploit them.",
    path: "/blog/wordpress-security-mistakes",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "Common WordPress Security Mistakes", path: "/blog/wordpress-security-mistakes" },
    ],
    schema: [
      articleSchema({
        title: "The Most Common WordPress Security Mistakes (And How to Fix Them)",
        description:
          "The avoidable WordPress security issues that often lead to breaches and what to do differently.",
        path: "/blog/wordpress-security-mistakes",
        published: "2022-04-06",
      }),
    ],
  },
  "/blog/site-hacked-what-to-do": {
    title: "My WordPress Site Got Hacked: What To Do Right Now",
    description:
      "A step-by-step response plan for businesses whose WordPress website has been hacked, blacklisted, or infected with malware.",
    path: "/blog/site-hacked-what-to-do",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "My WordPress Site Got Hacked", path: "/blog/site-hacked-what-to-do" },
    ],
    schema: [
      articleSchema({
        title: "My WordPress Site Got Hacked: What To Do Right Now",
        description:
          "Immediate triage steps for hacked WordPress websites and how to start recovery safely.",
        path: "/blog/site-hacked-what-to-do",
        published: "2023-01-15",
      }),
    ],
  },
  "/blog/woocommerce-hacked-what-to-do": {
    title: "My WooCommerce Store Was Hacked: Emergency Recovery Guide",
    description:
      "WooCommerce store hacked? Stop the damage fast — disable checkout, notify your payment processor, then follow this forensic recovery guide. Skimmer detection included.",
    path: "/blog/woocommerce-hacked-what-to-do",
    type: "article",
    keywords: [
      "woocommerce hacked",
      "hacked woocommerce store",
      "woocommerce malware removal",
      "woocommerce site hacked what to do",
      "woocommerce payment skimmer",
    ],
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "WooCommerce Store Hacked", path: "/blog/woocommerce-hacked-what-to-do" },
    ],
    schema: [
      articleSchema({
        title: "My WooCommerce Store Was Hacked: Emergency Recovery Guide",
        description:
          "How to shut down the damage, recover safely, and protect your WooCommerce store after a hack — including skimmer detection and customer data considerations.",
        path: "/blog/woocommerce-hacked-what-to-do",
        published: "2026-04-29",
      }),
      faqSchema([
        {
          question: "Does a hacked WooCommerce store mean my customers' card data was stolen?",
          answer:
            "Not necessarily, but it is a serious risk that must be investigated. If your store was running a JavaScript skimmer, card data entered at checkout may have been captured. The only way to confirm is a forensic inspection of your checkout page source code and server files. If a skimmer is found, assume card data was compromised and notify your payment processor immediately.",
        },
        {
          question: "Do I need to notify customers after a WooCommerce hack?",
          answer:
            "Whether you are legally required to notify customers depends on what data was compromised and your jurisdiction. If you process card payments under a payment processor agreement, you will almost certainly be required to notify your processor of any confirmed cardholder data breach. Your processor will advise on customer notification requirements. If you hold other personal data (names, addresses, emails) and operate under GDPR or similar regulations, breach notification obligations may also apply.",
        },
        {
          question: "How long does WooCommerce hack recovery take?",
          answer:
            "Most WooCommerce site recoveries are completed within 24 hours by professional recovery services. More complex infections — particularly those involving database-level malware, multiple backdoors, or a compromised hosting account — may take 24–48 hours. You should not re-enable live checkout until a complete forensic scan confirms the site is clean.",
        },
        {
          question: "Can my payment gateway account be reinstated after a WooCommerce hack?",
          answer:
            "Yes, in most cases. Contact your payment gateway proactively as soon as you suspect a breach. Explain the situation, the steps you are taking, and when you expect to be fully clean. Providing a professional incident report and evidence of remediation significantly improves the outcome. Most payment processors would rather reinstate a merchant who handled an incident responsibly than lose the relationship.",
        },
      ]),
    ],
  },
  "/blog/wordpress-google-blacklist-removal": {
    title: "WordPress Blacklisted by Google: Remove the Warning and Recover",
    description:
      "WordPress site showing 'Deceptive site ahead'? Here's how to confirm the blacklist, clean the infection, submit a review request, and get Google's warning removed.",
    path: "/blog/wordpress-google-blacklist-removal",
    type: "article",
    keywords: [
      "wordpress blacklisted by google",
      "google safe browsing warning wordpress",
      "remove website from google blacklist",
      "deceptive site ahead wordpress",
      "google blacklist removal",
    ],
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "WordPress Google Blacklist Removal", path: "/blog/wordpress-google-blacklist-removal" },
    ],
    schema: [
      articleSchema({
        title: "WordPress Blacklisted by Google: How to Remove the Warning and Recover",
        description:
          "Step-by-step guide to removing a WordPress site from Google's Safe Browsing blacklist — cleaning the infection, submitting a review request, and preventing re-blacklisting.",
        path: "/blog/wordpress-google-blacklist-removal",
        published: "2026-04-29",
      }),
      faqSchema([
        {
          question: "How long does it take Google to remove a blacklist warning after I submit a review request?",
          answer:
            "Google typically reviews Safe Browsing removal requests within 1–3 business days. If the review is approved, the warning is removed from browsers within a few hours as the Safe Browsing database propagates. If the review is rejected — because malware was still detected — you will need to complete another cleanup and resubmit. Providing a detailed, specific description of what was found and fixed in your review request speeds up the process.",
        },
        {
          question: "Will being blacklisted by Google affect my site's rankings long-term?",
          answer:
            "The Safe Browsing blacklist and organic search rankings are separate systems. Removal from the blacklist does not automatically restore rankings lost during the blacklisting period. Rankings typically recover over weeks as Googlebot re-crawls your clean pages. Sites that are blacklisted a second time after being re-infected tend to see more lasting ranking damage. A Manual Action (a separate issue in Google Search Console) has a more direct impact on rankings and requires a different reconsideration process.",
        },
        {
          question: "Can I still receive orders while my WordPress site is blacklisted by Google?",
          answer:
            "Technically yes, but practically very few customers will complete a purchase when Chrome is showing a full-page 'Deceptive site ahead' warning. Most visitors will leave immediately. If your store is blacklisted because of a payment skimmer or other fraud-related malware, you should disable checkout regardless — allowing transactions to proceed while a skimmer is active exposes your customers to card theft.",
        },
        {
          question: "Does Google blacklisting affect email deliverability?",
          answer:
            "Google Safe Browsing blacklisting affects browser and search visibility, not email deliverability directly. However, if your site was blacklisted because attackers used your hosting to send spam or malware emails at scale, your IP address and domain may have been added to email blocklists (such as Spamhaus or Barracuda) independently. Check your domain on MXToolbox and similar email reputation services separately.",
        },
      ]),
    ],
  },
  "/blog/why-plugin-updates-matter": {
    title: "Why WordPress Plugin Updates Matter",
    description:
      "Why outdated WordPress plugins create serious business risk and how to build a safer update process for your site.",
    path: "/blog/why-plugin-updates-matter",
    type: "article",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "Why WordPress Plugin Updates Matter", path: "/blog/why-plugin-updates-matter" },
    ],
    schema: [
      articleSchema({
        title: "Why WordPress Plugin Updates Matter More Than You Think",
        description:
          "Why plugin updates are one of the most important WordPress security practices for modern business websites.",
        path: "/blog/why-plugin-updates-matter",
        published: "2024-09-07",
      }),
    ],
  },
  "/10-website-hacking-methods-that-put-your-site-at-risk-in-2025": {
    title: "10 Ways Hackers Attack WordPress Sites in 2025 (+ How to Stop Them)",
    description:
      "Discover the 10 most common methods hackers use to compromise WordPress sites in 2025 — from brute force and SQL injection to backdoors — and the exact steps to close each gap.",
    path: "/10-website-hacking-methods-that-put-your-site-at-risk-in-2025",
    type: "article",
    keywords: [
      "website hacking methods 2025",
      "how hackers attack wordpress sites",
      "common ways websites get hacked",
      "wordpress security vulnerabilities",
    ],
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "10 Website Hacking Methods", path: "/10-website-hacking-methods-that-put-your-site-at-risk-in-2025" },
    ],
    schema: [
      articleSchema({
        title: "10 Ways Hackers Attack WordPress Sites in 2025 (+ How to Stop Them)",
        description:
          "The most common attack methods used against WordPress websites in 2025 and the specific defences that close each vulnerability.",
        path: "/10-website-hacking-methods-that-put-your-site-at-risk-in-2025",
        published: "2025-01-15",
      }),
      faqSchema([
        {
          question: "What are the most common ways WordPress sites get hacked?",
          answer:
            "The most common attack methods include exploiting vulnerable plugins and themes, brute force login attacks, credential stuffing, SQL injection, cross-site scripting (XSS), and backdoors left after an initial compromise. Misconfigured file permissions and delayed detection also play a major role.",
        },
        {
          question: "How do hackers use brute force attacks on WordPress?",
          answer:
            "Brute force attacks use automated tools to try thousands of username and password combinations against the WordPress login page. Using strong unique passwords, limiting login attempts, and enabling two-factor authentication are the primary defences.",
        },
        {
          question: "What is credential stuffing and does it affect WordPress?",
          answer:
            "Credential stuffing uses leaked username/password pairs from other data breaches to attempt login on WordPress sites. If your users reuse passwords, their accounts are at risk even if WordPress itself is secure. Enforcing password resets and monitoring for unusual logins helps mitigate this.",
        },
        {
          question: "What is a WordPress backdoor and how do I find one?",
          answer:
            "A WordPress backdoor is hidden malicious code that lets attackers regain access even after a site is cleaned. Backdoors are typically embedded in plugin files, theme files, or uploaded file directories. Professional malware scanning tools and integrity checks against official plugin repositories are the most reliable way to find them.",
        },
        {
          question: "How can I protect my WordPress site from SQL injection?",
          answer:
            "SQL injection exploits poorly sanitised input fields to manipulate your database. Keeping WordPress, plugins, and themes updated, using a web application firewall (WAF), and choosing plugins with active security maintenance significantly reduces this risk.",
        },
      ]),
    ],
  },
};

export function getSeoData(pathname: string): SeoData {
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  return (
    blogPosts[normalized] ??
    pageSeo[normalized] ?? {
      title: "Page Not Found",
      description: DEFAULT_DESCRIPTION,
      path: pathname,
      noindex: true,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Page Not Found", path: pathname },
      ],
    }
  );
}

export function getCanonicalUrl(pathname: string): string {
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  return `${SITE_URL}${normalized === "/" ? "" : normalized}`;
}

export function getFullTitle(pathname: string): string {
  return `${getSeoData(pathname).title} | ${SITE_NAME}`;
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderSeoHead(pathname: string): string {
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const seo = getSeoData(normalized);
  const canonicalUrl = getCanonicalUrl(seo.path);
  const fullTitle = getFullTitle(pathname);
  const description = seo.description || DEFAULT_DESCRIPTION;
  const robots = seo.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large";
  const schemaNodes = [
    ...(seo.breadcrumbs ? [buildBreadcrumbSchema(seo.breadcrumbs)] : []),
    ...(seo.schema ?? []),
  ];

  const metaTags = [
    `<meta name="description" content="${escapeHtml(description)}" />`,
    seo.keywords?.length
      ? `<meta name="keywords" content="${escapeHtml(seo.keywords.join(", "))}" />`
      : "",
    `<meta name="robots" content="${escapeHtml(robots)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:type" content="${escapeHtml(seo.type ?? "website")}" />`,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:image" content="${escapeHtml(seo.ogImage ?? DEFAULT_OG_IMAGE)}" />`,
    `<meta property="og:image:width" content="1280" />`,
    `<meta property="og:image:height" content="720" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:alt" content="${escapeHtml(seo.ogImageAlt ?? "WebAdish — WordPress security and protection services")}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(seo.ogImage ?? DEFAULT_OG_IMAGE)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
  ]
    .filter(Boolean)
    .join("\n    ");

  const schemaTags = schemaNodes
    .map(
      (schema) =>
        `<script type="application/ld+json" data-seo-schema="true">${JSON.stringify(schema).replaceAll(
          "</script",
          "<\\/script",
        )}</script>`,
    )
    .join("\n    ");

  return [metaTags, schemaTags].filter(Boolean).join("\n    ");
}
