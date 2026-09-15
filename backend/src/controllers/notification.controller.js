import * as notificationService from "../services/notification.service.js";
import prisma from "../config/database.js";


export const createNotification = async (req, res) => {
    try {
        const {
            title,
            message,
            type,
            userId
        } = req.body;

        if (!title || !message || !type || !userId) {
            return res.status(400).json({
                success: false,
                message: "Title, message, type and userId are required"
            });
        }

        // Check target user belongs to the same organization
        const targetUser = await prisma.user.findFirst({
            where: {
                id: userId,
                organizationId: req.user.organizationId
            }
        });

        if (!targetUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const notification =
            await notificationService.createNotification({
                title,
                message,
                type,
                userId
            });

        res.status(201).json({
            success: true,
            message: "Notification created successfully",
            data: notification
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getNotifications = async (req, res) => {
    try {
        const notifications =
            await notificationService.getNotificationsByUser(
                req.user.userId
            );

        res.status(200).json({
            success: true,
            data: notifications
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getUnreadNotifications = async (req, res) => {
    try {
        const notifications =
            await notificationService.getUnreadNotificationsByUser(
                req.user.userId
            );

        res.status(200).json({
            success: true,
            data: notifications
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const markNotificationAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        const result =
            await notificationService.markNotificationAsRead(
                id,
                req.user.userId
            );

        if (result.count === 0) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Notification marked as read"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const markAllNotificationsAsRead = async (req, res) => {
    try {
        const result =
            await notificationService.markAllNotificationsAsRead(
                req.user.userId
            );

        res.status(200).json({
            success: true,
            message: "All notifications marked as read",
            updatedCount: result.count
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const result =
            await notificationService.deleteNotification(
                id,
                req.user.userId
            );

        if (result.count === 0) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Notification deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};