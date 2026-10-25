import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { RiskGauge } from '../components/common/RiskGauge';
import { FeatureContribution } from '../components/prediction/FeatureContribution';
import { AiExplanation } from '../components/prediction/AiExplanation';
import { ModelPerformance } from '../components/prediction/ModelPerformance';
import { BrainCircuit } from 'lucide-react';

export const DroughtPredictionPage: React.FC = () => {
  const { prediction, selectedModel, setSelectedModel } = useSimulation();

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <BrainCircuit className="h-5 w-5 text-cyan-600" />
            <span>AI-Driven Drought Risk Prediction & Analytics</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Machine Learning classifier integrating multi-variable IoT sensor inputs for early drought warning
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl font-bold bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-2xs">
            MODEL: {selectedModel} (v1.0)
          </span>
          <span className="px-3 py-1.5 rounded-xl font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
            ACCURACY: {prediction.metrics.accuracy}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="glass-panel rounded-2xl p-6 border border-slate-200/80 bg-white flex flex-col items-center justify-between space-y-4 shadow-xs">
          <div className="w-full text-center border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Calculated Drought Probability</h3>
            <p className="text-[11px] text-slate-500 font-medium">Real-time ML Model Assessment</p>
          </div>

          <RiskGauge probability={prediction.probability} riskLevel={prediction.riskLevel} size={220} />

          <div className="w-full grid grid-cols-4 gap-1.5 text-center text-[10px] font-bold pt-2 border-t border-slate-100">
            <div className={`p-1.5 rounded-lg transition-all ${prediction.riskLevel === 'LOW' ? 'bg-emerald-500 text-white shadow-xs ring-2 ring-emerald-300' : 'bg-slate-100 text-slate-600'}`}>
              0-25% LOW
            </div>
            <div className={`p-1.5 rounded-lg transition-all ${prediction.riskLevel === 'MODERATE' ? 'bg-amber-500 text-white shadow-xs ring-2 ring-amber-300' : 'bg-slate-100 text-slate-600'}`}>
              26-50% MOD
            </div>
            <div className={`p-1.5 rounded-lg transition-all ${prediction.riskLevel === 'HIGH' ? 'bg-orange-500 text-white shadow-xs ring-2 ring-orange-300' : 'bg-slate-100 text-slate-600'}`}>
              51-75% HIGH
            </div>
            <div className={`p-1.5 rounded-lg transition-all ${prediction.riskLevel === 'SEVERE' ? 'bg-rose-500 text-white shadow-xs ring-2 ring-rose-300' : 'bg-slate-100 text-slate-600'}`}>
              76-100% SEV
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4 flex flex-col justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl glass-card border border-slate-200/80 bg-white space-y-1 shadow-xs">
              <span className="text-[10px] font-bold uppercase text-slate-500">Current Risk Status</span>
              <p className="text-2xl font-black text-amber-700 font-mono tracking-tight">{prediction.riskLevel}</p>
              <span className="text-[10px] text-slate-400 font-medium block">Based on live sensor feed</span>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-slate-200/80 bg-white space-y-1 shadow-xs">
              <span className="text-[10px] font-bold uppercase text-slate-500">Next 24h Risk Forecast</span>
              <p className="text-2xl font-black text-rose-700 font-mono tracking-tight">{prediction.next24hPredictedRisk}</p>
              <span className="text-[10px] text-slate-400 font-medium block">Predictive projection</span>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-slate-200/80 bg-white space-y-1 shadow-xs">
              <span className="text-[10px] font-bold uppercase text-slate-500">Prediction Confidence</span>
              <p className="text-2xl font-black text-emerald-700 font-mono tracking-tight">{prediction.confidence}%</p>
              <span className="text-[10px] text-slate-400 font-medium block">Evaluated accuracy</span>
            </div>
          </div>

          <AiExplanation prediction={prediction} />
        </div>
      </div>

      <FeatureContribution contributions={prediction.contributions} />

      <ModelPerformance selectedModel={selectedModel} onSelectModel={setSelectedModel} metrics={prediction.metrics} />
    </div>
  );
};
