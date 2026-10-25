import React from 'react';
import type { RiskLevel } from '../../types';

interface RiskGaugeProps {
  probability: number;
  riskLevel: RiskLevel;
  size?: number;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ probability, riskLevel, size = 220 }) => {
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (probability / 100) * arcLength;

  const colorMap: Record<RiskLevel, { stroke: string; text: string; bg: string; border: string }> = {
    LOW: { stroke: '#059669', text: 'text-emerald-800', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    MODERATE: { stroke: '#d97706', text: 'text-amber-800', bg: 'bg-amber-50', border: 'border-amber-200' },
    HIGH: { stroke: '#ea580c', text: 'text-orange-800', bg: 'bg-orange-50', border: 'border-orange-200' },
    SEVERE: { stroke: '#e11d48', text: 'text-rose-800', bg: 'bg-rose-50', border: 'border-rose-200' }
  };

  const style = colorMap[riskLevel];

  return (
    <div className="flex flex-col items-center justify-center relative">
      <svg width={size} height={size} className="transform -rotate-225 overflow-visible">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={style.stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
          style={{
            filter: `drop-shadow(0px 2px 6px ${style.stroke}40)`
          }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-2">
        <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">DROUGHT PROBABILITY</span>
        <div className="flex items-baseline space-x-0.5 my-0.5">
          <span className="text-4xl font-black text-slate-900 font-mono tracking-tight">{probability}</span>
          <span className="text-lg font-bold text-slate-500">%</span>
        </div>

        <div className={`mt-1 px-3.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider border shadow-2xs ${style.bg} ${style.text} ${style.border}`}>
          {riskLevel} RISK
        </div>
      </div>
    </div>
  );
};
