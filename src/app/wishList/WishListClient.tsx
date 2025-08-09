'use client';

import { useAddWishlistV2, useRemoveWishlistV2, useWishlistQueryV2 } from '@apis/wish';
import WishCardList from '@components/card/templeStayCard/wishCardList/WishCardList';
import WishEmpty from '@components/common/empty/wishEmpty/WishEmpty';
import PageName from '@components/common/pageName/PageName';
import Pagination from '@components/common/pagination/Pagination';
import ExceptLayout from '@components/except/exceptLayout/ExceptLayout';
import { useRouter, useSearchParams } from 'next/navigation';

import * as styles from './wishList.css';

const WishListClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page') || 1);

  const { data, isLoading, isError } = useWishlistQueryV2(currentPage);
  const addWishlistMutation = useAddWishlistV2();
  const removeWishlistMutation = useRemoveWishlistV2();

  const wishlistData = data?.data;
  const wishlist = wishlistData?.content || [];
  const totalPages = wishlistData?.totalPages || 1;

  const handlePageChange = (page: number) => {
    router.push(`/wishList?page=${page}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleToggleWishlist = (templestayId: number, isWished: boolean) => {
    if (isWished) {
      removeWishlistMutation.mutate(templestayId);
    } else {
      addWishlistMutation.mutate(templestayId);
    }
  };

  if (isLoading) {
    return <ExceptLayout type="loading" />;
  }
  if (isError) {
    return <ExceptLayout type="networkError" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerBox}>
        <PageName title="위시리스트" />
      </div>
      {!isLoading && wishlist.length === 0 ? (
        <div className={styles.emptyBox}>
          <WishEmpty />
        </div>
      ) : (
        <>
          <div className={styles.contentBox}>
            <WishCardList
              data={wishlist}
              layout="vertical"
              onToggleWishlist={handleToggleWishlist}
            />
          </div>
          <Pagination
            currentPage={wishlistData?.currentPage || 1}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            color="gray"
          />
        </>
      )}
    </div>
  );
};

export default WishListClient;
