import React, { useState } from 'react';
import { Plus, Briefcase, Users, FileText } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { CreateJobModal } from '../components/CreateJobModal';
import { EmployerJobTable } from '../components/EmployerJobTable';
import { ApplicantTrackerTable } from '../components/ApplicantTrackerTable';
import { useGetEmployerJobs } from '../hooks/useGetEmployerJobs';
import { useGetApplicants } from '../hooks/useGetApplicants';

export const EmployerDashboardPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: jobs, isLoading: isJobsLoading, isError: isJobsError } = useGetEmployerJobs();
  const { data: applicants, isLoading: isApplicantsLoading } = useGetApplicants();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
            Employer & Recruiter Dashboard
          </h1>
          <p className="text-xs text-surface-500 mt-1">
            Manage your company job postings, review ATS applicants, and post new open roles.
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          size="sm"
        >
          Post New Position
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card
          header={
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold">Active Postings</span>
            </div>
          }
        >
          <div className="text-2xl font-extrabold text-surface-900 dark:text-surface-100">
            {jobs?.length ?? 0}
          </div>
        </Card>

        <Card
          header={
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-600" />
              <span className="text-xs font-semibold">Total Applicants</span>
            </div>
          }
        >
          <div className="text-2xl font-extrabold text-surface-900 dark:text-surface-100">
            {applicants?.length ?? 0}
          </div>
        </Card>

        <Card
          header={
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-semibold">Shortlisted Rate</span>
            </div>
          }
        >
          <div className="text-2xl font-extrabold text-surface-900 dark:text-surface-100">78%</div>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-bold text-surface-900 dark:text-surface-100">
          Active Job Postings
        </h2>
        <EmployerJobTable jobs={jobs} isLoading={isJobsLoading} isError={isJobsError} />
      </div>

      <div className="space-y-4 pt-4">
        <h2 className="text-base font-bold text-surface-900 dark:text-surface-100">
          Recent Candidate Applications (ATS)
        </h2>
        <ApplicantTrackerTable applicants={applicants} isLoading={isApplicantsLoading} />
      </div>

      <CreateJobModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
};
