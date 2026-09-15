import {
    createTask as createTaskService,
    getTasksByProject,
    getTaskById as getTaskByIdService,
    updateTask as updateTaskService,
    deleteTask as deleteTaskService
} from "../services/task.service.js";

import prisma from "../config/database.js";

const validStatuses = [
    "TODO",
    "IN_PROGRESS",
    "COMPLETED",
    "BLOCKED"
];

const validPriorities = [
    "LOW",
    "MEDIUM",
    "HIGH",
    "CRITICAL"
];

export const createTask = async (req, res) => {
    try {
        const { projectId } = req.params;

        const {
            title,
            description,
            status,
            priority,
            startDate,
            dueDate,
            progress,
            milestoneId,
            assigneeId
        } = req.body;

        if (!projectId || typeof projectId !== "string") {
            return res.status(400).json({
                success: false,
                message: "Valid projectId is required"
            });
        }

        if (!title || typeof title !== "string" || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Task title is required"
            });
        }

        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid task status"
            });
        }

        if (priority && !validPriorities.includes(priority)) {
            return res.status(400).json({
                success: false,
                message: "Invalid task priority"
            });
        }

        // Verify project belongs to current user's organization
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                organizationId: req.user.organizationId
            }
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        // Verify milestone belongs to this project
        if (milestoneId) {
            const milestone = await prisma.milestone.findFirst({
                where: {
                    id: milestoneId,
                    projectId
                }
            });

            if (!milestone) {
                return res.status(400).json({
                    success: false,
                    message: "Milestone does not belong to this project"
                });
            }
        }

        // Verify assignee belongs to the same organization
        if (assigneeId) {
            const assignee = await prisma.user.findFirst({
                where: {
                    id: assigneeId,
                    organizationId: req.user.organizationId
                }
            });

            if (!assignee) {
                return res.status(400).json({
                    success: false,
                    message: "Assignee does not belong to your organization"
                });
            }
        }

        const task = await createTaskService({
            title: title.trim(),
            description,
            status: status || "TODO",
            priority: priority || "MEDIUM",
            startDate,
            dueDate,
            progress: progress ?? 0,
            projectId,
            milestoneId,
            assigneeId,
            createdById: req.user.userId
        });

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task
        });

    } catch (error) {
        console.error("Create task error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create task"
        });
    }
};


export const getTasks = async (req, res) => {
    try {
        const { projectId } = req.params;

        if (!projectId || typeof projectId !== "string") {
            return res.status(400).json({
                success: false,
                message: "Valid projectId is required"
            });
        }

        // Verify project belongs to current user's organization
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                organizationId: req.user.organizationId
            }
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        const tasks = await getTasksByProject(projectId);

        return res.status(200).json({
            success: true,
            message: "Tasks retrieved successfully",
            data: tasks
        });

    } catch (error) {
        console.error("Get tasks error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to retrieve tasks"
        });
    }
};


export const getTaskById = async (req, res) => {
    try {
        const { projectId, id } = req.params;

        if (!projectId || !id) {
            return res.status(400).json({
                success: false,
                message: "Project ID and task ID are required"
            });
        }

        // Verify project belongs to current user's organization
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                organizationId: req.user.organizationId
            }
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        const task = await getTaskByIdService(
            id,
            projectId
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task retrieved successfully",
            data: task
        });

    } catch (error) {
        console.error("Get task error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to retrieve task"
        });
    }
};


export const updateTask = async (req, res) => {
    try {
        const { projectId, id } = req.params;

        const {
            title,
            description,
            status,
            priority,
            startDate,
            dueDate,
            progress,
            milestoneId,
            assigneeId
        } = req.body;

        if (!projectId || !id) {
            return res.status(400).json({
                success: false,
                message: "Project ID and task ID are required"
            });
        }

        /*
         * authorizeTaskAccess middleware has already verified:
         *
         * ADMIN/MANAGER -> any task in organization
         * TEAM_MEMBER    -> only their assigned task
         */
        const task = req.task;

        if (!task) {
            return res.status(403).json({
                success: false,
                message: "Task authorization failed"
            });
        }

        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid task status"
            });
        }

        if (priority && !validPriorities.includes(priority)) {
            return res.status(400).json({
                success: false,
                message: "Invalid task priority"
            });
        }

        // TEAM_MEMBER cannot reassign tasks
        if (req.user.role === "TEAM_MEMBER") {
            if (assigneeId !== undefined) {
                return res.status(403).json({
                    success: false,
                    message: "Team members cannot reassign tasks"
                });
            }
        }

        // Validate milestone if supplied
        if (milestoneId !== undefined && milestoneId !== null) {
            const milestone = await prisma.milestone.findFirst({
                where: {
                    id: milestoneId,
                    projectId
                }
            });

            if (!milestone) {
                return res.status(400).json({
                    success: false,
                    message: "Milestone does not belong to this project"
                });
            }
        }

        // ADMIN/MANAGER can change assignee
        if (
            assigneeId !== undefined &&
            assigneeId !== null
        ) {
            const assignee = await prisma.user.findFirst({
                where: {
                    id: assigneeId,
                    organizationId: req.user.organizationId
                }
            });

            if (!assignee) {
                return res.status(400).json({
                    success: false,
                    message: "Assignee does not belong to your organization"
                });
            }
        }

        const data = {
            title: title !== undefined
                ? title.trim()
                : undefined,

            description,

            status,

            priority,

            startDate,

            dueDate,

            progress,

            milestoneId
        };

        /*
         * Only ADMIN/MANAGER can modify assigneeId.
         */
        if (
            req.user.role === "ADMIN" ||
            req.user.role === "MANAGER"
        ) {
            data.assigneeId = assigneeId;
        }

        const result = await updateTaskService(
            id,
            projectId,
            data
        );

        if (result.count === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        const updatedTask = await getTaskByIdService(
            id,
            projectId
        );

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: updatedTask
        });

    } catch (error) {
        console.error("Update task error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update task"
        });
    }
};


export const deleteTask = async (req, res) => {
    try {
        const { projectId, id } = req.params;

        if (!projectId || !id) {
            return res.status(400).json({
                success: false,
                message: "Project ID and task ID are required"
            });
        }

        // Verify project belongs to current user's organization
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                organizationId: req.user.organizationId
            }
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        const result = await deleteTaskService(
            id,
            projectId
        );

        if (result.count === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (error) {
        console.error("Delete task error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete task"
        });
    }
};