'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import BANNER_DATA, { BannerItem } from './bannerData';
import * as styles from './mainBanner.css';

type SlideItem = BannerItem & { uniqueKey: string };

const MainBanner = () => {
  const router = useRouter();

  const slides = [
    { ...BANNER_DATA[BANNER_DATA.length - 1], uniqueKey: 'clone-last' },
    ...BANNER_DATA.map((item) => ({ ...item, uniqueKey: `real-${item.id}` })),
    { ...BANNER_DATA[0], uniqueKey: 'clone-first' },
  ];

  const totalOriginalSlides = BANNER_DATA.length;

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimate, setIsAnimate] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const moveNext = useCallback(() => {
    setIsAnimate(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const movePrev = useCallback(() => {
    setIsAnimate(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  const stopAutoSlide = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  const startAutoSlide = useCallback(() => {
    stopAutoSlide();
    timerRef.current = setInterval(() => {
      moveNext();
    }, 4000);
  }, [moveNext, stopAutoSlide]);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [startAutoSlide, stopAutoSlide, currentIndex]);

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsAnimate(false);
      setCurrentIndex(totalOriginalSlides);
    } else if (currentIndex === slides.length - 1) {
      setIsAnimate(false);
      setCurrentIndex(1);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    stopAutoSlide();
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
    setIsAnimate(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    startAutoSlide();

    const diff = currentX - startX;
    const threshold = 50;

    if (diff < -threshold) {
      moveNext();
    } else if (diff > threshold) {
      movePrev();
    } else {
      setIsAnimate(true);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setIsAnimate(true);
      startAutoSlide();
    }
  };

  const handleBannerClick = (banner: SlideItem) => {
    if (Math.abs(currentX - startX) > 5) return;

    if (banner.type === 'internal') {
      router.push(banner.link);
    } else {
      window.open(banner.link, '_blank');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, banner: SlideItem) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleBannerClick(banner);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    stopAutoSlide();
    setIsDragging(true);
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    setStartX(touchX);
    setStartY(touchY);
    setCurrentX(touchX);
    setIsAnimate(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;

    const diffX = Math.abs(touchX - startX);
    const diffY = Math.abs(touchY - startY);

    // 스크롤 의도 파악
    if (diffY > diffX && diffY > 10) {
      setIsDragging(false);
      return;
    }

    setCurrentX(touchX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) {
      startAutoSlide();
      return;
    }

    setIsDragging(false);
    startAutoSlide();

    const diff = currentX - startX;
    const threshold = 50;

    if (diff < -threshold) {
      moveNext();
    } else if (diff > threshold) {
      movePrev();
    } else {
      setIsAnimate(true);
    }
  };

  let displayIndex = currentIndex;
  if (currentIndex === 0) displayIndex = totalOriginalSlides;
  else if (currentIndex === slides.length - 1) displayIndex = 1;

  const dragOffset = isDragging ? currentX - startX : 0;

  return (
    <div className={styles.container}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={styles.slideList}
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
          transition: isAnimate ? 'transform 0.5s ease-in-out' : 'none',
          touchAction: 'pan-y',
        }}
        onTransitionEnd={handleTransitionEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        {slides.map((banner) => (
          <div
            key={banner.uniqueKey}
            className={styles.slideItem}
            onClick={() => handleBannerClick(banner)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, banner)}
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
