import { useQuery } from '@tanstack/react-query';

import { getTempleReviews, getTempleImages, getTempleDetails } from './axios';
import { ReviewsResponse, TemplestayImgsResponse, TempleDetail } from './type';

export const useGetTempleDetails = (id: number) => {
  const { data, isLoading, isError } = useQuery<TempleDetail>({
    queryKey: ['detailPage', id],
    queryFn: () => getTempleDetails(id),
  });

  return { data, isLoading, isError };
};

export const useGetTempleImages = (id: number) => {
  const { data, isLoading, isError } = useQuery<TemplestayImgsResponse>({
    queryKey: ['images', id],
    queryFn: () => getTempleImages(id),
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
