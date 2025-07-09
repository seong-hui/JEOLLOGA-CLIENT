import { useMutation, useQuery } from '@tanstack/react-query';

import { ApiResponse } from './../response';
import { fetchUserNickname, getMyPage, registerUser } from './axios';
import { MyPageType, OnboardingUserRequest } from './type';

export const useRegisterUser = () => {
  return useMutation<void, Error, OnboardingUserRequest>({
    mutationFn: (data) => registerUser(data),
  });
};

export const useGetMyPage = () => {
  const { data, isLoading, isError } = useQuery<ApiResponse<MyPageType>>({
    queryKey: ['myPage'],
    queryFn: () => getMyPage(),
  });

  return { data, isLoading, isError };
};

export const useGetNickname = (userId: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [userId],
    queryFn: () => fetchUserNickname(userId),
  });

  return { data, isLoading, isError };
};
