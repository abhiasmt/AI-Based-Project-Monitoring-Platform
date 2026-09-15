import {
    predictRisk,
    predictDelay,
    recommendResource
} from "../services/ai.service.js";

import {
    getProjectAIData
} from "../services/projectAIData.service.js";


// =====================================================
// AI RISK PREDICTION
// =====================================================

export const predictProjectRisk = async (
    req,
    res
) => {

    try {

        const { projectId } = req.body;


        // ---------------------------------------------
        // Validate project ID
        // ---------------------------------------------

        if (
            !projectId ||
            typeof projectId !== "string"
        ) {

            return res.status(400).json({
                success: false,
                message: "Valid projectId is required"
            });

        }


        // ---------------------------------------------
        // Get project data
        // ---------------------------------------------

        const projectData =
            await getProjectAIData(
                projectId,
                req.user.organizationId
            );


        if (!projectData) {

            return res.status(404).json({
                success: false,
                message: "Project not found"
            });

        }


        // ---------------------------------------------
        // Call AI service
        // ---------------------------------------------

        const result =
            await predictRisk(
                projectData
            );


        // ---------------------------------------------
        // Response
        // ---------------------------------------------

        return res.status(200).json({

            success: true,

            message:
                "Risk prediction generated successfully",

            data: result

        });

    } catch (error) {

        console.error(
            "Risk prediction error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to generate risk prediction"

        });

    }
};


// =====================================================
// AI DELAY PREDICTION
// =====================================================

export const predictProjectDelay = async (
    req,
    res
) => {

    try {

        const { projectId } = req.body;


        // ---------------------------------------------
        // Validate project ID
        // ---------------------------------------------

        if (
            !projectId ||
            typeof projectId !== "string"
        ) {

            return res.status(400).json({
                success: false,
                message: "Valid projectId is required"
            });

        }


        // ---------------------------------------------
        // Get project data
        // ---------------------------------------------

        const projectData =
            await getProjectAIData(
                projectId,
                req.user.organizationId
            );


        if (!projectData) {

            return res.status(404).json({
                success: false,
                message: "Project not found"
            });

        }


        // ---------------------------------------------
        // Call AI service
        // ---------------------------------------------

        const result =
            await predictDelay(
                projectData
            );


        // ---------------------------------------------
        // Response
        // ---------------------------------------------

        return res.status(200).json({

            success: true,

            message:
                "Delay prediction generated successfully",

            data: result

        });

    } catch (error) {

        console.error(
            "Delay prediction error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to generate delay prediction"

        });

    }
};


// =====================================================
// RESOURCE RECOMMENDATION
// =====================================================

export const recommendProjectResource = async (
    req,
    res
) => {

    try {

        const { projectId } = req.body;


        // ---------------------------------------------
        // Validate project ID
        // ---------------------------------------------

        if (
            !projectId ||
            typeof projectId !== "string"
        ) {

            return res.status(400).json({
                success: false,
                message: "Valid projectId is required"
            });

        }


        // ---------------------------------------------
        // Get project data
        // ---------------------------------------------

        const projectData =
            await getProjectAIData(
                projectId,
                req.user.organizationId
            );


        if (!projectData) {

            return res.status(404).json({
                success: false,
                message: "Project not found"
            });

        }


        // ---------------------------------------------
        // Call AI service
        // ---------------------------------------------

        const result =
            await recommendResource(
                projectData
            );


        // ---------------------------------------------
        // Response
        // ---------------------------------------------

        return res.status(200).json({

            success: true,

            message:
                "Resource recommendation generated successfully",

            data: result

        });

    } catch (error) {

        console.error(
            "Resource recommendation error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to generate resource recommendation"

        });

    }
};