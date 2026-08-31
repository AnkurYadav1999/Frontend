# Developer Contributing & Onboarding Guide

Welcome to the Enterprise React Frontend codebase. Follow these guidelines to maintain high architectural quality and consistency across teams.

---

## Creating a New Feature

When introducing a new domain feature to the application:

1. Create a new directory under `src/features/<your-feature-name>/`.
2. Follow the feature layout:
   ```text
   src/features/<your-feature-name>/
   ├── api/          # Endpoints & TanStack Query keys
   ├── components/   # Feature UI components
   ├── hooks/        # Custom query/mutation hooks
   ├── pages/        # Main feature page
   ├── schemas/      # Zod validation schemas
   ├── store/        # Redux slice (if feature needs client UI state)
   ├── types/        # Feature TypeScript models
   └── index.ts      # Public API exports
   ```
3. Export **only intentional public interfaces** from `index.ts`. Keep private utilities and internal subcomponents internal.

---

## Coding Standards & Rules

- **Type Safety**: Avoid using `any`. Use strict TypeScript types or Zod schemas.
- **State Selection**:
  - Use **TanStack Query** for API requests, caching, server errors, loading spinners.
  - Use **Redux Toolkit** for cross-component UI state, global settings, toasts, or complex client workflows.
  - Use `useState` for local component toggles.
- **Form Validation**: Always use React Hook Form paired with Zod schemas. Do not write ad-hoc validation logic inside `onChange` handlers.
- **Formatting & Linting**: Run `npm run format` and `npm run lint` before committing code.

---

## Submitting Pull Requests

Before opening a PR, ensure all checks pass:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
```

PRs with failing type checks, lint errors, or broken tests will be blocked.
