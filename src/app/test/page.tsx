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

  const { Funnel, Step, nextStep, currentStep } = useFunnel(steps, '/test/result');
  const { mutate } = usePostTestResult();

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
    <div className={styles.container}>
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
