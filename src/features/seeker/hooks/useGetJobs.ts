import { useQuery } from '@tanstack/react-query';
import { seekerApi, seekerKeys } from '../api/seekerApi';
import { JobFilterInput } from '../types';

export function useGetJobs(filter?: JobFilterInput) {
  return useQuery({
    queryKey: seekerKeys.jobList(filter),
    queryFn: () => seekerApi.getJobs(filter),
  });
}
