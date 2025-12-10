import ProgressBar from '@components/common/progressBar/ProgressBar';
import React from 'react';
import Icon from '@assets/svgs';

import * as styles from './TestHeader.css';

interface TestHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBackClick: () => void;
  onCloseClick: () => void;
}

const TestHeader = ({ currentStep, totalSteps, onBackClick, onCloseClick }: TestHeaderProps) => {
  console.log(currentStep);
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerTop}>
        {currentStep >= 1 ? (
          <button className={styles.backButton} onClick={onBackClick}>
            <Icon.IcnArrowBlackLeft />
          </button>
        ) : (
          <Icon.SmallLogo />
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
