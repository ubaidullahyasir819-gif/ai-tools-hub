import React, { useMemo, useState } from 'react';
import { CopyButton, DownloadButton } from '../components/ToolActionsBar';

const inputCls =
  'w-full rounded-lg border border-white/[0.1] bg-[#060911] px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none font-mono tabular-nums';

/* 42. Percentage Calculator */
export const PercentageCalculatorTool: React.FC = () => {
  const [p1, setP1] = useState(15);
  const [v1, setV1] = useState(240);

  const [x2, setX2] = useState(45);
  const [y2, setY2] = useState(180);

  const [from3, setFrom3] = useState(120);
  const [to3, setTo3] = useState(156);

  const [final4, setFinal4] = useState(80);
  const [disc4, setDisc4] = useState(20);

  const r1 = (p1 / 100) * v1;
  const r2 = y2 !== 0 ? (x2 / y2) * 100 : 0;
  const r3 = from3 !== 0 ? ((to3 - from3) / Math.abs(from3)) * 100 : 0;
  const r4 = disc4 !== 100 ? final4 / (1 - disc4 / 100) : 0;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-xl border border-white/[0.08] bg-[#060911] p-4 space-y-3">
        <h3 className="text-xs font-semibold text-slate-200">1. What is X% of Y?</h3>
        <div className="flex items-center gap-2">
          <input type="number" value={p1} onChange={(e) => setP1(Number(e.target.value))} className={inputCls} />
          <span className="text-xs text-slate-400 shrink-0">% of</span>
          <input type="number" value={v1} onChange={(e) => setV1(Number(e.target.value))} className={inputCls} />
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="font-mono text-lg font-bold tabular-nums text-violet-300">{r1.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
          <CopyButton text={String(r1)} label="Copy" />
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-[#060911] p-4 space-y-3">
        <h3 className="text-xs font-semibold text-slate-200">2. X is what % of Y?</h3>
        <div className="flex items-center gap-2">
          <input type="number" value={x2} onChange={(e) => setX2(Number(e.target.value))} className={inputCls} />
          <span className="text-xs text-slate-400 shrink-0">of</span>
          <input type="number" value={y2} onChange={(e) => setY2(Number(e.target.value))} className={inputCls} />
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="font-mono text-lg font-bold tabular-nums text-violet-300">
            {y2 === 0 ? 'Undefined' : `${r2.toFixed(2)}%`}
          </span>
          <CopyButton text={r2.toFixed(2)} label="Copy" />
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-[#060911] p-4 space-y-3">
        <h3 className="text-xs font-semibold text-slate-200">3. Percentage Increase / Decrease</h3>
        <div className="flex items-center gap-2">
          <input type="number" value={from3} onChange={(e) => setFrom3(Number(e.target.value))} className={inputCls} />
          <span className="text-xs text-slate-400 shrink-0">to</span>
          <input type="number" value={to3} onChange={(e) => setTo3(Number(e.target.value))} className={inputCls} />
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className={`font-mono text-lg font-bold tabular-nums ${r3 >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {from3 === 0 ? 'Undefined' : `${r3 >= 0 ? '+' : ''}${r3.toFixed(2)}%`}
          </span>
          <CopyButton text={r3.toFixed(2)} label="Copy" />
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-[#060911] p-4 space-y-3">
        <h3 className="text-xs font-semibold text-slate-200">4. Reverse Percentage (Original Before Discount)</h3>
        <div className="flex items-center gap-2">
          <input type="number" value={final4} onChange={(e) => setFinal4(Number(e.target.value))} className={inputCls} />
          <span className="text-xs text-slate-400 shrink-0">after % off</span>
          <input type="number" value={disc4} onChange={(e) => setDisc4(Number(e.target.value))} className={inputCls} />
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="font-mono text-lg font-bold tabular-nums text-violet-300">
            {disc4 === 100 ? 'Undefined' : r4.toFixed(2)}
          </span>
          <CopyButton text={r4.toFixed(2)} label="Copy" />
        </div>
      </div>
    </div>
  );
};

/* 43. Loan & EMI Calculator */
export const LoanEmiCalculatorTool: React.FC = () => {
  const [principal, setPrincipal] = useState(25000);
  const [rateAnnual, setRateAnnual] = useState(6.5);
  const [months, setMonths] = useState(60);

  const result = useMemo(() => {
    const p = Math.max(0, principal);
    const n = Math.max(1, Math.min(600, Math.round(months)));
    const r = Math.max(0, rateAnnual) / 100 / 12;

    const emi = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const schedule: { month: number; payment: number; principalPaid: number; interestPaid: number; balance: number }[] = [];
    let bal = p;
    let totalInterest = 0;

    for (let m = 1; m <= n; m++) {
      const interestPaid = bal * r;
      const principalPaid = Math.min(bal, emi - interestPaid);
      bal = Math.max(0, bal - principalPaid);
      totalInterest += interestPaid;
      schedule.push({
        month: m,
        payment: principalPaid + interestPaid,
        principalPaid,
        interestPaid,
        balance: bal,
      });
    }

    const csv = [
      'Month,Payment,Principal,Interest,Remaining Balance',
      ...schedule.map(
        (s) =>
          `${s.month},${s.payment.toFixed(2)},${s.principalPaid.toFixed(2)},${s.interestPaid.toFixed(2)},${s.balance.toFixed(2)}`
      ),
    ].join('\n');

    return { emi, totalInterest, totalPayment: p + totalInterest, schedule, csv };
  }, [principal, rateAnnual, months]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <label className="block text-xs text-slate-300 mb-1">Loan Amount ($)</label>
          <input type="number" min={100} value={principal} onChange={(e) => setPrincipal(Number(e.target.value) || 0)} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">Annual Interest Rate (%)</label>
          <input type="number" min={0} step={0.1} value={rateAnnual} onChange={(e) => setRateAnnual(Number(e.target.value) || 0)} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">Term (Months)</label>
          <input type="number" min={1} max={480} value={months} onChange={(e) => setMonths(Number(e.target.value) || 1)} className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { label: 'Monthly Payment (EMI)', value: `$${result.emi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
          { label: 'Total Interest Paid', value: `$${result.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
          { label: 'Total Repayment', value: `$${result.totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
        ].map((c) => (
          <div key={c.label} className="rounded-lg border border-white/[0.08] bg-[#060911] px-4 py-3">
            <div className="text-xs text-slate-400">{c.label}</div>
            <div className="mt-1 font-mono text-xl font-bold tabular-nums text-white">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-[#060911] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07]">
          <span className="text-xs font-semibold text-slate-200">Amortization Schedule ({result.schedule.length} months)</span>
          <DownloadButton content={result.csv} filename="amortization-schedule.csv" mimeType="text/csv;charset=utf-8" label="Export CSV" />
        </div>
        <div className="max-h-64 overflow-y-auto">
          <table className="w-full text-left text-xs font-mono tabular-nums">
            <thead className="sticky top-0 bg-[#0B101D] text-slate-400 border-b border-white/[0.07]">
              <tr>
                <th className="px-4 py-2">Month</th>
                <th className="px-4 py-2 text-right">Payment</th>
                <th className="px-4 py-2 text-right">Principal</th>
                <th className="px-4 py-2 text-right">Interest</th>
                <th className="px-4 py-2 text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {result.schedule.map((row) => (
                <tr key={row.month} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-1.5 text-slate-400">{row.month}</td>
                  <td className="px-4 py-1.5 text-right text-slate-200">${row.payment.toFixed(2)}</td>
                  <td className="px-4 py-1.5 text-right text-emerald-300">${row.principalPaid.toFixed(2)}</td>
                  <td className="px-4 py-1.5 text-right text-amber-300">${row.interestPaid.toFixed(2)}</td>
                  <td className="px-4 py-1.5 text-right text-slate-300">${row.balance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* 44. Compound Interest Calculator */
export const CompoundInterestTool: React.FC = () => {
  const [principal, setPrincipal] = useState(5000);
  const [monthlyContrib, setMonthlyContrib] = useState(300);
  const [annualRate, setAnnualRate] = useState(7);
  const [years, setYears] = useState(15);
  const [freq, setFreq] = useState<12 | 4 | 1>(12);

  const summary = useMemo(() => {
    const safeYears = Math.max(1, Math.min(60, Math.round(years)));
    const r = Math.max(0, annualRate) / 100;
    let balance = Math.max(0, principal);
    let totalContributed = balance;
    const rows: { year: number; contributed: number; interest: number; balance: number }[] = [];

    for (let y = 1; y <= safeYears; y++) {
      for (let m = 1; m <= 12; m++) {
        balance += Math.max(0, monthlyContrib);
        totalContributed += Math.max(0, monthlyContrib);
        if (freq === 12) {
          balance *= 1 + r / 12;
        } else if (freq === 4 && m % 3 === 0) {
          balance *= 1 + r / 4;
        } else if (freq === 1 && m === 12) {
          balance *= 1 + r;
        }
      }
      rows.push({
        year: y,
        contributed: totalContributed,
        interest: Math.max(0, balance - totalContributed),
        balance,
      });
    }

    const csv = [
      'Year,Total Contributed,Interest Earned,Ending Balance',
      ...rows.map((row) => `${row.year},${row.contributed.toFixed(2)},${row.interest.toFixed(2)},${row.balance.toFixed(2)}`),
    ].join('\n');

    return {
      finalBalance: balance,
      totalContributed,
      totalInterest: Math.max(0, balance - totalContributed),
      rows,
      csv,
    };
  }, [principal, monthlyContrib, annualRate, years, freq]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div>
          <label className="block text-xs text-slate-300 mb-1">Initial Deposit ($)</label>
          <input type="number" min={0} value={principal} onChange={(e) => setPrincipal(Number(e.target.value) || 0)} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">Monthly Deposit ($)</label>
          <input type="number" min={0} value={monthlyContrib} onChange={(e) => setMonthlyContrib(Number(e.target.value) || 0)} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">Annual Return (%)</label>
          <input type="number" min={0} step={0.1} value={annualRate} onChange={(e) => setAnnualRate(Number(e.target.value) || 0)} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">Years</label>
          <input type="number" min={1} max={60} value={years} onChange={(e) => setYears(Number(e.target.value) || 1)} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">Compounding</label>
          <select value={freq} onChange={(e) => setFreq(Number(e.target.value) as 12 | 4 | 1)} className={inputCls}>
            <option value={12}>Monthly</option>
            <option value={4}>Quarterly</option>
            <option value={1}>Annually</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { label: 'Projected Future Value', value: `$${summary.finalBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
          { label: 'Total Principal Contributed', value: `$${summary.totalContributed.toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
          { label: 'Total Compound Interest', value: `$${summary.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
        ].map((card) => (
          <div key={card.label} className="rounded-lg border border-white/[0.08] bg-[#060911] px-4 py-3">
            <div className="text-xs text-slate-400">{card.label}</div>
            <div className="mt-1 font-mono text-xl font-bold tabular-nums text-white">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-[#060911] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07]">
          <span className="text-xs font-semibold text-slate-200">Year-by-Year Growth</span>
          <DownloadButton content={summary.csv} filename="compound-interest.csv" mimeType="text/csv;charset=utf-8" label="Export CSV" />
        </div>
        <div className="max-h-60 overflow-y-auto">
          <table className="w-full text-left text-xs font-mono tabular-nums">
            <thead className="sticky top-0 bg-[#0B101D] text-slate-400 border-b border-white/[0.07]">
              <tr>
                <th className="px-4 py-2">Year</th>
                <th className="px-4 py-2 text-right">Contributed</th>
                <th className="px-4 py-2 text-right">Interest Earned</th>
                <th className="px-4 py-2 text-right">Ending Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {summary.rows.map((r) => (
                <tr key={r.year}>
                  <td className="px-4 py-1.5 text-slate-400">Year {r.year}</td>
                  <td className="px-4 py-1.5 text-right text-slate-300">${r.contributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                  <td className="px-4 py-1.5 text-right text-emerald-300">${r.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                  <td className="px-4 py-1.5 text-right text-white font-semibold">${r.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* 45. Profit Margin & Markup Calculator */
export const MarginMarkupCalculatorTool: React.FC = () => {
  const [mode, setMode] = useState<'price' | 'targetMargin'>('price');
  const [cost, setCost] = useState(40);
  const [price, setPrice] = useState(65);
  const [targetMargin, setTargetMargin] = useState(35);

  const calc = useMemo(() => {
    const safeCost = Math.max(0, cost);
    const sellingPrice =
      mode === 'price'
        ? Math.max(0, price)
        : targetMargin < 100
        ? safeCost / (1 - targetMargin / 100)
        : 0;
    const profit = sellingPrice - safeCost;
    const marginPct = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;
    const markupPct = safeCost > 0 ? (profit / safeCost) * 100 : 0;
    return { sellingPrice, profit, marginPct, markupPct };
  }, [mode, cost, price, targetMargin]);

  return (
    <div className="space-y-4">
      <div className="inline-flex rounded-lg border border-white/[0.1] bg-[#060911] p-1">
        <button
          type="button"
          onClick={() => setMode('price')}
          className={`rounded-md px-3 py-1.5 text-xs font-medium ${mode === 'price' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          From Cost &amp; Selling Price
        </button>
        <button
          type="button"
          onClick={() => setMode('targetMargin')}
          className={`rounded-md px-3 py-1.5 text-xs font-medium ${mode === 'targetMargin' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          From Cost &amp; Target Margin %
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs text-slate-300 mb-1">Unit Cost ($)</label>
          <input type="number" min={0} step={0.01} value={cost} onChange={(e) => setCost(Number(e.target.value) || 0)} className={inputCls} />
        </div>
        {mode === 'price' ? (
          <div>
            <label className="block text-xs text-slate-300 mb-1">Selling Price ($)</label>
            <input type="number" min={0} step={0.01} value={price} onChange={(e) => setPrice(Number(e.target.value) || 0)} className={inputCls} />
          </div>
        ) : (
          <div>
            <label className="block text-xs text-slate-300 mb-1">Target Gross Margin (%)</label>
            <input type="number" min={0} max={99.9} step={0.5} value={targetMargin} onChange={(e) => setTargetMargin(Number(e.target.value) || 0)} className={inputCls} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Selling Price', value: `$${calc.sellingPrice.toFixed(2)}` },
          { label: 'Gross Profit / Unit', value: `$${calc.profit.toFixed(2)}` },
          { label: 'Gross Margin %', value: `${calc.marginPct.toFixed(2)}%` },
          { label: 'Markup %', value: `${calc.markupPct.toFixed(2)}%` },
        ].map((c) => (
          <div key={c.label} className="rounded-lg border border-white/[0.08] bg-[#060911] px-4 py-3">
            <div className="text-xs text-slate-400">{c.label}</div>
            <div className="mt-1 font-mono text-lg font-bold tabular-nums text-white">{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* 46. Age & Date Difference Calculator */
export const AgeDateCalculatorTool: React.FC = () => {
  const [startDate, setStartDate] = useState('1998-05-14');
  const [endDate, setEndDate] = useState(() => new Date().toISOString().slice(0, 10));

  const diff = useMemo(() => {
    const d1 = new Date(`${startDate}T00:00:00`);
    const d2 = new Date(`${endDate}T00:00:00`);
    if (Number.isNaN(d1.getTime()) || Number.isNaN(d2.getTime())) return null;

    const earlier = d1 <= d2 ? d1 : d2;
    const later = d1 <= d2 ? d2 : d1;

    let years = later.getFullYear() - earlier.getFullYear();
    let months = later.getMonth() - earlier.getMonth();
    let days = later.getDate() - earlier.getDate();

    if (days < 0) {
      const prevMonthDays = new Date(later.getFullYear(), later.getMonth(), 0).getDate();
      days += prevMonthDays;
      months -= 1;
    }
    if (months < 0) {
      months += 12;
      years -= 1;
    }

    const totalDays = Math.round((later.getTime() - earlier.getTime()) / (1000 * 60 * 60 * 24));
    let weekdays = 0;
    const cur = new Date(earlier);
    for (let i = 0; i <= totalDays && i < 50000; i++) {
      const day = cur.getDay();
      if (day !== 0 && day !== 6) weekdays++;
      cur.setDate(cur.getDate() + 1);
    }

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks: (totalDays / 7).toFixed(1),
      weekdays,
      startWeekday: earlier.toLocaleDateString(undefined, { weekday: 'long' }),
    };
  }, [startDate, endDate]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs text-slate-300 mb-1">Start Date / Birth Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">End Date / Target Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className={inputCls} />
        </div>
      </div>

      {diff ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Exact Span', value: `${diff.years}y ${diff.months}m ${diff.days}d` },
            { label: 'Total Days', value: diff.totalDays.toLocaleString() },
            { label: 'Total Weeks', value: diff.totalWeeks },
            { label: 'Weekdays (Mon–Fri)', value: diff.weekdays.toLocaleString() },
          ].map((c) => (
            <div key={c.label} className="rounded-lg border border-white/[0.08] bg-[#060911] px-4 py-3">
              <div className="text-xs text-slate-400">{c.label}</div>
              <div className="mt-1 font-mono text-lg font-bold tabular-nums text-white">{c.value}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-rose-300">Select valid start and end dates.</p>
      )}
    </div>
  );
};

/* 47. BMI & Daily Calorie (BMR/TDEE) Calculator */
export const BmiBmrCalculatorTool: React.FC = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState(29);
  const [heightCm, setHeightCm] = useState(176);
  const [weightKg, setWeightKg] = useState(72);
  const [heightIn, setHeightIn] = useState(69);
  const [weightLb, setWeightLb] = useState(158);
  const [activity, setActivity] = useState(1.55);

  const metrics = useMemo(() => {
    const kg = unit === 'metric' ? weightKg : weightLb * 0.45359237;
    const cm = unit === 'metric' ? heightCm : heightIn * 2.54;
    const m = cm / 100;
    const bmi = m > 0 ? kg / (m * m) : 0;
    const bmr = 10 * kg + 6.25 * cm - 5 * age + (sex === 'male' ? 5 : -161);
    const tdee = bmr * activity;
    let category = 'Normal Weight';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal Weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obesity Range';
    return { bmi, category, bmr, tdee };
  }, [unit, sex, age, heightCm, weightKg, heightIn, weightLb, activity]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-white/[0.1] bg-[#060911] p-1">
          {(['metric', 'imperial'] as const).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setUnit(u)}
              className={`rounded-md px-3 py-1 text-xs font-medium capitalize ${unit === u ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              {u}
            </button>
          ))}
        </div>
        <div className="inline-flex rounded-lg border border-white/[0.1] bg-[#060911] p-1">
          {(['male', 'female'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSex(s)}
              className={`rounded-md px-3 py-1 text-xs font-medium capitalize ${sex === s ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <label className="block text-xs text-slate-300 mb-1">Age (Years)</label>
          <input type="number" min={10} max={110} value={age} onChange={(e) => setAge(Number(e.target.value) || 20)} className={inputCls} />
        </div>
        {unit === 'metric' ? (
          <>
            <div>
              <label className="block text-xs text-slate-300 mb-1">Height (cm)</label>
              <input type="number" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value) || 0)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">Weight (kg)</label>
              <input type="number" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value) || 0)} className={inputCls} />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-xs text-slate-300 mb-1">Height (inches)</label>
              <input type="number" value={heightIn} onChange={(e) => setHeightIn(Number(e.target.value) || 0)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">Weight (lbs)</label>
              <input type="number" value={weightLb} onChange={(e) => setWeightLb(Number(e.target.value) || 0)} className={inputCls} />
            </div>
          </>
        )}
        <div>
          <label className="block text-xs text-slate-300 mb-1">Activity Level</label>
          <select value={activity} onChange={(e) => setActivity(Number(e.target.value))} className={inputCls}>
            <option value={1.2}>Sedentary (1.2×)</option>
            <option value={1.375}>Light Exercise (1.375×)</option>
            <option value={1.55}>Moderate (1.55×)</option>
            <option value={1.725}>Active (1.725×)</option>
            <option value={1.9}>Very Active (1.9×)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'BMI Score', value: metrics.bmi.toFixed(1) },
          { label: 'WHO Category', value: metrics.category },
          { label: 'Basal Metabolic Rate', value: `${Math.round(metrics.bmr)} kcal` },
          { label: 'Maintenance (TDEE)', value: `${Math.round(metrics.tdee)} kcal/d` },
        ].map((c) => (
          <div key={c.label} className="rounded-lg border border-white/[0.08] bg-[#060911] px-4 py-3">
            <div className="text-xs text-slate-400">{c.label}</div>
            <div className="mt-1 font-mono text-base font-bold tabular-nums text-white">{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* 48. Universal Unit Converter */
const UNIT_CATEGORIES: Record<string, { label: string; units: { id: string; label: string; toBase: (v: number) => number; fromBase: (v: number) => number }[] }> = {
  length: {
    label: 'Length',
    units: [
      { id: 'm', label: 'Meters (m)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'km', label: 'Kilometers (km)', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'cm', label: 'Centimeters (cm)', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { id: 'mi', label: 'Miles (mi)', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      { id: 'ft', label: 'Feet (ft)', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { id: 'in', label: 'Inches (in)', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    ],
  },
  weight: {
    label: 'Weight / Mass',
    units: [
      { id: 'kg', label: 'Kilograms (kg)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'g', label: 'Grams (g)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: 'lb', label: 'Pounds (lb)', toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 },
      { id: 'oz', label: 'Ounces (oz)', toBase: (v) => v * 0.02834952, fromBase: (v) => v / 0.02834952 },
    ],
  },
  temperature: {
    label: 'Temperature',
    units: [
      { id: 'C', label: 'Celsius (°C)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'F', label: 'Fahrenheit (°F)', toBase: (v) => ((v - 32) * 5) / 9, fromBase: (v) => (v * 9) / 5 + 32 },
      { id: 'K', label: 'Kelvin (K)', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
  storage: {
    label: 'Data Storage',
    units: [
      { id: 'MB', label: 'Megabytes (MB · 10⁶)', toBase: (v) => v * 1_000_000, fromBase: (v) => v / 1_000_000 },
      { id: 'GB', label: 'Gigabytes (GB · 10⁹)', toBase: (v) => v * 1_000_000_000, fromBase: (v) => v / 1_000_000_000 },
      { id: 'TB', label: 'Terabytes (TB · 10¹²)', toBase: (v) => v * 1_000_000_000_000, fromBase: (v) => v / 1_000_000_000_000 },
      { id: 'MiB', label: 'Mebibytes (MiB · 2²⁰)', toBase: (v) => v * 1024 ** 2, fromBase: (v) => v / 1024 ** 2 },
      { id: 'GiB', label: 'Gibibytes (GiB · 2³⁰)', toBase: (v) => v * 1024 ** 3, fromBase: (v) => v / 1024 ** 3 },
    ],
  },
  speed: {
    label: 'Speed',
    units: [
      { id: 'kmh', label: 'km/h', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      { id: 'mph', label: 'mph', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      { id: 'ms', label: 'm/s', toBase: (v) => v, fromBase: (v) => v },
      { id: 'kn', label: 'Knots', toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
    ],
  },
};

export const UnitConverterTool: React.FC = () => {
  const [cat, setCat] = useState<string>('length');
  const [value, setValue] = useState(10);
  const [fromUnitId, setFromUnitId] = useState('km');

  const activeCategory = UNIT_CATEGORIES[cat];
  const sourceUnit = activeCategory.units.find((u) => u.id === fromUnitId) || activeCategory.units[0];
  const baseVal = sourceUnit.toBase(value);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5 rounded-lg border border-white/[0.1] bg-[#060911] p-1 w-fit">
        {Object.entries(UNIT_CATEGORIES).map(([id, info]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setCat(id);
              setFromUnitId(info.units[0].id);
            }}
            className={`rounded-md px-3 py-1.5 text-xs font-medium ${
              cat === id ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {info.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs text-slate-300 mb-1">Value</label>
          <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value) || 0)} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">From Unit</label>
          <select value={sourceUnit.id} onChange={(e) => setFromUnitId(e.target.value)} className={inputCls}>
            {activeCategory.units.map((u) => (
              <option key={u.id} value={u.id}>{u.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {activeCategory.units.map((u) => {
          const converted = u.fromBase(baseVal);
          const formatted = Number.isInteger(converted)
            ? converted.toLocaleString()
            : converted.toLocaleString(undefined, { maximumFractionDigits: 6 });
          return (
            <div key={u.id} className="rounded-lg border border-white/[0.08] bg-[#060911] px-4 py-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-xs text-slate-400">{u.label}</div>
                <div className="mt-1 font-mono text-base font-semibold tabular-nums text-white truncate">
                  {formatted}
                </div>
              </div>
              <CopyButton text={String(converted)} label="Copy" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
