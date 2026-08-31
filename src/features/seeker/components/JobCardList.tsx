import React from 'react';
import { MapPin, DollarSign, ArrowUpRight, Building } from 'lucide-react';
import { JobItem } from '../types';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Skeleton } from '../../../components/ui/Skeleton';
import { EmptyState } from '../../../components/ui/EmptyState';

interface JobCardListProps {
  jobs?: JobItem[];
  isLoading: boolean;
  isError: boolean;
  onApply: (job: JobItem) => void;
}

export const JobCardList: React.FC<JobCardListProps> = ({ jobs, isLoading, isError, onApply }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="p-5 rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 space-y-3"
          >
            <Skeleton width="50%" height={22} />
            <Skeleton width="30%" height={14} />
            <Skeleton width="100%" height={36} />
          </div>
        ))}
      </div>
    );
  }

  if (isError || !jobs || jobs.length === 0) {
    return (
      <EmptyState
        title="No Matching Jobs Found"
        description="Try adjusting your keyword query or location type filter to find active positions."
      />
    );
  }

  const locationBadge: Record<string, 'info' | 'success' | 'warning'> = {
    remote: 'success',
    hybrid: 'info',
    onsite: 'warning',
  };

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="p-6 rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold text-surface-900 dark:text-surface-100">
                {job.title}
              </h3>
              <Badge variant={locationBadge[job.locationType] || 'info'}>
                {job.locationType.toUpperCase()}
              </Badge>
              <Badge variant="neutral">{job.employmentType}</Badge>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-surface-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-brand-600" />
                <span>{job.companyName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>{job.salaryRange}</span>
              </div>
            </div>

            <p className="text-xs text-surface-600 dark:text-surface-400 line-clamp-2 leading-relaxed">
              {job.description}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {job.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-surface-100 dark:bg-surface-800 text-[11px] font-mono text-surface-600 dark:text-surface-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <Button
            onClick={() => onApply(job)}
            rightIcon={<ArrowUpRight className="w-4 h-4" />}
            size="sm"
            className="w-full md:w-auto"
          >
            Apply Now
          </Button>
        </div>
      ))}
    </div>
  );
};
