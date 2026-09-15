import express from "express";

import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} from "../controllers/task.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { authorizeTaskAccess } from "../middleware/resource.middleware.js";

const router = express.Router();

// ADMIN and MANAGER can create tasks
router.post(
    "/projects/:projectId/tasks",
    protect,
    authorizeRoles("ADMIN", "MANAGER"),
    createTask
);

// All authenticated users can view project tasks
router.get(
    "/projects/:projectId/tasks",
    protect,
    getTasks
);

router.get(
    "/projects/:projectId/tasks/:id",
    protect,
    getTaskById
);

// ADMIN and MANAGER can update any task
// TEAM_MEMBER can update only their assigned task
router.put(
    "/projects/:projectId/tasks/:id",
    protect,
    authorizeRoles("ADMIN", "MANAGER", "TEAM_MEMBER"),
    authorizeTaskAccess,
    updateTask
);

// Only ADMIN and MANAGER can delete tasks
router.delete(
    "/projects/:projectId/tasks/:id",
    protect,
    authorizeRoles("ADMIN", "MANAGER"),
    deleteTask
);

export default router;