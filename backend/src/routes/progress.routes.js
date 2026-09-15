import express from "express";

import {
    createProgress,
    getProgress,
    getProgressById,
    updateProgress,
    deleteProgress
} from "../controllers/progress.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
    "/projects/:projectId/progress",
    protect,
    authorizeRoles("ADMIN", "MANAGER", "TEAM_MEMBER"),
    createProgress
);

router.get(
    "/projects/:projectId/progress",
    protect,
    getProgress
);

router.get(
    "/projects/:projectId/progress/:id",
    protect,
    getProgressById
);

router.put(
    "/projects/:projectId/progress/:id",
    protect,
    authorizeRoles("ADMIN", "MANAGER", "TEAM_MEMBER"),
    updateProgress
);

router.delete(
    "/projects/:projectId/progress/:id",
    protect,
    authorizeRoles("ADMIN", "MANAGER"),
    deleteProgress
);

export default router;