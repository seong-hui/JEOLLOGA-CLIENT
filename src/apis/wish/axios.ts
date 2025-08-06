import instance from '@apis/instance';

import { WishActionResponse, WishlistResponse } from './type';

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
  templestayId,
}: {
  templestayId: number;
}): Promise<WishActionResponse> => {
  const response = await instance.post<WishActionResponse>(
    `/v2/user/wish/${templestayId}`,
    {},
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const removeWishlist = async ({
  templestayId,
}: {
  templestayId: number;
}): Promise<WishActionResponse> => {
  const response = await instance.delete<WishActionResponse>(`/v2/user/wish/${templestayId}`, {
    withCredentials: true,
  });
  return response.data;
};
