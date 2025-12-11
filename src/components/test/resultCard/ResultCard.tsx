import React from 'react';
import Image from 'next/image';
import Bubble from '@components/common/bubble/Bubble';

import container from './ResultCard.css';
import { TestType } from '@constants/test';
import getTestType from '@utils/getTestType';
import EmptyImage from '@assets/images/test/test_img_dark.png';

interface ResultCardProps {
  color?: 'GREEN' | 'BLUE' | 'NONE';
  type?: TestType;
}

const ResultCard = ({ color = 'NONE', type }: ResultCardProps) => {
  const { text, image } = type
    ? getTestType(type)
    : { text: '절에서 나의 모습은?', image: EmptyImage };

  return (
    <div className={container({ color })}>
      <Bubble text={text} />
      <Image src={image} alt="목탁이" width={144} height={144} />
    </div>
  );
};

export default ResultCard;
