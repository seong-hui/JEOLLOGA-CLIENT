'use client';

import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import useEventLogger from 'src/gtm/hooks/useEventLogger';

import PageBottomBtn from '@components/common/button/pageBottomBtn/PageBottomBtn';
import LottiePlayer from '@components/common/lottie/LottiePlayer';
import { WELCOME_TEXT } from '@constants/onboarding/onboardingSteps';

import * as styles from './welcomePage.css';

const WelcomePage = () => {
  const router = useRouter();
  const { logClickEvent } = useEventLogger('onboarding_end');

  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = getCookie('userNickname');
    if (typeof name === 'string') {
      setUserName(name);
    }
  }, []);

  const handleStart = () => {
    router.push('/');
    logClickEvent('click_start');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.titleStyle}>{userName ? `${userName}${WELCOME_TEXT}` : ''}</h1>
      <div className={styles.lottieStyle}>
        <LottiePlayer keyId="onboarding" src="/lotties/onboarding.lottie" />
      </div>
      <PageBottomBtn btnText="절로가 시작하기" size="large" onClick={handleStart} />
    </div>
  );
};

export default WelcomePage;
