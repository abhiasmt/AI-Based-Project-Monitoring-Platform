from app.services.features import calculate_features


test_data = {
    "project": {
        "domain": "SOFTWARE",
        "status": "ACTIVE"
    },

    "metrics": {
        "totalTasks": 10,
        "completedTasks": 4,
        "inProgressTasks": 3,
        "blockedTasks": 1,
        "overdueTasks": 2,

        "averageTaskProgress": 45,
        "taskCompletionRate": 40,

        "totalMilestones": 3,
        "completedMilestones": 1,

        "totalRisks": 4,
        "openRisks": 3,
        "highCriticalRisks": 2,

        "totalIssues": 5,
        "openIssues": 3,
        "highCriticalIssues": 1,

        "latestProgress": 40
    }
}


features = calculate_features(test_data)

print("\nGenerated Features:\n")

for key, value in features.items():
    print(f"{key}: {value}")