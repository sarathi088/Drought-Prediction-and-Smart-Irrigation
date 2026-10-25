import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { WaterUsageChart } from '../components/charts/WaterUsageChart';
import { GlassWater, Filter, Download, History } from 'lucide-react';

export const WaterManagementPage: React.FC = () => {
  const { waterStats, history } = useSimulation();
  const [filterMode, setFilterMode] = useState<string>('ALL');

  const filteredHistory = history.filter((item) => {
    if (filterMode === 'ALL') return true;
    return item.mode === filterMode;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <GlassWater className="h-5 w-5 text-sky-600" />
            <span>Water Resource & Consumption Management</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Reservoir tracking, conservation analytics, and historical irrigation logs
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl font-bold text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
          WATER CONSERVATION: +{waterStats.waterSavedPercent}% SAVED
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl glass-card border border-slate-200/80 bg-white space-y-1 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-500">Water Available</span>
          <p className="text-2xl font-black text-sky-700 font-mono tracking-tight">{waterStats.availableLiters.toLocaleString()} L</p>
          <span className="text-[10px] text-slate-400 font-medium block">Tank: 72% Full</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-200/80 bg-white space-y-1 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-500">Used Today</span>
          <p className="text-2xl font-black text-slate-900 font-mono tracking-tight">{waterStats.usedToday.toLocaleString()} L</p>
          <span className="text-[10px] text-slate-400 font-medium block">Daily Discharge</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-200/80 bg-white space-y-1 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-500">Used This Week</span>
          <p className="text-2xl font-black text-slate-900 font-mono tracking-tight">{waterStats.usedThisWeek.toLocaleString()} L</p>
          <span className="text-[10px] text-slate-400 font-medium block">Cumulative Week</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-200/80 bg-white space-y-1 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-500">Used This Month</span>
          <p className="text-2xl font-black text-slate-900 font-mono tracking-tight">{waterStats.usedThisMonth.toLocaleString()} L</p>
          <span className="text-[10px] text-slate-400 font-medium block">30 Day Consumption</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-200/80 bg-white space-y-1 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-500">Avg Daily Usage</span>
          <p className="text-2xl font-black text-slate-900 font-mono tracking-tight">{waterStats.avgDailyUsage.toLocaleString()} L</p>
          <span className="text-[10px] text-slate-400 font-medium block">Baseline Average</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-200/80 bg-white space-y-1 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-500">Water Saved</span>
          <p className="text-2xl font-black text-emerald-700 font-mono tracking-tight">{waterStats.waterSavedPercent}%</p>
          <span className="text-[10px] text-slate-400 font-medium block">Vs Fixed Timers</span>
        </div>
      </div>

      <WaterUsageChart />

      <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <History className="h-4 w-4 text-emerald-600" />
              <span>Irrigation Event History Log</span>
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">Audit trail of automated AI decisions and manual overrides</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1.5 bg-slate-100 border border-slate-200/80 rounded-xl p-1 text-xs">
              <Filter className="h-3.5 w-3.5 text-slate-400 ml-1" />
              <button
                onClick={() => setFilterMode('ALL')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${filterMode === 'ALL' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilterMode('AUTO')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${filterMode === 'AUTO' ? 'bg-white text-cyan-800 border border-cyan-200 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                AUTO
              </button>
              <button
                onClick={() => setFilterMode('MANUAL')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${filterMode === 'MANUAL' ? 'bg-white text-amber-800 border border-amber-200 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                MANUAL
              </button>
            </div>

            <button
              onClick={() => alert('CSV Export complete!')}
              className="launchpad-btn-secondary flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Event ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time Range</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Water Used</th>
                <th className="p-3">Trigger Source</th>
                <th className="p-3">Mode</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredHistory.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-800">{row.id}</td>
                  <td className="p-3 text-slate-600 font-medium">{row.date}</td>
                  <td className="p-3 text-slate-600 font-medium">{row.startTime} - {row.endTime}</td>
                  <td className="p-3 text-slate-600 font-medium">{row.durationMinutes} mins</td>
                  <td className="p-3 font-bold text-sky-700">{row.waterUsedLiters} L</td>
                  <td className="p-3 font-sans font-medium text-slate-700">{row.trigger}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase border shadow-2xs ${
                      row.mode === 'AUTO' ? 'bg-cyan-50 text-cyan-800 border-cyan-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {row.mode}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
