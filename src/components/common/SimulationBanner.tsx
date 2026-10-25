import React from 'react';
import { Cpu, ShieldCheck } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export const SimulationBanner: React.FC = () => {
  const { telemetryMode } = useSimulation();

  if (telemetryMode === 'LIVE') {
    return (
      <div className="bg-emerald-50/95 border-b border-emerald-200/80 px-4 py-2 text-xs flex items-center justify-between text-emerald-900 shadow-2xs">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span className="font-bold">LIVE IOT HARDWARE MODE:</span>
          <span className="text-emerald-800 hidden sm:inline">Connected to ESP32 Gateway via REST / MQTT API. Physical sensor data active.</span>
        </div>
        <span className="text-[10px] bg-white px-2.5 py-0.5 rounded-full font-mono font-bold text-emerald-800 border border-emerald-200 shadow-2xs">
          NODE: ESP32-GATEWAY-ONLINE
        </span>
      </div>
    );
  }

  return (
    <div className="bg-amber-50/95 border-b border-amber-200/80 px-4 py-2 text-xs flex items-center justify-between text-amber-900 shadow-2xs">
      <div className="flex items-center space-x-2">
        <Cpu className="h-4 w-4 text-amber-600 animate-pulse" />
        <span className="font-bold">SIMULATION MODE ACTIVE:</span>
        <span className="text-amber-800 hidden sm:inline">Generating dynamic realistic IoT sensor telemetry streams for academic evaluation.</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-[10px] bg-white px-2.5 py-0.5 rounded-full font-mono font-bold text-amber-800 border border-amber-200 shadow-2xs">
          DEMO ENGINE RUNNING
        </span>
      </div>
    </div>
  );
};
