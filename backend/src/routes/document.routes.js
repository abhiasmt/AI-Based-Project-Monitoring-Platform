import express from "express";

import {
    uploadDocument,
    getDocuments,
    getDocumentById,
    deleteDocument
} from "../controllers/document.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
    "/projects/:projectId/documents",
    protect,
    authorizeRoles("ADMIN", "MANAGER", "TEAM_MEMBER"),
    uploadDocument
);

router.get(
    "/projects/:projectId/documents",
    protect,
    getDocuments
);

router.get(
    "/projects/:projectId/documents/:id",
    protect,
    getDocumentById
);

router.delete(
    "/projects/:projectId/documents/:id",
    protect,
    authorizeRoles("ADMIN", "MANAGER"),
    deleteDocument
);

export default router;