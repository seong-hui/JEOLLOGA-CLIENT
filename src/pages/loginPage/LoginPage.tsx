import KakaoBtn from '@components/common/button/kakaoBtn/KakaoBtn';
import PageName from '@components/common/pageName/PageName';
import LOGIN_INFOS from '@constants/loginInfos';
import { useLocation } from 'react-router-dom';

import * as styles from './loginPage.css';

type LoginType = 'my' | 'wish';

const LoginPage = () => {
  const location = useLocation();

  const type: LoginType = location.state?.type || 'wish';
  const isPrivate = location.state?.isPrivate || false;

  const { title, text, lottie } = LOGIN_INFOS[type];

  return (
    <section className={styles.loginWrapper}>
      <PageName title={title} isPrivate={isPrivate} />
      <div className={styles.contentWrapper}>
        <h2 className={styles.textStyle}>{text}</h2>

        <dotlottie-player
          key={type}
          src={lottie}
          autoplay
          loop
          style={{ width: '27rem', height: '28.8rem' }}
        />
      </div>
      <KakaoBtn />
    </section>
  );
};

export default LoginPage;
