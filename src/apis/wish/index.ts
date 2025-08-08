import { ApiResponse } from '@apis/response';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchWishlistV2, addWishlistV2, removeWishlistV2 } from './axios';
import { WishlistResponseV2, WishActionResponse } from './type';

export const useWishlistQueryV2 = (page: number) => {
  return useQuery<ApiResponse<WishlistResponseV2>>({
    queryKey: ['wishlistV2', page],
    queryFn: () => fetchWishlistV2(page),
    staleTime: 0,
  });
};

export const useAddWishlistV2 = () => {
  const queryClient = useQueryClient();

  return useMutation<WishActionResponse, Error, number>({
    mutationFn: (templestayId: number) => addWishlistV2(templestayId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ranking'] });
      queryClient.invalidateQueries({ queryKey: ['filteredListV2'] });
    },
    onError: (error) => {
      console.error('위시리스트 추가 실패:', error);
    },
  });
};

export const useRemoveWishlistV2 = () => {
  const queryClient = useQueryClient();

  return useMutation<WishActionResponse, Error, number>({
    mutationFn: (templestayId: number) => removeWishlistV2(templestayId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ranking'] });
      queryClient.invalidateQueries({ queryKey: ['filteredListV2'] });
    },
    onError: (error) => {
      console.error('위시리스트 삭제 실패:', error);
    },
  });
};
