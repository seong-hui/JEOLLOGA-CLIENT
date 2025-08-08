import instance from '@apis/instance';
import { ApiResponse } from '@apis/response';

import { WishlistResponseV2, WishActionResponse } from './type';

export const fetchWishlistV2 = async (page: number): Promise<ApiResponse<WishlistResponseV2>> => {
  const response = await instance.get<ApiResponse<WishlistResponseV2>>('/v2/user/wish', {
    params: { page },
  });
  return response.data;
};

export const addWishlistV2 = async (templestayId: number): Promise<WishActionResponse> => {
  const response = await instance.post<WishActionResponse>(`/v2/user/wish/${templestayId}`);
  return response.data;
};

export const removeWishlistV2 = async (templestayId: number): Promise<WishActionResponse> => {
  const response = await instance.delete<WishActionResponse>(`/v2/user/wish/${templestayId}`);
  return response.data;
};
