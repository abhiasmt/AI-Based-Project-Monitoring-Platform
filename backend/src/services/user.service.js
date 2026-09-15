import prisma from "../config/database.js";

export const getOrganizationUsers = async (organizationId) => {
    return prisma.user.findMany({
        where: {
            organizationId
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};

export const getUserById = async (id, organizationId) => {
    return prisma.user.findFirst({
        where: {
            id,
            organizationId
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true
        }
    });
};

export const updateUserRole = async (
    id,
    organizationId,
    role
) => {
    return prisma.user.updateMany({
        where: {
            id,
            organizationId
        },
        data: {
            role
        }
    });
};