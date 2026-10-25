export type UserRole = 'ADMIN' | 'FARMER' | 'VIEWER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Field {
  id: string;
  name: string;
  location: string;
  cropType: string;
  areaAcres: number;
}

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE';

export interface SensorReading {
  id: string;
  fieldId: string;
  soilMoisture: number; // percentage 0-100%
  temperature: number; // Celsius
  humidity: number; // percentage 0-100%
  rainfall: number; // mm
  waterLevel: number; // tank level percentage 0-100%
  timestamp: string;
  mode: 'LIVE' | 'SIMULATION';
}

export interface ParameterContribution {
  parameter: string;
  value: string;
  contribution: number; // percentage contribution e.g. +28%
  normalRange: string;
  status: 'NORMAL' | 'WARNING' | 'CRITICAL';
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  confusionMatrix: number[][]; // 2x2 matrix
}

export interface DroughtPrediction {
  probability: number; // 0-100%
  riskLevel: RiskLevel;
  modelName: 'Random Forest' | 'XGBoost' | 'LSTM';
  confidence: number; // 0-100%
  next24hPredictedRisk: RiskLevel;
  recommendedAction: string;
  contributions: ParameterContribution[];
  explanation: string[];
  metrics: ModelMetrics;
  predictionTime: string;
}

export interface IrrigationState {
  pumpStatus: 'ON' | 'OFF';
  mode: 'AUTO' | 'MANUAL';
  manualOverride: boolean;
  targetMoisture: number;
  thresholdMoisture: number;
  minWaterLevel: number;
  runtimeMinutes: number;
  waterUsedLiters: number;
  flowRateLpm: number;
  lastTrigger: string;
  decisionFactors: {
    soilMoistureLow: boolean;
    droughtRiskHigh: boolean;
    waterAvailable: boolean;
    rainfallLow: boolean;
  };
}

export interface IrrigationEvent {
  id: string;
  fieldId: string;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  waterUsedLiters: number;
  trigger: string;
  mode: 'AUTO' | 'MANUAL';
}

export interface IoTDevice {
  id: string;
  deviceName: string;
  deviceType: 'Soil Sensor' | 'Weather Node' | 'Water Level Sensor' | 'Relay Pump Controller';
  fieldId: string;
  location: string;
  status: 'ONLINE' | 'OFFLINE' | 'ANOMALY';
  battery: number; // percentage
  signalStrength: number; // percentage or dBm
  lastSeen: string;
  anomalyMessage?: string;
  value?: string;
}

export interface Alert {
  id: string;
  fieldId: string;
  type: 'DROUGHT' | 'LOW_WATER' | 'LOW_MOISTURE' | 'HIGH_TEMP' | 'PUMP_ERROR' | 'SENSOR_OFFLINE';
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  message: string;
  recommendation: string;
  timestamp: string;
  isRead: boolean;
}

export interface WaterStats {
  availableLiters: number;
  maxCapacityLiters: number;
  usedToday: number;
  usedThisWeek: number;
  usedThisMonth: number;
  avgDailyUsage: number;
  waterSavedPercent: number;
  estimatedHoursLeft: number;
}

export interface SystemSettings {
  soilMoistureThreshold: number;
  targetSoilMoisture: number;
  minWaterLevel: number;
  droughtWarningThreshold: number;
  droughtCriticalThreshold: number;
  autoIrrigationEnabled: boolean;
  emailAlertsEnabled: boolean;
  simulationIntervalSec: number;
}
