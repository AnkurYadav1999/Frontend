import { httpClient } from '../../../lib/http';
import { Applicant, CreateJobPostingInput, JobPosting } from '../types';

export const employerKeys = {
  all: ['employer'] as const,
  jobs: () => [...employerKeys.all, 'jobs'] as const,
  applicants: () => [...employerKeys.all, 'applicants'] as const,
};

export const employerApi = {
  getEmployerJobs: async (): Promise<JobPosting[]> => {
    return httpClient.get<JobPosting[]>('/api/v1/employer/jobs');
  },

  createJobPosting: async (input: CreateJobPostingInput): Promise<JobPosting> => {
    return httpClient.post<JobPosting>('/api/v1/employer/jobs', input);
  },

  getApplicants: async (): Promise<Applicant[]> => {
    return httpClient.get<Applicant[]>('/api/v1/employer/applicants');
  },

  updateApplicantStage: async (applicantId: string, stage: string): Promise<Applicant> => {
    return httpClient.patch<Applicant>(`/api/v1/employer/applicants/${applicantId}`, { stage });
  },
};
