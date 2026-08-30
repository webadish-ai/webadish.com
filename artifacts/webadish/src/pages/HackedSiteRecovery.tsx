import { Ambulance, CheckCircle2, Clock, ArrowRight, Phone, AlertTriangle, Shield, RefreshCw, XCircle, Download } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const steps = [
  { step: "01", title: "Emergency Contact", time: "Within 1 hour", desc: "Reach out via our emergency line or form. A security engineer will respond within 1 hour to assess your situation." },
  { step: "02", title: "Site Assessment", time: "1–3 hours", desc: "We perform a deep scan of your site to identify all malware, backdoors, compromised files, and injection points." },
  { step: "03", title: "Malware Removal", time: "3–12 hours", desc: "We surgically remove all malware, clean infected files, close backdoors, and patch the vulnerability that caused the breach." },
  { step: "04", title: "Blacklist Removal", time: "24–48 hours", desc: "We submit removal requests to Google Safe Browsing, McAfee, Sucuri and all major blacklists on your behalf." },
  { step: "05", title: "Hardening & Protection", time: "Included", desc: "After cleaning, we harden your site with a firewall, 2FA, and security monitoring to prevent re-infection." },
  { step: "06", title: "Guarantee", time: "30 days", desc: "Our 30-day re-infection guarantee means if your site is hacked again within 30 days, we fix it again at no charge." },
];

const signs = [
  "You're redirected to a spam or pharma website",
  "Google shows a 'Site may be hacked' warning",
  "Your hosting account has been suspended",
  "You see strange admin accounts you didn't create",
  "Customers are reporting antivirus warnings",
  "Your Google Search Console has a security alert",
  "Your site is loading strange Japanese/Chinese characters",
  "You can't log into WordPress admin",
];

export default function HackedSiteRecovery() {
  return (
    <Layout>
      {/* EMERGENCY HERO */}
      <section className="pt-36 pb-20 bg-gradient-to-br from-red-50 via-white to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(214,26,102,0.08),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 border border-primary/20 animate-pulse">
              🚨 Emergency Service — Available 24/7
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your Site Was Hacked. <br /><span className="text-primary">We'll Fix It in 24 Hours.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Professional malware removal, blacklist removal, and complete WordPress site recovery. Guaranteed clean — or we work until it is.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="primary" size="lg" className="text-lg px-8 shadow-lg shadow-primary/30">
                <Link href="/contact"><Phone size={18} className="mr-2" /> Get Emergency Help Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <a href="mailto:hello@webadish.com">Email Us Directly</a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 mt-10 text-sm font-medium">
              {[
                { icon: <Clock size={16} className="text-primary" />, label: "<24h Recovery Time" },
                { icon: <Shield size={16} className="text-accent" />, label: "30-Day Re-Infection Guarantee" },
                { icon: <CheckCircle2 size={16} className="text-green-500" />, label: "800+ Sites Recovered" },
                { icon: <RefreshCw size={16} className="text-accent" />, label: "Blacklist Removal Included" },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-2 text-muted-foreground">{b.icon}{b.label}</div>
              ))}
            </div>
            <Link
              href="/case-studies/agency-portfolio-recovery"
              className="mt-8 flex items-center gap-3 bg-white/80 border border-primary/20 rounded-2xl px-5 py-4 max-w-xl hover:border-primary/40 hover:shadow-sm transition-all group"
            >
              <span className="text-3xl font-bold text-primary shrink-0">263</span>
              <span className="text-sm text-muted-foreground">
                sites recovered in our largest single engagement — three servers, two hidden database-trigger backdoors.{" "}
                <span className="text-primary font-medium group-hover:underline">Read the case study →</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* SIGNS OF HACK */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-4">
                <AlertTriangle size={16} /> Signs Your Site Has Been Hacked
              </div>
              <h2 className="text-3xl font-bold mb-8">Is Your WordPress Site Infected?</h2>
              <ul className="space-y-4">
                {signs.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <AlertTriangle size={12} className="text-primary" />
                    </div>
                    <span className="text-muted-foreground text-sm">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-3xl p-10 border border-border/50">
              <h3 className="text-2xl font-bold mb-6">Need Immediate Help?</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">If you're experiencing any of the signs listed, your site may already be blacklisted and losing traffic. Every minute counts.</p>
              <div className="space-y-4 mb-8">
                <div className="bg-white rounded-xl p-5 border border-border/50">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Emergency Email</div>
                  <a href="mailto:hello@webadish.com" className="text-accent font-semibold hover:underline">hello@webadish.com</a>
                </div>
                <div className="bg-white rounded-xl p-5 border border-border/50">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Emergency Phone</div>
                  <a href="tel:+919998757045" className="text-accent font-semibold hover:underline">+91 9998757045</a>
                </div>
              </div>
              <Button asChild variant="primary" className="w-full" size="lg">
                <Link href="/contact">Submit Emergency Request <ArrowRight size={18} className="ml-2" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATOR */}
      <section className="py-20 bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Not Another Vague Scanner Report</h2>
            <p className="text-white/70">
              A lot of "recovery" is a plugin scan, a list of theoretical issues, and an upsell. That's not what closes a real breach.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
              <h3 className="font-bold text-white/60 text-sm uppercase tracking-wider mb-5">What most "cleanups" do</h3>
              <ul className="space-y-4">
                {[
                  "Run an automated scan and hand you a generic PDF of flagged files",
                  "Delete the obvious malware but miss the backdoor that put it there",
                  "Never check database triggers or scheduled cron jobs — so reinfection is just a matter of days",
                  "Call it done without a verification pass on a second scan method",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                    <XCircle size={16} className="text-white/40 shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-accent/30 bg-accent/10 p-7">
              <h3 className="font-bold text-accent text-sm uppercase tracking-wider mb-5">What we actually do</h3>
              <ul className="space-y-4">
                {[
                  "Manually trace the real entry point — file diffs, timestamps, and injected code, not just a signature scan",
                  "Find and close the backdoor itself, including ones hidden in database triggers and scheduled tasks",
                  "Verify clean with a second, independent scan method before we call it done",
                  "Harden the specific weakness that caused the breach, not a generic checklist",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white font-medium">
                    <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="outline" size="lg" className="border-white/20 text-white bg-transparent hover:bg-white hover:text-foreground">
              <Link href="/resources/wordpress-hack-recovery-checklist">
                <Download size={18} className="mr-2" /> Get the Free Recovery Checklist
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* RECOVERY PROCESS */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Recovery Process</h2>
            <p className="text-lg text-muted-foreground">From infected to fully clean — a proven, systematic approach to WordPress recovery.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-8 border border-border/50 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-4xl font-bold text-primary/20">{s.step}</span>
                  <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">{s.time}</span>
                </div>
                <h3 className="text-lg font-bold mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-20 bg-foreground text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Shield size={16} className="text-primary" /> Our Guarantee
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">30-Day Re-Infection Guarantee</h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            After we clean your site, if it gets infected again within 30 days, we fix it again at absolutely no charge. We stand behind our work completely.
          </p>
          <Button asChild variant="primary" size="lg" className="text-lg px-10">
            <Link href="/contact">Start Recovery Now <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </section>

      {/* UPSELL TO RETAINER */}
      <section className="py-16 bg-white border-t border-border/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-2 text-sm font-medium uppercase tracking-wide">Next Steps</p>
          <h3 className="text-2xl font-bold mb-4">Prevent the Next Hack with Our Business Continuity Retainer</h3>
          <p className="text-muted-foreground mb-6">Most recovered sites are hacked again within 6 months if left unprotected. Our Business Continuity Retainer provides ongoing monitoring, hardening, and dedicated incident response — so this never happens again.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="accent">
              <Link href="/retainer">Learn About Business Continuity Retainers <ArrowRight size={16} className="ml-2" /></Link>
            </Button>
            <Button asChild variant="outline">
              <a href="https://www.webadish.co.uk/hacked-website-recovery-uk" target="_blank" rel="noopener noreferrer">UK-Based Recovery Service</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
