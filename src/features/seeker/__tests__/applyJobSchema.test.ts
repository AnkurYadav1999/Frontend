import { describe, it, expect } from 'vitest';
import { applyJobSchema } from '../schemas/applyJobSchema';

describe('applyJobSchema Zod Validation', () => {
  it('validates a valid job application input payload', () => {
    const validPayload = {
      jobId: 'job-123',
      applicantName: 'Jordan Lee',
      applicantEmail: 'jordan@example.com',
      portfolioUrl: 'https://github.com/jordanlee',
      coverLetter:
        'I am highly experienced with React 18, TypeScript, and Redux Toolkit architecture.',
      yearsOfExperience: 5,
    };

    const result = applyJobSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('fails when cover letter is too short', () => {
    const invalidPayload = {
      jobId: 'job-123',
      applicantName: 'Jordan Lee',
      applicantEmail: 'jordan@example.com',
      portfolioUrl: '',
      coverLetter: 'Too short',
      yearsOfExperience: 2,
    };

    const result = applyJobSchema.safeParse(invalidPayload);
    expect(result.success).toBe(false);
  });
});
