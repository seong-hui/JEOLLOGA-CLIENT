import Icon from '@assets/svgs';
import BtnBox from '@components/common/button/arrowBtn/arrowBtn.css';

interface ArrowBtnProps {
  onClick: () => void;
}

const ArrowBtn = ({ onClick }: ArrowBtnProps) => {
  return (
    <button onClick={onClick} className={BtnBox}>
      <Icon.IcnBackBlackLeft />
    </button>
  );
};

export default ArrowBtn;
