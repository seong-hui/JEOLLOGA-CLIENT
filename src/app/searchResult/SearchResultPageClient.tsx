'use client';

import useFetchFilteredListV2 from '@apis/filter';
import { TemplestaySearchParamsV2 } from '@apis/filter/type';
import { useAddWishlistV2, useRemoveWishlistV2 } from '@apis/wish';
import SearchCardList from '@components/card/templeStayCard/searchCardList/SearchCardList';
import BottomSheet from '@components/common/bottmsheet/BottomSheet';
import SortBtn from '@components/common/button/sortBtn/SortBtn';
import SearchEmpty from '@components/common/empty/searchEmpty/SearchEmpty';
import ModalContainer from '@components/common/modal/ModalContainer';
import Pagination from '@components/common/pagination/Pagination';
import ExceptLayout from '@components/except/exceptLayout/ExceptLayout';
import FilterTypeBox from '@components/filter/filterTypeBox/FilterTypeBox';
import SearchHeader from '@components/search/searchHeader/SearchHeader';
import Header from '@components/header/Header';
import { SortOption, SORT_LABELS, SORT_OPTIONS } from '@constants/sort';
import { getStorageValue } from '@hooks/useLocalStorage';
import useNavigateTo from '@hooks/useNavigateTo';
import useUpdateSearchParams from '@utils/updateSearchParams';
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import useEventLogger from 'src/gtm/hooks/useEventLogger';

import * as styles from './searchResultPage.css';
import Icon from '@assets/svgs';
import { filterListInstance, priceAtom } from 'src/store/store';
import { useSetAtom } from 'jotai';

export default function SearchResultPageClient() {
  const searchParams = useSearchParams();
  const setPrice = useSetAtom(priceAtom);

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

  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: addWish } = useAddWishlistV2();
  const { mutate: removeWish } = useRemoveWishlistV2();
  const updateSearchParams = useUpdateSearchParams();

  const { data, isLoading } = useFetchFilteredListV2(queryParams);

  const templestays = data?.content || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || 1;

  const isInitialLoading = isLoading && !data;

  const handleToggleWishlist = (templestayId: number, liked: boolean) => {
    const userNickname = getCookie('userNickname');

    if (!userNickname) {
      setIsModalOpen(true);
      return;
    }

    if (liked) {
      removeWish(templestayId);
    } else {
      addWish(templestayId);
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

  const handleResetGroup = (groupKey: string) => {
    const newParams: Record<string, string | number | undefined> = { ...queryParams };

    if (groupKey === 'price') {
      setPrice({ minPrice: 0, maxPrice: 30 });
      newParams.min = 0;
      newParams.max = 30;
    } else {
      filterListInstance.resetGroup(groupKey);
      newParams[groupKey] = undefined;
    }

    updateSearchParams({ ...newParams, page: 1 });
  };

  const navigateToLogin = useNavigateTo('/loginStart');
  const { logClickEvent } = useEventLogger('searchReault');

  const handleLogin = () => {
    navigateToLogin();
    logClickEvent('click_login', { screen: 'modal_login_wish' });
  };

  const closeModal = () => {
    setIsModalOpen(false);

    logClickEvent('click_cancel', { screen: 'modal_login_wish' });
  };

  const prevPath = getStorageValue('prevPage') || '';

  if (isInitialLoading) {
    return <ExceptLayout type="loading" />;
  }

  return (
    <div className={styles.container}>
      {isModalOpen && (
        <ModalContainer
          modalTitle="로그인 하시겠어요?"
          modalBody="찜하려면 로그인이 필요해요."
          isOpen={isModalOpen}
          handleClose={closeModal}
          handleSubmit={handleLogin}
          leftBtnLabel="취소"
          rightBtnLabel="로그인하기"
        />
      )}

      <div className={styles.headerContainer}>
        {searchText ? <SearchHeader searchText={searchText} prevPath={prevPath} /> : <Header />}
        <FilterTypeBox
          activeFilters={activeFilters}
          onResetGroup={handleResetGroup}
          searchText={searchText}
        />
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
                      {isActive && <Icon.IcnCheckBlack />}
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
