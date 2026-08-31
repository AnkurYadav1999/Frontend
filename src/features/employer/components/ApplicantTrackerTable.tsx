import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Applicant } from '../types';
import { Badge } from '../../../components/ui/Badge';
import { Skeleton } from '../../../components/ui/Skeleton';
import { EmptyState } from '../../../components/ui/EmptyState';

interface ApplicantTrackerTableProps {
  applicants?: Applicant[];
  isLoading: boolean;
}

export const ApplicantTrackerTable: React.FC<ApplicantTrackerTableProps> = ({
  applicants,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((n) => (
          <Skeleton key={n} height={50} />
        ))}
      </div>
    );
  }

  if (!applicants || applicants.length === 0) {
    return (
      <EmptyState
        title="No Applicants Received Yet"
        description="Applicants submitting through the Job Seeker portal will appear here."
      />
    );
  }

  const stageVariant: Record<string, 'info' | 'warning' | 'success' | 'error' | 'neutral'> = {
    applied: 'info',
    screening: 'warning',
    interview: 'info',
    offer: 'success',
    rejected: 'error',
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm">
      <table className="w-full text-left text-xs">
        <thead className="bg-surface-100/60 dark:bg-surface-800/60 border-b border-surface-200 dark:border-surface-800 uppercase font-semibold text-surface-500">
          <tr>
            <th className="px-4 py-3">Applicant Name</th>
            <th className="px-4 py-3">Target Position</th>
            <th className="px-4 py-3">Portfolio</th>
            <th className="px-4 py-3">ATS Stage</th>
            <th className="px-4 py-3">Applied Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-100 dark:divide-surface-800 font-medium">
          {applicants.map((app) => (
            <tr
              key={app.id}
              className="hover:bg-surface-50 dark:hover:bg-surface-800/40 transition-colors"
            >
              <td className="px-4 py-3 font-semibold text-surface-900 dark:text-surface-100">
                <div>{app.applicantName}</div>
                <div className="text-[10px] text-surface-500 font-normal">{app.applicantEmail}</div>
              </td>
              <td className="px-4 py-3 font-medium text-surface-700 dark:text-surface-300">
                {app.jobTitle}
              </td>
              <td className="px-4 py-3">
                {app.portfolioUrl ? (
                  <a
                    href={app.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 hover:underline font-mono"
                  >
                    <span>View Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-surface-400">N/A</span>
                )}
              </td>
              <td className="px-4 py-3">
                <Badge variant={stageVariant[app.stage] || 'neutral'}>
                  {app.stage.toUpperCase()}
                </Badge>
              </td>
              <td className="px-4 py-3 text-surface-500 font-mono">
                {new Date(app.appliedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
