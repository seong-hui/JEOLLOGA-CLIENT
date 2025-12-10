import React from 'react';
import * as styles from './Bubble.css';

interface BubbleProps {
  text: string;
}

const Bubble = ({ text }: BubbleProps) => {
  return (
    <div className={styles.bubble}>
      {text}
      <span className={styles.tail} />
    </div>
  );
};

export default Bubble;
