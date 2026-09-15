import {
    getTaskForAuthorization
} from "../services/task.service.js";

export const authorizeTaskAccess = async (req, res, next) => {
    try {
        const { projectId, id } = req.params;

        if (!projectId || !id) {
            return res.status(400).json({
                success: false,
                message: "Project ID and task ID are required"
            });
        }

        const task = await getTaskForAuthorization(
            id,
            projectId,
            req.user.organizationId
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        // ADMIN and MANAGER can access any task
        if (
            req.user.role === "ADMIN" ||
            req.user.role === "MANAGER"
        ) {
            req.task = task;
            return next();
        }

        // TEAM_MEMBER can access only their assigned task
        if (req.user.role === "TEAM_MEMBER") {
            if (task.assignedToId !== req.user.userId) {
                return res.status(403).json({
                    success: false,
                    message: "You can only modify tasks assigned to you"
                });
            }

            req.task = task;
            return next();
        }

        return res.status(403).json({
            success: false,
            message: "You do not have permission to modify this task"
        });

    } catch (error) {
        console.error("Task authorization error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to authorize task access"
        });
    }
};