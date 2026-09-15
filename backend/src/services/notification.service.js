import prisma from "../config/database.js";

export const createNotification = async (data) => {
    return await prisma.notification.create({
        data: {
            title: data.title,
            message: data.message,
            type: data.type,
            user: {
                connect: {
                    id: data.userId
                }
            }
        }
    });
};


export const getNotificationsByUser = async (userId) => {
    return await prisma.notification.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};


export const getUnreadNotificationsByUser = async (userId) => {
    return await prisma.notification.findMany({
        where: {
            userId,
            read: false
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};


export const markNotificationAsRead = async (
    id,
    userId
) => {
    return await prisma.notification.updateMany({
        where: {
            id,
            userId
        },
        data: {
            read: true
        }
    });
};


export const markAllNotificationsAsRead = async (userId) => {
    return await prisma.notification.updateMany({
        where: {
            userId,
            read: false
        },
        data: {
            read: true
        }
    });
};


export const deleteNotification = async (
    id,
    userId
) => {
    return await prisma.notification.deleteMany({
        where: {
            id,
            userId
        }
    });
};