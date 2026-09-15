import prisma from "../config/database.js";

export const createProgressUpdate = async (data) => {
    return await prisma.progressUpdate.create({
        data: {
            percent: data.percent,
            description: data.description,

            project: {
                connect: {
                    id: data.projectId
                }
            },

            user: {
                connect: {
                    id: data.userId
                }
            }
        },

        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
};


export const getProgressUpdatesByProject = async (projectId) => {
    return await prisma.progressUpdate.findMany({
        where: {
            projectId
        },

        include: {
            user: {
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


export const getProgressUpdateById = async (id, projectId) => {
    return await prisma.progressUpdate.findFirst({
        where: {
            id,
            projectId
        },

        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
};


export const updateProgressUpdate = async (
    id,
    projectId,
    data
) => {
    return await prisma.progressUpdate.updateMany({
        where: {
            id,
            projectId
        },

        data: {
            percent: data.percent,
            description: data.description
        }
    });
};


export const deleteProgressUpdate = async (
    id,
    projectId
) => {
    return await prisma.progressUpdate.deleteMany({
        where: {
            id,
            projectId
        }
    });
};