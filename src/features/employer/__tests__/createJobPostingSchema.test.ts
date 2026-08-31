import { describe, it, expect } from 'vitest';
import { createJobPostingSchema } from '../schemas/createJobPostingSchema';

describe('createJobPostingSchema Zod Validation', () => {
  it('validates a valid job posting input payload', () => {
    const validData = {
      title: 'Senior React Developer',
      department: 'Engineering',
      locationType: 'remote',
      employmentType: 'full-time',
      salaryMin: 120000,
      salaryMax: 160000,
      description:
        'We are hiring a Lead Senior React Engineer for our enterprise SaaS frontend application platform.',
    };

    const result = createJobPostingSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('fails when salaryMax is less than salaryMin', () => {
    const invalidData = {
      title: 'Senior React Developer',
      department: 'Engineering',
      locationType: 'remote',
      employmentType: 'full-time',
      salaryMin: 150000,
      salaryMax: 100000,
      description:
        'We are hiring a Lead Senior React Engineer for our enterprise SaaS frontend application platform.',
    };

    const result = createJobPostingSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
