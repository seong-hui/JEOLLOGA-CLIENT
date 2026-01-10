import React from 'react';
import * as styles from './TestContent.css';

interface TestContentProps {
  title: string;
  topButton: string;
  bottomButton: string;
  onClick?: () => void;
}

const TestContent = ({ title, topButton, bottomButton, onClick }: TestContentProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={(styles.selectContainer)}>
        <button className={styles.textButton} onClick={onClick}>
          {topButton}
        </button>
        <button className={styles.textButton} onClick={onClick}>
          {bottomButton}
        </button>
      </div>
    </div>
  );
};

export default TestContent;
