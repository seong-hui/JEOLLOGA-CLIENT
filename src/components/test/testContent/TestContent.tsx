import React from 'react';
import * as styles from './TestContent.css';

interface TestContentProps {
  title: string;
  topButton: string;
  bottomButton: string;
  onClick: (choice: string) => void;
}

const TestContent = ({ title, topButton, bottomButton, onClick }: TestContentProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.selectContainer}>
        <button className={styles.textButton} onClick={() => onClick('A')}>
          {topButton}
        </button>
        <button className={styles.textButton} onClick={() => onClick('B')}>
          {bottomButton}
        </button>
      </div>
    </div>
  );
};

export default TestContent;
