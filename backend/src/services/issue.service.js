import prisma from "../config/database.js";

export const createIssue = async (data) => {
    return await prisma.issue.create({
        data: {
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,

            project: {
                connect: {
                    id: data.projectId
                }
            },

            reportedBy: {
                connect: {
                    id: data.reportedById
                }
            },

            ...(data.assignedToId && {
                assignedTo: {
                    connect: {
                        id: data.assignedToId
                    }
                }
            })
        },

        include: {
            reportedBy: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },

            assignedTo: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
};


export const getIssuesByProject = async (projectId) => {
    return await prisma.issue.findMany({
        where: {
            projectId
        },

        include: {
            reportedBy: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },

            assignedTo: {
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


export const getIssueById = async (id, projectId) => {
    return await prisma.issue.findFirst({
        where: {
            id,
            projectId
        },

        include: {
            reportedBy: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },

            assignedTo: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
};


export const updateIssue = async (id, projectId, data) => {
    return await prisma.issue.updateMany({
        where: {
            id,
            projectId
        },

        data: {
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            assignedToId: data.assignedToId
        }
    });
};


export const deleteIssue = async (id, projectId) => {
    return await prisma.issue.deleteMany({
        where: {
            id,
            projectId
        }
    });
};