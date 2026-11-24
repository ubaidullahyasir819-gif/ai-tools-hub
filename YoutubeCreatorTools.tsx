import React, { useMemo, useState } from 'react';
import { ExternalLink, ImageOff, Plus, Trash2 } from 'lucide-react';
import { CopyButton, ToolToolbar } from '../components/ToolActionsBar';

const inputCls =
  'w-full rounded-lg border border-white/[0.1] bg-[#060911] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none';
const monoAreaCls =
  'w-full rounded-lg border border-white/[0.1] bg-[#060911] p-3.5 font-mono text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none leading-relaxed';
const btnCls =
  'rounded-lg border border-white/[0.1] bg-[#111829] px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-violet-500/60 hover:text-white whitespace-nowrap shrink-0';

/* 36. YouTube Thumbnail Downloader */
function extractYouTubeId(raw: string): string | null {
  const trimmed = raw.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const u = new URL(trimmed);
    if (u.hostname.includes('youtu.be')) {
      const seg = u.pathname.replace(/^\//, '').split('/')[0];
      return /^[a-zA-Z0-9_-]{11}$/.test(seg) ? seg : null;
    }
    const v = u.searchParams.get('v');
    if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
    const match = u.pathname.match(/\/(?:shorts|embed|live|v)\/([a-zA-Z0-9_-]{11})/);
    if (match) return match[1];
  } catch {
    return null;
  }
  return null;
}

export const YoutubeThumbnailTool: React.FC = () => {
  const [url, setUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const videoId = useMemo(() => extractYouTubeId(url), [url]);

  const variants = useMemo(() => {
    if (!videoId) return [];
    return [
      { key: 'maxresdefault', label: 'Max Resolution (1280 × 720)', url: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` },
      { key: 'sddefault', label: 'Standard Definition (640 × 480)', url: `https://i.ytimg.com/vi/${videoId}/sddefault.jpg` },
      { key: 'hqdefault', label: 'High Quality (480 × 360)', url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` },
      { key: 'mqdefault', label: 'Medium Quality (320 × 180)', url: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg` },
    ];
  }, [videoId]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            YouTube Video URL, Shorts Link, or 11-Character Video ID
          </label>
          <input
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setFailedImages({});
            }}
            placeholder="https://www.youtube.com/watch?v=..."
            className={inputCls + ' font-mono'}
          />
        </div>
        {videoId && (
          <div className="rounded-lg border border-white/[0.08] bg-[#060911] px-3.5 py-2.5 text-xs font-mono text-violet-300 shrink-0">
            ID: {videoId}
          </div>
        )}
      </div>

      {!videoId ? (
        <div className="rounded-lg border border-rose-500/40 bg-rose-950/30 px-4 py-3 text-xs text-rose-200">
          Enter a valid YouTube link (`youtube.com/watch?v=...`, `youtu.be/...`, `/shorts/...`) or 11-character video ID.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {variants.map((v) => (
            <div key={v.key} className="rounded-xl border border-white/[0.08] bg-[#060911] overflow-hidden">
              <div className="aspect-video bg-[#080C16] flex items-center justify-center relative">
                {failedImages[v.key] ? (
                  <div className="flex flex-col items-center gap-2 text-xs text-slate-500 px-4 text-center">
                    <ImageOff className="h-5 w-5" aria-hidden="true" />
                    <span>{v.label} preview unavailable in this sandbox or video</span>
                  </div>
                ) : (
                  <img
                    src={v.url}
                    alt={`${videoId} ${v.label}`}
                    referrerPolicy="no-referrer"
                    onError={() => setFailedImages((prev) => ({ ...prev, [v.key]: true }))}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="p-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06]">
                <span className="text-xs font-medium text-slate-200">{v.label}</span>
                <div className="flex items-center gap-2">
                  <CopyButton text={v.url} label="Copy URL" />
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={btnCls + ' inline-flex items-center gap-1'}
                  >
                    <span>Open</span>
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* 37. YouTube Tag & Keyword Formatter */
export const YoutubeTagFormatterTool: React.FC = () => {
  const [rawTags, setRawTags] = useState(
    'typescript tutorial, web dev, TypeScript Tutorial, react 19 guide, static site deployment, web dev, tailwind css v4'
  );

  const { cleanedTags, formattedComma, hashtags, charCount, overLimit } = useMemo(() => {
    const items = rawTags
      .split(/[,\n]+/)
      .map((t) => t.trim().replace(/\s+/g, ' '))
      .filter(Boolean);

    const seen = new Set<string>();
    const unique: string[] = [];
    for (const item of items) {
      const key = item.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    }

    // Approximate YouTube studio budget: chars + commas + quotes around multi-word tags
    const studioChars = unique.reduce((acc, t, idx) => {
      const quoted = t.includes(' ') ? t.length + 2 : t.length;
      return acc + quoted + (idx > 0 ? 1 : 0);
    }, 0);

    const tags = unique.join(', ');
    const hash = unique
      .slice(0, 15)
      .map(
        (t) =>
          '#' +
          t
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .split(/\s+/)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join('')
      )
      .join(' ');

    return {
      cleanedTags: unique,
      formattedComma: tags,
      hashtags: hash,
      charCount: studioChars,
      overLimit: studioChars > 500,
    };
  }, [rawTags]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onClear={() => setRawTags('')}
        copyText={formattedComma}
        downloadText={`${formattedComma}\n\n${hashtags}`}
        downloadFilename="youtube-tags.txt"
        extra={
          <span className={`font-mono text-xs tabular-nums ${overLimit ? 'text-rose-400' : 'text-emerald-400'}`}>
            {charCount} / 500 Studio Tag Budget {overLimit ? '(Over Limit)' : ''}
          </span>
        }
      />

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1.5">
          Raw Tags (comma or newline separated — duplicates auto-removed)
        </label>
        <textarea rows={4} value={rawTags} onChange={(e) => setRawTags(e.target.value)} className={inputCls} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-white/[0.08] bg-[#060911] p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-200">
              Clean Comma-Separated Tags ({cleanedTags.length})
            </span>
            <CopyButton text={formattedComma} label="Copy Tags" />
          </div>
          <p className="font-mono text-xs text-slate-300 leading-relaxed">{formattedComma || '—'}</p>
        </div>

        <div className="rounded-lg border border-white/[0.08] bg-[#060911] p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-200">Description Hashtags (up to 15)</span>
            <CopyButton text={hashtags} label="Copy Hashtags" />
          </div>
          <p className="font-mono text-xs text-violet-300 leading-relaxed">{hashtags || '—'}</p>
        </div>
      </div>
    </div>
  );
};

/* 38. YouTube Chapter & Timestamp Builder */
interface ChapterRow {
  time: string;
  title: string;
}

function parseTimeSeconds(t: string): number | null {
  const parts = t.trim().split(':').map(Number);
  if (parts.some((n) => Number.isNaN(n) || n < 0)) return null;
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return null;
}

export const YoutubeTimestampTool: React.FC = () => {
  const [chapters, setChapters] = useState<ChapterRow[]>([
    { time: '00:00', title: 'Introduction & Overview' },
    { time: '01:15', title: 'Architecture & Static Setup' },
    { time: '04:40', title: 'Building Browser Utilities' },
    { time: '08:20', title: 'Final Deployment Checklist' },
  ]);

  const { formatted, warnings } = useMemo(() => {
    const warns: string[] = [];
    const validRows = chapters.filter((c) => c.time.trim() && c.title.trim());
    if (validRows.length < 3) warns.push('YouTube requires at least 3 chapters to activate the timeline.');
    if (validRows[0] && parseTimeSeconds(validRows[0].time) !== 0) {
      warns.push('The first chapter must start at 00:00.');
    }
    let prev = -1;
    for (let i = 0; i < validRows.length; i++) {
      const sec = parseTimeSeconds(validRows[i].time);
      if (sec === null) {
        warns.push(`Invalid timestamp format in row ${i + 1} (use MM:SS or HH:MM:SS).`);
        break;
      }
      if (i > 0 && sec <= prev) {
        warns.push(`Chapter ${i + 1} must be chronologically after chapter ${i}.`);
      } else if (i > 0 && sec - prev < 10) {
        warns.push(`Chapter ${i + 1} is under 10 seconds from the previous timestamp.`);
      }
      prev = sec;
    }

    return {
      formatted: validRows.map((c) => `${c.time.trim()} ${c.title.trim()}`).join('\n'),
      warnings: warns,
    };
  }, [chapters]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        copyText={formatted}
        downloadText={formatted}
        downloadFilename="youtube-chapters.txt"
        extra={
          <button
            type="button"
            onClick={() => setChapters((prev) => [...prev, { time: '10:00', title: 'New Section' }])}
            className={btnCls + ' inline-flex items-center gap-1'}
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Add Chapter</span>
          </button>
        }
      />

      {warnings.length > 0 && (
        <div className="rounded-lg border border-amber-500/40 bg-amber-950/25 px-4 py-2.5 text-xs text-amber-200 space-y-1">
          {warnings.map((w, i) => (
            <div key={i}>• {w}</div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2.5">
          {chapters.map((row, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                value={row.time}
                onChange={(e) => {
                  const next = [...chapters];
                  next[idx].time = e.target.value;
                  setChapters(next);
                }}
                placeholder="00:00"
                className="w-24 rounded-lg border border-white/[0.1] bg-[#060911] px-3 py-2 font-mono text-xs text-white"
              />
              <input
                value={row.title}
                onChange={(e) => {
                  const next = [...chapters];
                  next[idx].title = e.target.value;
                  setChapters(next);
                }}
                placeholder="Chapter title..."
                className={inputCls}
              />
              <button
                type="button"
                aria-label="Remove chapter"
                onClick={() => setChapters((prev) => prev.filter((_, i) => i !== idx))}
                className="h-9 w-9 shrink-0 inline-flex items-center justify-center rounded-lg border border-white/[0.08] text-slate-400 hover:text-rose-400"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Description Output</label>
          <textarea rows={7} value={formatted} readOnly className={monoAreaCls} />
        </div>
      </div>
    </div>
  );
};

/* 39. YouTube Title & Hook Analyzer */
export const YoutubeTitleAnalyzerTool: React.FC = () => {
  const [title, setTitle] = useState('How I Built 54 Fast Browser Tools With Zero Paid APIs (Full Walkthrough)');
  const [channel, setChannel] = useState('AI Tools Hub');

  const analysis = useMemo(() => {
    const trimmed = title.trim();
    const len = trimmed.length;
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const hasNumber = /\d/.test(trimmed);
    const hasBrackets = /[\[\(].*[\]\)]/.test(trimmed);
    const allCapsWords = trimmed.split(/\s+/).filter((w) => w.length > 2 && w === w.toUpperCase() && /[A-Z]/.test(w)).length;
    const mobileTruncated = len > 60;
    const desktopTruncated = len > 95;
    return { len, words, hasNumber, hasBrackets, allCapsWords, mobileTruncated, desktopTruncated };
  }, [title]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <label className="block text-xs text-slate-300 mb-1">Video Title Candidate</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">Channel Name (Preview)</label>
          <input value={channel} onChange={(e) => setChannel(e.target.value)} className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Characters', value: `${analysis.len} / 100` },
          { label: 'Mobile Cutoff (~60)', value: analysis.mobileTruncated ? 'Truncates' : 'Fits Cleanly' },
          { label: 'Numeric Anchor', value: analysis.hasNumber ? 'Present' : 'None' },
          { label: 'Bracket Qualifier', value: analysis.hasBrackets ? 'Present' : 'None' },
        ].map((m) => (
          <div key={m.label} className="rounded-lg border border-white/[0.08] bg-[#060911] px-3.5 py-3">
            <div className="text-xs text-slate-400">{m.label}</div>
            <div className="mt-1 font-mono text-sm font-semibold text-white">{m.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/[0.08] bg-[#060911] p-4">
          <div className="text-xs text-slate-400 mb-2">Mobile Home Feed Preview (~58 chars visible)</div>
          <div className="max-w-[340px] space-y-1.5">
            <div className="aspect-video rounded-lg bg-[#111829] border border-white/[0.06] flex items-center justify-center text-xs text-slate-500">
              16:9 Thumbnail Frame
            </div>
            <div className="text-sm font-semibold text-white">
              {title.length > 58 ? `${title.slice(0, 58).trimEnd()}...` : title || 'Untitled Video'}
            </div>
            <div className="text-xs text-slate-400">{channel} · 12K views · 2 hours ago</div>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#060911] p-4">
          <div className="text-xs text-slate-400 mb-2">Desktop Watch &amp; Search Preview</div>
          <div className="space-y-1.5">
            <div className="text-base font-semibold text-white leading-snug">
              {title.length > 95 ? `${title.slice(0, 95).trimEnd()}...` : title || 'Untitled Video'}
            </div>
            <div className="text-xs text-slate-400">{channel} · 12K views · 2 hours ago</div>
            <p className="pt-2 text-xs text-slate-300 leading-relaxed">
              Diagnostic notes: {analysis.mobileTruncated ? 'Your core hook extends past 60 characters—front-load the primary promise earlier.' : 'Fits cleanly inside mobile feed limits.'} {analysis.allCapsWords > 2 ? 'Avoid excessive ALL CAPS words.' : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 40. YouTube Description Formatter */
export const YoutubeDescriptionTemplateTool: React.FC = () => {
  const [hook, setHook] = useState(
    'Learn how to format JSON, generate QR codes, and build fast static browser utilities without paid APIs.'
  );
  const [chapters, setChapters] = useState('00:00 Intro\n01:30 Core Setup\n05:00 Deployment');
  const [links, setLinks] = useState('Website: https://aitoolshub.example\nDocumentation: https://aitoolshub.example/#/about');
  const [disclosure, setDisclosure] = useState(true);
  const [hashtags, setHashtags] = useState('#WebDev #StaticSite #Productivity');

  const compiled = useMemo(() => {
    const parts = [hook.trim()];
    if (chapters.trim()) parts.push(`⏱️ TIMESTAMPS\n${chapters.trim()}`);
    if (links.trim()) parts.push(`🔗 RESOURCES & LINKS\n${links.trim()}`);
    if (disclosure) {
      parts.push('Disclosure: Some links above may be affiliate or partner links at no additional cost to you.');
    }
    if (hashtags.trim()) parts.push(hashtags.trim());
    return parts.filter(Boolean).join('\n\n');
  }, [hook, chapters, links, disclosure, hashtags]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        copyText={compiled}
        downloadText={compiled}
        downloadFilename="youtube-description.txt"
        extra={
          <span className={`font-mono text-xs tabular-nums ${compiled.length > 5000 ? 'text-rose-400' : 'text-slate-400'}`}>
            {compiled.length} / 5,000 chars
          </span>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-slate-300 mb-1">Above-the-Fold Summary (First ~150 chars visible)</label>
            <textarea rows={3} value={hook} onChange={(e) => setHook(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs text-slate-300 mb-1">Timestamps</label>
            <textarea rows={3} value={chapters} onChange={(e) => setChapters(e.target.value)} className={monoAreaCls} />
          </div>
          <div>
            <label className="block text-xs text-slate-300 mb-1">Resources &amp; Links</label>
            <textarea rows={2} value={links} onChange={(e) => setLinks(e.target.value)} className={inputCls} />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <input value={hashtags} onChange={(e) => setHashtags(e.target.value)} placeholder="#Tags" className={inputCls + ' flex-1'} />
            <label className="inline-flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer shrink-0">
              <input type="checkbox" checked={disclosure} onChange={(e) => setDisclosure(e.target.checked)} className="accent-violet-500" />
              Affiliate Disclosure
            </label>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Formatted Description</label>
          <textarea rows={13} value={compiled} readOnly className={monoAreaCls} />
        </div>
      </div>
    </div>
  );
};

/* 41. Video File Size & Bitrate Calculator */
export const VideoBitrateCalculatorTool: React.FC = () => {
  const [minutes, setMinutes] = useState(12);
  const [seconds, setSeconds] = useState(30);
  const [videoMbps, setVideoMbps] = useState(12);
  const [audioKbps, setAudioKbps] = useState(384);
  const [uploadMbps, setUploadMbps] = useState(50);

  const stats = useMemo(() => {
    const totalSec = Math.max(0, minutes * 60 + seconds);
    const totalMbps = videoMbps + audioKbps / 1000;
    const totalMegabits = totalMbps * totalSec;
    const sizeMB = totalMegabits / 8;
    const sizeGB = sizeMB / 1000;
    const sizeGiB = (sizeMB * 1_000_000) / 1024 ** 3;
    const uploadSec = uploadMbps > 0 ? totalMegabits / uploadMbps : 0;
    return { totalSec, sizeMB, sizeGB, sizeGiB, uploadSec };
  }, [minutes, seconds, videoMbps, audioKbps, uploadMbps]);

  const presets = [
    { label: '1080p SDR (8 Mbps)', v: 8, a: 384 },
    { label: '1080p60 (12 Mbps)', v: 12, a: 384 },
    { label: '1440p60 (24 Mbps)', v: 24, a: 384 },
    { label: '4K60 SDR (68 Mbps)', v: 68, a: 512 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 pb-3 border-b border-white/[0.07]">
        {presets.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setVideoMbps(p.v);
              setAudioKbps(p.a);
            }}
            className={btnCls}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div>
          <label className="block text-xs text-slate-300 mb-1">Minutes</label>
          <input type="number" min={0} value={minutes} onChange={(e) => setMinutes(Number(e.target.value) || 0)} className={inputCls + ' font-mono'} />
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">Seconds</label>
          <input type="number" min={0} max={59} value={seconds} onChange={(e) => setSeconds(Number(e.target.value) || 0)} className={inputCls + ' font-mono'} />
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">Video (Mbps)</label>
          <input type="number" min={0.1} step={0.5} value={videoMbps} onChange={(e) => setVideoMbps(Number(e.target.value) || 0)} className={inputCls + ' font-mono'} />
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">Audio (kbps)</label>
          <input type="number" min={32} step={32} value={audioKbps} onChange={(e) => setAudioKbps(Number(e.target.value) || 0)} className={inputCls + ' font-mono'} />
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">Upload Speed (Mbps)</label>
          <input type="number" min={1} value={uploadMbps} onChange={(e) => setUploadMbps(Number(e.target.value) || 1)} className={inputCls + ' font-mono'} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'File Size (MB)', value: `${stats.sizeMB.toFixed(1)} MB` },
          { label: 'File Size (Decimal GB)', value: `${stats.sizeGB.toFixed(2)} GB` },
          { label: 'File Size (Binary GiB)', value: `${stats.sizeGiB.toFixed(2)} GiB` },
          {
            label: 'Est. Upload Time',
            value:
              stats.uploadSec >= 60
                ? `${Math.floor(stats.uploadSec / 60)}m ${Math.round(stats.uploadSec % 60)}s`
                : `${Math.round(stats.uploadSec)}s`,
          },
        ].map((card) => (
          <div key={card.label} className="rounded-lg border border-white/[0.08] bg-[#060911] px-4 py-3">
            <div className="text-xs text-slate-400">{card.label}</div>
            <div className="mt-1 font-mono text-lg font-semibold tabular-nums text-white">{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
