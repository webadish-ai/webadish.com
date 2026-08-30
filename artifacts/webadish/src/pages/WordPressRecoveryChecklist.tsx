import { AlertTriangle, CheckCircle2, Download, ShieldCheck, Siren, Wrench } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import ContactForm from "@/components/ContactForm";

const CHECKLIST_SECTIONS = [
  {
    icon: <Siren size={20} className="text-primary" />,
    title: "1. Immediate Triage (first 30 minutes)",
    items: [
      "Take a full backup of the site in its current (infected) state before changing anything — you'll need it if law enforcement or insurance gets involved.",
      "Put the site in maintenance mode or restrict public access if it's actively serving malware or spam redirects.",
      "Change all WordPress admin, hosting, FTP/SFTP, and database passwords — assume every credential is compromised.",
      "Check wp-admin for unfamiliar administrator accounts and remove access immediately (don't delete yet — document first).",
    ],
  },
  {
    icon: <AlertTriangle size={20} className="text-primary" />,
    title: "2. Find the Real Entry Point",
    items: [
      "Check file modification timestamps against your last known-clean state to isolate when the breach started.",
      "Diff core WordPress files, active theme, and plugin files against clean copies from wordpress.org — most cleanups miss this step.",
      "Search for suspicious PHP functions (base64_decode, eval, gzinflate, create_function) in uploads and theme directories, not just plugin folders.",
      "Check wp_options and wp_usermeta for injected admin users, rogue capabilities, or scheduled cron jobs you didn't create.",
      "Review database triggers — these survive a plugin/theme wipe and are one of the most common reasons sites get reinfected within days of a 'clean' scan.",
    ],
  },
  {
    icon: <Wrench size={20} className="text-primary" />,
    title: "3. Clean and Verify",
    items: [
      "Remove malicious code at the source, not just the symptom — deleting a redirect script without finding the backdoor that recreates it doesn't fix anything.",
      "Reinstall WordPress core, theme, and all plugins from official sources rather than trying to hand-edit infected files.",
      "Re-scan after cleanup using a different method than the one that found the infection — confirms you didn't just clean the visible layer.",
      "Request Google Safe Browsing, Search Console, and any relevant blacklist (McAfee, Sucuri, Norton) review once the site is confirmed clean.",
    ],
  },
  {
    icon: <ShieldCheck size={20} className="text-accent" />,
    title: "4. Harden So It Doesn't Come Back",
    items: [
      "Enforce 2FA for every admin and editor account, no exceptions.",
      "Set a firewall rule blocking direct PHP execution from /uploads/ — one of the most common backdoor persistence tricks.",
      "Rotate all API keys, salts (in wp-config.php), and third-party service tokens the old codebase had access to.",
      "Put the site on a monitored update and audit cadence — a one-time cleanup without ongoing oversight is why most sites get reinfected within 90 days.",
    ],
  },
];

export default function WordPressRecoveryChecklist() {
  return (
    <Layout>
      <section className="pt-32 pb-16 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-8 border border-accent/20">
            <Download size={16} className="text-accent" />
            Free Resource
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            The WordPress Hack Recovery Checklist
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            The same triage sequence our team used to recover 263 WordPress sites across three servers in one engagement — including finding two database-trigger backdoors most cleanups miss entirely.
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Enter your email and we'll send you the full checklist — no scanner report, no upsell, just the actual steps.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-start">
          <div className="space-y-8">
            {CHECKLIST_SECTIONS.map((section) => (
              <div key={section.title} className="rounded-2xl border border-border/50 bg-gray-50 p-6 md:p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-10 w-10 rounded-xl bg-white border border-border/50 flex items-center justify-center shrink-0">
                    {section.icon}
                  </div>
                  <h2 className="text-lg font-bold text-foreground">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-accent shrink-0 mt-1" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="text-sm text-muted-foreground">
              Want the full story behind this checklist?{" "}
              <Link href="/case-studies/agency-portfolio-recovery" className="text-accent font-medium hover:underline">
                Read the 263-site recovery case study →
              </Link>
            </p>
          </div>

          <div className="lg:sticky lg:top-28">
            <div className="rounded-3xl border border-border/50 bg-gray-50 p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Get the checklist by email</h3>
              <p className="text-sm text-muted-foreground mb-6">
                We'll also send a short case-study reference so you can see the checklist applied to a real 263-site engagement.
              </p>
              <ContactForm
                formName="checklist_leadmagnet"
                pagePath="/resources/wordpress-hack-recovery-checklist"
                services={["Free Recovery Checklist"]}
                defaultService="Free Recovery Checklist"
                submitLabel="Send Me the Checklist"
                successMessage="Check your inbox — we've emailed you the full recovery checklist."
                messageLabel="Website URL (optional)"
                messagePlaceholder="yoursite.com — helps us tailor a note or two to your setup"
                requireMessage={false}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
