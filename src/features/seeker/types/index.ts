export type LocationType = 'remote' | 'hybrid' | 'onsite';
export type EmploymentType = 'full-time' | 'part-time' | 'contract';

export interface JobItem {
  id: string;
  title: string;
  companyName: string;
  companyLogoUrl?: string;
  location: string;
  locationType: LocationType;
  employmentType: EmploymentType;
  salaryRange: string;
  description: string;
  tags: string[];
  postedAt: string;
}

export interface JobFilterInput {
  query?: string;
  locationType?: LocationType | 'all';
  employmentType?: EmploymentType | 'all';
}

export interface ApplyJobInput {
  jobId: string;
  applicantName: string;
  applicantEmail: string;
  portfolioUrl?: string;
  coverLetter: string;
  yearsOfExperience: number;
}

export interface ApplicationItem {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  status: 'submitted' | 'under_review' | 'shortlisted' | 'rejected';
  appliedAt: string;
}
