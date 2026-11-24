import React from 'react';
import {
  WordCounterTool,
  CharacterCounterTool,
  CaseConverterTool,
  TextDiffCheckerTool,
  DuplicateLineRemoverTool,
  TextSorterReverserTool,
  LoremIpsumGeneratorTool,
  FindAndReplaceTool,
  MarkdownToHtmlTool,
  ReadabilityAnalyzerTool,
} from './TextTools';
import {
  JsonFormatterTool,
  JsonToCsvTool,
  CsvToJsonTool,
  CsvToMarkdownTableTool,
  Base64Tool,
  UrlEncoderDecoderTool,
  JwtDecoderTool,
  RegexTesterTool,
  HtmlEntityTool,
  HashGeneratorTool,
} from './DevJsonTools';
import {
  PasswordGeneratorTool,
  QrCodeGeneratorTool,
  UuidGeneratorTool,
  ColorConverterTool,
  TimestampConverterTool,
  CronExpressionTool,
  SlugGeneratorTool,
} from './SecurityGeneratorTools';
import {
  MetaTagGeneratorTool,
  SchemaJsonLdTool,
  RobotsTxtTool,
  UtmLinkBuilderTool,
  KeywordDensityTool,
  SerpLengthCheckerTool,
  SitemapXmlTool,
  HtaccessRedirectTool,
} from './SeoMarketingTools';
import {
  YoutubeThumbnailTool,
  YoutubeTagFormatterTool,
  YoutubeTimestampTool,
  YoutubeTitleAnalyzerTool,
  YoutubeDescriptionTemplateTool,
  VideoBitrateCalculatorTool,
} from './YoutubeCreatorTools';
import {
  PercentageCalculatorTool,
  LoanEmiCalculatorTool,
  CompoundInterestTool,
  MarginMarkupCalculatorTool,
  AgeDateCalculatorTool,
  BmiBmrCalculatorTool,
  UnitConverterTool,
} from './CalculatorTools';
import {
  AiTokenCalculatorTool,
  AiPromptBuilderTool,
  AiTextSummarizerTool,
  AiToneRewriterTool,
  AiSeoMetaWriterTool,
  AiCodeExplainerTool,
} from './AiUtilityTools';

const TOOL_COMPONENTS: Record<string, React.FC> = {
  'word-counter': WordCounterTool,
  'character-counter': CharacterCounterTool,
  'case-converter': CaseConverterTool,
  'text-diff-checker': TextDiffCheckerTool,
  'duplicate-line-remover': DuplicateLineRemoverTool,
  'text-sorter-reverser': TextSorterReverserTool,
  'lorem-ipsum-generator': LoremIpsumGeneratorTool,
  'find-and-replace': FindAndReplaceTool,
  'markdown-to-html': MarkdownToHtmlTool,
  'readability-analyzer': ReadabilityAnalyzerTool,

  'json-formatter': JsonFormatterTool,
  'json-to-csv': JsonToCsvTool,
  'csv-to-json': CsvToJsonTool,
  'csv-to-markdown-table': CsvToMarkdownTableTool,
  'base64-encoder-decoder': Base64Tool,
  'url-encoder-decoder': UrlEncoderDecoderTool,
  'jwt-decoder': JwtDecoderTool,
  'regex-tester': RegexTesterTool,
  'html-entity-encoder': HtmlEntityTool,
  'hash-generator': HashGeneratorTool,

  'password-generator': PasswordGeneratorTool,
  'qr-code-generator': QrCodeGeneratorTool,
  'uuid-generator': UuidGeneratorTool,
  'color-converter': ColorConverterTool,
  'timestamp-converter': TimestampConverterTool,
  'cron-expression-explainer': CronExpressionTool,
  'barcode-slug-generator': SlugGeneratorTool,

  'meta-tag-generator': MetaTagGeneratorTool,
  'schema-jsonld-generator': SchemaJsonLdTool,
  'robots-txt-generator': RobotsTxtTool,
  'utm-link-builder': UtmLinkBuilderTool,
  'keyword-density-checker': KeywordDensityTool,
  'serp-length-checker': SerpLengthCheckerTool,
  'sitemap-xml-generator': SitemapXmlTool,
  'htaccess-redirect-generator': HtaccessRedirectTool,

  'youtube-thumbnail-extractor': YoutubeThumbnailTool,
  'youtube-tag-extractor': YoutubeTagFormatterTool,
  'youtube-timestamp-builder': YoutubeTimestampTool,
  'youtube-title-analyzer': YoutubeTitleAnalyzerTool,
  'youtube-description-template': YoutubeDescriptionTemplateTool,
  'video-bitrate-calculator': VideoBitrateCalculatorTool,

  'percentage-calculator': PercentageCalculatorTool,
  'loan-emi-calculator': LoanEmiCalculatorTool,
  'compound-interest-calculator': CompoundInterestTool,
  'margin-markup-calculator': MarginMarkupCalculatorTool,
  'age-date-calculator': AgeDateCalculatorTool,
  'bmi-bmr-calculator': BmiBmrCalculatorTool,
  'unit-converter': UnitConverterTool,

  'ai-token-calculator': AiTokenCalculatorTool,
  'ai-prompt-builder': AiPromptBuilderTool,
  'ai-text-summarizer': AiTextSummarizerTool,
  'ai-tone-rewriter': AiToneRewriterTool,
  'ai-seo-meta-writer': AiSeoMetaWriterTool,
  'ai-code-explainer': AiCodeExplainerTool,
};

export const ToolRenderer: React.FC<{ slug: string }> = ({ slug }) => {
  const Component = TOOL_COMPONENTS[slug];
  if (!Component) {
    return (
      <div className="rounded-lg border border-rose-500/40 bg-rose-950/30 p-4 text-sm text-rose-200">
        Tool implementation not found for slug: <code>{slug}</code>
      </div>
    );
  }
  return <Component />;
};
