import useEventLogger from 'src/gtm/hooks/useEventLogger';

import infoContainerStyle from './userInfo.css';
import AccountActions from './userInfoContent/accountAction/AccountAction';
import HelpSection from './userInfoContent/helpContent/HelpContent';

interface UserInfoProps {
  data?: {
    nickname: string;
    email: string;
    ageRange?: string;
    gender?: string;
    religion?: string;
  };
  onLogoutClick: () => void;
  onDeleteClick: () => void;
}

const UserInfo = ({ data, onLogoutClick, onDeleteClick }: UserInfoProps) => {
  const { logClickEvent } = useEventLogger('my');
  const handleNoticeClick = () => {
    window.open('https://plucky-chicory-985.notion.site/gototemplestay-notices', '_blank');
    logClickEvent('click_announce');
  };

  const handleQuestionClick = () => {
    window.open('https://forms.gle/Rx7gXQMP2qhWNFPK7', '_blank');
    logClickEvent('click_contact');
  };

  if (!data) {
    return <p>No user information available</p>;
  }

  return (
    <div className={infoContainerStyle}>
      <HelpSection onNoticeClick={handleNoticeClick} onQuestionClick={handleQuestionClick} />
      <AccountActions onLogoutClick={onLogoutClick} onDeleteClick={onDeleteClick} />
    </div>
  );
};

export default UserInfo;
