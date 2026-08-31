import { httpClient } from '../../../lib/http';
import { graphqlClient } from '../../../lib/graphql';
import { ModerationJobItem, PlatformStatsResponse } from '../types';

export const adminKeys = {
  all: ['admin'] as const,
  moderationQueue: () => [...adminKeys.all, 'moderation-queue'] as const,
  stats: () => [...adminKeys.all, 'stats'] as const,
};

export const adminApi = {
  getModerationQueue: async (): Promise<ModerationJobItem[]> => {
    return httpClient.get<ModerationJobItem[]>('/api/v1/admin/moderation');
  },

  approveJob: async (jobId: string): Promise<{ success: boolean }> => {
    return httpClient.post<{ success: boolean }>(`/api/v1/admin/moderation/${jobId}/approve`);
  },

  rejectJob: async (jobId: string): Promise<{ success: boolean }> => {
    return httpClient.post<{ success: boolean }>(`/api/v1/admin/moderation/${jobId}/reject`);
  },

  // GraphQL Telemetry Query
  getPlatformStatsGraphQL: async (): Promise<PlatformStatsResponse> => {
    const query = `
      query GetPlatformStats {
        platformStats {
          totalSeekers
          totalEmployers
          totalJobsPosted
          activeModerationCount
          monthlyRevenue
        }
      }
    `;
    return graphqlClient.query<PlatformStatsResponse>(query);
  },
};
