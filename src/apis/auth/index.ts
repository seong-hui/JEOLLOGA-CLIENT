import { getKakaoLogin, postLogout, postWithdraw } from '@apis/auth/axios';
import { useSaveTestResult } from '@apis/test';
import { TestType } from '@constants/test';
import { useMutation } from '@tanstack/react-query';
import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export const useGetKakaoLogin = () => {
  const router = useRouter();
  const saveTestResultMutation = useSaveTestResult();

  return useMutation({
    mutationFn: ({ code }: { code: string }) => getKakaoLogin(code),
    onSuccess: async (response) => {
      const userNickname = response.data.data.nickname;
      const hasType = response.data.data.hasType;

      setCookie('userNickname', userNickname, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 1209600, // 14일
      });

      setCookie('hasType', hasType, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 1209600, // 14일
      });

      // 비회원 상태에서 테스트 완료 후 로그인한 경우 테스트 결과 저장
      const type = sessionStorage.getItem('type') as TestType;

      let url = '/';

      if (type) {
        try {
          await saveTestResultMutation.mutateAsync(type);
          url = '/?scrollTo=recommend';
        } finally {
          sessionStorage.removeItem('type');
        }
      }
      router.push(url);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const usePostLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      localStorage.clear();
      deleteCookie('userNickname');
      deleteCookie('hasType');

      router.push('/');
    },

    onError: (error) => {
      console.error(error);
    },
  });
};

export const usePostWithdraw = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: () => postWithdraw(),
    onSuccess: () => {
      localStorage.clear();
      deleteCookie('userNickname');
      deleteCookie('hasType');
      router.push('/');
      window.location.reload();
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
