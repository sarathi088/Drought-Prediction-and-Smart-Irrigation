import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Cpu, Battery, Wifi, AlertTriangle, RefreshCw } from 'lucide-react';

export const DevicesPage: React.FC = () => {
  const { devices } = useSimulation();

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <Cpu className="h-5 w-5 text-emerald-600" />
            <span>IoT Hardware Device Management</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            ESP32 wireless node health diagnostics, battery monitoring, and sensor failure detection
          </p>
        </div>

        <button
          onClick={() => alert('IoT Network re-scanned. All nodes responding.')}
          className="launchpad-btn-secondary flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold"
        >
          <RefreshCw className="h-3.5 w-3.5 text-emerald-600" />
          <span>Ping IoT Network</span>
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/90 flex items-start space-x-3 text-xs text-amber-900 shadow-2xs">
        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-800 uppercase text-[11px] block">Sensor Anomaly & Failure Detection Engine Active:</span>
          <p className="text-amber-950/80 font-medium leading-relaxed mt-0.5">
            Automatic diagnostic algorithms monitor telemetry streams for frozen readings, impossible voltage spikes, or packet timeouts. Sensor <span className="font-bold font-mono text-amber-900">ESP32-003 (Reservoir Level Sensor)</span> exhibits a constant reading for &gt;3 hours and may require field inspection.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {devices.map((device) => {
          const isAnomaly = device.status === 'ANOMALY';
          const isOffline = device.status === 'OFFLINE';

          return (
            <div
              key={device.id}
              className={`p-5 rounded-2xl glass-card border space-y-3 transition-all shadow-xs ${
                isAnomaly
                  ? 'border-amber-300 bg-amber-50/20'
                  : isOffline
                  ? 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-200/80 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-xl border ${
                    isAnomaly ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                  }`}>
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{device.deviceName}</h3>
                    <p className="text-[10px] text-slate-500 font-mono font-medium">ID: {device.id} • {device.deviceType}</p>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase border shadow-2xs ${
                  isAnomaly
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : isOffline
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {device.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                  <span className="text-[10px] text-slate-500 block font-sans font-semibold">Battery Level</span>
                  <div className="flex items-center space-x-1.5 mt-1">
                    <Battery className="h-4 w-4 text-emerald-600" />
                    <span className="font-bold text-slate-900">{device.battery}%</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                  <span className="text-[10px] text-slate-500 block font-sans font-semibold">Signal RSSI</span>
                  <div className="flex items-center space-x-1.5 mt-1">
                    <Wifi className="h-4 w-4 text-sky-600" />
                    <span className="font-bold text-slate-900">{device.signalStrength}%</span>
                  </div>
                </div>
              </div>

              {device.anomalyMessage && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 shadow-2xs">
                  <span className="font-bold block text-amber-800">Failure Diagnostic Note:</span>
                  <p className="text-amber-950/80 font-medium mt-0.5">{device.anomalyMessage}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
