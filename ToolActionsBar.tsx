import React, { useState } from 'react';
import { Check, Copy, Download, RotateCcw, Sparkles } from 'lucide-react';

export function downloadTextFile(content: string, filename: string, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

interface CopyButtonProps {
  text: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label = 'Copy',
  disabled = false,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback copy via textarea
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={disabled || !text}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-[#111829] px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-violet-500/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-45 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-violet-500 ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
          <span className="text-emerald-300">Copied</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};

interface DownloadButtonProps {
  content: string;
  filename: string;
  mimeType?: string;
  label?: string;
  disabled?: boolean;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  content,
  filename,
  mimeType = 'text/plain;charset=utf-8',
  label = 'Download',
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={() => content && downloadTextFile(content, filename, mimeType)}
      disabled={disabled || !content}
      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-[#111829] px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-violet-500/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-45 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-violet-500"
    >
      <Download className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
};

interface ToolToolbarProps {
  onSample?: () => void;
  sampleLabel?: string;
  onClear?: () => void;
  copyText?: string;
  downloadText?: string;
  downloadFilename?: string;
  downloadMime?: string;
  extra?: React.ReactNode;
}

export const ToolToolbar: React.FC<ToolToolbarProps> = ({
  onSample,
  sampleLabel = 'Load Sample',
  onClear,
  copyText,
  downloadText,
  downloadFilename = 'output.txt',
  downloadMime = 'text/plain;charset=utf-8',
  extra,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.07]">
      <div className="flex flex-wrap items-center gap-2">
        {onSample && (
          <button
            type="button"
            onClick={onSample}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-[#111829] px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-violet-500/60 hover:text-white whitespace-nowrap shrink-0"
          >
            <Sparkles className="h-3.5 w-3.5 text-violet-400" aria-hidden="true" />
            <span>{sampleLabel}</span>
          </button>
        )}
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-transparent px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:border-slate-700 hover:text-slate-200 whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Clear</span>
          </button>
        )}
        {extra}
      </div>
      <div className="flex items-center gap-2">
        {typeof copyText === 'string' && <CopyButton text={copyText} label="Copy Output" />}
        {typeof downloadText === 'string' && (
          <DownloadButton content={downloadText} filename={downloadFilename} mimeType={downloadMime} />
        )}
      </div>
    </div>
  );
};
