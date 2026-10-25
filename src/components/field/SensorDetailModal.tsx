import React from 'react';
import type { IoTDevice } from '../../types';
import { Cpu, X, Battery, Wifi, AlertTriangle, Clock } from 'lucide-react';

interface SensorDetailModalProps {
  device: IoTDevice | null;
  onClose: () => void;
}

export const SensorDetailModal: React.FC<SensorDetailModalProps> = ({ device, onClose }) => {
  if (!device) return null;

  const statusColors = {
    ONLINE: 'bg-emerald-50 text-emerald-800 border-emerald-200 shadow-2xs',
    OFFLINE: 'bg-rose-50 text-rose-800 border-rose-200 shadow-2xs',
    ANOMALY: 'bg-amber-50 text-amber-800 border-amber-200 shadow-2xs'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel w-full max-w-lg rounded-2xl p-6 border border-slate-200/90 bg-white shadow-2xl space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{device.deviceName}</h3>
            <p className="text-xs text-slate-500 font-mono">ID: {device.id} • {device.deviceType}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-1">
          <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase border ${statusColors[device.status]}`}>
            {device.status}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
            {device.location}
          </span>
        </div>

        {device.anomalyMessage && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-amber-800">
              <AlertTriangle className="h-4 w-4" />
              <span>Abnormal Sensor Reading Detected</span>
            </div>
            <p className="text-[11px] text-amber-950/80 leading-relaxed">{device.anomalyMessage}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
            <p className="text-[10px] uppercase font-bold text-slate-500">Current Telemetry</p>
            <p className="text-base font-black text-slate-900 font-mono mt-0.5">{device.value || 'N/A'}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
            <p className="text-[10px] uppercase font-bold text-slate-500">Last Communication</p>
            <p className="text-sm font-semibold text-slate-800 mt-1 flex items-center space-x-1">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>{device.lastSeen}</span>
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
            <p className="text-[10px] uppercase font-bold text-slate-500">Battery Level</p>
            <div className="flex items-center space-x-2 mt-1">
              <Battery className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-bold text-slate-900 font-mono">{device.battery}%</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
            <p className="text-[10px] uppercase font-bold text-slate-500">Signal Strength</p>
            <div className="flex items-center space-x-2 mt-1">
              <Wifi className="h-4 w-4 text-sky-600" />
              <span className="text-sm font-bold text-slate-900 font-mono">{device.signalStrength}% RSSI</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
