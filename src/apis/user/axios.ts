import instance, { privateInstance } from '@apis/instance';

import { OnboardingDataV2, OnboardingResponseV2, UserNicknameResponse } from './type';

export const fetchUserNickname = async (userId?: number) => {
  if (userId === 0) {
    return null;
  }
  const response = await privateInstance.get<UserNicknameResponse>(`/user/register/success`, {
    params: {
      userId,
    },
  });
  return response.data;
};

export const postOnboardingData = async (data: OnboardingDataV2): Promise<OnboardingResponseV2> => {
  const response = await instance.post<OnboardingResponseV2>('/v2/user/onboarding', data);
  return response.data;
};

export const getMyPage = async () => {
  const res = await instance.get('/v2/user/mypage');
  return res.data;
};
