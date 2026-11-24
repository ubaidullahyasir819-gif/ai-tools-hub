import React, { useEffect, useMemo } from 'react';
import { TOOL_BY_SLUG } from '../data/toolsCatalog';
import { ToolWorkspace } from '../components/ToolWorkspace';
import { ToolRenderer } from '../tools/ToolRenderer';
import { useSeoMeta } from '../hooks/useSeoMeta';

interface ToolPageProps {
  slug: string;
  favorites: string[];
  onToggleFavorite: (slug: string) => void;
  onRecordRecent: (slug: string) => void;
  onNavigate: (path: string) => void;
}

export const ToolPage: React.FC<ToolPageProps> = ({
  slug,
  favorites,
  onToggleFavorite,
  onRecordRecent,
  onNavigate,
}) => {
  const tool = TOOL_BY_SLUG[slug];

  useEffect(() => {
    if (tool) {
      onRecordRecent(tool.slug);
    }
  }, [tool, onRecordRecent]);

  const structuredData = useMemo(() => {
    if (!tool) return undefined;
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: tool.name,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      description: tool.seoDescription,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    };
  }, [tool]);

  useSeoMeta({
    title: tool ? tool.seoTitle : 'Tool Not Found | AI Tools Hub',
    description: tool
      ? tool.seoDescription
      : 'The requested utility could not be found in the AI Tools Hub directory.',
    keywords: tool?.keywords,
    structuredData,
  });

  if (!tool) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white">Tool Not Found</h1>
        <p className="mt-2 text-sm text-slate-400">
          No tool matches "{slug}". Browse the full directory of 54+ utilities instead.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="mt-5 rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-500"
        >
          Back to Directory
        </button>
      </div>
    );
  }

  return (
    <ToolWorkspace
      tool={tool}
      isFavorite={favorites.includes(tool.slug)}
      favorites={favorites}
      onToggleFavorite={onToggleFavorite}
      onNavigate={onNavigate}
    >
      <ToolRenderer slug={tool.slug} />
    </ToolWorkspace>
  );
};
