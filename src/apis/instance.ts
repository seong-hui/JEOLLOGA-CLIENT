'use client';

import API_URL from '@apis/env';
import MESSAGES from '@apis/messages';
import axios, { isAxiosError } from 'axios';
import { deleteCookie } from 'cookies-next';

// 토큰이 필요없는 api 요청
const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // 쿠키를 포함한 요청 허용
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postRefreshToken = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/v2/auth/reissue`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    if (isAxiosError(error)) throw error;
    else throw new Error(MESSAGES.UNKNOWN_ERROR);
  }
};

instance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const { config, response } = error;

    if (!response) {
      return Promise.reject(error);
    }

    if (response.status === 401) {
      try {
        const response = await postRefreshToken();

        if (response.status === 200) {
          const originRequest = config;

          return await axios(originRequest);
        }
      } catch (error) {
        await axios
          .post(
            `${API_URL}/v2/user/auth/logout`,
            {},
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            },
          )
          .catch((logoutError) => {
            console.error(logoutError);
          });

        localStorage.clear();
        deleteCookie('userNickname');
        deleteCookie('hasType');
        console.error(error);
        alert(MESSAGES.EXPIRED);
        window.location.replace('/');
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
