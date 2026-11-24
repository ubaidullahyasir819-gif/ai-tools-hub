import React from 'react';

export type AdSlotVariant = 'leaderboard' | 'rectangle' | 'inline';

interface AdPlacementProps {
  variant: AdSlotVariant;
  slotId: string;
  className?: string;
}

const SLOT_LABELS: Record<AdSlotVariant, { size: string; label: string; heightClass: string }> = {
  leaderboard: {
    size: '728 × 90',
    label: 'Reserved Ad Placement · Responsive Leaderboard',
    heightClass: 'min-h-[90px]',
  },
  rectangle: {
    size: '300 × 250',
    label: 'Reserved Ad Placement · Sidebar Rectangle',
    heightClass: 'min-h-[250px]',
  },
  inline: {
    size: 'Fluid Banner',
    label: 'Reserved Ad Placement · In-Content Slot',
    heightClass: 'min-h-[100px]',
  },
};

export const AdPlacement: React.FC<AdPlacementProps> = ({ variant, slotId, className = '' }) => {
  const spec = SLOT_LABELS[variant];

  return (
    <aside
      aria-label={`Advertisement slot ${slotId}`}
      data-ad-slot={slotId}
      className={`w-full rounded-xl border border-dashed border-slate-800 bg-[#080C16]/80 px-4 py-4 flex flex-col items-center justify-center text-center ${spec.heightClass} ${className}`}
    >
      <span className="text-xs font-medium text-slate-400">{spec.label}</span>
      <span className="mt-1 font-mono text-[11px] tabular-nums text-slate-500">
        {spec.size} · Slot #{slotId}
      </span>
    </aside>
  );
};
