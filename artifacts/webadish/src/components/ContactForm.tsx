import { ArrowRight, CheckCircle2, Loader2, Phone, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import TurnstileField from "@/components/TurnstileField";
import { trackEvent } from "@/lib/tracking";

const DEFAULT_SERVICES = [
  "Protection Plan",
  "WordPress Security",
  "Hacked Site Recovery (Emergency)",
  "Security Retainer",
  "Free Security Score",
  "DPDP Site Assessment",
  "Agency White-Label Program",
  "Web Design",
  "General Enquiry",
];

const REQUEST_TIMEOUT_MS = 25_000;

type ContactFormProps = {
  formName?: string;
  pagePath?: string;
  defaultService?: string;
  submitLabel?: string;
  successMessage?: string;
  services?: string[];
  messageLabel?: string;
  messagePlaceholder?: string;
  requireMessage?: boolean;
};

type ContactFeedback = {
  status: "success" | "error" | null;
  ref: string;
  msg: string;
};

declare global {
  interface Window {
    __waContactFeedback?: ContactFeedback;
  }
}

function parseContactFeedback(urlValue: string): ContactFeedback {
  const queryIndex = urlValue.indexOf("?");
  if (queryIndex === -1) {
    return { status: null, ref: "", msg: "" };
  }

  const hashIndex = urlValue.indexOf("#", queryIndex);
  const search = hashIndex === -1 ? urlValue.slice(queryIndex) : urlValue.slice(queryIndex, hashIndex);
  const params = new URLSearchParams(search);
  const status = params.get("contact_status");

  if (status !== "success" && status !== "error") {
    return { status: null, ref: "", msg: "" };
  }

  return {
    status,
    ref: params.get("contact_ref") || "",
    msg: params.get("contact_msg") || "",
  };
}

export default function ContactForm({
  formName = "global_contact",
  pagePath = "/contact",
  defaultService,
  submitLabel = "Send Message",
  successMessage = "We'll review your request and reply within 4 business hours.",
  services = DEFAULT_SERVICES,
  messageLabel = "Message *",
  messagePlaceholder = "Website URL, what the site does, what concerns you most, and whether this is urgent...",
  requireMessage = true,
}: ContactFormProps) {
  const turnstileEnabled = import.meta.env.VITE_TURNSTILE_ENABLED === "true";
  const turnstileSiteKey = turnstileEnabled ? (import.meta.env.VITE_TURNSTILE_SITE_KEY || "") : "";
  const initialService = defaultService && services.includes(defaultService) ? defaultService : services[0];
  const formAnchorId = `${formName}-form`;
  const [turnstileStatus, setTurnstileStatus] = useState<"idle" | "loading" | "ready" | "error" | "skipped">(
    turnstileSiteKey ? "idle" : "skipped",
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: initialService,
    message: "",
    fax_number: "",
    form_started_at: 0,
    turnstile_token: "",
  });
  const [utmData, setUtmData] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    gclid: "",
    landing_page: "",
    referrer: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [requestId, setRequestId] = useState("");
  const hasTrackedStart = useRef(false);
  const isSubmittingRef = useRef(false);
  const feedbackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setForm((f) => ({ ...f, form_started_at: Date.now() }));
    
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setUtmData({
        utm_source: params.get("utm_source") || "",
        utm_medium: params.get("utm_medium") || "",
        utm_campaign: params.get("utm_campaign") || "",
        utm_term: params.get("utm_term") || "",
        utm_content: params.get("utm_content") || "",
        gclid: params.get("gclid") || "",
        landing_page: window.location.pathname,
        referrer: document.referrer || "",
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const feedback = window.__waContactFeedback || parseContactFeedback(window.location.href);

    if (feedback.status === "success") {
      setSubmitted(true);
      setError("");
      if (feedback.ref) setRequestId(feedback.ref);
    } else if (feedback.status === "error") {
      setSubmitted(false);
      setError(feedback.msg || "We could not submit your request. Please try again or reach us on WhatsApp.");
      if (feedback.ref) setRequestId(feedback.ref);
    }

    if (feedback.status) {
      document.getElementById("contact-feedback-fallback")?.setAttribute("hidden", "hidden");
    }
  }, []);

  useEffect(() => {
    if ((submitted || error) && feedbackRef.current) {
      feedbackRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [submitted, error]);

  const trackFormStart = () => {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackEvent("form_start", { form_name: formName, page_path: pagePath });
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      service: initialService,
      message: "",
      fax_number: "",
      form_started_at: Date.now(),
      turnstile_token: "",
    });
    hasTrackedStart.current = false;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingRef.current || (turnstileSiteKey && turnstileStatus !== "ready" && turnstileStatus !== "skipped")) return;

    isSubmittingRef.current = true;
    setLoading(true);
    setError("");
    setRequestId("");
    trackFormStart();

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, ...utmData }),
        signal: controller.signal,
      });

      const responseRequestId = response.headers.get("x-contact-request-id") || "";
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const errorText = typeof data?.error === "string" ? data.error : "Failed to send message";
        throw new Error(responseRequestId ? `${errorText} (Ref: ${responseRequestId})` : errorText);
      }

      const successRequestId = responseRequestId || (typeof data?.request_id === "string" ? data.request_id : "");
      if (successRequestId) setRequestId(successRequestId);
      
      trackEvent("conversion", { form_name: formName });
      trackEvent("form_submit_success", {
        form_name: formName,
        service: form.service || "unspecified",
        page_path: pagePath,
      });
      if (typeof window.gtag === "function") {
        window.gtag("event", "conversion", { send_to: "AW-17995549251/F5vvCMaO4LEcEMOU-YRD" });
      }
      setSubmitted(true);
      resetForm();
    } catch (err) {
      const isTimeout = err instanceof DOMException && err.name === "AbortError";
      const errorMsg = isTimeout
        ? "The request timed out. Please check your connection and try again, or reach us on WhatsApp."
        : err instanceof Error
          ? err.message
          : "Failed to send message. Please try again.";
      setError(errorMsg);
      feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      trackEvent("form_submit_error", {
        form_name: formName,
        page_path: pagePath,
        error_message: errorMsg,
      });
    } finally {
      window.clearTimeout(timeoutId);
      setLoading(false);
      isSubmittingRef.current = false;
    }
  };

  return (
    <div id={formAnchorId} className="space-y-5 min-h-[400px] flex flex-col justify-center">
      {/* Mobile-only contact card */}
      <div className="md:hidden space-y-6">
        <div className="bg-white rounded-3xl p-6 border border-border text-center shadow-sm">
          <h3 className="text-xl font-bold mb-3">
            {initialService === "Hacked Site Recovery (Emergency)" ? "Emergency Support" : "WhatsApp Support"}
          </h3>
          <p className="text-muted-foreground text-sm mb-6">For fastest response, reach us directly via WhatsApp.</p>
          <a
            href={`https://wa.me/919998757045?text=${encodeURIComponent(
              initialService === "Hacked Site Recovery (Emergency)" 
                ? "My website has been hacked, I need emergency recovery"
                : initialService === "Free Security Score" || initialService === "WordPress Security"
                ? "Hi, I would like a free 5-minute security snapshot for my website."
                : `Hi, I am interested in ${initialService} services.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            <MessageCircle size={20} /> 
            {initialService === "Hacked Site Recovery (Emergency)" ? "WhatsApp Triage" : "Chat on WhatsApp"}
          </a>
        </div>
      </div>

      {/* Desktop-only form */}
      <div className="hidden md:block">
        {submitted ? (
          <div ref={feedbackRef} className="bg-green-50 border-2 border-green-200 rounded-3xl p-8 md:p-12 text-center animate-in fade-in zoom-in duration-300" role="status" aria-live="polite">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} className="text-green-600" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Request Received!</h3>
            <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto leading-relaxed">
              {successMessage}
            </p>
            {requestId && (
              <div className="bg-white/50 rounded-xl py-2 px-4 inline-block mb-8 border border-green-100">
                <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">Reference: {requestId}</p>
              </div>
            )}
            <div>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setError("");
                  setRequestId("");
                }}
                className="text-accent hover:underline text-sm font-semibold inline-flex items-center gap-2"
              >
                Send another message <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} method="post" action="/api/contact" className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor={`${formName}-name`} className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  id={`${formName}-name`}
                  required
                  type="text"
                  name="name"
                  placeholder="Rahul Sharma"
                  value={form.name}
                  onFocus={trackFormStart}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white text-sm transition-all"
                />
              </div>
              <div>
                <label htmlFor={`${formName}-email`} className="block text-sm font-medium mb-2">Email Address *</label>
                <input
                  id={`${formName}-email`}
                  required
                  type="email"
                  name="email"
                  placeholder="rahul@company.com"
                  value={form.email}
                  onFocus={trackFormStart}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white text-sm transition-all"
                />
              </div>
            </div>
            <div>
              <label htmlFor={`${formName}-phone`} className="block text-sm font-medium mb-2">Phone / WhatsApp</label>
              <input
                id={`${formName}-phone`}
                type="tel"
                name="phone"
                placeholder="+91 98765 43210"
                value={form.phone}
                onFocus={trackFormStart}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                autoComplete="tel"
                className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white text-sm transition-all"
              />
            </div>
            <div>
              <label htmlFor={`${formName}-service`} className="block text-sm font-medium mb-2">Service Needed</label>
              <select
                id={`${formName}-service`}
                name="service"
                value={form.service}
                onFocus={trackFormStart}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white text-sm transition-all"
              >
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${formName}-message`} className="block text-sm font-medium mb-2">{messageLabel}</label>
              <textarea
                id={`${formName}-message`}
                required={requireMessage}
                rows={5}
                name="message"
                placeholder={messagePlaceholder}
                value={form.message}
                onFocus={trackFormStart}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white text-sm transition-all resize-none"
              />
            </div>
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="fax_number"
                tabIndex={-1}
                autoComplete="off"
                value={form.fax_number}
                onChange={(e) => setForm({ ...form, fax_number: e.target.value })}
              />
            </div>
            <input type="hidden" name="form_started_at" value={String(form.form_started_at)} suppressHydrationWarning />
            <input type="hidden" name="return_to" value={`${pagePath}#${formAnchorId}`} />
            <input type="hidden" name="turnstile_token" value={form.turnstile_token} />
            <TurnstileField
              siteKey={turnstileSiteKey}
              theme="light"
              onTokenChange={(token) => setForm((current) => ({ ...current, turnstile_token: token }))}
              onStatusChange={setTurnstileStatus}
            />
            {turnstileStatus === "error" && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                <p className="text-xs text-amber-800">
                  Security check failed to load. You can still submit, or reach us on{" "}
                  <a href="https://wa.me/919998757045" className="underline font-medium">WhatsApp</a>.
                </p>
              </div>
            )}
            {error && (
              <div
                ref={feedbackRef}
                className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-3"
                role="alert"
                aria-live="assertive"
              >
                <p className="text-red-700 text-sm font-medium">{error}</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/919998757045?text=Hi%2C%20I%20tried%20submitting%20the%20form%20on%20webadish.com%20but%20it%20failed."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 hover:text-red-900 underline"
                  >
                    <MessageCircle size={14} /> WhatsApp us instead
                  </a>
                  <a
                    href="tel:+919998757045"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 hover:text-red-900 underline"
                  >
                    <Phone size={14} /> Call +91 9998757045
                  </a>
                </div>
              </div>
            )}
            {(turnstileStatus === "idle" || turnstileStatus === "loading") && turnstileSiteKey && (
              <p className="text-xs text-muted-foreground text-center">Security check loading…</p>
            )}
            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="w-full text-base"
              disabled={loading || (turnstileEnabled && turnstileStatus !== "ready" && turnstileStatus !== "skipped")}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  {submitLabel}
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              We respond within 4 business hours. No spam, no hard sell.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
