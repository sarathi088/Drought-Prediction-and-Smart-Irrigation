/*
  AgriDrought AI — ESP32 Smart Irrigation & Wireless Telemetry Node
  Hardware Pins:
    - Soil Moisture Sensor: Analog Pin 34
    - DHT22 Temp & Humidity: Digital Pin 4
    - Ultrasonic Water Level Sensor: Trig Pin 12, Echo Pin 13
    - 5V Relay Pump Module: GPIO Pin 26
*/

#include <WiFi.h>
#include <HTTPClient.h>
#include "DHT.h"

// WiFi Credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Backend API URL:
// - For Vercel Production Deployment: "https://your-agridrought-project.vercel.app/api/sensors/readings"
// - For Local testing on local Wi-Fi: "http://<YOUR_LOCAL_COMPUTER_IP>:5005/api/sensors/readings"
const char* serverApiUrl = "https://your-agridrought-project.vercel.app/api/sensors/readings";

// Pin Definitions
#define SOIL_PIN 34
#define DHTPIN 4
#define DHTTYPE DHT22
#define TRIG_PIN 12
#define ECHO_PIN 13
#define RELAY_PIN 26

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW); // Relay OFF initially

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  dht.begin();

  // Connect WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected! IP Address: ");
  Serial.println(WiFi.localIP());
}

float readSoilMoisture() {
  int rawAnalog = analogRead(SOIL_PIN);
  // Map 0-4095 ESP32 ADC range to 0-100% moisture
  float moisturePercent = map(rawAnalog, 4095, 1500, 0, 100);
  return constrain(moisturePercent, 0, 100);
}

float readWaterLevelPercent() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH);
  float distanceCm = duration * 0.034 / 2;
  // Tank height 100cm baseline
  float levelPercent = (100 - distanceCm);
  return constrain(levelPercent, 0, 100);
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverApiUrl);
    http.addHeader("Content-Type", "application/json");

    float soilMoisture = readSoilMoisture();
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();
    float waterLevel = readWaterLevelPercent();

    String jsonPayload = "{\"fieldId\":\"field-001\",\"sensorId\":\"ESP32-001\",\"soilMoisture\":" +
                          String(soilMoisture) + ",\"temperature\":" + String(temperature) +
                          ",\"humidity\":" + String(humidity) + ",\"rainfall\":1.8,\"waterLevel\":" +
                          String(waterLevel) + "}";

    int httpResponseCode = http.POST(jsonPayload);
    Serial.print("Telemetry POST Response Code: ");
    Serial.println(httpResponseCode);

    http.end();
  } else {
    Serial.println("WiFi Disconnected!");
  }

  delay(5000); // 5 second telemetry interval
}
