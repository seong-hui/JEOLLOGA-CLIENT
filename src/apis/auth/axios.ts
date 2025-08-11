import instance from '@apis/instance';

export const getKakaoLogin = async (code: string) => {
  const res = await instance.get(`v2/auth/login?code=${encodeURIComponent(code)}`);

  return res;
};

export const postLogout = async () => {
  const res = await instance.post('/v2/user/auth/logout');

  return res;
};

export const postWithdraw = async () => {
  const res = await instance.post('/v2/user/auth/unlink');

  return res;
};
