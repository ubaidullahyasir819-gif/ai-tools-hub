import React, { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import { RefreshCw } from 'lucide-react';
import { CopyButton, DownloadButton, ToolToolbar, downloadTextFile } from '../components/ToolActionsBar';

const inputCls =
  'w-full rounded-lg border border-white/[0.1] bg-[#060911] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none';
const monoAreaCls =
  'w-full rounded-lg border border-white/[0.1] bg-[#060911] p-3.5 font-mono text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none leading-relaxed';
const btnCls =
  'rounded-lg border border-white/[0.1] bg-[#111829] px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-violet-500/60 hover:text-white whitespace-nowrap shrink-0';

/* 21. Password Generator */
function secureRandomInt(max: number): number {
  const limit = Math.floor(0xffffffff / max) * max;
  const arr = new Uint32Array(1);
  let val = 0;
  do {
    window.crypto.getRandomValues(arr);
    val = arr[0];
  } while (val >= limit);
  return val % max;
}

export const PasswordGeneratorTool: React.FC = () => {
  const [length, setLength] = useState(18);
  const [count, setCount] = useState(1);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [seed, setSeed] = useState(0);

  const { passwords, entropyBits, strengthLabel } = useMemo(() => {
    void seed;
    let pool = '';
    if (upper) pool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lower) pool += 'abcdefghijklmnopqrstuvwxyz';
    if (digits) pool += '0123456789';
    if (symbols) pool += '!@#$%^&*()-_=+[]{};:,.?/';
    if (excludeAmbiguous) {
      pool = pool.replace(/[0O1lI]/g, '');
    }
    if (!pool) return { passwords: [], entropyBits: 0, strengthLabel: 'Select at least one character set' };

    const safeCount = Math.max(1, Math.min(20, count));
    const safeLen = Math.max(6, Math.min(64, length));
    const list = Array.from({ length: safeCount }, () =>
      Array.from({ length: safeLen }, () => pool[secureRandomInt(pool.length)]).join('')
    );
    const bits = Math.round(safeLen * Math.log2(pool.length));
    const label =
      bits >= 90 ? 'Very Strong' : bits >= 65 ? 'Strong' : bits >= 45 ? 'Moderate' : 'Weak';

    return { passwords: list, entropyBits: bits, strengthLabel: label };
  }, [length, count, upper, lower, digits, symbols, excludeAmbiguous, seed]);

  const joined = passwords.join('\n');

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.07]">
        <div className="text-xs text-slate-300">
          Entropy:{' '}
          <span className="font-mono font-semibold tabular-nums text-violet-300">{entropyBits} bits</span>
          <span className="mx-2 text-slate-600">·</span>
          <span className="text-slate-200 font-medium">{strengthLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSeed((s) => s + 1)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-violet-500"
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Regenerate</span>
          </button>
          <CopyButton text={joined} label="Copy" />
          <DownloadButton content={joined} filename="passwords.txt" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-white/[0.08] bg-[#060911] p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>Password Length</span>
            <span className="font-mono font-semibold tabular-nums text-white">{length} chars</span>
          </div>
          <input
            type="range"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-violet-500"
          />
          <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
            <span>Batch Count</span>
            <input
              type="number"
              min={1}
              max={20}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
              className="w-20 rounded-md border border-white/[0.1] bg-[#0B101D] px-2.5 py-1 font-mono text-xs text-white"
            />
          </div>
        </div>

        <div className="rounded-lg border border-white/[0.08] bg-[#060911] p-4 grid grid-cols-2 gap-2.5 text-xs text-slate-200">
          {[
            { label: 'Uppercase (A–Z)', checked: upper, set: setUpper },
            { label: 'Lowercase (a–z)', checked: lower, set: setLower },
            { label: 'Numbers (0–9)', checked: digits, set: setDigits },
            { label: 'Symbols (!@#$)', checked: symbols, set: setSymbols },
            { label: 'Exclude 0/O/1/l/I', checked: excludeAmbiguous, set: setExcludeAmbiguous },
          ].map((opt) => (
            <label key={opt.label} className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={opt.checked}
                onChange={(e) => opt.set(e.target.checked)}
                className="accent-violet-500"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {passwords.length === 0 ? (
        <div className="rounded-lg border border-rose-500/40 bg-rose-950/30 px-4 py-3 text-xs text-rose-200">
          Enable at least one character set to generate passwords.
        </div>
      ) : (
        <div className="space-y-2">
          {passwords.map((pwd, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.08] bg-[#060911] px-4 py-3"
            >
              <code className="font-mono text-sm text-white break-all">{pwd}</code>
              <CopyButton text={pwd} label="Copy" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* 22. QR Code Generator */
export const QrCodeGeneratorTool: React.FC = () => {
  const [payloadType, setPayloadType] = useState<'text' | 'wifi' | 'email'>('text');
  const [textVal, setTextVal] = useState('https://aitoolshub.example');
  const [wifiSsid, setWifiSsid] = useState('StudioGuest');
  const [wifiPass, setWifiPass] = useState('SecurePass2026');
  const [wifiAuth, setWifiAuth] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [emailTo, setEmailTo] = useState('hello@example.com');
  const [emailSubj, setEmailSubj] = useState('Quick Question');

  const [fgColor, setFgColor] = useState('#0F172A');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [ecLevel, setEcLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [size, setSize] = useState(280);

  const [pngUrl, setPngUrl] = useState('');
  const [svgMarkup, setSvgMarkup] = useState('');
  const [qrError, setQrError] = useState('');

  const payload = useMemo(() => {
    if (payloadType === 'wifi') {
      return `WIFI:T:${wifiAuth};S:${wifiSsid};P:${wifiAuth === 'nopass' ? '' : wifiPass};;`;
    }
    if (payloadType === 'email') {
      return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubj)}`;
    }
    return textVal;
  }, [payloadType, textVal, wifiSsid, wifiPass, wifiAuth, emailTo, emailSubj]);

  useEffect(() => {
    let cancelled = false;
    if (!payload.trim()) {
      setPngUrl('');
      setSvgMarkup('');
      setQrError('Enter content to render a QR code.');
      return;
    }
    setQrError('');
    Promise.all([
      QRCode.toDataURL(payload, {
        width: size,
        margin: 2,
        errorCorrectionLevel: ecLevel,
        color: { dark: fgColor, light: bgColor },
      }),
      QRCode.toString(payload, {
        type: 'svg',
        margin: 2,
        errorCorrectionLevel: ecLevel,
        color: { dark: fgColor, light: bgColor },
      }),
    ])
      .then(([dataUrl, svg]) => {
        if (!cancelled) {
          setPngUrl(dataUrl);
          setSvgMarkup(svg);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setQrError(err instanceof Error ? err.message : 'Unable to encode QR payload.');
        }
      });
    return () => {
      cancelled = true;
    };
  }, [payload, size, ecLevel, fgColor, bgColor]);

  const downloadPng = () => {
    if (!pngUrl) return;
    const a = document.createElement('a');
    a.href = pngUrl;
    a.download = 'qr-code.png';
    a.click();
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-7 space-y-4">
        <div className="inline-flex rounded-lg border border-white/[0.1] bg-[#060911] p-1">
          {[
            { id: 'text', label: 'URL / Text' },
            { id: 'wifi', label: 'Wi-Fi Network' },
            { id: 'email', label: 'Email Link' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setPayloadType(tab.id as typeof payloadType)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                payloadType === tab.id ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {payloadType === 'text' && (
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">URL or Text Payload</label>
            <textarea
              rows={4}
              value={textVal}
              onChange={(e) => setTextVal(e.target.value)}
              placeholder="https://example.com"
              className={monoAreaCls}
            />
          </div>
        )}

        {payloadType === 'wifi' && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-xs text-slate-300 mb-1">Network Name (SSID)</label>
              <input value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">Encryption</label>
              <select value={wifiAuth} onChange={(e) => setWifiAuth(e.target.value as typeof wifiAuth)} className={inputCls}>
                <option value="WPA">WPA / WPA2 / WPA3</option>
                <option value="WEP">WEP</option>
                <option value="nopass">Open (No Password)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">Password</label>
              <input
                value={wifiPass}
                disabled={wifiAuth === 'nopass'}
                onChange={(e) => setWifiPass(e.target.value)}
                className={inputCls}
              />
            </div>
          </div>
        )}

        {payloadType === 'email' && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs text-slate-300 mb-1">Recipient Email</label>
              <input value={emailTo} onChange={(e) => setEmailTo(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">Subject</label>
              <input value={emailSubj} onChange={(e) => setEmailSubj(e.target.value)} className={inputCls} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-2">
          <div>
            <label className="block text-xs text-slate-300 mb-1">Foreground</label>
            <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="h-10 w-full rounded-lg border border-white/[0.1] bg-[#060911] p-1" />
          </div>
          <div>
            <label className="block text-xs text-slate-300 mb-1">Background</label>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-10 w-full rounded-lg border border-white/[0.1] bg-[#060911] p-1" />
          </div>
          <div>
            <label className="block text-xs text-slate-300 mb-1">Error Correction</label>
            <select value={ecLevel} onChange={(e) => setEcLevel(e.target.value as typeof ecLevel)} className={inputCls}>
              <option value="L">L (7%)</option>
              <option value="M">M (15%)</option>
              <option value="Q">Q (25%)</option>
              <option value="H">H (30%)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-300 mb-1">PNG Size (px)</label>
            <select value={size} onChange={(e) => setSize(Number(e.target.value))} className={inputCls}>
              <option value={220}>220 × 220</option>
              <option value={280}>280 × 280</option>
              <option value={512}>512 × 512</option>
              <option value={1024}>1024 × 1024</option>
            </select>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col items-center justify-center rounded-xl border border-white/[0.08] bg-[#060911] p-6">
        {qrError ? (
          <p className="text-xs text-rose-300">{qrError}</p>
        ) : pngUrl ? (
          <>
            <img
              src={pngUrl}
              alt="Generated QR Code"
              className="h-52 w-52 rounded-lg border border-white/[0.1] bg-white p-2 object-contain"
            />
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={downloadPng}
                className="rounded-lg bg-violet-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-violet-500"
              >
                Download PNG
              </button>
              <button
                type="button"
                onClick={() => downloadTextFile(svgMarkup, 'qr-code.svg', 'image/svg+xml;charset=utf-8')}
                className={btnCls}
              >
                Download SVG
              </button>
              <CopyButton text={svgMarkup} label="Copy SVG" />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

/* 23. UUID & ULID Generator */
const CROCKFORD = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
function generateUlid(): string {
  let time = Date.now();
  let timeChars = '';
  for (let i = 0; i < 10; i++) {
    timeChars = CROCKFORD[time % 32] + timeChars;
    time = Math.floor(time / 32);
  }
  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);
  let randChars = '';
  for (let i = 0; i < 16; i++) {
    randChars += CROCKFORD[bytes[i] % 32];
  }
  return timeChars + randChars;
}

export const UuidGeneratorTool: React.FC = () => {
  const [format, setFormat] = useState<'uuid' | 'ulid'>('uuid');
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [noHyphens, setNoHyphens] = useState(false);
  const [seed, setSeed] = useState(0);

  const ids = useMemo(() => {
    void seed;
    const safeCount = Math.max(1, Math.min(100, count));
    return Array.from({ length: safeCount }, () => {
      let id = format === 'uuid' ? window.crypto.randomUUID() : generateUlid();
      if (noHyphens && format === 'uuid') id = id.replace(/-/g, '');
      return uppercase ? id.toUpperCase() : id.toLowerCase();
    });
  }, [format, count, uppercase, noHyphens, seed]);

  const joined = ids.join('\n');

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.07]">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-lg border border-white/[0.1] bg-[#060911] p-1">
            {(['uuid', 'ulid'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFormat(f)}
                className={`rounded-md px-3 py-1 text-xs font-medium uppercase ${
                  format === f ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 text-xs text-slate-300">
            <span>Qty</span>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
              className="w-20 rounded-md border border-white/[0.1] bg-[#060911] px-2.5 py-1 font-mono text-xs text-white"
            />
          </label>
          <label className="inline-flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
            <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="accent-violet-500" />
            Uppercase
          </label>
          {format === 'uuid' && (
            <label className="inline-flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
              <input type="checkbox" checked={noHyphens} onChange={(e) => setNoHyphens(e.target.checked)} className="accent-violet-500" />
              Remove Hyphens
            </label>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setSeed((s) => s + 1)} className={btnCls}>
            Regenerate
          </button>
          <CopyButton text={joined} label="Copy All" />
          <DownloadButton content={joined} filename={`${format}-batch.txt`} />
        </div>
      </div>

      <textarea rows={9} value={joined} readOnly className={monoAreaCls} />
    </div>
  );
};

/* 24. Color Converter & WCAG Contrast Checker */
function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.trim().replace(/^#/, '');
  if (/^[0-9a-f]{3}$/i.test(clean)) {
    return [
      parseInt(clean[0] + clean[0], 16),
      parseInt(clean[1] + clean[1], 16),
      parseInt(clean[2] + clean[2], 16),
    ];
  }
  if (/^[0-9a-f]{6}$/i.test(clean)) {
    return [
      parseInt(clean.slice(0, 2), 16),
      parseInt(clean.slice(2, 4), 16),
      parseInt(clean.slice(4, 6), 16),
    ];
  }
  return null;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = (gn - bn) / d + (gn < bn ? 6 : 0);
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export const ColorConverterTool: React.FC = () => {
  const [fgHex, setFgHex] = useState('#F8FAFC');
  const [bgHex, setBgHex] = useState('#0B101D');

  const analysis = useMemo(() => {
    const fg = hexToRgb(fgHex) || [248, 250, 252];
    const bg = hexToRgb(bgHex) || [11, 16, 29];
    const l1 = relativeLuminance(...fg);
    const l2 = relativeLuminance(...bg);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    const fgHsl = rgbToHsl(...fg);
    const bgHsl = rgbToHsl(...bg);

    return {
      fgRgb: `rgb(${fg.join(', ')})`,
      fgHsl: `hsl(${fgHsl[0]}, ${fgHsl[1]}%, ${fgHsl[2]}%)`,
      bgRgb: `rgb(${bg.join(', ')})`,
      bgHsl: `hsl(${bgHsl[0]}, ${bgHsl[1]}%, ${bgHsl[2]}%)`,
      ratio,
      aaNormal: ratio >= 4.5,
      aaaNormal: ratio >= 7.0,
      aaLarge: ratio >= 3.0,
    };
  }, [fgHex, bgHex]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-white/[0.08] bg-[#060911] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-200">Foreground (Text)</span>
            <input
              type="color"
              value={hexToRgb(fgHex) ? fgHex : '#F8FAFC'}
              onChange={(e) => setFgHex(e.target.value.toUpperCase())}
              className="h-8 w-12 rounded border border-white/[0.1] bg-transparent"
            />
          </div>
          <input value={fgHex} onChange={(e) => setFgHex(e.target.value)} className={inputCls + ' font-mono'} />
          <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
            <CopyButton text={analysis.fgRgb} label={analysis.fgRgb} />
            <CopyButton text={analysis.fgHsl} label={analysis.fgHsl} />
          </div>
        </div>

        <div className="rounded-lg border border-white/[0.08] bg-[#060911] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-200">Background (Surface)</span>
            <input
              type="color"
              value={hexToRgb(bgHex) ? bgHex : '#0B101D'}
              onChange={(e) => setBgHex(e.target.value.toUpperCase())}
              className="h-8 w-12 rounded border border-white/[0.1] bg-transparent"
            />
          </div>
          <input value={bgHex} onChange={(e) => setBgHex(e.target.value)} className={inputCls + ' font-mono'} />
          <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
            <CopyButton text={analysis.bgRgb} label={analysis.bgRgb} />
            <CopyButton text={analysis.bgHsl} label={analysis.bgHsl} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div
          className="rounded-xl border border-white/[0.1] p-6 flex flex-col justify-center"
          style={{ backgroundColor: hexToRgb(bgHex) ? bgHex : '#0B101D', color: hexToRgb(fgHex) ? fgHex : '#F8FAFC' }}
        >
          <div className="text-lg font-bold">Accessible Typography Preview</div>
          <p className="mt-2 text-sm opacity-90">
            Normal body text requires at least 4.5:1 contrast ratio to pass WCAG AA legibility standards across displays.
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#060911] p-5 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-slate-400">WCAG Contrast Ratio</span>
            <span className="font-mono text-2xl font-bold tabular-nums text-white">
              {analysis.ratio.toFixed(2)} : 1
            </span>
          </div>
          <div className="space-y-1.5 text-xs">
            {[
              { label: 'WCAG AA Normal Text (≥ 4.5:1)', pass: analysis.aaNormal },
              { label: 'WCAG AAA Normal Text (≥ 7.0:1)', pass: analysis.aaaNormal },
              { label: 'WCAG AA Large Text (≥ 3.0:1)', pass: analysis.aaLarge },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between py-1 border-b border-white/[0.05] last:border-0">
                <span className="text-slate-300">{row.label}</span>
                <span className={`font-mono font-semibold ${row.pass ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {row.pass ? 'PASS' : 'FAIL'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* 25. Unix Timestamp Converter */
export const TimestampConverterTool: React.FC = () => {
  const [nowSec, setNowSec] = useState(() => Math.floor(Date.now() / 1000));
  const [epochInput, setEpochInput] = useState(() => String(Math.floor(Date.now() / 1000)));
  const [dateInput, setDateInput] = useState(() => new Date().toISOString().slice(0, 16));

  useEffect(() => {
    const id = window.setInterval(() => setNowSec(Math.floor(Date.now() / 1000)), 1000);
    return () => window.clearInterval(id);
  }, []);

  const decodedEpoch = useMemo(() => {
    const num = Number(epochInput.trim());
    if (!epochInput.trim() || Number.isNaN(num)) return null;
    const isMs = Math.abs(num) > 10_000_000_000;
    const d = new Date(isMs ? num : num * 1000);
    if (Number.isNaN(d.getTime())) return null;
    return {
      unit: isMs ? 'Milliseconds' : 'Seconds',
      iso: d.toISOString(),
      utc: d.toUTCString(),
      local: d.toLocaleString(),
    };
  }, [epochInput]);

  const encodedDate = useMemo(() => {
    if (!dateInput) return null;
    const d = new Date(dateInput);
    if (Number.isNaN(d.getTime())) return null;
    return {
      seconds: Math.floor(d.getTime() / 1000),
      milliseconds: d.getTime(),
      iso: d.toISOString(),
    };
  }, [dateInput]);

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-white/[0.08] bg-[#060911] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs text-slate-400">Current Unix Epoch (Seconds)</span>
          <div className="font-mono text-xl font-bold tabular-nums text-white">{nowSec}</div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setEpochInput(String(nowSec))} className={btnCls}>
            Use Current
          </button>
          <CopyButton text={String(nowSec)} label="Copy Epoch" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-lg border border-white/[0.08] bg-[#060911] p-4 space-y-3">
          <h3 className="text-xs font-semibold text-slate-200">Epoch Timestamp → Date</h3>
          <input
            type="text"
            value={epochInput}
            onChange={(e) => setEpochInput(e.target.value)}
            placeholder="e.g. 1735689600"
            className={inputCls + ' font-mono'}
          />
          {decodedEpoch ? (
            <dl className="space-y-2 text-xs pt-1">
              <div className="flex justify-between gap-2">
                <dt className="text-slate-400">Detected Unit</dt>
                <dd className="font-mono text-violet-300">{decodedEpoch.unit}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-400">ISO-8601</dt>
                <dd className="font-mono text-slate-200">{decodedEpoch.iso}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-400">UTC</dt>
                <dd className="font-mono text-slate-200">{decodedEpoch.utc}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-400">Local Time</dt>
                <dd className="font-mono text-slate-200">{decodedEpoch.local}</dd>
              </div>
            </dl>
          ) : (
            <p className="text-xs text-rose-300">Enter a valid numeric Unix timestamp.</p>
          )}
        </div>

        <div className="rounded-lg border border-white/[0.08] bg-[#060911] p-4 space-y-3">
          <h3 className="text-xs font-semibold text-slate-200">Date &amp; Time → Epoch</h3>
          <input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className={inputCls + ' font-mono'}
          />
          {encodedDate && (
            <dl className="space-y-2 text-xs pt-1">
              <div className="flex items-center justify-between gap-2">
                <dt className="text-slate-400">Seconds</dt>
                <dd className="font-mono tabular-nums text-white flex items-center gap-2">
                  {encodedDate.seconds}
                  <CopyButton text={String(encodedDate.seconds)} label="Copy" />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-slate-400">Milliseconds</dt>
                <dd className="font-mono tabular-nums text-slate-200">{encodedDate.milliseconds}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-400">ISO-8601</dt>
                <dd className="font-mono text-slate-300">{encodedDate.iso}</dd>
              </div>
            </dl>
          )}
        </div>
      </div>
    </div>
  );
};

/* 26. Cron Expression Builder & Explainer */
function expandCronField(field: string, min: number, max: number): number[] | null {
  const result = new Set<number>();
  const parts = field.split(',');
  for (const part of parts) {
    const stepSplit = part.split('/');
    if (stepSplit.length > 2) return null;
    const step = stepSplit[1] ? Number(stepSplit[1]) : 1;
    if (!Number.isInteger(step) || step < 1) return null;
    const range = stepSplit[0];
    let start = min;
    let end = max;
    if (range !== '*') {
      if (range.includes('-')) {
        const [a, b] = range.split('-').map(Number);
        if (!Number.isInteger(a) || !Number.isInteger(b) || a < min || b > max || a > b) return null;
        start = a;
        end = b;
      } else {
        const val = Number(range);
        if (!Number.isInteger(val) || val < min || val > max) return null;
        start = val;
        end = stepSplit[1] ? max : val;
      }
    }
    for (let v = start; v <= end; v += step) result.add(v);
  }
  return Array.from(result).sort((a, b) => a - b);
}

export const CronExpressionTool: React.FC = () => {
  const [expr, setExpr] = useState('*/15 9-17 * * 1-5');

  const parsed = useMemo(() => {
    const parts = expr.trim().split(/\s+/);
    if (parts.length !== 5) {
      return { error: 'Cron expression must have exactly 5 fields: minute hour day month weekday.', nextRuns: [] as string[], summary: '' };
    }
    const mins = expandCronField(parts[0], 0, 59);
    const hrs = expandCronField(parts[1], 0, 23);
    const doms = expandCronField(parts[2], 1, 31);
    const mons = expandCronField(parts[3], 1, 12);
    const dows = expandCronField(parts[4], 0, 6);

    if (!mins || !hrs || !doms || !mons || !dows) {
      return { error: 'One or more cron fields contain invalid numbers or ranges.', nextRuns: [], summary: '' };
    }

    const minSet = new Set(mins);
    const hrSet = new Set(hrs);
    const domSet = new Set(doms);
    const monSet = new Set(mons);
    const dowSet = new Set(dows);

    const runs: string[] = [];
    const cursor = new Date();
    cursor.setSeconds(0, 0);
    cursor.setMinutes(cursor.getMinutes() + 1);

    // Search up to 60 days ahead (86400 minutes)
    for (let i = 0; i < 86400 && runs.length < 5; i++) {
      const m = cursor.getMinutes();
      const h = cursor.getHours();
      const dom = cursor.getDate();
      const mon = cursor.getMonth() + 1;
      const dow = cursor.getDay();
      if (minSet.has(m) && hrSet.has(h) && domSet.has(dom) && monSet.has(mon) && dowSet.has(dow)) {
        runs.push(cursor.toLocaleString());
      }
      cursor.setMinutes(cursor.getMinutes() + 1);
    }

    const summary = `Minute [${parts[0]}] · Hour [${parts[1]}] · Day [${parts[2]}] · Month [${parts[3]}] · Weekday [${parts[4]}]`;
    return { error: '', nextRuns: runs, summary };
  }, [expr]);

  const presets = [
    { label: 'Every 5 mins', val: '*/5 * * * *' },
    { label: 'Hourly', val: '0 * * * *' },
    { label: 'Daily 00:00', val: '0 0 * * *' },
    { label: 'Weekdays 9–5 (15m)', val: '*/15 9-17 * * 1-5' },
    { label: 'Monthly 1st', val: '0 6 1 * *' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.07]">
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button key={p.label} type="button" onClick={() => setExpr(p.val)} className={btnCls}>
              {p.label}
            </button>
          ))}
        </div>
        <CopyButton text={expr} label="Copy Cron" />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1.5">
          5-Field Cron Expression (minute hour day-of-month month day-of-week)
        </label>
        <input
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          className={inputCls + ' font-mono text-base'}
        />
      </div>

      {parsed.error ? (
        <div className="rounded-lg border border-rose-500/40 bg-rose-950/30 px-3.5 py-2 text-xs text-rose-200">
          {parsed.error}
        </div>
      ) : (
        <div className="rounded-lg border border-white/[0.08] bg-[#060911] p-4 space-y-3">
          <div className="font-mono text-xs text-violet-300">{parsed.summary}</div>
          <div>
            <h3 className="text-xs font-semibold text-slate-200 mb-2">Next 5 Scheduled Runs (Local Time)</h3>
            {parsed.nextRuns.length === 0 ? (
              <p className="text-xs text-slate-400">No execution dates matched within the next 60 days.</p>
            ) : (
              <ul className="space-y-1.5 font-mono text-xs tabular-nums text-slate-300">
                {parsed.nextRuns.map((run, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-slate-500">0{i + 1}.</span>
                    <span>{run}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* 27. URL Slug & Clean Filename Generator */
const SLUG_STOP_WORDS = new Set(['a', 'an', 'the', 'and', 'or', 'but', 'for', 'with', 'of', 'in', 'on', 'to', 'at']);

export const SlugGeneratorTool: React.FC = () => {
  const [input, setInput] = useState(
    'How to Build a Fast Static AI Tools Hub in 2026!\nCafé & Crème — Product Launch Guide'
  );
  const [separator, setSeparator] = useState<'-' | '_'>('-');
  const [stripStopWords, setStripStopWords] = useState(false);

  const slugs = useMemo(() => {
    return input
      .split(/\r?\n/)
      .map((line) => {
        const ascii = line
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .replace(/[^a-z0-9\s]+/g, ' ')
          .trim();
        if (!ascii) return '';
        const words = ascii
          .split(/\s+/)
          .filter((w) => (!stripStopWords ? true : !SLUG_STOP_WORDS.has(w)));
        return words.join(separator);
      })
      .join('\n');
  }, [input, separator, stripStopWords]);

  return (
    <div className="space-y-4">
      <ToolToolbar
        onSample={() => setInput('10 Best JSON Formatting Tips for API Developers\nFinal Report Q4 (v2).pdf')}
        onClear={() => setInput('')}
        copyText={slugs}
        downloadText={slugs}
        downloadFilename="url-slugs.txt"
        extra={
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <div className="inline-flex rounded-lg border border-white/[0.1] bg-[#060911] p-1">
              {(['-', '_'] as const).map((sep) => (
                <button
                  key={sep}
                  type="button"
                  onClick={() => setSeparator(sep)}
                  className={`rounded-md px-2.5 py-1 font-mono text-xs ${
                    separator === sep ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {sep === '-' ? 'Hyphen (-)' : 'Underscore (_)'}
                </button>
              ))}
            </div>
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={stripStopWords}
                onChange={(e) => setStripStopWords(e.target.checked)}
                className="accent-violet-500"
              />
              Remove Stop Words
            </label>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Titles / Filenames (1 per line)</label>
          <textarea rows={7} value={input} onChange={(e) => setInput(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Generated Slugs</label>
          <textarea rows={7} value={slugs} readOnly className={monoAreaCls} />
        </div>
      </div>
    </div>
  );
};
