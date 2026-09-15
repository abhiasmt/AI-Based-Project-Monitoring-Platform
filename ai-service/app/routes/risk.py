from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pandas as pd

from app.services.features import calculate_features
from app.services.model_loader import load_risk_model


router = APIRouter()


class RiskPredictionRequest(BaseModel):
    project: dict
    metrics: dict


# Load model when the API starts
risk_model_package = load_risk_model()

risk_model = risk_model_package["model"]
FEATURES = risk_model_package["features"]


@router.post("/predict-risk")
def predict_risk(data: RiskPredictionRequest):

    try:

        # --------------------------------------
        # Calculate model features
        # --------------------------------------

        features = calculate_features(
            data.model_dump()
        )

        # --------------------------------------
        # Prepare input for ML model
        # --------------------------------------

        input_data = pd.DataFrame(
            [[features[feature] for feature in FEATURES]],
            columns=FEATURES
        )

        # --------------------------------------
        # Predict risk level
        # --------------------------------------

        prediction = risk_model.predict(
            input_data
        )[0]

        # --------------------------------------
        # Prediction probabilities
        # --------------------------------------

        probabilities = risk_model.predict_proba(
            input_data
        )[0]

        probability_map = {
            class_name: round(
                float(probability) * 100,
                2
            )
            for class_name, probability
            in zip(
                risk_model.classes_,
                probabilities
            )
        }

        # --------------------------------------
        # Get confidence
        # --------------------------------------

        confidence = round(
            float(max(probabilities)) * 100,
            2
        )

        return {
            "success": True,
            "prediction": {
                "riskLevel": prediction,
                "confidence": confidence,
                "probabilities": probability_map
            },
            "features": features
        }

    except Exception as error:

        print("Risk prediction error:", error)

        raise HTTPException(
            status_code=500,
            detail="Failed to generate risk prediction"
        )