import React, { useMemo, useState } from 'react';
import { ToolToolbar } from '../components/ToolActionsBar';

const inputCls =
  'w-full rounded-lg border border-white/[0.1] bg-[#060911] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none';
const monoAreaCls =
  'w-full rounded-lg border border-white/[0.1] bg-[#060911] p-3.5 font-mono text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none leading-relaxed';
const btnCls =
  'rounded-lg border border-white/[0.1] bg-[#111829] px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-violet-500/60 hover:text-white whitespace-nowrap shrink-0';

/* 28. Meta Tag & OpenGraph Generator */
export const MetaTagGeneratorTool: React.FC = () => {
  const [title, setTitle] = useState('AI Tools Hub – 54+ Browser Utilities & Converters');
  const [description, setDescription] = useState(
    'Fast, privacy-first web utilities for JSON, CSV, SEO metadata, QR codes, YouTube creators, and calculators.'
  );
  const [url, setUrl] = useState('https://aitoolshub.example/');
  const [image, setImage] = useState('https://aitoolshub.example/og-card.png');
  const [robots, setRobots] = useState('index, follow');

  const html = useMemo(() => {
    const esc = (s: string) => s.replace(/"/g, '&quot;');
    return [
      `<title>${title}</title>`,
      `<meta name="description" content="${esc(description)}" />`,
      `<meta name="robots" content="${robots}" />`,
      url ? `<link rel="canonical" href="${esc(url)}" />` : '',
      `<meta property="og:type" content="website" />`,
      `<meta property="og:title" content="${esc(title)}" />`,
      `<meta property="og:description" content="${esc(description)}" />`,
      url ? `<meta property="og:url" content="${esc(url)}" />` : '',
      image ? `<meta property="og:image" content="${esc(image)}" />` : '',
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${esc(title)}" />`,
      `<meta name="twitter:description" content="${esc(description)}" />`,
      image ? `<meta name="twitter:image" content="${esc(image)}" />` : '',
    ]
      .filter(Boolean)
      .join('\n');
  }, [title, description, url, image, robots]);

  return (
    <div className="space-y-5">
      <ToolToolbar
        copyText={html}
        downloadText={html}
        downloadFilename="meta-tags.html"
        downloadMime="text/html;charset=utf-8"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Page Title</span>
              <span className={`font-mono tabular-nums ${title.length > 60 ? 'text-amber-300' : 'text-slate-400'}`}>
                {title.length} / 60 chars
              </span>
            </div>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Meta Description</span>
              <span className={`font-mono tabular-nums ${description.length > 160 ? 'text-amber-300' : 'text-slate-400'}`}>
                {description.length} / 160 chars
              </span>
            </div>
            <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className={inputCls} />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs text-slate-300 mb-1">Canonical URL</label>
              <input value={url} onChange={(e) => setUrl(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">Robots Directive</label>
              <select value={robots} onChange={(e) => setRobots(e.target.value)} className={inputCls}>
                <option value="index, follow">index, follow</option>
                <option value="noindex, follow">noindex, follow</option>
                <option value="noindex, nofollow">noindex, nofollow</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-300 mb-1">OpenGraph Image URL</label>
            <input value={image} onChange={(e) => setImage(e.target.value)} className={inputCls} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-white/[0.08] bg-[#060911] p-4">
            <div className="text-[11px] font-medium text-slate-400 mb-2">Google Search Snippet Preview</div>
            <div className="text-xs text-emerald-400 truncate">{url || 'https://example.com/'}</div>
            <div className="mt-1 text-base font-medium text-violet-300 line-clamp-1">{title || 'Untitled Page'}</div>
            <p className="mt-1 text-xs text-slate-300 line-clamp-2 leading-relaxed">
              {description || 'Add a meta description to preview your search snippet.'}
            </p>
          </div>
          <textarea rows={8} value={html} readOnly className={monoAreaCls} />
        </div>
      </div>
    </div>
  );
};

/* 29. Schema.org JSON-LD Generator */
export const SchemaJsonLdTool: React.FC = () => {
  const [schemaType, setSchemaType] = useState<'WebApplication' | 'Article' | 'FAQPage' | 'Organization'>('WebApplication');
  const [name, setName] = useState('AI Tools Hub');
  const [url, setUrl] = useState('https://aitoolshub.example');
  const [description, setDescription] = useState('All-in-one suite of fast, privacy-first browser utilities.');
  const [author, setAuthor] = useState('AI Tools Hub Editorial');
  const [faqRows, setFaqRows] = useState([
    { q: 'Are these tools free to use?', a: 'Yes, all browser-based utilities run locally at zero cost.' },
    { q: 'Is my data uploaded to a server?', a: 'No. Calculations and text formatting stay inside your browser.' },
  ]);

  const jsonLd = useMemo(() => {
    let payload: Record<string, unknown>;
    if (schemaType === 'FAQPage') {
      payload = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqRows
          .filter((r) => r.q.trim() && r.a.trim())
          .map((r) => ({
            '@type': 'Question',
            name: r.q.trim(),
            acceptedAnswer: { '@type': 'Answer', text: r.a.trim() },
          })),
      };
    } else if (schemaType === 'Article') {
      payload = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: name,
        description,
        author: { '@type': 'Person', name: author },
        mainEntityOfPage: url,
      };
    } else if (schemaType === 'Organization') {
      payload = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name,
        url,
        description,
      };
    } else {
      payload = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name,
        url,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        description,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      };
    }

    return `<script type="application/ld+json">\n${JSON.stringify(payload, null, 2)}\n</script>`;
  }, [schemaType, name, url, description, author, faqRows]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        copyText={jsonLd}
        downloadText={jsonLd}
        downloadFilename="schema-jsonld.html"
        extra={
          <div className="inline-flex rounded-lg border border-white/[0.1] bg-[#060911] p-1">
            {(['WebApplication', 'Article', 'FAQPage', 'Organization'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSchemaType(t)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                  schemaType === t ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-3">
          {schemaType !== 'FAQPage' ? (
            <>
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  {schemaType === 'Article' ? 'Headline' : 'Name'}
                </label>
                <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">URL</label>
                <input value={url} onChange={(e) => setUrl(e.target.value)} className={inputCls} />
              </div>
              {schemaType === 'Article' && (
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Author Name</label>
                  <input value={author} onChange={(e) => setAuthor(e.target.value)} className={inputCls} />
                </div>
              )}
              <div>
                <label className="block text-xs text-slate-300 mb-1">Description</label>
                <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className={inputCls} />
              </div>
            </>
          ) : (
            <div className="space-y-3">
              {faqRows.map((row, idx) => (
                <div key={idx} className="rounded-lg border border-white/[0.08] bg-[#060911] p-3 space-y-2">
                  <input
                    value={row.q}
                    onChange={(e) => {
                      const next = [...faqRows];
                      next[idx].q = e.target.value;
                      setFaqRows(next);
                    }}
                    placeholder="Question..."
                    className={inputCls}
                  />
                  <textarea
                    rows={2}
                    value={row.a}
                    onChange={(e) => {
                      const next = [...faqRows];
                      next[idx].a = e.target.value;
                      setFaqRows(next);
                    }}
                    placeholder="Answer..."
                    className={inputCls}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => setFaqRows((r) => [...r, { q: '', a: '' }])}
                className={btnCls}
              >
                + Add Question
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Generated JSON-LD Script</label>
          <textarea rows={12} value={jsonLd} readOnly className={monoAreaCls} />
        </div>
      </div>
    </div>
  );
};

/* 30. Robots.txt Generator */
export const RobotsTxtTool: React.FC = () => {
  const [userAgent, setUserAgent] = useState('*');
  const [allowPaths, setAllowPaths] = useState('/');
  const [disallowPaths, setDisallowPaths] = useState('/admin/\n/api/\n/private/');
  const [crawlDelay, setCrawlDelay] = useState('');
  const [sitemapUrl, setSitemapUrl] = useState('https://aitoolshub.example/sitemap.xml');

  const robotsTxt = useMemo(() => {
    const lines = [`User-agent: ${userAgent.trim() || '*'}`];
    allowPaths
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
      .forEach((p) => lines.push(`Allow: ${p}`));
    disallowPaths
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
      .forEach((p) => lines.push(`Disallow: ${p}`));
    if (crawlDelay.trim()) lines.push(`Crawl-delay: ${crawlDelay.trim()}`);
    if (sitemapUrl.trim()) {
      lines.push('');
      lines.push(`Sitemap: ${sitemapUrl.trim()}`);
    }
    return lines.join('\n');
  }, [userAgent, allowPaths, disallowPaths, crawlDelay, sitemapUrl]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onSample={() => {
          setUserAgent('*');
          setAllowPaths('/');
          setDisallowPaths('/wp-admin/\n/cart/\n/checkout/');
        }}
        copyText={robotsTxt}
        downloadText={robotsTxt}
        downloadFilename="robots.txt"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-300 mb-1">User-agent</label>
              <input value={userAgent} onChange={(e) => setUserAgent(e.target.value)} className={inputCls + ' font-mono'} />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">Crawl-delay (optional)</label>
              <input value={crawlDelay} onChange={(e) => setCrawlDelay(e.target.value)} placeholder="e.g. 5" className={inputCls + ' font-mono'} />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-300 mb-1">Allow Paths (1 per line)</label>
            <textarea rows={2} value={allowPaths} onChange={(e) => setAllowPaths(e.target.value)} className={monoAreaCls} />
          </div>
          <div>
            <label className="block text-xs text-slate-300 mb-1">Disallow Paths (1 per line)</label>
            <textarea rows={4} value={disallowPaths} onChange={(e) => setDisallowPaths(e.target.value)} className={monoAreaCls} />
          </div>
          <div>
            <label className="block text-xs text-slate-300 mb-1">Sitemap URL</label>
            <input value={sitemapUrl} onChange={(e) => setSitemapUrl(e.target.value)} className={inputCls + ' font-mono'} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">robots.txt Preview</label>
          <textarea rows={13} value={robotsTxt} readOnly className={monoAreaCls} />
        </div>
      </div>
    </div>
  );
};

/* 31. UTM Campaign URL Builder */
export const UtmLinkBuilderTool: React.FC = () => {
  const [baseUrl, setBaseUrl] = useState('https://aitoolshub.example/launch');
  const [source, setSource] = useState('newsletter');
  const [medium, setMedium] = useState('email');
  const [campaign, setCampaign] = useState('spring_product_update');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('cta_button');
  const [lowercase, setLowercase] = useState(true);

  const { builtUrl, error } = useMemo(() => {
    if (!baseUrl.trim()) return { builtUrl: '', error: 'Enter a destination URL.' };
    try {
      const urlObj = new URL(baseUrl.trim());
      const norm = (v: string) => (lowercase ? v.trim().toLowerCase() : v.trim());
      if (source.trim()) urlObj.searchParams.set('utm_source', norm(source));
      if (medium.trim()) urlObj.searchParams.set('utm_medium', norm(medium));
      if (campaign.trim()) urlObj.searchParams.set('utm_campaign', norm(campaign));
      if (term.trim()) urlObj.searchParams.set('utm_term', norm(term));
      if (content.trim()) urlObj.searchParams.set('utm_content', norm(content));
      return { builtUrl: urlObj.toString(), error: '' };
    } catch {
      return { builtUrl: '', error: 'Enter a valid absolute URL starting with https:// or http://' };
    }
  }, [baseUrl, source, medium, campaign, term, content, lowercase]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        copyText={builtUrl}
        extra={
          <label className="inline-flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
            <input type="checkbox" checked={lowercase} onChange={(e) => setLowercase(e.target.checked)} className="accent-violet-500" />
            Normalize UTM values to lowercase
          </label>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2 lg:col-span-3">
          <label className="block text-xs text-slate-300 mb-1">Destination URL *</label>
          <input value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} className={inputCls + ' font-mono'} />
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">utm_source *</label>
          <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="google, newsletter" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">utm_medium *</label>
          <input value={medium} onChange={(e) => setMedium(e.target.value)} placeholder="cpc, email, social" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">utm_campaign *</label>
          <input value={campaign} onChange={(e) => setCampaign(e.target.value)} placeholder="q2_launch" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">utm_term (optional)</label>
          <input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="paid keyword" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">utm_content (optional)</label>
          <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="header_link" className={inputCls} />
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-rose-500/40 bg-rose-950/30 px-3.5 py-2 text-xs text-rose-200">{error}</div>
      ) : (
        <div className="rounded-lg border border-white/[0.08] bg-[#060911] p-4">
          <div className="text-xs text-slate-400 mb-1.5">Generated Tracking URL</div>
          <div className="font-mono text-xs sm:text-sm text-violet-300 break-all">{builtUrl}</div>
        </div>
      )}
    </div>
  );
};

/* 32. Keyword Density Checker */
const DENSITY_STOP = new Set([
  'the', 'and', 'for', 'that', 'this', 'with', 'you', 'your', 'from', 'are', 'was', 'were',
  'have', 'has', 'had', 'not', 'but', 'can', 'will', 'all', 'our', 'into', 'about', 'what',
  'when', 'which', 'how', 'more', 'than', 'then', 'only', 'some', 'use', 'using', 'into',
]);

export const KeywordDensityTool: React.FC = () => {
  const [text, setText] = useState(
    'Browser tools make JSON formatting and CSV conversion fast. When browser tools run locally, JSON formatting never exposes private payloads. Fast CSV conversion helps developers inspect spreadsheets cleanly.'
  );
  const [ngram, setNgram] = useState<1 | 2 | 3>(1);
  const [excludeStop, setExcludeStop] = useState(true);

  const { rows, totalWords } = useMemo(() => {
    const words = text
      .toLowerCase()
      .replace(/[^a-z0-9\s'-]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 1);

    const counts: Record<string, number> = {};
    for (let i = 0; i <= words.length - ngram; i++) {
      const slice = words.slice(i, i + ngram);
      if (excludeStop && slice.every((w) => DENSITY_STOP.has(w))) continue;
      if (ngram === 1 && excludeStop && DENSITY_STOP.has(slice[0])) continue;
      const phrase = slice.join(' ');
      counts[phrase] = (counts[phrase] || 0) + 1;
    }

    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([phrase, count]) => ({
        phrase,
        count,
        density: words.length ? (count / words.length) * 100 : 0,
      }));

    return { rows: sorted, totalWords: words.length };
  }, [text, ngram, excludeStop]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onClear={() => setText('')}
        copyText={rows.map((r) => `${r.phrase}: ${r.count} (${r.density.toFixed(2)}%)`).join('\n')}
        extra={
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-lg border border-white/[0.1] bg-[#060911] p-1">
              {([1, 2, 3] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setNgram(n)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                    ngram === n ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {n}-Word
                </button>
              ))}
            </div>
            <label className="inline-flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
              <input type="checkbox" checked={excludeStop} onChange={(e) => setExcludeStop(e.target.checked)} className="accent-violet-500" />
              Exclude Stop Words
            </label>
          </div>
        }
      />

      <textarea rows={6} value={text} onChange={(e) => setText(e.target.value)} className={inputCls} />

      <div className="rounded-lg border border-white/[0.08] bg-[#060911] p-4">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
          <span>Top {ngram}-Word Phrases</span>
          <span className="font-mono tabular-nums">{totalWords} total analyzed words</span>
        </div>
        {rows.length === 0 ? (
          <p className="text-xs text-slate-500">Enter text above to inspect keyword frequency.</p>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] text-slate-400">
                <th className="py-2 pr-4">Phrase</th>
                <th className="py-2 pr-4 text-right">Occurrences</th>
                <th className="py-2 text-right">Density</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {rows.map((r) => (
                <tr key={r.phrase}>
                  <td className="py-2 pr-4 text-slate-200 font-medium">{r.phrase}</td>
                  <td className="py-2 pr-4 text-right font-mono tabular-nums text-slate-300">{r.count}</td>
                  <td className="py-2 text-right font-mono tabular-nums text-violet-300">{r.density.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

/* 33. SERP Title & Description Checker */
function measureTextPixels(text: string, font: string): number {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return text.length * 8;
  ctx.font = font;
  return Math.round(ctx.measureText(text).width);
}

export const SerpLengthCheckerTool: React.FC = () => {
  const [title, setTitle] = useState('AI Tools Hub – Free Browser Converters, Calculators & SEO Utilities');
  const [desc, setDesc] = useState(
    'Explore 54+ privacy-first browser utilities including Word Counter, JSON Formatter, QR Code Maker, and YouTube tools with zero paid APIs.'
  );
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  const titlePx = useMemo(() => measureTextPixels(title, '20px Arial, sans-serif'), [title]);
  const descPx = useMemo(() => measureTextPixels(desc, '14px Arial, sans-serif'), [desc]);

  const titleMaxPx = device === 'desktop' ? 580 : 520;
  const descMaxPx = device === 'desktop' ? 920 : 680;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.07]">
        <div className="inline-flex rounded-lg border border-white/[0.1] bg-[#060911] p-1">
          {(['desktop', 'mobile'] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDevice(d)}
              className={`rounded-md px-3 py-1 text-xs font-medium capitalize ${
                device === d ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {d} SERP
            </button>
          ))}
        </div>
        <span className="font-mono text-xs text-slate-400 tabular-nums">
          Title ~{titlePx}px / {titleMaxPx}px · Desc ~{descPx}px / {descMaxPx}px
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Title Tag</span>
              <span className={`font-mono tabular-nums ${titlePx > titleMaxPx ? 'text-rose-400' : 'text-emerald-400'}`}>
                {title.length} chars · {titlePx}px
              </span>
            </div>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Meta Description</span>
              <span className={`font-mono tabular-nums ${descPx > descMaxPx ? 'text-amber-300' : 'text-emerald-400'}`}>
                {desc.length} chars · {descPx}px
              </span>
            </div>
            <textarea rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} className={inputCls} />
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#060911] p-5">
          <div className="text-xs text-slate-400 mb-2">Simulated {device === 'desktop' ? 'Desktop' : 'Mobile'} Result</div>
          <div className={device === 'mobile' ? 'max-w-[360px]' : 'max-w-[600px]'}>
            <div className="text-xs text-emerald-400">https://aitoolshub.example › tools</div>
            <div className="mt-1 text-lg font-medium text-violet-300 truncate">{title || 'Page Title'}</div>
            <p className="mt-1 text-xs leading-relaxed text-slate-300 line-clamp-2">{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 34. XML Sitemap Generator */
export const SitemapXmlTool: React.FC = () => {
  const [urlsText, setUrlsText] = useState(
    'https://aitoolshub.example/\nhttps://aitoolshub.example/about\nhttps://aitoolshub.example/faq\nhttps://aitoolshub.example/contact'
  );
  const [changefreq, setChangefreq] = useState('weekly');
  const [priority, setPriority] = useState('0.8');
  const [lastmod, setLastmod] = useState(() => new Date().toISOString().slice(0, 10));

  const { xml, validCount, skippedCount } = useMemo(() => {
    const esc = (u: string) => u.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const seen = new Set<string>();
    const valid: string[] = [];
    let skipped = 0;

    for (const raw of urlsText.split(/\r?\n/)) {
      const trimmed = raw.trim();
      if (!trimmed) continue;
      try {
        const parsed = new URL(trimmed);
        const href = parsed.toString();
        if (!seen.has(href)) {
          seen.add(href);
          valid.push(href);
        }
      } catch {
        skipped++;
      }
    }

    const body = valid
      .map(
        (u) =>
          `  <url>\n    <loc>${esc(u)}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
      )
      .join('\n');

    return {
      xml: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`,
      validCount: valid.length,
      skippedCount: skipped,
    };
  }, [urlsText, changefreq, priority, lastmod]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onClear={() => setUrlsText('')}
        copyText={xml}
        downloadText={xml}
        downloadFilename="sitemap.xml"
        downloadMime="application/xml;charset=utf-8"
        extra={
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <select value={changefreq} onChange={(e) => setChangefreq(e.target.value)} className="rounded-md border border-white/[0.1] bg-[#060911] px-2 py-1 text-white">
              {['daily', 'weekly', 'monthly', 'yearly'].map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="rounded-md border border-white/[0.1] bg-[#060911] px-2 py-1 text-white font-mono">
              {['1.0', '0.8', '0.6', '0.5', '0.3'].map((p) => (
                <option key={p} value={p}>Priority {p}</option>
              ))}
            </select>
            <input type="date" value={lastmod} onChange={(e) => setLastmod(e.target.value)} className="rounded-md border border-white/[0.1] bg-[#060911] px-2 py-1 text-white font-mono" />
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Page URLs (1 per line · {validCount} valid{skippedCount > 0 ? `, ${skippedCount} invalid skipped` : ''})
          </label>
          <textarea rows={10} value={urlsText} onChange={(e) => setUrlsText(e.target.value)} className={monoAreaCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Generated sitemap.xml</label>
          <textarea rows={10} value={xml} readOnly className={monoAreaCls} />
        </div>
      </div>
    </div>
  );
};

/* 35. 301 Redirect Rule Generator */
export const HtaccessRedirectTool: React.FC = () => {
  const [serverType, setServerType] = useState<'apache' | 'nginx'>('apache');
  const [pairsText, setPairsText] = useState(
    '/old-blog-post, /guides/new-post\n/pricing-2024, /pricing\n/legacy-docs, https://docs.example.com/'
  );

  const rules = useMemo(() => {
    const rows = pairsText
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => l.split(/[,\t]+|\s+->\s+|\s{2,}/).map((p) => p.trim()))
      .filter((parts) => parts.length >= 2 && parts[0] && parts[1]);

    if (serverType === 'apache') {
      return rows
        .map(([from, to]) => {
          const normFrom = from.startsWith('/') ? from : `/${from}`;
          return `Redirect 301 ${normFrom} ${to}`;
        })
        .join('\n');
    }

    return rows
      .map(([from, to]) => {
        const normFrom = from.startsWith('/') ? from : `/${from}`;
        return `location = ${normFrom} {\n  return 301 ${to};\n}`;
      })
      .join('\n\n');
  }, [pairsText, serverType]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onClear={() => setPairsText('')}
        copyText={rules}
        downloadText={rules}
        downloadFilename={serverType === 'apache' ? '.htaccess' : 'redirects.conf'}
        extra={
          <div className="inline-flex rounded-lg border border-white/[0.1] bg-[#060911] p-1">
            {(['apache', 'nginx'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setServerType(s)}
                className={`rounded-md px-3 py-1 text-xs font-medium capitalize ${
                  serverType === s ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {s === 'apache' ? 'Apache .htaccess' : 'Nginx Config'}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Old Path, New Target (comma or tab separated)</label>
          <textarea rows={9} value={pairsText} onChange={(e) => setPairsText(e.target.value)} className={monoAreaCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Generated 301 Redirect Rules</label>
          <textarea rows={9} value={rules} readOnly className={monoAreaCls} />
        </div>
      </div>
    </div>
  );
};
