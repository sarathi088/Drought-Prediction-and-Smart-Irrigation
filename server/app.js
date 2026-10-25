import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Cross-Origin Resource Sharing (CORS) configuration for Vercel deployment & Localhost
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

// In-Memory state layer for backend API demonstration & IoT telemetry
let currentSensorData = {
  fieldId: 'field-001',
  soilMoisture: 34,
  temperature: 33.2,
  humidity: 61,
  rainfall: 1.8,
  waterLevel: 68,
  timestamp: new Date().toISOString()
};

let pumpStatus = 'OFF';
let controlMode = 'AUTO';

// Express router containing all platform API routes
const apiRouter = express.Router();

// 0. API Gateway Index & Health Checks
apiRouter.get('/', (req, res) => {
  res.json({
    success: true,
    name: 'AgriDrought AI — IoT & AI Prediction Backend API',
    status: 'ONLINE',
    environment: process.env.VERCEL ? 'vercel-serverless' : (process.env.NODE_ENV || 'development'),
    timestamp: new Date().toISOString(),
    endpoints: [
      { path: '/api/health', method: 'GET', description: 'System health diagnostic check' },
      { path: '/api/auth/login', method: 'POST', description: 'Role-based authentication' },
      { path: '/api/sensors/latest', method: 'GET', description: 'Get latest IoT telemetry readings' },
      { path: '/api/sensors/readings', method: 'POST', description: 'Ingest ESP32 IoT sensor telemetry' },
      { path: '/api/drought/predict', method: 'GET', description: 'ML drought risk prediction inference' },
      { path: '/api/irrigation/status', method: 'GET', description: 'Pump status and active control mode' },
      { path: '/api/irrigation/start', method: 'POST', description: 'Trigger smart / manual irrigation start' },
      { path: '/api/irrigation/stop', method: 'POST', description: 'Trigger irrigation shutdown' },
      { path: '/api/water/usage', method: 'GET', description: 'Water reservoir conservation metrics' },
      { path: '/api/devices', method: 'GET', description: 'IoT sensor node diagnostics and network health' }
    ]
  });
});

apiRouter.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'ONLINE',
    service: 'AgriDrought AI Platform API',
    platform: process.env.VERCEL ? 'Vercel Serverless Function' : 'Node.js Express Server',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 1. Auth Endpoint
apiRouter.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'demo@smartirrigation.com' && password === 'demo123') {
    return res.json({
      success: true,
      token: 'demo-jwt-token-xyz987',
      user: {
        id: 'usr-001',
        name: 'SARATHI S',
        email: 'demo@smartirrigation.com',
        role: 'ADMIN'
      }
    });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// 2. Sensors Endpoints
apiRouter.get('/sensors/latest', (req, res) => {
  res.json({ success: true, data: currentSensorData });
});

apiRouter.post('/sensors/readings', (req, res) => {
  currentSensorData = {
    ...currentSensorData,
    ...req.body,
    timestamp: new Date().toISOString()
  };
  res.json({ success: true, data: currentSensorData });
});

// 3. AI Drought Prediction Endpoint
apiRouter.get('/drought/predict', (req, res) => {
  const { soilMoisture, temperature, rainfall } = currentSensorData;
  let probability = 50;
  if (soilMoisture < 40) probability += 25;
  if (temperature > 30) probability += 15;
  if (rainfall < 2) probability += 10;

  const riskLevel = probability >= 76 ? 'SEVERE' : probability >= 51 ? 'HIGH' : probability >= 26 ? 'MODERATE' : 'LOW';

  res.json({
    success: true,
    data: {
      probability,
      riskLevel,
      modelName: 'Random Forest',
      confidence: 92.4,
      predictionTime: new Date().toISOString(),
      explanation: [
        `Soil moisture (${soilMoisture}%) is below optimal threshold.`,
        `Temperature (${temperature}°C) is above normal baseline.`
      ]
    }
  });
});

// 4. Smart Irrigation Endpoints
apiRouter.get('/irrigation/status', (req, res) => {
  res.json({ success: true, pumpStatus, mode: controlMode });
});

apiRouter.post('/irrigation/start', (req, res) => {
  pumpStatus = 'ON';
  controlMode = req.body?.mode || 'MANUAL';
  res.json({ success: true, message: 'Pump started', pumpStatus, mode: controlMode });
});

apiRouter.post('/irrigation/stop', (req, res) => {
  pumpStatus = 'OFF';
  res.json({ success: true, message: 'Pump stopped', pumpStatus, mode: controlMode });
});

// 5. Water Management & IoT Devices
apiRouter.get('/water/usage', (req, res) => {
  res.json({
    success: true,
    data: {
      usedTodayLiters: 1240,
      availableLiters: 7200,
      savedPercent: 18.5
    }
  });
});

apiRouter.get('/devices', (req, res) => {
  res.json({
    success: true,
    devices: [
      { id: 'ESP32-001', name: 'Soil Node A1', status: 'ONLINE', battery: 87 },
      { id: 'ESP32-002', name: 'Weather Node B', status: 'ONLINE', battery: 94 },
      { id: 'ESP32-003', name: 'Reservoir Tank Sensor', status: 'ANOMALY', battery: 45 }
    ]
  });
});

// Mount the API router to both '/api' and '/' to guarantee compatibility with:
// 1. Vercel Serverless Function rewrites (/api -> /api or /api -> /)
// 2. Vite dev server proxy (/api -> /api)
// 3. Direct local Node.js Express server access
app.use('/api', apiRouter);
app.use('/', apiRouter);

export default app;
