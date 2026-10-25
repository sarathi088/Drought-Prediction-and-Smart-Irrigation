import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import type { IoTDevice } from '../../types';
import { SensorDetailModal } from './SensorDetailModal';
import { MapPin, Cpu, Droplet, Radio, ShieldAlert } from 'lucide-react';

export const FieldMap: React.FC = () => {
  const { reading, irrigation, devices } = useSimulation();
  const [selectedDevice, setSelectedDevice] = useState<IoTDevice | null>(null);

  const getMoistureColor = (moisture: number) => {
    if (moisture < 35) return 'text-rose-700 bg-rose-50 border-rose-200';
    if (moisture < 45) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-emerald-700 bg-emerald-50 border-emerald-200';
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-4 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-emerald-600" />
            <span>Interactive Agricultural Field Visualizer</span>
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Green Valley Field A (2.5 Acres) — Real-time IoT Node Overlay</p>
        </div>

        <div className="flex items-center space-x-3 text-[11px]">
          <div className="flex items-center space-x-1.5 font-semibold text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-2xs"></span>
            <span>Normal (&ge;45%)</span>
          </div>
          <div className="flex items-center space-x-1.5 font-semibold text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shadow-2xs"></span>
            <span>Warning (35-44%)</span>
          </div>
          <div className="flex items-center space-x-1.5 font-semibold text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse shadow-2xs"></span>
            <span>Critical (&lt;35%)</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[360px] rounded-2xl bg-slate-50/90 border border-slate-200 overflow-hidden select-none shadow-inner">
        <svg className="absolute inset-0 w-full h-full opacity-60" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 120 180 L 280 180 L 280 100 L 480 100 M 280 180 L 280 260 L 520 260"
            fill="none"
            stroke={irrigation.pumpStatus === 'ON' ? '#0284c7' : '#cbd5e1'}
            strokeWidth="5"
            strokeDasharray={irrigation.pumpStatus === 'ON' ? '8 4' : 'none'}
            className={irrigation.pumpStatus === 'ON' ? 'animate-pulse' : ''}
          />
        </svg>

        <div className="absolute top-6 left-12 right-60 h-36 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 shadow-2xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-white px-2 py-0.5 rounded-md border border-emerald-200 shadow-2xs">
              Zone 1: Rice Paddy (North)
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shadow-2xs ${getMoistureColor(reading.soilMoisture)}`}>
              SM: {reading.soilMoisture}%
            </span>
          </div>
        </div>

        <div className="absolute bottom-6 left-12 right-60 h-36 rounded-xl border border-teal-200 bg-teal-50/70 p-3 shadow-2xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-white px-2 py-0.5 rounded-md border border-teal-200 shadow-2xs">
              Zone 2: Rice Paddy (South)
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shadow-2xs ${getMoistureColor(reading.soilMoisture + 2)}`}>
              SM: {reading.soilMoisture + 2}%
            </span>
          </div>
        </div>

        <div className="absolute top-6 right-8 w-44 h-[312px] rounded-xl border border-sky-200 bg-white/95 p-3 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-sky-700 font-bold">
              <Droplet className="h-4 w-4 text-sky-600" />
              <span className="text-xs">Water Reservoir</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-500">{reading.waterLevel}%</span>
          </div>

          <div className="relative w-full h-48 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex flex-col justify-end">
            <div
              className="w-full bg-gradient-to-t from-sky-600 to-cyan-400 transition-all duration-700 opacity-85"
              style={{ height: `${reading.waterLevel}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-xs text-white drop-shadow">
              {reading.waterLevel}% (7,200 L)
            </div>
          </div>

          <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <span className="text-[10px] text-slate-500 font-bold">PUMP RELAY:</span>
            <span className={`px-2 py-0.5 rounded font-black text-[10px] uppercase shadow-2xs ${
              irrigation.pumpStatus === 'ON' ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-200 text-slate-600'
            }`}>
              {irrigation.pumpStatus}
            </span>
          </div>
        </div>

        <div
          onClick={() => setSelectedDevice(devices[0])}
          className="absolute top-20 left-44 cursor-pointer transform hover:scale-110 transition-all group"
        >
          <div className={`p-2 rounded-full ring-4 shadow-md ${
            reading.soilMoisture < 35
              ? 'bg-rose-500 ring-rose-300 text-white animate-bounce'
              : 'bg-emerald-600 ring-emerald-200 text-white'
          }`}>
            <Cpu className="h-4 w-4" />
          </div>
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white border border-slate-200 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md font-mono whitespace-nowrap shadow-md">
            SM-001 ({reading.soilMoisture}%)
          </div>
        </div>

        <div
          onClick={() => setSelectedDevice(devices[1])}
          className="absolute top-24 left-96 cursor-pointer transform hover:scale-110 transition-all"
        >
          <div className="p-2 rounded-full bg-cyan-600 ring-4 ring-cyan-200 text-white shadow-md">
            <Radio className="h-4 w-4" />
          </div>
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white border border-slate-200 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md font-mono whitespace-nowrap shadow-md">
            WX-002 ({reading.temperature}°C)
          </div>
        </div>

        <div
          onClick={() => setSelectedDevice(devices[2])}
          className="absolute top-44 right-16 cursor-pointer transform hover:scale-110 transition-all"
        >
          <div className="p-2 rounded-full bg-amber-500 ring-4 ring-amber-200 text-white shadow-md">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white border border-amber-300 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md font-mono whitespace-nowrap shadow-md">
            WT-003 (INSPECT)
          </div>
        </div>
      </div>

      <SensorDetailModal device={selectedDevice} onClose={() => setSelectedDevice(null)} />
    </div>
  );
};
