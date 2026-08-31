# Multi-Role SaaS Job Platform Architectural Specification

This document details the architectural boundaries, role-based access controls, and technical standards governing the SaaS Job Platform.

---

## 1. Role-Based Frontend Architecture

The frontend is structured into 4 distinct user portal experiences:

```text
                               ┌─────────────────────────┐
                               │     Public Visitor      │
                               └────────────┬────────────┘
                                            │
                                            ▼
                                     MarketingLayout
                                            │
                     ┌──────────────────────┼──────────────────────┐
                     │                      │                      │
                     ▼                      ▼                      ▼
               Seeker Portal          Employer Studio        Platform Admin
              (SeekerLayout)         (EmployerLayout)        (AdminLayout)
                     │                      │                      │
                     ▼                      ▼                      ▼
                 RoleGuard              RoleGuard              RoleGuard
            allowedRoles: seeker   allowedRoles: employer  allowedRoles: admin
```

1. **Public Marketing (`/`)**: Unauthenticated landing page, job previews, pricing tiers.
2. **Job Seeker Portal (`/seeker`)**: Job search filters, job application submission, applicant profile.
3. **Employer Studio (`/employer`)**: Job post creation modal, active job table, candidate ATS pipeline tracking.
4. **Platform Admin (`/admin`)**: Platform telemetry, job posting moderation approval queue, revenue dashboard.

---

## 2. Dual State Management Strategy

### Redux Toolkit (Client / Application State)

Used **exclusively** for true client application state:
- Active user role (`guest`, `seeker`, `employer`, `admin`)
- User session profile context (`authSlice`)
- Theme settings (`light` vs `dark`)
- Sidebar toggle state & global toast notifications queue (`uiSlice`)

### TanStack Query (Server State)

Used for **all backend data operations**:
- Caching REST & GraphQL responses
- Background refetching on job creation or application submission
- Pagination & infinite scroll queries
- Mutations with optimistic UI updates

---

## 3. Form Validation Architecture

All interactive forms (e.g. `CreateJobModal`, `ApplyJobModal`) follow a unified pattern:

$$\text{React Hook Form} \longrightarrow \text{Zod Schema} \longrightarrow \text{Typed Form Data} \longrightarrow \text{TanStack Query Mutation}$$

- `createJobPostingSchema.ts`: Validates title, department, work type, employment type, min/max salary range, description.
- `applyJobSchema.ts`: Validates name, email, portfolio URL, cover letter, experience years.
