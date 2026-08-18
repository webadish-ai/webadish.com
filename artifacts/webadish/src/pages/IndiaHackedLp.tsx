import { AlertTriangle, CheckCircle2, Clock, Phone, Shield, MessageCircle, ArrowRight } from "lucide-react";
import { LandingLayout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import { TrustBar } from "@/components/TrustBar";

const signs = [
  "Site redirecting visitors to spam / pharma pages",
  "Google showing 'This site may be hacked' warning",
  "Hosting account suspended by your provider",
  "Strange admin accounts you didn't create",
  "Customers reporting antivirus or browser warnings",
  "Google Search Console security alert",
];

const included = [
  "Complete malware & backdoor removal",
  "Blacklist removal from Google, McAfee, Sucuri",
  "Firewall setup to stop re-infection",
  "Post-recovery hardening checklist",
  "30-day re-infection guarantee",
  "Dedicated security engineer — not a bot",
];

const pricing = [
  { label: "Basic Recovery", range: "₹25,000 – ₹40,000", desc: "Single infected site, no e-commerce" },
  { label: "Business Recovery", range: "₹40,000 – ₹60,000", desc: "Lead-gen or business site with customer data" },
  { label: "E-Commerce Recovery", range: "₹55,000 – ₹75,000", desc: "WooCommerce or payment-integrated sites" },
];

export default function IndiaHackedLp() {
  return (
    <LandingLayout>
      {/* EMERGENCY HERO */}
      <section className="pt-36 pb-16 bg-gradient-to-br from-red-50 via-white to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(214,26,102,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-bold mb-6 border border-red-200 animate-pulse">
              🚨 Emergency Service — We Respond Within 1 Hour
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your Website Was Hacked.<br />
              <span className="text-primary">We'll Clean It in 24 Hours.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Professional malware removal, blacklist clearance, and full site recovery for Indian businesses. 30-day guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="https://wa.me/919998757045?text=My%20website%20has%20been%20hacked%2C%20I%20need%20emergency%20recovery" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="w-full text-lg px-8 shadow-lg shadow-green-600/30 h-14 bg-green-600 hover:bg-green-700">
                  <MessageCircle size={20} className="mr-2" /> WhatsApp Triage
                </Button>
              </a>
              <a href="tel:+919998757045" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full text-lg px-8 h-14 border-red-600 text-red-700 hover:bg-red-50">
                  <Phone size={20} className="mr-2" /> Call Specialist
                </Button>
              </a>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
              <span>Official India Emergency Desk:</span>
              <a href="https://www.wordpressrecovery.in" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline inline-flex items-center gap-1">
                WordPressRecovery.in <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* FORM SECTION (MOVED UP) */}
      <section id="recovery-form" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-foreground rounded-3xl p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">Request Emergency Assessment</h2>
              <p className="text-white/70 mb-8">Fill in the details below. A security engineer will review your site and contact you within 1 hour.</p>
              <div className="bg-white rounded-3xl p-6 md:p-8 text-foreground">
                <ContactForm
                    formName="hacked_lp_india_v2"
                    pagePath="/india/hacked-site-recovery-lp"
                    defaultService="Hacked Site Recovery (Emergency)"
                    submitLabel="Get Assessment"
                    successMessage="Request Received. A security engineer is reviewing your site and will contact you via WhatsApp or phone within 1 hour."
                />
              </div>
            </div>
        </div>
      </section>

      {/* IS YOUR SITE HACKED? */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-4">
                <AlertTriangle size={16} /> Signs Your Site Has Been Hacked
              </div>
              <h2 className="text-3xl font-bold mb-6">Recognise any of these?</h2>
              <ul className="space-y-3">
                {signs.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                      <AlertTriangle size={11} className="text-primary" />
                    </div>
                    <span className="text-muted-foreground text-sm">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WHAT'S INCLUDED */}
            <div className="bg-white rounded-3xl p-8 border border-border">
              <h3 className="text-xl font-bold mb-6">What's Included in Recovery</h3>
              <ul className="space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING (MOVED DOWN) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3">Transparent Pricing</h2>
            <p className="text-muted-foreground text-sm">Final pricing confirmed after a quick assessment of your site's infection level.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricing.map((p) => (
              <div key={p.label} className="bg-gray-50 rounded-2xl p-6 border text-center">
                <h3 className="font-bold mb-2">{p.label}</h3>
                <div className="text-xl font-bold text-primary mb-2">{p.range}</div>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
