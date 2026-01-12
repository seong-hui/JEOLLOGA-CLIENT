'use client';

import React from 'react';
import TestHeader from '@components/test/testHeader/TestHeader';
import { TEST_STEPS } from '@constants/test';
import useFunnel from '@hooks/useFunnel';

import * as styles from './testPage.css';
import { usePathname, useRouter } from 'next/navigation';

const TestLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const steps = ['START', ...TEST_STEPS.map((step) => step.id)];
  const { currentStep, prevStep } = useFunnel(steps);

  const progressStep = steps.indexOf(currentStep);

  const isResultPage = pathname === '/test/result';
  const handleClose = () => {
    if (isResultPage) {
      router.push('/');
    } else {
      prevStep();
    }
  };

  return (
    <div className={styles.layout}>
      <TestHeader
        currentStep={progressStep}
        totalSteps={TEST_STEPS.length}
        onBackClick={prevStep}
        onCloseClick={handleClose}
      />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default TestLayout;
