import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface UseInfiniteCarouselProps<T> {
  data: T[];
  autoPlayInterval?: number;
}

const useInfiniteCarousel = <T>({ data, autoPlayInterval }: UseInfiniteCarouselProps<T>) => {
  const totalOriginalSlides = data.length;

  const slides = useMemo(
    () => [
      { ...data[data.length - 1], uniqueKey: 'clone-last' },
      ...data.map((item, idx) => ({ ...item, uniqueKey: `real-${idx}` })),
      { ...data[0], uniqueKey: 'clone-first' },
    ],
    [data],
  );

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
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const startAutoSlide = useCallback(() => {
    if (!autoPlayInterval) return;
    stopAutoSlide();
    timerRef.current = setInterval(moveNext, autoPlayInterval);
  }, [moveNext, stopAutoSlide, autoPlayInterval]);

  useEffect(() => {
    if (autoPlayInterval) {
      startAutoSlide();
      return () => stopAutoSlide();
    }
  }, [startAutoSlide, stopAutoSlide, currentIndex, autoPlayInterval]);

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsAnimate(false);
      setCurrentIndex(totalOriginalSlides);
    } else if (currentIndex === slides.length - 1) {
      setIsAnimate(false);
      setCurrentIndex(1);
    }
  };

  const handleDragStart = (clientX: number, clientY: number = 0) => {
    stopAutoSlide();
    setIsDragging(true);
    setStartX(clientX);
    setStartY(clientY);
    setCurrentX(clientX);
    setIsAnimate(false);
  };

  const handleDragMove = (clientX: number, clientY: number = 0) => {
    if (!isDragging) return;

    const diffX = Math.abs(clientX - startX);
    const diffY = Math.abs(clientY - startY);
    if (diffY > diffX && diffY > 10) {
      setIsDragging(false);
      return;
    }

    setCurrentX(clientX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    const diff = currentX - startX;
    const threshold = 50;

    setIsDragging(false);
    if (autoPlayInterval) startAutoSlide();

    if (diff < -threshold) {
      moveNext();
    } else if (diff > threshold) {
      movePrev();
    } else {
      setIsAnimate(true);
    }
  };

  const displayIndex =
    currentIndex === 0
      ? totalOriginalSlides
      : currentIndex === slides.length - 1
        ? 1
        : currentIndex;

  const dragOffset = isDragging ? currentX - startX : 0;

  return {
    slides,
    currentIndex,
    isAnimate,
    dragOffset,
    displayIndex,
    totalOriginalSlides,
    isSwiped: Math.abs(currentX - startX) > 5,
    handlers: {
      onMouseDown: (e: React.MouseEvent) => handleDragStart(e.clientX),
      onMouseMove: (e: React.MouseEvent) => handleDragMove(e.clientX),
      onMouseUp: handleDragEnd,
      onMouseLeave: handleDragEnd,
      onTouchStart: (e: React.TouchEvent) =>
        handleDragStart(e.touches[0].clientX, e.touches[0].clientY),
      onTouchMove: (e: React.TouchEvent) =>
        handleDragMove(e.touches[0].clientX, e.touches[0].clientY),
      onTouchEnd: handleDragEnd,
      onTransitionEnd: handleTransitionEnd,
    },
  };
};

export default useInfiniteCarousel;
