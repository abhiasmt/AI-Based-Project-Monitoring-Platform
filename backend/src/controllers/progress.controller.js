import * as progressService from "../services/progress.service.js";
import prisma from "../config/database.js";


export const createProgressUpdate = async (req, res) => {
    try {
        const { projectId } = req.params;

        const {
            percent,
            description
        } = req.body;

        if (percent === undefined || percent === null) {
            return res.status(400).json({
                success: false,
                message: "Progress percentage is required"
            });
        }

        if (
            typeof percent !== "number" ||
            percent < 0 ||
            percent > 100
        ) {
            return res.status(400).json({
                success: false,
                message: "Progress must be a number between 0 and 100"
            });
        }

        // Check project belongs to user's organization
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

        const progressUpdate =
            await progressService.createProgressUpdate({
                percent,
                description,
                projectId,
                userId: req.user.userId
            });

        res.status(201).json({
            success: true,
            message: "Progress update created successfully",
            data: progressUpdate
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getProgressUpdates = async (req, res) => {
    try {
        const { projectId } = req.params;

        // Check project belongs to user's organization
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

        const updates =
            await progressService.getProgressUpdatesByProject(
                projectId
            );

        res.status(200).json({
            success: true,
            data: updates
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getProgressUpdateById = async (req, res) => {
    try {
        const {
            projectId,
            id
        } = req.params;

        // Check project belongs to user's organization
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

        const update =
            await progressService.getProgressUpdateById(
                id,
                projectId
            );

        if (!update) {
            return res.status(404).json({
                success: false,
                message: "Progress update not found"
            });
        }

        res.status(200).json({
            success: true,
            data: update
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const updateProgressUpdate = async (req, res) => {
    try {
        const {
            projectId,
            id
        } = req.params;

        const {
            percent,
            description
        } = req.body;

        if (
            percent !== undefined &&
            (
                typeof percent !== "number" ||
                percent < 0 ||
                percent > 100
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "Progress must be a number between 0 and 100"
            });
        }

        // Check project belongs to user's organization
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

        const result =
            await progressService.updateProgressUpdate(
                id,
                projectId,
                {
                    percent,
                    description
                }
            );

        if (result.count === 0) {
            return res.status(404).json({
                success: false,
                message: "Progress update not found"
            });
        }

        const update =
            await progressService.getProgressUpdateById(
                id,
                projectId
            );

        res.status(200).json({
            success: true,
            message: "Progress update updated successfully",
            data: update
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const deleteProgressUpdate = async (req, res) => {
    try {
        const {
            projectId,
            id
        } = req.params;

        // Check project belongs to user's organization
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

        const result =
            await progressService.deleteProgressUpdate(
                id,
                projectId
            );

        if (result.count === 0) {
            return res.status(404).json({
                success: false,
                message: "Progress update not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Progress update deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};