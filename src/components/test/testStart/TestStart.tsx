import React from 'react';

import * as styles from './TestStart.css';
import PageBottomBtn from '@components/common/button/pageBottomBtn/PageBottomBtn';
import ResultCard from '@components/test/resultCard/ResultCard';

interface TestStartProps {
  onClick: () => void;
}

const TestStart = ({ onClick }: TestStartProps) => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>나의 템플 캐릭터는?</h1>
        <h3 className={styles.subTitle}>속세에서 이런 나, 절에서는 너, 너 누구야</h3>
        <ResultCard color="BLUE" />
      </div>

      <div className={styles.bottom}>
        <PageBottomBtn btnText="시작하기" size="large" onClick={onClick} />
      </div>
    </div>
  );
};

export default TestStart;
