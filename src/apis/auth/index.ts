import { getKakaoLogin, postLogout, postWithdraw } from '@apis/auth/axios';
import { useMutation } from '@tanstack/react-query';
import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export const useGetKakaoLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ code }: { code: string }) => getKakaoLogin(code),
    onSuccess: (response) => {
      const userNickname = response.data.data.nickname;
      const userId = response.data.data.userId;

      setCookie('userNickname', userNickname, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 1209600, // 14일
      });

      localStorage.setItem('userId', userId);

      router.push('/');
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
      router.push('/');
      window.location.reload();
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
