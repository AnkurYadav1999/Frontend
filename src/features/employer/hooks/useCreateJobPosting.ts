import { useMutation, useQueryClient } from '@tanstack/react-query';
import { employerApi, employerKeys } from '../api/employerApi';
import { CreateJobPostingInput } from '../types';
import { useAppDispatch } from '../../../app/store';
import { addToast } from '../../../app/store/uiSlice';

export function useCreateJobPosting() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (input: CreateJobPostingInput) => employerApi.createJobPosting(input),
    onSuccess: (newPosting) => {
      queryClient.invalidateQueries({ queryKey: employerKeys.jobs() });
      dispatch(
        addToast({
          type: 'success',
          title: 'Job Posting Created',
          message: `Created "${newPosting.title}" position successfully.`,
        })
      );
    },
    onError: (error: Error) => {
      dispatch(
        addToast({
          type: 'error',
          title: 'Failed to Post Job',
          message: error.message,
        })
      );
    },
  });
}
