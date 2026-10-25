import React from 'react';
import { CheckCircle2, XCircle, Zap, Play, StopCircle } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export const DecisionEngineVisualizer: React.FC = () => {
  const { reading, prediction, irrigation, settings, startPumpManual, stopPumpManual } = useSimulation();
  const { decisionFactors } = irrigation;

  const isIrrigationRequired =
    decisionFactors.soilMoistureLow &&
    decisionFactors.droughtRiskHigh &&
    decisionFactors.waterAvailable;

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
            <Zap className="h-4 w-4 text-emerald-600" />
            <span>AI Irrigation Decision Engine</span>
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Multi-parameter decision matrix evaluating real-time field conditions</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-2xs ${
            irrigation.pumpStatus === 'ON'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 animate-pulse'
              : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}
        >
          PUMP: {irrigation.pumpStatus} ({irrigation.mode} MODE)
        </span>
      </div>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 font-mono text-xs text-slate-700 space-y-1.5 shadow-2xs">
        <div className="text-slate-500 font-semibold">// Decision Algorithm Rule:</div>
        <div>
          <span className="text-indigo-600 font-extrabold">IF</span> (
          <span className={decisionFactors.soilMoistureLow ? 'text-emerald-700 font-bold' : 'text-slate-500'}>
            Soil Moisture ({reading.soilMoisture}%) &lt; Threshold ({settings.soilMoistureThreshold}%)
          </span>
        </div>
        <div className="pl-4">
          <span className="text-indigo-600 font-extrabold">AND</span>{' '}
          <span className={decisionFactors.droughtRiskHigh ? 'text-emerald-700 font-bold' : 'text-slate-500'}>
            Drought Risk ({prediction.probability}%) &gt;= HIGH
          </span>
        </div>
        <div className="pl-4">
          <span className="text-indigo-600 font-extrabold">AND</span>{' '}
          <span className={decisionFactors.waterAvailable ? 'text-emerald-700 font-bold' : 'text-slate-500'}>
            Water Tank Level ({reading.waterLevel}%) &gt; Min ({settings.minWaterLevel}%)
          </span>
          )
        </div>
        <div>
          <span className="text-indigo-600 font-extrabold">THEN</span>{' '}
          <span className={isIrrigationRequired ? 'text-emerald-700 font-black' : 'text-amber-700 font-bold'}>
            IRRIGATION = {isIrrigationRequired ? 'ON' : 'OFF'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div className={`p-3.5 rounded-xl border flex items-start space-x-2.5 transition-all shadow-2xs ${
          decisionFactors.soilMoistureLow ? 'bg-emerald-50/80 border-emerald-200' : 'bg-slate-50 border-slate-200'
        }`}>
          {decisionFactors.soilMoistureLow ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="text-xs font-bold text-slate-800">Soil Moisture</p>
            <p className="text-[11px] text-slate-500 font-medium">{reading.soilMoisture}% (Limit: &lt;{settings.soilMoistureThreshold}%)</p>
            <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-md border shadow-2xs ${
              decisionFactors.soilMoistureLow ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-slate-200 text-slate-600 border-slate-300'
            }`}>
              {decisionFactors.soilMoistureLow ? 'DEFICIENT ✓' : 'SUFFICIENT'}
            </span>
          </div>
        </div>

        <div className={`p-3.5 rounded-xl border flex items-start space-x-2.5 transition-all shadow-2xs ${
          decisionFactors.droughtRiskHigh ? 'bg-emerald-50/80 border-emerald-200' : 'bg-slate-50 border-slate-200'
        }`}>
          {decisionFactors.droughtRiskHigh ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="text-xs font-bold text-slate-800">Drought Risk</p>
            <p className="text-[11px] text-slate-500 font-medium">{prediction.probability}% ({prediction.riskLevel})</p>
            <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-md border shadow-2xs ${
              decisionFactors.droughtRiskHigh ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-slate-200 text-slate-600 border-slate-300'
            }`}>
              {decisionFactors.droughtRiskHigh ? 'ELEVATED ✓' : 'NORMAL'}
            </span>
          </div>
        </div>

        <div className={`p-3.5 rounded-xl border flex items-start space-x-2.5 transition-all shadow-2xs ${
          decisionFactors.waterAvailable ? 'bg-emerald-50/80 border-emerald-200' : 'bg-rose-50 border-rose-200'
        }`}>
          {decisionFactors.waterAvailable ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="text-xs font-bold text-slate-800">Water Available</p>
            <p className="text-[11px] text-slate-500 font-medium">{reading.waterLevel}% Reservoir</p>
            <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-md border shadow-2xs ${
              decisionFactors.waterAvailable ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-rose-100 text-rose-800 border-rose-200'
            }`}>
              {decisionFactors.waterAvailable ? 'SUFFICIENT ✓' : 'CRITICAL LOW'}
            </span>
          </div>
        </div>

        <div className={`p-3.5 rounded-xl border flex items-start space-x-2.5 transition-all shadow-2xs ${
          decisionFactors.rainfallLow ? 'bg-emerald-50/80 border-emerald-200' : 'bg-slate-50 border-slate-200'
        }`}>
          {decisionFactors.rainfallLow ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="text-xs font-bold text-slate-800">Rainfall</p>
            <p className="text-[11px] text-slate-500 font-medium">{reading.rainfall.toFixed(1)} mm Today</p>
            <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-md border shadow-2xs ${
              decisionFactors.rainfallLow ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-slate-200 text-slate-600 border-slate-300'
            }`}>
              {decisionFactors.rainfallLow ? 'LOW ✓' : 'ADEQUATE'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-3 sm:space-y-0 shadow-2xs">
        <div className="flex items-center space-x-3.5">
          <div className={`h-11 w-11 rounded-xl flex items-center justify-center font-black shadow-xs ${
            irrigation.pumpStatus === 'ON' ? 'bg-emerald-600 text-white animate-pulse' : 'bg-slate-200 text-slate-700'
          }`}>
            {irrigation.pumpStatus === 'ON' ? 'ON' : 'OFF'}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">
              System Decision:{' '}
              <span className={irrigation.pumpStatus === 'ON' ? 'text-emerald-700 font-black' : 'text-slate-600'}>
                {irrigation.pumpStatus === 'ON' ? 'IRRIGATION ACTIVE (PUMP ON)' : 'NO IRRIGATION REQUIRED (PUMP STANDBY)'}
              </span>
            </p>
            <p className="text-[11px] text-slate-500">
              Last Trigger: <span className="text-slate-700 font-semibold">{irrigation.lastTrigger}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {irrigation.pumpStatus === 'OFF' ? (
            <button
              onClick={startPumpManual}
              className="launchpad-btn-primary flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>START PUMP MANUAL</span>
            </button>
          ) : (
            <button
              onClick={stopPumpManual}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-md shadow-rose-500/20"
            >
              <StopCircle className="h-3.5 w-3.5" />
              <span>STOP PUMP MANUAL</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
