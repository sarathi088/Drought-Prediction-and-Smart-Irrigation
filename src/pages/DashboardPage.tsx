import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { KpiCard } from '../components/common/KpiCard';
import { RiskGauge } from '../components/common/RiskGauge';
import { TrendChart } from '../components/charts/TrendChart';
import { FieldMap } from '../components/field/FieldMap';
import { DecisionEngineVisualizer } from '../components/irrigation/DecisionEngineVisualizer';
import { WaterUsageChart } from '../components/charts/WaterUsageChart';
import { ManualOverrideModal } from '../components/irrigation/ManualOverrideModal';
import {
  Droplets,
  Thermometer,
  CloudRain,
  Wind,
  GlassWater,
  AlertTriangle,
  Zap,
  ArrowRight
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { reading, prediction, irrigation, waterStats, alerts, history, trendData, startPumpManual } = useSimulation();
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">
            Smart Irrigation Dashboard
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-time IoT Telemetry, AI Drought Assessment & Automated Pump Control
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => onNavigate('prediction')}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl font-bold bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-2xs hover:bg-cyan-100 transition-all"
          >
            <Zap className="h-4 w-4 text-cyan-600" />
            <span>AI Risk: {prediction.probability}% ({prediction.riskLevel})</span>
          </button>

          <button
            onClick={() => onNavigate('irrigation')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl font-bold border shadow-2xs transition-all ${
              irrigation.pumpStatus === 'ON'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 animate-pulse'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <Droplets className="h-4 w-4" />
            <span>Pump: {irrigation.pumpStatus}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <KpiCard
          title="Soil Moisture"
          value={reading.soilMoisture}
          unit="%"
          statusText={reading.soilMoisture < 40 ? 'Deficient' : 'Optimal'}
          statusType={reading.soilMoisture < 35 ? 'danger' : reading.soilMoisture < 40 ? 'warning' : 'success'}
          icon={Droplets}
          onClick={() => onNavigate('monitoring')}
        />

        <KpiCard
          title="Temperature"
          value={reading.temperature}
          unit="°C"
          statusText={reading.temperature > 32 ? 'High Temp' : 'Normal'}
          statusType={reading.temperature > 32 ? 'warning' : 'neutral'}
          icon={Thermometer}
          onClick={() => onNavigate('monitoring')}
        />

        <KpiCard
          title="Humidity"
          value={reading.humidity}
          unit="%"
          statusText="Normal"
          statusType="neutral"
          icon={Wind}
          onClick={() => onNavigate('monitoring')}
        />

        <KpiCard
          title="Rainfall"
          value={reading.rainfall}
          unit="mm"
          statusText={reading.rainfall < 2 ? 'Low Rain' : 'Sufficient'}
          statusType={reading.rainfall < 2 ? 'warning' : 'info'}
          icon={CloudRain}
          onClick={() => onNavigate('monitoring')}
        />

        <KpiCard
          title="Water Level"
          value={reading.waterLevel}
          unit="%"
          statusText={reading.waterLevel < 30 ? 'Low Tank' : 'Sufficient'}
          statusType={reading.waterLevel < 30 ? 'danger' : 'info'}
          icon={GlassWater}
          onClick={() => onNavigate('water')}
        />

        <KpiCard
          title="Drought Risk"
          value={prediction.probability}
          unit="%"
          statusText={prediction.riskLevel}
          statusType={
            prediction.riskLevel === 'SEVERE'
              ? 'danger'
              : prediction.riskLevel === 'HIGH'
              ? 'warning'
              : prediction.riskLevel === 'MODERATE'
              ? 'warning'
              : 'success'
          }
          icon={AlertTriangle}
          onClick={() => onNavigate('prediction')}
        />

        <KpiCard
          title="Pump Status"
          value={irrigation.pumpStatus}
          statusText={irrigation.mode}
          statusType={irrigation.pumpStatus === 'ON' ? 'success' : 'neutral'}
          icon={Zap}
          onClick={() => onNavigate('irrigation')}
        />

        <KpiCard
          title="Water Used Today"
          value={waterStats.usedToday}
          unit="L"
          statusText="-18% Saved"
          statusType="info"
          icon={GlassWater}
          onClick={() => onNavigate('water')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white flex flex-col justify-between items-center space-y-4 shadow-xs">
          <div className="w-full flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-800">AI Drought Risk Gauge</h3>
              <p className="text-[11px] text-slate-500 font-medium">Random Forest Prediction Engine</p>
            </div>
            <button
              onClick={() => onNavigate('prediction')}
              className="text-xs font-bold text-cyan-700 hover:underline flex items-center space-x-1"
            >
              <span>Details</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <RiskGauge probability={prediction.probability} riskLevel={prediction.riskLevel} size={200} />

          <div className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-1 shadow-2xs">
            <span className="font-bold text-slate-900">24h Forecast:</span>{' '}
            <span className="text-amber-800 font-extrabold">{prediction.next24hPredictedRisk} RISK</span>
            <p className="text-[11px] text-slate-500 font-medium line-clamp-2">{prediction.recommendedAction}</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <TrendChart data={trendData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <FieldMap />
        <DecisionEngineVisualizer />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div>
          <WaterUsageChart />
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800">Recent Alerts</h3>
            <button
              onClick={() => onNavigate('alerts')}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-2.5">
            {alerts.slice(0, 3).map((a) => (
              <div
                key={a.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1 hover:border-slate-300 transition-colors shadow-2xs"
              >
                <div className="flex items-center justify-between font-bold">
                  <span className={a.severity === 'CRITICAL' ? 'text-rose-700' : 'text-amber-700'}>{a.title}</span>
                  <span className="text-[10px] text-slate-400 font-normal font-mono">{a.timestamp}</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">{a.message}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-200/80 bg-white space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800">Irrigation History</h3>
            <button
              onClick={() => onNavigate('water')}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-2.5">
            {history.slice(0, 3).map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs flex items-center justify-between shadow-2xs">
                <div>
                  <p className="font-bold text-slate-800">{item.trigger}</p>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {item.startTime} - {item.endTime} ({item.durationMinutes} mins)
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-black text-sky-700 font-mono block">{item.waterUsedLiters} L</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 uppercase font-bold">
                    {item.mode}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ManualOverrideModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
        onConfirm={startPumpManual}
      />
    </div>
  );
};
