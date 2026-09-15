import express from "express";

import {
    getTeamMembers,
    getTeamMemberById,
    changeUserRole
} from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.get(
    "/team",
    protect,
    getTeamMembers
);

router.get(
    "/team/:id",
    protect,
    getTeamMemberById
);

router.put(
    "/team/:id/role",
    protect,
    authorizeRoles("ADMIN"),
    changeUserRole
);

export default router;