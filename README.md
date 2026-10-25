# AgriDrought AI — AI-Driven IoT-Based Drought Prediction & Smart Irrigation System

> **Tagline:** *Predict Drought. Optimize Water. Protect Crops.*  
> **Academic Project:** Final-Year Engineering Project & Research Demonstration

---

## 🌾 Project Overview

**AgriDrought AI** is a modern AgriTech web platform that combines real-time IoT agricultural monitoring, machine learning drought risk prediction, multi-variable decision engine automation, and water resource conservation analytics.

### Main Control Loop
```
IoT Sensors (Soil, Temp, Humidity, Rain, Water Tank)
       ↓
Data Processing & Feature Normalization
       ↓
AI Drought Prediction (Random Forest / XGBoost / LSTM)
       ↓
Drought Risk Assessment (LOW, MODERATE, HIGH, SEVERE)
       ↓
Smart Irrigation Decision Engine (IF-THEN Rule Evaluation)
       ↓
Automatic ESP32 Relay Pump Control (ON / OFF)
       ↓
Water Conservation Analytics & Audit History
```

---

## 🚀 Key Features

1. **Live IoT vs Simulation Mode**: Dynamic real-time telemetry stream engine with toggle controls.
2. **AI Drought Prediction Gauge**: 0-100% circular SVG risk gauge with risk classification tiers (LOW, MODERATE, HIGH, SEVERE).
3. **Transparent AI Explainability**: Clear rationale ("Why Drought Risk is High?") highlighting feature contributions.
4. **Interactive Field Map**: Graphic canvas showing crop zones, water tank level, pump station, and interactive IoT node markers (SM-001, TP-001, WT-003).
5. **Smart Decision Engine**: Multi-variable rule matrix evaluating Soil Moisture, Drought Risk %, Water Tank Level, and Rainfall before triggering irrigation.
6. **Manual Pump Override Modal**: Confirmation modal for manual control with visual active mode badges.
7. **Water Conservation Management**: Reservoir levels, daily/weekly/monthly consumption charts, and historical irrigation event table.
8. **IoT Device Diagnostics**: Sensor failure detection engine flagging frozen or abnormal readings.
9. **Academic Research Pipeline**: 8-step visual workflow and Traditional vs Proposed System comparison matrix.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS v4, Lucide Icons, Recharts
- **Backend API**: Node.js, Express.js REST APIs
- **Database Schema**: PostgreSQL / Supabase SQL schema (`database/schema.sql`)
- **Machine Learning**: Python (`ai/train_model.py`) — Random Forest, XGBoost, LSTM models
- **Hardware Firmware**: ESP32 C++ Sketch (`iot/esp32_irrigation_node.ino`)

---

## 🔑 Demo Credentials

- **Email**: `demo@smartirrigation.com`
- **Password**: `demo123`
- **Roles**: `ADMIN`, `FARMER`, `VIEWER`

---

## ☁️ Deploy to Vercel (Production Setup)

This project is fully configured for deployment on **[Vercel](https://vercel.com/)** as a unified full-stack application:
- **Frontend SPA**: React 18 + Vite compiled into static distribution (`dist/`) with client-side SPA routing rewrites.
- **Backend API**: Express REST endpoints running as Vercel Serverless Functions via [`api/index.js`](file:///Users/sa_xthx/Documents/DMT/api/index.js).
- **Configuration**: Root [`vercel.json`](file:///Users/sa_xthx/Documents/DMT/vercel.json) handles route rewrites and CORS headers.

### Option A: One-Click / Git Deployment via Vercel Dashboard
1. Push your repository to **GitHub / GitLab / Bitbucket**.
2. Go to the **[Vercel Dashboard](https://vercel.com/new)** and import the repository.
3. Vercel automatically detects the project settings from [`vercel.json`](file:///Users/sa_xthx/Documents/DMT/vercel.json):
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. *(Optional)* Under **Environment Variables**, configure:
   - `NODE_ENV`: `production`
   - `VITE_API_URL`: Leave blank (defaults to `/api` same-origin serverless routing) or specify your custom domain.
5. Click **Deploy**. Your application will be live at `https://<your-project>.vercel.app`!

### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI globally if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy directly to production
vercel --prod
```

### 📡 Connecting Physical ESP32 Hardware to Vercel
In [`iot/esp32_irrigation_node.ino`](file:///Users/sa_xthx/Documents/DMT/iot/esp32_irrigation_node.ino), update `serverApiUrl` with your production Vercel domain:
```cpp
const char* serverApiUrl = "https://<your-project>.vercel.app/api/sensors/readings";
```

---

## 💻 Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Full Stack Dev Environment (Frontend + API)
```bash
npm run dev
```
- Frontend UI opens on **http://localhost:3000**
- Local Express API server starts on **http://localhost:5005**
- Vite dev server automatically proxies `/api/*` requests to the local Express backend.

### 3. Production Build & Test Locally
```bash
npm run build
npm run preview
```

---

## 📜 Project Structure

```
DMT/
├── api/
│   └── index.js              # Vercel Serverless Function entry point
├── vercel.json               # Vercel configuration (SPA rewrites, API function routing, CORS)
├── src/
│   ├── components/
│   │   ├── charts/           # Recharts trend & water charts
│   │   ├── common/           # KpiCard, RiskGauge, SimulationBanner
│   │   ├── field/            # Interactive FieldMap & SensorDetailModal
│   │   ├── irrigation/       # DecisionEngineVisualizer & ManualOverrideModal
│   │   ├── layout/           # Header, Sidebar
│   │   └── prediction/       # ModelPerformance & AiExplanation
│   ├── context/
│   │   ├── AuthContext.tsx   # Role & authentication state (API connected)
│   │   └── SimulationContext.tsx # Real-time IoT simulation & live API engine
│   ├── pages/                # All 11 platform pages
│   ├── services/
│   │   ├── api.ts            # Client API service for Vercel & localhost
│   │   ├── aiEngine.ts       # AI prediction mathematical inference
│   │   └── mockData.ts       # Default baseline datasets
│   └── types/                # TypeScript domain models
├── server/
│   ├── app.js                # Modular Express application & API router
│   └── index.js              # Local Node.js HTTP server listener (port 5005)
├── database/
│   └── schema.sql            # PostgreSQL / Supabase relational schema
├── ai/
│   └── train_model.py        # Python ML training script (Random Forest, XGBoost, LSTM)
├── iot/
│   └── esp32_irrigation_node.ino # ESP32 C++ wireless telemetry firmware
├── .env.example              # Environment variables template
└── README.md
```
