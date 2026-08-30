import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "wouter";
import {
  Menu,
  X,
  Shield,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  CheckCircle2,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const navLinks = [
  { label: "Protection Plans", href: "/maintenance" },
  { label: "Security", href: "/security" },
  { label: "Hacked Site Recovery", href: "/hacked-site-recovery", highlight: true },
  { label: "Retainer", href: "/retainer" },
  { label: "Pricing", href: "/pricing" },
  { label: "India Services", href: "/india" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const hasMountedRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 20);
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isHome = location === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isMobileMenuOpen
          ? "bg-white py-3 shadow-sm border-b border-border/50"
          : isScrolled || !isHome
            ? "glass-nav py-3"
            : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex-shrink-0 relative z-[70] flex items-center cursor-pointer select-none">
            <img
              src="/logo.webp"
              alt="WebAdish"
              width="180"
              height="40"
              className="h-10 w-auto block"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-sm px-0.5 text-sm font-medium transition-colors outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 ${
                    link.highlight
                      ? isActive
                        ? "text-primary font-semibold"
                        : "text-primary hover:text-primary/80"
                      : isActive
                      ? "text-accent font-semibold"
                      : "text-foreground/80 hover:text-accent"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4 relative z-[70]">
            <div className="hidden md:block">
              <Button asChild variant="accent">
                <Link href="/contact">Get Protected</Link>
              </Button>
            </div>
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[60] bg-white transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto bg-white px-6 pb-8 pt-6">
          <div className="flex justify-end mb-4">
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col gap-5 text-xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-sm font-semibold outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 ${
                  link.highlight ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8">
            <Button asChild variant="accent" size="lg" className="w-full">
              <Link href="/contact">Get Protected</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-50 pt-20 pb-10 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center cursor-pointer select-none mb-6">
              <img
                src="/logo.webp"
                alt="WebAdish"
                width="180"
                height="40"
                className="h-10 w-auto block"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Built for serious WordPress operations. WebAdish is a global WordPress security and protection agency for business-critical websites. We help eCommerce teams, agencies, and growth-stage businesses reduce the cost of downtime, malware, and recurring WordPress risk.
            </p>
            <div className="flex flex-col gap-2 mb-6 text-sm text-muted-foreground">
              <a href="tel:+919998757045" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone size={14} /> +91 9998757045
              </a>
              <a href="mailto:hello@webadish.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail size={14} /> hello@webadish.com
              </a>
              <a
                href="https://wa.me/919998757045"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                WhatsApp support available on request
              </a>
            </div>
            <div className="flex gap-4">
              <a href="https://twitter.com/webadish" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors"><Twitter size={20} /></a>
              <a href="https://facebook.com/webadish" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors"><Facebook size={20} /></a>
              <a href="https://linkedin.com/company/webadish" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors"><Linkedin size={20} /></a>
              <a href="https://instagram.com/webadish" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/maintenance" className="text-muted-foreground hover:text-accent text-sm transition-colors">Protection Plans</Link></li>
              <li><Link href="/security" className="text-muted-foreground hover:text-accent text-sm transition-colors">WordPress Security</Link></li>
              <li><Link href="/hacked-site-recovery" className="text-muted-foreground hover:text-primary text-sm transition-colors font-medium">Hacked Site Recovery</Link></li>
              <li><Link href="/retainer" className="text-muted-foreground hover:text-accent text-sm transition-colors">Security Retainer</Link></li>
              <li><Link href="/agency-partners" className="text-muted-foreground hover:text-accent text-sm transition-colors">Agency Partners</Link></li>
              <li><Link href="/web-design" className="text-muted-foreground hover:text-accent text-sm transition-colors">Web Design</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/case-studies" className="text-muted-foreground hover:text-accent text-sm transition-colors">Case Studies</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-accent text-sm transition-colors">Blog</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground hover:text-accent text-sm transition-colors">Pricing</Link></li>
              <li><Link href="/security-score" className="text-muted-foreground hover:text-accent text-sm transition-colors">Free Security Score</Link></li>
              <li><Link href="/resources/wordpress-hack-recovery-checklist" className="text-muted-foreground hover:text-accent text-sm transition-colors">Free Recovery Checklist</Link></li>
              <li><Link href="/india" className="text-muted-foreground hover:text-accent text-sm transition-colors">India Services</Link></li>
              <li><Link href="/google-workspace" className="text-muted-foreground hover:text-accent text-sm transition-colors">Google Workspace India</Link></li>
              <li><Link href="/email-migration-india" className="text-muted-foreground hover:text-accent text-sm transition-colors">Email Migration</Link></li>
              <li><Link href="/india/dpdp-compliance-wordpress" className="text-muted-foreground hover:text-accent text-sm transition-colors">DPDP Implementation</Link></li>
              <li><Link href="/india/cert-in-incident-readiness" className="text-muted-foreground hover:text-accent text-sm transition-colors">CERT-In Readiness</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-accent text-sm transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-accent text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-accent text-sm transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund-policy" className="text-muted-foreground hover:text-accent text-sm transition-colors">Refund Policy</Link></li>
            </ul>
            <div className="mt-8 p-4 bg-white rounded-xl border border-border/50">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Shield size={14} className="text-accent" />
                DPIIT Recognized Startup
              </div>
              <a
                href="https://www.webadish.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-xs text-muted-foreground hover:text-accent transition-colors"
              >
                UK/EU emergency response is handled via webadish.co.uk
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} WebAdish LLP. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 size={16} className="text-green-500" />
            20+ years protecting WordPress sites globally
          </div>
        </div>
      </div>
    </footer>
  );
}

export function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border/50 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="flex-shrink-0 flex items-center cursor-pointer select-none">
            <img src="/logo.webp" alt="WebAdish" width="180" height="40" className="h-10 w-auto block" />
          </Link>
          <a href="tel:+919998757045" className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-accent transition-colors">
            <Phone size={16} /> +91 9998757045
          </a>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-50 py-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} WebAdish LLP. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-accent" />
              DPIIT Recognized Startup
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" />
              20+ years protecting WordPress sites
            </div>
          </div>
        </div>
      </footer>
      <FloatingWhatsApp />
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
