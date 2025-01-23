import useGetRanking from '@apis/ranking';
import { useAddWishlist, useRemoveWishlist } from '@apis/wish';
import PopularCard from '@components/card/popularCard/PopularCard';
import CarouselIndex from '@components/carousel/popularCarousel/CarouselIndex';
import useCarousel from '@hooks/useCarousel';
import { useQueryClient } from '@tanstack/react-query';
import registDragEvent from '@utils/registDragEvent';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as styles from './popularCarousel.css';

const PopularCarousel = () => {
  const userId = Number(localStorage.getItem('userId'));
  const queryClient = useQueryClient();

  const addWishlistMutation = useAddWishlist();
  const removeWishlistMutation = useRemoveWishlist();

  const { data, isLoading, isError } = useGetRanking(userId);

  const { currentIndex, carouselRef, transformStyle, handleDragChange, handleDragEnd } =
    useCarousel({
      itemCount: data?.rankings?.length || 0,
      moveDistance: 355,
    });

  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  const handleLikeToggle = (templestayId: number, liked: boolean) => {
    const mutation = liked ? removeWishlistMutation : addWishlistMutation;

    mutation.mutate(
      { userId, templestayId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['ranking', userId] });
          queryClient.refetchQueries({ queryKey: ['ranking', userId] });
        },
      },
    );
  };

  return (
    <section className={styles.carouselWrapper}>
      <div ref={carouselRef} className={styles.carouselContainer}>
        <div
          className={styles.carouselBox}
          style={transformStyle}
          {...registDragEvent({
            onDragChange: handleDragChange,
            onDragEnd: handleDragEnd,
          })}>
          {data?.rankings &&
            data.rankings.map((rankings) => (
              <PopularCard
                key={rankings.templestayId}
                ranking={rankings.ranking}
                templeName={rankings.templeName}
                templeLoc={rankings.region}
                templeImg={rankings.imgUrl}
                isLiked={rankings.liked}
                tag={rankings.tag}
                onClick={() => navigate(`/detail/${rankings.templestayId}`)}
                onLikeToggle={(liked: boolean) => handleLikeToggle(rankings.templestayId, liked)}
              />
            ))}
        </div>
      </div>
      <CarouselIndex total={data?.rankings?.length || 0} currentIndex={currentIndex} />
    </section>
  );
};

export default PopularCarousel;
