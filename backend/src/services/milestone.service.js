import prisma from "../config/database.js";

export const createMilestone = async (data) => {
    return await prisma.milestone.create({
        data: {
            name: data.name,
            description: data.description,
            startDate: data.startDate
                ? new Date(data.startDate)
                : undefined,
            dueDate: data.dueDate
                ? new Date(data.dueDate)
                : undefined,

            project: {
                connect: {
                    id: data.projectId
                }
            }
        }
    });
};

export const getMilestonesByProject = async (projectId) => {
    return await prisma.milestone.findMany({
        where: {
            projectId
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};

export const getMilestoneById = async (id, projectId) => {
    return await prisma.milestone.findFirst({
        where: {
            id,
            projectId
        }
    });
};

export const updateMilestone = async (id, projectId, data) => {
    return await prisma.milestone.updateMany({
        where: {
            id,
            projectId
        },
        data: {
            name: data.name,
            description: data.description,
            startDate: data.startDate
                ? new Date(data.startDate)
                : undefined,
            dueDate: data.dueDate
                ? new Date(data.dueDate)
                : undefined,
            completed: data.completed
        }
    });
};

export const deleteMilestone = async (id, projectId) => {
    return await prisma.milestone.deleteMany({
        where: {
            id,
            projectId
        }
    });
};