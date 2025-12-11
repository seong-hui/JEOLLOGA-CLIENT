'use client';

import React from 'react';

import * as styles from './resultPage.css';
import PageBottomBtn from '@components/common/button/pageBottomBtn/PageBottomBtn';
import Image from 'next/image';
import MateImage from '@assets/images/test/test_img_large_EAJ.png';
import KakaoBtn from '@components/common/button/kakaoBtn/KakaoBtn';
import Bubble from '@components/common/bubble/Bubble';

const ResultPage = () => {
  const text = `누가 뭐 하자고 해도 잠깐의 망설임이 먼저 찾아와요.\n조용한 카페 창가 자리나 집 안의 오후 햇살처럼, 잔잔한 순간에 마음이 풀려요.\n시끌벅적한 대화보다 차 한 잔의 여유가 훨씬 오래 남는 편이에요.\n그래서 명상이나 차담 같은 고요한 프로그램이 잘 어울려요.\n누군가와 대화하지 않아도 그 공간이 나를 이해해 주는 느낌이 드니까요.`;

  const handleLinkCopy = () => {};
  const handleSaveImage = () => {};

  return (
    <div className={styles.page}>
      <section className={styles.resultSection}>
        <h1 className={styles.title}>잔잔호수형 목탁이</h1>
        <h3 className={styles.subtitle}>차분하면서도 편안한 곳을 좋아해요.</h3>

        <div className={styles.centerCard}></div>
        <button className={styles.saveButton} onClick={handleSaveImage}>
          이미지를 꾹 눌러서 저장해보세요!
        </button>

        <ul className={styles.description}>
          {text.split('\n').map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>

        <div className={styles.divider}></div>
        <h2 className={styles.footerText}>
          당신에게 필요한 건 고요함 한 스푼.
          <br />
          마음의 속도를 잠시 늦춰보세요.
        </h2>
      </section>

      <h2 className={styles.mateTitle}>나의 템플메이트는?</h2>
      <section className={styles.mateSection}>
        <div className={styles.bestMate}>
          <Image src={MateImage} alt="친목도모형 목탁이" width={144} height={144} />
          <p className={styles.mateSubtitle}>환상의 템플메이트</p>
          <h5>친목도모형 목탁이</h5>
        </div>

        <div className={styles.worstMate}>
          <Image src={MateImage} alt="친목도모형 목탁이" width={144} height={144} />

          <p className={styles.mateSubtitle}>환장의 템플메이트</p>
          <h5>친목도모형 목탁이</h5>
        </div>
      </section>

      <div className={styles.buttonSection}>
        <Bubble text="나에게 맞는 절을 계속 추천받을 수 있어요!" />
        <KakaoBtn type="TEST" />
        <PageBottomBtn btnText="친구에게 공유하기" size="large" onClick={handleLinkCopy} />
      </div>
    </div>
  );
};

export default ResultPage;
