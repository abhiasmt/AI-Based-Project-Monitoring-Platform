import os
import random
import pandas as pd

random.seed(42)


def calculate_delay_level(row):
    score = 0

    if row["overdue_task_rate"] >= 30:
        score += 30
    elif row["overdue_task_rate"] >= 15:
        score += 20
    elif row["overdue_task_rate"] > 0:
        score += 10

    if row["blocked_task_rate"] >= 20:
        score += 25
    elif row["blocked_task_rate"] >= 10:
        score += 15
    elif row["blocked_task_rate"] > 0:
        score += 5

    if row["task_completion_rate"] < 30:
        score += 25
    elif row["task_completion_rate"] < 50:
        score += 20
    elif row["task_completion_rate"] < 70:
        score += 10

    if row["milestone_completion_rate"] < 30:
        score += 15
    elif row["milestone_completion_rate"] < 50:
        score += 10

    if row["project_progress"] < 30:
        score += 15
    elif row["project_progress"] < 50:
        score += 10

    if row["open_issue_rate"] >= 70:
        score += 15
    elif row["open_issue_rate"] >= 40:
        score += 10

    if row["high_critical_risks"] >= 3:
        score += 15
    elif row["high_critical_risks"] >= 1:
        score += 5

    if score >= 70:
        return "HIGH"
    elif score >= 40:
        return "MEDIUM"
    else:
        return "LOW"


def generate_dataset(number_of_records=2000):

    records = []

    for _ in range(number_of_records):

        record = {
            "total_tasks": random.randint(5, 100),

            "task_completion_rate":
                random.uniform(10, 100),

            "overdue_task_rate":
                random.uniform(0, 50),

            "blocked_task_rate":
                random.uniform(0, 30),

            "milestone_completion_rate":
                random.uniform(10, 100),

            "high_critical_risks":
                random.randint(0, 5),

            "open_issue_rate":
                random.uniform(0, 100),

            "project_progress":
                random.uniform(5, 100)
        }

        record["delay_level"] = calculate_delay_level(record)

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
        "delay_dataset.csv"
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

    print("\nDelay distribution:")

    print(
        dataset["delay_level"].value_counts()
    )