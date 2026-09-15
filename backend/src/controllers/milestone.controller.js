import * as milestoneService from "../services/milestone.service.js";
import prisma from "../config/database.js";

export const createMilestone = async (req, res) => {
    try {
        const { name, description, startDate, dueDate } = req.body;
        const { projectId } = req.params;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Milestone name is required"
            });
        }

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

        const milestone = await milestoneService.createMilestone({
            name,
            description,
            startDate,
            dueDate,
            projectId
        });

        res.status(201).json({
            success: true,
            message: "Milestone created successfully",
            data: milestone
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getMilestones = async (req, res) => {
    try {
        const { projectId } = req.params;

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

        const milestones =
            await milestoneService.getMilestonesByProject(projectId);

        res.status(200).json({
            success: true,
            data: milestones
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getMilestoneById = async (req, res) => {
    try {
        const { projectId, id } = req.params;

        const milestone =
            await milestoneService.getMilestoneById(id, projectId);

        if (!milestone) {
            return res.status(404).json({
                success: false,
                message: "Milestone not found"
            });
        }

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

        res.status(200).json({
            success: true,
            data: milestone
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const updateMilestone = async (req, res) => {
    try {
        const { projectId, id } = req.params;
        const {
            name,
            description,
            startDate,
            dueDate,
            completed
        } = req.body;

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

        const result = await milestoneService.updateMilestone(
            id,
            projectId,
            {
                name,
                description,
                startDate,
                dueDate,
                completed
            }
        );

        if (result.count === 0) {
            return res.status(404).json({
                success: false,
                message: "Milestone not found"
            });
        }

        const milestone =
            await milestoneService.getMilestoneById(id, projectId);

        res.status(200).json({
            success: true,
            message: "Milestone updated successfully",
            data: milestone
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const deleteMilestone = async (req, res) => {
    try {
        const { projectId, id } = req.params;

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

        const result = await milestoneService.deleteMilestone(
            id,
            projectId
        );

        if (result.count === 0) {
            return res.status(404).json({
                success: false,
                message: "Milestone not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Milestone deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};