import { fetchWishlistV2 } from '@apis/wish/axios';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import WishListClient from './WishListClient';

const WishListPage = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
  const queryClient = new QueryClient();
  const params = await searchParams;
  const page = Number(params?.page || 1);
  const queryKey = ['wishlistV2', page];

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => fetchWishlistV2(page),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WishListClient />
    </HydrationBoundary>
  );
};

export default WishListPage;
