import React, { useMemo, useState } from 'react';
import { CopyButton, DownloadButton, ToolToolbar } from '../components/ToolActionsBar';

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'that', 'this', 'with', 'you', 'your', 'from', 'are', 'was',
  'were', 'have', 'has', 'had', 'not', 'but', 'can', 'will', 'all', 'our', 'out',
  'into', 'about', 'there', 'their', 'they', 'what', 'when', 'which', 'who', 'how',
  'also', 'more', 'than', 'then', 'only', 'just', 'some', 'such', 'use', 'using',
]);

const inputCls =
  'w-full rounded-lg border border-white/[0.1] bg-[#060911] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none';
const monoAreaCls =
  'w-full rounded-lg border border-white/[0.1] bg-[#060911] p-3.5 font-mono text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none leading-relaxed';
const btnCls =
  'rounded-lg border border-white/[0.1] bg-[#111829] px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-violet-500/60 hover:text-white whitespace-nowrap shrink-0';

/* 1. Word Counter */
export const WordCounterTool: React.FC = () => {
  const [text, setText] = useState(
    'AI Tools Hub runs fast utilities right inside your browser.\n\nNo accounts, no server uploads, and instant feedback across every workflow. Paste any essay, article, or script here to inspect word count, reading time, and repeated keywords.'
  );

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
    const wordCount = words.length;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const sentences = trimmed
      ? trimmed.split(/[.!?]+(?=\s|$)/).filter((s) => s.trim().length > 0).length
      : 0;
    const paragraphs = trimmed
      ? trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
      : 0;
    const readingMins = wordCount === 0 ? 0 : Math.max(1, Math.ceil(wordCount / 225));
    const speakingMins = wordCount === 0 ? 0 : Math.max(1, Math.ceil(wordCount / 130));

    const freq: Record<string, number> = {};
    for (const raw of words) {
      const clean = raw.toLowerCase().replace(/[^a-z0-9'-]/g, '');
      if (clean.length > 2 && !STOP_WORDS.has(clean)) {
        freq[clean] = (freq[clean] || 0) + 1;
      }
    }
    const topKeywords = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    return {
      wordCount,
      chars,
      charsNoSpaces,
      sentences,
      paragraphs,
      readingMins,
      speakingMins,
      topKeywords,
    };
  }, [text]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onSample={() =>
          setText(
            'Static web applications deliver predictable speed and strong privacy guarantees. By executing text analysis, JSON formatting, and calculations locally in JavaScript, sensitive drafts never leave the user device.\n\nWriters, developers, and marketers can measure reading time, verify keyword balance, and export clean results instantaneously.'
          )
        }
        onClear={() => setText('')}
        copyText={text}
        downloadText={text}
        downloadFilename="word-counter-draft.txt"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: 'Words', value: stats.wordCount },
          { label: 'Characters', value: stats.chars },
          { label: 'No Spaces', value: stats.charsNoSpaces },
          { label: 'Sentences', value: stats.sentences },
          { label: 'Paragraphs', value: stats.paragraphs },
          { label: 'Read / Speak', value: `${stats.readingMins}m / ${stats.speakingMins}m` },
        ].map((item) => (
          <div key={item.label} className="rounded-lg border border-white/[0.08] bg-[#060911] px-3.5 py-3">
            <div className="text-xs text-slate-400">{item.label}</div>
            <div className="mt-1 font-mono text-lg font-semibold tabular-nums text-white">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <textarea
        rows={9}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        className={inputCls + ' leading-relaxed'}
      />

      {stats.topKeywords.length > 0 && (
        <div className="rounded-lg border border-white/[0.08] bg-[#060911] p-4">
          <h3 className="text-xs font-semibold text-slate-300">Top Keywords</h3>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {stats.topKeywords.map(([word, count]) => (
              <div
                key={word}
                className="flex items-center justify-between rounded-md border border-white/[0.06] bg-[#0B101D] px-3 py-1.5 text-xs"
              >
                <span className="truncate text-slate-200">{word}</span>
                <span className="font-mono tabular-nums text-violet-300">
                  {count} ({((count / Math.max(1, stats.wordCount)) * 100).toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* 2. Character Counter */
export const CharacterCounterTool: React.FC = () => {
  const [text, setText] = useState('AI Tools Hub – Fast browser utilities for developers, writers, and creators.');

  const metrics = useMemo(() => {
    const total = text.length;
    const noSpaces = text.replace(/\s/g, '').length;
    const lines = text ? text.split(/\r?\n/).length : 0;
    const bytes = new TextEncoder().encode(text).length;
    return { total, noSpaces, lines, bytes };
  }, [text]);

  const limits = [
    { name: 'SEO Meta Title', max: 60 },
    { name: 'SEO Meta Description', max: 160 },
    { name: 'X / Twitter Post', max: 280 },
    { name: 'SMS Single Segment', max: 160 },
    { name: 'LinkedIn Post', max: 3000 },
  ];

  return (
    <div className="space-y-4">
      <ToolToolbar
        onSample={() =>
          setText('Launch faster with 54+ privacy-first browser utilities for JSON, CSV, SEO metadata, QR codes, and calculators.')
        }
        onClear={() => setText('')}
        copyText={text}
        downloadText={text}
        downloadFilename="character-count.txt"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Characters', value: metrics.total },
          { label: 'Without Spaces', value: metrics.noSpaces },
          { label: 'UTF-8 Bytes', value: metrics.bytes },
          { label: 'Lines', value: metrics.lines },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-white/[0.08] bg-[#060911] px-3.5 py-3">
            <div className="text-xs text-slate-400">{stat.label}</div>
            <div className="mt-1 font-mono text-xl font-semibold tabular-nums text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      <textarea
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste headline, social post, or meta description..."
        className={inputCls}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {limits.map((lim) => {
          const pct = Math.min(100, Math.round((metrics.total / lim.max) * 100));
          const over = metrics.total > lim.max;
          return (
            <div key={lim.name} className="rounded-lg border border-white/[0.08] bg-[#060911] p-3.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">{lim.name}</span>
                <span className={`font-mono tabular-nums ${over ? 'text-rose-400' : 'text-slate-400'}`}>
                  {metrics.total} / {lim.max} {over ? '(Over)' : ''}
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full transition-all duration-150 ${over ? 'bg-rose-500' : 'bg-violet-500'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* 3. Case Converter */
export const CaseConverterTool: React.FC = () => {
  const [text, setText] = useState('building fast static web utilities for developers');

  const toTitleCase = (str: string) => {
    const minor = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet']);
    return str
      .toLowerCase()
      .split(/\b/)
      .map((part, idx, arr) => {
        if (!/[a-z0-9]/i.test(part)) return part;
        if (idx !== 0 && idx !== arr.length - 1 && minor.has(part)) return part;
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join('');
  };

  const toWords = (line: string) =>
    line
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/[_-]+/g, ' ')
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  const transformLines = (fn: (line: string) => string) => {
    setText((prev) => prev.split('\n').map(fn).join('\n'));
  };

  const actions = [
    { label: 'UPPERCASE', run: () => setText((t) => t.toUpperCase()) },
    { label: 'lowercase', run: () => setText((t) => t.toLowerCase()) },
    { label: 'Title Case', run: () => transformLines(toTitleCase) },
    {
      label: 'Sentence case',
      run: () =>
        setText((t) =>
          t
            .toLowerCase()
            .replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase())
        ),
    },
    {
      label: 'camelCase',
      run: () =>
        transformLines((line) => {
          const w = toWords(line);
          return w
            .map((word, idx) =>
              idx === 0
                ? word.toLowerCase()
                : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join('');
        }),
    },
    {
      label: 'PascalCase',
      run: () =>
        transformLines((line) =>
          toWords(line)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join('')
        ),
    },
    {
      label: 'snake_case',
      run: () =>
        transformLines((line) => toWords(line).map((w) => w.toLowerCase()).join('_')),
    },
    {
      label: 'kebab-case',
      run: () =>
        transformLines((line) => toWords(line).map((w) => w.toLowerCase()).join('-')),
    },
    {
      label: 'aLtErNaTiNg',
      run: () =>
        setText((t) =>
          t
            .split('')
            .map((ch, i) => (i % 2 === 0 ? ch.toLowerCase() : ch.toUpperCase()))
            .join('')
        ),
    },
  ];

  return (
    <div className="space-y-4">
      <ToolToolbar
        onSample={() => setText('user profile settings\napi response payload\nquarterly revenue report')}
        onClear={() => setText('')}
        copyText={text}
        downloadText={text}
        downloadFilename="converted-case.txt"
      />

      <div className="flex flex-wrap gap-2">
        {actions.map((act) => (
          <button key={act.label} type="button" onClick={act.run} className={btnCls}>
            {act.label}
          </button>
        ))}
      </div>

      <textarea
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or multiple lines to convert..."
        className={inputCls}
      />
    </div>
  );
};

/* 4. Text Diff Checker */
type DiffOp = { type: 'same' | 'add' | 'remove'; text: string };

function computeLineDiff(leftLines: string[], rightLines: string[]): DiffOp[] {
  const m = leftLines.length;
  const n = rightLines.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (leftLines[i] === rightLines[j]) {
        dp[i][j] = dp[i + 1][j + 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }
  const result: DiffOp[] = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (leftLines[i] === rightLines[j]) {
      result.push({ type: 'same', text: leftLines[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      result.push({ type: 'remove', text: leftLines[i] });
      i++;
    } else {
      result.push({ type: 'add', text: rightLines[j] });
      j++;
    }
  }
  while (i < m) result.push({ type: 'remove', text: leftLines[i++] });
  while (j < n) result.push({ type: 'add', text: rightLines[j++] });
  return result;
}

export const TextDiffCheckerTool: React.FC = () => {
  const [original, setOriginal] = useState(
    'name: AI Tools Hub\nmode: client-side\nversion: 1.0\ncache: disabled'
  );
  const [revised, setRevised] = useState(
    'name: AI Tools Hub\nmode: browser-local\nversion: 1.1\nprivacy: strict\ncache: enabled'
  );
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [trimSpaces, setTrimSpaces] = useState(false);

  const diff = useMemo(() => {
    const prep = (s: string) =>
      s.split(/\r?\n/).map((line) => {
        let out = trimSpaces ? line.trim() : line;
        if (ignoreCase) out = out.toLowerCase();
        return out;
      });
    return computeLineDiff(prep(original), prep(revised));
  }, [original, revised, ignoreCase, trimSpaces]);

  const counts = useMemo(
    () => ({
      added: diff.filter((d) => d.type === 'add').length,
      removed: diff.filter((d) => d.type === 'remove').length,
      same: diff.filter((d) => d.type === 'same').length,
    }),
    [diff]
  );

  const diffText = diff
    .map((d) => `${d.type === 'add' ? '+ ' : d.type === 'remove' ? '- ' : '  '}${d.text}`)
    .join('\n');

  return (
    <div className="space-y-4">
      <ToolToolbar
        onSample={() => {
          setOriginal('Line 1: Welcome\nLine 2: Old pricing $19\nLine 3: Support email');
          setRevised('Line 1: Welcome\nLine 2: Updated pricing $24\nLine 3: Support email\nLine 4: Live chat added');
        }}
        onClear={() => {
          setOriginal('');
          setRevised('');
        }}
        copyText={diffText}
        downloadText={diffText}
        downloadFilename="text-diff.patch"
        extra={
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 ml-1">
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={ignoreCase}
                onChange={(e) => setIgnoreCase(e.target.checked)}
                className="accent-violet-500"
              />
              Ignore Case
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={trimSpaces}
                onChange={(e) => setTrimSpaces(e.target.checked)}
                className="accent-violet-500"
              />
              Trim Whitespace
            </label>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Original Text</label>
          <textarea
            rows={7}
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            className={monoAreaCls}
            placeholder="Paste original text..."
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Revised Text</label>
          <textarea
            rows={7}
            value={revised}
            onChange={(e) => setRevised(e.target.value)}
            className={monoAreaCls}
            placeholder="Paste revised text..."
          />
        </div>
      </div>

      <div className="rounded-lg border border-white/[0.08] bg-[#060911] overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b border-white/[0.07] text-xs">
          <span className="font-semibold text-slate-200">Unified Line Comparison</span>
          <span className="font-mono tabular-nums text-slate-400">
            <span className="text-emerald-400">+{counts.added} added</span>
            <span className="mx-2 text-slate-600">·</span>
            <span className="text-rose-400">-{counts.removed} removed</span>
            <span className="mx-2 text-slate-600">·</span>
            <span>{counts.same} unchanged</span>
          </span>
        </div>
        <div className="max-h-80 overflow-y-auto font-mono text-xs divide-y divide-white/[0.03]">
          {diff.map((row, idx) => (
            <div
              key={idx}
              className={`px-4 py-1.5 whitespace-pre-wrap break-words ${
                row.type === 'add'
                  ? 'bg-emerald-950/35 text-emerald-200'
                  : row.type === 'remove'
                  ? 'bg-rose-950/35 text-rose-200'
                  : 'text-slate-300'
              }`}
            >
              <span className="inline-block w-5 select-none font-bold">
                {row.type === 'add' ? '+' : row.type === 'remove' ? '-' : ' '}
              </span>
              {row.text || ' '}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* 5. Duplicate Line Remover */
export const DuplicateLineRemoverTool: React.FC = () => {
  const [input, setInput] = useState(
    'apple@example.com\nbanana@example.com\nAPPLE@example.com\n\ncherry@example.com\nbanana@example.com'
  );
  const [caseInsensitive, setCaseInsensitive] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [sortAlpha, setSortAlpha] = useState(false);

  const { output, originalCount, uniqueCount, removedCount } = useMemo(() => {
    const rawLines = input.split(/\r?\n/);
    const seen = new Set<string>();
    const kept: string[] = [];

    for (const raw of rawLines) {
      const line = trimLines ? raw.trim() : raw;
      if (removeEmpty && line.length === 0) continue;
      const key = caseInsensitive ? line.toLowerCase() : line;
      if (!seen.has(key)) {
        seen.add(key);
        kept.push(line);
      }
    }

    if (sortAlpha) {
      kept.sort((a, b) => a.localeCompare(b));
    }

    return {
      output: kept.join('\n'),
      originalCount: rawLines.length,
      uniqueCount: kept.length,
      removedCount: rawLines.length - kept.length,
    };
  }, [input, caseInsensitive, trimLines, removeEmpty, sortAlpha]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onSample={() =>
          setInput('/pricing\n/about\n/pricing\n/contact\n/ABOUT\n/faq\n\n/contact')
        }
        onClear={() => setInput('')}
        copyText={output}
        downloadText={output}
        downloadFilename="deduplicated-lines.txt"
      />

      <div className="flex flex-wrap gap-4 text-xs text-slate-300">
        {[
          { label: 'Case-insensitive', checked: caseInsensitive, set: setCaseInsensitive },
          { label: 'Trim spaces', checked: trimLines, set: setTrimLines },
          { label: 'Remove blank lines', checked: removeEmpty, set: setRemoveEmpty },
          { label: 'Sort A–Z', checked: sortAlpha, set: setSortAlpha },
        ].map((opt) => (
          <label key={opt.label} className="inline-flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={opt.checked}
              onChange={(e) => opt.set(e.target.checked)}
              className="accent-violet-500"
            />
            {opt.label}
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Input Lines (<span className="font-mono tabular-nums">{originalCount}</span>)
          </label>
          <textarea rows={9} value={input} onChange={(e) => setInput(e.target.value)} className={monoAreaCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Unique Output (<span className="font-mono tabular-nums">{uniqueCount}</span> ·{' '}
            <span className="text-violet-300 font-mono tabular-nums">{removedCount} removed</span>)
          </label>
          <textarea rows={9} value={output} readOnly className={monoAreaCls} />
        </div>
      </div>
    </div>
  );
};

/* 6. Text Sorter & Reverser */
export const TextSorterReverserTool: React.FC = () => {
  const [text, setText] = useState('10. Deployment\n2. Architecture\n1. Discovery\n25. Post-launch review\n4. QA Testing');

  const applyLines = (fn: (lines: string[]) => string[]) => {
    const lines = text.split(/\r?\n/);
    setText(fn([...lines]).join('\n'));
  };

  const shuffleLines = (arr: string[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  return (
    <div className="space-y-4">
      <ToolToolbar
        onSample={() => setText('Zebra\nAlpha\nDelta\nBravo\nCharlie')}
        onClear={() => setText('')}
        copyText={text}
        downloadText={text}
        downloadFilename="sorted-text.txt"
      />

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => applyLines((l) => l.sort((a, b) => a.localeCompare(b)))} className={btnCls}>
          Sort A–Z
        </button>
        <button type="button" onClick={() => applyLines((l) => l.sort((a, b) => b.localeCompare(a)))} className={btnCls}>
          Sort Z–A
        </button>
        <button
          type="button"
          onClick={() =>
            applyLines((l) =>
              l.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
            )
          }
          className={btnCls}
        >
          Natural Numeric
        </button>
        <button type="button" onClick={() => applyLines((l) => l.sort((a, b) => a.length - b.length))} className={btnCls}>
          Shortest First
        </button>
        <button type="button" onClick={() => applyLines((l) => l.sort((a, b) => b.length - a.length))} className={btnCls}>
          Longest First
        </button>
        <button type="button" onClick={() => applyLines(shuffleLines)} className={btnCls}>
          Random Shuffle
        </button>
        <button type="button" onClick={() => applyLines((l) => l.reverse())} className={btnCls}>
          Reverse Line Order
        </button>
        <button type="button" onClick={() => setText((t) => t.split('').reverse().join(''))} className={btnCls}>
          Reverse Characters
        </button>
      </div>

      <textarea rows={9} value={text} onChange={(e) => setText(e.target.value)} className={monoAreaCls} />
    </div>
  );
};

/* 7. Lorem Ipsum Generator */
const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
  'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
  'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi',
  'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit',
  'voluptate', 'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt',
  'mollit', 'anim', 'id', 'est', 'laborum', 'arcu', 'cursus', 'vitae', 'congue', 'mauris',
];

export const LoremIpsumGeneratorTool: React.FC = () => {
  const [unit, setUnit] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [count, setCount] = useState(3);
  const [wrapHtml, setWrapHtml] = useState(false);
  const [startClassic, setStartClassic] = useState(true);
  const [seed, setSeed] = useState(1);

  const output = useMemo(() => {
    let idx = seed * 7;
    const nextWord = () => {
      idx = (idx + 1) % LOREM_WORDS.length;
      return LOREM_WORDS[idx];
    };
    const makeSentence = (isFirst: boolean, wordTarget = 12) => {
      if (isFirst && startClassic) {
        return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
      }
      const words = Array.from({ length: wordTarget }, () => nextWord());
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      return words.join(' ') + '.';
    };

    const safeCount = Math.max(1, Math.min(100, count));

    if (unit === 'words') {
      const words = Array.from({ length: safeCount }, (_, i) =>
        i < 5 && startClassic ? ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'][i] : nextWord()
      );
      return words.join(' ');
    }

    if (unit === 'sentences') {
      const sentences = Array.from({ length: safeCount }, (_, i) => makeSentence(i === 0, 10 + (i % 6)));
      return sentences.join(' ');
    }

    const paragraphs = Array.from({ length: safeCount }, (_, pIdx) => {
      const sCount = 4 + (pIdx % 2);
      const text = Array.from({ length: sCount }, (__, sIdx) =>
        makeSentence(pIdx === 0 && sIdx === 0, 10 + ((pIdx + sIdx) % 7))
      ).join(' ');
      return wrapHtml ? `<p>${text}</p>` : text;
    });
    return paragraphs.join('\n\n');
  }, [unit, count, wrapHtml, startClassic, seed]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.07]">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-lg border border-white/[0.1] bg-[#060911] p-1">
            {(['paragraphs', 'sentences', 'words'] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnit(u)}
                className={`rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors ${
                  unit === u ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {u}
              </button>
            ))}
          </div>

          <label className="inline-flex items-center gap-2 text-xs text-slate-300">
            <span>Count</span>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
              className="w-20 rounded-lg border border-white/[0.1] bg-[#060911] px-2.5 py-1.5 font-mono text-xs text-white"
            />
          </label>

          <label className="inline-flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={startClassic}
              onChange={(e) => setStartClassic(e.target.checked)}
              className="accent-violet-500"
            />
            Start with "Lorem ipsum"
          </label>

          {unit === 'paragraphs' && (
            <label className="inline-flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={wrapHtml}
                onChange={(e) => setWrapHtml(e.target.checked)}
                className="accent-violet-500"
              />
              Wrap in &lt;p&gt;
            </label>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setSeed((s) => s + 1)} className={btnCls}>
            Regenerate
          </button>
          <CopyButton text={output} label="Copy Text" />
          <DownloadButton content={output} filename={wrapHtml ? 'lorem-ipsum.html' : 'lorem-ipsum.txt'} />
        </div>
      </div>

      <textarea rows={10} value={output} readOnly className={inputCls + ' leading-relaxed'} />
    </div>
  );
};

/* 8. Find & Replace */
export const FindAndReplaceTool: React.FC = () => {
  const [source, setSource] = useState(
    'Order #1024 - Status: pending\nOrder #1025 - Status: pending\nOrder #1026 - Status: shipped'
  );
  const [findStr, setFindStr] = useState('pending');
  const [replaceStr, setReplaceStr] = useState('completed');
  const [useRegex, setUseRegex] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);

  const { preview, matchCount, error } = useMemo(() => {
    if (!findStr) return { preview: source, matchCount: 0, error: '' };
    try {
      const flags = caseSensitive ? 'g' : 'gi';
      const pattern = useRegex
        ? new RegExp(findStr, flags)
        : new RegExp(findStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);

      const matches = source.match(pattern);
      const count = matches ? matches.length : 0;
      const replaced = source.replace(pattern, replaceStr);
      return { preview: replaced, matchCount: count, error: '' };
    } catch (err) {
      return {
        preview: source,
        matchCount: 0,
        error: err instanceof Error ? err.message : 'Invalid regular expression',
      };
    }
  }, [source, findStr, replaceStr, useRegex, caseSensitive]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onSample={() => {
          setSource('user_id: 410\nuser_id: 411\nuser_id: 412');
          setFindStr('user_id: (\\d+)');
          setReplaceStr('accountId="$1"');
          setUseRegex(true);
        }}
        onClear={() => setSource('')}
        copyText={preview}
        downloadText={preview}
        downloadFilename="replaced-output.txt"
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Find</label>
          <input
            type="text"
            value={findStr}
            onChange={(e) => setFindStr(e.target.value)}
            placeholder="Text or regex pattern..."
            className={inputCls + ' font-mono'}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Replace With</label>
          <input
            type="text"
            value={replaceStr}
            onChange={(e) => setReplaceStr(e.target.value)}
            placeholder="Replacement string..."
            className={inputCls + ' font-mono'}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4 text-slate-300">
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} className="accent-violet-500" />
            Regex Mode
          </label>
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="accent-violet-500" />
            Case Sensitive
          </label>
        </div>
        <span className="font-mono tabular-nums text-violet-300">{matchCount} matches found</span>
      </div>

      {error && (
        <div className="rounded-lg border border-rose-500/40 bg-rose-950/30 px-3.5 py-2 text-xs text-rose-200">
          Regex error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Source Text</label>
          <textarea rows={8} value={source} onChange={(e) => setSource(e.target.value)} className={monoAreaCls} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-slate-300">Replaced Preview</label>
            <button
              type="button"
              onClick={() => setSource(preview)}
              className="text-xs text-violet-300 hover:text-violet-200"
            >
              Apply back to Source
            </button>
          </div>
          <textarea rows={8} value={preview} readOnly className={monoAreaCls} />
        </div>
      </div>
    </div>
  );
};

/* 9. Markdown to HTML Converter */
function escapeHtmlStr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function convertMarkdownToHtml(md: string): string {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];
  let inCode = false;
  let codeBuf: string[] = [];
  let inUl = false;
  let inOl = false;

  const closeLists = () => {
    if (inUl) {
      html.push('</ul>');
      inUl = false;
    }
    if (inOl) {
      html.push('</ol>');
      inOl = false;
    }
  };

  const inlineFormat = (raw: string) => {
    let s = escapeHtmlStr(raw);
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" rel="noopener noreferrer">$1</a>');
    return s;
  };

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      closeLists();
      if (!inCode) {
        inCode = true;
        codeBuf = [];
      } else {
        html.push(`<pre><code>${escapeHtmlStr(codeBuf.join('\n'))}</code></pre>`);
        inCode = false;
      }
      continue;
    }

    if (inCode) {
      codeBuf.push(line);
      continue;
    }

    const trimmed = line.trim();
    if (!trimmed) {
      closeLists();
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      closeLists();
      const level = headingMatch[1].length;
      html.push(`<h${level}>${inlineFormat(headingMatch[2])}</h${level}>`);
      continue;
    }

    if (trimmed.startsWith('> ')) {
      closeLists();
      html.push(`<blockquote><p>${inlineFormat(trimmed.slice(2))}</p></blockquote>`);
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      if (inOl) {
        html.push('</ol>');
        inOl = false;
      }
      if (!inUl) {
        html.push('<ul>');
        inUl = true;
      }
      html.push(`  <li>${inlineFormat(trimmed.replace(/^[-*]\s+/, ''))}</li>`);
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      if (inUl) {
        html.push('</ul>');
        inUl = false;
      }
      if (!inOl) {
        html.push('<ol>');
        inOl = true;
      }
      html.push(`  <li>${inlineFormat(trimmed.replace(/^\d+\.\s+/, ''))}</li>`);
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      closeLists();
      html.push('<hr />');
      continue;
    }

    closeLists();
    html.push(`<p>${inlineFormat(trimmed)}</p>`);
  }

  closeLists();
  if (inCode) {
    html.push(`<pre><code>${escapeHtmlStr(codeBuf.join('\n'))}</code></pre>`);
  }

  return html.join('\n');
}

export const MarkdownToHtmlTool: React.FC = () => {
  const [md, setMd] = useState(
    '# Release Notes v2.4\n\nShip cleaner documentation with **Markdown to HTML** conversion.\n\n- Instant browser parsing\n- Clean semantic tags\n- Safe `<code>` escaping\n\n> Built for static web workflows.'
  );
  const [viewMode, setViewMode] = useState<'preview' | 'html'>('preview');

  const htmlOutput = useMemo(() => convertMarkdownToHtml(md), [md]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onSample={() =>
          setMd('# Project Brief\n\n1. Define scope\n2. Implement **browser-local** utilities\n3. Export clean HTML\n\n```js\nconsole.log("Ready");\n```')
        }
        onClear={() => setMd('')}
        copyText={htmlOutput}
        downloadText={htmlOutput}
        downloadFilename="converted.html"
        downloadMime="text/html;charset=utf-8"
        extra={
          <div className="inline-flex rounded-lg border border-white/[0.1] bg-[#060911] p-1">
            <button
              type="button"
              onClick={() => setViewMode('preview')}
              className={`rounded-md px-3 py-1 text-xs font-medium ${
                viewMode === 'preview' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Rendered Preview
            </button>
            <button
              type="button"
              onClick={() => setViewMode('html')}
              className={`rounded-md px-3 py-1 text-xs font-medium ${
                viewMode === 'html' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              HTML Source
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Markdown Input</label>
          <textarea rows={11} value={md} onChange={(e) => setMd(e.target.value)} className={monoAreaCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            {viewMode === 'preview' ? 'Live HTML Preview' : 'HTML Source Output'}
          </label>
          {viewMode === 'html' ? (
            <textarea rows={11} value={htmlOutput} readOnly className={monoAreaCls} />
          ) : (
            <div
              className="h-[268px] overflow-y-auto rounded-lg border border-white/[0.1] bg-[#060911] p-4 text-sm text-slate-200 space-y-2 [&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-white [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-white [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_code]:rounded [&_code]:bg-slate-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_pre]:rounded-lg [&_pre]:bg-slate-900 [&_pre]:p-3 [&_pre]:overflow-x-auto [&_blockquote]:border-slate-700 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-slate-300 [&_a]:text-violet-300 [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: htmlOutput }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

/* 10. Readability & Flesch Score Analyzer */
function countSyllables(word: string): number {
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean) return 0;
  if (clean.length <= 3) return 1;
  const trimmed = clean.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const matches = trimmed.match(/[aeiouy]{1,2}/g);
  return Math.max(1, matches ? matches.length : 1);
}

export const ReadabilityAnalyzerTool: React.FC = () => {
  const [text, setText] = useState(
    'Clear writing respects your reader. Short sentences and familiar words help visitors grasp complex software ideas quickly. When documentation avoids unnecessary jargon, support tickets drop and onboarding feels effortless.'
  );

  const report = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter((w) => /[a-z0-9]/i.test(w)) : [];
    const sentences = trimmed
      ? trimmed.split(/[.!?]+(?=\s|$)/).filter((s) => s.trim().length > 0)
      : [];
    const wordCount = words.length;
    const sentenceCount = Math.max(1, sentences.length);

    let syllables = 0;
    let complexWords = 0;
    for (const w of words) {
      const s = countSyllables(w);
      syllables += s;
      if (s >= 3) complexWords++;
    }

    const avgSentenceLen = wordCount / sentenceCount;
    const avgSyllablesPerWord = wordCount ? syllables / wordCount : 0;

    const fleschEase =
      wordCount === 0
        ? 0
        : Math.max(
            0,
            Math.min(100, 206.835 - 1.015 * avgSentenceLen - 84.6 * avgSyllablesPerWord)
          );
    const gradeLevel =
      wordCount === 0
        ? 0
        : Math.max(0, 0.39 * avgSentenceLen + 11.8 * avgSyllablesPerWord - 15.59);

    let band = 'Enter text to score';
    if (wordCount > 0) {
      if (fleschEase >= 80) band = 'Very Easy (6th Grade)';
      else if (fleschEase >= 70) band = 'Fairly Easy (7th Grade)';
      else if (fleschEase >= 60) band = 'Standard / Plain English (8th–9th Grade)';
      else if (fleschEase >= 50) band = 'Fairly Difficult (10th–12th Grade)';
      else if (fleschEase >= 30) band = 'Difficult (College Level)';
      else band = 'Very Difficult (Academic / Legal)';
    }

    return {
      wordCount,
      sentenceCount: words.length ? sentenceCount : 0,
      syllables,
      complexWords,
      avgSentenceLen,
      fleschEase,
      gradeLevel,
      band,
    };
  }, [text]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onSample={() =>
          setText('Browser-based utilities execute directly on your device. Because no files travel to remote servers, formatting JSON or editing drafts stays fast and private.')
        }
        onClear={() => setText('')}
        copyText={`Flesch Reading Ease: ${report.fleschEase.toFixed(1)}\nGrade Level: ${report.gradeLevel.toFixed(1)}\nVerdict: ${report.band}`}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {[
          { label: 'Reading Ease', value: report.fleschEase.toFixed(1) },
          { label: 'FK Grade Level', value: report.gradeLevel.toFixed(1) },
          { label: 'Avg Words / Sent', value: report.avgSentenceLen.toFixed(1) },
          { label: 'Complex Words (3+ syl)', value: report.complexWords },
          { label: 'Total Syllables', value: report.syllables },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-white/[0.08] bg-[#060911] px-3.5 py-3">
            <div className="text-xs text-slate-400">{stat.label}</div>
            <div className="mt-1 font-mono text-lg font-semibold tabular-nums text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-white/[0.08] bg-[#060911] px-4 py-2.5 text-xs text-slate-300">
        Assessment: <span className="font-semibold text-violet-300">{report.band}</span>
      </div>

      <textarea
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste article or landing page copy to evaluate readability..."
        className={inputCls}
      />
    </div>
  );
};
