import type { Field, SensorReading, IoTDevice, Alert, IrrigationEvent, WaterStats, SystemSettings } from '../types';

export const mockField: Field = {
  id: 'field-001',
  name: 'Green Valley Field A',
  location: 'Sector 4 - East Agricultural Zone',
  cropType: 'Rice (Oryza sativa)',
  areaAcres: 2.5
};

export const initialSensorReading: SensorReading = {
  id: 'reading-1001',
  fieldId: 'field-001',
  soilMoisture: 34,
  temperature: 33.2,
  humidity: 61,
  rainfall: 1.8,
  waterLevel: 68,
  timestamp: new Date().toLocaleTimeString(),
  mode: 'SIMULATION'
};

export const mockIoTDevices: IoTDevice[] = [
  {
    id: 'ESP32-001',
    deviceName: 'Soil Sensor Node A1',
    deviceType: 'Soil Sensor',
    fieldId: 'field-001',
    location: 'Zone 1 - North Field',
    status: 'ONLINE',
    battery: 87,
    signalStrength: 92,
    lastSeen: '12:42 PM',
    value: '34% Moisture'
  },
  {
    id: 'ESP32-002',
    deviceName: 'Weather Station Node B',
    deviceType: 'Weather Node',
    fieldId: 'field-001',
    location: 'Central Field Tower',
    status: 'ONLINE',
    battery: 94,
    signalStrength: 88,
    lastSeen: '12:42 PM',
    value: '33.2°C / 61% RH'
  },
  {
    id: 'ESP32-003',
    deviceName: 'Reservoir Tank Sensor',
    deviceType: 'Water Level Sensor',
    fieldId: 'field-001',
    location: 'Main Water Reservoir',
    status: 'ANOMALY',
    battery: 45,
    signalStrength: 65,
    lastSeen: '12:35 PM',
    anomalyMessage: 'Constant value detected for 3+ hours (68% level). Sensor inspection recommended.',
    value: '68% Tank Level'
  },
  {
    id: 'ESP32-004',
    deviceName: 'Relay Pump Controller',
    deviceType: 'Relay Pump Controller',
    fieldId: 'field-001',
    location: 'Pump House 1',
    status: 'ONLINE',
    battery: 100,
    signalStrength: 95,
    lastSeen: '12:42 PM',
    value: 'PUMP OFF (Standby)'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'alt-001',
    fieldId: 'field-001',
    type: 'DROUGHT',
    severity: 'CRITICAL',
    title: 'High Drought Risk Detected',
    message: 'AI Model predicted high drought risk (74% probability) due to low soil moisture (34%) and elevated temperatures (33.2°C).',
    recommendation: 'Initiate smart irrigation cycle to restore optimal target soil moisture (55%).',
    timestamp: '10 mins ago',
    isRead: false
  },
  {
    id: 'alt-002',
    fieldId: 'field-001',
    type: 'LOW_MOISTURE',
    severity: 'WARNING',
    title: 'Soil Moisture Below Threshold',
    message: 'Soil moisture dropped to 34%, which is 6% below the 40% threshold for Rice crop stage.',
    recommendation: 'Auto-irrigation system evaluated conditions and scheduled pump activation.',
    timestamp: '25 mins ago',
    isRead: false
  },
  {
    id: 'alt-003',
    fieldId: 'field-001',
    type: 'SENSOR_OFFLINE',
    severity: 'WARNING',
    title: 'Sensor Health Inspection Alert',
    message: 'ESP32-003 (Reservoir Level Sensor) reported frozen telemetry values.',
    recommendation: 'Check battery status and recalibrate ultrasonic distance sensor probe.',
    timestamp: '1 hour ago',
    isRead: true
  }
];

export const mockIrrigationHistory: IrrigationEvent[] = [
  {
    id: 'irrig-101',
    fieldId: 'field-001',
    date: '2026-08-20',
    startTime: '08:20 AM',
    endTime: '08:45 AM',
    durationMinutes: 25,
    waterUsedLiters: 575,
    trigger: 'AI Drought Prediction (78% Risk)',
    mode: 'AUTO'
  },
  {
    id: 'irrig-102',
    fieldId: 'field-001',
    date: '2026-08-19',
    startTime: '05:15 PM',
    endTime: '05:35 PM',
    durationMinutes: 20,
    waterUsedLiters: 460,
    trigger: 'Soil Moisture Threshold (<40%)',
    mode: 'AUTO'
  },
  {
    id: 'irrig-103',
    fieldId: 'field-001',
    date: '2026-08-18',
    startTime: '09:00 AM',
    endTime: '09:15 AM',
    durationMinutes: 15,
    waterUsedLiters: 345,
    trigger: 'Manual Override Test',
    mode: 'MANUAL'
  },
  {
    id: 'irrig-104',
    fieldId: 'field-001',
    date: '2026-08-17',
    startTime: '06:30 AM',
    endTime: '07:00 AM',
    durationMinutes: 30,
    waterUsedLiters: 690,
    trigger: 'Scheduled Irrigation',
    mode: 'AUTO'
  }
];

export const mockWaterStats: WaterStats = {
  availableLiters: 7200,
  maxCapacityLiters: 10000,
  usedToday: 1240,
  usedThisWeek: 6850,
  usedThisMonth: 28400,
  avgDailyUsage: 1150,
  waterSavedPercent: 18.5,
  estimatedHoursLeft: 64
};

export const defaultSettings: SystemSettings = {
  soilMoistureThreshold: 40,
  targetSoilMoisture: 55,
  minWaterLevel: 20,
  droughtWarningThreshold: 50,
  droughtCriticalThreshold: 75,
  autoIrrigationEnabled: true,
  emailAlertsEnabled: true,
  simulationIntervalSec: 3
};

export const historicalTrendData = [
  { time: '00:00', soilMoisture: 55, temp: 24, humidity: 82, rainfall: 0, droughtRisk: 18, waterUsage: 0 },
  { time: '03:00', soilMoisture: 53, temp: 23, humidity: 85, rainfall: 0, droughtRisk: 22, waterUsage: 0 },
  { time: '06:00', soilMoisture: 50, temp: 26, humidity: 78, rainfall: 0.5, droughtRisk: 28, waterUsage: 120 },
  { time: '09:00', soilMoisture: 44, temp: 30, humidity: 68, rainfall: 1.2, droughtRisk: 48, waterUsage: 450 },
  { time: '12:00', soilMoisture: 36, temp: 34, humidity: 58, rainfall: 1.8, droughtRisk: 72, waterUsage: 890 },
  { time: '15:00', soilMoisture: 34, temp: 33.2, humidity: 61, rainfall: 1.8, droughtRisk: 74, waterUsage: 1240 },
  { time: '18:00', soilMoisture: 48, temp: 29, humidity: 72, rainfall: 2.0, droughtRisk: 35, waterUsage: 1240 },
  { time: '21:00', soilMoisture: 54, temp: 26, humidity: 80, rainfall: 2.0, droughtRisk: 20, waterUsage: 1240 }
];
