export interface ModerationJobItem {
  id: string;
  title: string;
  companyName: string;
  submittedBy: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface PlatformStatsResponse {
  platformStats: {
    totalSeekers: number;
    totalEmployers: number;
    totalJobsPosted: number;
    activeModerationCount: number;
    monthlyRevenue: number;
  };
}
