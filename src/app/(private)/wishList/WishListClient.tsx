'use client';

import { useAddWishlist, useRemoveWishlist } from '@apis/wish';
import { WishlistResponse } from '@apis/wish/type';
import WishCardList from '@components/card/templeStayCard/wishCardList/WishCardList';
import WishEmpty from '@components/common/empty/wishEmpty/WishEmpty';
import PageName from '@components/common/pageName/PageName';
import Pagination from '@components/common/pagination/Pagination';
import ExceptLayout from '@components/except/exceptLayout/ExceptLayout';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import * as styles from './wishList.css';

interface WishListClientProps {
  initialData: WishlistResponse | null;
  currentPage: number;
  error?: boolean;
}

const WishListClient = ({ initialData, currentPage, error }: WishListClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const addWishlistMutation = useAddWishlist();
  const removeWishlistMutation = useRemoveWishlist();

  const wishlist = initialData?.wishlist || [];
  const totalPages = initialData?.totalPages || 1;

  useEffect(() => {
    if (initialData && totalPages > 0 && currentPage > totalPages) {
      const params = new URLSearchParams(searchParams);
      params.set('page', totalPages.toString());
      router.replace(`/wishList?${params.toString()}`);
    }
  }, [initialData, currentPage, totalPages, router, searchParams]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`/wishList?${params.toString()}`);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleToggleWishlist = (templestayId: number, liked: boolean) => {
    if (liked) {
      removeWishlistMutation.mutate(
        { templestayId },
        {
          onSuccess: () => {
            // 페이지 새로고침으로 서버 데이터 업데이트
            router.refresh();
          },
        },
      );
    } else {
      addWishlistMutation.mutate(
        { templestayId },
        {
          onSuccess: () => {
            // 페이지 새로고침으로 서버 데이터 업데이트
            router.refresh();
          },
        },
      );
    }
  };

  if (error) {
    return <ExceptLayout type="networkError" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerBox}>
        <PageName title="위시리스트" />
      </div>
      {totalPages === 1 && wishlist.length === 0 ? (
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
            currentPage={initialData?.page || 1}
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
