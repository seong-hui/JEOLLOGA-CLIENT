'use client';

import React from 'react';
import Icon from '@assets/svgs';

import * as styles from './TestBanner.css';
import { useRouter } from 'next/navigation';

const TestBanner = () => {
  const router = useRouter();

  return (
    <button className={styles.bannerStyle} onClick={() => router.push('/test')}>
      <div>
        지금 성향 테스트하고 <br />
        <span className={styles.highlight}>나에게 딱 맞는 절</span> 추천받기!
      </div>
      <Icon.IcnLineArrowSmallRight />
    </button>
  );
};

export default TestBanner;
