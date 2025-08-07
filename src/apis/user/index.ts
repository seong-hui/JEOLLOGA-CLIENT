import { useMutation, useQuery } from '@tanstack/react-query';

import { ApiResponse } from './../response';
import { fetchUserNickname, getMyPage, postOnboardingData } from './axios';
import { MyPageType, OnboardingDataV2, OnboardingResponseV2 } from './type';

export const usePostOnboardingData = () => {
  return useMutation<OnboardingResponseV2, Error, OnboardingDataV2>({
    mutationFn: (data) => postOnboardingData(data),
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
