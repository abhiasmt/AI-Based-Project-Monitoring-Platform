import {
    predictRisk,
    predictDelay,
    recommendResource
} from "./ai.service.js";


// =====================================================
// GENERATE PROJECT HEALTH REPORT
// =====================================================

export const generateProjectHealth = async (
    projectData
) => {

    // ---------------------------------------------
    // Get AI predictions in parallel
    // ---------------------------------------------

    const [
        riskResult,
        delayResult,
        resourceResult
    ] = await Promise.all([
        predictRisk(projectData),
        predictDelay(projectData),
        recommendResource(projectData)
    ]);


    // ---------------------------------------------
    // Extract predictions
    // ---------------------------------------------

    const riskPrediction =
        riskResult?.prediction || {};

    const delayPrediction =
        delayResult?.prediction || {};

    const recommendations =
        resourceResult?.recommendations || [];


    // ---------------------------------------------
    // Project metrics
    // ---------------------------------------------

    const metrics =
        projectData.metrics;


    // =================================================
    // HEALTH STATUS
    // =================================================

    let healthStatus = "HEALTHY";


    const riskLevel =
        riskPrediction.riskLevel;


    const delayLevel =
        delayPrediction.delayRisk;


    // Critical conditions
    if (
        riskLevel === "CRITICAL" ||
        riskLevel === "HIGH" ||
        delayLevel === "HIGH"
    ) {

        healthStatus = "AT_RISK";

    }

    // Warning conditions
    else if (
        riskLevel === "MEDIUM" ||
        delayLevel === "MEDIUM"
    ) {

        healthStatus = "NEEDS_ATTENTION";

    }


    // =================================================
    // HEALTH SCORE
    // =================================================

    let healthScore = 100;


    // Overdue tasks
    healthScore -= Math.min(
        metrics.overdueTaskRate || 0,
        25
    );


    // Blocked tasks
    healthScore -= Math.min(
        metrics.blockedTaskRate || 0,
        20
    );


    // Open risks
    healthScore -= Math.min(
        metrics.openRiskRate || 0,
        20
    );


    // Open issues
    healthScore -= Math.min(
        metrics.openIssueRate || 0,
        15
    );


    // Low task completion
    if (
        (metrics.taskCompletionRate || 0) < 50
    ) {

        healthScore -= 10;

    }


    // Low project progress
    if (
        (metrics.projectProgress || 0) < 50
    ) {

        healthScore -= 10;

    }


    // Keep score between 0 and 100
    healthScore = Math.max(
        0,
        Math.min(
            100,
            Math.round(healthScore)
        )
    );


    // =================================================
    // HEALTH SUMMARY
    // =================================================

    let summary;


    if (healthStatus === "AT_RISK") {

        summary =
            "The project is currently at risk and requires immediate attention.";

    }

    else if (
        healthStatus === "NEEDS_ATTENTION"
    ) {

        summary =
            "The project is progressing but requires attention to potential risks or delays.";

    }

    else {

        summary =
            "The project is currently healthy and progressing within acceptable limits.";

    }


    // =================================================
    // FINAL HEALTH REPORT
    // =================================================

    return {

        project: projectData.project,

        health: {

            status: healthStatus,

            score: healthScore,

            summary

        },

        risk: {

            level:
                riskPrediction.riskLevel || null,

            confidence:
                riskPrediction.confidence || null,

            probabilities:
                riskPrediction.probabilities || {}

        },

        delay: {

            level:
                delayPrediction.delayRisk || null,

            confidence:
                delayPrediction.confidence || null,

            probabilities:
                delayPrediction.probabilities || {}

        },

        resources:
            recommendations,

        metrics,

        generatedAt:
            new Date().toISOString()

    };

};