import React, { useState } from 'react';
import { JobSearchFilter } from '../components/JobSearchFilter';
import { JobCardList } from '../components/JobCardList';
import { ApplyJobModal } from '../components/ApplyJobModal';
import { useGetJobs } from '../hooks/useGetJobs';
import { JobFilterInput, JobItem } from '../types';

export const SeekerDashboardPage: React.FC = () => {
  const [filter, setFilter] = useState<JobFilterInput>({
    query: '',
    locationType: 'all',
    employmentType: 'all',
  });
  const [selectedJobForApply, setSelectedJobForApply] = useState<JobItem | null>(null);

  const { data: jobs, isLoading, isError } = useGetJobs(filter);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
          Job Discovery & Opportunities
        </h1>
        <p className="text-xs text-surface-500 mt-1">
          Explore remote and tech roles at verified SaaS & enterprise employers.
        </p>
      </div>

      <JobSearchFilter filter={filter} onChange={setFilter} />

      <JobCardList
        jobs={jobs}
        isLoading={isLoading}
        isError={isError}
        onApply={(job) => setSelectedJobForApply(job)}
      />

      <ApplyJobModal
        job={selectedJobForApply}
        isOpen={Boolean(selectedJobForApply)}
        onClose={() => setSelectedJobForApply(null)}
      />
    </div>
  );
};
