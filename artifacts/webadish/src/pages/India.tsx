import { ArrowRight, CheckCircle2, MessageCircle, Phone, Shield, Zap } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const tiers = [
  {
    name: "Care Plan",
    price: "Rs 9,999/mo+",
    desc: "For brochure sites and local business websites that need updates, backups, uptime monitoring, and basic protection.",
    items: ["Core and plugin updates", "Daily backups", "Uptime monitoring", "Monthly maintenance summary", "Security baseline"],
  },
  {
    name: "Security + Maintenance",
    price: "Rs 24,999/mo+",
    desc: "For Indian businesses where leads, SEO, and uptime matter every week.",
    items: ["Everything in Care Plan", "Security hardening", "Malware scanning", "Priority response", "Performance cleanup"],
  },
  {
    name: "Hacked Site Recovery",
    price: "Rs 29,999-Rs 75,000+",
    desc: "One-time incident response for hacked WordPress sites, blacklists, redirects, and hosting suspensions.",
    items: ["Malware removal", "Backdoor cleanup", "Blacklist review", "Post-incident hardening", "Emergency same-day option"],
  },
  {
    name: "Security Audit",
    price: "Rs 25,000-Rs 75,000",
    desc: "A one-time security posture review for dealerships, education brands, eCommerce stores, and growing teams.",
    items: ["Risk scoring", "Plugin and theme review", "Access review", "Prioritised recommendations"],
  },
];

const proofPoints = [
  "INR quotes before work begins",
  "UPI and bank transfer accepted",
  "20+ years WordPress and infrastructure experience",
  "Built for Indian SMEs, dealerships, schools, and WooCommerce stores",
];

const whatsappUrl =
  "https://wa.me/919998757045?text=I%20am%20from%20India%20and%20need%20WordPress%20security%20or%20maintenance%20pricing.";

export default function India() {
  return (
    <Layout>
      <section className="pt-36 pb-20 hero-gradient">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-8 border border-accent/20">
            <Shield size={16} className="text-accent" />
            India INR Pricing
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            WordPress Security & Maintenance Pricing for <span className="text-accent">Indian Businesses</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            You do not need to choose from our global USD plans. This page is for Indian businesses that want local INR
            pricing, fast WhatsApp response, and a clear quote before work begins.
          </p>

          <div className="mb-10 inline-flex items-center gap-2 text-sm bg-accent/10 text-accent font-semibold px-4 py-2 rounded-xl border border-accent/20">
            <span>🚨 Active Hack / Malware Emergency?</span>
            <a href="https://www.wordpressrecovery.in" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-white flex items-center gap-1">
              Visit WordPressRecovery.in <ArrowRight size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
            <div className="rounded-2xl border border-accent/20 bg-white/80 p-5 shadow-sm">
              <div className="text-2xl font-bold text-accent">Rs 9,999/mo+</div>
              <div className="text-sm text-muted-foreground mt-1">Maintenance starts</div>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-white/80 p-5 shadow-sm">
              <div className="text-2xl font-bold text-primary">Rs 29,999+</div>
              <div className="text-sm text-muted-foreground mt-1">Recovery starts</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-white/80 p-5 shadow-sm">
              <div className="text-2xl font-bold text-foreground">Free</div>
              <div className="text-sm text-muted-foreground mt-1">Initial fit check</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button asChild variant="accent" size="lg">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} /> WhatsApp for INR Quote
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact?market=india">
                Request India Quote <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
            {proofPoints.map((point) => (
              <span key={point} className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-white px-4 py-2">
                <CheckCircle2 size={15} className="text-accent" />
                {point}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary border border-primary/10 mb-4">
                  <Zap size={14} />
                  Hacked or blacklisted now?
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Use our dedicated emergency recovery path.</h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  For hacked WordPress sites, spam redirects, Google warnings, and hosting suspension, we use
                  WordPressRecovery.in as the faster crisis-response route for India.
                </p>
              </div>
              <Button asChild variant="accent" size="lg">
                <a href="https://www.wordpressrecovery.in/" target="_blank" rel="noopener noreferrer">
                  Open WordPressRecovery.in <ArrowRight size={18} className="ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent mb-3">Local Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose the India plan that matches your risk</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ads should send Indian prospects here first. Global USD plans are still available for international clients,
              but Indian businesses should see INR options immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tiers.map((tier) => (
              <div key={tier.name} className="rounded-3xl border border-border/50 bg-gray-50 p-8">
                <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
                <div className="text-3xl font-bold text-accent mb-4">{tier.price}</div>
                <p className="text-sm text-muted-foreground mb-6">{tier.desc}</p>
                <ul className="space-y-3">
                  {tier.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 size={16} className="text-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-accent/20 bg-accent/5 p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Not sure which one fits?</h3>
            <p className="text-muted-foreground mb-6">Send your website URL and current issue. We will recommend the correct INR scope before you pay.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="accent" size="lg">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={18} /> WhatsApp the Website URL
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:+919998757045">
                  <Phone size={18} /> Call +91 9998757045
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-accent/20 bg-white p-8 mb-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-[0.12em] border border-accent/10 mb-4">
                  DPDP Support
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Need help with DPDP Act website implementation?</h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  We offer India-focused DPDP implementation support for WordPress websites, lead forms, consent
                  journeys, plugin stacks, and technical readiness work for SMEs.
                </p>
              </div>
              <Button asChild variant="accent" size="lg">
                <Link href="/india/dpdp-compliance-wordpress">
                  View DPDP Page <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-red-500/20 bg-white p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-semibold uppercase tracking-[0.12em] border border-red-500/10 mb-4">
                  CERT-In Readiness
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Need incident-readiness help before a breach happens?</h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  We also offer CERT-In incident-readiness support for WordPress websites, forms, access control,
                  logging, and technical response preparation for Indian SMEs.
                </p>
              </div>
              <Button asChild variant="accent" size="lg">
                <Link href="/india/cert-in-incident-readiness">
                  View CERT-In Page <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-foreground text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Paid traffic from India should land here, not on USD pricing.</h2>
          <p className="text-white/75 mb-8">
            This page is designed to reduce the pricing mismatch you are seeing in Clarity: INR anchor first,
            WhatsApp-first conversion, then full scope after qualification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="white" size="lg">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} /> Start on WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
              <Link href="/pricing">View Global USD Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
