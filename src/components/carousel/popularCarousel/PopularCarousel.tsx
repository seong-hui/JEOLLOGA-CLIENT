import useGetRanking from '@apis/ranking';
import { useAddWishlist, useRemoveWishlist } from '@apis/wish';
import PopularCard from '@components/card/popularCard/PopularCard';
import CarouselIndex from '@components/carousel/popularCarousel/CarouselIndex';
import ExceptLayout from '@components/except/exceptLayout/ExceptLayout';
import useCarousel from '@hooks/useCarousel';
import { getStorageValue } from '@hooks/useLocalStorage';
import { useQueryClient } from '@tanstack/react-query';
import registDragEvent from '@utils/registDragEvent';

import * as styles from './popularCarousel.css';

interface PopularCarouselProps {
  onRequireLogin: () => void;
}

const PopularCarousel = ({ onRequireLogin }: PopularCarouselProps) => {
  const userId = Number(getStorageValue('userId'));
  const queryClient = useQueryClient();

  const addWishlistMutation = useAddWishlist();
  const removeWishlistMutation = useRemoveWishlist();

  const { data, isLoading, isError } = useGetRanking();

  const { currentIndex, carouselRef, transformStyle, handleDragChange, handleDragEnd } =
    useCarousel({
      itemCount: data?.length || 0,
      moveDistance: 355,
    });

  if (isLoading) {
    return <ExceptLayout type="loading" />;
  }

  if (isError) {
    return <ExceptLayout type="networkError" />;
  }

  const handleLikeToggle = (templestayId: number, liked: boolean) => {
    if (!userId) {
      onRequireLogin();
      return;
    }

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
          {data &&
            data.map((temple) => (
              <PopularCard
                key={temple.id}
                ranking={temple.rank}
                templestayName={temple.templestayName}
                templeLoc={temple.region}
                templeImg={temple.imgUrl}
                isLiked={temple.wish}
                templeName={temple.templeName}
                onLikeToggle={(liked: boolean) => handleLikeToggle(temple.id, liked)}
                link={`/detail/${temple.id}`}
              />
            ))}
        </div>
      </div>
      <CarouselIndex total={data?.length || 0} currentIndex={currentIndex} />
    </section>
  );
};

export default PopularCarousel;
