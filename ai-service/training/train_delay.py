import os
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    balanced_accuracy_score,
    classification_report,
    confusion_matrix
)


# ==========================================
# Paths
# ==========================================

DATA_PATH = "data/raw/delay_dataset.csv"

MODEL_DIRECTORY = "models/trained_models"

MODEL_PATH = os.path.join(
    MODEL_DIRECTORY,
    "delay_model.joblib"
)


# ==========================================
# Features
# ==========================================

FEATURES = [
    "total_tasks",
    "task_completion_rate",
    "overdue_task_rate",
    "blocked_task_rate",
    "milestone_completion_rate",
    "high_critical_risks",
    "open_issue_rate",
    "project_progress"
]

TARGET = "delay_level"


# ==========================================
# Load Dataset
# ==========================================

print("Loading delay dataset...")

df = pd.read_csv(DATA_PATH)

print("Dataset loaded successfully.")
print(f"Total records: {len(df)}")


# ==========================================
# Dataset Information
# ==========================================

print("\nDataset columns:")
print(df.columns.tolist())

print("\nDelay level distribution:")
print(df[TARGET].value_counts())


# ==========================================
# Prepare Data
# ==========================================

X = df[FEATURES]

y = df[TARGET]


# ==========================================
# Train/Test Split
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("\nTraining records:", len(X_train))
print("Testing records:", len(X_test))


# ==========================================
# Create Random Forest Model
# ==========================================

print("\nCreating Random Forest model...")

model = RandomForestClassifier(
    n_estimators=300,
    max_depth=12,
    min_samples_split=4,
    min_samples_leaf=2,
    class_weight="balanced",
    random_state=42,
    n_jobs=-1
)


# ==========================================
# Train Model
# ==========================================

print("Training delay model...")

model.fit(
    X_train,
    y_train
)

print("Training completed.")


# ==========================================
# Predictions
# ==========================================

y_pred = model.predict(X_test)


# ==========================================
# Evaluation
# ==========================================

accuracy = accuracy_score(
    y_test,
    y_pred
)

balanced_accuracy = balanced_accuracy_score(
    y_test,
    y_pred
)


print("\n================================")
print("DELAY MODEL EVALUATION")
print("================================")

print(
    f"\nAccuracy: {accuracy:.4f}"
)

print(
    f"Balanced Accuracy: {balanced_accuracy:.4f}"
)


# ==========================================
# Classification Report
# ==========================================

print("\nClassification Report:")

print(
    classification_report(
        y_test,
        y_pred,
        zero_division=0
    )
)


# ==========================================
# Confusion Matrix
# ==========================================

print("\nConfusion Matrix:")

labels = [
    "LOW",
    "MEDIUM",
    "HIGH"
]

cm = confusion_matrix(
    y_test,
    y_pred,
    labels=labels
)

cm_df = pd.DataFrame(
    cm,
    index=labels,
    columns=labels
)

print(cm_df)


# ==========================================
# Feature Importance
# ==========================================

print("\nFeature Importance:")

importance = pd.DataFrame({
    "feature": FEATURES,
    "importance": model.feature_importances_
})

importance = importance.sort_values(
    by="importance",
    ascending=False
)

print(
    importance.to_string(index=False)
)


# ==========================================
# Save Model
# ==========================================

os.makedirs(
    MODEL_DIRECTORY,
    exist_ok=True
)

model_package = {
    "model": model,
    "features": FEATURES,
    "target": TARGET,
    "version": "1.0"
}

joblib.dump(
    model_package,
    MODEL_PATH
)


print("\n================================")
print("MODEL SAVED")
print("================================")

print(
    f"Model saved to: {MODEL_PATH}"
)