import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronRight, ShieldCheck, Star } from 'lucide-react';
import { ToolDefinition } from '../types/tool';
import { CATEGORY_MAP } from '../data/categories';
import { TOOL_BY_SLUG } from '../data/toolsCatalog';
import { AdPlacement } from './AdPlacement';
import { ToolCard } from './ToolCard';

interface ToolWorkspaceProps {
  tool: ToolDefinition;
  isFavorite: boolean;
  favorites: string[];
  onToggleFavorite: (slug: string) => void;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const ToolWorkspace: React.FC<ToolWorkspaceProps> = ({
  tool,
  isFavorite,
  favorites,
  onToggleFavorite,
  onNavigate,
  children,
}) => {
  const category = CATEGORY_MAP[tool.category];
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const relatedTools = tool.relatedSlugs
    .map((slug) => TOOL_BY_SLUG[slug])
    .filter((t): t is ToolDefinition => Boolean(t));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/');
          }}
          className="hover:text-white transition-colors"
        >
          Home
        </a>
        <ChevronRight className="h-3.5 w-3.5 text-slate-600" aria-hidden="true" />
        <a
          href={`#/category/${category.id}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(`/category/${category.id}`);
          }}
          className="hover:text-white transition-colors"
        >
          {category.name}
        </a>
        <ChevronRight className="h-3.5 w-3.5 text-slate-600" aria-hidden="true" />
        <span className="text-slate-200 font-medium">{tool.name}</span>
      </nav>

      {/* Tool Header */}
      <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs text-slate-400">
            <span>{category.name}</span>
            <span aria-hidden="true" className="mx-2 text-slate-600">·</span>
            <span
              className={
                tool.executionMode === 'ai-api-dependent'
                  ? 'text-amber-300 font-medium'
                  : 'text-emerald-400 font-medium'
              }
            >
              {tool.executionMode === 'ai-api-dependent'
                ? 'AI API-Dependent (Local Preview Active)'
                : '100% Browser Local'}
            </span>
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white [text-wrap:balance]">
            {tool.name}
          </h1>
          <p className="mt-2 text-base text-slate-300 leading-relaxed">
            {tool.shortDescription}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onToggleFavorite(tool.slug)}
            aria-pressed={isFavorite}
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              isFavorite
                ? 'border-violet-500/60 bg-violet-600/20 text-violet-200'
                : 'border-white/[0.1] bg-[#0B101D] text-slate-200 hover:border-violet-500/50 hover:text-white'
            }`}
          >
            <Star className={`h-3.5 w-3.5 ${isFavorite ? 'fill-current text-violet-300' : ''}`} aria-hidden="true" />
            <span>{isFavorite ? 'Saved in Favorites' : 'Save to Favorites'}</span>
          </button>
        </div>
      </div>

      {/* Explicit notice for AI API-Dependent tools */}
      {tool.executionMode === 'ai-api-dependent' && (
        <div
          role="note"
          className="mt-6 rounded-xl border border-amber-500/30 bg-amber-950/20 px-4 py-3.5 flex items-start gap-3"
        >
          <AlertTriangle className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
            <span className="font-semibold text-amber-200">AI API-Dependent Capability:</span>{' '}
            Full generative LLM rewriting or neural inference requires connecting a server-side AI API (never exposed in browser code). Because AI Tools Hub uses no paid APIs on this static site, this workspace executes a real client-side JavaScript heuristic engine locally so you can test and export results immediately without API keys.
          </div>
        </div>
      )}

      {/* Main Interactive Tool Surface */}
      <section aria-label={`${tool.name} interactive tool`} className="mt-6 rounded-xl border border-white/[0.08] bg-[#0B101D] p-4 sm:p-6">
        {children}
      </section>

      {/* Reserved Leaderboard Ad Slot */}
      <div className="mt-8">
        <AdPlacement variant="leaderboard" slotId={`tool-${tool.slug}-top`} />
      </div>

      {/* Explanatory Content + Sidebar Reserved Ad */}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-8">
          <section className="rounded-xl border border-white/[0.08] bg-[#0B101D] p-6">
            <h2 className="text-lg font-semibold text-white">How to Use {tool.name}</h2>
            <ol className="mt-4 space-y-3 text-sm text-slate-300">
              {tool.howToUse.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-violet-600/20 font-mono text-xs font-semibold tabular-nums text-violet-300">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <section className="rounded-xl border border-white/[0.08] bg-[#0B101D] p-6">
              <h2 className="text-base font-semibold text-white">Key Capabilities</h2>
              <ul className="mt-3 space-y-2.5 text-sm text-slate-300">
                {tool.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="mt-2 h-1 w-1 rounded-full bg-violet-400 shrink-0" aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-white/[0.08] bg-[#0B101D] p-6">
              <h2 className="text-base font-semibold text-white">Practical Use Cases</h2>
              <ul className="mt-3 space-y-2.5 text-sm text-slate-300">
                {tool.useCases.map((uc, i) => (
                  <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="mt-2 h-1 w-1 rounded-full bg-slate-400 shrink-0" aria-hidden="true" />
                    <span>{uc}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="rounded-xl border border-white/[0.08] bg-[#0B101D] p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h2 className="text-base font-semibold text-white">Privacy &amp; Data Processing</h2>
                <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">{tool.privacyNote}</p>
              </div>
            </div>
          </section>

          {tool.faqs.length > 0 && (
            <section className="rounded-xl border border-white/[0.08] bg-[#0B101D] p-6">
              <h2 className="text-lg font-semibold text-white">Frequently Asked Questions</h2>
              <div className="mt-4 divide-y divide-white/[0.07]">
                {tool.faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="py-3 first:pt-0 last:pb-0">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 text-left text-sm font-medium text-slate-100 hover:text-white py-1"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-150 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen && (
                        <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar with Reserved Ad Placement & Quick Info */}
        <div className="lg:col-span-4 space-y-6">
          <AdPlacement variant="rectangle" slotId={`tool-${tool.slug}-sidebar`} />

          <div className="rounded-xl border border-white/[0.08] bg-[#0B101D] p-5">
            <h2 className="text-sm font-semibold text-white">Tool Specifications</h2>
            <dl className="mt-3 space-y-2.5 text-xs">
              <div className="flex items-center justify-between gap-4 py-1.5 border-b border-white/[0.06]">
                <dt className="text-slate-400">Category</dt>
                <dd className="text-slate-200 font-medium text-right">{category.shortName}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-1.5 border-b border-white/[0.06]">
                <dt className="text-slate-400">Runtime</dt>
                <dd className="text-slate-200 font-medium text-right">
                  {tool.executionMode === 'ai-api-dependent' ? 'AI API-Dependent (Local Preview)' : 'Browser JavaScript'}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-1.5 border-b border-white/[0.06]">
                <dt className="text-slate-400">Paid API Required</dt>
                <dd className="text-slate-200 font-medium text-right">No</dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-1.5">
                <dt className="text-slate-400">Account Needed</dt>
                <dd className="text-slate-200 font-medium text-right">None</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="mt-12 pt-8 border-t border-white/[0.08]">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-white">Related Utilities</h2>
            <a
              href={`#/category/${tool.category}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/category/${tool.category}`);
              }}
              className="text-xs font-medium text-violet-300 hover:text-violet-200"
            >
              View all in {category.shortName}
            </a>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((rel) => (
              <ToolCard
                key={rel.slug}
                tool={rel}
                isFavorite={favorites.includes(rel.slug)}
                onToggleFavorite={onToggleFavorite}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
