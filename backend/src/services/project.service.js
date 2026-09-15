import prisma from "../config/database.js";

export const createProject = async (data) => {
    return await prisma.project.create({
        data: {
            name: data.name,
            description: data.description,
            domain: data.domain || "OTHER",

            startDate: data.startDate
                ? new Date(data.startDate)
                : undefined,

            endDate: data.endDate
                ? new Date(data.endDate)
                : undefined,

            organization: {
                connect: {
                    id: data.organizationId
                }
            },

            createdBy: {
                connect: {
                    id: data.createdById
                }
            }
        }
    });
};

export const getProjects = async (organizationId) => {
    return await prisma.project.findMany({
        where: {
            organizationId
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};

export const getProjectById = async (id, organizationId) => {
    return await prisma.project.findFirst({
        where: {
            id,
            organizationId
        }
    });
};

export const updateProject = async (id, organizationId, data) => {
    return await prisma.project.updateMany({
        where: {
            id,
            organizationId
        },
        data: {
            name: data.name,
            description: data.description,
            domain: data.domain,

            startDate: data.startDate
                ? new Date(data.startDate)
                : undefined,

            endDate: data.endDate
                ? new Date(data.endDate)
                : undefined,

            status: data.status
        }
    });
};

export const deleteProject = async (id, organizationId) => {
    return await prisma.project.deleteMany({
        where: {
            id,
            organizationId
        }
    });
};