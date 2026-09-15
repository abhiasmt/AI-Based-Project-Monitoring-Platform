import * as documentService from "../services/document.service.js";
import prisma from "../config/database.js";
import fs from "fs/promises";


export const uploadDocument = async (req, res) => {
    try {
        const { projectId } = req.params;

        // Check whether a file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "File is required"
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
            // Remove uploaded file if project doesn't exist
            await fs.unlink(req.file.path).catch(() => {});

            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        const document = await documentService.createDocument({
            name: req.file.filename,
            originalName: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size,
            fileUrl: `/uploads/${req.file.filename}`,
            projectId,
            uploadedById: req.user.userId
        });

        res.status(201).json({
            success: true,
            message: "Document uploaded successfully",
            data: document
        });

    } catch (error) {
        console.error(error);

        // Remove uploaded file if database operation fails
        if (req.file?.path) {
            await fs.unlink(req.file.path).catch(() => {});
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getDocuments = async (req, res) => {
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

        const documents =
            await documentService.getDocumentsByProject(
                projectId
            );

        res.status(200).json({
            success: true,
            data: documents
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getDocumentById = async (req, res) => {
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

        const document =
            await documentService.getDocumentById(
                id,
                projectId
            );

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found"
            });
        }

        res.status(200).json({
            success: true,
            data: document
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const deleteDocument = async (req, res) => {
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

        // Find document before deleting it
        const document =
            await documentService.getDocumentById(
                id,
                projectId
            );

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found"
            });
        }

        const result =
            await documentService.deleteDocument(
                id,
                projectId
            );

        if (result.count === 0) {
            return res.status(404).json({
                success: false,
                message: "Document not found"
            });
        }

        // Delete physical file
        const filePath = document.fileUrl
            .replace("/uploads/", "uploads/");

        await fs.unlink(filePath).catch((error) => {
            console.error(
                "Unable to delete physical file:",
                error.message
            );
        });

        res.status(200).json({
            success: true,
            message: "Document deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};