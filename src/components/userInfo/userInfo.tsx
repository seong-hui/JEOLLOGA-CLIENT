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
    window.open('https://www.notion.so/1817c7beb7788076bdddfd4ba4b43008?pvs=4', '_blank');
    logClickEvent('click_announce');
  };

  const handleQuestionClick = () => {
    window.open('https://www.notion.so/1807c7beb7788005a73bc799ce8719bf?pvs=4', '_blank');
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
