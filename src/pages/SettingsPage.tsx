import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Settings, Save, RotateCcw } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, resetToDefaults } = useSimulation();
  const [formState, setFormState] = useState(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formState);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-10 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <Settings className="h-5 w-5 text-emerald-600" />
            <span>System Parameters & Threshold Configuration</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Configure decision engine boundaries, target soil moisture, and notification triggers
          </p>
        </div>

        {savedSuccess && (
          <span className="px-3.5 py-1.5 rounded-xl font-bold text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs animate-pulse">
            Settings Saved Successfully!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2.5">
            Soil Moisture & Irrigation Parameters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Soil Moisture Threshold (% Volumetric)
              </label>
              <input
                type="number"
                value={formState.soilMoistureThreshold}
                onChange={(e) => setFormState({ ...formState, soilMoistureThreshold: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs glass-input font-mono"
                min={10}
                max={50}
              />
              <span className="text-[10px] text-slate-500 font-medium mt-1 block">Trigger pump when moisture drops below this value.</span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Target Soil Moisture Goal (%)
              </label>
              <input
                type="number"
                value={formState.targetSoilMoisture}
                onChange={(e) => setFormState({ ...formState, targetSoilMoisture: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs glass-input font-mono"
                min={40}
                max={80}
              />
              <span className="text-[10px] text-slate-500 font-medium mt-1 block">Auto stop pump when reaching this moisture level.</span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Minimum Tank Water Level (%)
              </label>
              <input
                type="number"
                value={formState.minWaterLevel}
                onChange={(e) => setFormState({ ...formState, minWaterLevel: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs glass-input font-mono"
                min={5}
                max={40}
              />
              <span className="text-[10px] text-slate-500 font-medium mt-1 block">Safety cutoff to prevent pump dry-run.</span>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2.5">
            AI Drought Warning Boundaries
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Drought Warning Limit (%)
              </label>
              <input
                type="number"
                value={formState.droughtWarningThreshold}
                onChange={(e) => setFormState({ ...formState, droughtWarningThreshold: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs glass-input font-mono"
                min={30}
                max={70}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Drought Critical Limit (%)
              </label>
              <input
                type="number"
                value={formState.droughtCriticalThreshold}
                onChange={(e) => setFormState({ ...formState, droughtCriticalThreshold: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs glass-input font-mono"
                min={60}
                max={95}
              />
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-3 shadow-xs">
          <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2.5">
            Automation & Notification Switches
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer shadow-2xs hover:bg-slate-100/70 transition-colors">
              <div>
                <span className="font-bold text-slate-900 block">AI Automated Irrigation Control</span>
                <span className="text-[11px] text-slate-500 font-medium">Allow Decision Engine to automatically activate pump relay.</span>
              </div>
              <input
                type="checkbox"
                checked={formState.autoIrrigationEnabled}
                onChange={(e) => setFormState({ ...formState, autoIrrigationEnabled: e.target.checked })}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer shadow-2xs hover:bg-slate-100/70 transition-colors">
              <div>
                <span className="font-bold text-slate-900 block">Instant Email & In-App Alerts</span>
                <span className="text-[11px] text-slate-500 font-medium">Send high priority notifications when drought risk reaches SEVERE.</span>
              </div>
              <input
                type="checkbox"
                checked={formState.emailAlertsEnabled}
                onChange={(e) => setFormState({ ...formState, emailAlertsEnabled: e.target.checked })}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => {
              resetToDefaults();
              setFormState(settings);
            }}
            className="launchpad-btn-secondary flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="submit"
            className="launchpad-btn-primary flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold"
          >
            <Save className="h-4 w-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
