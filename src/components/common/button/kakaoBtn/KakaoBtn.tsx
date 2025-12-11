import React from 'react';
import Icon from '@assets/svgs';
import loginBtn from '@components/common/button/kakaoBtn/kakaoBtn.css';
import useEventLogger from 'src/gtm/hooks/useEventLogger';

interface KakaoBtnProps {
  type?: 'TEST';
}

const KakaoBtn = ({ type }: KakaoBtnProps) => {
  const { logClickEvent } = useEventLogger('login_wish_page');

  const handleLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${
      process.env.NEXT_PUBLIC_REST_API_KEY
    }&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`;

    logClickEvent('click_login');
  };

  const buttonText =
    type === 'TEST' ? '3초만에 카카오 로그인하고 내 절 찾기' : '카카오로 3초 만에 시작하기';

  return (
    <button className={loginBtn} onClick={handleLogin}>
      <Icon.IcnKakaoLogo />
      {buttonText}
    </button>
  );
};

export default KakaoBtn;
