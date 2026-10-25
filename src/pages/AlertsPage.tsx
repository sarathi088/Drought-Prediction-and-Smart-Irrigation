import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Bell, AlertTriangle, CheckCircle2, Trash2 } from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const { alerts, markAlertAsRead, clearAllAlerts } = useSimulation();

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-rose-50 text-rose-700 border-rose-200 shadow-2xs';
      case 'WARNING':
        return 'bg-amber-50 text-amber-700 border-amber-200 shadow-2xs';
      default:
        return 'bg-sky-50 text-sky-700 border-sky-200 shadow-2xs';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <Bell className="h-5 w-5 text-rose-600" />
            <span>System Alerts & Notifications</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-time threshold warnings, AI drought triggers, and hardware diagnostics
          </p>
        </div>

        <button
          onClick={clearAllAlerts}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 shadow-2xs transition-all"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Clear All Alerts</span>
        </button>
      </div>

      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="p-8 text-center glass-panel rounded-2xl border border-slate-200/80 bg-white text-slate-500 text-sm font-medium shadow-xs">
            No active system alerts. All IoT field nodes operating normally.
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-5 rounded-2xl glass-panel border transition-all ${
                alert.isRead ? 'border-slate-200/60 bg-slate-50/60 opacity-80' : 'border-slate-200/90 bg-white shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3.5">
                  <div className={`p-2.5 rounded-xl border mt-0.5 ${getSeverityStyle(alert.severity)}`}>
                    <AlertTriangle className="h-5 w-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-bold text-slate-900">{alert.title}</h3>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase border ${getSeverityStyle(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{alert.message}</p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 mt-2.5 shadow-2xs">
                      <span className="font-bold text-emerald-800 uppercase text-[10px] block">Recommended Action:</span>
                      <p className="text-slate-800 font-medium mt-0.5">{alert.recommendation}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <span className="text-[10px] text-slate-400 font-mono font-medium">{alert.timestamp}</span>

                  {!alert.isRead && (
                    <button
                      onClick={() => markAlertAsRead(alert.id)}
                      className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 shadow-2xs transition-all"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Mark Read</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
