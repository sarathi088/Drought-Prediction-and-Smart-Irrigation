import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Activity, Droplets, Thermometer, Wind, CloudRain, GlassWater, Clock } from 'lucide-react';

export const FieldMonitoringPage: React.FC = () => {
  const { reading, telemetryMode } = useSimulation();

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <Activity className="h-5 w-5 text-emerald-600" />
            <span>Live Field Sensor Monitoring</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-time telemetry stream from IoT agricultural sensor node grid
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 shadow-2xs">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>Last Updated: <span className="font-mono text-emerald-700 font-bold">{reading.timestamp}</span></span>
          </div>

          <span className={`px-3 py-1.5 rounded-xl font-bold uppercase border shadow-2xs ${
            telemetryMode === 'LIVE'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-amber-50 text-amber-800 border-amber-200 animate-pulse'
          }`}>
            {telemetryMode} MODE
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Soil Moisture */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-4 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2.5">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 shadow-2xs">
                <Droplets className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Soil Moisture</h3>
                <p className="text-[11px] text-slate-500 font-medium">Probe SM-001 (0-10cm Depth)</p>
              </div>
            </div>

            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase border shadow-2xs ${
              reading.soilMoisture < 35 ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              {reading.soilMoisture < 35 ? 'LOW' : 'NORMAL'}
            </span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-black text-slate-900 font-mono tracking-tight">{reading.soilMoisture}%</span>
            <span className="text-xs text-slate-500 font-semibold">Volumetric Content</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-2 border-t border-slate-100">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] text-slate-500 block font-sans font-semibold">Min</span>
              <span className="text-slate-800 font-bold">28%</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] text-slate-500 block font-sans font-semibold">Max</span>
              <span className="text-slate-800 font-bold">58%</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] text-slate-500 block font-sans font-semibold">Avg</span>
              <span className="text-slate-800 font-bold">42%</span>
            </div>
          </div>
        </div>

        {/* Temperature */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-4 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2.5">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-200 shadow-2xs">
                <Thermometer className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Temperature</h3>
                <p className="text-[11px] text-slate-500 font-medium">Air Sensor TP-001</p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs">
              TREND: +0.4°C
            </span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-black text-slate-900 font-mono tracking-tight">{reading.temperature}°C</span>
            <span className="text-xs text-slate-500 font-semibold">Ambient Temp</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-2 border-t border-slate-100">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] text-slate-500 block font-sans font-semibold">Min</span>
              <span className="text-slate-800 font-bold">22.4°C</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] text-slate-500 block font-sans font-semibold">Max</span>
              <span className="text-slate-800 font-bold">35.1°C</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] text-slate-500 block font-sans font-semibold">Avg</span>
              <span className="text-slate-800 font-bold">28.6°C</span>
            </div>
          </div>
        </div>

        {/* Humidity */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-4 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2.5">
              <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-200 shadow-2xs">
                <Wind className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Relative Humidity</h3>
                <p className="text-[11px] text-slate-500 font-medium">DHT22 Weather Node</p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-cyan-50 text-cyan-700 border border-cyan-200 shadow-2xs">
              STABLE
            </span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-black text-slate-900 font-mono tracking-tight">{reading.humidity}%</span>
            <span className="text-xs text-slate-500 font-semibold">Relative RH</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-2 border-t border-slate-100">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] text-slate-500 block font-sans font-semibold">Min</span>
              <span className="text-slate-800 font-bold">52%</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] text-slate-500 block font-sans font-semibold">Max</span>
              <span className="text-slate-800 font-bold">88%</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] text-slate-500 block font-sans font-semibold">Avg</span>
              <span className="text-slate-800 font-bold">68%</span>
            </div>
          </div>
        </div>

        {/* Precipitation */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-4 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2.5">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-200 shadow-2xs">
                <CloudRain className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Precipitation</h3>
                <p className="text-[11px] text-slate-500 font-medium">Rainfall Gauge Node</p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-sky-50 text-sky-700 border border-sky-200 shadow-2xs">
              DAILY CUMULATIVE
            </span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-black text-slate-900 font-mono tracking-tight">{reading.rainfall} mm</span>
            <span className="text-xs text-slate-500 font-semibold">Accumulated Today</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 shadow-2xs">
            <p className="text-[11px] text-slate-600 font-medium">
              Precipitation deficit: <span className="text-amber-700 font-bold">-1.2 mm</span> compared to seasonal baseline.
            </p>
          </div>
        </div>

        {/* Water Reservoir */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-4 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2.5">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-200 shadow-2xs">
                <GlassWater className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Water Reservoir</h3>
                <p className="text-[11px] text-slate-500 font-medium">Ultrasonic Tank Gauge</p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
              7,200 L AVAILABLE
            </span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-black text-slate-900 font-mono tracking-tight">{reading.waterLevel}%</span>
            <span className="text-xs text-slate-500 font-semibold">Tank Capacity</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 shadow-2xs">
            <p className="text-[11px] text-slate-600 font-medium">
              Estimated operational runtime remaining: <span className="text-emerald-700 font-bold">64 Hours</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
