import HomeClient from '@app/HomeClient';
import RecommendTempleClient from '@app/RecommendTempleClient';
import DetailTitle from '@components/detailTitle/DetailTitle';
import FilterTypeBoxClient from '@components/filter/filterTypeBox/FilterTypeBoxClient';
import Footer from '@components/footer/Footer';
import Header from '@components/header/Header';
import SearchBar from '@components/search/searchBar/SearchBar';
import TestBanner from '@components/test/testBanner/TestBanner';
import { cookies } from 'next/headers';

import * as styles from './homePage.css';

const HomePage = async () => {
  const cookieStore = await cookies();
  const userName = cookieStore.get('userNickname')?.value;
  const isLoggedIn = !!userName;

  return (
    <div className={styles.homeWrapper}>
      <Header />
      <SearchBar />
      <FilterTypeBoxClient />

      <RecommendTempleClient isLoggedIn={isLoggedIn} />

      <TestBanner />

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
