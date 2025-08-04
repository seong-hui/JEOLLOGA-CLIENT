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

export const useGetTempleReviews = (templestayId: string, page: number) => {
  const { data, isLoading, isError } = useQuery<ReviewsResponse>({
    queryKey: ['reviews', templestayId, page],
    queryFn: () => getTempleReviews(templestayId, page),
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
