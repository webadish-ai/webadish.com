import { ArrowRight, CheckCircle2, AlertTriangle, Shield, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const EmergencyCTA = () => (
  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
    <p className="text-lg font-bold text-foreground mb-2">Managing a WordPress portfolio?</p>
    <p className="text-sm text-muted-foreground mb-6">Response within 30 minutes during business hours.</p>
    <Link href="/hacked-site-recovery">
      <Button variant="primary" size="lg">
        Request Emergency Assessment <ArrowRight size={18} className="ml-2" />
      </Button>
    </Link>
  </div>
);

export default function CaseStudyAgencyPortfolio() {
  return (
    <Layout>
      <section className="pt-36 pb-16 hero-gradient text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">Case Study</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            263 WordPress Sites Recovered <br />From a Single Hosting Account
          </h1>
          <p className="text-xl text-muted-foreground">
            How WebAdish recovered a real estate marketing agency's entire WordPress portfolio — and found two database-level backdoors that file-based malware scanners never check for.
          </p>
        </div>
      </section>

      <article className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Shield size={12} /> Incident Response
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Recovering 168 Actively-Infected Sites — Plus a Precautionary Audit of 95 More
            </h2>
            <p className="text-muted-foreground text-lg">Client: Real estate marketing agency — 263-site WordPress portfolio across three shared hosting servers</p>
          </div>

          <div className="bg-gray-50 rounded-2xl border border-border/50 p-8 mb-12">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Case Snapshot</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Client Type", value: "Real Estate Marketing Agency" },
                { label: "Issue", value: "Layered malware, self-healing reinfection, hidden database backdoors" },
                { label: "Scope", value: "263 sites, 3 shared hosting servers, 1 account" },
                { label: "Impact", value: "Repeated HTTP 408 errors, failed prior cleanup, admin lockout" },
                { label: "Engagement Level", value: "Full Portfolio Incident Response + Hardening" },
              ].map((row) => (
                <div key={row.label} className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{row.label}</span>
                  <span className="text-sm font-medium text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="h-7 w-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">01</span>
              The Problem
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-5">
              The agency had already been through one round of cleanup elsewhere. Sites were still throwing intermittent HTTP 408 errors, a hosting-panel scanner kept flagging infections, and the agency no longer trusted what was actually fixed. The two symptomatic servers held 168 sites between them; a third, sharing the same at-risk credentials, was proactively audited too.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "A reused shared-hosting password sat in a plaintext credentials file — giving account-wide access, not just one site",
                "A black-hat SEO tool silently installed itself as a hidden must-use plugin on every site it touched",
                "A file-manager webshell, identical byte-for-byte, gave direct browser-based file access across sites",
                "A theme-level dropper silently re-created the backdoor plugin the moment it was deleted",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <p className="text-sm font-semibold text-red-800">
                Critical issue: one site became completely inaccessible — even the hosting panel's one-click admin login failed. Every conventional check came back clean.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="h-7 w-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">02</span>
              What Others Missed
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The reason the locked-out site broke was something WordPress itself never creates on its own: a <strong>MySQL database trigger</strong>. It silently intercepted any attempt to create a new admin account — once the attacker's disguised account was removed during cleanup, the trigger made it permanently impossible to create a replacement through any normal means.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-5">
              <p className="text-sm font-semibold text-amber-900">
                A second trigger, found on several other sites, watched every public blog comment for a specific phrase. The moment that phrase appeared — something any anonymous visitor could submit — it silently created a full admin account with a password the attacker already controlled. No login, no file upload, no existing access required.
              </p>
            </div>
            <p className="text-sm text-muted-foreground italic border-l-4 border-amber-300 pl-4">
              WordPress never uses database triggers, stored procedures, or scheduled events on its own — but it's a category of compromise standard file-based malware scanners simply don't look for. None of the comment-activated backdoors had been triggered yet — caught in time.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="h-7 w-7 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold">03</span>
              What We Did
            </h3>
            <div className="space-y-4">
              {[
                { step: "Full Portfolio Cleanup", items: ["Removed every backdoor file, cloaker, and rogue admin account", "Preserved evidence for the client's records"] },
                { step: "Reinfection Root Cause", items: ["Identified a vulnerable file-manager plugin the attacker was actively exploiting to re-upload payloads", "Removed it account-wide"] },
                { step: "Database Forensics", items: ["Full audit for hidden triggers, stored procedures, and scheduled events across every site", "Eradicated both backdoor types"] },
                { step: "Credential & Access Hardening", items: ["Rotated credentials across both hosting accounts", "Set up key-based authentication to close the original entry point"] },
                { step: "Infrastructure Cleanup", items: ["Resolved file-count and memory pressure independent of the malware", "Verified every site's configured URL against its actual domain"] },
              ].map((phase) => (
                <div key={phase.step} className="flex gap-4 bg-gray-50 rounded-xl p-5 border border-border/50">
                  <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-2">{phase.step}</p>
                    <ul className="space-y-1">
                      {phase.items.map((item) => (
                        <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                          <ChevronRight size={13} className="text-accent shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6">Results</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
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
            <p className="text-sm font-semibold text-foreground border-l-4 border-accent pl-4">
              The actual reinfection vector was identified and removed — not just the symptoms. A full write-up and evidence trail was delivered to the client for their own records.
            </p>
          </div>

          <div className="bg-foreground text-white rounded-2xl p-8 mb-10">
            <h3 className="text-lg font-bold mb-3">Key Takeaway</h3>
            <p className="text-white/90 leading-relaxed mb-2">
              File-based malware scans, even thorough ones, do not check your database for triggers, stored procedures, or scheduled events.
            </p>
            <p className="text-white/75 leading-relaxed">
              That's not a hypothetical gap — it's exactly how a real attacker maintained access on this account, and it's the kind of thing that only gets found when someone goes looking for it specifically.
            </p>
          </div>

          <EmergencyCTA />
        </div>
      </article>
    </Layout>
  );
}
