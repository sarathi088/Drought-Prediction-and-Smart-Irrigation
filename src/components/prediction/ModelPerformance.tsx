import React from 'react';
import type { ModelMetrics } from '../../types';
import { BrainCircuit, Award } from 'lucide-react';

interface ModelPerformanceProps {
  selectedModel: 'Random Forest' | 'XGBoost' | 'LSTM';
  onSelectModel: (model: 'Random Forest' | 'XGBoost' | 'LSTM') => void;
  metrics: ModelMetrics;
}

export const ModelPerformance: React.FC<ModelPerformanceProps> = ({ selectedModel, onSelectModel, metrics }) => {
  const models: Array<'Random Forest' | 'XGBoost' | 'LSTM'> = ['Random Forest', 'XGBoost', 'LSTM'];

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-4 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
            <BrainCircuit className="h-4 w-4 text-cyan-600" />
            <span>AI ML Model Evaluation & Benchmarks</span>
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Academic ML model performance evaluated on 1,500 agricultural field samples</p>
        </div>

        <div className="flex items-center space-x-1.5 bg-slate-100 border border-slate-200/80 rounded-xl p-1">
          {models.map((m) => (
            <button
              key={m}
              onClick={() => onSelectModel(m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedModel === m
                  ? 'bg-white text-emerald-800 border border-emerald-300 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
          <p className="text-[10px] uppercase font-bold text-slate-500">Model Accuracy</p>
          <p className="text-2xl font-black text-emerald-700 font-mono mt-1">{metrics.accuracy}%</p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
          <p className="text-[10px] uppercase font-bold text-slate-500">Precision</p>
          <p className="text-2xl font-black text-cyan-700 font-mono mt-1">{metrics.precision}%</p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
          <p className="text-[10px] uppercase font-bold text-slate-500">Recall Rate</p>
          <p className="text-2xl font-black text-sky-700 font-mono mt-1">{metrics.recall}%</p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
          <p className="text-[10px] uppercase font-bold text-slate-500">F1 Score</p>
          <p className="text-2xl font-black text-teal-700 font-mono mt-1">{metrics.f1Score}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 shadow-2xs">
          <p className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
            <Award className="h-4 w-4 text-emerald-600" />
            <span>2x2 Confusion Matrix ({selectedModel})</span>
          </p>

          <div className="grid grid-cols-2 gap-2.5 text-center text-xs font-mono">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-2xs">
              <span className="text-[10px] text-slate-500 block font-sans font-semibold">True Positive (TP)</span>
              <span className="text-lg font-black">{metrics.confusionMatrix[0][0]}</span>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 shadow-2xs">
              <span className="text-[10px] text-slate-500 block font-sans font-semibold">False Positive (FP)</span>
              <span className="text-lg font-black">{metrics.confusionMatrix[0][1]}</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 shadow-2xs">
              <span className="text-[10px] text-slate-500 block font-sans font-semibold">False Negative (FN)</span>
              <span className="text-lg font-black">{metrics.confusionMatrix[1][0]}</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-2xs">
              <span className="text-[10px] text-slate-500 block font-sans font-semibold">True Negative (TN)</span>
              <span className="text-lg font-black">{metrics.confusionMatrix[1][1]}</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs shadow-2xs">
          <p className="font-bold text-slate-800">Model Deployment Specs:</p>
          <div className="space-y-2 text-slate-600 mt-2">
            <div className="flex justify-between border-b border-slate-200/70 pb-1.5">
              <span>Active Model:</span>
              <span className="text-slate-900 font-bold">{selectedModel} (Classifier)</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/70 pb-1.5">
              <span>Model Version:</span>
              <span className="text-slate-800 font-mono font-semibold">v1.4-agri-prod</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/70 pb-1.5">
              <span>Inference Time:</span>
              <span className="text-slate-800 font-mono font-semibold">14.2 ms</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span>Training Validation:</span>
              <span className="text-emerald-700 font-bold">5-Fold Cross Validated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
