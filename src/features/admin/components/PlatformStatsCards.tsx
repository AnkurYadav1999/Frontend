import React from 'react';
import { Users, Building2, Briefcase, DollarSign } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Skeleton } from '../../../components/ui/Skeleton';
import { useGetPlatformStats } from '../hooks/useGetPlatformStats';

export const PlatformStatsCards: React.FC = () => {
  const { data, isLoading } = useGetPlatformStats();
  const stats = data?.platformStats;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((n) => (
          <Skeleton key={n} height={80} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        header={
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-brand-400" />
            <span className="text-xs font-semibold">Total Job Seekers</span>
          </div>
        }
      >
        <div className="text-2xl font-extrabold text-white">
          {stats?.totalSeekers?.toLocaleString() ?? 0}
        </div>
      </Card>

      <Card
        header={
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold">Verified Employers</span>
          </div>
        }
      >
        <div className="text-2xl font-extrabold text-white">
          {stats?.totalEmployers?.toLocaleString() ?? 0}
        </div>
      </Card>

      <Card
        header={
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-semibold">Total Postings Published</span>
          </div>
        }
      >
        <div className="text-2xl font-extrabold text-white">
          {stats?.totalJobsPosted?.toLocaleString() ?? 0}
        </div>
      </Card>

      <Card
        header={
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold">ARR Platform Revenue</span>
          </div>
        }
      >
        <div className="text-2xl font-extrabold text-white">
          ${stats?.monthlyRevenue ? (stats.monthlyRevenue * 12).toLocaleString() : '0'}
        </div>
      </Card>
    </div>
  );
};
