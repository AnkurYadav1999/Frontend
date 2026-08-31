import { useQuery } from '@tanstack/react-query';
import { employerApi, employerKeys } from '../api/employerApi';

export function useGetApplicants() {
  return useQuery({
    queryKey: employerKeys.applicants(),
    queryFn: () => employerApi.getApplicants(),
  });
}
