import { useQuery } from '@tanstack/react-query';
import { employerApi, employerKeys } from '../api/employerApi';

export function useGetEmployerJobs() {
  return useQuery({
    queryKey: employerKeys.jobs(),
    queryFn: () => employerApi.getEmployerJobs(),
  });
}
