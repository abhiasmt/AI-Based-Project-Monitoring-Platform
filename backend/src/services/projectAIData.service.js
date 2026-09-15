import prisma from "../config/database.js";


// =====================================================
// GET PROJECT DATA FOR AI
// =====================================================

export const getProjectAIData = async (
    projectId,
    organizationId
) => {

    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            organizationId
        },

        include: {
            tasks: true,

            milestones: true,

            risks: true,

            issues: true,

            progressUpdates: {
                orderBy: {
                    createdAt: "desc"
                },
                take: 1
            }
        }
    });


    if (!project) {
        return null;
    }


    const now = new Date();


    // =================================================
    // TASK METRICS
    // =================================================

    const totalTasks =
        project.tasks.length;


    const completedTasks =
        project.tasks.filter(
            task => task.status === "COMPLETED"
        ).length;


    const inProgressTasks =
        project.tasks.filter(
            task => task.status === "IN_PROGRESS"
        ).length;


    const blockedTasks =
        project.tasks.filter(
            task => task.status === "BLOCKED"
        ).length;


    const overdueTasks =
        project.tasks.filter(task => {

            return (
                task.dueDate &&
                new Date(task.dueDate) < now &&
                task.status !== "COMPLETED"
            );

        }).length;


    // =================================================
    // TASK PROGRESS
    // =================================================

    const averageTaskProgress =
        totalTasks > 0
            ? project.tasks.reduce(
                (sum, task) => {

                    const progress =
                        Number(task.progress) || 0;

                    const safeProgress =
                        Math.min(
                            Math.max(progress, 0),
                            100
                        );

                    return sum + safeProgress;

                },
                0
            ) / totalTasks
            : 0;


    const taskCompletionRate =
        totalTasks > 0
            ? (completedTasks / totalTasks) * 100
            : 0;


    const overdueTaskRate =
        totalTasks > 0
            ? (overdueTasks / totalTasks) * 100
            : 0;


    const blockedTaskRate =
        totalTasks > 0
            ? (blockedTasks / totalTasks) * 100
            : 0;


    // =================================================
    // MILESTONE METRICS
    // =================================================

    const totalMilestones =
        project.milestones.length;


    const completedMilestones =
        project.milestones.filter(
            milestone => milestone.completed
        ).length;


    const milestoneCompletionRate =
        totalMilestones > 0
            ? (completedMilestones / totalMilestones) * 100
            : 0;


    // =================================================
    // RISK METRICS
    // =================================================

    const totalRisks =
        project.risks.length;


    const openRisks =
        project.risks.filter(
            risk => risk.status === "OPEN"
        ).length;


    const highCriticalRisks =
        project.risks.filter(
            risk =>
                risk.level === "HIGH" ||
                risk.level === "CRITICAL"
        ).length;


    const openRiskRate =
        totalRisks > 0
            ? (openRisks / totalRisks) * 100
            : 0;


    // =================================================
    // ISSUE METRICS
    // =================================================

    const totalIssues =
        project.issues.length;


    const openIssues =
        project.issues.filter(
            issue =>
                issue.status === "OPEN" ||
                issue.status === "IN_PROGRESS"
        ).length;


    const highCriticalIssues =
        project.issues.filter(
            issue =>
                issue.priority === "HIGH" ||
                issue.priority === "CRITICAL"
        ).length;


    const openIssueRate =
        totalIssues > 0
            ? (openIssues / totalIssues) * 100
            : 0;


    // =================================================
    // PROJECT PROGRESS
    // =================================================

    const latestProgress =
        project.progressUpdates.length > 0
            ? Number(
                project.progressUpdates[0].percent
            ) || 0
            : 0;


    const projectProgress =
        Math.min(
            Math.max(latestProgress, 0),
            100
        );


    // =================================================
    // FINAL AI DATA
    // =================================================

    return {

        project: {

            id: project.id,

            name: project.name,

            domain: project.domain,

            status: project.status,

            startDate: project.startDate,

            endDate: project.endDate

        },


        metrics: {

            // Tasks
            totalTasks,

            completedTasks,

            inProgressTasks,

            blockedTasks,

            overdueTasks,

            averageTaskProgress,

            taskCompletionRate,

            overdueTaskRate,

            blockedTaskRate,


            // Milestones
            totalMilestones,

            completedMilestones,

            milestoneCompletionRate,


            // Risks
            totalRisks,

            openRisks,

            openRiskRate,

            highCriticalRisks,


            // Issues
            totalIssues,

            openIssues,

            openIssueRate,

            highCriticalIssues,


            // Progress
            latestProgress,

            projectProgress

        }

    };
};