# Repository Guidelines

## Project Structure & Module Organization

- Entry point: `index.js` contains the runtime behavior.
- Tests live in `tests/` (for example, `tests/echo.test.js`).
- Tooling config: `eslint.config.cjs`, `.prettierrc`, `.prettierignore`.
- If the app grows, add `src/` for modules and keep `index.js` as a thin bootstrap.

## Build, Test, and Development Commands

- `npm start` runs the app (`node index.js`).
- The server defaults to port `7`; override with `PORT=7000 npm start` for unprivileged ports.
- `npm test` runs the Node.js test runner (`node --test`).
- `npm run lint` checks code with ESLint.
- `npm run format` checks formatting with Prettier.
- `npm run format:write` auto-formats the repo.

## Coding Style & Naming Conventions

- Formatting is enforced by Prettier (`npm run format`).
- Linting uses ESLint with the flat config in `eslint.config.cjs`.
- Use clear, descriptive names; keep files in `tests/` named `*.test.js`.

## Testing Guidelines

- Tests use the built-in `node:test` runner.
- Add new tests under `tests/` with the `*.test.js` suffix.
- Run the full suite with `npm test`.

## Commit & Pull Request Guidelines

- Use imperative, scoped commit messages (e.g., `Add echo test`).
- PRs should include a short summary and test results (`npm test`).

## Agent-Specific Instructions

- If you add project instructions, keep them in this file so contributors and automation share a single source of truth.
