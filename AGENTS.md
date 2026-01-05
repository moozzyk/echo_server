# Repository Guidelines

## Project Structure & Module Organization

- Current state: the repository contains only the `.git` directory and no tracked source files yet.
- Suggested layout as the project grows:
  - `src/` for application code
  - `tests/` for unit/integration tests
  - `scripts/` for tooling and developer utilities
  - `docs/` for design notes and operational guides

## Build, Test, and Development Commands

- No build or test commands are defined yet. Add them to this section once a build system is introduced.
- Example patterns to adopt when ready:
  - `make build` for compiling or packaging
  - `make test` or `npm test` for running the test suite
  - `make run` or `npm start` for local execution

## Coding Style & Naming Conventions

- No formatting or linting rules are established yet.
- When adding code, document:
  - Indentation (e.g., 2 or 4 spaces)
  - File naming conventions (e.g., `snake_case` or `kebab-case`)
  - Lint/format tools (e.g., `ruff`, `gofmt`, `prettier`)

## Testing Guidelines

- No testing framework is configured yet.
- When tests are added, document:
  - Frameworks used (e.g., `pytest`, `go test`, `jest`)
  - Naming pattern (e.g., `*_test.go`, `test_*.py`)
  - How to run full vs. focused test runs

## Commit & Pull Request Guidelines

- No commit history exists, so no conventions are established.
- When starting, prefer clear, imperative commit messages (e.g., `Add echo handler`).
- Pull requests should include:
  - A short summary of changes
  - Linked issues (if applicable)
  - Test results or verification notes

## Agent-Specific Instructions

- If you add project instructions, keep them in this file so contributors and automation share a single source of truth.
