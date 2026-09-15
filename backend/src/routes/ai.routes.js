import express from "express";

import {
    predictProjectRisk,
    predictProjectDelay,
    recommendProjectResource
} from "../controllers/ai.controller.js";

import {
    getProjectHealth
} from "../controllers/projectHealth.controller.js";

import {
    protect
} from "../middleware/auth.middleware.js";


const router = express.Router();


// =====================================================
// AI RISK PREDICTION
// =====================================================

router.post(
    "/predict-risk",
    protect,
    predictProjectRisk
);


// =====================================================
// AI DELAY PREDICTION
// =====================================================

router.post(
    "/predict-delay",
    protect,
    predictProjectDelay
);


// =====================================================
// RESOURCE RECOMMENDATION
// =====================================================

router.post(
    "/recommend-resource",
    protect,
    recommendProjectResource
);


// =====================================================
// PROJECT HEALTH
// =====================================================

router.post(
    "/project-health",
    protect,
    getProjectHealth
);


export default router;