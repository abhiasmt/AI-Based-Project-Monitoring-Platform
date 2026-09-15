import * as issueService from "../services/issue.service.js";
import prisma from "../config/database.js";


export const createIssue = async (req, res) => {
    try {
        const { projectId } = req.params;

        const {
            title,
            description,
            status,
            priority,
            assignedToId
        } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Issue title is required"
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

        // Check assigned user belongs to same organization
        if (assignedToId) {
            const assignedUser = await prisma.user.findFirst({
                where: {
                    id: assignedToId,
                    organizationId: req.user.organizationId
                }
            });

            if (!assignedUser) {
                return res.status(404).json({
                    success: false,
                    message: "Assigned user not found"
                });
            }
        }

        const issue = await issueService.createIssue({
            title,
            description,
            status,
            priority,
            assignedToId,
            projectId,
            reportedById: req.user.userId
        });

        res.status(201).json({
            success: true,
            message: "Issue created successfully",
            data: issue
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getIssues = async (req, res) => {
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

        const issues = await issueService.getIssuesByProject(
            projectId
        );

        res.status(200).json({
            success: true,
            data: issues
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getIssueById = async (req, res) => {
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

        const issue = await issueService.getIssueById(
            id,
            projectId
        );

        if (!issue) {
            return res.status(404).json({
                success: false,
                message: "Issue not found"
            });
        }

        res.status(200).json({
            success: true,
            data: issue
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const updateIssue = async (req, res) => {
    try {
        const { projectId, id } = req.params;

        const {
            title,
            description,
            status,
            priority,
            assignedToId
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

        // Check assigned user belongs to same organization
        if (assignedToId) {
            const assignedUser = await prisma.user.findFirst({
                where: {
                    id: assignedToId,
                    organizationId: req.user.organizationId
                }
            });

            if (!assignedUser) {
                return res.status(404).json({
                    success: false,
                    message: "Assigned user not found"
                });
            }
        }

        const result = await issueService.updateIssue(
            id,
            projectId,
            {
                title,
                description,
                status,
                priority,
                assignedToId
            }
        );

        if (result.count === 0) {
            return res.status(404).json({
                success: false,
                message: "Issue not found"
            });
        }

        const issue = await issueService.getIssueById(
            id,
            projectId
        );

        res.status(200).json({
            success: true,
            message: "Issue updated successfully",
            data: issue
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const deleteIssue = async (req, res) => {
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

        const result = await issueService.deleteIssue(
            id,
            projectId
        );

        if (result.count === 0) {
            return res.status(404).json({
                success: false,
                message: "Issue not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Issue deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};