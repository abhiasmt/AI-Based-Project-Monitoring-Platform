import {
    getProjectDashboard
} from "../services/dashboard.service.js";


// =====================================================
// GET PROJECT DASHBOARD
// =====================================================

export const getDashboard = async (
    req,
    res
) => {

    try {

        const {
            projectId
        } = req.params;


        // ---------------------------------------------
        // Validate project ID
        // ---------------------------------------------

        if (
            !projectId ||
            typeof projectId !== "string"
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Valid projectId is required"

            });

        }


        // ---------------------------------------------
        // Get dashboard data
        // ---------------------------------------------

        const dashboard =
            await getProjectDashboard(
                projectId,
                req.user.organizationId
            );


        // ---------------------------------------------
        // Project not found
        // ---------------------------------------------

        if (!dashboard) {

            return res.status(404).json({

                success: false,

                message:
                    "Project not found"

            });

        }


        // ---------------------------------------------
        // Response
        // ---------------------------------------------

        return res.status(200).json({

            success: true,

            message:
                "Project dashboard retrieved successfully",

            data: dashboard

        });

    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to retrieve project dashboard"

        });

    }

};