import { ApiResponse } from '@apis/response';
import { useQuery, useMutation } from '@tanstack/react-query';

import { getTempleReviews, getTempleImages, getTempleDetails, postViewNum } from './axios';
import { ReviewsResponse, TemplestayImgsResponse, TempleDetail } from './type';

export const useGetTempleDetails = (id: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['detailPage', id],
    queryFn: () => getTempleDetails(id),
    select: (res: ApiResponse<TempleDetail>) => res.data,
  });

  return { data, isLoading, isError };
};

export const useGetTempleImages = (id: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['images', id],
    queryFn: () => getTempleImages(id),
    select: (res: ApiResponse<TemplestayImgsResponse>) => res.data,
  });

  return { data, isLoading, isError };
};

export const useGetTempleReviews = (id: number, page: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['reviews', id, page],
    queryFn: () => getTempleReviews(id, page),
    select: (res: ApiResponse<ReviewsResponse>) => res.data,
  });

  return { data, isLoading, isError };
};

export const usePostViewNum = (id: number) => {
  return useMutation({
    mutationFn: () => postViewNum(id),
    onError: (error) => {
      console.error(error);
    },
  });
};
