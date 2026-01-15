import { postJbtiTest, postTestResult } from '@apis/test/axios';
import { TestType } from '@constants/test';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const usePostTestResult = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (result: string) => {
      const [data] = await Promise.all([
        postJbtiTest(result),
        new Promise((resolve) => setTimeout(resolve, 2500)),
      ]);

      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['test-result'], data);
      router.push(`/test/result`);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useSaveTestResult = () => {
  return useMutation({
    mutationFn: (type: TestType) => postTestResult(type),
  });
};
