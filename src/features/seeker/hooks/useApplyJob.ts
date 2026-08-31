import { useMutation, useQueryClient } from '@tanstack/react-query';
import { seekerApi, seekerKeys } from '../api/seekerApi';
import { ApplyJobInput } from '../types';
import { useAppDispatch } from '../../../app/store';
import { addToast } from '../../../app/store/uiSlice';

export function useApplyJob() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (input: ApplyJobInput) => seekerApi.applyToJob(input),
    onSuccess: (application) => {
      queryClient.invalidateQueries({ queryKey: seekerKeys.applications() });
      dispatch(
        addToast({
          type: 'success',
          title: 'Application Submitted!',
          message: `Your application for "${application.jobTitle}" was sent successfully.`,
        })
      );
    },
    onError: (error: Error) => {
      dispatch(
        addToast({
          type: 'error',
          title: 'Application Failed',
          message: error.message,
        })
      );
    },
  });
}
