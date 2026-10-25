import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { GlassWater } from 'lucide-react';

export const WaterUsageChart: React.FC = () => {
  const dailyData = [
    { day: 'Mon', usage: 1100, saved: 250 },
    { day: 'Tue', usage: 980, saved: 310 },
    { day: 'Wed', usage: 1240, saved: 280 },
    { day: 'Thu', usage: 890, saved: 410 },
    { day: 'Fri', usage: 1350, saved: 220 },
    { day: 'Sat', usage: 1050, saved: 340 },
    { day: 'Sun', usage: 1240, saved: 390 }
  ];

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
            <GlassWater className="h-4 w-4 text-sky-600" />
            <span>Water Consumption & Savings Breakdown</span>
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Daily irrigation volume vs AI-driven water savings (Litres)</p>
        </div>

        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200 shadow-2xs">
          +18.5% EFFICIENT
        </span>
      </div>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11, fill: '#64748b' }} />
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
            <Bar dataKey="usage" name="Water Used (L)" fill="#0284c7" radius={[6, 6, 0, 0]} />
            <Bar dataKey="saved" name="Water Saved (L)" fill="#059669" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
