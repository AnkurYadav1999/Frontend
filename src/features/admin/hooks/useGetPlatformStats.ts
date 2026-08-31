import { useQuery } from '@tanstack/react-query';
import { adminApi, adminKeys } from '../api/adminApi';

export function useGetPlatformStats() {
  return useQuery({
    queryKey: adminKeys.stats(),
    queryFn: () => adminApi.getPlatformStatsGraphQL(),
  });
}
