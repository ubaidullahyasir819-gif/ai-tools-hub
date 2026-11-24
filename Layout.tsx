import React, { useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { TOOL_CATEGORIES } from '../data/categories';

interface LayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onQuickSearch: () => void;
  favoritesCount: number;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  currentPath,
  onNavigate,
  onQuickSearch,
  favoritesCount,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLink = (path: string, label: string) => {
    const isActive = currentPath === path || (path !== '/' && currentPath.startsWith(path));
    return (
      <a
        href={`#${path}`}
        onClick={(e) => {
          e.preventDefault();
          setMobileMenuOpen(false);
          onNavigate(path);
        }}
        className={`text-sm font-medium whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
          isActive
            ? 'text-white border-violet-500'
            : 'text-slate-300 border-transparent hover:text-white hover:border-slate-600'
        }`}
      >
        {label}
      </a>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#05070C] text-slate-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to main content
      </a>

      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#05070C]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
          {/* Zone 1: Single-element Brand Wordmark */}
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              onNavigate('/');
            }}
            className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0"
          >
            AI Tools Hub
          </a>

          {/* Zone 2: Concise single-line nav links */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-6">
            {navLink('/', 'Directory')}
            {navLink('/favorites', `Favorites (${favoritesCount})`)}
            {navLink('/about', 'About')}
            {navLink('/faq', 'FAQ')}
            {navLink('/contact', 'Contact')}
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onQuickSearch}
              className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-violet-500 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-violet-400"
            >
              <Search className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Find a Tool</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-[#0B101D] text-slate-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/[0.08] bg-[#0B101D] px-4 py-4">
            <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
              {[
                { path: '/', label: 'All Tools Directory' },
                { path: '/favorites', label: `Favorites & History (${favoritesCount})` },
                { path: '/about', label: 'About AI Tools Hub' },
                { path: '/faq', label: 'FAQ' },
                { path: '/contact', label: 'Contact' },
                { path: '/privacy', label: 'Privacy Policy' },
              ].map((item) => (
                <a
                  key={item.path}
                  href={`#${item.path}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    onNavigate(item.path);
                  }}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    currentPath === item.path
                      ? 'bg-violet-600/20 text-violet-200'
                      : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Clean Footer */}
      <footer className="mt-16 border-t border-white/[0.08] bg-[#070A12]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <a
                href="#/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/');
                }}
                className="text-base font-bold tracking-tight text-white"
              >
                AI Tools Hub
              </a>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                54+ fast, static-ready browser utilities for writing, JSON/CSV data, SEO, creators, and everyday math.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-200">Tool Categories</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                {TOOL_CATEGORIES.slice(0, 4).map((cat) => (
                  <li key={cat.id}>
                    <a
                      href={`#/category/${cat.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/category/${cat.id}`);
                      }}
                      className="hover:text-white transition-colors"
                    >
                      {cat.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-200">More Suites</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                {TOOL_CATEGORIES.slice(4).map((cat) => (
                  <li key={cat.id}>
                    <a
                      href={`#/category/${cat.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/category/${cat.id}`);
                      }}
                      className="hover:text-white transition-colors"
                    >
                      {cat.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#/favorites"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/favorites');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Favorites &amp; Recent Tools
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-200">Company &amp; Legal</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                {[
                  { path: '/about', label: 'About' },
                  { path: '/contact', label: 'Contact' },
                  { path: '/faq', label: 'FAQ' },
                  { path: '/privacy', label: 'Privacy Policy' },
                  { path: '/terms', label: 'Terms of Service' },
                  { path: '/disclaimer', label: 'Disclaimer' },
                ].map((link) => (
                  <li key={link.path}>
                    <a
                      href={`#${link.path}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(link.path);
                      }}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} AI Tools Hub. Browser utilities execute locally on your device.</p>
            <p>Static-deployable web suite · No paid APIs or frontend secrets.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
