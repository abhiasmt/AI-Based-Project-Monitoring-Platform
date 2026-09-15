import express from "express";

import {
    createMilestone,
    getMilestones,
    getMilestoneById,
    updateMilestone,
    deleteMilestone
} from "../controllers/milestone.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
    "/projects/:projectId/milestones",
    protect,
    authorizeRoles("ADMIN", "MANAGER"),
    createMilestone
);

router.get(
    "/projects/:projectId/milestones",
    protect,
    getMilestones
);

router.get(
    "/projects/:projectId/milestones/:id",
    protect,
    getMilestoneById
);

router.put(
    "/projects/:projectId/milestones/:id",
    protect,
    authorizeRoles("ADMIN", "MANAGER"),
    updateMilestone
);

router.delete(
    "/projects/:projectId/milestones/:id",
    protect,
    authorizeRoles("ADMIN", "MANAGER"),
    deleteMilestone
);

export default router;