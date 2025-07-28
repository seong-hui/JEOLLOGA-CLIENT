'use client';

import { fetchFilteredListV2 } from '@apis/filter/axios';
import { TemplestaySearchParamsV2 } from '@apis/filter/type';
import { useAddWishlist, useRemoveWishlist } from '@apis/wish';
import SearchCardList from '@components/card/templeStayCard/searchCardList/SearchCardList';
import BottomSheet from '@components/common/bottmsheet/BottomSheet';
import SortBtn from '@components/common/button/sortBtn/SortBtn';
import SearchEmpty from '@components/common/empty/searchEmpty/SearchEmpty';
import ModalContainer from '@components/common/modal/ModalContainer';
import Pagination from '@components/common/pagination/Pagination';
import FilterTypeBox from '@components/filter/filterTypeBox/FilterTypeBox';
import SearchHeader from '@components/search/searchHeader/SearchHeader';
import { SortOption, SORT_LABELS, SORT_OPTIONS } from '@constants/sort';
import { getStorageValue } from '@hooks/useLocalStorage';
import useUpdateSearchParams from '@utils/updateSearchParams';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import * as styles from './searchResultPage.css';

interface TempleStay {
  templestayId: number;
  templeName: string;
  templestayName: string;
  tag: string;
  region: string;
  type: string;
  imgUrl: string;
  liked: boolean;
}

export default function SearchResultPageClient() {
  const searchParams = useSearchParams();

  const getJoinedArrayParam = (key: string): string | undefined => {
    const values = searchParams.getAll(key);
    return values.length ? values.join(',') : undefined;
  };

  const queryParams: TemplestaySearchParamsV2 = {
    region: getJoinedArrayParam('region'),
    type: getJoinedArrayParam('type'),
    activity: getJoinedArrayParam('activity'),
    etc: getJoinedArrayParam('etc'),
    min: Number(searchParams.get('min') ?? '0'),
    max: Number(searchParams.get('max') ?? '30'),
    sort: searchParams.get('sort') ?? SORT_OPTIONS.RECOMMEND,
    search: searchParams.get('search') ?? '',
    page: Number(searchParams.get('page') ?? '1'),
    size: Number(searchParams.get('size') ?? '5'),
  };

  const [templestays, setTemplestays] = useState<TempleStay[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(Number(queryParams.page));
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: addWish } = useAddWishlist();
  const { mutate: removeWish } = useRemoveWishlist();
  const updateSearchParams = useUpdateSearchParams();

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchFilteredListV2(queryParams);
      setTemplestays(res.content);
      setTotalPages(res.totalPages);
      setCurrentPage(res.currentPage);
    };
    fetch();
  }, [searchParams.toString()]);

  const handleToggleWishlist = (templestayId: number, liked: boolean) => {
    const isLoggedIn = getStorageValue('isLoggedIn');
    const userIdValue = getStorageValue('userId');

    if (!isLoggedIn || !userIdValue) {
      setIsModalOpen(true);
      return;
    }

    const userId = Number(userIdValue);

    const optimisticUpdate = (newLiked: boolean) => {
      setTemplestays((prev) =>
        prev.map((item) =>
          item.templestayId === templestayId ? { ...item, liked: newLiked } : item,
        ),
      );
    };

    const mutationOptions = {
      onSuccess: () => {},
      onError: () => {
        optimisticUpdate(!liked);
      },
    };

    optimisticUpdate(!liked);

    if (liked) {
      removeWish({ userId, templestayId }, mutationOptions);
    } else {
      addWish({ userId, templestayId }, mutationOptions);
    }
  };

  const searchText = queryParams.search ?? '';
  const selectedOption: SortOption = queryParams.sort as SortOption;

  const minPrice = queryParams.min;
  const maxPrice = queryParams.max;
  const isPriceChanged = Number(minPrice) > 0 || Number(maxPrice) < 30;

  const filterKeys = ['region', 'type', 'activity', 'etc'];
  const activeFilters = filterKeys.filter(
    (key) => queryParams[key as keyof TemplestaySearchParamsV2],
  );

  if (isPriceChanged) {
    activeFilters.push('price');
  }

  const handlePageChange = (newPage: number) => {
    updateSearchParams({ ...queryParams, page: newPage });
  };

  const handleSortChange = (option: SortOption) => {
    setIsSortSheetOpen(false);
    updateSearchParams({ ...queryParams, page: 1, sort: option });
  };

  const prevPath = getStorageValue('prevPage') || '';

  return (
    <div className={styles.container}>
      {isModalOpen && (
        <ModalContainer
          modalTitle="로그인 하시겠어요?"
          modalBody="찜하려면 로그인이 필요해요."
          isOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          handleSubmit={() => {
            // 로그인 이동
          }}
          leftBtnLabel="취소"
          rightBtnLabel="로그인하기"
        />
      )}

      <div className={styles.headerContainer}>
        <SearchHeader searchText={searchText} prevPath={prevPath} />
        <FilterTypeBox activeFilters={activeFilters} />
      </div>

      {templestays.length === 0 ? (
        <div className={styles.emptyContainer}>
          <SearchEmpty text={searchText} />
        </div>
      ) : (
        <div className={styles.bodyContainer}>
          <div>
            <div className={styles.sortWrapper}>
              <SortBtn
                text={SORT_LABELS[selectedOption]}
                onClick={() => setIsSortSheetOpen(true)}
              />
            </div>

            <BottomSheet isOpen={isSortSheetOpen} onClose={() => setIsSortSheetOpen(false)}>
              <div className={styles.sortSheetContent}>
                {Object.entries(SORT_OPTIONS).map(([key, value]) => {
                  const isActive = value === selectedOption;

                  return (
                    <button
                      key={key}
                      onClick={() => handleSortChange(value)}
                      className={`${styles.sortOptionButton} ${isActive && styles.active}`}>
                      {SORT_LABELS[value as SortOption]}
                      {isActive && '✔️'}
                    </button>
                  );
                })}
              </div>
            </BottomSheet>

            <div className={styles.cardListWrapper}>
              <SearchCardList
                data={templestays}
                layout="horizontal"
                onToggleWishlist={handleToggleWishlist}
                onRequireLogin={() => setIsModalOpen(true)}
              />
            </div>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            color="white"
          />
        </div>
      )}
    </div>
  );
}
