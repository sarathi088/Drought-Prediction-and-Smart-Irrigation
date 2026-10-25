import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { LineChart } from 'lucide-react';

interface TrendChartProps {
  data: any[];
}

export const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  const [metric, setMetric] = useState<'soilMoisture' | 'temp' | 'droughtRisk' | 'rainfall'>('soilMoisture');
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D'>('7D');

  const metricConfig = {
    soilMoisture: { label: 'Soil Moisture (%)', color: '#059669', unit: '%' },
    temp: { label: 'Temperature (°C)', color: '#d97706', unit: '°C' },
    droughtRisk: { label: 'Drought Risk (%)', color: '#e11d48', unit: '%' },
    rainfall: { label: 'Rainfall (mm)', color: '#0284c7', unit: ' mm' }
  };

  const current = metricConfig[metric];

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-4 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
            <LineChart className="h-4 w-4 text-emerald-600" />
            <span>Real-time IoT Sensor Trends & Predictions</span>
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Time-series telemetry visualization across historical observations</p>
        </div>

        <div className="flex items-center space-x-2 flex-wrap gap-y-2">
          <div className="flex items-center bg-slate-100 border border-slate-200/80 rounded-xl p-1 text-xs">
            <button
              onClick={() => setMetric('soilMoisture')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                metric === 'soilMoisture' ? 'bg-white text-emerald-800 border border-emerald-300 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Moisture
            </button>
            <button
              onClick={() => setMetric('droughtRisk')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                metric === 'droughtRisk' ? 'bg-white text-rose-800 border border-rose-300 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Drought Risk
            </button>
            <button
              onClick={() => setMetric('temp')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                metric === 'temp' ? 'bg-white text-amber-800 border border-amber-300 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Temp
            </button>
          </div>

          <div className="flex items-center bg-slate-100 border border-slate-200/80 rounded-xl p-1 text-xs">
            {(['7D', '30D', '90D'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  timeRange === r ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={current.color} stopOpacity={0.25} />
                <stop offset="95%" stopColor={current.color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                borderRadius: '0.75rem',
                fontSize: '12px',
                color: '#0f172a',
                boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.1)'
              }}
            />
            <Area
              type="monotone"
              dataKey={metric}
              name={current.label}
              stroke={current.color}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#chartGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
