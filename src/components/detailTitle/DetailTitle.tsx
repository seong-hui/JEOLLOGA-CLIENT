import { titleContainerStyle, titleStyle, buttonStyle, subtitleStyle } from './detailTitle.css';

interface DetailTitleProps {
  title: string;
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
    <div>
      <div className={titleContainerStyle}>
        <h2 className={titleStyle({ size })}>{title}</h2>
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
