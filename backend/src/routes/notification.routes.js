import express from "express";

import {
    createNotification,
    getNotifications,
    getUnreadNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification
} from "../controllers/notification.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
    "/notifications",
    protect,
    createNotification
);

router.get(
    "/notifications",
    protect,
    getNotifications
);

router.get(
    "/notifications/unread",
    protect,
    getUnreadNotifications
);

router.put(
    "/notifications/:id/read",
    protect,
    markNotificationAsRead
);

router.put(
    "/notifications/read-all",
    protect,
    markAllNotificationsAsRead
);

router.delete(
    "/notifications/:id",
    protect,
    deleteNotification
);

export default router;