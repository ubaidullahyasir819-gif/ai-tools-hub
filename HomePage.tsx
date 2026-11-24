import React, { useMemo, useRef, useState } from 'react';
import { ArrowRight, Clock, Search, ShieldCheck, Star, X } from 'lucide-react';
import { TOOL_CATEGORIES, CATEGORY_MAP } from '../data/categories';
import { TOOLS_CATALOG, TOOL_BY_SLUG } from '../data/toolsCatalog';
import { ToolCategoryId, ToolDefinition } from '../types/tool';
import { useSeoMeta } from '../hooks/useSeoMeta';
import { ToolCard } from '../components/ToolCard';
import { AdPlacement } from '../components/AdPlacement';

interface HomePageProps {
  initialCategory?: ToolCategoryId | 'all';
  favorites: string[];
  recentTools: string[];
  onToggleFavorite: (slug: string) => void;
  onNavigate: (path: string) => void;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

export const HomePage: React.FC<HomePageProps> = ({
  initialCategory = 'all',
  favorites,
  recentTools,
  onToggleFavorite,
  onNavigate,
  searchInputRef,
}) => {
  const localRef = useRef<HTMLInputElement>(null);
  const inputRef = searchInputRef || localRef;
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategoryId | 'all'>(initialCategory);
  const [modeFilter, setModeFilter] = useState<'all' | 'local' | 'ai-api-dependent'>('all');

  const activeCategoryObj = activeCategory !== 'all' ? CATEGORY_MAP[activeCategory] : null;

  useSeoMeta({
    title: activeCategoryObj
      ? `${activeCategoryObj.name} | AI Tools Hub`
      : 'AI Tools Hub – 54+ Free Browser Utilities, Converters & AI Tools',
    description: activeCategoryObj
      ? activeCategoryObj.description
      : 'Explore 54+ fast, privacy-first browser utilities for writing, JSON/CSV conversion, SEO, YouTube, QR codes, passwords, and calculators.',
  });

  // Sync if navigated to a category route
  React.useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS_CATALOG.filter((tool) => {
      if (activeCategory !== 'all' && tool.category !== activeCategory) return false;
      if (modeFilter !== 'all' && tool.executionMode !== modeFilter) return false;
      if (!q) return true;
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.keywords.some((k) => k.toLowerCase().includes(q)) ||
        CATEGORY_MAP[tool.category].name.toLowerCase().includes(q)
      );
    });
  }, [query, activeCategory, modeFilter]);

  const favoriteItems = useMemo(
    () => favorites.map((slug) => TOOL_BY_SLUG[slug]).filter((t): t is ToolDefinition => Boolean(t)),
    [favorites]
  );

  const recentItems = useMemo(
    () => recentTools.map((slug) => TOOL_BY_SLUG[slug]).filter((t): t is ToolDefinition => Boolean(t)).slice(0, 6),
    [recentTools]
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="border-b border-white/[0.07] bg-gradient-to-b from-[#0A0F1E] via-[#070A13] to-[#05070C]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-medium text-violet-300">
              Static Browser Suite · 54 Working Tools · Zero Server Uploads
            </p>
            <h1 className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight text-white [text-wrap:balance] leading-[1.12]">
              Every everyday developer, text, SEO, and creator utility in one fast workspace.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Format JSON, convert CSV spreadsheets, generate QR codes and passwords, audit SEO metadata, and calculate finances directly in your browser without paid APIs or accounts.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-2xl">
            <label htmlFor="hub-search-input" className="sr-only">
              Search all 54+ tools
            </label>
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-4 h-4 w-4 text-slate-400" aria-hidden="true" />
              <input
                ref={inputRef}
                id="hub-search-input"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 54+ tools (e.g. JSON, QR code, Word Counter, EMI, YouTube)..."
                className="w-full rounded-xl border border-white/[0.12] bg-[#0B101D] pl-11 pr-24 py-3.5 text-sm text-white placeholder:text-slate-400 focus:border-violet-500 focus:outline-none"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-400 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Clear</span>
                </button>
              ) : (
                <span className="pointer-events-none absolute right-4 font-mono text-xs tabular-nums text-slate-500">
                  {TOOLS_CATALOG.length} tools
                </span>
              )}
            </div>
          </div>

          {/* Quick Links to Popular Tools */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
            <span className="text-slate-500">Popular:</span>
            {TOOLS_CATALOG.filter((t) => t.popular)
              .slice(0, 6)
              .map((t) => (
                <a
                  key={t.slug}
                  href={`#/tool/${t.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/tool/${t.slug}`);
                  }}
                  className="text-slate-300 hover:text-violet-300 underline decoration-white/15 underline-offset-4 transition-colors"
                >
                  {t.name}
                </a>
              ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Favorites & Recently Used Quick Access (if any exist) */}
        {(favoriteItems.length > 0 || recentItems.length > 0) && !query && activeCategory === 'all' && (
          <section aria-label="Personal workspace shortcuts" className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {favoriteItems.length > 0 && (
              <div className="rounded-xl border border-white/[0.08] bg-[#0B101D] p-5">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-violet-400 fill-current" aria-hidden="true" />
                    <h2 className="text-sm font-semibold text-white">Pinned Favorites</h2>
                  </div>
                  <a
                    href="#/favorites"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/favorites');
                    }}
                    className="text-xs text-violet-300 hover:text-violet-200"
                  >
                    Manage all ({favoriteItems.length})
                  </a>
                </div>
                <div className="flex flex-wrap gap-2">
                  {favoriteItems.slice(0, 8).map((tool) => (
                    <a
                      key={tool.slug}
                      href={`#/tool/${tool.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/tool/${tool.slug}`);
                      }}
                      className="rounded-lg border border-white/[0.08] bg-[#060911] px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-violet-500/50 hover:text-white transition-colors"
                    >
                      {tool.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {recentItems.length > 0 && (
              <div className="rounded-xl border border-white/[0.08] bg-[#0B101D] p-5">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-400" aria-hidden="true" />
                    <h2 className="text-sm font-semibold text-white">Recently Used</h2>
                  </div>
                  <a
                    href="#/favorites"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/favorites');
                    }}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    View history
                  </a>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentItems.map((tool) => (
                    <a
                      key={tool.slug}
                      href={`#/tool/${tool.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/tool/${tool.slug}`);
                      }}
                      className="rounded-lg border border-white/[0.08] bg-[#060911] px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-violet-500/50 hover:text-white transition-colors"
                    >
                      {tool.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Category Filter Controls & Directory */}
        <section aria-label="Tools directory">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#0B101D] p-1.5">
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  if (initialCategory !== 'all') onNavigate('/');
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  activeCategory === 'all'
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({TOOLS_CATALOG.length})
              </button>
              {TOOL_CATEGORIES.map((cat) => {
                const count = TOOLS_CATALOG.filter((t) => t.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      activeCategory === cat.id
                        ? 'bg-violet-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat.shortName} ({count})
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-slate-400">Runtime:</span>
              <div className="inline-flex rounded-lg border border-white/[0.08] bg-[#0B101D] p-1">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'local', label: 'Local' },
                  { id: 'ai-api-dependent', label: 'AI API-Dependent' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setModeFilter(m.id as typeof modeFilter)}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium whitespace-nowrap shrink-0 ${
                      modeFilter === m.id ? 'bg-[#17213B] text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
            <span>
              Showing <span className="font-mono tabular-nums text-white">{filteredTools.length}</span>{' '}
              {filteredTools.length === 1 ? 'utility' : 'utilities'}
              {activeCategoryObj ? ` in ${activeCategoryObj.name}` : ''}
            </span>
            {(query || activeCategory !== 'all' || modeFilter !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setActiveCategory('all');
                  setModeFilter('all');
                }}
                className="text-violet-300 hover:text-violet-200"
              >
                Reset filters
              </button>
            )}
          </div>

          {filteredTools.length === 0 ? (
            <div className="mt-6 rounded-xl border border-white/[0.08] bg-[#0B101D] p-10 text-center">
              <p className="text-sm font-medium text-white">No tools matched "{query}"</p>
              <p className="mt-1 text-xs text-slate-400">
                Try searching for broader terms like "JSON", "CSV", "QR", "YouTube", or "Calculator".
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setActiveCategory('all');
                  setModeFilter('all');
                }}
                className="mt-4 rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-500"
              >
                Show All {TOOLS_CATALOG.length} Tools
              </button>
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.slug}
                  tool={tool}
                  isFavorite={favorites.includes(tool.slug)}
                  onToggleFavorite={onToggleFavorite}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          )}
        </section>

        {/* Reserved Leaderboard Ad Slot */}
        <AdPlacement variant="leaderboard" slotId="home-mid-leaderboard" />

        {/* Architecture & Transparency Section */}
        <section className="rounded-xl border border-white/[0.08] bg-[#0B101D] p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <ShieldCheck className="h-5 w-5 text-emerald-400" aria-hidden="true" />
              <h2 className="mt-3 text-base font-semibold text-white">Browser-Local Execution</h2>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Text analysis, JSON/CSV transforms, cryptographic password generation, and financial math run strictly in client-side JavaScript without uploading payloads.
              </p>
            </div>
            <div>
              <Search className="h-5 w-5 text-violet-400" aria-hidden="true" />
              <h2 className="mt-3 text-base font-semibold text-white">Transparent AI Labeling</h2>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Tools whose full generative behavior depends on an external LLM API are explicitly labeled <span className="text-amber-300">AI API-Dependent</span> and provide working local heuristic previews with zero exposed API keys.
              </p>
            </div>
            <div>
              <ArrowRight className="h-5 w-5 text-slate-300" aria-hidden="true" />
              <h2 className="mt-3 text-base font-semibold text-white">Static-Site Deployable</h2>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Built as a clean static bundle with hash routing, dynamic SEO metadata, and zero paid API dependencies—ready for any CDN or static host.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
