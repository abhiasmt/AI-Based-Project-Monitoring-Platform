from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pandas as pd

from app.services.features import calculate_features
from app.services.model_loader import load_delay_model


router = APIRouter()


class DelayPredictionRequest(BaseModel):
    project: dict
    metrics: dict


# Load trained model
delay_model_package = load_delay_model()

delay_model = delay_model_package["model"]

FEATURES = delay_model_package["features"]


@router.post("/predict-delay")
def predict_delay(data: DelayPredictionRequest):

    try:

        # --------------------------------------
        # Calculate features
        # --------------------------------------

        features = calculate_features(
            data.model_dump()
        )

        # --------------------------------------
        # Prepare ML input
        # --------------------------------------

        input_data = pd.DataFrame(
            [[features[feature] for feature in FEATURES]],
            columns=FEATURES
        )

        # --------------------------------------
        # Predict delay level
        # --------------------------------------

        prediction = delay_model.predict(
            input_data
        )[0]

        # --------------------------------------
        # Prediction probabilities
        # --------------------------------------

        probabilities = delay_model.predict_proba(
            input_data
        )[0]

        probability_map = {
            class_name: round(
                float(probability) * 100,
                2
            )
            for class_name, probability
            in zip(
                delay_model.classes_,
                probabilities
            )
        }

        # --------------------------------------
        # Confidence
        # --------------------------------------

        confidence = round(
            float(max(probabilities)) * 100,
            2
        )

        return {
            "success": True,
            "prediction": {
                "delayRisk": prediction,
                "confidence": confidence,
                "probabilities": probability_map
            },
            "features": features
        }

    except Exception as error:

        print(
            "Delay prediction error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Failed to generate delay prediction"
        )