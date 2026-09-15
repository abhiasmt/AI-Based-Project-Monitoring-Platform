import prisma from "../config/database.js";

export const createDocument = async (data) => {
    return await prisma.document.create({
        data: {
            name: data.name,
            originalName: data.originalName,
            mimeType: data.mimeType,
            size: data.size,
            fileUrl: data.fileUrl,

            project: {
                connect: {
                    id: data.projectId
                }
            },

            uploadedBy: {
                connect: {
                    id: data.uploadedById
                }
            }
        },

        include: {
            uploadedBy: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
};


export const getDocumentsByProject = async (projectId) => {
    return await prisma.document.findMany({
        where: {
            projectId
        },

        include: {
            uploadedBy: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        },

        orderBy: {
            createdAt: "desc"
        }
    });
};


export const getDocumentById = async (id, projectId) => {
    return await prisma.document.findFirst({
        where: {
            id,
            projectId
        },

        include: {
            uploadedBy: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
};


export const deleteDocument = async (id, projectId) => {
    return await prisma.document.deleteMany({
        where: {
            id,
            projectId
        }
    });
};