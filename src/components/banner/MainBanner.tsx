'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import BANNER_DATA from './bannerData';
import * as styles from './mainBanner.css';
import useInfiniteCarousel from '@hooks/useInfiniteCarousel';

const MainBanner = () => {
  const router = useRouter();

  const {
    slides,
    currentIndex,
    isAnimate,
    dragOffset,
    displayIndex,
    totalOriginalSlides,
    isSwiped,
    handlers,
  } = useInfiniteCarousel({
    data: BANNER_DATA,
    autoPlayInterval: 4000,
  });

  const handleBannerClick = (banner: (typeof BANNER_DATA)[0]) => {
    if (isSwiped) return;

    if (banner.type === 'internal') {
      router.push(banner.link);
    } else {
      window.open(banner.link, '_blank');
    }
  };
  return (
    <div className={styles.container}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={styles.slideList}
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
          transition: isAnimate ? 'transform 0.5s ease-in-out' : 'none',
        }}
        {...handlers}>
        {slides.map((banner, index) => (
          <div
            key={banner.uniqueKey}
            className={styles.slideItem}
            onClick={() => handleBannerClick(banner)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleBannerClick(banner)}
            aria-label={`${banner.alt} 배너로 이동`}
            onDragStart={(e) => e.preventDefault()}>
            <Image
              src={banner.thumbnailImage}
              alt={banner.alt}
              fill
              className={styles.bannerImage}
              priority={banner.id === 1 && banner.uniqueKey.startsWith('real')}
            />
          </div>
        ))}
      </div>

      <div className={styles.counterBadge}>
        {displayIndex} / {totalOriginalSlides}
      </div>
    </div>
  );
};

export default MainBanner;
