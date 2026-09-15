import {
    getProjectAIData
} from "../services/projectAIData.service.js";

import {
    generateProjectHealth
} from "../services/projectHealth.service.js";


// =====================================================
// PROJECT HEALTH
// =====================================================

export const getProjectHealth = async (
    req,
    res
) => {

    try {

        const {
            projectId
        } = req.body;


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


        // ---------------------------------------------
        // Project not found
        // ---------------------------------------------

        if (!projectData) {

            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }


        // ---------------------------------------------
        // Generate health report
        // ---------------------------------------------

        const healthReport =
            await generateProjectHealth(
                projectData
            );


        // ---------------------------------------------
        // Response
        // ---------------------------------------------

        return res.status(200).json({

            success: true,

            message:
                "Project health report generated successfully",

            data: healthReport

        });

    } catch (error) {

        console.error(
            "Project health error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to generate project health report"

        });
    }
};