import { useMutation, useQuery } from '@tanstack/react-query';

import { addWishlist, fetchWishlist, removeWishlist } from './axios';
import { WishlistRequest, WishlistResponse, WishActionResponse } from './type';

export const useWishlistQuery = (page: number) => {
  return useQuery<WishlistResponse>({
    queryKey: ['wishlist', page],
    queryFn: () => fetchWishlist({ page }),
    staleTime: 0,
  });
};

export const useAddWishlist = () => {
  return useMutation<WishActionResponse, Error, WishlistRequest>({
    mutationFn: (data: WishlistRequest) => addWishlist(data),
    onSuccess: () => {},
  });
};

export const useRemoveWishlist = () => {
  return useMutation<WishActionResponse, Error, WishlistRequest>({
    mutationFn: (data: WishlistRequest) => removeWishlist(data),
    onSuccess: () => {},
  });
};
