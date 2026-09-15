import express from "express";

import {
    createIssue,
    getIssues,
    getIssueById,
    updateIssue,
    deleteIssue
} from "../controllers/issue.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
    "/projects/:projectId/issues",
    protect,
    authorizeRoles("ADMIN", "MANAGER", "TEAM_MEMBER"),
    createIssue
);

router.get(
    "/projects/:projectId/issues",
    protect,
    getIssues
);

router.get(
    "/projects/:projectId/issues/:id",
    protect,
    getIssueById
);

router.put(
    "/projects/:projectId/issues/:id",
    protect,
    authorizeRoles("ADMIN", "MANAGER", "TEAM_MEMBER"),
    updateIssue
);

router.delete(
    "/projects/:projectId/issues/:id",
    protect,
    authorizeRoles("ADMIN", "MANAGER"),
    deleteIssue
);

export default router;