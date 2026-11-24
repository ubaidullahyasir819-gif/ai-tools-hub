import { useCallback, useEffect, useRef, useState } from 'react';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ToolPage } from './pages/ToolPage';
import { FavoritesPage } from './pages/FavoritesPage';
import {
  AboutPage,
  ContactPage,
  DisclaimerPage,
  FaqPage,
  PrivacyPolicyPage,
  TermsPage,
} from './pages/StaticPages';
import { usePersistentState } from './hooks/usePersistentState';
import { CATEGORY_MAP } from './data/categories';
import { ToolCategoryId } from './types/tool';

function getRouteFromLocation(): string {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#')) {
    const cleaned = hash.slice(1);
    return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
  }
  const pathname = window.location.pathname;
  if (pathname && pathname !== '/' && !pathname.endsWith('.html')) {
    return pathname;
  }
  return '/';
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => getRouteFromLocation());
  const [favorites, setFavorites] = usePersistentState<string[]>('ai_tools_hub_favorites', [
    'word-counter',
    'json-formatter',
    'qr-code-generator',
  ]);
  const [recentTools, setRecentTools] = usePersistentState<string[]>('ai_tools_hub_recent', []);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPath(getRouteFromLocation());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((path: string) => {
    const normalized = path.startsWith('/') ? path : `/${path}`;
    window.location.hash = `#${normalized}`;
    setCurrentPath(normalized);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleQuickSearch = useCallback(() => {
    if (currentPath !== '/') {
      navigate('/');
      window.setTimeout(() => {
        searchInputRef.current?.focus();
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.setTimeout(() => {
        searchInputRef.current?.focus();
      }, 120);
    }
  }, [currentPath, navigate]);

  const toggleFavorite = useCallback(
    (slug: string) => {
      setFavorites((prev) =>
        prev.includes(slug) ? prev.filter((s) => s !== slug) : [slug, ...prev]
      );
    },
    [setFavorites]
  );

  const recordRecent = useCallback(
    (slug: string) => {
      setRecentTools((prev) => [slug, ...prev.filter((s) => s !== slug)].slice(0, 12));
    },
    [setRecentTools]
  );

  const renderPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePage
          initialCategory="all"
          favorites={favorites}
          recentTools={recentTools}
          onToggleFavorite={toggleFavorite}
          onNavigate={navigate}
          searchInputRef={searchInputRef}
        />
      );
    }

    if (currentPath.startsWith('/category/')) {
      const catId = currentPath.replace('/category/', '').split('/')[0] as ToolCategoryId;
      const validCat = CATEGORY_MAP[catId] ? catId : 'all';
      return (
        <HomePage
          initialCategory={validCat}
          favorites={favorites}
          recentTools={recentTools}
          onToggleFavorite={toggleFavorite}
          onNavigate={navigate}
          searchInputRef={searchInputRef}
        />
      );
    }

    if (currentPath.startsWith('/tool/')) {
      const slug = currentPath.replace('/tool/', '').split('/')[0];
      return (
        <ToolPage
          slug={slug}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onRecordRecent={recordRecent}
          onNavigate={navigate}
        />
      );
    }

    if (currentPath === '/favorites') {
      return (
        <FavoritesPage
          favorites={favorites}
          recentTools={recentTools}
          onToggleFavorite={toggleFavorite}
          onClearRecents={() => setRecentTools([])}
          onNavigate={navigate}
        />
      );
    }

    if (currentPath === '/about') return <AboutPage onNavigate={navigate} />;
    if (currentPath === '/contact') return <ContactPage />;
    if (currentPath === '/privacy') return <PrivacyPolicyPage />;
    if (currentPath === '/terms') return <TermsPage />;
    if (currentPath === '/disclaimer') return <DisclaimerPage />;
    if (currentPath === '/faq') return <FaqPage />;

    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
        <p className="mt-2 text-sm text-slate-400">
          The requested page does not exist. Return to the main AI Tools Hub directory.
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-5 rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-500"
        >
          Go to Homepage
        </button>
      </div>
    );
  };

  return (
    <Layout
      currentPath={currentPath}
      onNavigate={navigate}
      onQuickSearch={handleQuickSearch}
      favoritesCount={favorites.length}
    >
      {renderPage()}
    </Layout>
  );
}
