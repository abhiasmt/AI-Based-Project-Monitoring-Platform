import prisma from "../config/database.js";

export const createTask = async (data) => {
    return await prisma.task.create({
        data: {
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,

            startDate: data.startDate
                ? new Date(data.startDate)
                : undefined,

            dueDate: data.dueDate
                ? new Date(data.dueDate)
                : undefined,

            progress: data.progress ?? 0,

            project: {
                connect: {
                    id: data.projectId
                }
            },

            ...(data.milestoneId && {
                milestone: {
                    connect: {
                        id: data.milestoneId
                    }
                }
            }),

            ...(data.assigneeId && {
                assignee: {
                    connect: {
                        id: data.assigneeId
                    }
                }
            }),

            createdBy: {
                connect: {
                    id: data.createdById
                }
            }
        }
    });
};


export const getTasksByProject = async (projectId) => {
    return await prisma.task.findMany({
        where: {
            projectId
        },

        include: {
            milestone: true,

            assignee: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },

            createdBy: {
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


export const getTaskById = async (id, projectId) => {
    return await prisma.task.findFirst({
        where: {
            id,
            projectId
        },

        include: {
            milestone: true,

            assignee: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },

            createdBy: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
};


/*
 * Get a task for resource-level authorization.
 *
 * This checks:
 * 1. Task belongs to the requested project
 * 2. Project belongs to the user's organization
 * 3. Returns the assignee so we can check ownership
 */
export const getTaskForAuthorization = async (
    taskId,
    projectId,
    organizationId
) => {
    return await prisma.task.findFirst({
        where: {
            id: taskId,
            projectId,
            project: {
                organizationId
            }
        },

        select: {
            id: true,
            projectId: true,
            assigneeId: true,
            createdById: true,
            status: true,
            title: true
        }
    });
};


export const updateTask = async (id, projectId, data) => {
    return await prisma.task.updateMany({
        where: {
            id,
            projectId
        },

        data: {
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,

            startDate: data.startDate
                ? new Date(data.startDate)
                : undefined,

            dueDate: data.dueDate
                ? new Date(data.dueDate)
                : undefined,

            progress: data.progress,

            milestoneId: data.milestoneId,

            assigneeId: data.assigneeId
        }
    });
};


export const deleteTask = async (id, projectId) => {
    return await prisma.task.deleteMany({
        where: {
            id,
            projectId
        }
    });
};