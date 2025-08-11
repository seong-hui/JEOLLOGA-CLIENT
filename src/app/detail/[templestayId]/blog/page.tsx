import { templeReviewsQueryOptions } from '@apis/templeInfo/prefetch';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

import BlogReviewClient from './BlogReviewClient';

const BlogReviewPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ templestayId: string }>;
  searchParams: Promise<{ page?: string }>;
}) => {
  const { templestayId } = await params;
  const id = Number(templestayId);
  const { page } = await searchParams;
  const currentPage = parseInt(page || '1', 10);

  const queryClient = new QueryClient();

  const cachedData = queryClient.getQueryData(['reviews', id, currentPage]);

  if (!cachedData) {
    await queryClient.prefetchQuery(templeReviewsQueryOptions(id, currentPage));
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogReviewClient templestayId={id} initialPage={currentPage} />
    </HydrationBoundary>
  );
};

export default BlogReviewPage;
