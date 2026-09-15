import os
import joblib


BASE_MODEL_DIRECTORY = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "../../models/trained_models"
    )
)


def load_model(model_name):
    model_path = os.path.join(
        BASE_MODEL_DIRECTORY,
        model_name
    )

    if not os.path.exists(model_path):
        raise FileNotFoundError(
            f"Model not found at: {model_path}"
        )

    return joblib.load(model_path)


def load_risk_model():
    return load_model("risk_model.joblib")


def load_delay_model():
    return load_model("delay_model.joblib")