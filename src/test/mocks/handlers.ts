import { http, graphql, HttpResponse } from 'msw';
import {
  JobItem,
  ApplicationItem,
  LocationType,
  EmploymentType,
} from '../../features/seeker/types';
import { JobPosting, Applicant } from '../../features/employer/types';
import { ModerationJobItem } from '../../features/admin/types';

const dummyJobs: JobItem[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Engineer (React / TypeScript)',
    companyName: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    locationType: 'remote',
    employmentType: 'full-time',
    salaryRange: '$140,000 - $180,000',
    description:
      'Lead frontend architecture for our high-scale enterprise SaaS product using React 18 and Redux Toolkit.',
    tags: ['React', 'TypeScript', 'Redux', 'Tailwind'],
    postedAt: '2026-08-30T10:00:00.000Z',
  },
  {
    id: 'job-2',
    title: 'Full Stack Engineer (Node.js & React)',
    companyName: 'DataPulse Cloud',
    location: 'New York, NY',
    locationType: 'hybrid',
    employmentType: 'full-time',
    salaryRange: '$130,000 - $160,000',
    description:
      'Build robust REST and GraphQL API services backed by modern React web dashboards.',
    tags: ['Node.js', 'React', 'GraphQL', 'PostgreSQL'],
    postedAt: '2026-08-31T12:00:00.000Z',
  },
];

const dummyEmployerJobs: JobPosting[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Engineer (React / TypeScript)',
    department: 'Engineering',
    locationType: 'remote',
    employmentType: 'full-time',
    salaryRange: '$140,000 - $180,000',
    applicantCount: 14,
    status: 'active',
    createdAt: '2026-08-30T10:00:00.000Z',
  },
];

const dummyApplicants: Applicant[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Senior Frontend Engineer (React / TypeScript)',
    applicantName: 'Alex Morgan',
    applicantEmail: 'alex.seeker@example.com',
    portfolioUrl: 'https://github.com/alex-seeker',
    stage: 'screening',
    appliedAt: '2026-08-31T15:00:00.000Z',
  },
];

const dummyModerationQueue: ModerationJobItem[] = [
  {
    id: 'job-3',
    title: 'DevOps Lead Engineer',
    companyName: 'CloudScale Inc',
    submittedBy: 'recruiter@cloudscale.io',
    submittedAt: '2026-08-31T18:00:00.000Z',
    status: 'pending',
  },
];

export const handlers = [
  // Test error endpoint
  http.get('*/api/v1/error-test', () => {
    return HttpResponse.json({ message: 'Resource not found' }, { status: 404 });
  }),

  // Seeker API Handlers
  http.get('*/api/v1/jobs', ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    const locationType = url.searchParams.get('locationType');

    let filtered = [...dummyJobs];
    if (q) {
      filtered = filtered.filter((j) => j.title.toLowerCase().includes(q.toLowerCase()));
    }
    if (locationType && locationType !== 'all') {
      filtered = filtered.filter((j) => j.locationType === locationType);
    }
    return HttpResponse.json(filtered);
  }),

  http.post('*/api/v1/applications', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const newApp: ApplicationItem = {
      id: `app-${Date.now()}`,
      jobId: body.jobId as string,
      jobTitle: 'Senior Frontend Engineer (React / TypeScript)',
      companyName: 'TechCorp Solutions',
      status: 'submitted',
      appliedAt: new Date().toISOString(),
    };
    return HttpResponse.json(newApp, { status: 201 });
  }),

  // Employer API Handlers
  http.get('*/api/v1/employer/jobs', () => {
    return HttpResponse.json(dummyEmployerJobs);
  }),

  http.post('*/api/v1/employer/jobs', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const newJob: JobPosting = {
      id: `job-${Date.now()}`,
      title: body.title as string,
      department: body.department as string,
      locationType: (body.locationType as LocationType) || 'remote',
      employmentType: (body.employmentType as EmploymentType) || 'full-time',
      salaryRange: `$${body.salaryMin} - $${body.salaryMax}`,
      applicantCount: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    dummyEmployerJobs.push(newJob);
    return HttpResponse.json(newJob, { status: 201 });
  }),

  http.get('*/api/v1/employer/applicants', () => {
    return HttpResponse.json(dummyApplicants);
  }),

  // Admin API Handlers
  http.get('*/api/v1/admin/moderation', () => {
    return HttpResponse.json(dummyModerationQueue);
  }),

  http.post('*/api/v1/admin/moderation/:id/approve', () => {
    return HttpResponse.json({ success: true });
  }),

  http.post('*/api/v1/admin/moderation/:id/reject', () => {
    return HttpResponse.json({ success: true });
  }),

  // Admin GraphQL Stats Query
  graphql.query('GetPlatformStats', () => {
    return HttpResponse.json({
      data: {
        platformStats: {
          totalSeekers: 12450,
          totalEmployers: 840,
          totalJobsPosted: 3120,
          activeModerationCount: dummyModerationQueue.length,
          monthlyRevenue: 145000,
        },
      },
    });
  }),
];
