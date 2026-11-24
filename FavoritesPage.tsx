import React from 'react';
import { Clock, Star, Trash2 } from 'lucide-react';
import { TOOL_BY_SLUG } from '../data/toolsCatalog';
import { ToolDefinition } from '../types/tool';
import { ToolCard } from '../components/ToolCard';
import { useSeoMeta } from '../hooks/useSeoMeta';

interface FavoritesPageProps {
  favorites: string[];
  recentTools: string[];
  onToggleFavorite: (slug: string) => void;
  onClearRecents: () => void;
  onNavigate: (path: string) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  favorites,
  recentTools,
  onToggleFavorite,
  onClearRecents,
  onNavigate,
}) => {
  useSeoMeta({
    title: 'Favorites & Recently Used Tools | AI Tools Hub',
    description: 'Access your pinned favorite tools and recently used utilities saved locally in your browser.',
  });

  const favList = favorites
    .map((s) => TOOL_BY_SLUG[s])
    .filter((t): t is ToolDefinition => Boolean(t));

  const recentList = recentTools
    .map((s) => TOOL_BY_SLUG[s])
    .filter((t): t is ToolDefinition => Boolean(t));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Favorites &amp; Recent Tools
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Stored privately in your browser’s local storage—no account required.
        </p>
      </div>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <Star className="h-4 w-4 text-violet-400 fill-current" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-white">Saved Favorites ({favList.length})</h2>
        </div>

        {favList.length === 0 ? (
          <div className="rounded-xl border border-white/[0.08] bg-[#0B101D] p-8 text-center">
            <p className="text-sm text-slate-300">You haven’t starred any tools yet.</p>
            <p className="mt-1 text-xs text-slate-500">
              Click the star button on any tool card or workspace header to pin it here.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="mt-4 rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-500"
            >
              Browse All Tools
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favList.map((tool) => (
              <ToolCard
                key={tool.slug}
                tool={tool}
                isFavorite
                onToggleFavorite={onToggleFavorite}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-400" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-white">Recently Used ({recentList.length})</h2>
          </div>
          {recentList.length > 0 && (
            <button
              type="button"
              onClick={onClearRecents}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] px-3 py-1.5 text-xs text-slate-300 hover:text-white"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {recentList.length === 0 ? (
          <div className="rounded-xl border border-white/[0.08] bg-[#0B101D] p-6 text-sm text-slate-400">
            Tools you open will automatically appear here for quick access.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentList.map((tool) => (
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
    </div>
  );
};
