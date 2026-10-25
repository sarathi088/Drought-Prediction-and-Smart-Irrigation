import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { DecisionEngineVisualizer } from '../components/irrigation/DecisionEngineVisualizer';
import { ManualOverrideModal } from '../components/irrigation/ManualOverrideModal';
import { Droplet, Play, StopCircle, Cpu, Clock, GlassWater, Gauge } from 'lucide-react';

export const SmartIrrigationPage: React.FC = () => {
  const { reading, prediction, irrigation, settings, startPumpManual, stopPumpManual } = useSimulation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <Droplet className="h-5 w-5 text-emerald-600" />
            <span>Smart Automated Irrigation Control</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-time pump relay control powered by AI drought risk evaluation
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className={`px-3 py-1.5 rounded-xl font-bold uppercase border shadow-2xs ${
            irrigation.mode === 'AUTO' ? 'bg-cyan-50 text-cyan-800 border-cyan-200' : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}>
            MODE: {irrigation.mode} CONTROL
          </span>

          <span className={`px-3 py-1.5 rounded-xl font-bold uppercase border shadow-2xs ${
            irrigation.pumpStatus === 'ON'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 animate-pulse'
              : 'bg-slate-100 text-slate-700 border-slate-200'
          }`}>
            PUMP: {irrigation.pumpStatus}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl glass-card border border-slate-200/80 bg-white space-y-1 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-500">Current Pump Status</span>
          <p className={`text-2xl font-black font-mono tracking-tight ${irrigation.pumpStatus === 'ON' ? 'text-emerald-700' : 'text-slate-500'}`}>
            {irrigation.pumpStatus}
          </p>
          <span className="text-[10px] text-slate-400 font-medium block">{irrigation.mode} Mode Active</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-200/80 bg-white space-y-1 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-500">Current Moisture</span>
          <p className="text-2xl font-black text-slate-900 font-mono tracking-tight">{reading.soilMoisture}%</p>
          <span className="text-[10px] text-slate-400 font-medium block">Threshold: &lt;{settings.soilMoistureThreshold}%</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-200/80 bg-white space-y-1 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-500">Target Moisture</span>
          <p className="text-2xl font-black text-emerald-700 font-mono tracking-tight">{settings.targetSoilMoisture}%</p>
          <span className="text-[10px] text-slate-400 font-medium block">Auto Stop Goal</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-200/80 bg-white space-y-1 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-500">AI Drought Risk</span>
          <p className="text-2xl font-black text-amber-700 font-mono tracking-tight">{prediction.probability}% ({prediction.riskLevel})</p>
          <span className="text-[10px] text-slate-400 font-medium block">Evaluated by Model</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-200/80 bg-white space-y-1 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-500">Water Available</span>
          <p className="text-2xl font-black text-sky-700 font-mono tracking-tight">{reading.waterLevel}%</p>
          <span className="text-[10px] text-slate-400 font-medium block">Reservoir Tank</span>
        </div>
      </div>

      <DecisionEngineVisualizer />

      <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <Cpu className="h-4 w-4 text-emerald-600" />
              <span>ESP32 Relay Pump Hardware Telemetry</span>
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">ESP32 &rarr; 5V Optocoupler Relay &rarr; 1HP Submersible Motor Pump</p>
          </div>

          <div className="flex items-center space-x-2">
            {irrigation.pumpStatus === 'OFF' ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="launchpad-btn-primary flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>MANUAL START PUMP</span>
              </button>
            ) : (
              <button
                onClick={stopPumpManual}
                className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-md shadow-rose-500/20"
              >
                <StopCircle className="h-3.5 w-3.5" />
                <span>MANUAL STOP PUMP</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3 shadow-2xs">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 shadow-2xs">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500">Active Pump Runtime</p>
              <p className="text-xl font-black text-slate-900 font-mono tracking-tight mt-0.5">{irrigation.runtimeMinutes} min</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3 shadow-2xs">
            <div className="p-3 rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-200 shadow-2xs">
              <GlassWater className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500">Water Discharged</p>
              <p className="text-xl font-black text-slate-900 font-mono tracking-tight mt-0.5">{irrigation.waterUsedLiters} Litres</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3 shadow-2xs">
            <div className="p-3 rounded-xl bg-teal-50 text-teal-600 ring-1 ring-teal-200 shadow-2xs">
              <Gauge className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500">Pumping Flow Rate</p>
              <p className="text-xl font-black text-slate-900 font-mono tracking-tight mt-0.5">{irrigation.flowRateLpm} L/min</p>
            </div>
          </div>
        </div>
      </div>

      <ManualOverrideModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={startPumpManual}
      />
    </div>
  );
};
