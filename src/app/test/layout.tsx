'use client';

import React from 'react';
import TestHeader from '@components/test/testHeader/TestHeader';
import { TEST_STEPS } from '@constants/test';
import useFunnel from '@hooks/useFunnel';

import * as styles from './testPage.css';

const TestLayout = ({ children }: { children: React.ReactNode }) => {
  const steps = ['START', ...TEST_STEPS.map((step) => step.id)];
  const { currentStep, prevStep } = useFunnel(steps, '/result');

  const progressStep = steps.indexOf(currentStep);

  return (
    <div className={styles.layout}>
      <TestHeader
        currentStep={progressStep}
        totalSteps={TEST_STEPS.length}
        onBackClick={prevStep}
        onCloseClick={prevStep}
      />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default TestLayout;
