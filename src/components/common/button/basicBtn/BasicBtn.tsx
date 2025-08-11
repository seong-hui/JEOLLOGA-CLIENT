import Icon from '@assets/svgs';

import * as styles from './basicBtn.css';

interface ButtonProps {
  variant?: 'primary' | 'grayOutlined' | 'blackOutlined' | 'lightGrayOutlined' | 'green';
  size?: 'large' | 'medium' | 'small';
  label: string;
  leftIcon?: keyof typeof Icon;
  rightIcon?: keyof typeof Icon;
  onClick?: () => void;
  onRightIconClick?: () => void;
  isActive?: boolean;
  href?: string;
}

const BasicBtn = ({
  variant = 'primary',
  size = 'medium',
  label,
  leftIcon,
  rightIcon,
  onClick,
  onRightIconClick,
  isActive = false,
  href,
}: ButtonProps) => {
  const SelectedLeftIcon = leftIcon ? Icon[leftIcon] : null;
  const SelectedRightIcon = rightIcon ? Icon[rightIcon] : null;

  const buttonContent = (
    <button
      className={styles.buttonStyle({ color: variant, size, active: isActive })}
      onClick={onClick}
      type="button">
      {SelectedLeftIcon && (
        <span className={styles.iconWrapper}>
          <SelectedLeftIcon />
        </span>
      )}
      <p>{label}</p>
      {SelectedRightIcon && (
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onRightIconClick?.();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              onRightIconClick?.();
            }
          }}
          className={styles.iconWrapper}>
          <SelectedRightIcon />
        </span>
      )}
    </button>
  );

  return href ? <a href={href}>{buttonContent}</a> : buttonContent;
};

export default BasicBtn;
