import { queryOptions } from '@tanstack/react-query';

import { ApiResponse } from '@apis/response';
import { getTempleImages, getTempleReviews, getTempleDetails } from './axios';
import { TemplestayImgsResponse, ReviewsResponse, TempleDetail } from './type';

export const templeDetailQueryOptions = (id: number) =>
  queryOptions<TempleDetail>({
    queryKey: ['detailPage', id],
    queryFn: () => getTempleDetails(id),
  });

export const templeImagesQueryOptions = (id: number) =>
  queryOptions<TemplestayImgsResponse>({
    queryKey: ['images', id],
    queryFn: () => getTempleImages(id),
  });

export const templeReviewsQueryOptions = (id: number, page: number) =>
  queryOptions({
    queryKey: ['reviews', id, page],
    queryFn: () => getTempleReviews(id, page),
    select: (res: ApiResponse<ReviewsResponse>) => res.data,
  });
