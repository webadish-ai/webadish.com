import { ArrowRight, Clock, Search } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import OptimizedImage from "@/components/OptimizedImage";
import { useState } from "react";

const posts = [
  {
    tag: "Recovery",
    tagColor: "text-red-600",
    tagBg: "bg-red-100",
    title: "Why WordPress Malware Keeps Coming Back After Cleanup",
    excerpt:
      "If your site was 'cleaned' and got reinfected days or weeks later, the malware wasn't the real problem — the entry point was never closed. Here's what actually causes reinfection, drawn from a real 263-site recovery.",
    date: "August 23, 2026",
    read: "7 min",
    img: "/blog/incident-recovery-banner.svg",
    href: "/blog/wordpress-malware-keeps-coming-back",
  },
  {
    tag: "Malware Analysis",
    tagColor: "text-accent",
    tagBg: "bg-accent/10",
    title: "How to Identify and Remove Hidden WordPress Backdoors",
    excerpt:
      "Most backdoors are files. The ones that survive a cleanup are the ones nobody thinks to check for — including a MySQL database trigger that creates an admin account the moment someone posts a comment.",
    date: "August 23, 2026",
    read: "8 min",
    img: "/blog/incident-recovery-banner.svg",
    href: "/blog/hidden-wordpress-backdoors-database-triggers",
  },
  {
    tag: "Guides",
    tagColor: "text-accent",
    tagBg: "bg-accent/10",
    title: "DPDP Act 2023 Checklist: 7 Changes Every Indian WordPress Site Must Make by August 2026",
    excerpt:
      "India's Digital Personal Data Protection Act (DPDP) implementation is approaching. Your WordPress site is a primary data collection point — here are the seven specific technical changes you need to make to remain compliant.",
    date: "June 14, 2026",
    read: "9 min",
    img: "/blog/dpdp-act-wordpress-guide-banner.svg",
    href: "/blog/dpdp-act-2023-checklist-wordpress-india",
  },
  {
    tag: "Buyer Intent",
    tagColor: "text-foreground",
    tagBg: "bg-foreground/10",
    title: "How to Choose a WordPress Maintenance Plan: A Framework for Indian Businesses",
    excerpt:
      "Most WordPress maintenance plans sold in India are reactive. Here is how to evaluate them correctly — by the criteria that matter when something serious happens, including CERT-In obligations and WooCommerce-specific risks.",
    date: "June 16, 2026",
    read: "8 min",
    img: "/blog/hosting-vs-managed-security-banner.svg",
    href: "/blog/wordpress-maintenance-plan-india",
  },
  {
    tag: "Security",
    tagColor: "text-primary",
    tagBg: "bg-primary/10",
    title: "The Real Cost of Running Nulled WordPress Plugins",
    excerpt:
      "Nulled plugins are the source of some of the most persistent WordPress compromises we see. The attackers distributing them are not doing it as a public service — they are monetising through backdoors, phoning home, and SEO spam injection.",
    date: "June 9, 2026",
    read: "7 min",
    img: "/blog/plugin-audit-banner.svg",
    href: "/blog/wordpress-nulled-plugins-risk",
  },
  {
    tag: "Security",
    tagColor: "text-primary",
    tagBg: "bg-primary/10",
    title: "WooCommerce Payment Gateway Security: What Stripe, Razorpay, and PayPal Cover — and What They Don't",
    excerpt:
      "Payment gateways secure the transaction. They do not secure your WordPress site, your customer data, or the code that connects your store to the gateway. This is where most WooCommerce compromises actually happen.",
    date: "June 2, 2026",
    read: "8 min",
    img: "/blog/plugin-audit-banner.svg",
    href: "/blog/woocommerce-payment-gateway-security",
  },
  {
    tag: "Recovery",
    tagColor: "text-destructive",
    tagBg: "bg-destructive/10",
    title: "Recovering a WordPress Site After a Shared Hosting Compromise",
    excerpt:
      "Shared hosting compromises rarely stay contained to one site. If one WordPress installation in your hosting account is infected, assume all of them are. Here is the correct recovery sequence.",
    date: "May 23, 2026",
    read: "7 min",
    img: "/blog/incident-recovery-banner.svg",
    href: "/blog/wordpress-shared-hosting-recovery",
  },
  {
    tag: "Security",
    tagColor: "text-primary",
    tagBg: "bg-primary/10",
    title: "WordPress XML-RPC: Why a Rarely-Used Feature Is a Common Attack Vector",
    excerpt:
      "XML-RPC is enabled on every WordPress site by default and almost no site needs it in 2026. Here is how attackers exploit it and how to close the vector in under five minutes.",
    date: "May 16, 2026",
    read: "6 min",
    img: "/blog/plugin-audit-banner.svg",
    href: "/blog/wordpress-xmlrpc-attack-vector",
  },
  {
    tag: "Guides",
    tagColor: "text-accent",
    tagBg: "bg-accent/10",
    title: "CERT-In 6-Hour Incident Reporting: What Indian WordPress Site Owners Must Know",
    excerpt:
      "India's CERT-In directive requires mandatory cybersecurity incident reporting within 6 hours of discovery. Most Indian business websites are covered — here is what the obligation actually requires.",
    date: "May 9, 2026",
    read: "8 min",
    img: "/blog/dpdp-act-wordpress-guide-banner.svg",
    href: "/blog/cert-in-6-hour-reporting-wordpress",
  },
  {
    tag: "Buyer Intent",
    tagColor: "text-foreground",
    tagBg: "bg-foreground/10",
    title: "WordPress Care Plans Explained: What Monthly Maintenance Actually Prevents",
    excerpt:
      "A care plan is not a support ticket system or a hosting upgrade. Here is what a well-structured WordPress maintenance plan actually covers — and the specific failure modes it prevents.",
    date: "May 2, 2026",
    read: "7 min",
    img: "/blog/hosting-vs-managed-security-banner.svg",
    href: "/blog/what-a-wordpress-care-plan-includes",
  },
  {
    tag: "Recovery",
    tagColor: "text-destructive",
    tagBg: "bg-destructive/10",
    title: "How to Remove Malware from a WordPress Site (Without Missing the Backdoor)",
    excerpt:
      "Most DIY malware cleanups leave at least one backdoor behind. A step-by-step look at what professional malware removal actually covers — and why the cleanup process matters as much as the cleanup itself.",
    date: "April 22, 2026",
    read: "8 min",
    img: "/blog/incident-recovery-banner.svg",
    href: "/blog/wordpress-malware-removal",
  },
  {
    tag: "Security",
    tagColor: "text-primary",
    tagBg: "bg-primary/10",
    title: "WordPress Security Hardening Checklist: 15 Steps Security Teams Actually Use",
    excerpt:
      "Hardening is not installing a security plugin and calling it done. These are the 15 controls that make a material difference to your site's attack surface — ranked by impact.",
    date: "April 20, 2026",
    read: "9 min",
    img: "/blog/plugin-audit-banner.svg",
    href: "/blog/wordpress-security-hardening-checklist",
  },
  {
    tag: "Security",
    tagColor: "text-primary",
    tagBg: "bg-primary/10",
    title: "WordPress Firewall Explained: What a WAF Covers and What It Misses",
    excerpt:
      "A web application firewall blocks a lot — but not everything. Understanding what a WordPress WAF does and doesn't protect against is essential before you assume you're covered.",
    date: "April 18, 2026",
    read: "7 min",
    img: "/blog/hosting-vs-managed-security-banner.svg",
    href: "/blog/wordpress-firewall-explained",
  },
  {
    tag: "Security",
    tagColor: "text-primary",
    tagBg: "bg-primary/10",
    title: "What WordPress Security Monitoring Actually Covers on Business Sites",
    excerpt:
      "Uptime monitoring is not security monitoring. This is what a proper WordPress security monitoring setup looks like — and what most businesses are missing.",
    date: "April 16, 2026",
    read: "7 min",
    img: "/blog/maintenance-operations-banner.svg",
    href: "/blog/wordpress-security-monitoring",
  },
  {
    tag: "Recovery",
    tagColor: "text-destructive",
    tagBg: "bg-destructive/10",
    title: "WordPress Hacked? What Indian Businesses Should Do Right Now",
    excerpt:
      "The right sequence when your WordPress site is hacked — contain first, assess CERT-In and DPDP obligations second, clean third. Acting in the wrong order makes the situation worse.",
    date: "April 19, 2026",
    read: "8 min",
    img: "/blog/wordpress-hacked-india-banner.svg",
    href: "/blog/wordpress-hacked-india-what-to-do",
  },
  {
    tag: "Guides",
    tagColor: "text-accent",
    tagBg: "bg-accent/10",
    title: "The DPDP Act and Your WordPress Website: What Indian Businesses Need to Do",
    excerpt:
      "Your WordPress website is your biggest DPDP compliance exposure — every form, analytics tool, and plugin is a data collection point. Five specific changes most sites need to make.",
    date: "April 17, 2026",
    read: "7 min",
    img: "/blog/dpdp-act-wordpress-guide-banner.svg",
    href: "/blog/dpdp-act-wordpress-website-guide",
  },
  {
    tag: "Security",
    tagColor: "text-primary",
    tagBg: "bg-primary/10",
    title: "What the State of WordPress Security in 2025 Means for Business Websites in 2026",
    excerpt:
      "Patchstack's latest ecosystem data confirms what serious WordPress operators already feel: plugin sprawl, slow patching, and weak prioritisation are now business risks, not just technical debt.",
    date: "April 2, 2026",
    read: "7 min",
    img: "/blog/state-of-wordpress-security-2025-banner.svg",
    href: "/blog/state-of-wordpress-security-2025-business-takeaways",
  },
  {
    tag: "Guides",
    tagColor: "text-accent",
    tagBg: "bg-accent/10",
    title: "DPDP Checklist for WordPress Websites in India",
    excerpt:
      "A practical implementation checklist for Indian businesses using WordPress, forms, plugins, analytics, and CRM tools under growing DPDP pressure.",
    date: "March 31, 2026",
    read: "7 min",
    img: "/blog/dpdp-checklist-india-banner.svg",
    href: "/blog/dpdp-checklist-wordpress-india",
  },
  {
    tag: "Security",
    tagColor: "text-primary",
    tagBg: "bg-primary/10",
    title: "Why WooCommerce Stores Are the #1 Target for WordPress Attacks in 2026",
    excerpt:
      "Payment plugins, customer data, and high traffic make WooCommerce sites the most attacked category of WordPress installations. Here's what that means for store owners.",
    date: "April 26, 2026",
    read: "6 min",
    img: "/blog/woocommerce-attack-target-banner.svg",
    href: "/blog/woocommerce-attack-target-2026",
  },
  {
    tag: "Security",
    tagColor: "text-primary",
    tagBg: "bg-primary/10",
    title: "The WordPress Plugin Audit: How to Find and Close Vulnerabilities Before Attackers Do",
    excerpt:
      "Most sites are running risky plugins right now without knowing it. A practical guide to auditing your plugin stack the way security experts do.",
    date: "October 14, 2025",
    read: "7 min",
    img: "/blog/plugin-audit-banner.svg",
    href: "/blog/wordpress-plugin-audit",
  },
  {
    tag: "Buyer Intent",
    tagColor: "text-foreground",
    tagBg: "bg-foreground/10",
    title: "When Your Hosting Provider Isn't Enough: What Managed WordPress Security Actually Covers",
    excerpt:
      "Hosting companies monitor infrastructure. They do not monitor your application layer, your plugins, or your customer data. Here's what that gap looks like in practice.",
    date: "June 9, 2024",
    read: "6 min",
    img: "/blog/hosting-vs-managed-security-banner.svg",
    href: "/blog/hosting-vs-managed-security",
  },
  {
    tag: "Buyer Intent",
    tagColor: "text-foreground",
    tagBg: "bg-foreground/10",
    title: "How Often Should a WordPress Site Be Security Audited? A Framework for Revenue-Critical Businesses",
    excerpt:
      "There is no universal answer — but there is a framework. Here's how to determine the right audit cadence based on your site's risk profile and business stakes.",
    date: "November 21, 2023",
    read: "5 min",
    img: "/blog/wordpress-security-audit-frequency-banner.svg",
    href: "/blog/wordpress-security-audit-frequency",
  },
  {
    tag: "Buyer Intent",
    tagColor: "text-foreground",
    tagBg: "bg-foreground/10",
    title: "WordPress Downtime: What It Really Costs a Revenue-Driven Site — And How to Prevent It",
    excerpt:
      "Most businesses underestimate the true cost of WordPress downtime. Here's a clear breakdown of what's at stake and what proactive protection actually buys you.",
    date: "August 18, 2022",
    read: "6 min",
    img: "/blog/wordpress-downtime-cost-banner.svg",
    href: "/blog/wordpress-downtime-cost",
  },
  {
    tag: "Buyer Intent",
    tagColor: "text-foreground",
    tagBg: "bg-foreground/10",
    title: "Before You Hire a WordPress Security Team: 7 Questions That Reveal the Right Fit",
    excerpt:
      "The right provider asks the right questions before taking over your site. Here's what to ask them — and what the answers should tell you.",
    date: "May 4, 2021",
    read: "7 min",
    img: "/blog/hire-wordpress-security-team-banner.svg",
    href: "/blog/hire-wordpress-security-team",
  },
  {
    tag: "Buyer Intent",
    tagColor: "text-foreground",
    tagBg: "bg-foreground/10",
    title: "WordPress Security Agency vs Freelancer: Which Is Right for a Revenue-Critical Website?",
    excerpt:
      "A decision-stage guide for teams choosing between a solo freelancer and an agency for WordPress security, maintenance, and incident response.",
    date: "September 28, 2020",
    read: "7 min",
    img: "/blog/wordpress-security-agency-vs-freelancer-banner.svg",
    href: "/blog/wordpress-security-agency-vs-freelancer",
  },
  {
    tag: "Buyer Intent",
    tagColor: "text-foreground",
    tagBg: "bg-foreground/10",
    title: "How Much Does Hacked WordPress Site Recovery Cost?",
    excerpt:
      "Understand the real cost drivers behind emergency WordPress malware cleanup, blacklist removal, and post-incident hardening.",
    date: "July 16, 2020",
    read: "6 min",
    img: "/blog/hacked-wordpress-site-recovery-cost-banner.svg",
    href: "/blog/hacked-wordpress-site-recovery-cost",
  },
  {
    tag: "Buyer Intent",
    tagColor: "text-foreground",
    tagBg: "bg-foreground/10",
    title: "What Does a WordPress Business Continuity Retainer Actually Include?",
    excerpt:
      "A practical buying guide covering SLAs, audits, incident response, proactive monitoring, and when a retainer makes sense.",
    date: "February 11, 2020",
    read: "6 min",
    img: "/blog/wordpress-security-retainer-includes-banner.svg",
    href: "/blog/wordpress-security-retainer-includes",
  },
  {
    tag: "Buyer Intent",
    tagColor: "text-foreground",
    tagBg: "bg-foreground/10",
    title: "WordPress Maintenance for WooCommerce: What Growing Stores Should Expect",
    excerpt:
      "A buyer-intent checklist for WooCommerce owners evaluating maintenance partners, update processes, backups, and emergency support.",
    date: "October 3, 2019",
    read: "7 min",
    img: "/blog/woocommerce-maintenance-checklist-banner.svg",
    href: "/blog/woocommerce-maintenance-checklist",
  },
  {
    tag: "Security",
    tagColor: "text-primary",
    tagBg: "bg-primary/10",
    title: "Protect Your Digital Assets: Why Cybersecurity Is Critical for Modern Businesses",
    excerpt:
      "As businesses move more of their operations online, the attack surface grows. Here's why cybersecurity is no longer optional — and what you need to do today.",
    date: "March 16, 2019",
    read: "5 min",
    img: "/blog/legacy-security-awareness-banner.svg",
    href: "/blog/protect-your-digital-assets",
  },
  {
    tag: "Security",
    tagColor: "text-primary",
    tagBg: "bg-primary/10",
    title: "How Hackers Break Into Websites – And How to Stop Them",
    excerpt:
      "From SQL injection to brute force attacks — we break down the most common methods hackers use to compromise WordPress sites and how to defend against each one.",
    date: "December 12, 2019",
    read: "7 min",
    img: "/blog/legacy-security-awareness-banner.svg",
    href: "/blog/how-hackers-break-into-websites",
  },
  {
    tag: "Maintenance",
    tagColor: "text-accent",
    tagBg: "bg-accent/10",
    title: "The Ultimate Guide to WordPress Maintenance for Australian Businesses",
    excerpt:
      "A comprehensive breakdown of everything Australian businesses need to keep their WordPress site healthy, compliant, and performing at its best.",
    date: "July 25, 2021",
    read: "8 min",
    img: "/blog/maintenance-operations-banner.svg",
    href: "/blog/wordpress-maintenance-guide",
  },
  {
    tag: "Security",
    tagColor: "text-primary",
    tagBg: "bg-primary/10",
    title: "The Most Common WordPress Security Mistakes (And How to Fix Them)",
    excerpt:
      "Most WordPress hacks are preventable. We've seen thousands of compromised sites — here are the most common mistakes that let attackers in.",
    date: "April 6, 2022",
    read: "6 min",
    img: "/blog/legacy-security-awareness-banner.svg",
    href: "/blog/wordpress-security-mistakes",
  },
  {
    tag: "Recovery",
    tagColor: "text-destructive",
    tagBg: "bg-destructive/10",
    title: "My WooCommerce Store Was Hacked: Emergency Recovery Guide",
    excerpt:
      "WooCommerce stores are targeted at a higher rate than standard WordPress sites. Here is what to do in the first 30 minutes — and how to recover completely without missing a backdoor.",
    date: "April 29, 2026",
    read: "10 min",
    img: "/blog/incident-recovery-banner.svg",
    href: "/blog/woocommerce-hacked-what-to-do",
  },
  {
    tag: "Recovery",
    tagColor: "text-destructive",
    tagBg: "bg-destructive/10",
    title: "WordPress Blacklisted by Google: How to Remove the Warning and Recover",
    excerpt:
      "A Google blacklist warning cuts organic traffic by 90% or more within hours. Here is exactly how to clean the infection, submit a Safe Browsing review request, and get the warning removed.",
    date: "April 28, 2026",
    read: "8 min",
    img: "/blog/incident-recovery-banner.svg",
    href: "/blog/wordpress-google-blacklist-removal",
  },
  {
    tag: "Recovery",
    tagColor: "text-red-600",
    tagBg: "bg-red-50",
    title: "My WordPress Site Got Hacked: What To Do Right Now",
    excerpt:
      "Don't panic. Follow these immediate steps to contain the damage, assess the breach, and begin the recovery process.",
    date: "January 15, 2023",
    read: "5 min",
    img: "/blog/incident-recovery-banner.svg",
    href: "/blog/site-hacked-what-to-do",
  },
  {
    tag: "Maintenance",
    tagColor: "text-accent",
    tagBg: "bg-accent/10",
    title: "Why WordPress Plugin Updates Matter More Than You Think",
    excerpt:
      "Outdated plugins are the #1 cause of WordPress hacks. Here's why keeping them updated is critical — and how to do it safely.",
    date: "September 7, 2024",
    read: "4 min",
    img: "/blog/maintenance-operations-banner.svg",
    href: "/blog/why-plugin-updates-matter",
  },
];

const categories = ["All", "Buyer Intent", "Guides", "Security", "Maintenance", "Recovery"];

function getImageTagClass(tag: string) {
  switch (tag) {
    case "Guides":
      return "bg-cyan-50/95 text-cyan-800 ring-cyan-200/80";
    case "Security":
      return "bg-rose-50/95 text-rose-700 ring-rose-200/80";
    case "Recovery":
      return "bg-orange-50/95 text-orange-800 ring-orange-200/80";
    case "Maintenance":
      return "bg-emerald-50/95 text-emerald-800 ring-emerald-200/80";
    case "Buyer Intent":
      return "bg-slate-100/95 text-slate-900 ring-slate-300/80";
    default:
      return "bg-white/95 text-slate-900 ring-slate-200/80";
  }
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const now = new Date();
  const published = posts.filter((p) => new Date(p.date) <= now);

  const filtered = published.filter((p) => {
    const matchCat = activeCategory === "All" || p.tag === activeCategory;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <Layout>
      <section className="pt-36 pb-16 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            WordPress Security <span className="text-accent">Buying Guides & Insights</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Decision-stage content for businesses comparing protection partners, planning security budgets, and choosing the right level of WordPress support.
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />
          </div>
        </div>
      </section>

      <section className="py-10 bg-white border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-accent mb-2">Buyer Guides</p>
              <h2 className="text-2xl md:text-3xl font-bold">Start Here If You're Evaluating WordPress Security Providers</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl">
              These guides are built for buyers with active projects, live stores, or risk exposure, not just casual readers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {posts
              .filter((post) => post.tag === "Buyer Intent")
              .map((post) => (
                <Link key={post.href} href={post.href} className="group block">
                  <div className="rounded-3xl border border-border/50 bg-gray-50 p-6 h-full hover:bg-white hover:shadow-lg transition-all">
                    <div className={`inline-flex rounded-full px-3 py-1 text-xs font-bold mb-4 ${post.tagBg} ${post.tagColor}`}>
                      {post.tag}
                    </div>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-accent transition-colors">{post.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="py-6 bg-white border-b border-border/50 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-accent text-white shadow-sm"
                    : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No articles found. Try a different search or category.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post) => (
                <Link key={post.title} href={post.href} className="group block">
                  <div className="bg-white rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative overflow-hidden border-b border-border/40 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.16),_transparent_38%),linear-gradient(180deg,_#0f172a_0%,_#111827_100%)] p-2.5 sm:p-3">
                      <div className="aspect-[1200/630] overflow-hidden rounded-[1.1rem] ring-1 ring-white/10">
                        <OptimizedImage
                          src={post.img}
                          alt={post.title}
                          className="w-full h-full object-contain object-center group-hover:scale-[1.02] transition-transform duration-500"
                          width={662}
                          height={347}
                        />
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className={`inline-flex self-start rounded-full px-3 py-1 text-xs font-semibold mb-3 ring-1 ${getImageTagClass(post.tag)}`}>
                        {post.tag}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mb-3 gap-4">
                        <span>{post.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {post.read} read
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 flex-grow">{post.excerpt}</p>
                      <div className="flex items-center text-sm font-medium text-link">
                        Read Article <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 cta-gradient text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Need Guidance, Not Just More Content?</h2>
          <p className="text-white/90 mb-8">
            Tell us about your site, traffic, and current risks. We’ll help you figure out whether you need maintenance, security, recovery, or a retainer.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your work email"
              className="flex-1 px-5 py-3 rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <Link href="/contact">
              <Button variant="white">Get Recommendations</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
