-- AgriDrought AI Database Schema (PostgreSQL / Supabase / SQLite compatible)
-- AI-Driven IoT Drought Prediction and Smart Irrigation System

-- Table 1: Users
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'FARMER', 'VIEWER')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table 2: Fields
CREATE TABLE IF NOT EXISTS fields (
    id VARCHAR(50) PRIMARY KEY,
    field_name VARCHAR(100) NOT NULL,
    location VARCHAR(150) NOT NULL,
    crop_type VARCHAR(100) NOT NULL,
    area_acres NUMERIC(5, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table 3: Sensor Readings
CREATE TABLE IF NOT EXISTS sensor_readings (
    id VARCHAR(50) PRIMARY KEY,
    field_id VARCHAR(50) REFERENCES fields(id),
    sensor_id VARCHAR(50) NOT NULL,
    soil_moisture NUMERIC(5, 2) NOT NULL,
    temperature NUMERIC(5, 2) NOT NULL,
    humidity NUMERIC(5, 2) NOT NULL,
    rainfall NUMERIC(5, 2) NOT NULL,
    water_level NUMERIC(5, 2) NOT NULL,
    reading_mode VARCHAR(20) DEFAULT 'SIMULATION',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table 4: Drought Predictions
CREATE TABLE IF NOT EXISTS drought_predictions (
    id VARCHAR(50) PRIMARY KEY,
    field_id VARCHAR(50) REFERENCES fields(id),
    probability INT NOT NULL CHECK (probability BETWEEN 0 AND 100),
    risk_level VARCHAR(20) NOT NULL CHECK (risk_level IN ('LOW', 'MODERATE', 'HIGH', 'SEVERE')),
    model_name VARCHAR(50) NOT NULL,
    confidence NUMERIC(5, 2) NOT NULL,
    prediction_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table 5: Irrigation Events
CREATE TABLE IF NOT EXISTS irrigation_events (
    id VARCHAR(50) PRIMARY KEY,
    field_id VARCHAR(50) REFERENCES fields(id),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    duration_minutes INT NOT NULL,
    water_used_liters NUMERIC(8, 2) NOT NULL,
    trigger_type VARCHAR(100) NOT NULL,
    control_mode VARCHAR(20) NOT NULL CHECK (control_mode IN ('AUTO', 'MANUAL'))
);

-- Table 6: IoT Devices
CREATE TABLE IF NOT EXISTS iot_devices (
    id VARCHAR(50) PRIMARY KEY,
    device_name VARCHAR(100) NOT NULL,
    device_type VARCHAR(50) NOT NULL,
    field_id VARCHAR(50) REFERENCES fields(id),
    status VARCHAR(20) NOT NULL CHECK (status IN ('ONLINE', 'OFFLINE', 'ANOMALY')),
    battery INT CHECK (battery BETWEEN 0 AND 100),
    signal_strength INT CHECK (signal_strength BETWEEN 0 AND 100),
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table 7: System Alerts
CREATE TABLE IF NOT EXISTS alerts (
    id VARCHAR(50) PRIMARY KEY,
    field_id VARCHAR(50) REFERENCES fields(id),
    alert_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('CRITICAL', 'WARNING', 'INFO')),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'UNREAD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table 8: Daily Water Usage
CREATE TABLE IF NOT EXISTS water_usage (
    id VARCHAR(50) PRIMARY KEY,
    field_id VARCHAR(50) REFERENCES fields(id),
    water_used_liters NUMERIC(8, 2) NOT NULL,
    usage_date DATE DEFAULT CURRENT_DATE
);

-- Initial Seed Data
INSERT INTO users (id, name, email, password_hash, role)
VALUES ('usr-001', 'SARATHI S', 'demo@smartirrigation.com', '$2b$10$e84614...hash', 'ADMIN')
ON CONFLICT (id) DO NOTHING;

INSERT INTO fields (id, field_name, location, crop_type, area_acres)
VALUES ('field-001', 'Green Valley Field A', 'Sector 4 - East Zone', 'Rice (Oryza sativa)', 2.5)
ON CONFLICT (id) DO NOTHING;
