import { useMutation, useQuery } from '@tanstack/react-query';

import { ApiResponse } from './../response';
import { getMyPage, postOnboardingData } from './axios';
import { MyPageResponse, OnboardingDataV2, OnboardingResponseV2 } from './type';

export const usePostOnboardingData = () => {
  return useMutation<OnboardingResponseV2, Error, OnboardingDataV2>({
    mutationFn: (data) => postOnboardingData(data),
  });
};

export const useGetMyPage = (enabled: boolean = true) => {
  const { data, isLoading, isError } = useQuery<ApiResponse<MyPageResponse>>({
    queryKey: ['myPage'],
    queryFn: () => getMyPage(),
    enabled,
  });

  return { data, isLoading, isError };
};
