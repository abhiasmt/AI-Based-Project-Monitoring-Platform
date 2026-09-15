from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.features import calculate_features


router = APIRouter()


class ResourceRecommendationRequest(BaseModel):
    project: dict
    metrics: dict


@router.post("/recommend-resource")
def recommend_resource(data: ResourceRecommendationRequest):

    try:

        # --------------------------------------
        # Calculate project features
        # --------------------------------------

        features = calculate_features(
            data.model_dump()
        )

        recommendations = []

        # --------------------------------------
        # Task-related problems
        # --------------------------------------

        if features["blocked_task_rate"] >= 20:

            recommendations.append({
                "resource": "Additional Team Member",
                "priority": "HIGH",
                "reason": (
                    "A high percentage of tasks are blocked."
                )
            })

        elif features["blocked_task_rate"] >= 10:

            recommendations.append({
                "resource": "Additional Team Member",
                "priority": "MEDIUM",
                "reason": (
                    "Several project tasks are blocked."
                )
            })

        # --------------------------------------
        # Overdue tasks
        # --------------------------------------

        if features["overdue_task_rate"] >= 30:

            recommendations.append({
                "resource": "Additional Workforce",
                "priority": "HIGH",
                "reason": (
                    "A large percentage of tasks are overdue."
                )
            })

        elif features["overdue_task_rate"] >= 15:

            recommendations.append({
                "resource": "Additional Workforce",
                "priority": "MEDIUM",
                "reason": (
                    "The project has a significant number "
                    "of overdue tasks."
                )
            })

        # --------------------------------------
        # Risk management
        # --------------------------------------

        if features["high_critical_risks"] >= 3:

            recommendations.append({
                "resource": "Risk Management Specialist",
                "priority": "HIGH",
                "reason": (
                    "Multiple high or critical risks "
                    "have been identified."
                )
            })

        elif features["high_critical_risks"] >= 1:

            recommendations.append({
                "resource": "Risk Management Support",
                "priority": "MEDIUM",
                "reason": (
                    "High or critical project risks "
                    "are present."
                )
            })

        # --------------------------------------
        # Technical support
        # --------------------------------------

        if features["open_issue_rate"] >= 70:

            recommendations.append({
                "resource": "Technical Support Team",
                "priority": "HIGH",
                "reason": (
                    "A large percentage of project issues "
                    "are still open."
                )
            })

        elif features["open_issue_rate"] >= 40:

            recommendations.append({
                "resource": "Technical Support",
                "priority": "MEDIUM",
                "reason": (
                    "The project has several unresolved issues."
                )
            })

        # --------------------------------------
        # Low project progress
        # --------------------------------------

        if features["project_progress"] < 30:

            recommendations.append({
                "resource": "Project Management Support",
                "priority": "HIGH",
                "reason": (
                    "Overall project progress is very low."
                )
            })

        elif features["project_progress"] < 50:

            recommendations.append({
                "resource": "Project Management Support",
                "priority": "MEDIUM",
                "reason": (
                    "Project progress is below the expected level."
                )
            })

        # --------------------------------------
        # Low task completion
        # --------------------------------------

        if features["task_completion_rate"] < 30:

            recommendations.append({
                "resource": "Additional Development Workforce",
                "priority": "HIGH",
                "reason": (
                    "Task completion rate is very low."
                )
            })

        elif features["task_completion_rate"] < 50:

            recommendations.append({
                "resource": "Additional Development Workforce",
                "priority": "MEDIUM",
                "reason": (
                    "Task completion rate is below 50%."
                )
            })

        # --------------------------------------
        # No additional resources
        # --------------------------------------

        if not recommendations:

            recommendations.append({
                "resource": "No Additional Resource Required",
                "priority": "LOW",
                "reason": (
                    "Current project metrics are "
                    "within acceptable limits."
                )
            })

        # --------------------------------------
        # Sort recommendations
        # --------------------------------------

        priority_order = {
            "HIGH": 1,
            "MEDIUM": 2,
            "LOW": 3
        }

        recommendations.sort(
            key=lambda item:
            priority_order[item["priority"]]
        )

        # --------------------------------------
        # Return response
        # --------------------------------------

        return {
            "success": True,
            "recommendations": recommendations,
            "features": features
        }

    except Exception as error:

        print(
            "Resource recommendation error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Failed to generate resource recommendations"
        )