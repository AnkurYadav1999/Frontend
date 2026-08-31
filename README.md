# Enterprise SaaS Job Platform Frontend Architecture

A production-ready, modular, multi-role React 18 + TypeScript SaaS platform architecture built for job portals, supporting:
1. **Public Marketing Site**: Landing page, job ticker, employer recruitment CTAs, pricing tiers.
2. **Job Seeker Portal**: Job discovery, location/work type filters, job applications with Zod validation, saved jobs.
3. **Employer / Job Poster Studio**: Dashboard, create job posting forms (RHF + Zod), applicant tracking system (ATS) pipeline.
4. **Platform Administration**: Real-time platform telemetry, job posting moderation queue, revenue metrics.

---

## Technical Stack

- **UI & Component Layer**: React 18, TypeScript (Strict Mode), Tailwind CSS, Lucide Icons.
- **Client Application State**: **Redux Toolkit** + `react-redux` (restricted strictly to client/UI state such as active user role, session context, theme, toast notifications queue).
- **Server State & Data Caching**: **TanStack Query (React Query v5)** (owns REST/GraphQL API caching, background sync, pagination, and optimistic mutations).
- **Forms & Runtime Validation**: **React Hook Form** + **Zod** + `@hookform/resolvers/zod`.
- **Backend Communication**:
  - **REST API (`HttpClient`)**: Centralized, native `fetch`-based abstraction with request/response interceptors, AbortController cancellation, authorization headers, and automatic retries.
  - **GraphQL API (`GraphQLClient`)**: Dedicated client for GraphQL queries and mutations with variables and typed responses.
- **Role-Based Access Control**: `RoleGuard` component enforcing role authorization (`guest`, `seeker`, `employer`, `admin`).
- **Testing & Quality**: Vitest, React Testing Library, `@testing-library/user-event`, **MSW (Mock Service Worker)** for network mocking, ESLint, Prettier.

---

## Directory Architecture

```text
src/
├── app/                  # Application Core & Global Providers
│   ├── providers/        # Redux, QueryClient, Theme, ErrorBoundary
│   ├── store/            # Redux store & typed hooks
│   └── App.tsx           # Main application entry
│
├── features/             # SaaS Feature Slices
│   ├── auth/             # Session state, user profiles, interactive RoleSwitcher
│   ├── marketing/        # Public landing page, pricing plans, recruitment CTAs
│   ├── seeker/           # Job search, location filters, job application modal, applications
│   ├── employer/         # Job post creation modal, active postings table, candidate ATS
│   └── admin/            # Moderation queue, approve/reject workflow, platform stats
│
├── components/           # Reusable Design System & Layouts
│   ├── ui/               # Primitive components (Button, Input, Select, Modal, Card, etc.)
│   ├── layout/           # Role-Specific Layouts (MarketingLayout, SeekerLayout, EmployerLayout, AdminLayout)
│   └── feedback/         # Error boundaries, async boundaries, spinners, toasts
│
├── lib/                  # Core Infrastructure Layer
│   ├── config/           # Startup environment validation with Zod
│   ├── error/            # Normalized AppError hierarchy
│   ├── http/             # Typed HttpClient abstraction (REST)
│   ├── graphql/          # Typed GraphQLClient abstraction
│   ├── auth/             # Session token manager & role definitions
│   ├── logging/          # Configurable console logger
│   └── observability/    # Extensible Sentry/Datadog adapters
│
├── pages/                # General pages (SettingsPage, NotFoundPage)
├── routes/               # Central router & RoleGuard definitions
├── styles/               # Global CSS & Tailwind design tokens
└── test/                 # Vitest setup & MSW network mocking handlers
```

---

## Available NPM Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `vite` | Starts local development server on port 3000 with MSW mocking. |
| `build` | `tsc && vite build` | Compiles TypeScript and builds production distribution bundle. |
| `preview` | `vite preview` | Previews the production build locally. |
| `test` | `vitest run` | Runs unit, component, and hook automated tests once. |
| `test:watch` | `vitest` | Launches Vitest in interactive watch mode. |
| `test:coverage` | `vitest run --coverage` | Generates detailed test coverage reports. |
| `typecheck` | `tsc --noEmit` | Performs strict TypeScript type checking. |
| `lint` | `eslint . --ext ts,tsx` | Evaluates ESLint rules across the codebase. |
| `format` | `prettier --write ...` | Formats all code with Prettier. |
