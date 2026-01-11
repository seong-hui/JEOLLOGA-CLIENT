import { postJbtiTest } from '@apis/test/axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const usePostTestResult = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (result: string) => postJbtiTest(result),
    onSuccess: (data) => {
      router.push(`/test/result`);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
