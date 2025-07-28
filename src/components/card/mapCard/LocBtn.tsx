import btnContainer from '@components/card/mapCard/locBtn.css';
import BasicBtn from '@components/common/button/basicBtn/BasicBtn';

interface LocBtnProps {
  region: string;
  top: number;
  left: number;
  onClick?: () => void;
  href: string;
}

const LocBtn = ({ region, top, left, onClick, href }: LocBtnProps) => {
  return (
    <div className={btnContainer} style={{ top: `${top}px`, left: `${left}px` }}>
      <BasicBtn label={region} onClick={onClick} href={href} />
    </div>
  );
};

export default LocBtn;
