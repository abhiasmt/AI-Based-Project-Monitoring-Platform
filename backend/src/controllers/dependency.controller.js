import * as dependencyService from "../services/dependency.service.js";
import prisma from "../config/database.js";

export const createDependency = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { dependsOnTaskId } = req.body;

        if (!dependsOnTaskId) {
            return res.status(400).json({
                success: false,
                message: "dependsOnTaskId is required"
            });
        }

        if (taskId === dependsOnTaskId) {
            return res.status(400).json({
                success: false,
                message: "A task cannot depend on itself"
            });
        }

        // Check current task
        const task = await prisma.task.findFirst({
            where: {
                id: taskId,
                project: {
                    organizationId: req.user.organizationId
                }
            }
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        // Check dependency task
        const dependencyTask = await prisma.task.findFirst({
            where: {
                id: dependsOnTaskId,
                project: {
                    organizationId: req.user.organizationId
                }
            }
        });

        if (!dependencyTask) {
            return res.status(404).json({
                success: false,
                message: "Dependency task not found"
            });
        }

        // Prevent dependency between different projects
        if (task.projectId !== dependencyTask.projectId) {
            return res.status(400).json({
                success: false,
                message: "Tasks must belong to the same project"
            });
        }

        // Prevent duplicate dependency
        const existingDependency =
            await prisma.taskDependency.findUnique({
                where: {
                    taskId_dependsOnTaskId: {
                        taskId,
                        dependsOnTaskId
                    }
                }
            });

        if (existingDependency) {
            return res.status(409).json({
                success: false,
                message: "Dependency already exists"
            });
        }

        const dependency =
            await dependencyService.createDependency(
                taskId,
                dependsOnTaskId
            );

        res.status(201).json({
            success: true,
            message: "Task dependency created successfully",
            data: dependency
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getDependencies = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await prisma.task.findFirst({
            where: {
                id: taskId,
                project: {
                    organizationId: req.user.organizationId
                }
            }
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        const dependencies =
            await dependencyService.getDependencies(taskId);

        res.status(200).json({
            success: true,
            data: dependencies
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const deleteDependency = async (req, res) => {
    try {
        const { taskId, id } = req.params;

        const task = await prisma.task.findFirst({
            where: {
                id: taskId,
                project: {
                    organizationId: req.user.organizationId
                }
            }
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        const result =
            await dependencyService.deleteDependency(id, taskId);

        if (result.count === 0) {
            return res.status(404).json({
                success: false,
                message: "Dependency not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task dependency deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};