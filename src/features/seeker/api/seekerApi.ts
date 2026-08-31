import { httpClient } from '../../../lib/http';
import { ApplyJobInput, ApplicationItem, JobFilterInput, JobItem } from '../types';

export const seekerKeys = {
  all: ['seeker'] as const,
  jobs: () => [...seekerKeys.all, 'jobs'] as const,
  jobList: (filter?: JobFilterInput) => [...seekerKeys.jobs(), { filter }] as const,
  applications: () => [...seekerKeys.all, 'applications'] as const,
};

export const seekerApi = {
  getJobs: async (filter?: JobFilterInput): Promise<JobItem[]> => {
    return httpClient.get<JobItem[]>('/api/v1/jobs', {
      params: {
        q: filter?.query || undefined,
        locationType: filter?.locationType !== 'all' ? filter?.locationType : undefined,
        employmentType: filter?.employmentType !== 'all' ? filter?.employmentType : undefined,
      },
    });
  },

  applyToJob: async (input: ApplyJobInput): Promise<ApplicationItem> => {
    return httpClient.post<ApplicationItem>('/api/v1/applications', input);
  },

  getApplications: async (): Promise<ApplicationItem[]> => {
    return httpClient.get<ApplicationItem[]>('/api/v1/applications');
  },
};
