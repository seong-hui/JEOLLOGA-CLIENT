import ProgressBar from '@components/common/progressBar/ProgressBar';
import React from 'react';
import Icon from '@assets/svgs';
import * as styles from './TestHeader.css';
import { useRouter } from 'next/navigation';

interface TestHeaderProps {
  currentStep?: number;
  totalSteps?: number;
  onBackClick?: () => void;
  onCloseClick?: () => void;
  isLoading?: boolean;
}

const TestHeader = ({
  currentStep,
  totalSteps,
  onBackClick,
  onCloseClick,
  isLoading = false,
}: TestHeaderProps) => {
  const router = useRouter();

  const showProgressBar = currentStep !== undefined && totalSteps !== undefined;
  const showBackButton = showProgressBar && currentStep >= 1;

  const renderLeftIcon = () => {
    if (isLoading) return null;

    if (showBackButton) {
      return (
        <button className={styles.headerButton} onClick={onBackClick}>
          <Icon.IcnArrowBlackLeft />
        </button>
      );
    }

    return (
      <button onClick={() => router.push('/')}>
        <Icon.SmallLogo />
      </button>
    );
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerTop}>
        {renderLeftIcon()}
        {showBackButton && <h2 className={styles.title}>나의 템플 캐릭터는?</h2>}
        {onCloseClick && (
          <button onClick={onCloseClick} className={`${styles.headerButton} ${styles.closeButton}`}>
            <Icon.IcnCloseLargeGray />
          </button>
        )}
      </div>

      {showProgressBar && !isLoading && (
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      )}
    </div>
  );
};

export default TestHeader;
