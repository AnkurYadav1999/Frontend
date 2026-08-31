import { z } from 'zod';

export const applyJobSchema = z.object({
  jobId: z.string().min(1, { message: 'Job ID is required' }),
  applicantName: z.string().min(2, { message: 'Full name must be at least 2 characters' }),
  applicantEmail: z.string().email({ message: 'Please enter a valid email address' }),
  portfolioUrl: z.string().url({ message: 'Please enter a valid URL' }).or(z.literal('')),
  coverLetter: z
    .string()
    .min(20, { message: 'Cover letter must be at least 20 characters long' })
    .max(1000, { message: 'Cover letter cannot exceed 1000 characters' }),
  yearsOfExperience: z.coerce
    .number()
    .min(0, { message: 'Experience cannot be negative' })
    .max(40, { message: 'Please enter valid years of experience' }),
});

export type ApplyJobSchemaType = z.infer<typeof applyJobSchema>;
