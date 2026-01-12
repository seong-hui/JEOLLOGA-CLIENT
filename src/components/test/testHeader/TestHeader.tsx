import ProgressBar from '@components/common/progressBar/ProgressBar';
import React from 'react';
import Icon from '@assets/svgs';

import * as styles from './TestHeader.css';
import { useRouter } from 'next/navigation';

interface TestHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBackClick: () => void;
  onCloseClick: () => void;
}

const TestHeader = ({ currentStep, totalSteps, onBackClick, onCloseClick }: TestHeaderProps) => {
  const router = useRouter();

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerTop}>
        {currentStep >= 1 ? (
          <button className={styles.backButton} onClick={onBackClick}>
            <Icon.IcnArrowBlackLeft />
          </button>
        ) : (
          <button onClick={() => router.push('/')}>
            <Icon.SmallLogo />
          </button>
        )}
        <button onClick={onCloseClick}>
          <Icon.IcnCloseLargeGray />
        </button>
      </div>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
    </div>
  );
};

export default TestHeader;
