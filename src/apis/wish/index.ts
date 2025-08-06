import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { addWishlist, fetchWishlist, removeWishlist } from './axios';
import { WishlistResponse, WishActionResponse } from './type';

export const useWishlistQuery = (page: number) => {
  return useQuery<WishlistResponse>({
    queryKey: ['wishlist', page],
    queryFn: () => fetchWishlist({ page }),
    staleTime: 0,
  });
};

export const useAddWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation<WishActionResponse, Error, { templestayId: number }>({
    mutationFn: ({ templestayId }) => addWishlist({ templestayId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      queryClient.invalidateQueries({ queryKey: ['ranking'] });
    },
  });
};

export const useRemoveWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation<WishActionResponse, Error, { templestayId: number }>({
    mutationFn: ({ templestayId }) => removeWishlist({ templestayId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      queryClient.invalidateQueries({ queryKey: ['ranking'] });
    },
  });
};
