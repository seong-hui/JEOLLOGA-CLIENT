import { queryOptions } from '@tanstack/react-query';

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

export const templeReviewsQueryOptions = (templestayId: string, page: number) =>
  queryOptions<ReviewsResponse>({
    queryKey: ['reviews', templestayId, page],
    queryFn: () => getTempleReviews(templestayId, page),
  });
