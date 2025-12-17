# CONTRIBUTION CONVENTIONS
To ensure consistency and smooth collaboration across the project, all contributors are expected to follow the conventions and structures outlined below.

## Branch Strategy
Our branching strategy is structured into multiple layers to keep development clean and organized.

We use the following main branches:

- **main** – always stable, production-ready code  
- **develop** – integration branch for all features before going to main  
- **frontend** – collects all frontend feature branches  
- **backend** – collects all backend feature branches  

---

### How Feature Development Works

When adding a new feature — for example, a login page — each team creates a feature branch based on their area:

- **Frontend:** `feature/frontend-login`  
- **Backend:** `feature/backend-login`  

Once the frontend developer completes the login page, the branch is merged into the **frontend** branch.  
Another teammate might work on the register page (`feature/frontend-register`) and merge that into **frontend** as well.

Inside the **frontend** branch, we ensure both features work smoothly together — for example, verifying that navigation between Login and Register works correctly.

When everything is consistent, the **frontend** branch is merged into **develop**.

The backend team follows the same process:  
individual backend features → merged into **backend** → validated → then merged into **develop**.

---

### Final Integration

Inside **develop**, we verify the complete interaction between frontend and backend.  
If login and register work end-to-end and the whole system behaves as expected, the changes are merged into **main**.

This approach ensures a clean and functional strategy from individual features all the way to stable code.

## Commit Messages
Commit messages must always use the imperative form:
```python
# RIGHT WAY
git commit -m "feat: add user login"

# WRONG WAY
git commit -m "feat: added user login"
git commit -m "feat: adds user login"
```

### Detailed Commit Type Overview
| Commit Type   | When to Use It                                            | Examples                                                  |
| ------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| **feat:**     | Adding a new feature or expanding functionality           | New API endpoint, new UI component, new DB logic          |
| **fix:**      | Fixing a bug or incorrect behavior                        | Typo causing an error, wrong calculation                  |
| **docs:**     | Documentation-only changes                                | README, comments, API docs                                |
| **style:**    | Code changes that do **not** affect behavior              | Formatting, whitespace, non-breaking typos                |
| **refactor:** | Code restructuring without adding features or fixing bugs | Cleanup, reorganizing code                                |
| **test:**     | Adding or modifying tests                                 | Unit tests, integration tests, E2E tests                  |
| **perf:**     | Performance improvements                                  | Caching, faster algorithm                                 |
| **chore:**    | Project maintenance tasks, configs, tooling               | `.gitignore` updates, dependency updates, cleanup scripts |
| **ci:**       | Changes to CI/CD configuration                            | GitHub Actions, pipelines                                 |
| **build:**    | Changes to the build system or dependencies               | Webpack, package updates                                  |

### Quick Commit Type Overview
| Commit Type   | When to Use                                             |
| ------------  | ------------------------------------------------------  |
| **feat:**     | You add a feature                                      |
| **fix:**      | You fix a bug                                          |
| **docs:**     | You change documentation                               |
| **style:**    | You change formatting or a harmless typo               |
| **refactor:** | You reorganize or improve code structure               |
| **test:**     | You add or modify tests                                |
| **perf:**     | You improve perf                               |
| **chore:**    | You change project configuration                       |
| **ci:**       | You adjust CI/CD pipelines                             |
| **build:**    | You modify build processes or dependencies             |


## Merge Commit Convention

Merge commits document **why** and **what** is being integrated between branches. They summarize a completed unit of work (feature set, fixes, refactors) and must be readable without inspecting individual commits.

### Merge Commit Template

```text
<type>(<scope>): merge <source-branch> into <target-branch>

Short summary of the integrated changes.
Optional second line for important context, risks, or behavior changes.
```

**Rules:**

* Use the same commit `type` definitions as above (`feat`, `fix`, `refactor`, etc.).
* Use scopes when helpful (e.g. `auth`, `map`, `frontend`, `backend`).
* Do **not** list technical merge details (conflicts, files changed).
* If behavior changes for consumers, clearly state it.

### Example Merge Commit

```text
feat(auth,map): merge backend and frontend into develop

Updates JWT handling for mobile clients without cookie support.
Fixes multiple Leaflet issues to improve map stability and user experience.
```

This ensures merge commits serve as high-level documentation of integration steps across branches.