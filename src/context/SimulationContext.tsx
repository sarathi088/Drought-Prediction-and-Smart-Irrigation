import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  SensorReading,
  DroughtPrediction,
  IrrigationState,
  WaterStats,
  Alert,
  IrrigationEvent,
  IoTDevice,
  SystemSettings
} from '../types';
import { initialSensorReading, mockAlerts, mockIrrigationHistory, mockIoTDevices, mockWaterStats, defaultSettings, historicalTrendData } from '../services/mockData';
import { calculateDroughtProbability } from '../services/aiEngine';
import { apiService } from '../services/api';

interface SimulationContextType {
  reading: SensorReading;
  prediction: DroughtPrediction;
  irrigation: IrrigationState;
  waterStats: WaterStats;
  alerts: Alert[];
  history: IrrigationEvent[];
  devices: IoTDevice[];
  settings: SystemSettings;
  trendData: typeof historicalTrendData;
  isSimulationActive: boolean;
  telemetryMode: 'LIVE' | 'SIMULATION';
  selectedModel: 'Random Forest' | 'XGBoost' | 'LSTM';
  toggleSimulation: () => void;
  setTelemetryMode: (mode: 'LIVE' | 'SIMULATION') => void;
  setSelectedModel: (model: 'Random Forest' | 'XGBoost' | 'LSTM') => void;
  startPumpManual: () => void;
  stopPumpManual: () => void;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  markAlertAsRead: (id: string) => void;
  clearAllAlerts: () => void;
  resetToDefaults: () => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reading, setReading] = useState<SensorReading>(initialSensorReading);
  const [selectedModel, setSelectedModel] = useState<'Random Forest' | 'XGBoost' | 'LSTM'>('Random Forest');
  const [prediction, setPrediction] = useState<DroughtPrediction>(() => calculateDroughtProbability(initialSensorReading, 'Random Forest'));
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);
  const [telemetryMode, setTelemetryMode] = useState<'LIVE' | 'SIMULATION'>('SIMULATION');
  const [isSimulationActive, setIsSimulationActive] = useState<boolean>(true);
  const [waterStats, setWaterStats] = useState<WaterStats>(mockWaterStats);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [history, setHistory] = useState<IrrigationEvent[]>(mockIrrigationHistory);
  const [devices] = useState<IoTDevice[]>(mockIoTDevices);
  const [trendData, setTrendData] = useState(historicalTrendData);

  const [irrigation, setIrrigation] = useState<IrrigationState>({
    pumpStatus: 'OFF',
    mode: 'AUTO',
    manualOverride: false,
    targetMoisture: settings.targetSoilMoisture,
    thresholdMoisture: settings.soilMoistureThreshold,
    minWaterLevel: settings.minWaterLevel,
    runtimeMinutes: 0,
    waterUsedLiters: 0,
    flowRateLpm: 23,
    lastTrigger: 'AI Drought Prediction',
    decisionFactors: {
      soilMoistureLow: true,
      droughtRiskHigh: true,
      waterAvailable: true,
      rainfallLow: true
    }
  });

  useEffect(() => {
    const newPred = calculateDroughtProbability(reading, selectedModel);
    setPrediction(newPred);
  }, [reading, selectedModel]);

  useEffect(() => {
    if (!isSimulationActive || telemetryMode !== 'SIMULATION') return;

    const interval = setInterval(() => {
      setReading((prev) => {
        let newMoisture = prev.soilMoisture;
        let newTemp = prev.temperature;
        let newWaterLevel = prev.waterLevel;

        if (irrigation.pumpStatus === 'ON') {
          newMoisture = Math.min(settings.targetSoilMoisture + 2, prev.soilMoisture + 3);
          newWaterLevel = Math.max(10, prev.waterLevel - 0.5);

          setIrrigation((prevIrr) => {
            const addedLiters = prevIrr.flowRateLpm;
            const updatedRuntime = prevIrr.runtimeMinutes + 1;
            const updatedWaterUsed = prevIrr.waterUsedLiters + addedLiters;

            if (newMoisture >= settings.targetSoilMoisture) {
              const uniqueId = `irrig-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
              const newEvent: IrrigationEvent = {
                id: uniqueId,
                fieldId: prev.fieldId,
                date: new Date().toISOString().split('T')[0],
                startTime: new Date(Date.now() - updatedRuntime * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                endTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                durationMinutes: updatedRuntime,
                waterUsedLiters: updatedWaterUsed,
                trigger: prevIrr.manualOverride ? 'Manual Override' : 'Target Soil Moisture Reached',
                mode: prevIrr.mode
              };

              setHistory((h) => [newEvent, ...h]);

              const targetAlert: Alert = {
                id: `alt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
                fieldId: prev.fieldId,
                type: 'LOW_MOISTURE',
                severity: 'INFO',
                title: 'Irrigation Completed',
                message: `Target soil moisture (${settings.targetSoilMoisture}%) reached. Automated pump shutdown completed.`,
                recommendation: 'Field restored to optimal soil hydration level.',
                timestamp: 'Just now',
                isRead: false
              };
              setAlerts((a) => [targetAlert, ...a]);

              return {
                ...prevIrr,
                pumpStatus: 'OFF',
                manualOverride: false,
                runtimeMinutes: 0,
                waterUsedLiters: 0
              };
            }

            return {
              ...prevIrr,
              runtimeMinutes: updatedRuntime,
              waterUsedLiters: updatedWaterUsed
            };
          });

          setWaterStats((ws) => ({
            ...ws,
            usedToday: ws.usedToday + 23,
            availableLiters: Math.max(0, ws.availableLiters - 23)
          }));
        } else {
          const tempFluctuation = (Math.random() - 0.48) * 0.4;
          newTemp = Math.min(38, Math.max(22, prev.temperature + tempFluctuation));
          newMoisture = Math.max(20, prev.soilMoisture - 1);

          const currentPred = calculateDroughtProbability({ ...prev, soilMoisture: newMoisture, temperature: newTemp }, selectedModel);

          const isSoilLow = newMoisture < settings.soilMoistureThreshold;
          const isRiskHigh = currentPred.riskLevel === 'HIGH' || currentPred.riskLevel === 'SEVERE';
          const isWaterOk = prev.waterLevel > settings.minWaterLevel;

          setIrrigation((prevIrr) => ({
            ...prevIrr,
            decisionFactors: {
              soilMoistureLow: isSoilLow,
              droughtRiskHigh: isRiskHigh,
              waterAvailable: isWaterOk,
              rainfallLow: prev.rainfall < 3
            }
          }));

          if (isSoilLow && isRiskHigh && isWaterOk && settings.autoIrrigationEnabled && !irrigation.manualOverride) {
            setIrrigation((prevIrr) => ({
              ...prevIrr,
              pumpStatus: 'ON',
              mode: 'AUTO',
              lastTrigger: 'AI Drought Decision Engine'
            }));

            const autoAlert: Alert = {
              id: `alt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
              fieldId: prev.fieldId,
              type: 'DROUGHT',
              severity: 'CRITICAL',
              title: 'Auto Irrigation Triggered',
              message: `Soil Moisture (${newMoisture}%) fell below threshold (${settings.soilMoistureThreshold}%) with HIGH drought risk (${currentPred.probability}%). Pump automatically turned ON.`,
              recommendation: 'System is irrigating until target moisture (55%) is achieved.',
              timestamp: 'Just now',
              isRead: false
            };
            setAlerts((a) => [autoAlert, ...a]);
          }
        }

        const updatedReading: SensorReading = {
          ...prev,
          soilMoisture: newMoisture,
          temperature: parseFloat(newTemp.toFixed(1)),
          waterLevel: parseFloat(newWaterLevel.toFixed(1)),
          timestamp: new Date().toLocaleTimeString()
        };

        setTrendData((td) => {
          const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          const newPoint = {
            time: newTime,
            soilMoisture: updatedReading.soilMoisture,
            temp: updatedReading.temperature,
            humidity: updatedReading.humidity,
            rainfall: updatedReading.rainfall,
            droughtRisk: calculateDroughtProbability(updatedReading, selectedModel).probability,
            waterUsage: waterStats.usedToday
          };
          return [...td.slice(-11), newPoint];
        });

        return updatedReading;
      });
    }, settings.simulationIntervalSec * 1000);

    return () => clearInterval(interval);
  }, [isSimulationActive, telemetryMode, irrigation.pumpStatus, irrigation.manualOverride, settings, selectedModel, waterStats.usedToday]);

  // When LIVE IoT mode is active, periodically fetch real sensor telemetry from backend API / Vercel Serverless
  useEffect(() => {
    if (telemetryMode !== 'LIVE') return;

    let isSubscribed = true;
    const fetchLiveSensors = async () => {
      try {
        const response = await apiService.getLatestSensors();
        if (response?.success && response?.data && isSubscribed) {
          const liveData = response.data;
          setReading((prev) => ({
            ...prev,
            soilMoisture: liveData.soilMoisture,
            temperature: liveData.temperature,
            humidity: liveData.humidity,
            rainfall: liveData.rainfall,
            waterLevel: liveData.waterLevel,
            timestamp: new Date(liveData.timestamp).toLocaleTimeString()
          }));
        }
      } catch (err) {
        console.warn('Live IoT telemetry sync error, maintaining fallback cache:', err);
      }
    };

    fetchLiveSensors();
    const liveInterval = setInterval(fetchLiveSensors, 4000);

    return () => {
      isSubscribed = false;
      clearInterval(liveInterval);
    };
  }, [telemetryMode]);

  const startPumpManual = useCallback(async () => {
    setIrrigation((prev) => ({
      ...prev,
      pumpStatus: 'ON',
      mode: 'MANUAL',
      manualOverride: true,
      lastTrigger: 'Manual User Action'
    }));

    if (telemetryMode === 'LIVE') {
      try {
        await apiService.startPump('MANUAL');
      } catch (err) {
        console.error('Failed to notify backend API of manual pump start:', err);
      }
    }

    const alertMsg: Alert = {
      id: `alt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      fieldId: reading.fieldId,
      type: 'PUMP_ERROR',
      severity: 'WARNING',
      title: 'Manual Irrigation Activated',
      message: 'Irrigation pump started via manual user override.',
      recommendation: 'Monitor water tank level during manual operation.',
      timestamp: 'Just now',
      isRead: false
    };
    setAlerts((a) => [alertMsg, ...a]);
  }, [reading.fieldId, telemetryMode]);

  const stopPumpManual = useCallback(async () => {
    setIrrigation((prev) => ({
      ...prev,
      pumpStatus: 'OFF',
      manualOverride: false,
      runtimeMinutes: 0,
      waterUsedLiters: 0
    }));

    if (telemetryMode === 'LIVE') {
      try {
        await apiService.stopPump();
      } catch (err) {
        console.error('Failed to notify backend API of manual pump stop:', err);
      }
    }
  }, [telemetryMode]);

  const toggleSimulation = useCallback(() => {
    setIsSimulationActive((prev) => !prev);
  }, []);

  const updateSettings = useCallback((newSettings: Partial<SystemSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const markAlertAsRead = useCallback((id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, isRead: true } : a)));
  }, []);

  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  const resetToDefaults = useCallback(() => {
    setReading(initialSensorReading);
    setPrediction(calculateDroughtProbability(initialSensorReading, 'Random Forest'));
    setIrrigation({
      pumpStatus: 'OFF',
      mode: 'AUTO',
      manualOverride: false,
      targetMoisture: defaultSettings.targetSoilMoisture,
      thresholdMoisture: defaultSettings.soilMoistureThreshold,
      minWaterLevel: defaultSettings.minWaterLevel,
      runtimeMinutes: 0,
      waterUsedLiters: 0,
      flowRateLpm: 23,
      lastTrigger: 'AI Drought Prediction',
      decisionFactors: {
        soilMoistureLow: true,
        droughtRiskHigh: true,
        waterAvailable: true,
        rainfallLow: true
      }
    });
    setAlerts(mockAlerts);
  }, []);

  return (
    <SimulationContext.Provider
      value={{
        reading,
        prediction,
        irrigation,
        waterStats,
        alerts,
        history,
        devices,
        settings,
        trendData,
        isSimulationActive,
        telemetryMode,
        selectedModel,
        toggleSimulation,
        setTelemetryMode,
        setSelectedModel,
        startPumpManual,
        stopPumpManual,
        updateSettings,
        markAlertAsRead,
        clearAllAlerts,
        resetToDefaults
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
