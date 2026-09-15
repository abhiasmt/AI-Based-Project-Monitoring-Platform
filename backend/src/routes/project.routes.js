import express from "express";

import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
} from "../controllers/project.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// ADMIN and MANAGER can create projects
router.post(
    "/",
    protect,
    authorizeRoles("ADMIN", "MANAGER"),
    createProject
);

// All authenticated users can view projects
router.get(
    "/",
    protect,
    getProjects
);

router.get(
    "/:id",
    protect,
    getProjectById
);

// ADMIN and MANAGER can update projects
router.put(
    "/:id",
    protect,
    authorizeRoles("ADMIN", "MANAGER"),
    updateProject
);

// Only ADMIN can delete projects
router.delete(
    "/:id",
    protect,
    authorizeRoles("ADMIN"),
    deleteProject
);

export default router;