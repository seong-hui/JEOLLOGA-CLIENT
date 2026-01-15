import React from 'react';
import * as styles from './testPage.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '절에서 나의 모습은 무엇일까?',
  description: '여기를 눌러 확인하세요',
  openGraph: {
    title: '절에서 나의 모습은 무엇일까?',
    description: '여기를 눌러 확인하세요',
    url: 'https://www.gototemplestay.com/test',
    siteName: '절로가',
    images: [
      {
        url: '/test_og_img.png',
        width: 800,
        height: 400,
        alt: '유형 테스트 Open Graph 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

const TestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default TestLayout;
