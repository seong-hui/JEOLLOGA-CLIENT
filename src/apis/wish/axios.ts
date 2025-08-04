import instance from '@apis/instance';

import { WishActionResponse, WishlistRequest, WishlistResponse } from './type';

interface FetchWishlistParams {
  page: number;
}

export const fetchWishlist = async ({ page }: FetchWishlistParams): Promise<WishlistResponse> => {
  const response = await instance.get<WishlistResponse>('/v2/user/wish', {
    params: { page },
    withCredentials: true,
  });
  return response.data;
};

export const addWishlist = async ({
  userId,
  templestayId,
}: WishlistRequest): Promise<WishActionResponse> => {
  const response = await instance.post<WishActionResponse>('/user/templestay/liked', {
    userId,
    templestayId,
  });
  return response.data;
};

export const removeWishlist = async ({
  userId,
  templestayId,
}: WishlistRequest): Promise<WishActionResponse> => {
  const response = await instance.delete<WishActionResponse>('/user/templestay/liked/delete', {
    data: {
      userId,
      templestayId,
    },
  });
  return response.data;
};
