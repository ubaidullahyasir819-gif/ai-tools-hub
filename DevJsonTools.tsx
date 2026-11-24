import React, { useEffect, useMemo, useState } from 'react';
import { CopyButton, ToolToolbar } from '../components/ToolActionsBar';

const inputCls =
  'w-full rounded-lg border border-white/[0.1] bg-[#060911] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none';
const monoAreaCls =
  'w-full rounded-lg border border-white/[0.1] bg-[#060911] p-3.5 font-mono text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none leading-relaxed';
const btnCls =
  'rounded-lg border border-white/[0.1] bg-[#111829] px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-violet-500/60 hover:text-white whitespace-nowrap shrink-0';

function sortKeysDeep(val: unknown): unknown {
  if (Array.isArray(val)) return val.map(sortKeysDeep);
  if (val && typeof val === 'object') {
    const entries = Object.entries(val as Record<string, unknown>).sort(([a], [b]) =>
      a.localeCompare(b)
    );
    return Object.fromEntries(entries.map(([k, v]) => [k, sortKeysDeep(v)]));
  }
  return val;
}

/* 11. JSON Formatter & Validator */
export const JsonFormatterTool: React.FC = () => {
  const [input, setInput] = useState(
    '{"service":"AI Tools Hub","localOnly":true,"categories":["Text","Developer","SEO"],"limits":{"maxFileMB":25,"rateLimit":null}}'
  );
  const [indent, setIndent] = useState<number | 'tab'>(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [minified, setMinified] = useState(false);

  const result = useMemo(() => {
    if (!input.trim()) return { valid: true, output: '', error: '' };
    try {
      const parsed = JSON.parse(input);
      const data = sortKeys ? sortKeysDeep(parsed) : parsed;
      const space = minified ? undefined : indent === 'tab' ? '\t' : indent;
      return { valid: true, output: JSON.stringify(data, null, space), error: '' };
    } catch (err) {
      return {
        valid: false,
        output: '',
        error: err instanceof Error ? err.message : 'Invalid JSON syntax',
      };
    }
  }, [input, indent, sortKeys, minified]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onSample={() =>
          setInput(
            '{"project":"Static Web Suite","tools":54,"privacy":{"zeroUpload":true,"keysExposed":false},"tags":["json","csv","seo"]}'
          )
        }
        onClear={() => setInput('')}
        copyText={result.output}
        downloadText={result.output}
        downloadFilename="formatted.json"
        downloadMime="application/json;charset=utf-8"
      />

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setMinified(false);
              setIndent(2);
            }}
            className={`${btnCls} ${!minified && indent === 2 ? 'border-violet-500 text-violet-200' : ''}`}
          >
            2 Spaces
          </button>
          <button
            type="button"
            onClick={() => {
              setMinified(false);
              setIndent(4);
            }}
            className={`${btnCls} ${!minified && indent === 4 ? 'border-violet-500 text-violet-200' : ''}`}
          >
            4 Spaces
          </button>
          <button
            type="button"
            onClick={() => {
              setMinified(false);
              setIndent('tab');
            }}
            className={`${btnCls} ${!minified && indent === 'tab' ? 'border-violet-500 text-violet-200' : ''}`}
          >
            Tab
          </button>
          <button
            type="button"
            onClick={() => setMinified(true)}
            className={`${btnCls} ${minified ? 'border-violet-500 text-violet-200' : ''}`}
          >
            Minify
          </button>
          <label className="inline-flex items-center gap-1.5 text-slate-300 ml-2 cursor-pointer">
            <input
              type="checkbox"
              checked={sortKeys}
              onChange={(e) => setSortKeys(e.target.checked)}
              className="accent-violet-500"
            />
            Sort Keys A–Z
          </label>
        </div>

        <span
          className={`font-mono text-xs ${
            !input.trim() ? 'text-slate-400' : result.valid ? 'text-emerald-400' : 'text-rose-400'
          }`}
        >
          {!input.trim() ? 'Waiting for input' : result.valid ? 'Valid JSON' : 'Invalid JSON'}
        </span>
      </div>

      {result.error && (
        <div className="rounded-lg border border-rose-500/40 bg-rose-950/30 px-3.5 py-2 font-mono text-xs text-rose-200">
          Syntax Error: {result.error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Raw JSON Input</label>
          <textarea rows={11} value={input} onChange={(e) => setInput(e.target.value)} className={monoAreaCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Formatted Output ({new Blob([result.output]).size} bytes)
          </label>
          <textarea rows={11} value={result.output} readOnly className={monoAreaCls} />
        </div>
      </div>
    </div>
  );
};

/* 12. JSON to CSV Converter */
function flattenObject(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(out, flattenObject(value as Record<string, unknown>, path));
    } else if (Array.isArray(value)) {
      out[path] = JSON.stringify(value);
    } else if (value === null || value === undefined) {
      out[path] = '';
    } else {
      out[path] = String(value);
    }
  }
  return out;
}

function escapeCsvCell(val: string, delimiter: string): string {
  if (val.includes('"') || val.includes('\n') || val.includes('\r') || val.includes(delimiter)) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

export const JsonToCsvTool: React.FC = () => {
  const [input, setInput] = useState(
    JSON.stringify(
      [
        { id: 101, name: 'Word Counter', category: 'Text', stats: { local: true, popularity: 98 } },
        { id: 102, name: 'JSON Formatter', category: 'Dev', stats: { local: true, popularity: 96 } },
        { id: 103, name: 'AI Summarizer', category: 'AI', stats: { local: false, popularity: 89 } },
      ],
      null,
      2
    )
  );
  const [delimiter, setDelimiter] = useState(',');
  const [flatten, setFlatten] = useState(true);

  const { csv, error, rowsCount } = useMemo(() => {
    if (!input.trim()) return { csv: '', error: '', rowsCount: 0 };
    try {
      const parsed = JSON.parse(input);
      const arr = Array.isArray(parsed)
        ? parsed
        : parsed && typeof parsed === 'object'
        ? [parsed]
        : null;
      if (!arr || arr.length === 0) {
        return { csv: '', error: 'JSON must be a non-empty array of objects or an object.', rowsCount: 0 };
      }

      const normalizedRows = arr.map((item) => {
        if (item && typeof item === 'object' && !Array.isArray(item)) {
          return flatten
            ? flattenObject(item as Record<string, unknown>)
            : Object.fromEntries(
                Object.entries(item as Record<string, unknown>).map(([k, v]) => [
                  k,
                  v === null || v === undefined ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v),
                ])
              );
        }
        return { value: String(item) };
      });

      const headers: string[] = [];
      const seen = new Set<string>();
      for (const row of normalizedRows) {
        for (const key of Object.keys(row)) {
          if (!seen.has(key)) {
            seen.add(key);
            headers.push(key);
          }
        }
      }

      const lines = [
        headers.map((h) => escapeCsvCell(h, delimiter)).join(delimiter),
        ...normalizedRows.map((row) =>
          headers.map((h) => escapeCsvCell(row[h] ?? '', delimiter)).join(delimiter)
        ),
      ];

      return { csv: lines.join('\n'), error: '', rowsCount: normalizedRows.length };
    } catch (err) {
      return {
        csv: '',
        error: err instanceof Error ? err.message : 'Invalid JSON',
        rowsCount: 0,
      };
    }
  }, [input, delimiter, flatten]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onSample={() =>
          setInput('[{"sku":"A-10","price":29.5,"meta":{"stock":12}},{"sku":"B-20","price":45,"meta":{"stock":0}}]')
        }
        onClear={() => setInput('')}
        copyText={csv}
        downloadText={csv}
        downloadFilename="export.csv"
        downloadMime="text/csv;charset=utf-8"
        extra={
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <label className="inline-flex items-center gap-1.5">
              <span>Delimiter</span>
              <select
                value={delimiter}
                onChange={(e) => setDelimiter(e.target.value)}
                className="rounded-md border border-white/[0.1] bg-[#060911] px-2 py-1 text-xs text-white"
              >
                <option value=",">Comma (,)</option>
                <option value=";">Semicolon (;)</option>
                <option value={'\t'}>Tab (TSV)</option>
              </select>
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={flatten}
                onChange={(e) => setFlatten(e.target.checked)}
                className="accent-violet-500"
              />
              Flatten Nested Objects
            </label>
          </div>
        }
      />

      {error && (
        <div className="rounded-lg border border-rose-500/40 bg-rose-950/30 px-3.5 py-2 font-mono text-xs text-rose-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">JSON Array Input</label>
          <textarea rows={10} value={input} onChange={(e) => setInput(e.target.value)} className={monoAreaCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            CSV Output (<span className="font-mono tabular-nums">{rowsCount}</span> rows)
          </label>
          <textarea rows={10} value={csv} readOnly className={monoAreaCls} />
        </div>
      </div>
    </div>
  );
};

/* RFC-4180 CSV Parser */
export function parseCsvRows(text: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === delimiter) {
        row.push(cell);
        cell = '';
      } else if (ch === '\r' && next === '\n') {
        row.push(cell);
        rows.push(row);
        row = [];
        cell = '';
        i++;
      } else if (ch === '\n' || ch === '\r') {
        row.push(cell);
        rows.push(row);
        row = [];
        cell = '';
      } else {
        cell += ch;
      }
    }
  }
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ''));
}

function detectDelimiter(sample: string): string {
  const firstLine = sample.split(/\r?\n/)[0] || '';
  const candidates = [',', '\t', ';', '|'];
  let best = ',';
  let bestCount = -1;
  for (const cand of candidates) {
    const count = firstLine.split(cand).length - 1;
    if (count > bestCount) {
      bestCount = count;
      best = cand;
    }
  }
  return bestCount > 0 ? best : ',';
}

/* 13. CSV to JSON Converter */
export const CsvToJsonTool: React.FC = () => {
  const [csv, setCsv] = useState(
    'name,role,active,score\n"Ada Lovelace",Engineer,true,99\n"Alan Turing",Researcher,true,97\n"Grace Hopper",Architect,false,95'
  );
  const [delimiter, setDelimiter] = useState('auto');
  const [hasHeader, setHasHeader] = useState(true);
  const [parseTypes, setParseTypes] = useState(true);

  const castValue = (val: string): unknown => {
    if (!parseTypes) return val;
    const trimmed = val.trim();
    if (trimmed === '') return '';
    if (trimmed === 'true') return true;
    if (trimmed === 'false') return false;
    if (trimmed === 'null') return null;
    if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
    return val;
  };

  const { json, recordCount } = useMemo(() => {
    if (!csv.trim()) return { json: '', recordCount: 0 };
    const delim = delimiter === 'auto' ? detectDelimiter(csv) : delimiter;
    const rows = parseCsvRows(csv, delim);
    if (rows.length === 0) return { json: '[]', recordCount: 0 };

    if (!hasHeader) {
      const data = rows.map((r) => r.map(castValue));
      return { json: JSON.stringify(data, null, 2), recordCount: data.length };
    }

    const headers = rows[0].map((h, i) => h.trim() || `column_${i + 1}`);
    const records = rows.slice(1).map((r) => {
      const obj: Record<string, unknown> = {};
      headers.forEach((h, i) => {
        obj[h] = castValue(r[i] ?? '');
      });
      return obj;
    });

    return { json: JSON.stringify(records, null, 2), recordCount: records.length };
  }, [csv, delimiter, hasHeader, parseTypes]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onSample={() => setCsv('city,country,population\nTokyo,Japan,13960000\nZurich,Switzerland,421878')}
        onClear={() => setCsv('')}
        copyText={json}
        downloadText={json}
        downloadFilename="converted.json"
        downloadMime="application/json;charset=utf-8"
        extra={
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              className="rounded-md border border-white/[0.1] bg-[#060911] px-2 py-1 text-xs text-white"
            >
              <option value="auto">Auto-detect delimiter</option>
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value={'\t'}>Tab (TSV)</option>
            </select>
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={hasHeader} onChange={(e) => setHasHeader(e.target.checked)} className="accent-violet-500" />
              First Row Header
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={parseTypes} onChange={(e) => setParseTypes(e.target.checked)} className="accent-violet-500" />
              Infer Numbers/Booleans
            </label>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">CSV / TSV Input</label>
          <textarea rows={10} value={csv} onChange={(e) => setCsv(e.target.value)} className={monoAreaCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            JSON Output (<span className="font-mono tabular-nums">{recordCount}</span> records)
          </label>
          <textarea rows={10} value={json} readOnly className={monoAreaCls} />
        </div>
      </div>
    </div>
  );
};

/* 14. CSV to Markdown Table */
export const CsvToMarkdownTableTool: React.FC = () => {
  const [csv, setCsv] = useState('Plan,Monthly,Requests,Support\nStarter,$0,10k/mo,Community\nPro,$29,250k/mo,Priority\nEnterprise,Custom,Unlimited,Dedicated');
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('left');

  const markdown = useMemo(() => {
    if (!csv.trim()) return '';
    const delim = detectDelimiter(csv);
    const rows = parseCsvRows(csv, delim);
    if (rows.length === 0) return '';
    const colCount = Math.max(...rows.map((r) => r.length));
    const paddedRows = rows.map((r) =>
      Array.from({ length: colCount }, (_, i) => (r[i] ?? '').replace(/\|/g, '\\|').trim())
    );
    const widths = Array.from({ length: colCount }, (_, col) =>
      Math.max(3, ...paddedRows.map((r) => r[col].length))
    );

    const formatRow = (r: string[]) =>
      `| ${r.map((cell, i) => cell.padEnd(widths[i], ' ')).join(' | ')} |`;

    const sep = `| ${widths
      .map((w) => {
        const dashes = '-'.repeat(w);
        if (align === 'center') return `:${'-'.repeat(Math.max(1, w - 2))}:`;
        if (align === 'right') return `${'-'.repeat(Math.max(1, w - 1))}:`;
        return dashes;
      })
      .join(' | ')} |`;

    return [formatRow(paddedRows[0]), sep, ...paddedRows.slice(1).map(formatRow)].join('\n');
  }, [csv, align]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onSample={() => setCsv('Tool\tCategory\tMode\nWord Counter\tText\tLocal\nQR Maker\tGenerators\tLocal')}
        onClear={() => setCsv('')}
        copyText={markdown}
        downloadText={markdown}
        downloadFilename="table.md"
        extra={
          <div className="inline-flex rounded-lg border border-white/[0.1] bg-[#060911] p-1">
            {(['left', 'center', 'right'] as const).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAlign(a)}
                className={`rounded-md px-2.5 py-1 text-xs capitalize ${
                  align === a ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        }
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">CSV / Tab-Separated Input</label>
          <textarea rows={9} value={csv} onChange={(e) => setCsv(e.target.value)} className={monoAreaCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Markdown Table Output</label>
          <textarea rows={9} value={markdown} readOnly className={monoAreaCls} />
        </div>
      </div>
    </div>
  );
};

/* 15. Base64 Encoder & Decoder */
export const Base64Tool: React.FC = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [urlSafe, setUrlSafe] = useState(false);
  const [input, setInput] = useState('AI Tools Hub — Fast UTF-8 Base64 encoding!');

  const { output, error } = useMemo(() => {
    if (!input) return { output: '', error: '' };
    try {
      if (mode === 'encode') {
        const bytes = new TextEncoder().encode(input);
        let binary = '';
        bytes.forEach((b) => {
          binary += String.fromCharCode(b);
        });
        let b64 = btoa(binary);
        if (urlSafe) {
          b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        }
        return { output: b64, error: '' };
      } else {
        let normalized = input.trim().replace(/-/g, '+').replace(/_/g, '/');
        while (normalized.length % 4) normalized += '=';
        const binary = atob(normalized);
        const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
        return { output: new TextDecoder().decode(bytes), error: '' };
      }
    } catch {
      return { output: '', error: 'Invalid Base64 string. Check for stray characters or truncated padding.' };
    }
  }, [input, mode, urlSafe]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onSample={() => {
          setMode('encode');
          setInput('{"sub":"user_123","scope":"read:tools"}');
        }}
        onClear={() => setInput('')}
        copyText={output}
        downloadText={output}
        downloadFilename={mode === 'encode' ? 'encoded-base64.txt' : 'decoded-text.txt'}
        extra={
          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-lg border border-white/[0.1] bg-[#060911] p-1">
              {(['encode', 'decode'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`rounded-md px-3 py-1 text-xs font-medium capitalize ${
                    mode === m ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            {mode === 'encode' && (
              <label className="inline-flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                <input type="checkbox" checked={urlSafe} onChange={(e) => setUrlSafe(e.target.checked)} className="accent-violet-500" />
                URL-Safe (base64url)
              </label>
            )}
          </div>
        }
      />

      {error && (
        <div className="rounded-lg border border-rose-500/40 bg-rose-950/30 px-3.5 py-2 text-xs text-rose-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            {mode === 'encode' ? 'Plain Text (UTF-8)' : 'Base64 String'}
          </label>
          <textarea rows={8} value={input} onChange={(e) => setInput(e.target.value)} className={monoAreaCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            {mode === 'encode' ? 'Base64 Output' : 'Decoded UTF-8 Text'}
          </label>
          <textarea rows={8} value={output} readOnly className={monoAreaCls} />
        </div>
      </div>
    </div>
  );
};

/* 16. URL Encoder & Decoder */
export const UrlEncoderDecoderTool: React.FC = () => {
  const [mode, setMode] = useState<'encodeComponent' | 'encodeURI' | 'decode'>('decode');
  const [input, setInput] = useState(
    'https://aitoolshub.example/search?q=json%20formatter&utm_source=newsletter&tag=dev%2Ftools#results'
  );

  const { output, parsedUrl, error } = useMemo(() => {
    if (!input) return { output: '', parsedUrl: null as URL | null, error: '' };
    let out = '';
    let errMsg = '';
    try {
      if (mode === 'encodeComponent') out = encodeURIComponent(input);
      else if (mode === 'encodeURI') out = encodeURI(input);
      else out = decodeURIComponent(input);
    } catch {
      errMsg = 'Malformed URI escape sequence found in input.';
    }

    let urlObj: URL | null = null;
    try {
      urlObj = new URL(mode === 'decode' && out ? out : input);
    } catch {
      urlObj = null;
    }

    return { output: out, parsedUrl: urlObj, error: errMsg };
  }, [input, mode]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onSample={() =>
          setInput('https://example.com/docs?query=hello%20world&filter=a%26b&page=2')
        }
        onClear={() => setInput('')}
        copyText={output}
        extra={
          <div className="inline-flex rounded-lg border border-white/[0.1] bg-[#060911] p-1">
            {[
              { id: 'decode', label: 'Decode' },
              { id: 'encodeComponent', label: 'encodeURIComponent' },
              { id: 'encodeURI', label: 'encodeURI' },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id as typeof mode)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                  mode === m.id ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        }
      />

      {error && (
        <div className="rounded-lg border border-rose-500/40 bg-rose-950/30 px-3.5 py-2 text-xs text-rose-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Input</label>
          <textarea rows={6} value={input} onChange={(e) => setInput(e.target.value)} className={monoAreaCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Result</label>
          <textarea rows={6} value={output} readOnly className={monoAreaCls} />
        </div>
      </div>

      {parsedUrl && (
        <div className="rounded-lg border border-white/[0.08] bg-[#060911] p-4">
          <h3 className="text-xs font-semibold text-slate-200 mb-3">Parsed URL Breakdown</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 text-xs font-mono mb-3">
            <div><span className="text-slate-500">Origin:</span> <span className="text-slate-200">{parsedUrl.origin}</span></div>
            <div><span className="text-slate-500">Path:</span> <span className="text-slate-200">{parsedUrl.pathname}</span></div>
            <div><span className="text-slate-500">Hash:</span> <span className="text-slate-200">{parsedUrl.hash || '(none)'}</span></div>
          </div>
          {Array.from(parsedUrl.searchParams.entries()).length > 0 && (
            <div className="overflow-x-auto border-t border-white/[0.06] pt-3">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="text-slate-400 border-b border-white/[0.06]">
                    <th className="pb-2 pr-4">Query Parameter</th>
                    <th className="pb-2">Decoded Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {Array.from(parsedUrl.searchParams.entries()).map(([k, v], i) => (
                    <tr key={`${k}-${i}`}>
                      <td className="py-1.5 pr-4 text-violet-300">{k}</td>
                      <td className="py-1.5 text-slate-200 break-all">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* 17. JWT Token Decoder */
function decodeBase64UrlUtf8(seg: string): string {
  let b64 = seg.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

const SAMPLE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzQ5MjEiLCJuYW1lIjoiQWxpY2UgTWVyY2VyIiwicm9sZSI6ImVkaXRvciIsImlhdCI6MTczNTY4OTYwMCwiZXhwIjoxODkzNDU2MDAwfQ.signature_not_verified_locally';

export const JwtDecoderTool: React.FC = () => {
  const [token, setToken] = useState(SAMPLE_JWT);

  const decoded = useMemo(() => {
    const trimmed = token.trim();
    if (!trimmed) return { header: '', payload: '', expInfo: null as string | null, error: '' };
    const parts = trimmed.split('.');
    if (parts.length !== 3) {
      return { header: '', payload: '', expInfo: null, error: 'A valid JWT must have exactly 3 dot-separated segments.' };
    }
    try {
      const headerObj = JSON.parse(decodeBase64UrlUtf8(parts[0]));
      const payloadObj = JSON.parse(decodeBase64UrlUtf8(parts[1]));
      let expInfo: string | null = null;
      if (typeof payloadObj.exp === 'number') {
        const expDate = new Date(payloadObj.exp * 1000);
        const expired = expDate.getTime() < Date.now();
        expInfo = `${expired ? 'Expired' : 'Active'} · exp: ${expDate.toISOString()}`;
      }
      return {
        header: JSON.stringify(headerObj, null, 2),
        payload: JSON.stringify(payloadObj, null, 2),
        expInfo,
        error: '',
      };
    } catch {
      return { header: '', payload: '', expInfo: null, error: 'Could not decode JWT Base64URL JSON segments.' };
    }
  }, [token]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onSample={() => setToken(SAMPLE_JWT)}
        onClear={() => setToken('')}
        copyText={decoded.payload}
      />

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1.5">Encoded JWT</label>
        <textarea
          rows={4}
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste header.payload.signature token..."
          className={monoAreaCls}
        />
      </div>

      {decoded.error && (
        <div className="rounded-lg border border-rose-500/40 bg-rose-950/30 px-3.5 py-2 text-xs text-rose-200">
          {decoded.error}
        </div>
      )}

      {decoded.expInfo && (
        <div className="rounded-lg border border-white/[0.08] bg-[#060911] px-4 py-2.5 font-mono text-xs text-slate-300">
          Token Status: <span className="text-violet-300">{decoded.expInfo}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-slate-300">Decoded Header</label>
            <CopyButton text={decoded.header} label="Copy Header" />
          </div>
          <textarea rows={7} value={decoded.header} readOnly className={monoAreaCls} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-slate-300">Decoded Payload Claims</label>
            <CopyButton text={decoded.payload} label="Copy Payload" />
          </div>
          <textarea rows={7} value={decoded.payload} readOnly className={monoAreaCls} />
        </div>
      </div>
    </div>
  );
};

/* 18. Regex Tester */
export const RegexTesterTool: React.FC = () => {
  const [pattern, setPattern] = useState('([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})');
  const [flags, setFlags] = useState('g');
  const [sample, setSample] = useState(
    'Contact support@aitoolshub.dev or sales@example.org for enterprise licensing.'
  );

  const toggleFlag = (flag: string) => {
    setFlags((prev) => (prev.includes(flag) ? prev.replace(flag, '') : prev + flag));
  };

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [] as { match: string; index: number; groups: string[] }[], error: '' };
    try {
      const safeFlags = flags.includes('g') ? flags : flags + 'g';
      const rx = new RegExp(pattern, safeFlags);
      const list: { match: string; index: number; groups: string[] }[] = [];
      let m: RegExpExecArray | null;
      let guard = 0;
      while ((m = rx.exec(sample)) !== null && guard < 200) {
        guard++;
        list.push({
          match: m[0],
          index: m.index,
          groups: m.slice(1).map((g) => g ?? ''),
        });
        if (m[0] === '') rx.lastIndex++;
        if (!flags.includes('g')) break;
      }
      return { matches: list, error: '' };
    } catch (err) {
      return {
        matches: [],
        error: err instanceof Error ? err.message : 'Invalid regular expression',
      };
    }
  }, [pattern, flags, sample]);

  const presets = [
    { label: 'Email', pat: '([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})' },
    { label: 'URL', pat: 'https?:\\/\\/[^\\s/$.?#].[^\\s]*' },
    { label: 'ISO Date', pat: '\\b(\\d{4})-(\\d{2})-(\\d{2})\\b' },
    { label: 'Hex Color', pat: '#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\\b' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.07]">
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button key={p.label} type="button" onClick={() => setPattern(p.pat)} className={btnCls}>
              Preset: {p.label}
            </button>
          ))}
        </div>
        <span className="font-mono text-xs tabular-nums text-violet-300">
          {matches.length} {matches.length === 1 ? 'match' : 'matches'}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        <div className="sm:col-span-3">
          <label className="block text-xs font-medium text-slate-300 mb-1">Regular Expression</label>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className={inputCls + ' font-mono'}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Flags</label>
          <div className="flex items-center gap-1.5 h-[42px]">
            {['g', 'i', 'm', 's'].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => toggleFlag(f)}
                className={`h-9 w-9 rounded-lg border font-mono text-xs font-semibold ${
                  flags.includes(f)
                    ? 'border-violet-500 bg-violet-600/20 text-violet-200'
                    : 'border-white/[0.1] bg-[#060911] text-slate-400'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-rose-500/40 bg-rose-950/30 px-3.5 py-2 font-mono text-xs text-rose-200">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1.5">Test String</label>
        <textarea rows={5} value={sample} onChange={(e) => setSample(e.target.value)} className={monoAreaCls} />
      </div>

      <div className="rounded-lg border border-white/[0.08] bg-[#060911] p-4">
        <h3 className="text-xs font-semibold text-slate-200 mb-2">Matched Results &amp; Capture Groups</h3>
        {matches.length === 0 ? (
          <p className="text-xs text-slate-500">No matches found for the current pattern and flags.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/[0.07] text-slate-400">
                  <th className="py-2 pr-4">#</th>
                  <th className="py-2 pr-4">Index</th>
                  <th className="py-2 pr-4">Full Match</th>
                  <th className="py-2">Capture Groups</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {matches.map((m, idx) => (
                  <tr key={idx}>
                    <td className="py-1.5 pr-4 text-slate-500 tabular-nums">{idx + 1}</td>
                    <td className="py-1.5 pr-4 text-slate-400 tabular-nums">{m.index}</td>
                    <td className="py-1.5 pr-4 text-emerald-300">{m.match}</td>
                    <td className="py-1.5 text-violet-300">
                      {m.groups.length > 0 ? m.groups.map((g, gi) => `$${gi + 1}: "${g}"`).join(' · ') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

/* 19. HTML Entity Encoder & Decoder */
export const HtmlEntityTool: React.FC = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [encodeNonAscii, setEncodeNonAscii] = useState(false);
  const [input, setInput] = useState('<div class="card">5 > 3 & "Hello"</div>');

  const output = useMemo(() => {
    if (mode === 'encode') {
      let out = input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
      if (encodeNonAscii) {
        out = out.replace(/[^\x00-\x7F]/g, (c) => `&#${c.codePointAt(0)};`);
      }
      return out;
    }
    const ta = document.createElement('textarea');
    ta.innerHTML = input;
    return ta.value;
  }, [input, mode, encodeNonAscii]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onSample={() => {
          setMode('encode');
          setInput('<script>alert("XSS Check & Safe Escape")</script>');
        }}
        onClear={() => setInput('')}
        copyText={output}
        downloadText={output}
        downloadFilename="html-entities.txt"
        extra={
          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-lg border border-white/[0.1] bg-[#060911] p-1">
              {(['encode', 'decode'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`rounded-md px-3 py-1 text-xs font-medium capitalize ${
                    mode === m ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            {mode === 'encode' && (
              <label className="inline-flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={encodeNonAscii}
                  onChange={(e) => setEncodeNonAscii(e.target.checked)}
                  className="accent-violet-500"
                />
                Numeric Non-ASCII
              </label>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Input</label>
          <textarea rows={8} value={input} onChange={(e) => setInput(e.target.value)} className={monoAreaCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Output</label>
          <textarea rows={8} value={output} readOnly className={monoAreaCls} />
        </div>
      </div>
    </div>
  );
};

/* 20. SHA Hash Generator */
export const HashGeneratorTool: React.FC = () => {
  const [input, setInput] = useState('AI Tools Hub Web Crypto Check');
  const [uppercase, setUppercase] = useState(false);
  const [hashes, setHashes] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    const compute = async () => {
      const data = new TextEncoder().encode(input);
      const algos = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
      const entries = await Promise.all(
        algos.map(async (alg) => {
          const buf = await window.crypto.subtle.digest(alg, data);
          const hex = Array.from(new Uint8Array(buf))
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('');
          return [alg, uppercase ? hex.toUpperCase() : hex];
        })
      );
      if (!cancelled) setHashes(Object.fromEntries(entries));
    };
    compute();
    return () => {
      cancelled = true;
    };
  }, [input, uppercase]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onSample={() => setInput('verify-webhook-payload-2026')}
        onClear={() => setInput('')}
        extra={
          <label className="inline-flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="accent-violet-500"
            />
            Uppercase Hex
          </label>
        }
      />

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1.5">Input Text (UTF-8)</label>
        <textarea rows={4} value={input} onChange={(e) => setInput(e.target.value)} className={monoAreaCls} />
      </div>

      <div className="space-y-2.5">
        {['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'].map((alg) => (
          <div
            key={alg}
            className="rounded-lg border border-white/[0.08] bg-[#060911] p-3.5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-slate-400">{alg}</div>
              <div className="mt-1 font-mono text-xs text-slate-100 break-all">{hashes[alg] || '...'}</div>
            </div>
            <CopyButton text={hashes[alg] || ''} label={`Copy ${alg}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
