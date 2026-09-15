import prisma from "../config/database.js";


// =====================================================
// GET PROJECT DASHBOARD
// =====================================================

export const getProjectDashboard = async (
    projectId,
    organizationId
) => {

    // ---------------------------------------------
    // Get project
    // ---------------------------------------------

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
                take: 10,

                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                }
            }

        }

    });


    if (!project) {
        return null;
    }


    // ---------------------------------------------
    // Task statistics
    // ---------------------------------------------

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

    const todoTasks =
        project.tasks.filter(
            task => task.status === "TODO"
        ).length;

    const blockedTasks =
        project.tasks.filter(
            task => task.status === "BLOCKED"
        ).length;


    // ---------------------------------------------
    // Overdue tasks
    // ---------------------------------------------

    const now = new Date();

    const overdueTasks =
        project.tasks.filter(task => {

            return (
                task.dueDate &&
                new Date(task.dueDate) < now &&
                task.status !== "COMPLETED"
            );

        }).length;


    // ---------------------------------------------
    // Project progress
    // ---------------------------------------------

    const projectProgress =
        project.progressUpdates.length > 0
            ? Math.min(
                Math.max(
                    Number(
                        project.progressUpdates[0].percent
                    ) || 0,
                    0
                ),
                100
            )
            : 0;


    // ---------------------------------------------
    // Milestone statistics
    // ---------------------------------------------

    const totalMilestones =
        project.milestones.length;

    const completedMilestones =
        project.milestones.filter(
            milestone => milestone.completed
        ).length;


    // ---------------------------------------------
    // Risk statistics
    // ---------------------------------------------

    const totalRisks =
        project.risks.length;

    const openRisks =
        project.risks.filter(
            risk => risk.status === "OPEN"
        ).length;


    const lowRisks =
        project.risks.filter(
            risk => risk.level === "LOW"
        ).length;

    const mediumRisks =
        project.risks.filter(
            risk => risk.level === "MEDIUM"
        ).length;

    const highRisks =
        project.risks.filter(
            risk => risk.level === "HIGH"
        ).length;

    const criticalRisks =
        project.risks.filter(
            risk => risk.level === "CRITICAL"
        ).length;


    // ---------------------------------------------
    // Issue statistics
    // ---------------------------------------------

    const totalIssues =
        project.issues.length;

    const openIssues =
        project.issues.filter(
            issue => issue.status === "OPEN"
        ).length;

    const inProgressIssues =
        project.issues.filter(
            issue => issue.status === "IN_PROGRESS"
        ).length;

    const resolvedIssues =
        project.issues.filter(
            issue => issue.status === "RESOLVED"
        ).length;

    const closedIssues =
        project.issues.filter(
            issue => issue.status === "CLOSED"
        ).length;


    // ---------------------------------------------
    // Return dashboard
    // ---------------------------------------------

    return {

        project: {

            id: project.id,

            name: project.name,

            description: project.description,

            domain: project.domain,

            status: project.status,

            startDate: project.startDate,

            endDate: project.endDate

        },


        overview: {

            progress: projectProgress,

            totalTasks,

            completedTasks,

            inProgressTasks,

            blockedTasks,

            overdueTasks,

            totalMilestones,

            completedMilestones,

            totalRisks,

            openRisks,

            totalIssues,

            openIssues

        },


        tasks: {

            todo: todoTasks,

            inProgress: inProgressTasks,

            completed: completedTasks,

            blocked: blockedTasks

        },


        risks: {

            low: lowRisks,

            medium: mediumRisks,

            high: highRisks,

            critical: criticalRisks

        },


        issues: {

            open: openIssues,

            inProgress: inProgressIssues,

            resolved: resolvedIssues,

            closed: closedIssues

        },


        recentProgress:
            project.progressUpdates

    };

};