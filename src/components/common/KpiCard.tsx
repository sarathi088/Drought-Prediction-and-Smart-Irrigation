import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  statusText?: string;
  statusType?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  icon: LucideIcon;
  trend?: string;
  onClick?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  unit = '',
  subtitle,
  statusText,
  statusType = 'neutral',
  icon: Icon,
  trend,
  onClick
}) => {
  const statusColors = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
    warning: 'bg-amber-50 text-amber-700 border-amber-200/90',
    danger: 'bg-rose-50 text-rose-700 border-rose-200/90',
    info: 'bg-sky-50 text-sky-700 border-sky-200/90',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200/90'
  };

  const iconColors = {
    success: 'bg-emerald-50 text-emerald-600 ring-emerald-200',
    warning: 'bg-amber-50 text-amber-600 ring-amber-200',
    danger: 'bg-rose-50 text-rose-600 ring-rose-200',
    info: 'bg-sky-50 text-sky-600 ring-sky-200',
    neutral: 'bg-slate-100 text-slate-700 ring-slate-200'
  };

  return (
    <div
      onClick={onClick}
      className={`glass-card rounded-2xl p-4 border border-slate-200/80 bg-white relative overflow-hidden transition-all duration-300 shadow-xs hover:border-emerald-300 hover:shadow-lg hover:shadow-slate-200/60 ${
        onClick ? 'cursor-pointer hover:scale-[1.02]' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline space-x-1.5 mt-1.5">
            <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">{value}</span>
            {unit && <span className="text-xs font-bold text-slate-500">{unit}</span>}
          </div>
        </div>

        <div className={`p-2.5 rounded-xl ring-1 ${iconColors[statusType]} flex items-center justify-center shadow-2xs`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs">
        {statusText ? (
          <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase border shadow-2xs ${statusColors[statusType]}`}>
            {statusText}
          </span>
        ) : (
          <span className="text-slate-500 text-[11px] font-medium">{subtitle || 'Updated live'}</span>
        )}

        {trend && (
          <span className="text-[10px] text-slate-500 font-semibold flex items-center space-x-1">
            <span>{trend}</span>
          </span>
        )}
      </div>
    </div>
  );
};
