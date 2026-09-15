import os
import random
import pandas as pd


random.seed(42)


def calculate_risk_level(row):
    score = 0

    # Overdue tasks
    if row["overdue_task_rate"] >= 30:
        score += 30
    elif row["overdue_task_rate"] >= 15:
        score += 20
    elif row["overdue_task_rate"] > 0:
        score += 10

    # Blocked tasks
    if row["blocked_task_rate"] >= 20:
        score += 25
    elif row["blocked_task_rate"] >= 10:
        score += 15
    elif row["blocked_task_rate"] > 0:
        score += 5

    # Task completion
    if row["task_completion_rate"] < 30:
        score += 25
    elif row["task_completion_rate"] < 50:
        score += 15
    elif row["task_completion_rate"] < 70:
        score += 5

    # Milestones
    if row["milestone_completion_rate"] < 30:
        score += 15
    elif row["milestone_completion_rate"] < 50:
        score += 10

    # Open risks
    if row["open_risk_rate"] >= 70:
        score += 20
    elif row["open_risk_rate"] >= 40:
        score += 10

    # Critical risks
    if row["high_critical_risks"] >= 3:
        score += 20
    elif row["high_critical_risks"] >= 1:
        score += 10

    # Open issues
    if row["open_issue_rate"] >= 70:
        score += 15
    elif row["open_issue_rate"] >= 40:
        score += 10

    # Project progress
    if row["project_progress"] < 30:
        score += 15
    elif row["project_progress"] < 50:
        score += 10

    # Convert score to risk level
    if score >= 90:
        return "CRITICAL"
    elif score >= 60:
        return "HIGH"
    elif score >= 30:
        return "MEDIUM"
    else:
        return "LOW"


def generate_dataset(number_of_records=2000):

    records = []

    for _ in range(number_of_records):

        total_tasks = random.randint(5, 100)

        task_completion_rate = random.uniform(10, 100)

        overdue_task_rate = random.uniform(0, 50)

        blocked_task_rate = random.uniform(0, 30)

        milestone_completion_rate = random.uniform(10, 100)

        open_risk_rate = random.uniform(0, 100)

        high_critical_risks = random.randint(0, 5)

        open_issue_rate = random.uniform(0, 100)

        project_progress = random.uniform(5, 100)

        record = {
            "total_tasks": total_tasks,
            "task_completion_rate": task_completion_rate,
            "overdue_task_rate": overdue_task_rate,
            "blocked_task_rate": blocked_task_rate,
            "milestone_completion_rate":
                milestone_completion_rate,
            "open_risk_rate": open_risk_rate,
            "high_critical_risks":
                high_critical_risks,
            "open_issue_rate":
                open_issue_rate,
            "project_progress":
                project_progress
        }

        record["risk_level"] = calculate_risk_level(
            record
        )

        records.append(record)

    return pd.DataFrame(records)


if __name__ == "__main__":

    dataset = generate_dataset(2000)

    output_directory = "data/raw"

    os.makedirs(
        output_directory,
        exist_ok=True
    )

    output_file = os.path.join(
        output_directory,
        "risk_dataset.csv"
    )

    dataset.to_csv(
        output_file,
        index=False
    )

    print(
        f"Dataset created successfully: {output_file}"
    )

    print(
        f"Total records: {len(dataset)}"
    )

    print("\nRisk distribution:")

    print(
        dataset["risk_level"].value_counts()
    )