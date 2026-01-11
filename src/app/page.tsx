import HomeClient from '@app/HomeClient';
import LookCard from '@components/card/lookCard/LookCard';
import MapCard from '@components/card/mapCard/MapCard';
import CurationCarousel from '@components/carousel/curationCarousel/CurationCarousel';
import DetailTitle from '@components/detailTitle/DetailTitle';
import Footer from '@components/footer/Footer';
import Header from '@components/header/Header';
import { cookies } from 'next/headers';

import * as styles from './homePage.css';

const HomePage = async () => {
  const cookieStore = await cookies();
  const userName = cookieStore.get('userNickname')?.value;

  return (
    <div className={styles.homeWrapper}>
      <Header />
      <LookCard name={userName} />
      <MapCard />
      <div className={styles.curationCarouselStyle}>
        <DetailTitle title="절로가 PICK!" />
        <CurationCarousel />
      </div>
      <div className={styles.popularCarouselStyle}>
        <DetailTitle
          title="이번 주 인기 템플스테이"
          subtitle="다른 분들은 어떤 템플스테이를 가장 좋아할까요?"
        />
        <HomeClient /> {/* 인기 템플스테이 캐러셀 */}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
