import { buttonBarWrapper, buttonBarContainer } from './buttonBar.css';
import FlowerBtn from '@components/common/button/flowerBtn/FlowerBtn';
import PageBottomBtn from '@components/common/button/pageBottomBtn/PageBottomBtn';
import TextBtn from '@components/common/button/textBtn/TextBtn';

interface ButtonBarProps {
  type: 'reset' | 'wish';
  label: string;
  largeBtnClick: () => void;
  handleResetFilter?: () => void;
  liked?: boolean;
  onToggleWishlist?: () => void;
  isDisabled?: boolean;
}

const ButtonBar = ({
  type,
  label,
  largeBtnClick,
  handleResetFilter = () => {},
  liked,
  onToggleWishlist,
  isDisabled = false,
}: ButtonBarProps) => {
  const renderLeftButton = () =>
    type === 'wish' ? (
      <FlowerBtn label="찜하기" isActive={liked} isLeftIcn onClick={onToggleWishlist} />
    ) : (
      <TextBtn
        text="초기화"
        onClick={handleResetFilter}
        leftIcon="IcnReset"
        size="medium"
        clicked={liked}
      />
    );

  return (
    <div className={buttonBarWrapper}>
      <div className={buttonBarContainer}>
        {renderLeftButton()}
        <PageBottomBtn
          btnText={label}
          size="small"
          onClick={largeBtnClick}
          isDisabled={isDisabled}
        />
      </div>
    </div>
  );
};
export default ButtonBar;
