import {
  templeDetailQueryOptions,
  templeImagesQueryOptions,
  templeReviewsQueryOptions,
} from '@apis/templeInfo/prefetch';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

import TempleDetailClient from './TempleDetailClient';

const TempleDetailPage = async ({ params }: { params: { templestayId: string } }) => {
  const id = Number(params.templestayId);
  const stringId = params.templestayId;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(templeDetailQueryOptions(id)),
    queryClient.prefetchQuery(templeImagesQueryOptions(id)),
    queryClient.prefetchQuery(templeReviewsQueryOptions(stringId, 1)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TempleDetailClient id={id} />
    </HydrationBoundary>
  );
};

export default TempleDetailPage;
