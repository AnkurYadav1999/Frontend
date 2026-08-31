import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applyJobSchema, ApplyJobSchemaType } from '../schemas/applyJobSchema';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { useApplyJob } from '../hooks/useApplyJob';
import { JobItem } from '../types';
import { useAppSelector } from '../../../app/store';

interface ApplyJobModalProps {
  job: JobItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ApplyJobModal: React.FC<ApplyJobModalProps> = ({ job, isOpen, onClose }) => {
  const applyMutation = useApplyJob();
  const user = useAppSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ApplyJobSchemaType>({
    resolver: zodResolver(applyJobSchema),
    defaultValues: {
      jobId: job?.id || '',
      applicantName: user?.name || '',
      applicantEmail: user?.email || '',
      portfolioUrl: '',
      coverLetter: '',
      yearsOfExperience: 2,
    },
  });

  useEffect(() => {
    if (job) {
      setValue('jobId', job.id);
    }
    if (user) {
      setValue('applicantName', user.name);
      setValue('applicantEmail', user.email);
    }
  }, [job, user, setValue]);

  const onSubmit = (data: ApplyJobSchemaType) => {
    applyMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  if (!job) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Apply to ${job.title} at ${job.companyName}`}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="p-3 rounded-lg bg-surface-100 dark:bg-surface-800/60 text-xs text-surface-600 dark:text-surface-300">
          <p className="font-semibold text-surface-900 dark:text-surface-100">{job.title}</p>
          <p>
            {job.companyName} • {job.location} ({job.locationType.toUpperCase()})
          </p>
        </div>

        <Input
          label="Full Name"
          error={errors.applicantName?.message}
          {...register('applicantName')}
        />

        <Input
          label="Email Address"
          type="email"
          error={errors.applicantEmail?.message}
          {...register('applicantEmail')}
        />

        <Input
          label="Portfolio / LinkedIn URL (Optional)"
          placeholder="https://github.com/username or portfolio link"
          error={errors.portfolioUrl?.message}
          {...register('portfolioUrl')}
        />

        <Input
          type="number"
          label="Years of Relevant Experience"
          min={0}
          max={40}
          error={errors.yearsOfExperience?.message}
          {...register('yearsOfExperience')}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-300">
            Cover Letter / Why you are a great fit
          </label>
          <textarea
            rows={4}
            placeholder="Share why your skills align with this position..."
            className={`w-full rounded-lg border text-sm transition-colors p-3 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              errors.coverLetter
                ? 'border-red-500 bg-red-50/20 dark:bg-red-950/20 text-red-900'
                : 'border-surface-300 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100'
            }`}
            {...register('coverLetter')}
          />
          {errors.coverLetter && (
            <p className="text-xs text-red-600 dark:text-red-400 font-medium">
              {errors.coverLetter.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" size="sm" isLoading={applyMutation.isPending}>
            Submit Application
          </Button>
        </div>
      </form>
    </Modal>
  );
};
