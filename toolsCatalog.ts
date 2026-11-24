import { ToolDefinition } from '../types/tool';

export const TOOLS_CATALOG: ToolDefinition[] = [
  // =========================================================================
  // 1. TEXT & WRITING TOOLS (10)
  // =========================================================================
  {
    slug: 'word-counter',
    name: 'Word Counter',
    category: 'text-writing',
    executionMode: 'local',
    popular: true,
    shortDescription: 'Count words, characters, sentences, paragraphs, reading time, and top keyword density in real time.',
    seoTitle: 'Word Counter – Free Online Word & Reading Time Analyzer | AI Tools Hub',
    seoDescription: 'Instantly count words, characters, sentences, paragraphs, and estimated reading or speaking time locally in your browser.',
    keywords: ['word counter', 'reading time calculator', 'word density', 'essay word count'],
    howToUse: [
      'Paste or type your draft, essay, or article directly into the editor.',
      'Review live metrics for total words, characters (with and without spaces), sentences, and paragraphs.',
      'Inspect the keyword frequency breakdown to spot overused terms before publishing.',
    ],
    features: [
      'Zero-latency word, sentence, and paragraph detection',
      'Estimated silent reading time (225 WPM) and speaking time (130 WPM)',
      'Top repeated keyword frequency analysis excluding common stop words',
    ],
    useCases: [
      'Checking academic essay or blog post length targets',
      'Preparing podcast or presentation scripts to match time limits',
      'Auditing draft copy for repetitive phrasing',
    ],
    privacyNote: 'All text metrics are computed inside your browser using JavaScript; your writing never leaves your device.',
    faqs: [
      {
        question: 'How is reading time calculated?',
        answer: 'Reading time uses an industry standard average of 225 words per minute, while speaking time assumes a conversational pace of 130 words per minute.',
      },
      {
        question: 'Does the Word Counter save my text?',
        answer: 'No. Your draft stays strictly in browser memory during your session and is never transmitted to any server.',
      },
    ],
    relatedSlugs: ['character-counter', 'readability-analyzer', 'case-converter'],
  },
  {
    slug: 'character-counter',
    name: 'Character Counter',
    category: 'text-writing',
    executionMode: 'local',
    popular: true,
    shortDescription: 'Measure exact character counts, UTF-8 byte size, lines, and social/SEO platform length limits.',
    seoTitle: 'Character Counter – Live Length & Social Limit Checker | AI Tools Hub',
    seoDescription: 'Check characters with or without spaces, UTF-8 byte length, and real-time progress bars for X, LinkedIn, Meta titles, and SMS.',
    keywords: ['character counter', 'utf8 byte counter', 'twitter character limit', 'meta description length'],
    howToUse: [
      'Enter your headline, social post, or meta snippet in the text box.',
      'Compare total characters, non-whitespace characters, and UTF-8 byte weight.',
      'Check platform threshold bars for SEO Meta Titles (60), Meta Descriptions (160), and X posts (280).',
    ],
    features: [
      'Exact UTF-8 byte size calculation including emojis and multi-byte characters',
      'Live progress meters for X/Twitter, Google Meta Titles, Meta Descriptions, and LinkedIn',
      'One-click copy and plain-text `.txt` download',
    ],
    useCases: [
      'Writing search engine title tags and meta descriptions that avoid truncation',
      'Crafting social media updates and SMS campaigns within strict byte budgets',
    ],
    privacyNote: 'Runs 100% locally in your browser with zero network requests.',
    faqs: [
      {
        question: 'Why does UTF-8 byte count differ from character count?',
        answer: 'Standard ASCII letters take 1 byte, whereas accented characters and emojis require 2 to 4 bytes in UTF-8 encoding.',
      },
    ],
    relatedSlugs: ['word-counter', 'serp-length-checker', 'case-converter'],
  },
  {
    slug: 'case-converter',
    name: 'Case Converter',
    category: 'text-writing',
    executionMode: 'local',
    popular: true,
    shortDescription: 'Transform text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case.',
    seoTitle: 'Case Converter – Title Case, camelCase & snake_case Tool | AI Tools Hub',
    seoDescription: 'Convert text effortlessly into Title Case, Sentence case, UPPERCASE, lowercase, camelCase, PascalCase, snake_case, or kebab-case.',
    keywords: ['case converter', 'title case generator', 'camelCase converter', 'snake_case converter'],
    howToUse: [
      'Paste your headline, variable list, or paragraph into the workspace.',
      'Click any formatting button such as Title Case, Sentence case, camelCase, or snake_case.',
      'Copy the converted result or download it as a text file.',
    ],
    features: [
      'Nine distinct casing transformations including developer naming conventions',
      'Smart Title Case handling for minor articles and prepositions',
      'Instant round-trip conversion without losing line breaks',
    ],
    useCases: [
      'Fixing accidentally capitalized paragraphs',
      'Converting spreadsheet column headers into clean API `snake_case` or `camelCase` keys',
    ],
    privacyNote: 'Text transformations execute locally in JavaScript.',
    faqs: [
      {
        question: 'Does camelCase work across multiple lines?',
        answer: 'Yes. Each line is converted independently so you can batch-convert lists of variable or field names.',
      },
    ],
    relatedSlugs: ['barcode-slug-generator', 'duplicate-line-remover', 'word-counter'],
  },
  {
    slug: 'text-diff-checker',
    name: 'Text Diff Checker',
    category: 'text-writing',
    executionMode: 'local',
    shortDescription: 'Compare two blocks of text line-by-line to inspect additions, deletions, and unchanged lines.',
    seoTitle: 'Text Diff Checker – Side-by-Side Line Comparison Tool | AI Tools Hub',
    seoDescription: 'Compare original and revised text blocks locally to highlight added, removed, and matching lines with summary counts.',
    keywords: ['text diff checker', 'compare two texts', 'online diff tool'],
    howToUse: [
      'Paste the original text on the left and the modified text on the right.',
      'Toggle whitespace trimming or case-insensitive comparison if needed.',
      'Inspect color-and-symbol-coded additions (+), removals (-), and unchanged lines.',
    ],
    features: [
      'LCS-based line diff algorithm for accurate insertion and deletion detection',
      'Explicit `+` and `-` symbols alongside color indicators for accessibility',
      'Optional ignore-case and trim-whitespace comparison modes',
    ],
    useCases: [
      'Reviewing edits between two contract or article drafts',
      'Comparing `.env` or configuration file snippets safely offline',
    ],
    privacyNote: 'Sensitive documents stay in your browser and are never uploaded.',
    faqs: [
      {
        question: 'Is it safe to compare confidential text here?',
        answer: 'Yes. The diff algorithm runs purely in client-side JavaScript without touching any server.',
      },
    ],
    relatedSlugs: ['duplicate-line-remover', 'find-and-replace', 'json-formatter'],
  },
  {
    slug: 'duplicate-line-remover',
    name: 'Duplicate Line Remover',
    category: 'text-writing',
    executionMode: 'local',
    shortDescription: 'Deduplicate lists, trim stray whitespace, strip blank lines, and optionally sort remaining entries.',
    seoTitle: 'Duplicate Line Remover – Clean & Deduplicate Lists | AI Tools Hub',
    seoDescription: 'Remove duplicate lines from email lists, keywords, or logs in seconds with case-sensitivity and sorting options.',
    keywords: ['remove duplicate lines', 'deduplicate list', 'clean text lines'],
    howToUse: [
      'Paste a multi-line list of keywords, URLs, or log entries.',
      'Choose options for case-insensitive matching, trimming spaces, removing empty lines, or sorting.',
      'Copy or download the deduplicated list and review how many duplicates were removed.',
    ],
    features: [
      'Preserves original order or sorts alphabetically',
      'Shows exact counts for original lines, unique lines, and duplicates removed',
      'Handles tens of thousands of lines smoothly in browser memory',
    ],
    useCases: [
      'Cleaning SEO keyword exports and redirect lists',
      'Removing repeated entries from CSV columns or server logs',
    ],
    privacyNote: 'Your list data stays strictly inside your local browser session.',
    faqs: [
      {
        question: 'Does it preserve the first occurrence order?',
        answer: 'Yes, by default the first occurrence of every unique line is kept in its original position unless you enable alphabetical sorting.',
      },
    ],
    relatedSlugs: ['text-sorter-reverser', 'find-and-replace', 'csv-to-json'],
  },
  {
    slug: 'text-sorter-reverser',
    name: 'Text Sorter & Reverser',
    category: 'text-writing',
    executionMode: 'local',
    shortDescription: 'Sort lines alphabetically, numerically, by character length, shuffle randomly, or reverse text order.',
    seoTitle: 'Text Sorter & Reverser – Sort Lines A-Z, Length & Shuffle | AI Tools Hub',
    seoDescription: 'Sort text lines A-Z, Z-A, numerically, by line length, or reverse entire strings and line sequences instantly.',
    keywords: ['sort lines online', 'alphabetize list', 'reverse text tool'],
    howToUse: [
      'Paste your lines of text into the input editor.',
      'Select your sort mode (A-Z, Z-A, Numeric, Shortest-First, Longest-First, Shuffle, or Reverse).',
      'Copy or download the reordered output.',
    ],
    features: [
      'Natural numeric sorting (`2` before `10`) alongside standard alphabetical sorting',
      'Fisher-Yates unbiased random shuffle for sampling lists',
      'Both line-order reversal and character-by-character reversal',
    ],
    useCases: [
      'Alphabetizing bibliographies, glossaries, and CSS property lists',
      'Randomizing giveaway entrants or flashcard decks',
    ],
    privacyNote: '100% client-side execution with zero data collection.',
    faqs: [
      {
        question: 'How does numeric sort differ from alphabetical sort?',
        answer: 'Alphabetical sort places "10" before "2", while numeric sort parses leading numbers so "2" comes before "10".',
      },
    ],
    relatedSlugs: ['duplicate-line-remover', 'case-converter', 'find-and-replace'],
  },
  {
    slug: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    category: 'text-writing',
    executionMode: 'local',
    shortDescription: 'Generate customizable placeholder paragraphs, sentences, or words with optional HTML <p> tags.',
    seoTitle: 'Lorem Ipsum Generator – Custom Paragraphs, Words & HTML | AI Tools Hub',
    seoDescription: 'Generate clean Lorem Ipsum placeholder copy by paragraphs, sentences, or words with optional HTML paragraph wrapping.',
    keywords: ['lorem ipsum generator', 'placeholder text', 'dummy copy html'],
    howToUse: [
      'Choose whether to generate Paragraphs, Sentences, or Words.',
      'Adjust the quantity slider or numeric input and toggle HTML `<p>` tags if needed.',
      'Copy or download the generated placeholder copy into your mockup or template.',
    ],
    features: [
      'Supports paragraphs, sentences, or exact word counts',
      'Optional classic "Lorem ipsum dolor sit amet..." opening line',
      'HTML `<p>` tag wrapping for quick CMS and frontend prototyping',
    ],
    useCases: [
      'Populating wireframes, editorial layouts, and typography specimens',
      'Testing text truncation and overflow handling in responsive UI grids',
    ],
    privacyNote: 'Generated deterministically in your browser.',
    faqs: [
      {
        question: 'Can I output plain text without HTML tags?',
        answer: 'Yes, simply keep the HTML `<p>` wrapper toggle off for clean plain-text paragraphs.',
      },
    ],
    relatedSlugs: ['word-counter', 'markdown-to-html', 'character-counter'],
  },
  {
    slug: 'find-and-replace',
    name: 'Find & Replace',
    category: 'text-writing',
    executionMode: 'local',
    shortDescription: 'Batch find and replace plain strings or regular expressions across large text blocks with match counts.',
    seoTitle: 'Find & Replace – Regex & Multi-Line Text Replacer | AI Tools Hub',
    seoDescription: 'Search and replace text globally with plain-text or JavaScript RegExp patterns, case sensitivity, and live match counting.',
    keywords: ['find and replace online', 'regex replace tool', 'bulk text replace'],
    howToUse: [
      'Paste your source text into the main editor.',
      'Enter the search term or regular expression and the replacement string.',
      'Toggle Regex Mode or Case Sensitive matching, preview the match count, and apply.',
    ],
    features: [
      'Supports JavaScript RegExp capture groups (`$1`, `$2`) in replacement text',
      'Displays live match count and safe error messages for invalid regex syntax',
      'Instant one-click Apply, Copy, and Download',
    ],
    useCases: [
      'Reformatting scraped lists, SQL inserts, or CSV strings',
      'Bulk renaming identifiers across configuration snippets',
    ],
    privacyNote: 'Executes locally inside your browser tab.',
    faqs: [
      {
        question: 'Can I use capture groups like $1 in Regex mode?',
        answer: 'Yes. Standard JavaScript replacement tokens such as `$1`, `$2`, and `$&` work when Regex Mode is enabled.',
      },
    ],
    relatedSlugs: ['regex-tester', 'duplicate-line-remover', 'text-diff-checker'],
  },
  {
    slug: 'markdown-to-html',
    name: 'Markdown to HTML Converter',
    category: 'text-writing',
    executionMode: 'local',
    shortDescription: 'Write Markdown and preview rendered output alongside clean, copyable semantic HTML.',
    seoTitle: 'Markdown to HTML Converter – Live Preview & HTML Export | AI Tools Hub',
    seoDescription: 'Convert Markdown headings, lists, links, blockquotes, and code blocks into clean HTML with live preview and `.html` export.',
    keywords: ['markdown to html', 'markdown previewer', 'convert md to html'],
    howToUse: [
      'Type or paste Markdown syntax on the left pane (or load the sample document).',
      'Switch between Live Rendered Preview and Raw HTML Source output.',
      'Copy the HTML or download a complete `.html` file.',
    ],
    features: [
      'Supports headings, bold/italic, inline code, fenced code blocks, lists, blockquotes, and links',
      'Sanitized preview rendering to prevent unsafe script execution',
      'One-click HTML source copy and standalone `.html` download',
    ],
    useCases: [
      'Drafting documentation, changelogs, and blog posts in Markdown before pasting into a CMS',
      'Exporting formatted release notes for email newsletters',
    ],
    privacyNote: 'Parsing and rendering happen strictly in your browser.',
    faqs: [
      {
        question: 'Does it sanitize unsafe HTML tags?',
        answer: 'Yes. Raw `<script>` tags and unsafe `javascript:` links are escaped/blocked during preview rendering.',
      },
    ],
    relatedSlugs: ['html-entity-encoder', 'word-counter', 'readability-analyzer'],
  },
  {
    slug: 'readability-analyzer',
    name: 'Readability & Flesch Score Analyzer',
    category: 'text-writing',
    executionMode: 'local',
    shortDescription: 'Evaluate Flesch Reading Ease, Flesch-Kincaid Grade Level, syllable counts, and sentence complexity.',
    seoTitle: 'Readability & Flesch Score Analyzer – Grade Level Checker | AI Tools Hub',
    seoDescription: 'Measure Flesch Reading Ease, Flesch-Kincaid Grade Level, average sentence length, and syllable density locally.',
    keywords: ['flesch reading ease', 'readability checker', 'flesch kincaid grade level'],
    howToUse: [
      'Paste at least 2–3 sentences of prose into the analyzer.',
      'Review the Flesch Reading Ease score (0–100) and U.S. Grade Level estimate.',
      'Use average words-per-sentence and complex-word metrics to simplify dense paragraphs.',
    ],
    features: [
      'Authentic Flesch Reading Ease & Flesch-Kincaid Grade Level formulas',
      'Heuristic English syllable counter and complex word (3+ syllables) detector',
      'Clear audience comprehension benchmark table',
    ],
    useCases: [
      'Editing landing page copy, help docs, and policy pages for broad clarity',
      'Checking whether technical writing meets plain-language standards',
    ],
    privacyNote: 'Analyzed locally without sending drafts to external APIs.',
    faqs: [
      {
        question: 'What is a good Flesch Reading Ease score for web copy?',
        answer: 'Most general web articles and SaaS documentation aim for a score between 60 and 75, corresponding roughly to an 8th–9th grade reading level.',
      },
    ],
    relatedSlugs: ['word-counter', 'keyword-density-checker', 'ai-tone-rewriter'],
  },

  // =========================================================================
  // 2. DEVELOPER & JSON TOOLS (10)
  // =========================================================================
  {
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator',
    category: 'developer-json',
    executionMode: 'local',
    popular: true,
    shortDescription: 'Pretty-print, minify, sort keys, and validate JSON payloads with clear syntax error messages.',
    seoTitle: 'JSON Formatter & Validator – Beautify, Minify & Verify JSON | AI Tools Hub',
    seoDescription: 'Format, minify, sort keys, and validate JSON online with instant syntax diagnostics and `.json` file download.',
    keywords: ['json formatter', 'json validator', 'json beautifier', 'json minify'],
    howToUse: [
      'Paste raw or minified JSON into the input editor.',
      'Choose indentation (2 spaces, 4 spaces, or tabs) or click Minify / Sort Keys.',
      'Inspect exact parse error messages if invalid, or copy/download the clean JSON.',
    ],
    features: [
      'Pretty-print with 2-space, 4-space, or tab indentation',
      'Recursive alphabetical key sorting for clean Git diffs',
      'Payload size comparison (original vs formatted/minified bytes)',
    ],
    useCases: [
      'Inspecting REST/GraphQL API responses and webhook payloads',
      'Validating `package.json` or configuration files before deployment',
    ],
    privacyNote: 'API keys or payloads pasted here never leave your browser.',
    faqs: [
      {
        question: 'Does Sort Keys modify array item order?',
        answer: 'No. Only object keys are sorted alphabetically while array element ordering stays intact.',
      },
    ],
    relatedSlugs: ['json-to-csv', 'csv-to-json', 'jwt-decoder'],
  },
  {
    slug: 'json-to-csv',
    name: 'JSON to CSV Converter',
    category: 'developer-json',
    executionMode: 'local',
    popular: true,
    shortDescription: 'Flatten JSON arrays of objects into RFC-4180 compliant CSV files ready for Excel or Google Sheets.',
    seoTitle: 'JSON to CSV Converter – Flatten Nested JSON to Spreadsheet | AI Tools Hub',
    seoDescription: 'Convert JSON arrays into clean CSV spreadsheets with nested object flattening, delimiter selection, and `.csv` download.',
    keywords: ['json to csv', 'convert json array to csv', 'flatten json'],
    howToUse: [
      'Paste a JSON array of objects (or an object containing a data array).',
      'Select your preferred delimiter (comma, semicolon, or tab) and nested-key flattening.',
      'Preview the CSV output and download as `.csv`.',
    ],
    features: [
      'Automatic dot-notation flattening for nested objects (`user.address.city`)',
      'Proper RFC-4180 quoting for commas, newlines, and double quotes',
      'Supports comma, semicolon, and tab delimiters',
    ],
    useCases: [
      'Exporting JSON API data for financial or marketing teams in spreadsheets',
      'Preparing dataset imports from NoSQL JSON exports',
    ],
    privacyNote: 'Conversion runs locally inside your browser.',
    faqs: [
      {
        question: 'What if objects in the JSON array have different keys?',
        answer: 'The converter scans every object to build a unified header row and leaves missing cells empty.',
      },
    ],
    relatedSlugs: ['csv-to-json', 'csv-to-markdown-table', 'json-formatter'],
  },
  {
    slug: 'csv-to-json',
    name: 'CSV to JSON Converter',
    category: 'developer-json',
    executionMode: 'local',
    popular: true,
    shortDescription: 'Parse CSV or TSV spreadsheets into typed JSON arrays with quoted-field support and header detection.',
    seoTitle: 'CSV to JSON Converter – Parse Spreadsheets to JSON | AI Tools Hub',
    seoDescription: 'Convert CSV or TSV data into structured JSON arrays with auto-type parsing (numbers/booleans) and `.json` export.',
    keywords: ['csv to json', 'tsv to json', 'parse csv online'],
    howToUse: [
      'Paste CSV or tab-separated text into the editor.',
      'Select delimiter (Auto, Comma, Semicolon, Tab) and toggle automatic number/boolean parsing.',
      'Copy or download the resulting JSON array.',
    ],
    features: [
      'Handles quoted fields containing commas, escaped quotes (`""`), and multi-line cells',
      'Optional type inference for numbers, booleans, and `null`',
      'Supports header-row objects or raw 2D array output',
    ],
    useCases: [
      'Seeding application mock fixtures or database import scripts from spreadsheets',
      'Converting exported analytics tables into JSON config files',
    ],
    privacyNote: 'Spreadsheet data is parsed strictly in client memory.',
    faqs: [
      {
        question: 'How are numbers and booleans handled?',
        answer: 'When Type Inference is enabled, numeric cells like `42` and boolean strings like `true` become native JSON numbers and booleans instead of strings.',
      },
    ],
    relatedSlugs: ['json-to-csv', 'csv-to-markdown-table', 'json-formatter'],
  },
  {
    slug: 'csv-to-markdown-table',
    name: 'CSV to Markdown Table',
    category: 'developer-json',
    executionMode: 'local',
    shortDescription: 'Convert CSV or TSV data into cleanly padded GitHub-Flavored Markdown tables with column alignment.',
    seoTitle: 'CSV to Markdown Table Generator | AI Tools Hub',
    seoDescription: 'Transform CSV spreadsheet snippets into aligned Markdown tables with left, center, or right column alignment.',
    keywords: ['csv to markdown', 'markdown table generator', 'gfm table'],
    howToUse: [
      'Paste comma- or tab-separated spreadsheet rows.',
      'Pick default column alignment (Left, Center, Right) and padding.',
      'Copy the formatted Markdown table into GitHub READMEs, Notion, or technical docs.',
    ],
    features: [
      'Automatic column width padding for readable raw Markdown',
      'Escapes pipe `|` characters inside cells safely',
      'Supports comma, semicolon, and tab inputs',
    ],
    useCases: [
      'Documenting API parameters or pricing tiers in `README.md` files',
      'Pasting clean comparison tables into technical RFCs',
    ],
    privacyNote: 'Processed entirely in your browser.',
    faqs: [
      {
        question: 'Can I paste directly from Excel or Google Sheets?',
        answer: 'Yes. Copying cells from Excel or Sheets produces tab-separated text, which this tool auto-detects.',
      },
    ],
    relatedSlugs: ['csv-to-json', 'markdown-to-html', 'json-to-csv'],
  },
  {
    slug: 'base64-encoder-decoder',
    name: 'Base64 Encoder & Decoder',
    category: 'developer-json',
    executionMode: 'local',
    shortDescription: 'Encode and decode UTF-8 text or URL-safe Base64 strings accurately without mojibake.',
    seoTitle: 'Base64 Encoder & Decoder – UTF-8 & URL-Safe Base64 | AI Tools Hub',
    seoDescription: 'Encode or decode UTF-8 text and URL-safe Base64 strings locally in your browser with clear error reporting.',
    keywords: ['base64 encode', 'base64 decode', 'utf8 base64', 'url safe base64'],
    howToUse: [
      'Switch between Encode and Decode mode.',
      'Paste text or Base64 string and optionally enable URL-Safe (`-` and `_`, no `=`) formatting.',
      'Copy the output instantaneously.',
    ],
    features: [
      'Full UTF-8 `TextEncoder` / `TextDecoder` support for emojis and international scripts',
      'URL-safe Base64 (`base64url`) toggle for JWTs and query parameters',
      'Clear validation alerts on malformed Base64 input',
    ],
    useCases: [
      'Inspecting encoded configuration secrets or Kubernetes YAML fields',
      'Preparing Basic Auth headers or inline data URIs during development',
    ],
    privacyNote: 'Secrets encoded or decoded here never leave your computer.',
    faqs: [
      {
        question: 'Why do standard `btoa`/`atob` tools fail on emojis?',
        answer: 'JavaScript’s raw `btoa` only accepts Latin-1 bytes. Our tool converts strings via `TextEncoder` UTF-8 bytes first so Unicode characters encode cleanly.',
      },
    ],
    relatedSlugs: ['url-encoder-decoder', 'jwt-decoder', 'hash-generator'],
  },
  {
    slug: 'url-encoder-decoder',
    name: 'URL Encoder & Decoder',
    category: 'developer-json',
    executionMode: 'local',
    shortDescription: 'Percent-encode or decode URLs and inspect individual query string parameters in a structured table.',
    seoTitle: 'URL Encoder, Decoder & Query String Parser | AI Tools Hub',
    seoDescription: 'Encode or decode URL components and parse full URLs into protocol, host, path, and query parameter key-value pairs.',
    keywords: ['url encoder', 'url decoder', 'query string parser', 'percent encoding'],
    howToUse: [
      'Paste a URL or query parameter string into the input box.',
      'Choose Component Encode (`encodeURIComponent`), Full URL Encode (`encodeURI`), or Decode.',
      'View automatically extracted query parameters in the structured breakdown table below.',
    ],
    features: [
      'Supports both `encodeURIComponent` and `encodeURI` modes',
      'Automatic URL parser breaking down origin, pathname, hash, and query params',
      'Graceful error handling for malformed percent sequences',
    ],
    useCases: [
      'Debugging OAuth redirect URIs and webhook callback URLs',
      'Inspecting complex tracking or search query parameters',
    ],
    privacyNote: 'URLs are parsed locally with native browser APIs.',
    faqs: [
      {
        question: 'When should I use `encodeURIComponent` vs `encodeURI`?',
        answer: 'Use `encodeURIComponent` when encoding a single query parameter value (it encodes `/`, `?`, and `&`). Use `encodeURI` when preserving the structure of a full URL.',
      },
    ],
    relatedSlugs: ['utm-link-builder', 'base64-encoder-decoder', 'barcode-slug-generator'],
  },
  {
    slug: 'jwt-decoder',
    name: 'JWT Token Decoder',
    category: 'developer-json',
    executionMode: 'local',
    shortDescription: 'Decode JSON Web Token headers and claims locally with readable `iat`/`exp` timestamp inspection.',
    seoTitle: 'JWT Decoder – Inspect JSON Web Token Header & Claims | AI Tools Hub',
    seoDescription: 'Decode JWT headers and payload claims offline in your browser with automatic expiration (`exp`) status and timestamp formatting.',
    keywords: ['jwt decoder', 'decode json web token', 'inspect jwt claims'],
    howToUse: [
      'Paste a three-part JWT (`header.payload.signature`) into the token field.',
      'Inspect formatted JSON for Header and Payload claims immediately.',
      'Review human-readable UTC/local timestamps for `iat`, `nbf`, and `exp` claims.',
    ],
    features: [
      'UTF-8 safe Base64URL decoding of JWT header and payload',
      'Automatic expiration status check against your local system clock',
      'Explicit warning reminding you that decoding does not verify cryptographic signatures',
    ],
    useCases: [
      'Debugging authentication scopes, user IDs, and expiry times in OAuth/OIDC tokens',
      'Inspecting session tokens safely without sending secrets to third-party web tools',
    ],
    privacyNote: 'Tokens are decoded strictly in-browser; never paste production secrets into untrusted online decoders.',
    faqs: [
      {
        question: 'Does this tool verify the JWT signature?',
        answer: 'No. Verifying an HMAC or RSA signature requires your secret or public key. This tool safely decodes and inspects the readable header and payload claims locally.',
      },
    ],
    relatedSlugs: ['base64-encoder-decoder', 'json-formatter', 'timestamp-converter'],
  },
  {
    slug: 'regex-tester',
    name: 'Regex Tester',
    category: 'developer-json',
    executionMode: 'local',
    shortDescription: 'Test JavaScript regular expressions with live match highlighting, flags (`g`, `i`, `m`), and capture groups.',
    seoTitle: 'Regex Tester – Live JavaScript Regular Expression Debugger | AI Tools Hub',
    seoDescription: 'Test and debug JavaScript regular expressions in real time with match highlights, capture group tables, and common presets.',
    keywords: ['regex tester', 'javascript regex debugger', 'regular expression tester'],
    howToUse: [
      'Enter a regex pattern and toggle flags (`g`, `i`, `m`, `s`).',
      'Paste sample text or select a preset pattern (Email, URL, IPv4, Date).',
      'Inspect highlighted matches and extracted capture groups in the results table.',
    ],
    features: [
      'Built-in preset library for emails, URLs, semantic versions, hex colors, and ISO dates',
      'Safe infinite-loop guard for zero-length matches',
      'Detailed capture group breakdown per match',
    ],
    useCases: [
      'Validating form input patterns before committing code',
      'Extracting structured log fields or IDs from text',
    ],
    privacyNote: 'All pattern matching executes in your browser.',
    faqs: [
      {
        question: 'Which regex flavor does this tester use?',
        answer: 'It uses your browser’s native ECMAScript (JavaScript) `RegExp` engine, including lookbehinds and named capture groups.',
      },
    ],
    relatedSlugs: ['find-and-replace', 'json-formatter', 'url-encoder-decoder'],
  },
  {
    slug: 'html-entity-encoder',
    name: 'HTML Entity Encoder & Decoder',
    category: 'developer-json',
    executionMode: 'local',
    shortDescription: 'Escape or unescape `<`, `>`, `&`, quotes, and HTML character entities for safe markup rendering.',
    seoTitle: 'HTML Entity Encoder & Decoder | AI Tools Hub',
    seoDescription: 'Convert special characters to safe HTML entities (`&lt;`, `&gt;`, `&amp;`) or decode escaped HTML entities back to plain text.',
    keywords: ['html entity encoder', 'escape html', 'unescape html entities'],
    howToUse: [
      'Select Encode or Decode mode.',
      'Paste raw HTML code snippets or escaped entity strings.',
      'Copy the safe output for use inside code blocks, XML, or emails.',
    ],
    features: [
      'Handles essential reserved characters and numeric/named entities',
      'Optional Encode All Non-ASCII mode (`&#code;`)',
      'Instant round-trip toggle',
    ],
    useCases: [
      'Displaying raw HTML examples inside blog posts or documentation',
      'Cleaning escaped RSS/XML feed descriptions',
    ],
    privacyNote: 'Processed entirely in client-side JavaScript.',
    faqs: [
      {
        question: 'Why encode HTML entities?',
        answer: 'Encoding `<`, `>`, `&`, and quotes prevents browsers from interpreting displayed code snippets as executable markup.',
      },
    ],
    relatedSlugs: ['markdown-to-html', 'url-encoder-decoder', 'base64-encoder-decoder'],
  },
  {
    slug: 'hash-generator',
    name: 'SHA Hash Generator',
    category: 'developer-json',
    executionMode: 'local',
    shortDescription: 'Compute cryptographic SHA-1, SHA-256, SHA-384, and SHA-512 digests simultaneously using Web Crypto.',
    seoTitle: 'SHA-256 & SHA-512 Hash Generator (Web Crypto) | AI Tools Hub',
    seoDescription: 'Generate authentic SHA-1, SHA-256, SHA-384, and SHA-512 cryptographic hashes locally using the browser Web Crypto API.',
    keywords: ['sha256 generator', 'sha512 hash', 'web crypto hash'],
    howToUse: [
      'Enter or paste any text string in the input field.',
      'Toggle uppercase or lowercase hexadecimal output.',
      'Copy any of the four generated SHA digests with one click.',
    ],
    features: [
      'Hardware-accelerated digests via `window.crypto.subtle.digest`',
      'Simultaneous SHA-1, SHA-256, SHA-384, and SHA-512 output',
      'Optional HMAC-style salt prefix helper or uppercase hex formatting',
    ],
    useCases: [
      'Verifying webhook signatures and checksum strings',
      'Generating deterministic cache keys or content fingerprints',
    ],
    privacyNote: 'Input text is hashed locally using your browser’s built-in Web Crypto API.',
    faqs: [
      {
        question: 'Can a SHA-256 hash be reversed back into the original text?',
        answer: 'No. Cryptographic hash functions are one-way operations designed to verify integrity, not encrypt retrievable text.',
      },
    ],
    relatedSlugs: ['password-generator', 'uuid-generator', 'base64-encoder-decoder'],
  },

  // =========================================================================
  // 3. SECURITY & UTILITY GENERATORS (7)
  // =========================================================================
  {
    slug: 'password-generator',
    name: 'Password Generator',
    category: 'security-generators',
    executionMode: 'local',
    popular: true,
    shortDescription: 'Create cryptographically random passwords with configurable length, character classes, and entropy meter.',
    seoTitle: 'Strong Password Generator – Cryptographic Entropy Tool | AI Tools Hub',
    seoDescription: 'Generate secure passwords locally using `crypto.getRandomValues` with custom length, symbol sets, and real entropy bit calculation.',
    keywords: ['password generator', 'random password', 'entropy calculator', 'secure password'],
    howToUse: [
      'Choose your desired password length (8 to 64 characters) and character types.',
      'Enable Exclude Ambiguous Characters (`0/O`, `1/l/I`) if humans will type it manually.',
      'Generate single or bulk passwords and copy directly to your clipboard.',
    ],
    features: [
      'Uses `window.crypto.getRandomValues` with rejection sampling to eliminate modulo bias',
      'Calculates exact Shannon/pool entropy in bits and estimated crack resistance',
      'Batch mode to generate up to 10 unique passwords at once',
    ],
    useCases: [
      'Creating unique credentials for SaaS accounts, databases, and SSH keys',
      'Generating high-entropy API secrets for `.env` files',
    ],
    privacyNote: 'Passwords are generated locally in memory and never logged or transmitted.',
    faqs: [
      {
        question: 'How is password strength measured here?',
        answer: 'Strength is computed mathematically from pool size and length (`length × log2(poolSize)` bits of entropy), not arbitrary guesses.',
      },
    ],
    relatedSlugs: ['uuid-generator', 'hash-generator', 'jwt-decoder'],
  },
  {
    slug: 'qr-code-generator',
    name: 'QR Code Generator',
    category: 'security-generators',
    executionMode: 'local',
    popular: true,
    shortDescription: 'Generate standard QR codes for URLs, Wi-Fi networks, email, or text and export crisp PNG or SVG files.',
    seoTitle: 'QR Code Generator – Custom SVG & PNG QR Maker | AI Tools Hub',
    seoDescription: 'Create high-resolution QR codes for links, Wi-Fi credentials, and plain text locally, with custom colors and PNG/SVG downloads.',
    keywords: ['qr code generator', 'wifi qr code', 'svg qr generator', 'png qr code'],
    howToUse: [
      'Select a payload type (URL / Text, Wi-Fi Network, or Email) and fill in the fields.',
      'Customize QR size, margin, foreground/background colors, and error correction level.',
      'Download your crisp QR code as a vector `.svg` or high-DPI `.png`.',
    ],
    features: [
      'Real ISO/IEC 18004 QR matrix rendering with L/M/Q/H error correction',
      'Built-in Wi-Fi (`WPA/WEP`) and `mailto:` formatters',
      'Both scalable `.svg` and `.png` downloads',
    ],
    useCases: [
      'Sharing guest Wi-Fi credentials cleanly on printed cards',
      'Adding scannable links to flyers, product packaging, and slide decks',
    ],
    privacyNote: 'QR codes are rendered inside your browser; private Wi-Fi passwords stay local.',
    faqs: [
      {
        question: 'Should I download SVG or PNG?',
        answer: 'Choose SVG for print materials and design tools where infinite crispness matters, or PNG for quick web and document embeds.',
      },
    ],
    relatedSlugs: ['utm-link-builder', 'url-encoder-decoder', 'color-converter'],
  },
  {
    slug: 'uuid-generator',
    name: 'UUID & ULID Generator',
    category: 'security-generators',
    executionMode: 'local',
    shortDescription: 'Generate RFC-4122 UUID v4 identifiers and sortable ULIDs individually or in bulk.',
    seoTitle: 'UUID v4 & ULID Bulk Generator | AI Tools Hub',
    seoDescription: 'Generate cryptographically random UUID v4 and lexicographically sortable ULID identifiers in bulk with formatting options.',
    keywords: ['uuid generator', 'ulid generator', 'guid generator'],
    howToUse: [
      'Choose UUID v4 or sortable ULID format.',
      'Select how many IDs to generate (1 to 100) and toggle uppercase or hyphen removal.',
      'Copy all generated IDs or download them as `.txt` or `.json`.',
    ],
    features: [
      'Uses `crypto.randomUUID()` / `crypto.getRandomValues()` for collision-resistant IDs',
      'Supports 26-character Crockford Base32 ULIDs with millisecond timestamp prefix',
      'Bulk copy and `.txt` export',
    ],
    useCases: [
      'Generating primary keys for database migrations and test fixtures',
      'Creating correlation IDs or unique client tokens',
    ],
    privacyNote: 'Generated locally with native browser cryptography.',
    faqs: [
      {
        question: 'When should I choose ULID over UUID v4?',
        answer: 'ULIDs encode a 48-bit timestamp at the front, making them naturally chronological and more index-friendly in B-tree databases.',
      },
    ],
    relatedSlugs: ['password-generator', 'hash-generator', 'timestamp-converter'],
  },
  {
    slug: 'color-converter',
    name: 'Color Converter & Contrast Checker',
    category: 'security-generators',
    executionMode: 'local',
    shortDescription: 'Convert between HEX, RGB, and HSL while verifying WCAG AA/AAA accessibility contrast ratios.',
    seoTitle: 'Color Converter & WCAG Contrast Ratio Checker | AI Tools Hub',
    seoDescription: 'Convert HEX, RGB, and HSL color values and verify WCAG 2.1 AA and AAA contrast ratios for normal and large text.',
    keywords: ['color converter', 'hex to rgb', 'wcag contrast checker'],
    howToUse: [
      'Pick or paste a Foreground text color and Background surface color in HEX.',
      'Copy converted HEX, RGB, and HSL CSS declarations with one click.',
      'Check the live WCAG contrast ratio and AA/AAA pass status for body and heading text.',
    ],
    features: [
      'Accurate sRGB relative luminance & WCAG 2.1 contrast ratio math',
      'Instant HEX, `rgb()`, and `hsl()` CSS copy buttons',
      'Live preview card showing real body and heading legibility',
    ],
    useCases: [
      'Designing accessible dark-mode and light-mode SaaS design systems',
      'Converting design tokens between Figma HEX and CSS HSL variables',
    ],
    privacyNote: 'All color math executes locally.',
    faqs: [
      {
        question: 'What contrast ratio does WCAG AA require?',
        answer: 'WCAG AA requires at least 4.5:1 for normal body text and 3.0:1 for large text (18pt+ regular or 14pt+ bold).',
      },
    ],
    relatedSlugs: ['qr-code-generator', 'css-unit-helper', 'barcode-slug-generator'].filter((s) => s !== 'css-unit-helper').concat(['unit-converter']),
  },
  {
    slug: 'timestamp-converter',
    name: 'Unix Timestamp Converter',
    category: 'security-generators',
    executionMode: 'local',
    shortDescription: 'Convert Unix epoch timestamps (seconds or milliseconds) to ISO-8601, UTC, and local date strings.',
    seoTitle: 'Unix Timestamp Converter – Epoch to ISO & UTC Date | AI Tools Hub',
    seoDescription: 'Convert Unix epoch seconds or milliseconds to human-readable UTC, ISO-8601, and local dates, or turn any date into an epoch timestamp.',
    keywords: ['unix timestamp converter', 'epoch converter', 'iso 8601 converter'],
    howToUse: [
      'Read the live ticking Unix timestamp or paste any epoch value in seconds or milliseconds.',
      'Use the Date-to-Epoch converter to pick a calendar date and time.',
      'Copy UTC, ISO-8601, or epoch outputs instantaneously.',
    ],
    features: [
      'Auto-detects seconds (10 digits) vs milliseconds (13 digits)',
      'Shows UTC, local timezone string, ISO-8601, and relative time ("3 days ago")',
      'Bidirectional Epoch ↔ Date conversion',
    ],
    useCases: [
      'Reading JWT `exp`/`iat` claims and server audit logs',
      'Generating epoch timestamps for database queries and API filters',
    ],
    privacyNote: 'Calculated locally using your browser timezone and `Intl.DateTimeFormat`.',
    faqs: [
      {
        question: 'How does the tool tell seconds from milliseconds?',
        answer: 'Epoch values above `10,000,000,000` (beyond year 2286 in seconds) are automatically interpreted as milliseconds, with an override toggle if needed.',
      },
    ],
    relatedSlugs: ['jwt-decoder', 'age-date-calculator', 'cron-expression-explainer'],
  },
  {
    slug: 'cron-expression-explainer',
    name: 'Cron Expression Builder & Explainer',
    category: 'security-generators',
    executionMode: 'local',
    shortDescription: 'Build and translate 5-field cron schedules into plain English and preview upcoming execution times.',
    seoTitle: 'Cron Expression Builder & Next Run Explainer | AI Tools Hub',
    seoDescription: 'Translate 5-field cron expressions into clear human language and calculate the next 5 scheduled run timestamps.',
    keywords: ['cron expression builder', 'cron parser', 'crontab generator'],
    howToUse: [
      'Enter a 5-field cron expression (`minute hour day month weekday`) or pick a common preset.',
      'Read the plain-English schedule summary.',
      'Verify the next 5 upcoming execution timestamps in your local time.',
    ],
    features: [
      'Supports lists (`1,15`), ranges (`1-5`), and step values (`*/15`)',
      'Presets for every 5 minutes, hourly, daily midnight, weekdays at 9 AM, and monthly',
      'Real forward simulator showing next 5 execution timestamps',
    ],
    useCases: [
      'Verifying GitHub Actions, Kubernetes CronJobs, and Linux crontab rules',
      'Avoiding accidental every-minute triggers in production batch jobs',
    ],
    privacyNote: 'Evaluated locally in your browser.',
    faqs: [
      {
        question: 'What cron format is supported?',
        answer: 'Standard 5-field POSIX cron (`minute hour day-of-month month day-of-week`), used by Linux crontab, GitHub Actions, and cloud schedulers.',
      },
    ],
    relatedSlugs: ['timestamp-converter', 'regex-tester', 'json-formatter'],
  },
  {
    slug: 'barcode-slug-generator',
    name: 'URL Slug & Clean Filename Generator',
    category: 'security-generators',
    executionMode: 'local',
    shortDescription: 'Convert article titles or messy filenames into clean, lowercase, ASCII-safe SEO URL slugs.',
    seoTitle: 'URL Slug Generator – Clean SEO Permalink Maker | AI Tools Hub',
    seoDescription: 'Turn titles and multi-line lists into clean lowercase URL slugs with custom separators, accent folding, and stop-word removal.',
    keywords: ['url slug generator', 'seo slug maker', 'clean filename'],
    howToUse: [
      'Enter one or multiple titles (one per line) into the input box.',
      'Select separator (`-` or `_`) and optional English stop-word removal.',
      'Copy your clean URL slugs or download them.',
    ],
    features: [
      'Unicode NFD normalization to fold accented characters (`café` → `cafe`)',
      'Optional stop-word stripping (`the`, `and`, `for`, `with`) for shorter permalinks',
      'Batch mode supporting multi-line title lists',
    ],
    useCases: [
      'Creating clean blog post URLs and product page handles',
      'Sanitizing uploaded asset filenames before pushing to S3 or CDNs',
    ],
    privacyNote: 'Runs strictly in your browser.',
    faqs: [
      {
        question: 'Should SEO URL slugs use hyphens or underscores?',
        answer: 'Google recommends hyphens (`-`) as word separators in URLs rather than underscores (`_`).',
      },
    ],
    relatedSlugs: ['case-converter', 'meta-tag-generator', 'utm-link-builder'],
  },

  // =========================================================================
  // 4. SEO & MARKETING TOOLS (8)
  // =========================================================================
  {
    slug: 'meta-tag-generator',
    name: 'Meta Tag & OpenGraph Generator',
    category: 'seo-marketing',
    executionMode: 'local',
    popular: true,
    shortDescription: 'Preview Google search snippets live and generate complete HTML meta, OpenGraph, and Twitter Card tags.',
    seoTitle: 'Meta Tag & OpenGraph Generator with SERP Preview | AI Tools Hub',
    seoDescription: 'Build SEO meta tags, OpenGraph social cards, and Twitter tags while previewing Google search snippet truncation live.',
    keywords: ['meta tag generator', 'opengraph generator', 'serp preview'],
    howToUse: [
      'Fill in your Page Title, Meta Description, Canonical URL, and optional OG Image URL.',
      'Inspect the live Google SERP preview card for title/description length health.',
      'Copy or download the generated `<head>` HTML snippet.',
    ],
    features: [
      'Real-time Google SERP desktop preview with character thresholds',
      'Generates standard `<meta>`, `og:*`, `twitter:*`, and `robots` directives',
      'One-click HTML copy and `.html` snippet download',
    ],
    useCases: [
      'Preparing launch metadata for landing pages, SaaS products, and blog posts',
      'Fixing missing social preview titles on Slack, X, and LinkedIn shares',
    ],
    privacyNote: 'Metadata generation happens locally in your browser.',
    faqs: [
      {
        question: 'What is the recommended Meta Description length?',
        answer: 'Aim for 120 to 160 characters so search engines display a full sentence without cutting off your call to action.',
      },
    ],
    relatedSlugs: ['schema-jsonld-generator', 'serp-length-checker', 'robots-txt-generator'],
  },
  {
    slug: 'schema-jsonld-generator',
    name: 'Schema.org JSON-LD Generator',
    category: 'seo-marketing',
    executionMode: 'local',
    shortDescription: 'Generate valid Schema.org JSON-LD structured data for Article, FAQPage, Product, and WebApplication.',
    seoTitle: 'Schema.org JSON-LD Structured Data Generator | AI Tools Hub',
    seoDescription: 'Create clean Schema.org JSON-LD snippets for Articles, FAQPages, Products, and Organizations ready to embed in your HTML.',
    keywords: ['json ld generator', 'schema markup generator', 'faq schema'],
    howToUse: [
      'Choose a Schema type (`Article`, `FAQPage`, `WebApplication`, or `Organization`).',
      'Complete the dynamic form fields or add multiple FAQ Q&A rows.',
      'Copy the ready-to-paste `<script type="application/ld+json">` tag.',
    ],
    features: [
      'Multi-schema builder with valid `@context` and `@type` fields',
      'Dynamic repeater for `FAQPage` questions and answers',
      'Clean JSON formatting wrapped in `<script>` tags or raw JSON',
    ],
    useCases: [
      'Adding rich snippet structured data to product pages and help centers',
      'Validating JSON-LD syntax before deploying templates',
    ],
    privacyNote: 'Built locally with zero third-party data transfer.',
    faqs: [
      {
        question: 'Where should I place the generated JSON-LD script?',
        answer: 'You can place `<script type="application/ld+json">` inside the `<head>` or at the end of `<body>` on the target page.',
      },
    ],
    relatedSlugs: ['meta-tag-generator', 'sitemap-xml-generator', 'json-formatter'],
  },
  {
    slug: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    category: 'seo-marketing',
    executionMode: 'local',
    shortDescription: 'Build clean `robots.txt` crawler rules for Googlebot, Bingbot, and AI crawlers with sitemap links.',
    seoTitle: 'Robots.txt Generator – Crawler Directives Builder | AI Tools Hub',
    seoDescription: 'Create a valid `robots.txt` file with User-agent Allow/Disallow paths, Crawl-delay, and Sitemap directives.',
    keywords: ['robots txt generator', 'crawler rules', 'disallow path'],
    howToUse: [
      'Select a preset or add custom `User-agent`, `Allow`, and `Disallow` rules.',
      'Enter your canonical XML Sitemap URL.',
      'Copy or download the finished `robots.txt` file to place at your site root.',
    ],
    features: [
      'Supports multiple User-agent blocks (e.g. `*`, `Googlebot`, `GPTBot`)',
      'Interactive path adder for `/admin/`, `/api/`, or private directories',
      'Direct `robots.txt` file download',
    ],
    useCases: [
      'Preventing search indexing of staging paths, cart pages, or internal search URLs',
      'Pointing search crawlers to your `sitemap.xml`',
    ],
    privacyNote: 'Runs locally in your browser.',
    faqs: [
      {
        question: 'Does `robots.txt` provide security against unauthorized access?',
        answer: 'No. `robots.txt` only advises compliant crawlers. Sensitive endpoints must always be protected with authentication.',
      },
    ],
    relatedSlugs: ['sitemap-xml-generator', 'meta-tag-generator', 'htaccess-redirect-generator'],
  },
  {
    slug: 'utm-link-builder',
    name: 'UTM Campaign URL Builder',
    category: 'seo-marketing',
    executionMode: 'local',
    shortDescription: 'Construct cleanly encoded UTM campaign tracking URLs for analytics attribution without broken parameters.',
    seoTitle: 'UTM Link Builder – Campaign Tracking URL Generator | AI Tools Hub',
    seoDescription: 'Build standardized Google Analytics UTM tracking URLs (`utm_source`, `utm_medium`, `utm_campaign`) with validation and copy tools.',
    keywords: ['utm builder', 'campaign url generator', 'ga4 utm parameters'],
    howToUse: [
      'Enter your destination landing page URL.',
      'Fill in `utm_source`, `utm_medium`, `utm_campaign`, and optional `utm_term` / `utm_content`.',
      'Copy the cleanly encoded URL (preserving any existing query strings or `#hash` fragments).',
    ],
    features: [
      'Preserves existing URL query parameters and hash fragments safely',
      'Optional automatic lowercase normalization for clean GA4 reporting',
      'Quick channel presets (Newsletter, LinkedIn Organic, Paid Search)',
    ],
    useCases: [
      'Tagging newsletter links, social bios, and paid ad campaigns consistently',
      'Preventing capitalized or duplicate source names in analytics reports',
    ],
    privacyNote: 'Campaign URLs are built client-side.',
    faqs: [
      {
        question: 'Why normalize UTM parameters to lowercase?',
        answer: 'Analytics tools are case-sensitive, so `LinkedIn` and `linkedin` would split into two separate rows unless normalized.',
      },
    ],
    relatedSlugs: ['url-encoder-decoder', 'qr-code-generator', 'meta-tag-generator'],
  },
  {
    slug: 'keyword-density-checker',
    name: 'Keyword Density Checker',
    category: 'seo-marketing',
    executionMode: 'local',
    shortDescription: 'Inspect 1-word, 2-word, and 3-word phrase frequencies and density percentages across any article.',
    seoTitle: 'Keyword Density Checker – 1, 2 & 3-Word N-Gram Analyzer | AI Tools Hub',
    seoDescription: 'Analyze single words, two-word bigrams, and three-word phrases in your copy to measure keyword density locally.',
    keywords: ['keyword density checker', 'n-gram analyzer', 'seo phrase frequency'],
    howToUse: [
      'Paste your draft article or landing page copy.',
      'Switch between 1-Word, 2-Word, and 3-Word phrase tabs.',
      'Review occurrence counts and percentage density to balance topical focus naturally.',
    ],
    features: [
      'Filters out common English stop words automatically (with toggle)',
      'Computes exact occurrence count and percentage of total words',
      'Tabular numeric alignment for fast scanning',
    ],
    useCases: [
      'Auditing SEO articles to confirm primary topics appear naturally without keyword stuffing',
      'Analyzing competitor copy structure',
    ],
    privacyNote: 'Text stays strictly in your browser.',
    faqs: [
      {
        question: 'Is there an ideal keyword density percentage?',
        answer: 'Search engines do not enforce a magic percentage. Use density checks simply to verify your main concepts are clear and not unnaturally repeated.',
      },
    ],
    relatedSlugs: ['word-counter', 'readability-analyzer', 'ai-seo-meta-writer'],
  },
  {
    slug: 'serp-length-checker',
    name: 'SERP Title & Description Checker',
    category: 'seo-marketing',
    executionMode: 'local',
    shortDescription: 'Measure exact character lengths and estimated pixel widths for Google desktop and mobile search snippets.',
    seoTitle: 'SERP Length Checker – Title Pixel Width & Snippet Preview | AI Tools Hub',
    seoDescription: 'Check SEO title pixel widths (~580px) and meta description lengths with realistic desktop and mobile Google SERP previews.',
    keywords: ['serp length checker', 'seo title pixel width', 'google snippet simulator'],
    howToUse: [
      'Enter your target page Title, URL path, and Meta Description.',
      'Toggle between Desktop and Mobile snippet previews.',
      'Adjust phrasing until both pixel width and character counts stay inside green thresholds.',
    ],
    features: [
      'Canvas-measured actual font pixel width estimation for titles (`~580px` desktop budget)',
      'Side-by-side Desktop & Mobile preview toggle',
      'Batch check multiple title candidates at once',
    ],
    useCases: [
      'Eliminating awkward `...` truncation on high-CTR title tags',
      'A/B comparing headline candidates before publishing',
    ],
    privacyNote: 'Measured using your browser canvas locally.',
    faqs: [
      {
        question: 'Why does pixel width matter more than character count?',
        answer: 'Wide letters like "W" and "M" occupy more horizontal space in Google’s SERP font than narrow letters like "i" and "l".',
      },
    ],
    relatedSlugs: ['meta-tag-generator', 'character-counter', 'youtube-title-analyzer'],
  },
  {
    slug: 'sitemap-xml-generator',
    name: 'XML Sitemap Generator',
    category: 'seo-marketing',
    executionMode: 'local',
    shortDescription: 'Turn a list of page URLs into a valid UTF-8 `sitemap.xml` with `lastmod`, `changefreq`, and `priority`.',
    seoTitle: 'XML Sitemap Generator – Build Valid sitemap.xml | AI Tools Hub',
    seoDescription: 'Generate a compliant `sitemap.xml` file from your list of URLs with configurable `changefreq`, `priority`, and `lastmod` tags.',
    keywords: ['xml sitemap generator', 'create sitemap xml', 'seo sitemap builder'],
    howToUse: [
      'Paste one full `https://` URL per line.',
      'Set default `changefreq`, `priority`, and `lastmod` date options.',
      'Validate URLs and download your ready-to-upload `sitemap.xml` file.',
    ],
    features: [
      'Escapes XML special characters (`&`, `<`, `>`) automatically',
      'Skips duplicate or invalid URLs with clear count reporting',
      'Downloads standards-compliant `sitemap.xml`',
    ],
    useCases: [
      'Creating sitemaps for static sites, portfolios, and documentation hubs',
      'Submitting new landing page collections to Google Search Console',
    ],
    privacyNote: 'Generated locally in browser memory.',
    faqs: [
      {
        question: 'How many URLs can a single XML sitemap hold?',
        answer: 'Per the Sitemaps protocol, a single `sitemap.xml` file may contain up to 50,000 URLs and be up to 50MB uncompressed.',
      },
    ],
    relatedSlugs: ['robots-txt-generator', 'meta-tag-generator', 'htaccess-redirect-generator'],
  },
  {
    slug: 'htaccess-redirect-generator',
    name: '301 Redirect Rule Generator',
    category: 'seo-marketing',
    executionMode: 'local',
    shortDescription: 'Generate Apache `.htaccess` and Nginx `return 301` redirect rules from old-to-new URL mappings.',
    seoTitle: '301 Redirect Generator (.htaccess & Nginx) | AI Tools Hub',
    seoDescription: 'Batch-generate clean Apache `.htaccess` and Nginx 301 permanent redirect rules from pairs of old and new URLs.',
    keywords: ['301 redirect generator', 'htaccess redirect', 'nginx 301 rules'],
    howToUse: [
      'Enter old path and new destination URL pairs (comma, tab, or space separated per line).',
      'Switch between Apache `.htaccess` (`Redirect 301` / `RewriteRule`) and Nginx (`location = ... return 301`).',
      'Copy or download the server configuration snippet.',
    ],
    features: [
      'Outputs both Apache `.htaccess` and Nginx `server` block syntax',
      'Supports batch migration lists pasted directly from spreadsheets',
      'Normalizes paths cleanly to prevent syntax errors',
    ],
    useCases: [
      'Preserving search rankings during site migrations or URL restructuring',
      'Redirecting retired blog posts to updated guides',
    ],
    privacyNote: 'Processed entirely in your browser.',
    faqs: [
      {
        question: 'Should I use 301 or 302 redirects for permanent URL moves?',
        answer: 'Use 301 (Permanent Redirect) when a page has moved permanently so search engines consolidate link signals to the new URL.',
      },
    ],
    relatedSlugs: ['robots-txt-generator', 'sitemap-xml-generator', 'barcode-slug-generator'],
  },

  // =========================================================================
  // 5. YOUTUBE & CREATOR TOOLS (6)
  // =========================================================================
  {
    slug: 'youtube-thumbnail-extractor',
    name: 'YouTube Thumbnail Downloader',
    category: 'youtube-creator',
    executionMode: 'local',
    popular: true,
    shortDescription: 'Extract and preview HD, SD, HQ, and MQ thumbnail URLs from any YouTube video or Shorts link.',
    seoTitle: 'YouTube Thumbnail Downloader – HD & 4K Thumbnail URLs | AI Tools Hub',
    seoDescription: 'Extract all official YouTube thumbnail resolutions (`maxresdefault`, `sddefault`, `hqdefault`, `mqdefault`) from any video URL or ID.',
    keywords: ['youtube thumbnail downloader', 'get youtube thumbnail', 'youtube thumbnail url'],
    howToUse: [
      'Paste any YouTube watch URL, `youtu.be` short link, Shorts link, or 11-character Video ID.',
      'Preview all four official thumbnail resolutions side by side.',
      'Copy the direct image URL or open the full-resolution image in a new tab to save.',
    ],
    features: [
      'Supports `youtube.com/watch`, `youtu.be/`, `/shorts/`, `/embed/`, and raw Video IDs',
      'Displays MaxRes (`1280×720`), SD (`640×480`), HQ (`480×360`), and MQ (`320×180`) variants',
      'Zero external backend or paid YouTube Data API needed',
    ],
    useCases: [
      'Archiving your own channel thumbnails or checking how thumbnails scale at smaller sizes',
      'Embedding high-res video previews in articles or presentations',
    ],
    privacyNote: 'Video IDs are parsed locally in JavaScript; thumbnails load directly from `i.ytimg.com`.',
    faqs: [
      {
        question: 'Why is MaxRes (1280×720) unavailable on some older videos?',
        answer: 'Older or lower-resolution uploads may not have a `maxresdefault.jpg` generated by YouTube; in those cases `hqdefault.jpg` or `sddefault.jpg` will display cleanly.',
      },
    ],
    relatedSlugs: ['youtube-title-analyzer', 'youtube-timestamp-builder', 'youtube-tag-extractor'],
  },
  {
    slug: 'youtube-tag-extractor',
    name: 'YouTube Tag & Keyword Formatter',
    category: 'youtube-creator',
    executionMode: 'local',
    shortDescription: 'Deduplicate, format, and budget YouTube video tags against the strict 500-character limit.',
    seoTitle: 'YouTube Tag Formatter & 500-Char Limit Checker | AI Tools Hub',
    seoDescription: 'Clean, deduplicate, and measure YouTube video tags against YouTube’s 500-character tag field limit plus generate hashtags.',
    keywords: ['youtube tag formatter', 'youtube 500 character limit', 'youtube hashtag generator'],
    howToUse: [
      'Paste comma-separated or line-by-line tags for your upcoming upload.',
      'Automatically remove duplicates, trim extra spaces, and check the 500-character budget bar.',
      'Copy formatted tags or generated `#hashtags` for your video description.',
    ],
    features: [
      'Live 500-character YouTube Studio tag counter (including commas and auto-quotes for multi-word tags)',
      'Automatic duplicate and empty-tag removal',
      'Instant `#CamelCaseHashtag` generator for video descriptions',
    ],
    useCases: [
      'Preparing YouTube Studio upload metadata without hitting the 500-character cutoff',
      'Converting brainstormed topic lists into clean description hashtags',
    ],
    privacyNote: 'Runs 100% locally in your browser.',
    faqs: [
      {
        question: 'How does YouTube count characters in the Tags field?',
        answer: 'YouTube counts every character in every tag, commas between tags, and implicit quote characters around multi-word tags against the 500-character ceiling.',
      },
    ],
    relatedSlugs: ['youtube-title-analyzer', 'youtube-description-template', 'duplicate-line-remover'],
  },
  {
    slug: 'youtube-timestamp-builder',
    name: 'YouTube Chapter & Timestamp Builder',
    category: 'youtube-creator',
    executionMode: 'local',
    shortDescription: 'Build chronological YouTube video chapters starting at `00:00`, validate rules, and copy description text.',
    seoTitle: 'YouTube Chapter & Timestamp Generator | AI Tools Hub',
    seoDescription: 'Create, reorder, and validate YouTube video chapter timestamps (`00:00`) so chapters activate reliably in YouTube Studio.',
    keywords: ['youtube timestamp generator', 'youtube chapters builder', 'video timestamps'],
    howToUse: [
      'Add chapter timestamps (`MM:SS` or `HH:MM:SS`) and chapter titles.',
      'Verify built-in YouTube rule checks (starts at `00:00`, at least 3 chapters, ascending order, >=10s apart).',
      'Copy or download the formatted chapter block for your video description.',
    ],
    features: [
      'Automatic chronological sorting and rule validation against YouTube’s chapter requirements',
      'Supports both `MM:SS` and `HH:MM:SS` durations',
      'One-click copy ready for YouTube Studio',
    ],
    useCases: [
      'Adding navigable chapters to tutorials, podcasts, and long-form reviews',
      'Preventing broken chapters caused by missing `00:00` or out-of-order timestamps',
    ],
    privacyNote: 'All chapter data stays in your browser.',
    faqs: [
      {
        question: 'Why are my chapters not showing on YouTube?',
        answer: 'YouTube requires the first timestamp to be `00:00`, at least 3 timestamps listed in ascending order, and each chapter to be at least 10 seconds long.',
      },
    ],
    relatedSlugs: ['youtube-description-template', 'youtube-title-analyzer', 'video-bitrate-calculator'],
  },
  {
    slug: 'youtube-title-analyzer',
    name: 'YouTube Title & Hook Analyzer',
    category: 'youtube-creator',
    executionMode: 'local',
    shortDescription: 'Preview how YouTube titles truncate on desktop and mobile feeds and analyze clarity, length, and hooks.',
    seoTitle: 'YouTube Title Analyzer & Feed Truncation Preview | AI Tools Hub',
    seoDescription: 'Test YouTube video titles for mobile truncation (~55-60 chars), readability, numbers, and bracket hooks with live feed previews.',
    keywords: ['youtube title analyzer', 'youtube title length', 'video title preview'],
    howToUse: [
      'Enter your candidate video title and channel name.',
      'Compare Desktop Search, Desktop Suggested, and Mobile Home truncation previews.',
      'Review transparent structural diagnostics (character count, front-loaded hook position, number/bracket cues).',
    ],
    features: [
      'Realistic truncation preview across Desktop and Mobile viewports',
      'Transparent rule-based diagnostics (not fabricated "magic AI scores")',
      'Compare multiple title variants side-by-side',
    ],
    useCases: [
      'Front-loading key words into the first 50 characters before mobile truncation hits',
      'Refining tutorial, review, and documentary titles before publishing',
    ],
    privacyNote: 'Analyzed locally in JavaScript.',
    faqs: [
      {
        question: 'What is the safest YouTube title length?',
        answer: 'Keep the core promise within the first 55–60 characters so mobile viewers read the complete hook before ellipsis truncation.',
      },
    ],
    relatedSlugs: ['youtube-thumbnail-extractor', 'youtube-tag-extractor', 'serp-length-checker'],
  },
  {
    slug: 'youtube-description-template',
    name: 'YouTube Description Formatter',
    category: 'youtube-creator',
    executionMode: 'local',
    shortDescription: 'Assemble structured YouTube descriptions with above-the-fold hooks, chapters, links, disclosures, and tags.',
    seoTitle: 'YouTube Description Template & Formatter | AI Tools Hub',
    seoDescription: 'Build clean, consistent YouTube video descriptions with summary hook, timestamps, resources, affiliate disclosure, and hashtags.',
    keywords: ['youtube description generator', 'youtube description template', 'video description formatter'],
    howToUse: [
      'Fill in your above-the-fold 2-line video summary, chapter block, gear/resource links, and social handles.',
      'Toggle optional FTC affiliate disclosure text and bottom hashtags.',
      'Copy the cleanly formatted description or download as `.txt`.',
    ],
    features: [
      'Highlights the first 150 characters visible above the "Show more" fold',
      '5,000-character YouTube description limit meter',
      'Reusable clean section dividers',
    ],
    useCases: [
      'Standardizing channel upload templates across team editors',
      'Ensuring affiliate disclosures and chapter timestamps are never forgotten',
    ],
    privacyNote: 'Formatted locally inside your browser.',
    faqs: [
      {
        question: 'How many characters appear before the "Show more" button on YouTube?',
        answer: 'Roughly the first 120–150 characters appear above the fold on desktop and mobile, making your opening two lines prime real estate.',
      },
    ],
    relatedSlugs: ['youtube-timestamp-builder', 'youtube-tag-extractor', 'character-counter'],
  },
  {
    slug: 'video-bitrate-calculator',
    name: 'Video File Size & Bitrate Calculator',
    category: 'youtube-creator',
    executionMode: 'local',
    shortDescription: 'Calculate exact video file sizes (MB/GB) or target bitrates from video length, Mbps, and audio kbps.',
    seoTitle: 'Video Bitrate & File Size Calculator | AI Tools Hub',
    seoDescription: 'Estimate exported MP4/MOV file sizes from duration, video bitrate (Mbps), and audio bitrate (kbps), or solve for target bitrate.',
    keywords: ['video bitrate calculator', 'video file size calculator', 'youtube upload bitrate'],
    howToUse: [
      'Enter video duration (hours, minutes, seconds), video bitrate (Mbps), and audio bitrate (kbps).',
      'View total estimated file size in MB, GB, and GiB, plus estimated upload time at custom internet speeds.',
      'Use presets for YouTube recommended 1080p, 1440p, and 4K HDR export bitrates.',
    ],
    features: [
      'Includes official YouTube SDR/HDR recommended bitrate presets',
      'Calculates both decimal (GB) and binary (GiB) storage units',
      'Includes upload time estimator for Mbps upload bandwidth',
    ],
    useCases: [
      'Checking SD card or SSD capacity before multi-hour shoots',
      'Estimating upload times before scheduled video premieres',
    ],
    privacyNote: 'Pure math executed locally.',
    faqs: [
      {
        question: 'Why does actual exported file size vary slightly from VBR estimates?',
        answer: 'Variable Bitrate (VBR) encoders adjust bitrate frame-by-frame based on motion complexity, whereas Constant Bitrate (CBR) matches the formula almost exactly.',
      },
    ],
    relatedSlugs: ['unit-converter', 'youtube-timestamp-builder', 'percentage-calculator'],
  },

  // =========================================================================
  // 6. CALCULATORS & CONVERTERS (7)
  // =========================================================================
  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'calculators-math',
    executionMode: 'local',
    popular: true,
    shortDescription: 'Solve X% of Y, percentage share, percentage increase/decrease, and reverse-percentage discounts.',
    seoTitle: 'Percentage Calculator – 4-in-1 Percent Change & Discount Tool | AI Tools Hub',
    seoDescription: 'Calculate percentages, percent increase or decrease, ratio shares, and original pre-tax/pre-discount values in one workspace.',
    keywords: ['percentage calculator', 'percent change calculator', 'reverse percentage'],
    howToUse: [
      'Use any of the four dedicated calculators simultaneously without switching tabs.',
      'Enter values with decimals or negative numbers to see instant tabular results.',
      'Copy any calculated number with one click.',
    ],
    features: [
      'Four independent live panels: X% of Y, X is what % of Y, % Change, and Reverse %',
      'Handles decimal precision cleanly and guards against division-by-zero',
      'Tabular figures for aligned numeric reading',
    ],
    useCases: [
      'Calculating SaaS MoM growth rates, tax markups, and discount savings',
      'Finding original pre-VAT prices using reverse percentage math',
    ],
    privacyNote: 'Calculated locally in your browser.',
    faqs: [
      {
        question: 'How does Reverse Percentage work?',
        answer: 'If an item costs $80 after a 20% discount, Reverse Percentage divides $80 by `(1 - 0.20)` to recover the original $100 price.',
      },
    ],
    relatedSlugs: ['margin-markup-calculator', 'compound-interest-calculator', 'loan-emi-calculator'],
  },
  {
    slug: 'loan-emi-calculator',
    name: 'Loan & EMI Calculator',
    category: 'calculators-math',
    executionMode: 'local',
    shortDescription: 'Calculate monthly loan payments (EMI), total interest, principal ratio, and export a full amortization CSV.',
    seoTitle: 'Loan & EMI Calculator with Amortization Schedule | AI Tools Hub',
    seoDescription: 'Compute monthly EMI payments, total interest cost, and month-by-month principal/interest amortization tables with CSV export.',
    keywords: ['loan emi calculator', 'mortgage calculator', 'amortization schedule csv'],
    howToUse: [
      'Enter Loan Principal, Annual Interest Rate (%), and Tenure (years or months).',
      'Review monthly payment, total interest payable, and principal-vs-interest breakdown.',
      'Inspect the monthly or yearly amortization schedule and download it as `.csv`.',
    ],
    features: [
      'Standard reducing-balance EMI formula `P × r × (1+r)^n / ((1+r)^n - 1)`',
      'Full month-by-month amortization table with remaining balance',
      'One-click CSV export of the complete repayment schedule',
    ],
    useCases: [
      'Comparing auto, personal, business, or mortgage financing offers',
      'Evaluating how shorter loan terms reduce lifetime interest paid',
    ],
    privacyNote: 'Financial figures stay strictly in your browser.',
    faqs: [
      {
        question: 'Does this account for lender origination fees or variable rates?',
        answer: 'It models fixed-rate reducing-balance loans. Treat lender fees separately as part of effective APR comparisons.',
      },
    ],
    relatedSlugs: ['compound-interest-calculator', 'margin-markup-calculator', 'percentage-calculator'],
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    category: 'calculators-math',
    executionMode: 'local',
    shortDescription: 'Project long-term savings growth with recurring monthly contributions, compounding frequencies, and yearly tables.',
    seoTitle: 'Compound Interest Calculator with Monthly Contributions | AI Tools Hub',
    seoDescription: 'Calculate compound interest growth with initial principal, monthly deposits, compounding frequency, and year-by-year breakdown.',
    keywords: ['compound interest calculator', 'investment growth calculator', 'savings projection'],
    howToUse: [
      'Enter Initial Principal, Monthly Contribution, Annual Interest Rate (%), and Duration in years.',
      'Select Compounding Frequency (Monthly, Quarterly, Semi-Annually, Annually, Daily).',
      'Analyze Principal vs Total Contributions vs Compound Interest earned in the yearly ledger.',
    ],
    features: [
      'Accurate period-by-period compounding simulation',
      'Separates Starting Principal, Recurring Deposits, and Interest Earned',
      'Downloadable `.csv` year-by-year growth schedule',
    ],
    useCases: [
      'Planning retirement savings, index fund projections, or emergency reserves',
      'Comparing monthly vs annual compounding impact',
    ],
    privacyNote: 'Computed locally with zero data tracking.',
    faqs: [
      {
        question: 'Are taxes or inflation deducted automatically?',
        answer: 'No. Enter an inflation-adjusted ("real") rate of return if you want projections in today’s purchasing power.',
      },
    ],
    relatedSlugs: ['loan-emi-calculator', 'percentage-calculator', 'margin-markup-calculator'],
  },
  {
    slug: 'margin-markup-calculator',
    name: 'Profit Margin & Markup Calculator',
    category: 'calculators-math',
    executionMode: 'local',
    shortDescription: 'Calculate gross profit margin %, markup %, net profit per unit, and revenue from Cost and Price (or Target Margin).',
    seoTitle: 'Profit Margin & Markup Calculator for Ecommerce & SaaS | AI Tools Hub',
    seoDescription: 'Compute gross margin percentage, markup percentage, unit profit, and target selling price from unit cost.',
    keywords: ['profit margin calculator', 'markup vs margin', 'pricing calculator'],
    howToUse: [
      'Enter Item Cost (COGS) and either Selling Price or Target Margin %.',
      'View Gross Profit, Gross Margin %, Markup %, and Cost-to-Revenue ratio.',
      'Use the unit volume multiplier to project total profit across batch sizes.',
    ],
    features: [
      'Two calculation modes: Cost + Price → Margin, or Cost + Target Margin → Price',
      'Clear side-by-side explanation of Margin vs Markup formulas',
      'Batch profit projection for 100 / 1,000 units',
    ],
    useCases: [
      'Pricing ecommerce SKUs, agency retainers, and wholesale goods accurately',
      'Avoiding the costly mistake of confusing a 30% markup with a 30% margin',
    ],
    privacyNote: 'Pricing numbers never leave your device.',
    faqs: [
      {
        question: 'What is the difference between Margin and Markup?',
        answer: 'Margin is profit divided by selling price (`(Price - Cost) / Price`), while Markup is profit divided by cost (`(Price - Cost) / Cost`). A 50% markup equals a 33.33% gross margin.',
      },
    ],
    relatedSlugs: ['percentage-calculator', 'compound-interest-calculator', 'loan-emi-calculator'],
  },
  {
    slug: 'age-date-calculator',
    name: 'Age & Date Difference Calculator',
    category: 'calculators-math',
    executionMode: 'local',
    shortDescription: 'Compute exact years, months, days, total weeks, weekdays/business days, and countdowns between dates.',
    seoTitle: 'Age & Date Difference Calculator – Exact Days & Business Days | AI Tools Hub',
    seoDescription: 'Calculate exact chronological age or the exact span in years, months, days, hours, and weekdays between any two calendar dates.',
    keywords: ['age calculator', 'date difference calculator', 'business days calculator'],
    howToUse: [
      'Select a Start Date (or Birth Date) and an End Date (defaults to today).',
      'View exact Years, Months, and Days alongside total days, weeks, and weekdays (Mon–Fri).',
      'If calculating age, inspect your next birthday countdown and day of birth.',
    ],
    features: [
      'Handles leap years (`Feb 29`) and varying month lengths accurately',
      'Counts Monday–Friday business days in the selected interval',
      'Shows day of the week for both dates',
    ],
    useCases: [
      'Calculating project sprint durations, contract anniversaries, or warranty expirations',
      'Finding exact chronological age in years, months, and days',
    ],
    privacyNote: 'Dates are computed locally in your browser.',
    faqs: [
      {
        question: 'Does the business-day count exclude public holidays?',
        answer: 'It counts Monday through Friday weekdays cleanly; regional public holidays vary by jurisdiction and are not excluded automatically.',
      },
    ],
    relatedSlugs: ['timestamp-converter', 'cron-expression-explainer', 'unit-converter'],
  },
  {
    slug: 'bmi-bmr-calculator',
    name: 'BMI & Daily Calorie (BMR/TDEE) Calculator',
    category: 'calculators-math',
    executionMode: 'local',
    shortDescription: 'Calculate Body Mass Index, Mifflin-St Jeor Basal Metabolic Rate, and activity-adjusted daily calorie needs.',
    seoTitle: 'BMI, BMR & TDEE Daily Calorie Calculator | AI Tools Hub',
    seoDescription: 'Calculate BMI, Basal Metabolic Rate (Mifflin-St Jeor), and Total Daily Energy Expenditure (TDEE) in Metric or Imperial units.',
    keywords: ['bmi calculator', 'bmr calculator', 'tdee calorie calculator'],
    howToUse: [
      'Select Metric (kg/cm) or Imperial (lbs/ft-in) units.',
      'Enter age, sex, height, weight, and typical weekly activity level.',
      'Review BMI category, BMR maintenance floor, and estimated TDEE calorie targets.',
    ],
    features: [
      'Supports both Metric and US Imperial inputs seamlessly',
      'Uses the validated Mifflin-St Jeor BMR equation',
      'Displays educational WHO BMI reference ranges with non-clinical disclaimer',
    ],
    useCases: [
      'Estimating baseline daily caloric expenditure for fitness planning',
      'Converting between metric and imperial anthropometric stats',
    ],
    privacyNote: 'Health inputs remain completely private inside your browser.',
    faqs: [
      {
        question: 'Is BMI a complete measure of health?',
        answer: 'No. BMI is a broad population screening ratio and does not distinguish muscle mass from body fat. Consult a qualified clinician for personalized guidance.',
      },
    ],
    relatedSlugs: ['unit-converter', 'percentage-calculator', 'age-date-calculator'],
  },
  {
    slug: 'unit-converter',
    name: 'Universal Unit Converter',
    category: 'calculators-math',
    executionMode: 'local',
    shortDescription: 'Convert Length, Weight/Mass, Temperature, Digital Storage (KB/KiB), Speed, and Time with live multi-unit output.',
    seoTitle: 'Universal Unit Converter – Length, Weight, Data & Temp | AI Tools Hub',
    seoDescription: 'Convert between metric, imperial, temperature, speed, time, and binary/decimal digital storage units instantaneously.',
    keywords: ['unit converter', 'kg to lbs', 'celsius to fahrenheit', 'mb to gib'],
    howToUse: [
      'Choose a measurement category (Length, Weight, Temperature, Digital Storage, Speed, or Time).',
      'Enter a number and select the source unit.',
      'Read all equivalent target units simultaneously in the conversion grid and copy any value.',
    ],
    features: [
      'Shows all units in the active category simultaneously instead of one pair at a time',
      'Distinguishes decimal storage (`MB`, `GB`) from binary (`MiB`, `GiB`) accurately',
      'High-precision floating-point formatting',
    ],
    useCases: [
      'Converting cloud storage quotas, server bandwidths, and shipping weights',
      'Quick engineering and kitchen temperature conversions',
    ],
    privacyNote: 'All unit conversions execute locally.',
    faqs: [
      {
        question: 'What is the difference between GB and GiB?',
        answer: '1 GB (Gigabyte) is `10^9` bytes (1,000 MB), whereas 1 GiB (Gibibyte) is `2^30` bytes (1,024 MiB). Operating systems and cloud providers often use different conventions.',
      },
    ],
    relatedSlugs: ['video-bitrate-calculator', 'color-converter', 'percentage-calculator'],
  },

  // =========================================================================
  // 7. AI & PROMPT UTILITIES (6 — 2 local deterministic + 4 clearly labeled AI API-Dependent)
  // =========================================================================
  {
    slug: 'ai-token-calculator',
    name: 'AI Token & Cost Estimator',
    category: 'ai-prompts',
    executionMode: 'local',
    popular: true,
    shortDescription: 'Estimate LLM token counts, character-to-token ratios, context window usage, and reference API costs locally.',
    seoTitle: 'AI Token Counter & LLM Cost Estimator | AI Tools Hub',
    seoDescription: 'Estimate prompt token counts, context window utilization, and approximate input/output API costs locally without sending prompts anywhere.',
    keywords: ['ai token counter', 'llm cost calculator', 'prompt token estimator'],
    howToUse: [
      'Paste your system prompt, user prompt, or document chunk into the editor.',
      'Adjust expected output response tokens and batch request volume.',
      'Compare estimated token count and reference cost across small, balanced, and frontier LLM tiers.',
    ],
    features: [
      'Heuristic subword/whitespace BPE-style token estimation running 100% offline',
      'Context window usage bars for 32K, 128K, and 1M token models',
      'Zero prompt data leaves your browser',
    ],
    useCases: [
      'Budgeting RAG pipeline context chunks before deploying to production',
      'Checking whether a codebase snippet fits inside an LLM context window',
    ],
    privacyNote: 'Runs 100% locally in JavaScript; proprietary prompts are never transmitted.',
    faqs: [
      {
        question: 'How accurate is a browser-based token estimate?',
        answer: 'For English prose and code, subword heuristic counting typically falls within 3–8% of official model tokenizers without needing heavyweight WASM dictionaries.',
      },
    ],
    relatedSlugs: ['ai-prompt-builder', 'word-counter', 'character-counter'],
  },
  {
    slug: 'ai-prompt-builder',
    name: 'Structured AI Prompt Builder',
    category: 'ai-prompts',
    executionMode: 'local',
    shortDescription: 'Assemble clear, reproducible prompts with Role, Context, Task, Constraints, Output Format, and XML/Markdown export.',
    seoTitle: 'Structured AI Prompt Builder – Markdown & XML Templates | AI Tools Hub',
    seoDescription: 'Design crisp, structured AI prompts with role definition, constraints, few-shot examples, and clean Markdown or XML tag formatting.',
    keywords: ['ai prompt builder', 'system prompt template', 'xml prompt formatter'],
    howToUse: [
      'Fill in the structured fields: Persona/Role, Background Context, Primary Objective, Constraints, and Output Schema.',
      'Choose Markdown Headers or XML Tag (`<role>`, `<instructions>`) formatting.',
      'Copy or download the finished prompt for use in your preferred AI workspace.',
    ],
    features: [
      'Supports both clean Markdown and XML-delimited prompt architectures',
      'Includes starter presets for Code Review, Data Extraction, and Editorial Editing',
      'Live token and word estimate badge',
    ],
    useCases: [
      'Standardizing reusable team prompts in documentation or codebases',
      'Separating untrusted input variables cleanly using XML delimiters',
    ],
    privacyNote: 'Prompts are composed locally in browser state.',
    faqs: [
      {
        question: 'Why use XML tags in structured prompts?',
        answer: 'Wrapping `<context>`, `<instructions>`, and `<examples>` in explicit tags reduces ambiguity when pasting long source documents into LLMs.',
      },
    ],
    relatedSlugs: ['ai-token-calculator', 'ai-text-summarizer', 'markdown-to-html'],
  },
  {
    slug: 'ai-text-summarizer',
    name: 'AI Text Summarizer',
    category: 'ai-prompts',
    executionMode: 'ai-api-dependent',
    shortDescription: 'Extractive key-sentence summarizer running locally in preview mode; clearly labeled for AI API-dependent abstraction.',
    seoTitle: 'AI Text Summarizer (Local Extractive Preview & API Notice) | AI Tools Hub',
    seoDescription: 'Summarize articles using an offline TF-IDF sentence-scoring preview engine. Clearly labeled where full generative AI requires an external API.',
    keywords: ['ai text summarizer', 'extractive summary tool', 'article summarizer'],
    howToUse: [
      'Paste an article, meeting transcript, or essay into the input box.',
      'Select target summary length (3, 5, or 7 key sentences) and output style (Paragraph or Bullet Takeaways).',
      'Run the local extractive engine instantly—no paid API or key required.',
    ],
    features: [
      'Transparently labeled as AI API-Dependent for abstractive rewriting',
      'Working client-side TF-IDF / word-frequency sentence scoring engine included',
      'Compression ratio and word-reduction metrics',
    ],
    useCases: [
      'Extracting key sentences from long articles offline without exposing sensitive text',
      'Generating quick bulleted digests for study notes',
    ],
    privacyNote: 'Because no paid AI API is connected on this static site, all processing falls back to a local JavaScript extractive algorithm. No API keys exist in frontend code.',
    faqs: [
      {
        question: 'Why is this tool labeled AI API-Dependent?',
        answer: 'True abstractive paraphrasing requires a server-side LLM API. To keep this static site free and private with zero exposed API keys, it runs a real local extractive sentence-ranking algorithm.',
      },
    ],
    relatedSlugs: ['ai-tone-rewriter', 'readability-analyzer', 'ai-token-calculator'],
  },
  {
    slug: 'ai-tone-rewriter',
    name: 'AI Tone & Style Rewriter',
    category: 'ai-prompts',
    executionMode: 'ai-api-dependent',
    shortDescription: 'Rule-based style & clarity transformer locally; clearly labeled where full neural rewriting is AI API-dependent.',
    seoTitle: 'AI Tone & Style Rewriter (Local Rule Engine & API Notice) | AI Tools Hub',
    seoDescription: 'Clean filler words, tighten passive phrasing, expand contractions for formal tone, and preview AI API-dependent style rewriting locally.',
    keywords: ['tone rewriter', 'concise writing tool', 'formal email cleaner'],
    howToUse: [
      'Paste draft email or paragraph copy into the editor.',
      'Choose a local transformation preset (Formal / No Contractions, Concise / Filler Stripper, Direct / Active Hints).',
      'Inspect highlighted edits and copy the cleaned draft.',
    ],
    features: [
      'Explicitly labeled as AI API-Dependent for creative neural paraphrasing',
      'Real local rule-based cleaner that strips hedge fillers ("just", "actually", "very") and standardizes contractions',
      'Shows before/after word reduction',
    ],
    useCases: [
      'Tightening wordy business emails before hitting send',
      'Standardizing casual drafts into formal documentation tone',
    ],
    privacyNote: 'Runs a deterministic JavaScript rule engine locally; no external paid API is called.',
    faqs: [
      {
        question: 'What does the local rule engine modify?',
        answer: 'In Concise mode it removes common filler qualifiers and redundant spacing; in Formal mode it expands contractions ("don’t" → "do not") and replaces casual phrasing.',
      },
    ],
    relatedSlugs: ['ai-text-summarizer', 'readability-analyzer', 'ai-prompt-builder'],
  },
  {
    slug: 'ai-seo-meta-writer',
    name: 'AI SEO Meta & Title Drafter',
    category: 'ai-prompts',
    executionMode: 'ai-api-dependent',
    shortDescription: 'Keyword-extractive SEO title & meta drafter locally; clearly labeled where generative copywriting requires an AI API.',
    seoTitle: 'AI SEO Meta & Title Drafter (Local Keyword Engine) | AI Tools Hub',
    seoDescription: 'Extract primary topics from draft copy and assemble SERP-sized title and meta description templates locally, with transparent AI API labeling.',
    keywords: ['seo meta writer', 'meta description drafter', 'ai seo title'],
    howToUse: [
      'Paste your article body or product description plus your brand name.',
      'Click Draft Meta Suggestions to extract dominant phrases and build SERP-ready templates.',
      'Edit and copy directly into the Meta Tag Generator.',
    ],
    features: [
      'Transparently marked as AI API-Dependent for full generative copywriting',
      'Local keyphrase extraction + lead-sentence condensation into 60-char titles and 155-char descriptions',
      'Character limit indicators per generated variant',
    ],
    useCases: [
      'Quickly drafting baseline SEO metadata from long blog drafts',
      'Extracting top keywords to feed into your editorial workflow',
    ],
    privacyNote: 'All keyword extraction runs locally in JavaScript with zero API keys.',
    faqs: [
      {
        question: 'Do I need an API key to use this drafter?',
        answer: 'No. It uses a built-in client-side keyword extractor and template formatter, while clearly noting where an external AI API would add generative phrasing.',
      },
    ],
    relatedSlugs: ['meta-tag-generator', 'keyword-density-checker', 'serp-length-checker'],
  },
  {
    slug: 'ai-code-explainer',
    name: 'AI Code & Structure Inspector',
    category: 'ai-prompts',
    executionMode: 'ai-api-dependent',
    shortDescription: 'Static client-side code structure analyzer locally; clearly labeled where semantic explanation is AI API-dependent.',
    seoTitle: 'AI Code & Structure Inspector (Local AST/Pattern Analyzer) | AI Tools Hub',
    seoDescription: 'Inspect code language, imports, functions, classes, and comment ratios locally in your browser with transparent AI API-dependent labeling.',
    keywords: ['code inspector', 'static code summary', 'ai code explainer'],
    howToUse: [
      'Paste a JavaScript, TypeScript, Python, SQL, or HTML snippet.',
      'Run Local Structure Analysis to extract imports, declared functions/classes, line counts, and complexity cues.',
      'Use the generated structural breakdown or export a ready-to-ask AI prompt.',
    ],
    features: [
      'Explicitly labeled as AI API-Dependent for deep semantic reasoning',
      'Real client-side parser identifying imports, exports, functions, classes, SQL clauses, and comment density',
      'One-click "Copy as Structured Prompt" to ask any external LLM safely',
    ],
    useCases: [
      'Auditing unfamiliar snippets for external dependencies and function inventories',
      'Preparing concise structural summaries of large code blocks',
    ],
    privacyNote: 'Proprietary source code is analyzed purely in your browser and never sent to external servers.',
    faqs: [
      {
        question: 'How does it inspect code without an AI backend?',
        answer: 'It uses deterministic lexical pattern matching in JavaScript to detect language syntax, import statements, function signatures, and code-to-comment ratios.',
      },
    ],
    relatedSlugs: ['json-formatter', 'regex-tester', 'ai-prompt-builder'],
  },
];

export const TOOL_BY_SLUG = Object.fromEntries(
  TOOLS_CATALOG.map((tool) => [tool.slug, tool])
) as Record<string, ToolDefinition>;
