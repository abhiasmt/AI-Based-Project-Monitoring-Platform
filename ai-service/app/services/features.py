def calculate_features(data: dict) -> dict:
    project = data.get("project", {})
    metrics = data.get("metrics", {})

    total_tasks = metrics.get("totalTasks", 0)
    total_milestones = metrics.get("totalMilestones", 0)

    # -----------------------------
    # Task Features
    # -----------------------------

    task_completion_rate = metrics.get(
        "taskCompletionRate",
        0
    )

    average_task_progress = metrics.get(
        "averageTaskProgress",
        0
    )

    overdue_tasks = metrics.get(
        "overdueTasks",
        0
    )

    blocked_tasks = metrics.get(
        "blockedTasks",
        0
    )

    if total_tasks > 0:
        overdue_task_rate = (
            overdue_tasks / total_tasks
        ) * 100

        blocked_task_rate = (
            blocked_tasks / total_tasks
        ) * 100
    else:
        overdue_task_rate = 0
        blocked_task_rate = 0

    # -----------------------------
    # Milestone Features
    # -----------------------------

    completed_milestones = metrics.get(
        "completedMilestones",
        0
    )

    if total_milestones > 0:
        milestone_completion_rate = (
            completed_milestones /
            total_milestones
        ) * 100
    else:
        milestone_completion_rate = 0

    # -----------------------------
    # Risk Features
    # -----------------------------

    total_risks = metrics.get(
        "totalRisks",
        0
    )

    open_risks = metrics.get(
        "openRisks",
        0
    )

    high_critical_risks = metrics.get(
        "highCriticalRisks",
        0
    )

    if total_risks > 0:
        open_risk_rate = (
            open_risks / total_risks
        ) * 100
    else:
        open_risk_rate = 0

    # -----------------------------
    # Issue Features
    # -----------------------------

    total_issues = metrics.get(
        "totalIssues",
        0
    )

    open_issues = metrics.get(
        "openIssues",
        0
    )

    high_critical_issues = metrics.get(
        "highCriticalIssues",
        0
    )

    if total_issues > 0:
        open_issue_rate = (
            open_issues / total_issues
        ) * 100
    else:
        open_issue_rate = 0

    # -----------------------------
    # Project Progress
    # -----------------------------

    project_progress = metrics.get(
        "latestProgress",
        0
    )

    # -----------------------------
    # Return Features
    # -----------------------------

    return {
        "total_tasks": total_tasks,
        "task_completion_rate": task_completion_rate,
        "average_task_progress": average_task_progress,
        "overdue_tasks": overdue_tasks,
        "overdue_task_rate": overdue_task_rate,
        "blocked_tasks": blocked_tasks,
        "blocked_task_rate": blocked_task_rate,

        "total_milestones": total_milestones,
        "milestone_completion_rate":
            milestone_completion_rate,

        "total_risks": total_risks,
        "open_risks": open_risks,
        "open_risk_rate": open_risk_rate,
        "high_critical_risks":
            high_critical_risks,

        "total_issues": total_issues,
        "open_issues": open_issues,
        "open_issue_rate": open_issue_rate,
        "high_critical_issues":
            high_critical_issues,

        "project_progress": project_progress,

        "project_domain":
            project.get("domain", "OTHER"),

        "project_status":
            project.get("status", "PLANNING")
    }