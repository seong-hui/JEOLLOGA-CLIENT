import { useMutation, useQuery } from '@tanstack/react-query';

import { ApiResponse } from './../response';
import { getMyPage, postOnboardingData } from './axios';
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
