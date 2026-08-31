import React from 'react';
import { PlatformStatsCards } from '../components/PlatformStatsCards';
import { ModerationQueueTable } from '../components/ModerationQueueTable';
import { useGetModerationQueue } from '../hooks/useGetModerationQueue';
import { useAppDispatch } from '../../../app/store';
import { addToast } from '../../../app/store/uiSlice';

export const AdminDashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: queue, isLoading, refetch } = useGetModerationQueue();

  const handleApprove = (id: string) => {
    dispatch(
      addToast({
        type: 'success',
        title: 'Job Posting Approved',
        message: `Job ${id} approved and published to seeker portal.`,
      })
    );
    refetch();
  };

  const handleReject = (id: string) => {
    dispatch(
      addToast({
        type: 'warning',
        title: 'Job Posting Rejected',
        message: `Job ${id} rejected and returned to employer.`,
      })
    );
    refetch();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Platform Governance & Overview</h1>
        <p className="text-xs text-surface-400 mt-1">
          Monitor platform metrics, process employer job moderation queues, and oversee system
          operations.
        </p>
      </div>

      <PlatformStatsCards />

      <div className="space-y-4 pt-4">
        <h2 className="text-base font-bold text-white">Pending Job Posting Moderation Queue</h2>
        <ModerationQueueTable
          queue={queue}
          isLoading={isLoading}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </div>
  );
};
