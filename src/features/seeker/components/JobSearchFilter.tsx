import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { EmploymentType, JobFilterInput, LocationType } from '../types';

interface JobSearchFilterProps {
  filter: JobFilterInput;
  onChange: (newFilter: JobFilterInput) => void;
}

export const JobSearchFilter: React.FC<JobSearchFilterProps> = ({ filter, onChange }) => {
  return (
    <div className="bg-white dark:bg-surface-900 p-4 rounded-xl border border-surface-200 dark:border-surface-800 shadow-sm space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
      <div className="flex-1">
        <Input
          placeholder="Search job title, skill, or keyword..."
          value={filter.query || ''}
          onChange={(e) => onChange({ ...filter, query: e.target.value })}
          leftIcon={<Search className="w-4 h-4" />}
        />
      </div>

      <div className="w-full sm:w-48">
        <Select
          value={filter.locationType || 'all'}
          onChange={(e) =>
            onChange({ ...filter, locationType: e.target.value as LocationType | 'all' })
          }
          options={[
            { label: 'All Work Types', value: 'all' },
            { label: 'Remote', value: 'remote' },
            { label: 'Hybrid', value: 'hybrid' },
            { label: 'Onsite', value: 'onsite' },
          ]}
        />
      </div>

      <div className="w-full sm:w-48">
        <Select
          value={filter.employmentType || 'all'}
          onChange={(e) =>
            onChange({ ...filter, employmentType: e.target.value as EmploymentType | 'all' })
          }
          options={[
            { label: 'All Employment', value: 'all' },
            { label: 'Full-time', value: 'full-time' },
            { label: 'Part-time', value: 'part-time' },
            { label: 'Contract', value: 'contract' },
          ]}
        />
      </div>
    </div>
  );
};
