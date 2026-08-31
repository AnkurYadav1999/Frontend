import React from 'react';
import { Users } from 'lucide-react';
import { JobPosting } from '../types';
import { Badge } from '../../../components/ui/Badge';
import { Skeleton } from '../../../components/ui/Skeleton';
import { EmptyState } from '../../../components/ui/EmptyState';

interface EmployerJobTableProps {
  jobs?: JobPosting[];
  isLoading: boolean;
  isError: boolean;
}

export const EmployerJobTable: React.FC<EmployerJobTableProps> = ({ jobs, isLoading, isError }) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((n) => (
          <Skeleton key={n} height={50} />
        ))}
      </div>
    );
  }

  if (isError || !jobs || jobs.length === 0) {
    return (
      <EmptyState
        title="No Active Job Listings"
        description="Click 'Post New Job' to create your first posting."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm">
      <table className="w-full text-left text-xs">
        <thead className="bg-surface-100/60 dark:bg-surface-800/60 border-b border-surface-200 dark:border-surface-800 uppercase font-semibold text-surface-500">
          <tr>
            <th className="px-4 py-3">Position Title</th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Salary Range</th>
            <th className="px-4 py-3 text-center">Applicants</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-100 dark:divide-surface-800 font-medium">
          {jobs.map((job) => (
            <tr
              key={job.id}
              className="hover:bg-surface-50 dark:hover:bg-surface-800/40 transition-colors"
            >
              <td className="px-4 py-3 font-semibold text-surface-900 dark:text-surface-100">
                {job.title}
              </td>
              <td className="px-4 py-3 text-surface-600 dark:text-surface-400">{job.department}</td>
              <td className="px-4 py-3">
                <span className="capitalize">
                  {job.locationType} • {job.employmentType}
                </span>
              </td>
              <td className="px-4 py-3 font-mono">{job.salaryRange}</td>
              <td className="px-4 py-3 text-center font-bold text-brand-600 dark:text-brand-400">
                <div className="inline-flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{job.applicantCount}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <Badge variant={job.status === 'active' ? 'success' : 'neutral'}>
                  {job.status.toUpperCase()}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
