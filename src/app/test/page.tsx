'use client';

export const dynamic = 'force-dynamic';

import useFunnel from '@hooks/useFunnel';
import React, { useState } from 'react';

import TestContent from '@components/test/testContent/TestContent';
import { TEST_STEPS } from '@constants/test';
import TestStart from '@components/test/testStart/TestStart';

import * as styles from './testPage.css';
import { usePostTestResult } from '@apis/test';
import { useRouter } from 'next/navigation';
import TestHeader from '@components/test/testHeader/TestHeader';
import { getCookie } from 'cookies-next';
import ModalContainer from '@components/common/modal/ModalContainer';
import { getStorageValue } from '@hooks/useLocalStorage';

const TestPage = () => {
  const router = useRouter();
  const [selections, setSelections] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const steps = ['START', ...TEST_STEPS.map((step) => step.id)];
  const hasType = getCookie('hasType');
  const prevPath = getStorageValue('prevPage') || '';

  const { Funnel, Step, nextStep, prevStep, currentStep } = useFunnel(steps);
  const progressStep = steps.indexOf(currentStep);

  const { mutate, isPending, isSuccess } = usePostTestResult();
  const isLoading = isPending || isSuccess;

  const handleStartClick = () => {
    if (hasType === 'true') {
      setIsModalOpen(true);
    } else {
      nextStep();
    }
  };

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
    <div className={styles.layout}>
      <TestHeader
        isLoading={isLoading}
        currentStep={isLoading ? undefined : progressStep}
        totalSteps={isLoading ? undefined : TEST_STEPS.length}
        onBackClick={prevStep}
        onCloseClick={() => router.push(prevPath)}
      />

      {isLoading ? (
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
      ) : (
        <div
          className={`${styles.container} ${currentStep === 'START' ? styles.startBg : styles.stepBg}`}>
          <Funnel steps={steps}>
            {[
              <Step key="START" name="START">
                <TestStart onClick={handleStartClick} />
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
      )}

      {isModalOpen && (
        <ModalContainer
          modalTitle="성향테스트를 이미 받으셨어요!"
          modalBody="다시 받고싶으시다면 ‘다시하기’를 눌러주세요"
          isOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          handleSubmit={() => {
            setIsModalOpen(false);
            nextStep();
          }}
          leftBtnLabel="뒤로가기"
          rightBtnLabel="다시하기"
        />
      )}
    </div>
  );
};

export default TestPage;
