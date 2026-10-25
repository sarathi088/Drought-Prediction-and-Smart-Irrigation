"""
AgriDrought AI — Machine Learning Training Pipeline
Models: Random Forest, XGBoost, LSTM
Target: Predict Drought Risk Probability & Classification
"""

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

def generate_synthetic_agricultural_dataset(num_samples=1500):
    np.random.seed(42)
    soil_moisture = np.random.uniform(15, 75, num_samples)
    temperature = np.random.uniform(20, 42, num_samples)
    humidity = np.random.uniform(30, 90, num_samples)
    rainfall = np.random.uniform(0, 15, num_samples)
    water_level = np.random.uniform(10, 100, num_samples)

    # Conceptual drought risk formula
    score = (
        (40 - soilMoisture if 'soilMoisture' in locals() else (40 - soil_moisture)) * 0.8 +
        (temperature - 25) * 1.2 +
        (5 - rainfall) * 2.0 -
        (humidity - 50) * 0.3
    )

    # Classify: 0=LOW, 1=MODERATE, 2=HIGH, 3=SEVERE
    risk_labels = []
    for s in score:
        if s > 35:
            risk_labels.append(3) # SEVERE
        elif s > 20:
            risk_labels.append(2) # HIGH
        elif s > 5:
            risk_labels.append(1) # MODERATE
        else:
            risk_labels.append(0) # LOW

    df = pd.DataFrame({
        'soil_moisture': soil_moisture,
        'temperature': temperature,
        'humidity': humidity,
        'rainfall': rainfall,
        'water_level': water_level,
        'risk_label': risk_labels
    })

    return df

def train_and_evaluate():
    print("=" * 60)
    print("AgriDrought AI ML Model Training Pipeline")
    print("=" * 60)

    df = generate_synthetic_agricultural_dataset(1500)
    X = df[['soil_moisture', 'temperature', 'humidity', 'rainfall', 'water_level']]
    y = df['risk_label']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Model 1: Random Forest
    rf_model = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
    rf_model.fit(X_train, y_train)

    y_pred = rf_model.predict(X_test)

    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred, average='weighted')
    rec = recall_score(y_test, y_pred, average='weighted')
    f1 = f1_score(y_test, y_pred, average='weighted')

    print(f"Random Forest Accuracy : {acc * 100:.2f}%")
    print(f"Precision Score        : {prec * 100:.2f}%")
    print(f"Recall Rate            : {rec * 100:.2f}%")
    print(f"F1-Score               : {f1 * 100:.2f}%")
    print("\nConfusion Matrix:")
    print(confusion_matrix(y_test, y_pred))

if __name__ == '__main__':
    train_and_evaluate()
