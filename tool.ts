export type ToolCategoryId =
  | 'text-writing'
  | 'developer-json'
  | 'security-generators'
  | 'seo-marketing'
  | 'youtube-creator'
  | 'calculators-math'
  | 'ai-prompts';

export type ToolExecutionMode = 'local' | 'ai-api-dependent';

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolDefinition {
  slug: string;
  name: string;
  category: ToolCategoryId;
  executionMode: ToolExecutionMode;
  shortDescription: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  howToUse: string[];
  features: string[];
  useCases: string[];
  privacyNote: string;
  faqs: ToolFAQ[];
  relatedSlugs: string[];
  popular?: boolean;
}

export interface ToolCategory {
  id: ToolCategoryId;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
}
