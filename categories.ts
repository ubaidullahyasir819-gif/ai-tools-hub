import { ToolCategory } from '../types/tool';

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: 'text-writing',
    name: 'Text & Writing Tools',
    shortName: 'Text & Writing',
    description:
      'Analyze word counts, convert letter casing, compare drafts, clean duplicate lines, and check readability scores directly in your browser.',
    iconName: 'FileText',
  },
  {
    id: 'developer-json',
    name: 'Developer & JSON Tools',
    shortName: 'Developer & JSON',
    description:
      'Format JSON, convert CSV and Markdown tables, decode JWT tokens, test regular expressions, encode Base64/URLs, and compute Web Crypto hashes.',
    iconName: 'Code2',
  },
  {
    id: 'security-generators',
    name: 'Security & Utility Generators',
    shortName: 'Generators',
    description:
      'Generate cryptographic passwords, standard QR codes, UUIDs/ULIDs, WCAG color contrasts, Unix timestamps, cron schedules, and clean URL slugs.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'seo-marketing',
    name: 'SEO & Marketing Tools',
    shortName: 'SEO & Marketing',
    description:
      'Preview Google SERP snippets, build Schema.org JSON-LD, create robots.txt and XML sitemaps, assemble UTM tracking links, and audit keyword density.',
    iconName: 'Search',
  },
  {
    id: 'youtube-creator',
    name: 'YouTube & Creator Tools',
    shortName: 'YouTube & Creator',
    description:
      'Extract YouTube thumbnail resolutions, format 500-char tags, validate chapter timestamps, optimize video titles, and estimate video file sizes.',
    iconName: 'PlaySquare',
  },
  {
    id: 'calculators-math',
    name: 'Calculators & Converters',
    shortName: 'Calculators',
    description:
      'Calculate percentages, loan EMIs with amortization tables, compound interest, profit margins, date differences, BMI/TDEE, and engineering units.',
    iconName: 'Calculator',
  },
  {
    id: 'ai-prompts',
    name: 'AI & Prompt Utilities',
    shortName: 'AI & Prompts',
    description:
      'Estimate LLM tokens and prompt budgets locally, structure system prompts, and preview clearly labeled AI API-dependent text workflows with local heuristic fallbacks.',
    iconName: 'Sparkles',
  },
];

export const CATEGORY_MAP = Object.fromEntries(
  TOOL_CATEGORIES.map((category) => [category.id, category])
) as Record<ToolCategory['id'], ToolCategory>;
