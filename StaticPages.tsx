import React, { useMemo, useState } from 'react';
import { CheckCircle2, ChevronDown, Mail, Search } from 'lucide-react';
import { useSeoMeta } from '../hooks/useSeoMeta';
import { AdPlacement } from '../components/AdPlacement';

const PageShell: React.FC<{
  title: string;
  subtitle: string;
  children: React.ReactNode;
}> = ({ title, subtitle, children }) => (
  <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
    <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
      {title}
    </h1>
    <p className="mt-3 text-base text-slate-300 leading-relaxed">{subtitle}</p>
    <div className="mt-8 space-y-6">{children}</div>
    <div className="mt-10">
      <AdPlacement variant="leaderboard" slotId="info-page-bottom" />
    </div>
  </div>
);

/* ABOUT PAGE */
export const AboutPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  useSeoMeta({
    title: 'About AI Tools Hub – Privacy-First Static Browser Utilities',
    description: 'Learn how AI Tools Hub delivers 54+ browser-local utilities, calculators, and converters without paid APIs or server uploads.',
  });

  return (
    <PageShell
      title="About AI Tools Hub"
      subtitle="A curated, static-first directory of 54+ practical tools engineered to execute directly inside your web browser."
    >
      <section className="rounded-xl border border-white/[0.08] bg-[#0B101D] p-6 space-y-3 text-sm text-slate-300 leading-relaxed">
        <h2 className="text-lg font-semibold text-white">Why We Built AI Tools Hub</h2>
        <p>
          Everyday tasks—cleaning duplicate lines, formatting JSON payloads, checking WCAG color contrast, generating Wi-Fi QR codes, or exporting a loan amortization schedule—should not require signing up for accounts, sitting behind popups, or uploading sensitive data to unknown third-party servers.
        </p>
        <p>
          AI Tools Hub consolidates seven core tool categories into a single unified dark workspace. Nearly every utility runs deterministically inside your browser via native JavaScript and Web Crypto APIs, making the entire platform fast, predictable, and deployable as a static website.
        </p>
      </section>

      <section className="rounded-xl border border-white/[0.08] bg-[#0B101D] p-6 space-y-3 text-sm text-slate-300 leading-relaxed">
        <h2 className="text-lg font-semibold text-white">Transparent AI API Boundary</h2>
        <p>
          Many web directories label ordinary regex scripts as "AI" or hide paid API calls behind unstable quotas. On AI Tools Hub, tools that require neural language models for full generative output (such as abstractive summarization or tone rewriting) are explicitly labeled <strong className="text-amber-300">AI API-Dependent</strong>.
        </p>
        <p>
          Because this site uses zero paid APIs and stores no API keys in frontend code, those labeled tools provide real local JavaScript heuristic engines—such as TF-IDF sentence ranking, static AST pattern inspection, and rule-based style cleanup—so they still deliver immediate, private utility offline.
        </p>
      </section>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="rounded-lg bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-violet-500"
        >
          Explore All Tools
        </button>
        <button
          type="button"
          onClick={() => onNavigate('/faq')}
          className="rounded-lg border border-white/[0.1] bg-[#0B101D] px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white"
        >
          Read Frequently Asked Questions
        </button>
      </div>
    </PageShell>
  );
};

/* CONTACT PAGE */
export const ContactPage: React.FC = () => {
  useSeoMeta({
    title: 'Contact | AI Tools Hub',
    description: 'Suggest a new browser utility, report a calculation bug, or ask a question about AI Tools Hub.',
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Tool Suggestion');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.trim().length < 10) {
      setError('Please enter your name, a valid email address, and a message of at least 10 characters.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <PageShell
      title="Contact Us"
      subtitle="Suggest a new browser utility, report an edge case, or inquire about sponsorship placements."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2 rounded-xl border border-white/[0.08] bg-[#0B101D] p-6">
          {submitted ? (
            <div className="py-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                <h2 className="text-base font-semibold text-white">Message Prepared</h2>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Thank you, {name}. Because AI Tools Hub runs as a static site without a remote form database, click below to open your email client with this message pre-filled, or reset the form.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`mailto:contact@aitoolshub.example?subject=${encodeURIComponent(`[${topic}] from ${name}`)}&body=${encodeURIComponent(message)}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-500"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Open in Email Client</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="rounded-lg border border-white/[0.1] px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
                >
                  Write Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {error && (
                <div className="rounded-lg border border-rose-500/40 bg-rose-950/30 px-3.5 py-2 text-xs text-rose-200">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full rounded-lg border border-white/[0.1] bg-[#060911] px-3.5 py-2.5 text-sm text-white focus:border-violet-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full rounded-lg border border-white/[0.1] bg-[#060911] px-3.5 py-2.5 text-sm text-white focus:border-violet-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Topic</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-lg border border-white/[0.1] bg-[#060911] px-3.5 py-2.5 text-sm text-white focus:border-violet-500 focus:outline-none"
                >
                  <option>Tool Suggestion</option>
                  <option>Bug Report</option>
                  <option>Advertising / Reserved Slot Inquiry</option>
                  <option>General Feedback</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Message</label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe the tool idea or issue..."
                  className="w-full rounded-lg border border-white/[0.1] bg-[#060911] px-3.5 py-2.5 text-sm text-white focus:border-violet-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-violet-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-violet-500"
              >
                Prepare Message
              </button>
            </form>
          )}
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#0B101D] p-6 space-y-4 text-xs text-slate-300">
          <h2 className="text-sm font-semibold text-white">Direct Channels</h2>
          <div>
            <div className="text-slate-400">Editorial &amp; Support</div>
            <div className="mt-1 font-mono text-violet-300">contact@aitoolshub.example</div>
          </div>
          <div>
            <div className="text-slate-400">Response Window</div>
            <div className="mt-1 text-slate-200">Typically within 2 business days</div>
          </div>
          <div>
            <div className="text-slate-400">Security Notes</div>
            <div className="mt-1 text-slate-400 leading-relaxed">
              Do not send passwords, private keys, or confidential tokens in support messages.
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

/* PRIVACY POLICY */
export const PrivacyPolicyPage: React.FC = () => {
  useSeoMeta({
    title: 'Privacy Policy | AI Tools Hub',
    description: 'Read how AI Tools Hub processes data locally in your browser with zero server-side document storage.',
  });

  return (
    <PageShell
      title="Privacy Policy"
      subtitle="Effective Date: November 2026 · Built for local browser execution."
    >
      {[
        {
          h: '1. Local-First Processing',
          p: 'All text, JSON, CSV, password, QR code, SEO, and calculator inputs entered on AI Tools Hub are processed locally in your browser memory using JavaScript and native Web APIs. We do not upload, log, or store your tool inputs on remote application servers.',
        },
        {
          h: '2. Browser Local Storage',
          p: 'AI Tools Hub uses your browser’s `localStorage` solely to remember your pinned Favorites and Recently Used tool slugs across visits. You can clear this data at any time from the Favorites page or via your browser settings.',
        },
        {
          h: '3. External Requests & YouTube Thumbnails',
          p: 'Most tools operate with zero external requests. When using the YouTube Thumbnail Downloader, your browser loads public thumbnail images directly from `i.ytimg.com` using the video ID you entered.',
        },
        {
          h: '4. Reserved Advertising Placements',
          p: 'Pages include clearly labeled reserved ad placement containers. If third-party ad networks are enabled by the site operator in the future, applicable cookie and consent notices will be presented prior to activation.',
        },
      ].map((sec) => (
        <section key={sec.h} className="rounded-xl border border-white/[0.08] bg-[#0B101D] p-6">
          <h2 className="text-base font-semibold text-white">{sec.h}</h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">{sec.p}</p>
        </section>
      ))}
    </PageShell>
  );
};

/* TERMS OF SERVICE */
export const TermsPage: React.FC = () => {
  useSeoMeta({
    title: 'Terms of Service | AI Tools Hub',
    description: 'Terms governing use of AI Tools Hub utilities, calculators, and static web resources.',
  });

  return (
    <PageShell
      title="Terms of Service"
      subtitle="Plain-language terms for using the browser utilities available on AI Tools Hub."
    >
      {[
        {
          h: '1. Permitted Use',
          p: 'AI Tools Hub provides free client-side utilities for personal, educational, and commercial workflows. You may export, copy, and use outputs generated from your own inputs without attribution requirements.',
        },
        {
          h: '2. Availability & "As-Is" Provision',
          p: 'All tools are provided "as is" and "as available" without warranties of uninterrupted availability or fitness for a specific regulatory purpose. Always verify critical outputs (such as server redirect rules, sitemaps, or financial amortization schedules) before deploying to production.',
        },
        {
          h: '3. Acceptable Conduct',
          p: 'You agree not to attempt automated denial-of-service scraping, bypass hosting protections, or use generated utilities for unlawful activities.',
        },
      ].map((sec) => (
        <section key={sec.h} className="rounded-xl border border-white/[0.08] bg-[#0B101D] p-6">
          <h2 className="text-base font-semibold text-white">{sec.h}</h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">{sec.p}</p>
        </section>
      ))}
    </PageShell>
  );
};

/* DISCLAIMER */
export const DisclaimerPage: React.FC = () => {
  useSeoMeta({
    title: 'Disclaimer | AI Tools Hub',
    description: 'Accuracy, financial, health, and AI API-dependent capability disclaimers for AI Tools Hub.',
  });

  return (
    <PageShell
      title="Disclaimer"
      subtitle="Important scope notes regarding calculators, health metrics, and AI API-dependent previews."
    >
      {[
        {
          h: 'Financial & Business Calculators',
          p: 'Loan EMI, Compound Interest, and Profit Margin calculators use standard mathematical formulas for educational planning. Actual lender APRs, taxes, fees, and compounding conventions may differ; consult a qualified financial advisor before making borrowing or investment decisions.',
        },
        {
          h: 'Health & Anthropometric Tools',
          p: 'The BMI & BMR/TDEE Calculator provides general population estimates using standard equations (Mifflin-St Jeor) and does not constitute medical advice, diagnosis, or treatment.',
        },
        {
          h: 'AI API-Dependent Tools',
          p: 'Utilities marked "AI API-Dependent" require an external server-side LLM API for full neural generation. On this static site, no paid APIs or frontend secrets are used—instead, these pages run transparent local JavaScript heuristic previews.',
        },
      ].map((sec) => (
        <section key={sec.h} className="rounded-xl border border-white/[0.08] bg-[#0B101D] p-6">
          <h2 className="text-base font-semibold text-white">{sec.h}</h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">{sec.p}</p>
        </section>
      ))}
    </PageShell>
  );
};

/* FAQ PAGE */
const GLOBAL_FAQS = [
  {
    q: 'Are all 54+ tools on AI Tools Hub really free to use?',
    a: 'Yes. Every browser-based utility runs locally on your device with no subscriptions, login walls, or daily usage caps.',
  },
  {
    q: 'Does AI Tools Hub store the text, JSON, or passwords I enter?',
    a: 'No. Calculations, formatting, hashing, and password generation execute inside your browser tab. Only your pinned Favorites and Recently Used tool slugs are saved locally in `localStorage`.',
  },
  {
    q: 'Why are some tools labeled "AI API-Dependent"?',
    a: 'Tasks like abstractive summarization or neural tone rewriting depend on large language models for full generative output. Because AI Tools Hub uses no paid APIs and never exposes API keys in frontend code, those tools are transparently labeled and run a real local JavaScript heuristic engine instead.',
  },
  {
    q: 'Can I host AI Tools Hub as a static site?',
    a: 'Yes. Running `npm run build` outputs a clean static bundle in `dist/` using hash-based routing (`#/tool/...`), compatible with GitHub Pages, Cloudflare Pages, Netlify, Vercel, or any S3 bucket.',
  },
  {
    q: 'How do I verify passwords generated here are cryptographically random?',
    a: 'Our Password Generator uses `window.crypto.getRandomValues` with rejection sampling rather than `Math.random()`, eliminating predictability and modulo bias.',
  },
  {
    q: 'Are the ad boxes on tool pages real ads?',
    a: 'No. They are clean, reserved placement containers (`728×90` and `300×250`) designed so layouts remain stable without displaying fake or deceptive ads.',
  },
];

export const FaqPage: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const structuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: GLOBAL_FAQS.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    }),
    []
  );

  useSeoMeta({
    title: 'Frequently Asked Questions | AI Tools Hub',
    description: 'Answers about browser privacy, local execution, AI API-dependent labeling, static hosting, and tool capabilities.',
    structuredData,
  });

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return GLOBAL_FAQS;
    return GLOBAL_FAQS.filter(
      (item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  }, [filter]);

  return (
    <PageShell
      title="Frequently Asked Questions"
      subtitle="Clear answers about how AI Tools Hub works, how your data is protected, and how AI API-dependent tools are labeled."
    >
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" aria-hidden="true" />
        <input
          type="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter questions..."
          className="w-full rounded-xl border border-white/[0.1] bg-[#0B101D] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none"
        />
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-[#0B101D] divide-y divide-white/[0.07]">
        {filtered.length === 0 ? (
          <p className="p-6 text-sm text-slate-400">No FAQ entries matched "{filter}".</p>
        ) : (
          filtered.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={item.q} className="p-5">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 text-left text-sm sm:text-base font-medium text-white"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-150 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">{item.a}</p>
                )}
              </div>
            );
          })
        )}
      </div>
    </PageShell>
  );
};
