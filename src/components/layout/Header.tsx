import React from 'react';
import { Sprout, Activity, Bell, Play, Pause, Cpu, ShieldCheck, ChevronDown } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import { useAuth } from '../../context/AuthContext';
import { mockField } from '../../services/mockData';

interface HeaderProps {
  onNavigate: (page: string) => void;
  activePage?: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { isSimulationActive, toggleSimulation, telemetryMode, setTelemetryMode, alerts, reading } = useSimulation();
  const { user } = useAuth();
  const unreadAlerts = alerts.filter((a) => !a.isRead).length;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/90 px-4 py-3 bg-white/95">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate('dashboard')}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/25 ring-1 ring-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg launchpad-brand-gradient tracking-tight">
                  AgriDrought AI
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/90 shadow-2xs">
                  v2.4 IEEE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">AI-Driven Drought Prediction & Smart Irrigation</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-slate-800">{mockField.name}</span>
            <span className="text-slate-500 font-medium">({mockField.cropType})</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-1" />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-slate-100 border border-slate-200/80 rounded-xl p-1 text-xs">
            <button
              onClick={() => setTelemetryMode('SIMULATION')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all font-semibold ${
                telemetryMode === 'SIMULATION'
                  ? 'bg-white text-amber-800 border border-amber-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Cpu className="h-3.5 w-3.5 text-amber-600" />
              <span>SIMULATION</span>
            </button>
            <button
              onClick={() => setTelemetryMode('LIVE')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all font-semibold ${
                telemetryMode === 'LIVE'
                  ? 'bg-white text-emerald-800 border border-emerald-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Activity className="h-3.5 w-3.5 text-emerald-600" />
              <span>LIVE IOT</span>
            </button>
          </div>

          {telemetryMode === 'SIMULATION' && (
            <button
              onClick={toggleSimulation}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-xs ${
                isSimulationActive
                  ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}
              title={isSimulationActive ? 'Pause IoT sensor loop' : 'Resume IoT sensor loop'}
            >
              {isSimulationActive ? <Pause className="h-3.5 w-3.5 text-amber-600" /> : <Play className="h-3.5 w-3.5 text-emerald-600" />}
              <span className="hidden md:inline">{isSimulationActive ? 'Pause Sim' : 'Run Sim'}</span>
            </button>
          )}

          <div className="hidden sm:flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-600 shadow-xs">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span className="text-slate-500">Status:</span>
            <span className="font-bold text-emerald-700">ONLINE</span>
            <span className="text-[10px] text-slate-400 ml-1 font-mono">({reading.timestamp})</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('alerts')}
            className="relative p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-xs transition-colors"
            title="System Alerts"
          >
            <Bell className="h-4 w-4" />
            {unreadAlerts > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs ring-2 ring-white">
                {unreadAlerts}
              </span>
            )}
          </button>

          <div className="flex items-center space-x-2.5 bg-white border border-slate-200 rounded-xl p-1.5 shadow-xs">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
              alt="User Avatar"
              className="h-7 w-7 rounded-lg object-cover ring-1 ring-emerald-500/30"
            />
            <div className="hidden md:block text-left text-xs pr-1">
              <p className="font-bold text-slate-800 leading-tight">{user?.name || 'SARATHI S'}</p>
              <p className="text-[10px] text-emerald-700 font-semibold">{user?.role || 'ADMIN'} ACCESS</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
