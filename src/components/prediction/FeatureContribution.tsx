import React from 'react';
import type { ParameterContribution } from '../../types';
import { Layers, ArrowUpRight, ArrowDownRight, AlertCircle, CheckCircle2 } from 'lucide-react';

interface FeatureContributionProps {
  contributions: ParameterContribution[];
}

export const FeatureContribution: React.FC<FeatureContributionProps> = ({ contributions }) => {
  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-4 shadow-xs">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
          <Layers className="h-4 w-4 text-emerald-600" />
          <span>AI Parameter Contribution Breakdown</span>
        </h3>
        <p className="text-[11px] text-slate-500 font-medium">Impact of individual IoT field parameters on the calculated drought risk probability</p>
      </div>

      <div className="space-y-3">
        {contributions.map((item, index) => {
          const isPositive = item.contribution > 0;
          return (
            <div key={index} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between shadow-2xs">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  item.status === 'CRITICAL'
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : item.status === 'WARNING'
                    ? 'bg-amber-50 text-amber-600 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                }`}>
                  {item.status === 'NORMAL' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-800">{item.parameter}</p>
                  <p className="text-[10px] text-slate-500">
                    Observed: <span className="text-slate-800 font-mono font-bold">{item.value}</span> (Normal: {item.normalRange})
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1 font-mono text-xs font-bold">
                {isPositive ? (
                  <span className="flex items-center text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200 shadow-2xs">
                    <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" />
                    +{item.contribution}% Risk
                  </span>
                ) : (
                  <span className="flex items-center text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 shadow-2xs">
                    <ArrowDownRight className="h-3.5 w-3.5 mr-0.5" />
                    {item.contribution}% Risk
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
