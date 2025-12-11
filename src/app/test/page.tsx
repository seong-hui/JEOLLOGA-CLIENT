'use client';

export const dynamic = 'force-dynamic';

import useFunnel from '@hooks/useFunnel';
import React from 'react';

import TestContent from '@components/test/testContent/TestContent';
import { TEST_STEPS } from '@constants/test';
import TestStart from '@components/test/testStart/TestStart';

import * as styles from './testPage.css';

const TestPage = () => {
  const steps = ['START', ...TEST_STEPS.map((step) => step.id)];

  const { Funnel, Step, nextStep, currentStep } = useFunnel(steps, '/test/result');

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
                onClick={nextStep}
              />
            </Step>
          )),
        ]}
      </Funnel>
    </div>
  );
};

export default TestPage;
