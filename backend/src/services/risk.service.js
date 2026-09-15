import prisma from "../config/database.js";

export const createRisk = async (data) => {
    return await prisma.risk.create({
        data: {
            title: data.title,
            description: data.description,
            probability: data.probability,
            impact: data.impact,
            level: data.level,
            status: data.status,
            mitigationPlan: data.mitigationPlan,

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

            ...(data.ownerId && {
                owner: {
                    connect: {
                        id: data.ownerId
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
            owner: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
};

export const getRisksByProject = async (projectId) => {
    return await prisma.risk.findMany({
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
            owner: {
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

export const getRiskById = async (id, projectId) => {
    return await prisma.risk.findFirst({
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
            owner: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
};

export const updateRisk = async (id, projectId, data) => {
    return await prisma.risk.updateMany({
        where: {
            id,
            projectId
        },
        data: {
            title: data.title,
            description: data.description,
            probability: data.probability,
            impact: data.impact,
            level: data.level,
            status: data.status,
            mitigationPlan: data.mitigationPlan,
            ownerId: data.ownerId
        }
    });
};

export const deleteRisk = async (id, projectId) => {
    return await prisma.risk.deleteMany({
        where: {
            id,
            projectId
        }
    });
};