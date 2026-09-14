# Contributing Guide

Thank you for contributing to the **Web-Based Integrated Project Monitoring Platform**.

This guide explains how our team should work with Git, GitHub branches, commits, pull requests, code reviews, and the different services of the project.

---

## Development Workflow

We use the following Git workflow:

```text
main
  ↑
  │ Release PR
  │
develop
  ├── feature/frontend-dashboard
  ├── feature/backend-auth
  ├── feature/task-management
  ├── feature/ai-risk-delay
  ├── feature/resource-recommendation
  └── feature/database
```

> **Note:** This is a conceptual workflow, not a literal Git branch hierarchy.

### Branch Purpose

| Branch | Purpose |
|---|---|
| `main` | Stable and release-ready code |
| `develop` | Integration branch for ongoing development |
| `feature/*` | Individual contributor work |
| `fix/*` | Bug fixes |
| `docs/*` | Documentation changes |

Contributors should **not directly push to `main` or `develop`**.

---

## Branch Naming

Use descriptive branch names.

### Feature Branches

```text
feature/frontend-dashboard
feature/backend-auth
feature/task-management
feature/ai-risk-delay
feature/resource-recommendation
feature/database
```

### Bug Fix Branches

```text
fix/login-error
fix/task-api-error
fix/dashboard-layout
fix/authentication-error
```

### Documentation Branches

```text
docs/update-readme
docs/contributing-guide
docs/api-documentation
```

### Branch Naming Rules

- Use lowercase letters.
- Use hyphens to separate words.
- Keep names short and descriptive.
- Do not use spaces.
- Do not use vague names such as `mybranch`, `test`, or `new`.

---

## First-Time Repository Setup

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project directory:

```bash
cd project-monitoring-platform
```

Check available branches:

```bash
git branch -a
```

Switch to the `develop` branch:

```bash
git checkout develop
```

Get the latest changes:

```bash
git pull origin develop
```

---

## Creating a Feature Branch

Always create your feature branch from the latest `develop` branch.

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

For example:

```bash
git checkout -b feature/task-management
```

Another example:

```bash
git checkout -b feature/ai-risk-delay
```

---

## Working on Your Feature

Make your changes inside your assigned area of the project.

While working, regularly check the status of your repository:

```bash
git status
```

To see exactly what you have changed:

```bash
git diff
```

Before committing, make sure that:

- You only changed files related to your task.
- You did not accidentally modify another contributor's work.
- You did not add secrets or passwords.
- Your code works locally.
- Existing functionality is not unnecessarily broken.

---

## Commit Messages

Commit messages should clearly explain what was changed.

### Good Commit Messages

```text
Add task creation API
Fix authentication middleware
Implement project dashboard
Add risk prediction endpoint
Update Prisma schema
Add resource recommendation algorithm
Fix project status update
```

### Avoid

```text
update
changes
done
final
test
abc
work
```

A good commit message should explain **what the commit does**.

---

## Committing Changes

After completing your work, check your changes:

```bash
git status
```

Review the differences:

```bash
git diff
```

Add your changes:

```bash
git add .
```

Create a commit:

```bash
git commit -m "Add task creation API"
```

Check your recent commits:

```bash
git log --oneline -5
```

---

## Push Your Feature Branch

Push your feature branch to GitHub:

```bash
git push -u origin feature/your-feature-name
```

Example:

```bash
git push -u origin feature/task-management
```

After the first push, you can normally use:

```bash
git push
```

---

## Pull Requests

After pushing your feature branch to GitHub, create a **Pull Request (PR)**.

The normal flow is:

```text
feature/task-management
          │
          ▼
        Pull Request
          │
          ▼
       develop
```

### Pull Request Steps

1. Open the GitHub repository.
2. Go to **Pull Requests**.
3. Click **New Pull Request**.
4. Select your feature branch.
5. Set the base branch to `develop`.
6. Add a clear title.
7. Explain what you changed.
8. Mention how you tested the changes.
9. Request a review from the appropriate team member.
10. Wait for approval.
11. Fix review comments if required.
12. Merge the PR after approval.

---

## Pull Request Title

Use a descriptive title.

### Good

```text
Add task management API
Implement project dashboard
Add AI risk prediction endpoint
Fix authentication issue
Add resource recommendation
Update database schema
```

### Avoid

```text
Update
Changes
My work
Final
Done
Test
```

---

## Pull Request Description

A good PR should explain what was changed and how it was tested.

Example:

```markdown
## What changed?

- Added task creation API
- Added task update API
- Added task deletion API
- Added task validation

## Testing

- Tested task creation
- Tested task updates
- Tested task deletion
- Tested invalid task requests

## Related Issue

Closes #12
```

---

## Code Review

Every Pull Request should be reviewed before merging.

Reviewers should check:

- Code quality
- Correctness
- Security
- API design
- Database changes
- Error handling
- Naming
- Testing
- Unnecessary code
- Performance where relevant
- Compatibility with existing features

If changes are requested, update your branch and push again.

```bash
git add .
git commit -m "Address review comments"
git push
```

The existing Pull Request will automatically update.

---

## Keeping Your Feature Branch Updated

While you are working, other contributors may merge changes into `develop`.

First update your local `develop` branch:

```bash
git checkout develop
git pull origin develop
```

Then return to your feature branch:

```bash
git checkout feature/your-feature-name
```

Merge the latest `develop` changes:

```bash
git merge develop
```

If there are no conflicts:

```bash
git push
```

If there are conflicts, follow the **Merge Conflicts** section below.

---

## Merge Conflicts

If Git reports a conflict, you may see something like:

```text
CONFLICT (content): Merge conflict in <file>
```

Open the affected file.

You may see:

```text
<<<<<<< HEAD
Your changes
=======
Changes from develop
>>>>>>> develop
```

Decide which code should remain.

After resolving the conflict, remove the conflict markers:

```text
<<<<<<< HEAD
=======
>>>>>>> develop
```

Then check the repository:

```bash
git status
```

Add the resolved files:

```bash
git add .
```

Commit the resolution:

```bash
git commit -m "Resolve merge conflicts"
```

Push the changes:

```bash
git push
```

If you are unsure how to resolve a conflict, **ask the project lead before choosing a solution**.

---

# Project Structure

The project uses the following main structure:

```text
project-monitoring-platform/
│
├── frontend/
├── backend/
├── ai-service/
├── database/
│
├── .github/
│   └── workflows/
│
├── .gitignore
├── .env.example
├── docker-compose.yml
└── README.md
```

---

## Frontend Development

The frontend uses:

```text
React
Tailwind CSS
Recharts
```

Frontend code belongs inside:

```text
frontend/
```

Recommended structure:

```text
frontend/
└── src/
    ├── assets/
    ├── components/
    │   ├── common/
    │   ├── dashboard/
    │   ├── projects/
    │   ├── tasks/
    │   ├── team/
    │   ├── risks/
    │   └── ai/
    │
    ├── pages/
    ├── services/
    ├── hooks/
    ├── context/
    ├── utils/
    ├── routes/
    ├── App.jsx
    └── main.jsx
```

### Frontend Guidelines

- Create reusable components.
- Avoid duplicating UI code.
- Keep API calls inside service files.
- Keep pages organized.
- Use meaningful component names.
- Keep styling consistent with the existing design.
- Do not modify unrelated components without a reason.

---

## Backend Development

The backend uses:

```text
Node.js
Express.js
Prisma
PostgreSQL
JWT
bcrypt
Socket.IO
```

Backend code belongs inside:

```text
backend/
```

Recommended structure:

```text
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── server.js
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
└── package.json
```

### Backend Guidelines

- Keep routes organized.
- Keep business logic inside services/controllers.
- Validate incoming data.
- Handle errors properly.
- Never expose passwords or secrets.
- Use authentication middleware where required.
- Follow the existing API structure.

---

## Database Development

The project uses:

```text
PostgreSQL
     │
     ▼
   Prisma
```

PostgreSQL is used because the project contains structured and relational data such as:

- Users
- Organizations
- Projects
- Milestones
- Tasks
- Risks
- Issues
- Resources
- Progress updates
- Documents

### Prisma Schema

The main Prisma schema is located at:

```text
backend/prisma/schema.prisma
```

After modifying the Prisma schema, create a migration:

```bash
npx prisma migrate dev --name your_migration_name
```

Example:

```bash
npx prisma migrate dev --name add_project_status
```

Do not manually modify another contributor's migration without discussing it with the team.

---

## AI Service Development

The AI service uses:

```text
Python
FastAPI
scikit-learn
XGBoost
```

AI code belongs inside:

```text
ai-service/
```

Recommended structure:

```text
ai-service/
├── app/
│   ├── main.py
│   │
│   ├── models/
│   │   ├── risk_model.py
│   │   └── delay_model.py
│   │
│   ├── prediction/
│   │   ├── risk_prediction.py
│   │   └── delay_prediction.py
│   │
│   ├── recommendation/
│   │   └── resource_recommendation.py
│   │
│   ├── schemas/
│   │   └── prediction_schema.py
│   │
│   └── utils/
│
├── training/
│   ├── train_risk_model.py
│   └── train_delay_model.py
│
├── trained_models/
├── requirements.txt
└── Dockerfile
```

---

## Core AI Features

The project focuses on two main AI features.

### 1. AI Risk & Delay Prediction

The system predicts whether a project or task is likely to experience a delay.

Possible input factors include:

- Current progress
- Remaining days
- Overdue tasks
- Task priority
- Team workload
- Previous delays
- Task dependencies
- Milestone progress

The system can produce results such as:

```text
Risk Level: HIGH
Delay Probability: 82%
Expected Delay: 4 days
```

The recommended machine learning model is:

```text
XGBoost
```

with:

```text
scikit-learn
```

for preprocessing and evaluation.

---

### 2. AI Resource Recommendation

The system recommends suitable team members for tasks.

Possible factors include:

- Required skills
- Employee skills
- Availability
- Current workload
- Past performance
- Task requirements

A recommendation can initially use a weighted scoring approach:

```text
Skill Match       → 40%
Availability      → 25%
Current Workload  → 20%
Past Performance  → 15%
```

Example:

```text
Recommended Member: Amit

Skill Match: 92%
Availability: High
Current Workload: Low
Overall Score: 88%
```

---

## LLM and RAG

The core AI features **do not require an LLM or RAG**.

We are not adding AI technologies simply for the sake of calling the project "AI-powered".

### Current AI Architecture

```text
Project Data
     │
     ▼
Python FastAPI
     │
     ├───────────────┐
     ▼               ▼
XGBoost       Recommendation
     │             Algorithm
     ▼               ▼
Risk/Delay      Best Resource
Prediction      Recommendation
```

LLM/RAG may be considered in the future for optional features such as:

- Project AI Assistant
- Document Question Answering
- AI Report Generation

These are not part of the core implementation unless the team decides to add them later.

---

## Environment Variables

Never commit real secrets or credentials.

Do **not** commit:

```text
.env
```

Use:

```text
.env.example
```

Example:

```env
DATABASE_URL=
JWT_SECRET=
AI_SERVICE_URL=
```

Each contributor should create their own local `.env` file.

---

## Files That Should Not Be Committed

Do not commit unnecessary generated files or secrets.

Common examples:

```text
.env
node_modules/
__pycache__/
*.pyc
dist/
build/
*.log
```

Always check `.gitignore` before committing.

---

## Testing

Before creating a Pull Request, make sure your feature works correctly.

At minimum:

```text
✓ Application starts
✓ No obvious console errors
✓ API works
✓ Database operations work
✓ UI works
✓ AI service works if applicable
✓ Existing features are not broken
```

Run the project's available tests before opening a PR.

---

## GitHub Actions

GitHub Actions workflows may be stored in:

```text
.github/
└── workflows/
    ├── frontend.yml
    ├── backend.yml
    └── ai-service.yml
```

These workflows can automatically perform tasks such as:

- Installing dependencies
- Running tests
- Running lint checks
- Building the frontend
- Checking the backend
- Testing the AI service

Do not create empty workflow files just for appearance.

Only add workflows when they contain actual CI/CD configuration.

---

## What Contributors Should NOT Do

Contributors should **not**:

- Directly push to `main`.
- Directly push to `develop`.
- Force-push shared branches.
- Delete shared branches.
- Commit passwords or API keys.
- Commit `.env` files.
- Modify unrelated features.
- Rewrite another contributor's work without discussion.
- Merge their own PR without following the review process.
- Commit unnecessary generated files.
- Make major architectural changes without discussing them with the team.

---

## Dangerous Git Commands

Be careful with commands such as:

```bash
git reset --hard
git push --force
git branch -D
```

These commands can permanently remove or overwrite work.

Never use force push on shared branches such as:

```text
main
develop
```

If you are unsure about a Git command, ask the project lead before running it.

---

## Main Branch Protection

The `main` branch should be protected.

Recommended rules:

- Pull Request required.
- At least 1 approval required.
- Conversation resolution required.
- Status checks required once CI is configured.
- Force pushes blocked.
- Branch deletion restricted.

The normal release flow is:

```text
Feature Branch
      │
      ▼
Pull Request
      │
      ▼
develop
      │
      ▼
Integration Testing
      │
      ▼
Pull Request
      │
      ▼
main
```

---

## After Your Pull Request Is Merged

Once your feature has been merged into `develop`, you can delete the feature branch.

Delete the local branch:

```bash
git branch -d feature/your-feature-name
```

Delete the remote branch:

```bash
git push origin --delete feature/your-feature-name
```

Then update your local repository:

```bash
git checkout develop
git pull origin develop
```

---

## Daily Git Workflow

A typical development session should look like this:

```bash
git checkout develop
git pull origin develop

git checkout feature/my-feature

# Work on your feature

git status
git diff

git add .
git commit -m "Implement my feature"

git push
```

Then create or update your Pull Request.

---

## Complete Example

Suppose you are responsible for the task management module.

### Step 1 — Update develop

```bash
git checkout develop
git pull origin develop
```

### Step 2 — Create your feature branch

```bash
git checkout -b feature/task-management
```

### Step 3 — Work on the feature

Implement the required functionality.

### Step 4 — Check your changes

```bash
git status
git diff
```

### Step 5 — Commit

```bash
git add .
git commit -m "Implement task management"
```

### Step 6 — Push

```bash
git push -u origin feature/task-management
```

### Step 7 — Create Pull Request

Create:

```text
feature/task-management → develop
```

### Step 8 — Code Review

Wait for the team member to review your PR.

### Step 9 — Fix Review Comments

If changes are requested:

```bash
git add .
git commit -m "Address review comments"
git push
```

### Step 10 — Merge

After approval, the PR can be merged into `develop`.

---

## Useful Git Commands

### Check Current Branch

```bash
git branch
```

### List All Branches

```bash
git branch -a
```

### Switch Branch

```bash
git checkout branch-name
```

### Create and Switch to a New Branch

```bash
git checkout -b branch-name
```

### Get Latest Changes

```bash
git pull
```

### Pull Latest Develop

```bash
git checkout develop
git pull origin develop
```

### Check Repository Status

```bash
git status
```

### View Changes

```bash
git diff
```

### Stage Changes

```bash
git add .
```

### Commit Changes

```bash
git commit -m "Your commit message"
```

### Push Changes

```bash
git push
```

### Push New Branch

```bash
git push -u origin branch-name
```

### Fetch Remote Changes

```bash
git fetch
```

### View Recent Commits

```bash
git log --oneline -10
```

---

## Pull Request Checklist

Before submitting a Pull Request:

```text
[ ] My branch is based on develop
[ ] My code works locally
[ ] I tested my changes
[ ] I checked git status
[ ] I reviewed git diff
[ ] Commit messages are meaningful
[ ] No .env or secrets are committed
[ ] No unnecessary files are included
[ ] I did not modify unrelated features
[ ] PR title is clear
[ ] PR description explains the changes
[ ] I am ready for code review
```

---

## Team Rules

1. Always work on a feature or fix branch.
2. Never work directly on `main`.
3. Never work directly on `develop`.
4. Keep commits meaningful.
5. Keep Pull Requests focused.
6. Review other team members' Pull Requests.
7. Communicate before making major architectural changes.
8. Never commit secrets.
9. Never force-push shared branches.
10. Test your changes before creating a Pull Request.
11. Keep `develop` stable.
12. Ask for help when you are stuck.

---

## Golden Workflow

```text
1. Pull latest develop
        ↓
2. Create feature branch
        ↓
3. Write code
        ↓
4. Test locally
        ↓
5. Check git diff
        ↓
6. Commit changes
        ↓
7. Push feature branch
        ↓
8. Create Pull Request
        ↓
9. Code review
        ↓
10. Fix review comments
        ↓
11. Merge into develop
        ↓
12. Integration testing
        ↓
13. Release develop → main
```

---

## Important Rule

> **Never work directly on `main` or `develop`. Create a feature branch, make your changes, push the branch, and create a Pull Request.**

---

## Thank You

Thank you for contributing to the **Web-Based Integrated Project Monitoring Platform**.

Let's keep the codebase clean, organized, secure, and easy for the entire team to work with.