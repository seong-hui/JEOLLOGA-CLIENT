'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';

import BANNER_DATA from './bannerData';
import * as styles from './mainBanner.css';

const MainBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const totalSlides = BANNER_DATA.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 5초 자동 슬라이드 설정
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [currentIndex]);

  const startAutoSlide = () => {
    stopAutoSlide(); // 기존 타이머 제거 후 재설정
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleBannerClick = (banner: (typeof BANNER_DATA)[0]) => {
    if (banner.type === 'internal') {
      router.push(banner.link);
    } else {
      window.open(banner.link, '_blank');
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    banner: (typeof BANNER_DATA)[0],
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleBannerClick(banner);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.slideList}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onMouseEnter={stopAutoSlide} // 마우스 올리면 멈춤
        onMouseLeave={startAutoSlide}>
        {BANNER_DATA.map((banner) => (
          <div
            key={banner.id}
            className={styles.slideItem}
            onClick={() => handleBannerClick(banner)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, banner)}
            aria-label={`${banner.alt} 배너로 이동`}>
            <Image
              src={banner.thumbnailImage}
              alt={banner.alt}
              fill
              className={styles.bannerImage}
              priority={banner.id === 1} // 첫번째 이미지는 우선 로딩
            />
          </div>
        ))}
      </div>

      <div className={styles.counterBadge}>
        {currentIndex + 1} / {totalSlides}
      </div>
    </div>
  );
};

export default MainBanner;
