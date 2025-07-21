import instance, { privateInstance } from '@apis/instance';

import { OnboardingUserRequest, UserNicknameResponse } from './type';

export const fetchUserNickname = async (userId?: number) => {
  if (userId === 0) {
    return null;
  }
  const response = await instance.get<UserNicknameResponse>(`/user/register/success`, {
    params: {
      userId,
    },
  });
  return response.data;
};

export const registerUser = async (data: OnboardingUserRequest): Promise<void> => {
  await privateInstance.post('/user/register', data);
};

export const getMyPage = async () => {
  const res = await instance.get('/v2/user/mypage');
  return res.data;
};
