import React from 'react';
import type { DroughtPrediction } from '../../types';
import { CheckCircle2, Info, Sparkles } from 'lucide-react';

interface AiExplanationProps {
  prediction: DroughtPrediction;
}

export const AiExplanation: React.FC<AiExplanationProps> = ({ prediction }) => {
  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>AI Explainability Engine (&quot;Why This Prediction?&quot;)</span>
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Transparent rationale for academic presentation and auditability</p>
        </div>

        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-cyan-50 text-cyan-700 border border-cyan-200 shadow-2xs">
          MODEL: {prediction.modelName} (v1.0)
        </span>
      </div>

      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 shadow-2xs">
        <p className="text-xs font-semibold text-slate-700">
          Drought Risk is classified as{' '}
          <span className="font-extrabold text-amber-700 uppercase font-mono">{prediction.riskLevel} ({prediction.probability}%)</span> because:
        </p>

        <ul className="space-y-2 text-xs">
          {prediction.explanation.map((item, i) => (
            <li key={i} className="flex items-start space-x-2.5 text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-start space-x-3 text-xs shadow-2xs">
        <Info className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-emerald-800 uppercase tracking-wider text-[10px] block">AI Recommendation:</span>
          <p className="text-emerald-950 font-medium leading-relaxed mt-0.5">{prediction.recommendedAction}</p>
        </div>
      </div>
    </div>
  );
};
