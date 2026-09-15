import path from "path";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import milestoneRoutes from "./routes/milestone.routes.js";
import taskRoutes from "./routes/task.routes.js";
import dependencyRoutes from "./routes/dependency.routes.js";
import riskRoutes from "./routes/risk.routes.js";
import issueRoutes from "./routes/issue.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import documentRoutes from "./routes/document.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import userRoutes from "./routes/user.routes.js";



const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    })
);

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(
    "/uploads",
    express.static(path.resolve("uploads"))
);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI-Based Project Monitoring Platform API",
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Backend is running",
        timestamp: new Date().toISOString(),
    });
});

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);
app.use("/api", milestoneRoutes);
app.use("/api", taskRoutes);
app.use("/api", dependencyRoutes);
app.use("/api", riskRoutes);
app.use("/api", issueRoutes);
app.use("/api", progressRoutes);
app.use("/api", documentRoutes);
app.use("/api", notificationRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", userRoutes);

export default app;