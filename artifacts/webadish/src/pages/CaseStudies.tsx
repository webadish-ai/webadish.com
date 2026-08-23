import { ArrowRight, CheckCircle2, AlertTriangle, Shield, Clock, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const EmergencyCTA = () => (
  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
    <p className="text-lg font-bold text-foreground mb-2">Facing a similar issue?</p>
    <p className="text-sm text-muted-foreground mb-6">Response within 30 minutes during business hours.</p>
    <Button asChild variant="primary" size="lg">
      <Link href="/hacked-site-recovery">
        Request Emergency Assessment <ArrowRight size={18} className="ml-2" />
      </Link>
    </Button>
  </div>
);

export default function CaseStudies() {
  return (
    <Layout>
      {/* HERO */}
      <section className="pt-36 pb-16 hero-gradient text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">Case Studies</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Real Incidents.<br />Expert Recovery. No Reinfection.
          </h1>
          <p className="text-xl text-muted-foreground">
            How WebAdish handles critical WordPress security incidents — from containment to long-term protection.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Trust built through real client work for verofax.com, shivamautozone.com, crystalgroup.in, and a 263-site agency portfolio.
          </p>
        </div>
      </section>

      {/* SELECTED RECOVERIES — stat-led teasers */}
      <section className="py-16 px-4 bg-white border-b border-border/50">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3 text-center">Selected Recoveries</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Proof is better than promises.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { stat: "263", label: "Sites Recovered", desc: "One agency, three servers, two hidden database backdoors found and closed.", href: "/case-studies/agency-portfolio-recovery" },
              { stat: "0", label: "Reinfections After 30 Days", desc: "Compromised eCommerce site cleaned and hardened in under 48 hours.", href: "/case-studies/verofax" },
              { stat: "60%", label: "Faster Load Time", desc: "Full WordPress rebuild with modern security architecture for a growing dealership.", href: "/case-studies/shivamautozone" },
              { stat: "B2B", label: "Enterprise Trust Rebuilt", desc: "Custom WordPress build that turned procurement conversations into closed deals.", href: "/case-studies/crystalgroup" },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="group block border border-border/50 rounded-2xl p-6 hover:border-accent hover:shadow-lg transition-all duration-200 bg-gray-50/50">
                <div className="text-4xl font-extrabold text-foreground mb-1 group-hover:text-accent transition-colors">{c.stat}</div>
                <div className="text-xs font-bold uppercase tracking-wide text-accent mb-4">{c.label}</div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{c.desc}</p>
                <span className="text-sm font-semibold text-primary inline-flex items-center gap-1">
                  Read recovery story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CASE 0 — AGENCY PORTFOLIO RECOVERY */}
      <article className="py-20 bg-gray-50 border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Shield size={12} /> Incident Response — Portfolio Scale
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              263 WordPress Sites Recovered From a Single Hosting Account
            </h2>
            <p className="text-muted-foreground text-lg">Client: Real estate marketing agency — 263-site WordPress portfolio across three shared hosting servers</p>
          </div>

          <div className="bg-white rounded-2xl border border-border/50 p-8 mb-12">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Case Snapshot</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Client Type", value: "Real Estate Marketing Agency" },
                { label: "Issue", value: "Layered malware, self-healing reinfection, hidden database backdoors" },
                { label: "Scope", value: "263 sites, 3 shared hosting servers, 1 account" },
                { label: "Engagement Level", value: "Full Portfolio Incident Response + Hardening" },
              ].map((row) => (
                <div key={row.label} className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{row.label}</span>
                  <span className="text-sm font-medium text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-10">
            <p className="text-sm font-semibold text-red-800">
              The site had already been "cleaned" once by another provider and kept reinfecting. The reason: a MySQL database trigger — a backdoor category standard file-based malware scanners never check for.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { value: "263", label: "Sites Recovered & Audited" },
              { value: "0", label: "Data Loss" },
              { value: "2", label: "Unknown Backdoors Closed" },
            ].map((m) => (
              <div key={m.label} className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-green-700 mb-1">{m.value}</div>
                <div className="text-xs font-medium uppercase tracking-wide text-green-600">{m.label}</div>
              </div>
            ))}
          </div>

          <Button asChild variant="accent">
            <Link href="/case-studies/agency-portfolio-recovery">Read the Full Case Study <ArrowRight size={16} className="ml-2" /></Link>
          </Button>
        </div>
      </article>

      {/* CASE 1 — VEROFAX */}
      <article className="py-20 bg-white border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Title */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Shield size={12} /> Incident Response
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Recovered a Compromised eCommerce Website and Prevented Reinfection
            </h2>
            <p className="text-muted-foreground text-lg">Client: Verofax (verofax.com) — Global technology company</p>
          </div>

          {/* Section 1 — Snapshot */}
          <div className="bg-gray-50 rounded-2xl border border-border/50 p-8 mb-12">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Case Snapshot</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Client Type", value: "eCommerce / Technology" },
                { label: "Issue", value: "Malware infection, SEO drop, admin compromise" },
                { label: "Impact", value: "Revenue disruption, search engine warning" },
                { label: "Resolution Time", value: "48 hours" },
                { label: "Engagement Level", value: "Incident Response + Ongoing Protection" },
              ].map((row) => (
                <div key={row.label} className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{row.label}</span>
                  <span className="text-sm font-medium text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2 — The Problem */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="h-7 w-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">01</span>
              The Problem
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-5">
              The client approached us after noticing their website was redirecting users to external spam pages.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "Google had started flagging the site",
                "Organic traffic dropped significantly",
                "Admin access was partially compromised",
                "Previous attempts using plugins failed",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <p className="text-sm font-semibold text-red-800">
                Critical issue: The infection was not limited to visible malware — multiple hidden backdoors existed.
              </p>
            </div>
          </div>

          {/* Section 3 — What Others Missed */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="h-7 w-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">02</span>
              What Others Missed
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The client had already attempted cleanup using standard tools and low-cost services.
            </p>
            <ul className="space-y-3 mb-5">
              {[
                "Only surface-level malware was removed",
                "Hidden access points remained intact",
                "Reinfection occurred within days",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground italic border-l-4 border-amber-300 pl-4">
              This is a common failure pattern with incomplete recovery approaches.
            </p>
          </div>

          {/* Section 4 — Our Approach */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="h-7 w-7 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold">03</span>
              Our Approach
            </h3>
            <p className="text-muted-foreground mb-6">We handled this as a full security incident, not a basic cleanup.</p>
            <div className="space-y-4">
              {[
                { step: "Step 1 — Containment", items: ["Blocked malicious access", "Isolated compromised components"] },
                { step: "Step 2 — Forensic Analysis", items: ["Identified entry point", "Traced persistence mechanisms"] },
                { step: "Step 3 — Complete Cleanup", items: ["Removed all malware and backdoors", "Verified file and database integrity"] },
                { step: "Step 4 — Hardening", items: ["Secured admin access", "Patched vulnerabilities", "Improved server-level security"] },
                { step: "Step 5 — Monitoring", items: ["Implemented tracking and alerts", "Ensured no reinfection"] },
              ].map((phase) => (
                <div key={phase.step} className="flex gap-4 bg-gray-50 rounded-xl p-5 border border-border/50">
                  <div className="shrink-0 mt-0.5">
                    <CheckCircle2 size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-2">{phase.step}</p>
                    <ul className="space-y-1">
                      {phase.items.map((i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <ChevronRight size={13} className="text-accent shrink-0" /> {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5 — Results */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="h-7 w-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">04</span>
              Results
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { value: "<48h", label: "Full Recovery" },
                { value: "0", label: "Reinfections" },
                { value: "48h", label: "Google Warnings Cleared" },
              ].map((m) => (
                <div key={m.label} className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-700 mb-1">{m.value}</div>
                  <div className="text-xs font-medium uppercase tracking-wide text-green-600">{m.label}</div>
                </div>
              ))}
            </div>
            <ul className="space-y-2">
              {[
                "Website fully restored and verified clean",
                "No malicious activity detected post-recovery",
                "Google warnings removed within 48 hours",
                "Traffic began recovering immediately",
                "No reinfection after 30 days",
              ].map((r) => (
                <li key={r} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 size={15} className="text-green-500 shrink-0" /> {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Section 6 — Business Impact */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="h-7 w-7 rounded-full bg-foreground text-white flex items-center justify-center text-xs font-bold">05</span>
              Business Impact
            </h3>
            <p className="text-muted-foreground mb-4">The client avoided:</p>
            <ul className="space-y-2 mb-5">
              {[
                "Continued revenue loss from redirected visitors",
                "Long-term SEO damage from Google blacklisting",
                "Repeated recovery costs from incomplete fixes",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
            <p className="text-sm font-semibold text-foreground border-l-4 border-accent pl-4">
              A proper recovery prevented significantly higher losses than the cost of the engagement.
            </p>
          </div>

          {/* Section 7 — What Happened Next */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="h-7 w-7 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold">06</span>
              What Happened Next
            </h3>
            <p className="text-muted-foreground mb-4">
              After recovery, the client opted for ongoing security protection to prevent future incidents.
            </p>
            <ul className="space-y-2 mb-4">
              {[
                "Continuous monitoring and threat detection",
                "Regular security audits",
                "Priority incident response coverage",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 size={15} className="text-accent shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <p className="text-sm italic text-muted-foreground">
              This ensures long-term stability — not just a one-time fix.
            </p>
          </div>

          {/* Section 8 — Key Takeaway */}
          <div className="bg-foreground text-white rounded-2xl p-8 mb-10">
            <h3 className="text-lg font-bold mb-3">Key Takeaway</h3>
            <p className="text-white/90 leading-relaxed mb-2">
              Most hacked websites are not properly secured after cleanup.
            </p>
            <p className="text-white/75 leading-relaxed">
              Without root-cause resolution, reinfection is highly likely. A full forensic approach — not a plugin scan — is required to permanently resolve a serious compromise.
            </p>
          </div>

          <EmergencyCTA />
        </div>
      </article>

      {/* CASE 2 — SHIVAM AUTOZONE */}
      <article className="py-20 bg-gray-50 border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Shield size={12} /> Security + Development
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Security Hardening and Performance Rebuild for a Growing Automotive Dealership
            </h2>
            <p className="text-muted-foreground text-lg">Client: Shivam Autozone (shivamautozone.com) — Automotive dealership</p>
          </div>

          <div className="bg-white rounded-2xl border border-border/50 p-8 mb-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Case Snapshot</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Client Type", value: "Automotive Dealership" },
                { label: "Issue", value: "Outdated site, poor performance, weak security" },
                { label: "Impact", value: "Low lead quality, credibility risk" },
                { label: "Engagement Level", value: "Full Rebuild + Ongoing Protection" },
              ].map((row) => (
                <div key={row.label} className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{row.label}</span>
                  <span className="text-sm font-medium text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8 mb-10">
            <div>
              <h3 className="text-lg font-bold mb-3">The Challenge</h3>
              <p className="text-muted-foreground leading-relaxed">
                Shivam Autozone needed a professional, high-converting website with stronger security to support a growing dealership. The previous site was slow, dated, and weak on trust signals — directly impacting lead quality and conversion.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Our Approach</h3>
              <ul className="space-y-2">
                {["Full WordPress rebuild with modern architecture", "SSL and firewall implementation", "Performance optimisation (60% faster load)", "Responsive mobile-first design", "Ongoing monthly maintenance coverage"].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 size={15} className="text-accent shrink-0" /> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { value: "60%", label: "Faster Load Time" },
                { value: "Full", label: "Mobile Readiness" },
                { value: "Higher", label: "Lead Quality" },
              ].map((m) => (
                <div key={m.label} className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-700 mb-1">{m.value}</div>
                  <div className="text-xs font-medium uppercase tracking-wide text-green-600">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          <EmergencyCTA />
        </div>
      </article>

      {/* CASE 3 — CRYSTAL COLD CHAIN */}
      <article className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Shield size={12} /> Development + Maintenance
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              B2B WordPress Build That Established Enterprise Credibility and Improved Lead Quality
            </h2>
            <p className="text-muted-foreground text-lg">Client: Crystal Group (crystalgroup.in) — B2B logistics and cold chain solutions</p>
          </div>

          <div className="bg-gray-50 rounded-2xl border border-border/50 p-8 mb-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Case Snapshot</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Client Type", value: "B2B Logistics / Enterprise" },
                { label: "Issue", value: "Weak credibility, poor site structure" },
                { label: "Impact", value: "Enterprise buyers not converting" },
                { label: "Engagement Level", value: "Custom Build + Ongoing Protection" },
              ].map((row) => (
                <div key={row.label} className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{row.label}</span>
                  <span className="text-sm font-medium text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8 mb-10">
            <div>
              <h3 className="text-lg font-bold mb-3">The Challenge</h3>
              <p className="text-muted-foreground leading-relaxed">
                Crystal Cold Chain needed a professional B2B website to establish credibility with enterprise clients. Their existing site failed to communicate scale, operational capability, and trust — costing them procurement opportunities.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Our Approach</h3>
              <ul className="space-y-2">
                {["Custom WordPress development for B2B positioning", "SEO-optimised information architecture", "Certification and capability showcasing", "Enterprise trust signal integration", "Ongoing monthly maintenance and support"].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 size={15} className="text-accent shrink-0" /> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { value: "Stronger", label: "Buyer Confidence" },
                { value: "Built-In", label: "SEO Readiness" },
                { value: "Improved", label: "Lead Quality" },
              ].map((m) => (
                <div key={m.label} className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-700 mb-1">{m.value}</div>
                  <div className="text-xs font-medium uppercase tracking-wide text-green-600">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          <EmergencyCTA />
        </div>
      </article>

      {/* FINAL CTA */}
      <section className="py-20 cta-gradient text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-semibold mb-8 uppercase tracking-widest">
            <Clock size={14} /> Response within 30 minutes
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Facing a similar issue?</h2>
          <p className="text-lg text-white/90 mb-8">
            We prioritise a limited number of active incidents at a time to ensure full attention and quality outcomes.
          </p>
          <Link href="/hacked-site-recovery">
            <Button variant="white" size="lg" className="text-lg px-10">
              Request Emergency Assessment <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
