import React, { useMemo, useState } from 'react';
import { CopyButton, ToolToolbar } from '../components/ToolActionsBar';

const inputCls =
  'w-full rounded-lg border border-white/[0.1] bg-[#060911] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none';
const monoAreaCls =
  'w-full rounded-lg border border-white/[0.1] bg-[#060911] p-3.5 font-mono text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none leading-relaxed';

function estimateTokens(text: string): number {
  if (!text.trim()) return 0;
  // Subword heuristic: punctuation/symbols often split into individual tokens; average ~3.8 chars per token for prose/code mix
  const wordsAndPunct = text.match(/[a-zA-Z0-9]+|[^\s\w]|\n/g) || [];
  let tokens = 0;
  for (const part of wordsAndPunct) {
    if (part.length <= 4) tokens += 1;
    else tokens += Math.ceil(part.length / 4);
  }
  return tokens;
}

/* 49. AI Token & Cost Estimator (100% Local) */
export const AiTokenCalculatorTool: React.FC = () => {
  const [prompt, setPrompt] = useState(
    'You are a senior database architect. Analyze the following PostgreSQL schema for missing indexes and foreign key constraints, and return a concise migration checklist.'
  );
  const [expectedOutputTokens, setExpectedOutputTokens] = useState(500);
  const [requestsPerDay, setRequestsPerDay] = useState(1000);

  const inputTokens = useMemo(() => estimateTokens(prompt), [prompt]);
  const chars = prompt.length;

  const tiers = [
    { name: 'Fast / Lightweight Tier', inPer1M: 0.15, outPer1M: 0.6 },
    { name: 'Balanced Production Tier', inPer1M: 1.25, outPer1M: 5.0 },
    { name: 'Frontier Reasoning Tier', inPer1M: 3.0, outPer1M: 15.0 },
  ];

  return (
    <div className="space-y-4">
      <ToolToolbar
        onClear={() => setPrompt('')}
        copyText={`Input Tokens (est.): ${inputTokens}\nCharacters: ${chars}`}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-white/[0.08] bg-[#060911] px-4 py-3">
          <div className="text-xs text-slate-400">Est. Input Tokens</div>
          <div className="mt-1 font-mono text-xl font-bold tabular-nums text-violet-300">{inputTokens.toLocaleString()}</div>
        </div>
        <div className="rounded-lg border border-white/[0.08] bg-[#060911] px-4 py-3">
          <div className="text-xs text-slate-400">Characters / Token</div>
          <div className="mt-1 font-mono text-xl font-bold tabular-nums text-white">
            {inputTokens ? (chars / inputTokens).toFixed(2) : '0.00'}
          </div>
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">Expected Output Tokens</label>
          <input
            type="number"
            min={0}
            value={expectedOutputTokens}
            onChange={(e) => setExpectedOutputTokens(Math.max(0, Number(e.target.value) || 0))}
            className={inputCls + ' font-mono'}
          />
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">Requests / Day</label>
          <input
            type="number"
            min={1}
            value={requestsPerDay}
            onChange={(e) => setRequestsPerDay(Math.max(1, Number(e.target.value) || 1))}
            className={inputCls + ' font-mono'}
          />
        </div>
      </div>

      <textarea rows={6} value={prompt} onChange={(e) => setPrompt(e.target.value)} className={inputCls} />

      <div className="rounded-xl border border-white/[0.08] bg-[#060911] overflow-x-auto">
        <table className="w-full text-left text-xs font-mono tabular-nums">
          <thead className="border-b border-white/[0.07] text-slate-400">
            <tr>
              <th className="px-4 py-2.5 font-sans">Reference Pricing Tier</th>
              <th className="px-4 py-2.5 text-right">Per Request</th>
              <th className="px-4 py-2.5 text-right">Daily ({requestsPerDay.toLocaleString()} req)</th>
              <th className="px-4 py-2.5 text-right">Monthly (30d)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {tiers.map((t) => {
              const perReq =
                (inputTokens / 1_000_000) * t.inPer1M + (expectedOutputTokens / 1_000_000) * t.outPer1M;
              const daily = perReq * requestsPerDay;
              const monthly = daily * 30;
              return (
                <tr key={t.name}>
                  <td className="px-4 py-2.5 font-sans text-slate-200">{t.name}</td>
                  <td className="px-4 py-2.5 text-right text-slate-300">${perReq.toFixed(5)}</td>
                  <td className="px-4 py-2.5 text-right text-slate-200">${daily.toFixed(2)}</td>
                  <td className="px-4 py-2.5 text-right text-violet-300 font-semibold">${monthly.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* 50. Structured AI Prompt Builder (100% Local) */
export const AiPromptBuilderTool: React.FC = () => {
  const [format, setFormat] = useState<'markdown' | 'xml'>('xml');
  const [role, setRole] = useState('Senior Technical Editor');
  const [task, setTask] = useState('Rewrite the provided draft for clarity while preserving technical accuracy.');
  const [context, setContext] = useState('Target audience is software engineers evaluating a static developer toolkit.');
  const [constraints, setConstraints] = useState('- Keep sentences under 22 words.\n- Do not invent metrics or benchmarks.\n- Use active voice.');
  const [outputFormat, setOutputFormat] = useState('Return revised copy followed by a 3-bullet changelog.');

  const assembled = useMemo(() => {
    if (format === 'xml') {
      return [
        role && `<role>\n${role.trim()}\n</role>`,
        context && `<context>\n${context.trim()}\n</context>`,
        task && `<task>\n${task.trim()}\n</task>`,
        constraints && `<constraints>\n${constraints.trim()}\n</constraints>`,
        outputFormat && `<output_format>\n${outputFormat.trim()}\n</output_format>`,
      ]
        .filter(Boolean)
        .join('\n\n');
    }
    return [
      role && `## Role\n${role.trim()}`,
      context && `## Context\n${context.trim()}`,
      task && `## Task\n${task.trim()}`,
      constraints && `## Constraints\n${constraints.trim()}`,
      outputFormat && `## Output Format\n${outputFormat.trim()}`,
    ]
      .filter(Boolean)
      .join('\n\n');
  }, [format, role, task, context, constraints, outputFormat]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        copyText={assembled}
        downloadText={assembled}
        downloadFilename={format === 'xml' ? 'prompt.xml' : 'prompt.md'}
        extra={
          <div className="inline-flex rounded-lg border border-white/[0.1] bg-[#060911] p-1">
            {(['xml', 'markdown'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFormat(f)}
                className={`rounded-md px-3 py-1 text-xs font-medium uppercase ${
                  format === f ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-slate-300 mb-1">Persona / Role</label>
            <input value={role} onChange={(e) => setRole(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs text-slate-300 mb-1">Background Context</label>
            <textarea rows={2} value={context} onChange={(e) => setContext(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs text-slate-300 mb-1">Primary Task</label>
            <textarea rows={2} value={task} onChange={(e) => setTask(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs text-slate-300 mb-1">Constraints &amp; Guardrails</label>
            <textarea rows={3} value={constraints} onChange={(e) => setConstraints(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs text-slate-300 mb-1">Output Format</label>
            <input value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)} className={inputCls} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Assembled Prompt (~{estimateTokens(assembled)} tokens)
          </label>
          <textarea rows={16} value={assembled} readOnly className={monoAreaCls} />
        </div>
      </div>
    </div>
  );
};

/* 51. AI Text Summarizer (AI API-Dependent + Real Client-Side TF-IDF Extractive Engine) */
const SUMMARY_STOP = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
  'will', 'would', 'could', 'should', 'that', 'this', 'these', 'those', 'it', 'its', 'as', 'if',
]);

export const AiTextSummarizerTool: React.FC = () => {
  const [input, setInput] = useState(
    'Static websites have experienced a major resurgence in modern software engineering. Because static bundles consist solely of HTML, CSS, and client-side JavaScript, they can be served globally from edge networks with minimal latency. When developers build browser-based tools cleanly, users benefit from zero account signups and complete privacy because inputs never leave the browser. Meanwhile, operations requiring heavyweight neural language models—such as abstractive paraphrasing—must be clearly separated from client-side utilities so API keys are never exposed in frontend code. By combining local deterministic engines with transparent capability labeling, web toolkits deliver reliable performance on every device.'
  );
  const [sentenceLimit, setSentenceLimit] = useState(3);
  const [bullets, setBullets] = useState(true);

  const summary = useMemo(() => {
    const sentences = input
      .replace(/\s+/g, ' ')
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 15);

    if (sentences.length === 0) return '';

    const wordFreq: Record<string, number> = {};
    for (const s of sentences) {
      const words = s.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
      for (const w of words) {
        if (w.length > 2 && !SUMMARY_STOP.has(w)) {
          wordFreq[w] = (wordFreq[w] || 0) + 1;
        }
      }
    }

    const scored = sentences.map((s, idx) => {
      const words = s.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
      let score = 0;
      for (const w of words) {
        if (wordFreq[w]) score += wordFreq[w];
      }
      const normScore = score / Math.max(4, words.length) + (idx === 0 ? 0.3 : 0);
      return { idx, s, score: normScore };
    });

    const top = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, Math.min(sentenceLimit, sentences.length))
      .sort((a, b) => a.idx - b.idx)
      .map((item) => item.s);

    return bullets ? top.map((t) => `• ${t}`).join('\n\n') : top.join(' ');
  }, [input, sentenceLimit, bullets]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onClear={() => setInput('')}
        copyText={summary}
        downloadText={summary}
        downloadFilename="extractive-summary.txt"
        extra={
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <label className="inline-flex items-center gap-1.5">
              <span>Key Sentences</span>
              <select
                value={sentenceLimit}
                onChange={(e) => setSentenceLimit(Number(e.target.value))}
                className="rounded-md border border-white/[0.1] bg-[#060911] px-2 py-1 text-white font-mono"
              >
                {[2, 3, 4, 5, 7].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={bullets} onChange={(e) => setBullets(e.target.checked)} className="accent-violet-500" />
              Bullet Points
            </label>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Source Text</label>
          <textarea rows={10} value={input} onChange={(e) => setInput(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Local Extractive Summary (TF-IDF Sentence Ranking)
          </label>
          <textarea rows={10} value={summary} readOnly className={inputCls + ' leading-relaxed'} />
        </div>
      </div>
    </div>
  );
};

/* 52. AI Tone & Style Rewriter (AI API-Dependent + Local Rule Engine) */
const CONTRACTIONS: [RegExp, string][] = [
  [/\bdon't\b/gi, 'do not'],
  [/\bcan't\b/gi, 'cannot'],
  [/\bwon't\b/gi, 'will not'],
  [/\bisn't\b/gi, 'is not'],
  [/\baren't\b/gi, 'are not'],
  [/\bwe're\b/gi, 'we are'],
  [/\bit's\b/gi, 'it is'],
  [/\bI'm\b/g, 'I am'],
  [/\bthat's\b/gi, 'that is'],
];

const FILLER_PHRASES: [RegExp, string][] = [
  [/\b(just|actually|basically|literally|really|very|quite|simply)\s+/gi, ''],
  [/\bin order to\b/gi, 'to'],
  [/\bdue to the fact that\b/gi, 'because'],
  [/\bat this point in time\b/gi, 'now'],
  [/\bfor the purpose of\b/gi, 'for'],
];

export const AiToneRewriterTool: React.FC = () => {
  const [input, setInput] = useState(
    "I'm just reaching out because we're basically trying to figure out if it's actually possible to launch at this point in time in order to save budget."
  );
  const [preset, setPreset] = useState<'concise' | 'formal' | 'both'>('both');

  const rewritten = useMemo(() => {
    let out = input;
    if (preset === 'concise' || preset === 'both') {
      for (const [rx, rep] of FILLER_PHRASES) out = out.replace(rx, rep);
    }
    if (preset === 'formal' || preset === 'both') {
      for (const [rx, rep] of CONTRACTIONS) out = out.replace(rx, rep);
    }
    return out.replace(/\s{2,}/g, ' ').replace(/\s+([.,!?])/g, '$1').trim();
  }, [input, preset]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onClear={() => setInput('')}
        copyText={rewritten}
        downloadText={rewritten}
        downloadFilename="rewritten-draft.txt"
        extra={
          <div className="inline-flex rounded-lg border border-white/[0.1] bg-[#060911] p-1">
            {[
              { id: 'both', label: 'Formal + Concise' },
              { id: 'concise', label: 'Strip Fillers' },
              { id: 'formal', label: 'Expand Contractions' },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPreset(p.id as typeof preset)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                  preset === p.id ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Original Draft</label>
          <textarea rows={7} value={input} onChange={(e) => setInput(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Rule-Cleaned Output</label>
          <textarea rows={7} value={rewritten} readOnly className={inputCls} />
        </div>
      </div>
    </div>
  );
};

/* 53. AI SEO Meta & Title Drafter (AI API-Dependent + Real Keyphrase Extractor) */
export const AiSeoMetaWriterTool: React.FC = () => {
  const [brand, setBrand] = useState('AI Tools Hub');
  const [article, setArticle] = useState(
    'Formatting JSON payloads and converting CSV spreadsheets cleanly is an everyday workflow for backend and frontend engineers. Browser-local utilities validate syntax immediately without uploading sensitive configuration files to external servers.'
  );

  const suggestions = useMemo(() => {
    const words = article
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 3 && !SUMMARY_STOP.has(w));

    const freq: Record<string, number> = {};
    for (const w of words) freq[w] = (freq[w] || 0) + 1;
    const topTerms = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([w]) => w.charAt(0).toUpperCase() + w.slice(1));

    const leadSentence = (article.split(/[.!?]/)[0] || '').trim();
    const topic = topTerms.slice(0, 2).join(' & ') || 'Online Utilities';

    const titles = [
      `${topic} Guide & Workflow | ${brand}`.slice(0, 60),
      `How to Master ${topTerms[0] || 'Browser Tools'} Fast | ${brand}`.slice(0, 60),
      `${topTerms.slice(0, 3).join(', ')} – Practical Overview`.slice(0, 60),
    ];

    const descBase = leadSentence.length > 145 ? `${leadSentence.slice(0, 145).trimEnd()}...` : leadSentence;
    const descriptions = [
      `${descBase} Explore practical workflows with ${brand}.`.slice(0, 160),
      `Learn ${topTerms.join(', ').toLowerCase()} best practices locally with ${brand}.`.slice(0, 160),
    ];

    return { topTerms, titles, descriptions };
  }, [brand, article]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <label className="block text-xs text-slate-300 mb-1">Brand Name</label>
          <input value={brand} onChange={(e) => setBrand(e.target.value)} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs text-slate-300 mb-1">Extracted Dominant Topics</label>
          <div className="rounded-lg border border-white/[0.08] bg-[#060911] px-3.5 py-2.5 font-mono text-xs text-violet-300">
            {suggestions.topTerms.join(' · ') || 'Paste article copy below'}
          </div>
        </div>
      </div>

      <textarea rows={5} value={article} onChange={(e) => setArticle(e.target.value)} placeholder="Paste article copy..." className={inputCls} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-white/[0.08] bg-[#060911] p-4 space-y-2.5">
          <h3 className="text-xs font-semibold text-slate-200">Extractive Title Variations</h3>
          {suggestions.titles.map((t, i) => (
            <div key={i} className="flex items-center justify-between gap-2 border-b border-white/[0.05] pb-2 last:border-0 last:pb-0">
              <div className="text-xs text-slate-200">{t} <span className="font-mono text-slate-500">({t.length}c)</span></div>
              <CopyButton text={t} label="Copy" />
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-white/[0.08] bg-[#060911] p-4 space-y-2.5">
          <h3 className="text-xs font-semibold text-slate-200">Extractive Meta Descriptions</h3>
          {suggestions.descriptions.map((d, i) => (
            <div key={i} className="flex items-start justify-between gap-2 border-b border-white/[0.05] pb-2 last:border-0 last:pb-0">
              <div className="text-xs text-slate-300 leading-relaxed">{d} <span className="font-mono text-slate-500">({d.length}c)</span></div>
              <CopyButton text={d} label="Copy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* 54. AI Code & Structure Inspector (AI API-Dependent + Local Static Lexical Inspector) */
export const AiCodeExplainerTool: React.FC = () => {
  const [code, setCode] = useState(
    `import { useState } from 'react';\n\nexport async function fetchProfile(userId: string) {\n  const res = await fetch(\`/api/users/\${userId}\`);\n  if (!res.ok) throw new Error('Failed to load profile');\n  return res.json();\n}\n\nexport function formatName(first: string, last: string) {\n  return \`\${first.trim()} \${last.trim()}\`;\n}`
  );

  const report = useMemo(() => {
    const lines = code.split(/\r?\n/);
    const nonEmpty = lines.filter((l) => l.trim().length > 0).length;
    const commentLines = lines.filter((l) => /^\s*(\/\/|#|\/\*|\*|--)/.test(l)).length;

    let language = 'Generic / Plain Text';
    if (/\b(import|export|const|let|function|interface|type)\b/.test(code)) {
      language = /:\s*(string|number|boolean|Promise<)/.test(code) || /\binterface\b/.test(code) ? 'TypeScript' : 'JavaScript';
    } else if (/\bdef\s+\w+\s*\(/.test(code) || /^\s*from\s+\w+\s+import\b/m.test(code)) {
      language = 'Python';
    } else if (/\bSELECT\b[\s\S]*\bFROM\b/i.test(code)) {
      language = 'SQL';
    } else if (/<[a-zA-Z][^>]*>/.test(code)) {
      language = 'HTML / XML';
    }

    const imports = Array.from(code.matchAll(/^(?:import|from)\s+.*$/gm)).map((m) => m[0].trim());
    const functions = Array.from(
      code.matchAll(/(?:export\s+)?(?:async\s+)?(?:function|def)\s+([a-zA-Z0-9_]+)/g)
    ).map((m) => m[1]);
    const arrowFns = Array.from(
      code.matchAll(/(?:const|let)\s+([a-zA-Z0-9_]+)\s*=\s*(?:async\s+)?\(/g)
    ).map((m) => m[1]);

    const promptForExternalAi = `Explain what this ${language} snippet does, identify edge cases, and suggest improvements:\n\n\`\`\`${language.toLowerCase()}\n${code}\n\`\`\``;

    return {
      language,
      totalLines: lines.length,
      nonEmpty,
      commentLines,
      imports,
      symbols: Array.from(new Set([...functions, ...arrowFns])),
      promptForExternalAi,
    };
  }, [code]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onClear={() => setCode('')}
        copyText={report.promptForExternalAi}
        extra={<span className="font-mono text-xs text-violet-300">Detected: {report.language}</span>}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Lines', value: report.totalLines },
          { label: 'Non-Empty Lines', value: report.nonEmpty },
          { label: 'Comment Lines', value: report.commentLines },
          { label: 'Detected Symbols', value: report.symbols.length },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-white/[0.08] bg-[#060911] px-4 py-3">
            <div className="text-xs text-slate-400">{stat.label}</div>
            <div className="mt-1 font-mono text-lg font-bold tabular-nums text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Source Code Snippet</label>
          <textarea rows={10} value={code} onChange={(e) => setCode(e.target.value)} className={monoAreaCls} />
        </div>

        <div className="rounded-lg border border-white/[0.08] bg-[#060911] p-4 space-y-4 text-xs">
          <div>
            <div className="font-semibold text-slate-200 mb-1.5">Detected Imports / Dependencies ({report.imports.length})</div>
            {report.imports.length === 0 ? (
              <p className="text-slate-500">None detected.</p>
            ) : (
              <ul className="space-y-1 font-mono text-slate-300">
                {report.imports.map((imp, idx) => (
                  <li key={idx} className="truncate">{imp}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="pt-3 border-t border-white/[0.07]">
            <div className="font-semibold text-slate-200 mb-1.5">Declared Functions ({report.symbols.length})</div>
            {report.symbols.length === 0 ? (
              <p className="text-slate-500">No named functions detected.</p>
            ) : (
              <div className="font-mono text-violet-300">{report.symbols.join(', ')}</div>
            )}
          </div>

          <div className="pt-3 border-t border-white/[0.07] flex items-center justify-between gap-2">
            <span className="text-slate-400">Need deep LLM explanation? Export clean prompt:</span>
            <CopyButton text={report.promptForExternalAi} label="Copy AI Prompt" />
          </div>
        </div>
      </div>
    </div>
  );
};
