'use client';
import { usePostLogout, usePostWithdraw } from '@apis/auth';
import { useGetMyPage } from '@apis/user';
import PopupBtn from '@components/common/button/popupBtn/PopupBtn';
import ModalContainer from '@components/common/modal/ModalContainer';
import PageName from '@components/common/pageName/PageName';
import ExceptLayout from '@components/except/exceptLayout/ExceptLayout';
import Footer from '@components/footer/Footer';
import ResultCard from '@components/test/resultCard/ResultCard';
import UserInfo from '@components/userInfo/userInfo';
import { TestType } from '@constants/test';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useEventLogger from 'src/gtm/hooks/useEventLogger';

import * as styles from './myPage.css';

// const MOCK_USER_DATA_DONE = {
//   type: 'IAJ',
//   typeContent: '잔잔한 호수형 목탁이',
//   nickname: '배영경',
//   email: 'jjeolloga@gmail.com',
//   hasType: true,
// };

// const MOCK_USER_DATA_NONE = {
//   type: null,
//   typeContent: null,
//   nickname: '배영경',
//   email: 'jjeolloga@gmail.com',
//   hasType: false,
// };

const MyPage = () => {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // const userData = MOCK_USER_DATA_DONE;
  // const userData = MOCK_USER_DATA_NONE;

  const postLogout = usePostLogout();
  const postWithdraw = usePostWithdraw();

  const { data, isLoading, isError } = useGetMyPage();
  const userData = data?.data;

  const { logClickEvent } = useEventLogger('my');

  const handleGoToTest = () => {
    router.push('/test');
  };

  const handleRecommend = () => {
    router.push('/');
    // router.push('/curation');
  };

  const handleReTest = () => {
    router.push('/test');
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);

    logClickEvent('click_logout');
  };

  const confirmLogout = () => {
    postLogout.mutate();
    setIsLogoutModalOpen(false);

    logClickEvent('click_logout', { screen: 'logout_modal' });
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);

    logClickEvent('click_unsubscribe');
  };

  const confirmDelete = () => {
    postWithdraw.mutate();
    setIsLogoutModalOpen(false);

    logClickEvent('click_unsubscribe', { screen: 'unsubscribe_modal' });
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);

    logClickEvent('click_cancel', { screen: 'logout_modal' });
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);

    logClickEvent('click_cancel', { screen: 'unsubscribe_modal' });
  };

  if (isLoading) {
    return <ExceptLayout type="loading" />;
  }

  if (isError) {
    return <ExceptLayout type="networkError" />;
  }

  if (!userData) {
    return <ExceptLayout type="networkError" />;
  }

  return (
    <div className={styles.myPageWrapper}>
      <div className={styles.userInfoContainer}>
        <PageName title="마이페이지" />

        <section className={styles.resultSection}>
          <div className={styles.cardWrapper}>
            <ResultCard color="NONE" type={(userData.type as TestType) || undefined} />
          </div>

          <div className={styles.profileInfoBox}>
            <p className={styles.nameRow}>
              {userData.hasType && (
                <span className={styles.typeContent}>{userData.typeContent}</span>
              )}
              <span className={styles.nickname}>{userData.nickname}</span> 님
            </p>
            <p className={styles.email}>{userData.email}</p>
          </div>

          <div className={styles.buttonGroup}>
            {userData.hasType ? (
              <>
                <PopupBtn color="green" label="절 추천받기" onClick={handleRecommend} />
                <PopupBtn color="gray" label="테스트 다시하기" onClick={handleReTest} />
              </>
            ) : (
              <PopupBtn color="green" label="성향 테스트하기" onClick={handleGoToTest} />
            )}
          </div>
        </section>

        <UserInfo
          data={data?.data}
          onLogoutClick={handleLogoutClick}
          onDeleteClick={handleDeleteClick}
        />
      </div>
      <Footer />

      {isLogoutModalOpen && (
        <div className={styles.modalOverlay}>
          <ModalContainer
            modalTitle="정말 로그아웃하시겠어요?"
            modalBody="로그아웃 시 일부 기능 이용이 제한됩니다"
            isOpen={isLogoutModalOpen}
            handleClose={handleCloseLogoutModal}
            handleSubmit={confirmLogout}
            leftBtnLabel="취소"
            rightBtnLabel="로그아웃하기"
            reverse={true}
          />
        </div>
      )}

      {isDeleteModalOpen && (
        <div className={styles.modalOverlay}>
          <ModalContainer
            modalTitle="정말 탈퇴하시겠어요?"
            modalBody="탈퇴 시 계정 정보는 복구할 수 없습니다"
            isOpen={isDeleteModalOpen}
            handleClose={handleCloseDeleteModal}
            handleSubmit={confirmDelete}
            leftBtnLabel="취소"
            rightBtnLabel="탈퇴하기"
            reverse={true}
          />
        </div>
      )}
    </div>
  );
};

export default MyPage;
