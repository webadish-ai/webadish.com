
import crypto from 'crypto';

const MIN_FORM_FILL_MS = 3000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;
const DUPLICATE_WINDOW_MS = 90 * 1000;
const RECENT_SUBMISSIONS = new Map<string, { requestId: string; submittedAt: number }>();

// Spam keyword patterns in message/name (bots, SEO spam, etc.)
const SPAM_PATTERNS = [
  /\b(seo\s+service|backlink|link.?build|rank.*google|search.?engine.?optimiz|google.*rank|increase.*traffic|website.*traffic|buy.*traffic)/i,
  /\b(casino|poker|slot|gambling|bet.*site|crypto.*invest|bitcoin.*profit|forex.*signal|make.*money.*online|earn.*\$|work.*from.*home.*earn)/i,
  /\b(payday.*loan|cheap.*med|generic.*viagra|cialis|buy.*follower|instagram.*follower|tiktok.*follower)/i,
  /\b(http:\/\/|https:\/\/|www\.)[\w.-]+\.(ru|cn|tk|pw|top|xyz|click|download)\b/i,
];

const CYRILLIC_PATTERN = /[\u0400-\u04FF]/;

// Surveillance / stalkerware / unauthorized account-access requests \u2014 always blocked
const SURVEILLANCE_PATTERN = /\b(hack(ing)?\s+(whatsapp|instagram|facebook|snapchat|telegram|gmail|email|phone|account)|whatsapp\s+hack(er|ing)?|hack\s+someone|spy\s+on\s+(whatsapp|phone|partner|wife|husband|girlfriend|boyfriend)|read\s+someone.?s\s+(whatsapp|messages?|chats?)|track\s+(someone|whatsapp|phone|location)\s+without|monitor\s+(someone.?s\s+)?(whatsapp|phone)|access\s+someone.?s\s+(whatsapp|account|messages?)|whatsapp\s+spy|phone\s+spy|clone\s+whatsapp|whatsapp\s+clone|catch\s+(cheating|wife|husband|girlfriend|boyfriend)|recover\s+deleted\s+whatsapp|see\s+deleted\s+(whatsapp\s+)?messages?|bypass\s+(2fa|two.?factor|otp|verification)|crack\s+(password|account|whatsapp))\b/i;

// Known disposable / throwaway email domains
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.org', 'guerrillamail.net',
  'sharklasers.com', 'grr.la', 'yopmail.com', 'yopmail.fr', 'cool.fr.nf',
  'trashmail.com', 'trashmail.me', 'trashmail.at', 'trashmail.io',
  'temp-mail.org', 'tempr.email', 'dispostable.com', 'maildrop.cc',
  'throwam.com', 'throwam.net', 'spamgourmet.com', 'spamgourmet.org',
  'getairmail.com', 'fakeinbox.com', 'mailnull.com', 'spamspot.com',
  'mt2015.com', 'mt2014.com', 'discard.email', 'spamfree24.org',
]);

const RISKY_LINK_TLDS = ['.ru', '.cn', '.tk', '.pw', '.top', '.xyz', '.click', '.download'];

const LEAD_MAGNET_SERVICE = 'Free Recovery Checklist';

async function sendLeadWebhook(payload: Record<string, unknown>, requestId: string) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) return { sent: false as const, skipped: true as const };

  const secret = process.env.CONTACT_WEBHOOK_SECRET || '';
  const targetUrl = new URL(webhookUrl);
  if (secret) {
    targetUrl.searchParams.set('secret', secret);
  }

  const response = await fetch(targetUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(secret ? { 'x-webhook-secret': secret } : {}),
    },
    body: JSON.stringify({
      ...payload,
      webhookSecret: secret || undefined,
    }),
  });

  if (!response.ok) {
    const responseText = await response.text().catch(() => '');
    console.error(`[contact:${requestId}] lead_webhook_failed`, {
      status: response.status,
      statusText: response.statusText,
      body: responseText.slice(0, 200),
    });
    return { sent: false as const, skipped: false as const };
  }

  return { sent: true as const, skipped: false as const };
}

export default async function handler(req: any, res: any) {
  const requestId = buildRequestId(req);
  res.setHeader('x-contact-request-id', requestId);
  const acceptsHtml = typeof req?.headers?.accept === 'string' && req.headers.accept.includes('text/html');

  const log = (stage: string, details?: Record<string, unknown>) => {
    console.log(`[contact:${requestId}] ${stage}`, details || {});
  };

  try {
    if (req.method !== 'POST') {
      log('rejected_method', { method: req.method });
      if (acceptsHtml) {
        return respondRedirect(res, '/contact', 'error', requestId, 'Contact form method not allowed.');
      }
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const body = normalizeBody(req);
    const { name, email, phone, service, message, fax_number, form_started_at, turnstile_token, return_to } = body;
    const returnTo = normalizeReturnTo(return_to);
    const flags: string[] = [];

    log('received', {
      email: (typeof email === 'string' ? email : '').slice(0, 40),
      service: typeof service === 'string' ? service : '[non-string]',
      hasTurnstileToken: typeof turnstile_token === 'string' && turnstile_token.length > 0,
      hasFormStartedAt: Boolean(form_started_at),
    });

    // --- HONEYPOT: bots fill hidden fields, real users don't ---
    if (fax_number) {
      flags.push('honeypot');
      log('honeypot_flagged');
    }

    // --- TIMING: bots fill forms in milliseconds ---
    const startedAt = typeof form_started_at === 'number' ? form_started_at : Number(form_started_at);
    const now = Date.now();
    // Use Number.isFinite to correctly reject 0, NaN, Infinity — not just falsy
    if (Number.isFinite(startedAt) && startedAt > 0) {
      if (now - startedAt < MIN_FORM_FILL_MS) {
        flags.push('timing_fast');
        log('timing_too_fast_flagged', { elapsed: now - startedAt });
      }
      if (now - startedAt > MAX_FORM_AGE_MS) {
        flags.push('timing_old');
        log('timing_too_old_flagged', { elapsed: now - startedAt });
      }
    }

    // --- TYPE SAFETY: coerce body fields to strings before any checks ---
    const nameStr = typeof name === 'string' ? name.trim() : '';
    const emailStr = typeof email === 'string' ? email.trim() : '';
    const phoneStr = typeof phone === 'string' ? phone.trim() : '';
    const messageStr = typeof message === 'string' ? message.trim() : '';
    const serviceStr = typeof service === 'string' ? service.trim() : '';
    const isLeadMagnet = serviceStr === LEAD_MAGNET_SERVICE;

    // --- REQUIRED FIELDS ---
    if (!nameStr || !emailStr || (!messageStr && !isLeadMagnet)) {
      log('validation_failed_missing_fields');
      if (acceptsHtml) {
        return respondRedirect(res, returnTo, 'error', requestId, 'Please fill name, email, and message.');
      }
      return res.status(400).json({ error: 'Missing required fields: name, email, message' });
    }

    // --- DISPOSABLE EMAIL ---
    const emailDomain = emailStr.split('@').pop()?.toLowerCase() ?? '';
    if (emailDomain && DISPOSABLE_DOMAINS.has(emailDomain)) {
      flags.push('disposable_email');
      log('disposable_email_flagged', { domain: emailDomain });
    }

    // --- SPAM KEYWORD DETECTION ---
    const textToScan = `${nameStr} ${messageStr}`;
    if (SPAM_PATTERNS.some(p => p.test(textToScan))) {
      flags.push('spam_pattern');
      log('spam_pattern_flagged');
    }

    // --- SURVEILLANCE / STALKERWARE DETECTION ---
    if (SURVEILLANCE_PATTERN.test(textToScan)) {
      flags.push('surveillance_request');
      log('surveillance_request_flagged');
    }

    // --- CYRILLIC DETECTION (For non-Cyrillic markets) ---
    if (CYRILLIC_PATTERN.test(textToScan)) {
      flags.push('cyrillic');
      log('cyrillic_text_flagged');
    }

    // --- FIELD QUALITY: return friendly errors (real users can see and fix these) ---
    if (!looksLikeRealName(nameStr)) {
      const err = 'Please enter your real full name.';
      if (acceptsHtml) return respondRedirect(res, returnTo, 'error', requestId, err);
      return res.status(400).json({ error: err });
    }
    if (!looksLikeRealPhone(phoneStr)) {
      const err = 'Please enter a valid phone number, or leave it blank.';
      if (acceptsHtml) return respondRedirect(res, returnTo, 'error', requestId, err);
      return res.status(400).json({ error: err });
    }
    if (messageStr.length > 4000) {
      const err = 'Your message is too long (max 4000 characters). Please shorten it.';
      if (acceptsHtml) return respondRedirect(res, returnTo, 'error', requestId, err);
      return res.status(400).json({ error: err });
    }
    const submissionKey = buildSubmissionKey({
      name: nameStr,
      email: emailStr,
      phone: phoneStr,
      service: serviceStr,
      message: messageStr,
    });
    const duplicate = getRecentSubmission(submissionKey);
    if (duplicate) {
      log('duplicate_submission_suppressed', { originalRequestId: duplicate.requestId });
      if (acceptsHtml) {
        return respondRedirect(res, returnTo, 'success', duplicate.requestId, 'Thanks. Your request was already submitted and we are reviewing it now.');
      }
      return res.status(200).json({
        success: true,
        message: 'Request already received',
        request_id: duplicate.requestId,
        duplicate: true,
      });
    }

    // --- TURNSTILE: verify if token is present; allow through if missing (Turnstile may not have loaded) ---
    const turnstileTokenStr = typeof turnstile_token === 'string' ? turnstile_token : '';
    if (process.env.TURNSTILE_SECRET_KEY && turnstileTokenStr) {
      const isTurnstileValid = await verifyTurnstileToken(turnstileTokenStr, req);
      if (!isTurnstileValid) {
        flags.push('turnstile_invalid');
        log('turnstile_failed_flagged');
      } else {
        log('turnstile_passed');
      }
    } else if (process.env.TURNSTILE_SECRET_KEY && !turnstileTokenStr) {
      log('turnstile_missing_continue');
    }

    const blockReason = getBlockedSpamReason({
      flags,
      emailDomain,
      message: messageStr,
      hasTurnstileToken: Boolean(turnstileTokenStr),
    });
    if (blockReason) {
      log('high_confidence_spam_blocked', { blockReason, flags, emailDomain });
      rememberSubmission(submissionKey, requestId);
      if (acceptsHtml) {
        return respondRedirect(res, returnTo, 'success', requestId, 'Thanks. Your request was submitted successfully. We will reply within 4 business hours.');
      }
      return res.status(200).json({ success: true, message: 'Email sent successfully', request_id: requestId, blocked: true });
    }

    const flagPrefix = flags.length ? `[Flagged: ${flags.join(', ')}] ` : '';

    const supportMail: OutboundMail = {
      to: 'support@webadish.com',
      subject: `${flagPrefix}New Contact Form Submission from ${nameStr}`,
      html: `
        <h2>New Contact Form Submission</h2>
        ${flags.length ? `<p><strong>Flags:</strong> ${escapeHtml(flags.join(', '))}</p>` : ''}
        <p><strong>Name:</strong> ${escapeHtml(nameStr)}</p>
        <p><strong>Email:</strong> ${escapeHtml(emailStr)}</p>
        ${phoneStr ? `<p><strong>Phone:</strong> ${escapeHtml(phoneStr)}</p>` : ''}
        ${serviceStr ? `<p><strong>Service Needed:</strong> ${escapeHtml(serviceStr)}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(messageStr).replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Received at: ${new Date().toISOString()} | Ref: ${escapeHtml(requestId)}</small></p>
      `,
      replyTo: emailStr,
    };

    log('sending_support_email');
    const supportResult = await sendMail(supportMail, requestId);
    log('support_email_sent', { provider: supportResult.provider, messageId: supportResult.id });
    rememberSubmission(submissionKey, requestId);

    const webhookResult = await sendLeadWebhook(
      {
        submissionId: requestId,
        submittedAt: new Date().toISOString(),
        source: 'webadish-com-contact',
        name: nameStr,
        email: emailStr,
        phone: phoneStr,
        service: serviceStr,
        website: '',
        message: messageStr,
        landingPage: returnTo,
        referrer: typeof req?.headers?.referer === 'string' ? req.headers.referer : '',
        utm: {},
        flags,
      },
      requestId,
    );
    log('lead_webhook_result', webhookResult);

    const confirmationMail: OutboundMail = isLeadMagnet
      ? buildChecklistMail(emailStr, nameStr)
      : {
          to: emailStr,
          subject: 'We received your message - WebAdish',
          html: `
            <h2>Thank you for contacting WebAdish!</h2>
            <p>Hi ${escapeHtml(nameStr)},</p>
            <p>We've received your message and our team will get back to you within 4 business hours.</p>
            <p>For urgent issues (site hacked), please call us directly at <strong>+91 999 875 7045</strong>.</p>
            <p>Best regards,<br>WebAdish Team</p>
          `,
        };

    if (!flags.length) {
      void sendMail(confirmationMail, requestId)
        .then((confirmResult) => {
          log('confirmation_email_sent', { provider: confirmResult.provider, messageId: confirmResult.id });
        })
        .catch((confirmationError) => {
          log('confirmation_email_failed_continue', {
            error: confirmationError instanceof Error ? confirmationError.message : String(confirmationError),
          });
        });
    } else {
      log('confirmation_email_skipped_flagged_submission', { flags });
    }

    log('completed_success');
    if (acceptsHtml) {
      return respondRedirect(res, returnTo, 'success', requestId, 'Thanks. Your request was submitted successfully. We will reply within 4 business hours.');
    }
    res.status(200).json({ success: true, message: 'Email sent successfully', request_id: requestId });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`[contact:${requestId}] failed`, errorMsg);
    if (acceptsHtml) {
      const fallbackReturnTo = normalizeReturnTo(normalizeBody(req).return_to);
      return respondRedirect(res, fallbackReturnTo, 'error', requestId, 'We could not submit your request just now. Please call +91 9998757045.');
    }
    res.status(500).json({ error: 'Failed to send message. Please try again in a minute.', request_id: requestId });
  }
}

function buildRequestId(req: any): string {
  const vercelId = typeof req?.headers?.['x-vercel-id'] === 'string' ? req.headers['x-vercel-id'] : '';
  if (vercelId) return `vr_${vercelId.replace(/[^a-zA-Z0-9:_-]/g, '').slice(0, 80)}`;
  return `rq_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeBody(req: any): Record<string, any> {
  const body = req?.body;
  if (body && typeof body === 'object' && !Array.isArray(body)) return body;
  if (typeof body === 'string') {
    const trimmed = body.trim();
    if (!trimmed) return {};
    try {
      return JSON.parse(trimmed);
    } catch {
      const params = new URLSearchParams(trimmed);
      return Object.fromEntries(params.entries());
    }
  }
  return {};
}

function normalizeReturnTo(value: unknown): string {
  if (typeof value !== 'string') return '/contact';
  const trimmed = value.trim();
  if (!trimmed || !trimmed.startsWith('/') || trimmed.startsWith('//')) return '/contact';
  if (trimmed.includes('\n') || trimmed.includes('\r')) return '/contact';
  return trimmed;
}

function respondRedirect(
  res: any,
  returnTo: string,
  status: 'success' | 'error',
  requestId: string,
  message: string,
) {
  const url = new URL(returnTo, 'https://www.webadish.com');
  url.searchParams.set('contact_status', status);
  url.searchParams.set('contact_ref', requestId);
  url.searchParams.set('contact_msg', message);
  const location = `${url.pathname}${url.search}${url.hash}`;

  return res.status(303).setHeader('Location', location).send('');
}

function buildSubmissionKey(input: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}): string {
  return crypto
    .createHash('sha256')
    .update(
      [
        input.name.trim().toLowerCase(),
        input.email.trim().toLowerCase(),
        input.phone.replace(/\s+/g, ''),
        input.service.trim().toLowerCase(),
        input.message.trim().replace(/\s+/g, ' ').toLowerCase(),
      ].join('|'),
    )
    .digest('hex');
}

function getRecentSubmission(key: string): { requestId: string; submittedAt: number } | null {
  pruneRecentSubmissions();
  return RECENT_SUBMISSIONS.get(key) || null;
}

function rememberSubmission(key: string, requestId: string) {
  pruneRecentSubmissions();
  RECENT_SUBMISSIONS.set(key, { requestId, submittedAt: Date.now() });
}

function pruneRecentSubmissions() {
  const cutoff = Date.now() - DUPLICATE_WINDOW_MS;
  for (const [key, value] of RECENT_SUBMISSIONS.entries()) {
    if (value.submittedAt < cutoff) {
      RECENT_SUBMISSIONS.delete(key);
    }
  }
}

type OutboundMail = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

type MailSendResult = {
  id: string;
  provider: 'resend' | 'smtp';
};

async function sendMail(mail: OutboundMail, requestId: string): Promise<MailSendResult> {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  try {
    const result = await sendViaResend(mail, requestId);
    return { ...result, provider: 'resend' };
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.error(`[contact:${requestId}] resend_failed to=${mail.to} reason=${reason}`);
    throw new Error(`Resend failed: ${reason}`);
  }
}

async function sendViaResend(mail: OutboundMail, requestId: string): Promise<{ id: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY is missing');

  const from = process.env.RESEND_FROM_EMAIL || process.env.SMTP_FROM_EMAIL || 'noreply@webadish.com';
  const payload: Record<string, unknown> = {
    from,
    to: [mail.to],
    subject: mail.subject,
    html: mail.html,
    tags: [{ name: 'source', value: 'webadish-contact' }, { name: 'request_id', value: requestId.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 64) }],
  };
  if (mail.replyTo) payload.reply_to = mail.replyTo;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const reason = typeof data?.message === 'string' ? data.message : `HTTP ${response.status}`;
    throw new Error(`Resend failed: ${reason}`);
  }

  return { id: typeof data?.id === 'string' ? data.id : 'unknown' };
}


function buildChecklistMail(to: string, name: string): OutboundMail {
  const section = (title: string, items: string[]) => `
    <h3 style="margin:24px 0 8px;">${escapeHtml(title)}</h3>
    <ul style="margin:0; padding-left:20px;">
      ${items.map((item) => `<li style="margin-bottom:8px; line-height:1.5;">${escapeHtml(item)}</li>`).join('')}
    </ul>
  `;

  return {
    to,
    subject: 'Your WordPress Hack Recovery Checklist - WebAdish',
    html: `
      <h2>Hi ${escapeHtml(name)}, here's your recovery checklist</h2>
      <p>This is the same triage sequence our team used to recover 263 WordPress sites across three servers in one engagement — including two database-trigger backdoors most cleanups miss entirely.</p>
      ${section('1. Immediate Triage (first 30 minutes)', [
        "Take a full backup of the site in its current (infected) state before changing anything.",
        "Put the site in maintenance mode or restrict public access if it's actively serving malware or spam redirects.",
        'Change all WordPress admin, hosting, FTP/SFTP, and database passwords — assume every credential is compromised.',
        "Check wp-admin for unfamiliar administrator accounts and remove access immediately (document first, don't delete yet).",
      ])}
      ${section('2. Find the Real Entry Point', [
        'Check file modification timestamps against your last known-clean state to isolate when the breach started.',
        'Diff core WordPress files, active theme, and plugin files against clean copies from wordpress.org.',
        'Search for suspicious PHP functions (base64_decode, eval, gzinflate, create_function) in uploads and theme directories.',
        "Check wp_options and wp_usermeta for injected admin users, rogue capabilities, or cron jobs you didn't create.",
        'Review database triggers — these survive a plugin/theme wipe and are a common reason sites reinfect within days of a "clean" scan.',
      ])}
      ${section('3. Clean and Verify', [
        "Remove malicious code at the source, not just the symptom — a redirect script isn't the problem if the backdoor recreating it is still there.",
        'Reinstall WordPress core, theme, and all plugins from official sources rather than hand-editing infected files.',
        "Re-scan after cleanup using a different method than the one that found the infection.",
        'Request Google Safe Browsing, Search Console, and blacklist (McAfee, Sucuri, Norton) review once confirmed clean.',
      ])}
      ${section("4. Harden So It Doesn't Come Back", [
        'Enforce 2FA for every admin and editor account, no exceptions.',
        'Set a firewall rule blocking direct PHP execution from /uploads/.',
        'Rotate all API keys, salts (in wp-config.php), and third-party service tokens.',
        'Put the site on a monitored update and audit cadence — a one-time cleanup without ongoing oversight is why most sites reinfect within 90 days.',
      ])}
      <p style="margin-top:24px;">Want the full story behind this checklist? <a href="https://www.webadish.com/case-studies/agency-portfolio-recovery">Read the 263-site recovery case study</a>.</p>
      <p>If your site is compromised right now, don't wait — <a href="https://www.webadish.com/hacked-site-recovery">get emergency help</a> or call <strong>+91 999 875 7045</strong>.</p>
      <p>Best regards,<br>WebAdish Team</p>
    `,
  };
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function countLetters(value: string): number {
  return (value.match(/\p{L}/gu) || []).length;
}

function countWords(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function looksLikeRealName(value: string): boolean {
  if (typeof value !== 'string') return false;
  if (value.length < 2 || value.length > 80) return false;
  if (!/^[\p{L}\s.''-]+$/u.test(value)) return false;
  return countLetters(value) >= 2;
}

function looksLikeRealPhone(value: string): boolean {
  if (!value) return true;
  const normalized = value.replace(/[^\d+]/g, '');
  return normalized.length >= 7 && normalized.length <= 16;
}

function getBlockedSpamReason(input: {
  flags: string[];
  emailDomain: string;
  message: string;
  hasTurnstileToken: boolean;
}): string | null {
  const flags = new Set(input.flags);
  const linkCount = countUrls(input.message);
  const riskyLinkCount = countRiskyLinks(input.message);
  const riskyEmailTld = RISKY_LINK_TLDS.some((suffix) => input.emailDomain.endsWith(suffix));

  // Hard block on honeypot - no reason for a human to fill this
  if (flags.has('honeypot')) {
    return 'honeypot';
  }

  // Hard block: surveillance / stalkerware / unauthorized account-access requests
  if (flags.has('surveillance_request')) {
    return 'surveillance_request';
  }

  // Hard block on Cyrillic for this specific business context (India/UK/Global English)
  if (flags.has('cyrillic') && (riskyEmailTld || riskyLinkCount > 0 || flags.has('spam_pattern'))) {
    return 'cyrillic_spam';
  }

  if (flags.has('spam_pattern') && (flags.has('disposable_email') || riskyLinkCount > 0 || linkCount >= 2 || riskyEmailTld)) {
    return 'spam_pattern_plus_links';
  }

  if (flags.has('turnstile_invalid') && flags.has('spam_pattern') && (flags.has('timing_fast') || !input.hasTurnstileToken)) {
    return 'turnstile_failed_spam';
  }

  if (flags.has('timing_fast') && flags.has('spam_pattern') && riskyLinkCount > 0) {
    return 'fast_link_spam';
  }

  return null;
}

function countUrls(value: string): number {
  return (value.match(/https?:\/\/[^\s<>"')]+/gi) || []).length;
}

function countRiskyLinks(value: string): number {
  const matches = value.match(/https?:\/\/[^\s<>"')]+/gi) || [];
  return matches.filter((url) => RISKY_LINK_TLDS.some((suffix) => url.toLowerCase().includes(suffix))).length;
}

async function verifyTurnstileToken(token: string, req: any): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const forwarded = req.headers['x-forwarded-for'];
  const remoteIp = Array.isArray(forwarded) ? forwarded[0] : typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '';

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token, remoteip: remoteIp }),
  });

  if (!response.ok) return false;
  const data = await response.json();
  return Boolean(data.success);
}
