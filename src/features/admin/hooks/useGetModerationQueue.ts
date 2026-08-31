import { useQuery } from '@tanstack/react-query';
import { adminApi, adminKeys } from '../api/adminApi';

export function useGetModerationQueue() {
  return useQuery({
    queryKey: adminKeys.moderationQueue(),
    queryFn: () => adminApi.getModerationQueue(),
  });
}
