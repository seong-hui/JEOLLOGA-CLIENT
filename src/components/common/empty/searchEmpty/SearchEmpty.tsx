'use client';

import LottiePlayer from '@components/common/lottie/LottiePlayer';
import React from 'react';

import * as styles from './searchEmpty.css';

interface SearchEmptyProps {
  text?: string;
}

const SearchEmpty = ({ text }: SearchEmptyProps) => {
  return (
    <div>
      <div className={styles.container}>
        <p className={styles.textStyle}>
          {text ? (
            <>
              '<span className={styles.highlight}>{`${text}`}</span>'{'에 대한\n검색 결과가 없어요'}
            </>
          ) : (
            '해당되는 템플스테이를\n찾지 못했어요'
          )}
        </p>
        <LottiePlayer
          keyId="search"
          src="/lotties/moktak_sad.lottie"
          style={{ width: '15rem', height: '10.3rem' }}
        />
      </div>
    </div>
  );
};

export default SearchEmpty;
