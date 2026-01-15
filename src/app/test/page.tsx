'use client';

export const dynamic = 'force-dynamic';

import useFunnel from '@hooks/useFunnel';
import React, { useState } from 'react';

import TestContent from '@components/test/testContent/TestContent';
import { TEST_STEPS } from '@constants/test';
import TestStart from '@components/test/testStart/TestStart';

import * as styles from './testPage.css';
import { usePostTestResult } from '@apis/test';

const TestPage = () => {
  const [selections, setSelections] = useState<string[]>([]);
  const steps = ['START', ...TEST_STEPS.map((step) => step.id)];

  const { Funnel, Step, nextStep, currentStep } = useFunnel(steps);
  const { mutate, isPending, isSuccess } = usePostTestResult();

  if (isPending || isSuccess) {
    return (
      <div className={styles.pendingContainer}>
        <dotlottie-player
          key="look"
          className={styles.lottieStyle}
          src="/lotties/moktak_hit.lottie"
          autoplay
          loop
        />
        <p>테스트 결과를 분석 중...</p>
      </div>
    );
  }

  const handleSelect = (choice: string) => {
    const currentStepIndex = steps.indexOf(currentStep) - 1;

    if (currentStepIndex >= 0) {
      setSelections((prev) => {
        const updates = [...prev];
        updates[currentStepIndex] = choice;
        return updates;
      });
    }

    const isLastStep = currentStep === steps[steps.length - 1];
    if (isLastStep) {
      const result = [...selections, choice].join('');
      mutate(result);
    } else {
      nextStep();
    }
  };

  return (
    <div
      className={`${styles.container} ${currentStep === 'START' ? styles.startBg : styles.stepBg}`}>
      <Funnel steps={steps}>
        {[
          <Step key="START" name="START">
            <TestStart onClick={nextStep} />
          </Step>,

          ...TEST_STEPS.map(({ id, title, option1, option2 }) => (
            <Step key={id} name={id}>
              <TestContent
                title={title}
                topButton={option1}
                bottomButton={option2}
                onClick={(choice) => handleSelect(choice)}
              />
            </Step>
          )),
        ]}
      </Funnel>
    </div>
  );
};

export default TestPage;
