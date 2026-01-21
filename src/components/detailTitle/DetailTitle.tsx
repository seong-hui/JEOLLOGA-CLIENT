import { ReactNode } from 'react';

import {
  titleContainerStyle,
  titleStyle,
  buttonStyle,
  subtitleStyle,
  detailTitleStyle,
} from './detailTitle.css';

interface DetailTitleProps {
  title: string | ReactNode;
  subtitle?: string;
  isTotal?: boolean;
  size?: 'small' | 'medium';
  rigntBtnLabel?: string;
  onClick?: () => void;
  rightBtnDisabled?: boolean;
}

const DetailTitle = ({
  title,
  subtitle,
  isTotal = false,
  size = 'medium',
  rigntBtnLabel,
  onClick,
  rightBtnDisabled = false,
}: DetailTitleProps) => {
  return (
    <div className={detailTitleStyle}>
      <div className={titleContainerStyle}>
        {typeof title === 'string' ? (
          <h2 className={titleStyle({ size })}>{title}</h2>
        ) : (
          <div className={titleStyle({ size })}>{title}</div>
        )}
        {isTotal && (
          <button className={buttonStyle} onClick={onClick} disabled={rightBtnDisabled}>
            {rigntBtnLabel}
          </button>
        )}
      </div>
      <h3 className={subtitleStyle}>{subtitle}</h3>
    </div>
  );
};

export default DetailTitle;
