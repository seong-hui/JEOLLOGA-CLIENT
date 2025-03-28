import { titleContainerStyle, titleStyle, buttonStyle } from './detailTitle.css';

interface DetailTitleProps {
  title: string;
  isTotal?: boolean;
  size?: 'small' | 'medium';
  rigntBtnLabel?: string;
  onClick?: () => void;
  rightBtnDisabled?: boolean;
}

const DetailTitle = ({
  title,
  isTotal = false,
  size = 'medium',
  rigntBtnLabel,
  onClick,
  rightBtnDisabled = false,
}: DetailTitleProps) => {
  return (
    <div className={titleContainerStyle}>
      <h2 className={titleStyle({ size })}>{title}</h2>
      {isTotal && (
        <button className={buttonStyle} onClick={onClick} disabled={rightBtnDisabled}>
          {rigntBtnLabel}
        </button>
      )}
    </div>
  );
};

export default DetailTitle;
