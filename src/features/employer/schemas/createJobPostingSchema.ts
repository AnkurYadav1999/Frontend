import { z } from 'zod';

export const createJobPostingSchema = z
  .object({
    title: z.string().min(5, { message: 'Job title must be at least 5 characters' }).max(100),
    department: z.string().min(2, { message: 'Department is required' }),
    locationType: z.enum(['remote', 'hybrid', 'onsite'], {
      errorMap: () => ({ message: 'Select location type' }),
    }),
    employmentType: z.enum(['full-time', 'part-time', 'contract'], {
      errorMap: () => ({ message: 'Select employment type' }),
    }),
    salaryMin: z.coerce.number().min(10000, { message: 'Minimum salary must be at least $10,000' }),
    salaryMax: z.coerce.number().min(10000, { message: 'Maximum salary must be at least $10,000' }),
    description: z
      .string()
      .min(30, { message: 'Job description must be at least 30 characters long' }),
  })
  .refine((data) => data.salaryMax >= data.salaryMin, {
    message: 'Max salary cannot be lower than Min salary',
    path: ['salaryMax'],
  });

export type CreateJobPostingSchemaType = z.infer<typeof createJobPostingSchema>;
