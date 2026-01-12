import { postJbtiTest } from '@apis/test/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const usePostTestResult = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (result: string) => postJbtiTest(result),
    onSuccess: (data) => {
      queryClient.setQueryData(['test-result'], data);
      router.push(`/test/result`);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
