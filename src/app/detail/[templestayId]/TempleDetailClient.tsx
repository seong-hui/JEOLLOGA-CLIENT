'use client';
import { useGetTempleDetails, usePostViewNum } from '@apis/templeInfo';
import { useAddWishlist, useRemoveWishlist } from '@apis/wish';
import DetailCarousel from '@components/carousel/detailCarousel/DetailCarousel';
import ButtonBar from '@components/common/button/buttonBar/ButtonBar';
import ModalContainer from '@components/common/modal/ModalContainer';
import TapBar from '@components/common/tapBar/TapBar';
import ExceptLayout from '@components/except/exceptLayout/ExceptLayout';
import StickyTapBar from '@components/templeDetail/stickyTapBar/StickyTapBar';
import TempleDetailInfo from '@components/templeDetail/templeDetailInfo/TempleDetailInfo';
import TempleInfo from '@components/templeDetail/templeInfo/templeInfo';
import TemplePrice from '@components/templeDetail/templePrice/TemplePrice';
import TempleReview from '@components/templeDetail/templeReview/TempleReview';
import TempleSchedule from '@components/templeDetail/templeSchedule/TempleSchedule';
import TempleTitle from '@components/templeDetail/templeTitle/TempleTitle';
import TempleTopbar from '@components/templeDetail/templeTopbar/TempleTopbar';
import useNavigateTo from '@hooks/useNavigateTo';
import { useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import useEventLogger from 'src/gtm/hooks/useEventLogger';

import * as styles from './detail.css';

const SmallMap = dynamic(() => import('@components/templeDetail/naverMap/smallMap/SmallMap'), {
  ssr: false,
  loading: () => <div>지도를 로딩중입니다...</div>,
});

interface TempleDetailClientProps {
  id: number;
}

const TempleDetailClient = ({ id }: TempleDetailClientProps) => {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const user = getCookie('userId') as string;
    setUserId(user);
  }, []);

  const { mutate } = usePostViewNum(id);
  useEffect(() => {
    mutate();
  }, [mutate]);

  const { data, isLoading, isError } = useGetTempleDetails(id);
  const queryClient = useQueryClient();
  const addWishlistMutation = useAddWishlist();
  const removeWishlistMutation = useRemoveWishlist();

  const [liked, setLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigateToLogin = useNavigateTo('/loginStart');

  useEffect(() => {
    if (data) {
      setLiked(data.wish);
    }
  }, [data]);

  const { logClickEvent } = useEventLogger('bottom_tab');

  const handleToggleWishlist = () => {
    if (!userId) {
      setIsModalOpen(true);
      return;
    }

    const mutation = liked ? removeWishlistMutation : addWishlistMutation;

    mutation.mutate(
      { userId: Number(userId), templestayId: Number(id) },
      {
        onSuccess: () => {
          setLiked(!liked);
          queryClient.invalidateQueries({ queryKey: ['ranking', userId] });
          queryClient.refetchQueries({ queryKey: ['ranking', userId] });
        },
      },
    );

    logClickEvent(`click_wish_${liked ? 'remove' : 'add'}`, {});
  };

  const closeModal = () => {
    setIsModalOpen(false);

    logClickEvent('click_cancel', { screen: 'modal_login_wish' });
  };

  const handleLogin = () => {
    navigateToLogin();
    logClickEvent('click_login', { screen: 'modal_login_wish' });
  };

  if (isLoading) {
    return <ExceptLayout type="loading" />;
  }

  if (isError) {
    return <ExceptLayout type="networkError" />;
  }

  if (!data) {
    return <p>템플스테이 정보를 찾을 수 없습니다</p>;
  }

  const handleBottomButtonClick = () => {
    window.open(data.url, '_blank');
    const newWindow = window.open(data.url, '_blank');
    if (newWindow) {
      newWindow.opener = null;
    }
    logClickEvent('click_reserve', { label: data.templeName });
  };

  return (
    <div className={styles.templeDetailWrapper}>
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

      <div className={styles.headerBox}>
        <TempleTopbar templestayName={data.templestayName} />
      </div>
      <div className={styles.topDetailContainer}>
        <DetailCarousel />
        <div className={styles.templeTitleBox}>
          <TempleTitle templeName={data.templeName} templestayName={data.templestayName} />
          <TempleDetailInfo address={data.address} phoneNumber={data.phone} />
        </div>
        <StickyTapBar>
          <TapBar type="detail" />
        </StickyTapBar>
      </div>
      <div className={styles.templeDetailMiddle}>
        <TempleReview templeId={id} />
        <TempleSchedule schedule={data.schedule} />
        <TemplePrice templestayPrice={data.price} />
        <TempleInfo introduction={data.introduction} />
      </div>

      <SmallMap detailAddress={data.address} latitude={data.lat} longitude={data.lon} />
      <ButtonBar
        type="wish"
        label="예약하러 가기"
        largeBtnClick={handleBottomButtonClick}
        liked={liked}
        onToggleWishlist={handleToggleWishlist}
      />
    </div>
  );
};

export default TempleDetailClient;
