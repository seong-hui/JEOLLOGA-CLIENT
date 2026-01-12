'use client';

import React from 'react';

import * as styles from './resultPage.css';
import PageBottomBtn from '@components/common/button/pageBottomBtn/PageBottomBtn';
import Image from 'next/image';
import MateImage from '@assets/images/test/test_img_large_EAJ.png';
import KakaoBtn from '@components/common/button/kakaoBtn/KakaoBtn';
import Bubble from '@components/common/bubble/Bubble';
import ResultCard from '@components/test/resultCard/ResultCard';
import { useQueryClient } from '@tanstack/react-query';
import { TestResponse } from '@apis/test/type';

const ResultPage = () => {
  const queryClient = useQueryClient();

  const resultData = queryClient.getQueryData<TestResponse>(['test-result']);

  if (!resultData) {
    return <div>결과를 불러올 수 없습니다. 다시 테스트를 진행해주세요.</div>;
  }

  const [title, subtitle] = resultData.tagline.split(',');

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        text: `나의 템플 캐릭터는 무엇일까요?🌺
성향 테스트 참여하고, 친구와 결과를 공유해보세요!
테스트를 통해 나와 잘 맞는 템플스테이 메이트를 찾아봐요.\n
https://www.gototemplestay.com`,
      });
    } else {
      console.log('Else');
    }
  };

  const handleSaveImage = () => {};

  return (
    <div className={styles.page}>
      <section className={styles.resultSection}>
        <h1 className={styles.title}>{title}</h1>
        <h3 className={styles.subtitle}>{subtitle}</h3>

        <div>
          <ResultCard color="GREEN" type={resultData.code} />
          <button className={styles.saveButton} onClick={handleSaveImage}>
            이미지를 꾹 눌러서 저장해보세요!
          </button>
        </div>

        <ul className={styles.description}>
          {resultData.description.split('\n').map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>

        <div className={styles.divider}></div>
        <h2 className={styles.footerText}>{resultData.requirement}</h2>
      </section>

      <h2 className={styles.mateTitle}>나의 템플메이트는?</h2>
      <section className={styles.mateSection}>
        <div className={styles.bestMate}>
          <Image src={MateImage} alt="친목도모형 목탁이" width={144} height={144} />
          <p className={styles.mateSubtitle}>환상의 템플메이트</p>
          <h5>{resultData.bestMate}</h5>
        </div>

        <div className={styles.worstMate}>
          <Image src={MateImage} alt="친목도모형 목탁이" width={144} height={144} />

          <p className={styles.mateSubtitle}>환장의 템플메이트</p>
          <h5>{resultData.worstMate}</h5>
        </div>
      </section>

      <div className={styles.buttonSection}>
        <Bubble text="나에게 맞는 절을 계속 추천받을 수 있어요!" />
        <KakaoBtn type="TEST" />
        <PageBottomBtn btnText="친구에게 공유하기" size="large" onClick={handleShare} />
      </div>
    </div>
  );
};

export default ResultPage;
