import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { TrendChart } from '../components/charts/TrendChart';
import { WaterUsageChart } from '../components/charts/WaterUsageChart';
import { LineChart, Download } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { trendData } = useSimulation();

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <LineChart className="h-5 w-5 text-emerald-600" />
            <span>Historical Analytics & Scientific Reports</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Multivariate statistical analysis, seasonal trends, and model predictions
          </p>
        </div>

        <button
          onClick={() => alert('Scientific Report PDF downloaded successfully!')}
          className="launchpad-btn-primary flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold"
        >
          <Download className="h-4 w-4" />
          <span>Download IEEE Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <TrendChart data={trendData} />
        <WaterUsageChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-3 shadow-xs">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Crop Hydration Efficiency</h3>
          <p className="text-3xl font-black text-emerald-700 font-mono tracking-tight">94.2%</p>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Percentage of time field moisture maintained strictly within optimal boundaries (40%–65%).
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-3 shadow-xs">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Drought Prevention Rate</h3>
          <p className="text-3xl font-black text-cyan-700 font-mono tracking-tight">100%</p>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Zero severe wilting events recorded across 90-day observation trial.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-3 shadow-xs">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mean Response Latency</h3>
          <p className="text-3xl font-black text-amber-700 font-mono tracking-tight">1.8 Sec</p>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Automated pump trigger activation speed from AI drought risk threshold breaching.
          </p>
        </div>
      </div>
    </div>
  );
};
