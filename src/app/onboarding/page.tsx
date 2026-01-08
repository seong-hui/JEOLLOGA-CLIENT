'use client';

export const dynamic = 'force-dynamic';

import { usePostOnboardingData } from '@apis/user';
import { OnboardingDataV2 } from '@apis/user/type';
import ProgressBar from '@components/common/progressBar/ProgressBar';
import OnboardingSection from '@components/onboarding/OnboardingSection';
import { ONBOARDING_STEPS, COMMON_DESCRIPTION } from '@constants/onboarding/onboardingSteps';
import useFunnel from '@hooks/useFunnel';
import { getStorageValue } from '@hooks/useLocalStorage';
import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import useEventLogger from 'src/gtm/hooks/useEventLogger';

import container from './onboardingPage.css';

const OnboardingPage = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = getCookie('userNickname');
    if (typeof name === 'string') {
      setUserName(name);
    }
  }, []);

  const { Funnel, Step, nextStep, currentStep } = useFunnel(
    ONBOARDING_STEPS.map((step) => step.id),
    '/welcome',
  );

  const { logClickEvent } = useEventLogger('onboarding');

  const [selections, setSelections] = useState<Record<string, string | null>>(() => {
    const savedSelections = getStorageValue('onboardingSelections');
    return savedSelections
      ? JSON.parse(savedSelections)
      : ONBOARDING_STEPS.reduce((acc, step) => ({ ...acc, [step.id]: null }), {});
  });

  const userId = Number(getStorageValue('userId'));
  const { mutate: postOnboardingMutate } = usePostOnboardingData();

  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    setVh();
    window.addEventListener('resize', setVh);

    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, []);

  useEffect(() => {
    if (isInitialLoad) {
      setSelections((prev) => ({
        ...prev,
        [currentStep]: null,
      }));
      setIsInitialLoad(false);
    }
  }, [isInitialLoad, currentStep]);

  useEffect(() => {
    localStorage.setItem('onboardingSelections', JSON.stringify(selections));
  }, [selections]);

  const handleSelectionChange = (stepId: string, selected: string | null) => {
    setSelections((prev) => ({ ...prev, [stepId]: selected }));
  };

  const handleFinalSubmit = async () => {
    const requestData: OnboardingDataV2 = {
      userId,
      ageRange: selections['ageRange'],
      gender: selections['gender'],
      religion: selections['religion'],
      hasExperience: selections['hasExperience'],
    };

    postOnboardingMutate(requestData, {
      onSuccess: (response) => {
        console.log('온보딩 성공:', response.msg);
        localStorage.removeItem('onboardingSelections');
        nextStep();
      },
    });
  };

  return (
    <div className={container}>
      <ProgressBar
        currentStep={ONBOARDING_STEPS.findIndex((step) => step.id === currentStep) + 1}
        totalSteps={ONBOARDING_STEPS.length}
      />
      <Funnel steps={ONBOARDING_STEPS.map((step) => step.id)}>
        {ONBOARDING_STEPS.map(({ id, title, options, isNextDisabledInitially, isFinalStep }) => {
          return (
            <Step key={id} name={id}>
              <OnboardingSection
                id={id}
                title={id === 'ageRange' || id === 'gender' ? [`${userName}님의`, title] : title}
                description={COMMON_DESCRIPTION}
                options={options}
                isNextDisabledInitially={isNextDisabledInitially || false}
                selectedOption={selections[id]}
                onSelectionChange={(selected) => handleSelectionChange(id, selected)}
                onNextClick={() => {
                  logClickEvent('click_next', {
                    screen: `onboarding_${id}`,
                  });

                  if (isFinalStep) {
                    handleFinalSubmit();
                  } else {
                    nextStep();
                  }
                }}
              />
            </Step>
          );
        })}
      </Funnel>
    </div>
  );
};

export default OnboardingPage;
