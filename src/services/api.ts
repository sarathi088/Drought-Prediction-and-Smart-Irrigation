/**
 * AgriDrought AI — Frontend API Client
 * Dynamically connects to Vercel Serverless Functions in production (/api)
 * or local dev environment (Vite proxy / localhost:5005).
 */

const getApiBaseUrl = (): string => {
  // 1. If explicitly defined in environment (e.g. VITE_API_URL=https://my-agridrought.vercel.app)
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl.trim() !== '') {
    return envUrl.replace(/\/$/, '');
  }
  // 2. Otherwise default to relative path '/api' which works natively with:
  //    - Vercel Serverless deployment (same origin, zero CORS configuration needed)
  //    - Vite proxy in local development (proxies /api -> http://localhost:5005)
  return '';
};

const buildUrl = (endpoint: string): string => {
  const base = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return base ? `${base}${cleanEndpoint}` : cleanEndpoint;
};

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorText = await res.text();
    let errorJson;
    try {
      errorJson = JSON.parse(errorText);
    } catch {
      // ignore
    }
    throw new Error(errorJson?.message || `HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export const apiService = {
  // System Health
  async getHealth() {
    const res = await fetch(buildUrl('/api/health'));
    return handleResponse<{ success: boolean; status: string; platform: string; timestamp: string }>(res);
  },

  // Authentication
  async login(email: string, password: string) {
    const res = await fetch(buildUrl('/api/auth/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse<{
      success: boolean;
      token: string;
      user: { id: string; name: string; email: string; role: string };
    }>(res);
  },

  // Live IoT Telemetry
  async getLatestSensors() {
    const res = await fetch(buildUrl('/api/sensors/latest'));
    return handleResponse<{
      success: boolean;
      data: {
        fieldId: string;
        soilMoisture: number;
        temperature: number;
        humidity: number;
        rainfall: number;
        waterLevel: number;
        timestamp: string;
      };
    }>(res);
  },

  async postSensorReading(reading: Record<string, unknown>) {
    const res = await fetch(buildUrl('/api/sensors/readings'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reading)
    });
    return handleResponse<{ success: boolean; data: Record<string, unknown> }>(res);
  },

  // AI Drought Prediction Inference
  async getDroughtPrediction() {
    const res = await fetch(buildUrl('/api/drought/predict'));
    return handleResponse<{
      success: boolean;
      data: {
        probability: number;
        riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE';
        modelName: string;
        confidence: number;
        predictionTime: string;
        explanation: string[];
      };
    }>(res);
  },

  // Smart Irrigation Control
  async getIrrigationStatus() {
    const res = await fetch(buildUrl('/api/irrigation/status'));
    return handleResponse<{
      success: boolean;
      pumpStatus: 'ON' | 'OFF';
      mode: 'AUTO' | 'MANUAL';
    }>(res);
  },

  async startPump(mode: 'AUTO' | 'MANUAL' = 'MANUAL') {
    const res = await fetch(buildUrl('/api/irrigation/start'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode })
    });
    return handleResponse<{
      success: boolean;
      message: string;
      pumpStatus: 'ON' | 'OFF';
      mode: 'AUTO' | 'MANUAL';
    }>(res);
  },

  async stopPump() {
    const res = await fetch(buildUrl('/api/irrigation/stop'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    return handleResponse<{
      success: boolean;
      message: string;
      pumpStatus: 'ON' | 'OFF';
      mode: 'AUTO' | 'MANUAL';
    }>(res);
  },

  // Water Management
  async getWaterUsage() {
    const res = await fetch(buildUrl('/api/water/usage'));
    return handleResponse<{
      success: boolean;
      data: {
        usedTodayLiters: number;
        availableLiters: number;
        savedPercent: number;
      };
    }>(res);
  },

  // IoT Device Diagnostics
  async getDevices() {
    const res = await fetch(buildUrl('/api/devices'));
    return handleResponse<{
      success: boolean;
      devices: Array<{
        id: string;
        name: string;
        status: string;
        battery: number;
      }>;
    }>(res);
  }
};
