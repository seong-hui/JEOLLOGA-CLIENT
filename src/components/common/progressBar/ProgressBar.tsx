import React from 'react';

import * as ProgressBarStyle from './progressBar.css';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className={ProgressBarStyle.container}>
      <div className={ProgressBarStyle.barContainer}>
        <div
          className={ProgressBarStyle.barStyle}
          style={{ width: `${progressPercentage}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
