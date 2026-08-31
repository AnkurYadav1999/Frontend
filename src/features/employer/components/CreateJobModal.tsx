import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createJobPostingSchema,
  CreateJobPostingSchemaType,
} from '../schemas/createJobPostingSchema';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import { useCreateJobPosting } from '../hooks/useCreateJobPosting';

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateJobModal: React.FC<CreateJobModalProps> = ({ isOpen, onClose }) => {
  const createJobMutation = useCreateJobPosting();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateJobPostingSchemaType>({
    resolver: zodResolver(createJobPostingSchema),
    defaultValues: {
      title: '',
      department: 'Engineering',
      locationType: 'remote',
      employmentType: 'full-time',
      salaryMin: 90000,
      salaryMax: 140000,
      description: '',
    },
  });

  const onSubmit = (data: CreateJobPostingSchemaType) => {
    createJobMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Post a New Position" size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Job Title"
          placeholder="e.g. Senior Frontend Engineer (React / TS)"
          error={errors.title?.message}
          {...register('title')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="Department"
            placeholder="Engineering, Product..."
            error={errors.department?.message}
            {...register('department')}
          />

          <Select
            label="Work Type"
            options={[
              { label: 'Remote', value: 'remote' },
              { label: 'Hybrid', value: 'hybrid' },
              { label: 'Onsite', value: 'onsite' },
            ]}
            error={errors.locationType?.message}
            {...register('locationType')}
          />

          <Select
            label="Employment"
            options={[
              { label: 'Full-time', value: 'full-time' },
              { label: 'Part-time', value: 'part-time' },
              { label: 'Contract', value: 'contract' },
            ]}
            error={errors.employmentType?.message}
            {...register('employmentType')}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            type="number"
            label="Minimum Salary ($)"
            error={errors.salaryMin?.message}
            {...register('salaryMin')}
          />

          <Input
            type="number"
            label="Maximum Salary ($)"
            error={errors.salaryMax?.message}
            {...register('salaryMax')}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-300">
            Job Description & Key Responsibilities
          </label>
          <textarea
            rows={4}
            placeholder="Detailed description of responsibilities, requirements, and tech stack..."
            className={`w-full rounded-lg border text-sm transition-colors p-3 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              errors.description
                ? 'border-red-500 bg-red-50/20 dark:bg-red-950/20 text-red-900'
                : 'border-surface-300 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100'
            }`}
            {...register('description')}
          />
          {errors.description && (
            <p className="text-xs text-red-600 dark:text-red-400 font-medium">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" size="sm" isLoading={createJobMutation.isPending}>
            Publish Job Listing
          </Button>
        </div>
      </form>
    </Modal>
  );
};
