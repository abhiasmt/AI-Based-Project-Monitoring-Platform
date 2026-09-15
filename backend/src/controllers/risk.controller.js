import * as riskService from "../services/risk.service.js";
import prisma from "../config/database.js";

export const createRisk = async (req, res) => {
    try {
        const { projectId } = req.params;

        const {
            title,
            description,
            probability,
            impact,
            level,
            status,
            mitigationPlan,
            ownerId
        } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Risk title is required"
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

        // Check owner belongs to same organization
        if (ownerId) {
            const owner = await prisma.user.findFirst({
                where: {
                    id: ownerId,
                    organizationId: req.user.organizationId
                }
            });

            if (!owner) {
                return res.status(404).json({
                    success: false,
                    message: "Risk owner not found"
                });
            }
        }

        const risk = await riskService.createRisk({
            title,
            description,
            probability,
            impact,
            level,
            status,
            mitigationPlan,
            projectId,
            reportedById: req.user.userId,
            ownerId
        });

        res.status(201).json({
            success: true,
            message: "Risk created successfully",
            data: risk
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getRisks = async (req, res) => {
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

        const risks = await riskService.getRisksByProject(projectId);

        res.status(200).json({
            success: true,
            data: risks
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getRiskById = async (req, res) => {
    try {
        const { projectId, id } = req.params;

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

        const risk = await riskService.getRiskById(
            id,
            projectId
        );

        if (!risk) {
            return res.status(404).json({
                success: false,
                message: "Risk not found"
            });
        }

        res.status(200).json({
            success: true,
            data: risk
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const updateRisk = async (req, res) => {
    try {
        const { projectId, id } = req.params;

        const {
            title,
            description,
            probability,
            impact,
            level,
            status,
            mitigationPlan,
            ownerId
        } = req.body;

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

        // Check owner belongs to same organization
        if (ownerId) {
            const owner = await prisma.user.findFirst({
                where: {
                    id: ownerId,
                    organizationId: req.user.organizationId
                }
            });

            if (!owner) {
                return res.status(404).json({
                    success: false,
                    message: "Risk owner not found"
                });
            }
        }

        const result = await riskService.updateRisk(
            id,
            projectId,
            {
                title,
                description,
                probability,
                impact,
                level,
                status,
                mitigationPlan,
                ownerId
            }
        );

        if (result.count === 0) {
            return res.status(404).json({
                success: false,
                message: "Risk not found"
            });
        }

        const risk = await riskService.getRiskById(
            id,
            projectId
        );

        res.status(200).json({
            success: true,
            message: "Risk updated successfully",
            data: risk
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const deleteRisk = async (req, res) => {
    try {
        const { projectId, id } = req.params;

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

        const result = await riskService.deleteRisk(
            id,
            projectId
        );

        if (result.count === 0) {
            return res.status(404).json({
                success: false,
                message: "Risk not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Risk deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};