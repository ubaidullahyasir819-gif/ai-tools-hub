import React from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
import { ToolDefinition } from '../types/tool';
import { CATEGORY_MAP } from '../data/categories';

interface ToolCardProps {
  tool: ToolDefinition;
  isFavorite: boolean;
  onToggleFavorite: (slug: string) => void;
  onNavigate: (path: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  isFavorite,
  onToggleFavorite,
  onNavigate,
}) => {
  const category = CATEGORY_MAP[tool.category];

  return (
    <article className="group relative flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#0B101D] p-5 transition-colors duration-150 hover:border-violet-500/45 hover:bg-[#0E1526]">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-slate-400 truncate">
              <span>{category?.shortName}</span>
              <span aria-hidden="true" className="mx-1.5 text-slate-600">·</span>
              <span
                className={
                  tool.executionMode === 'ai-api-dependent'
                    ? 'text-amber-300'
                    : 'text-slate-400'
                }
              >
                {tool.executionMode === 'ai-api-dependent' ? 'AI API-Dependent' : 'Browser Local'}
              </span>
            </p>
            <h3 className="mt-2 text-base font-semibold tracking-tight text-slate-100 group-hover:text-white">
              <a
                href={`#/tool/${tool.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/tool/${tool.slug}`);
                }}
                className="focus-visible:outline-none focus-visible:underline"
              >
                {tool.name}
              </a>
            </h3>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(tool.slug);
            }}
            aria-label={isFavorite ? `Remove ${tool.name} from favorites` : `Add ${tool.name} to favorites`}
            aria-pressed={isFavorite}
            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
              isFavorite
                ? 'border-violet-500/50 bg-violet-600/20 text-violet-300'
                : 'border-white/[0.07] bg-transparent text-slate-500 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <Star className={`h-3.5 w-3.5 ${isFavorite ? 'fill-current' : ''}`} aria-hidden="true" />
          </button>
        </div>

        <p className="mt-2.5 text-sm leading-relaxed text-slate-400 line-clamp-2">
          {tool.shortDescription}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
        <a
          href={`#/tool/${tool.slug}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(`/tool/${tool.slug}`);
          }}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-300 transition-colors hover:text-violet-200"
        >
          <span>Open Tool</span>
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
};
