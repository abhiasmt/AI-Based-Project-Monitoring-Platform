import express from "express";

import {
    createDependency,
    getDependencies,
    deleteDependency
} from "../controllers/dependency.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
    "/tasks/:taskId/dependencies",
    protect,
    authorizeRoles("ADMIN", "MANAGER"),
    createDependency
);

router.get(
    "/tasks/:taskId/dependencies",
    protect,
    getDependencies
);

router.delete(
    "/tasks/:taskId/dependencies/:id",
    protect,
    authorizeRoles("ADMIN", "MANAGER"),
    deleteDependency
);

export default router;