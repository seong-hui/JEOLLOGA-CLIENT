'use client';

import useFetchFilteredListV2 from '@apis/filter';
import { useAddWishlistV2, useRemoveWishlistV2 } from '@apis/wish';
import { WishItemV2 } from '@apis/wish/type';
import TempleStayCard from '@components/card/templeStayCard/TempleStayCard';
import ModalContainer from '@components/common/modal/ModalContainer';
import CurationHeader from '@components/curation/CurationHeader';
import ExceptLayout from '@components/except/exceptLayout/ExceptLayout';
import { SORT_OPTIONS } from '@constants/sort';
import useNavigateTo from '@hooks/useNavigateTo';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { useState } from 'react';

import * as styles from './templeFoodPage.css';

export default function TempleFoodCurationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigateToLogin = useNavigateTo('/loginStart');

  const { data, isLoading } = useFetchFilteredListV2({
    search: '사찰음식',
    size: 20,
    sort: SORT_OPTIONS.RECOMMEND,
  });

  const templestays: WishItemV2[] = data?.content || [];

  const { mutate: addWish } = useAddWishlistV2();
  const { mutate: removeWish } = useRemoveWishlistV2();

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

  const handleLogin = () => {
    navigateToLogin();
  };

  if (isLoading) return <ExceptLayout type="loading" />;

  return (
    <div className={styles.container}>
      <div className={styles.stickyHeader}>
        <CurationHeader />
      </div>

      {isModalOpen && (
        <ModalContainer
          modalTitle="로그인 하시겠어요?"
          modalBody="찜하려면 로그인이 필요해요."
          isOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          handleSubmit={handleLogin}
          leftBtnLabel="취소"
          rightBtnLabel="로그인하기"
        />
      )}

      <div className={styles.topImageContainer}>
        <Image
          src="/assets/images/banner/banner_1_detail.png"
          alt="사찰음식 템플스테이 상세"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className={styles.contentContainer}>
        {templestays.length > 0 ? (
          <div className={styles.cardList}>
            {templestays.map((item: WishItemV2) => (
              <TempleStayCard
                key={item.templestayId}
                item={item}
                layout="vertical"
                onToggleWishlist={handleToggleWishlist}
                onRequireLogin={() => setIsModalOpen(true)}
                link={`/detail/${item.templestayId}`}
              />
            ))}
          </div>
        ) : (
          <div>검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
