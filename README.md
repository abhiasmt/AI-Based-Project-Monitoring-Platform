# Contributing Guide

Welcome to the **AI-Based Project Monitoring Platform** development team.

This guide explains how contributors should clone the project, create a branch, make changes, push their branch, create a Pull Request, handle review changes, and keep their branch updated.

> **Important:** Never push directly to the `main` branch. All contributor changes must be submitted through a Pull Request.

---

## 1. Repository Workflow

The project uses the following workflow:

```text
                    ┌─────────────────┐
                    │      main       │
                    │  Protected      │
                    └────────┬────────┘
                             ▲
                             │
                        Pull Request
                             │
                             │
                    ┌────────┴────────┐
                    │ Your Branch    │
                    │ feature/login  │
                    └────────┬────────┘
                             │
                       Make changes
                             │
                             ▼
                    Commit → Push
```

### Basic workflow

```text
1. Clone repository
2. Create your own branch
3. Make changes
4. Test your changes
5. Commit changes
6. Push your branch
7. Create Pull Request
8. Wait for review
9. Fix requested changes if needed
10. Pull Request gets merged
11. Delete your old branch
12. Start from updated main for the next task
```

---

# 2. Requirements

Before contributing, make sure you have installed:

* Git
* VS Code or another code editor
* The required programming languages/tools for the project

Check Git:

```bash
git --version
```

If Git is installed correctly, you will see something similar to:

```text
git version 2.x.x
```

---

# 3. Clone the Repository

Clone the repository to your computer:

```bash
git clone https://github.com/abhiasmt/AI-Based-Project-Monitoring-Platform.git
```

Move into the project directory:

```bash
cd AI-Based-Project-Monitoring-Platform
```

Check the remote repository:

```bash
git remote -v
```

You should see the GitHub repository URL.

---

# 4. Check Your Current Branch

Before doing anything, check your current branch:

```bash
git branch
```

You should normally see:

```text
* main
```

---

# 5. Always Update Main Before Creating a New Branch

Before starting a new task, make sure your local `main` is up to date.

Run:

```bash
git checkout main
```

Then:

```bash
git pull origin main
```

This downloads the latest changes from GitHub.

---

# 6. Create Your Own Branch

Never work directly on `main`.

Create a new branch for your task:

```bash
git checkout -b feature/your-feature-name
```

For example:

```bash
git checkout -b feature/login-page
```

Another example:

```bash
git checkout -b feature/project-dashboard
```

Another example:

```bash
git checkout -b fix/login-validation
```

Your branch name should clearly describe what you are working on.

---

# 7. Branch Naming Convention

Use the following format:

### New feature

```text
feature/feature-name
```

Example:

```text
feature/user-login
```

### Bug fix

```text
fix/bug-name
```

Example:

```text
fix/login-validation
```

### Documentation

```text
docs/documentation-name
```

Example:

```text
docs/contributing-guide
```

### UI changes

```text
ui/component-name
```

Example:

```text
ui/dashboard
```

### Refactoring

```text
refactor/component-name
```

Example:

```text
refactor/authentication
```

---

# 8. Confirm Your Branch

After creating the branch:

```bash
git branch
```

Example:

```text
* feature/login-page
  main
```

The `*` shows your current branch.

You can also use:

```bash
git status
```

It should show something similar to:

```text
On branch feature/login-page
```

---

# 9. Work on Your Task

Now you can modify the project.

For example:

```text
src/
├── components/
├── pages/
├── services/
└── ...
```

Make only the changes required for your assigned task.

Avoid modifying unrelated files unless necessary.

---

# 10. Check Your Changes

Before committing, check which files have changed:

```bash
git status
```

Example:

```text
modified: src/components/Login.jsx
modified: src/pages/LoginPage.jsx
```

To see the actual changes:

```bash
git diff
```

Review your changes carefully.

---

# 11. Test Your Changes

Before creating a Pull Request, make sure your changes work correctly.

Run the project's required commands.

For example, if it is a Node/React project:

```bash
npm install
```

Then:

```bash
npm run dev
```

If the project contains tests:

```bash
npm test
```

If the project has a build command:

```bash
npm run build
```

> Use the commands defined by the project. Do not run commands that are not required for your part of the project.

---

# 12. Add Your Changes

After testing, stage your changes:

```bash
git add .
```

Or, preferably, add specific files:

```bash
git add src/components/Login.jsx
```

Check what is staged:

```bash
git status
```

---

# 13. Commit Your Changes

Create a meaningful commit:

```bash
git commit -m "Add login page"
```

Good commit messages:

```text
Add login page
Fix login validation
Add project dashboard
Update API integration
Fix navbar responsiveness
Add project creation form
Update authentication service
```

Avoid messages like:

```text
update
changes
done
test
abc
final
```

Your commit message should explain what you changed.

---

# 14. Push Your Branch

The first time you push a new branch:

```bash
git push -u origin feature/login-page
```

Replace the branch name with your own branch.

For example:

```bash
git push -u origin feature/project-dashboard
```

After the first push, you can normally use:

```bash
git push
```

---

# 15. Create a Pull Request

After pushing your branch, go to the GitHub repository.

You should see an option such as:

```text
Compare & pull request
```

Click it.

Set:

```text
base: main
compare: feature/login-page
```

Your Pull Request should look like:

```text
feature/login-page  →  main
```

---

# 16. Pull Request Title

Use a clear title.

Good examples:

```text
Add login page
Fix authentication validation
Add project dashboard
Implement project creation
Fix dashboard responsive layout
Add project API integration
```

Avoid:

```text
Update
Changes
My work
Please merge
Final
```

---

# 17. Pull Request Description

Explain what you changed.

A good Pull Request description should include:

```text
## What was changed?

- Added login page
- Added email/password validation
- Added login API integration

## Testing

- Tested login with valid credentials
- Tested invalid credentials
- Tested empty fields

## Screenshots

Add screenshots if the changes affect the UI.
```

---

# 18. Pull Request Review

After creating the Pull Request, the maintainer will review your changes.

There are three possible outcomes.

### Approved

Your Pull Request is approved and can be merged.

```text
feature/login-page
        ↓
   Pull Request
        ↓
     Approved
        ↓
       main
```

### Changes requested

The maintainer may request changes.

For example:

```text
Please improve the validation logic.
```

Do not create another Pull Request.

Simply make the requested changes on the **same branch**.

---

# 19. Making Changes After Review

If changes are requested, stay on your existing branch:

```bash
git checkout feature/login-page
```

Make the requested changes.

Then:

```bash
git add .
```

Commit:

```bash
git commit -m "Fix login validation"
```

Push:

```bash
git push
```

The existing Pull Request will automatically update.

You do **not** need to create another Pull Request.

---

# 20. Keep Your Branch Updated

Sometimes other contributors' Pull Requests get merged while you are working.

Your branch may then become outdated.

First, make sure all your current work is committed:

```bash
git status
```

Then update `main`:

```bash
git checkout main
git pull origin main
```

Go back to your branch:

```bash
git checkout feature/login-page
```

Then merge the latest `main` into your branch:

```bash
git merge main
```

If there are no conflicts:

```bash
git push
```

Your Pull Request will now contain the latest version of `main`.

---

# 21. Handling Merge Conflicts

Sometimes Git will report a conflict:

```text
CONFLICT (content): Merge conflict in ...
```

Run:

```bash
git status
```

Git will tell you which files have conflicts.

Open the conflicted files.

You may see:

```text
<<<<<<< HEAD
Your changes
=======
Changes from main
>>>>>>> main
```

Decide which code should remain.

Remove the conflict markers:

```text
<<<<<<< HEAD
=======
>>>>>>> main
```

Then save the file.

Stage the resolved file:

```bash
git add .
```

Complete the merge:

```bash
git commit -m "Resolve merge conflicts"
```

Push the updated branch:

```bash
git push
```

Your Pull Request will update automatically.

---

# 22. Important: Do Not Push to Main

As a contributor, do NOT run:

```bash
git push origin main
```

Your direct push to `main` will be blocked by the repository rules.

Instead:

```bash
git push origin your-branch-name
```

For example:

```bash
git push origin feature/login-page
```

Then create a Pull Request.

---

# 23. After Your Pull Request Is Merged

Once your Pull Request has been merged, update your local `main`:

```bash
git checkout main
git pull origin main
```

You can delete your local feature branch:

```bash
git branch -d feature/login-page
```

Delete the remote branch:

```bash
git push origin --delete feature/login-page
```

> GitHub may also provide a **Delete branch** button after the Pull Request is merged.

---

# 24. Starting Your Next Task

Always start from the latest `main`.

```bash
git checkout main
git pull origin main
```

Create a new branch:

```bash
git checkout -b feature/new-feature
```

Then work normally:

```bash
git add .
git commit -m "Add new feature"
git push -u origin feature/new-feature
```

Create a Pull Request.

---

# 25. Complete Example

Suppose you are assigned:

> Create the project dashboard.

### Step 1 — Update main

```bash
git checkout main
git pull origin main
```

### Step 2 — Create branch

```bash
git checkout -b feature/project-dashboard
```

### Step 3 — Make your changes

Edit the required files.

### Step 4 — Check changes

```bash
git status
git diff
```

### Step 5 — Test

Run the required project tests/build commands.

### Step 6 — Stage

```bash
git add .
```

### Step 7 — Commit

```bash
git commit -m "Add project dashboard"
```

### Step 8 — Push

```bash
git push -u origin feature/project-dashboard
```

### Step 9 — Create Pull Request

On GitHub:

```text
feature/project-dashboard
            ↓
      Pull Request
            ↓
          main
```

### Step 10 — Review

Wait for the maintainer to review your Pull Request.

### Step 11 — If changes are requested

Make changes:

```bash
git add .
git commit -m "Fix dashboard layout"
git push
```

The same Pull Request will update.

### Step 12 — After approval

The maintainer merges the Pull Request into `main`.

### Step 13 — Update local repository

```bash
git checkout main
git pull origin main
```

---

# 26. Useful Git Commands

### Check current branch

```bash
git branch
```

### Check repository status

```bash
git status
```

### Show all branches

```bash
git branch -a
```

### Create a branch

```bash
git checkout -b branch-name
```

### Switch branch

```bash
git checkout branch-name
```

### Update main

```bash
git checkout main
git pull origin main
```

### Stage changes

```bash
git add .
```

### Commit

```bash
git commit -m "Your message"
```

### Push branch

```bash
git push -u origin branch-name
```

### Push after the first push

```bash
git push
```

### View commit history

```bash
git log --oneline
```

### See changes

```bash
git diff
```

### Delete local branch

```bash
git branch -d branch-name
```

### Delete remote branch

```bash
git push origin --delete branch-name
```

---

# 27. What Contributors Should NOT Do

### ❌ Do not work directly on main

```bash
git checkout main
```

and start making project changes.

Instead create a branch.

### ❌ Do not push directly to main

```bash
git push origin main
```

### ❌ Do not use force push

Avoid:

```bash
git push --force
```

especially on shared branches.

### ❌ Do not create unnecessary Pull Requests

If your existing Pull Request needs changes, update the **same branch**.

### ❌ Do not mix unrelated tasks

For example, if your task is:

```text
Add login page
```

Do not also change:

```text
Dashboard
Database
Navbar
Documentation
```

unless those changes are required.

### ❌ Do not commit sensitive information

Never commit:

```text
.env
API keys
Passwords
Database credentials
Access tokens
Private keys
```

Use environment variables instead.

---

# 28. Recommended Commit Workflow

For every task, follow:

```bash
git checkout main
git pull origin main

git checkout -b feature/your-feature

# Make your changes

git status
git diff

# Test your changes

git add .
git commit -m "Describe your changes"

git push -u origin feature/your-feature
```

Then create a Pull Request on GitHub.

---

# 29. Recommended Pull Request Workflow

```text
┌─────────────────────────┐
│ Update local main       │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ Create feature branch   │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ Write code              │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ Test changes            │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ Commit changes           │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ Push feature branch     │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ Create Pull Request     │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ Code review             │
└────────────┬────────────┘
             ↓
       ┌─────┴─────┐
       ↓           ↓
   Changes      Approved
   requested       │
       │           ↓
       │       Merge to main
       │
       └──► Fix → Commit → Push
                    │
                    └──► PR updates
```

---

# 30. Golden Rules

Always remember these rules:

1. **Never push directly to `main`.**
2. **Create a separate branch for every task.**
3. **Keep branch names meaningful.**
4. **Write meaningful commit messages.**
5. **Test your code before creating a Pull Request.**
6. **Keep Pull Requests focused on one task.**
7. **Respond to review comments.**
8. **Use the same branch when fixing requested changes.**
9. **Keep your branch updated with `main` when necessary.**
10. **Never commit passwords, API keys, or `.env` files.**
11. **Do not use force push on shared branches.**
12. **Delete your feature branch after the Pull Request is merged.**

---

# 31. Quick Reference

For a new task:

```bash
git checkout main
git pull origin main

git checkout -b feature/my-feature

# Make changes

git add .
git commit -m "Add my feature"

git push -u origin feature/my-feature
```

Then:

```text
GitHub
  ↓
Create Pull Request
  ↓
feature/my-feature → main
  ↓
Code Review
  ↓
Fix changes if requested
  ↓
Approval
  ↓
Merge
```

After merging:

```bash
git checkout main
git pull origin main
```

You are now ready for your next task.

---

## Thank You

Thank you for contributing to the **AI-Based Project Monitoring Platform**.

Please follow this workflow so that the project remains organized, stable, and easy for everyone to work on.
