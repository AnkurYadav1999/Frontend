export type ATSStage = 'applied' | 'screening' | 'interview' | 'offer' | 'rejected';

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  locationType: 'remote' | 'hybrid' | 'onsite';
  employmentType: 'full-time' | 'part-time' | 'contract';
  salaryRange: string;
  applicantCount: number;
  status: 'active' | 'closed' | 'draft';
  createdAt: string;
}

export interface Applicant {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  portfolioUrl?: string;
  stage: ATSStage;
  appliedAt: string;
}

export interface CreateJobPostingInput {
  title: string;
  department: string;
  locationType: 'remote' | 'hybrid' | 'onsite';
  employmentType: 'full-time' | 'part-time' | 'contract';
  salaryMin: number;
  salaryMax: number;
  description: string;
}
