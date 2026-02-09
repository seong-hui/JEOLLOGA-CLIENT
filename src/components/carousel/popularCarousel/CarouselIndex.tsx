import indexStyle, { indexContainer } from '@components/carousel/popularCarousel/carouselIndex.css';
import React from 'react';

interface CarouselIndexProps {
  total: number;
  displayIndex: number;
}

const CarouselIndex = ({ total, displayIndex }: CarouselIndexProps) => {
  return (
    <div className={indexContainer}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={indexStyle({ state: index + 1 === displayIndex ? 'active' : 'inactive' })}
        />
      ))}
    </div>
  );
};

export default CarouselIndex;
