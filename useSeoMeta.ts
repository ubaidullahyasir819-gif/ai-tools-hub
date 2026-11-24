import { useEffect } from 'react';

export interface SeoMetaOptions {
  title: string;
  description: string;
  keywords?: string[];
  structuredData?: Record<string, unknown>;
}

export function useSeoMeta({ title, description, keywords, structuredData }: SeoMetaOptions) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attrName: string, attrValue: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    if (keywords && keywords.length > 0) {
      setMeta('meta[name="keywords"]', 'name', 'keywords', keywords.join(', '));
    }

    const ldScript = document.getElementById('structured-data-jsonld');
    if (ldScript && structuredData) {
      ldScript.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, structuredData]);
}
