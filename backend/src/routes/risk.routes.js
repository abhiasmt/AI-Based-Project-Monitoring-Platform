import express from "express";

import {
    createRisk,
    getRisks,
    getRiskById,
    updateRisk,
    deleteRisk
} from "../controllers/risk.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
    "/projects/:projectId/risks",
    protect,
    authorizeRoles("ADMIN", "MANAGER", "TEAM_MEMBER"),
    createRisk
);

router.get(
    "/projects/:projectId/risks",
    protect,
    getRisks
);

router.get(
    "/projects/:projectId/risks/:id",
    protect,
    getRiskById
);

router.put(
    "/projects/:projectId/risks/:id",
    protect,
    authorizeRoles("ADMIN", "MANAGER"),
    updateRisk
);

router.delete(
    "/projects/:projectId/risks/:id",
    protect,
    authorizeRoles("ADMIN", "MANAGER"),
    deleteRisk
);

export default router;