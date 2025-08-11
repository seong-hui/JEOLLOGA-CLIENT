import useGetRanking from '@apis/ranking';
import { useAddWishlistV2, useRemoveWishlistV2 } from '@apis/wish';
import PopularCard from '@components/card/popularCard/PopularCard';
import CarouselIndex from '@components/carousel/popularCarousel/CarouselIndex';
import ExceptLayout from '@components/except/exceptLayout/ExceptLayout';
import useCarousel from '@hooks/useCarousel';
import { useQueryClient } from '@tanstack/react-query';
import registDragEvent from '@utils/registDragEvent';
import { getCookie } from 'cookies-next';
import useEventLogger from 'src/gtm/hooks/useEventLogger';

import * as styles from './popularCarousel.css';

interface PopularCarouselProps {
  onRequireLogin: () => void;
}

const PopularCarousel = ({ onRequireLogin }: PopularCarouselProps) => {
  const queryClient = useQueryClient();
  const addWishlistMutation = useAddWishlistV2();
  const removeWishlistMutation = useRemoveWishlistV2();

  const { data, isLoading, isError } = useGetRanking();

  const { currentIndex, carouselRef, transformStyle, handleDragChange, handleDragEnd } =
    useCarousel({
      itemCount: data?.length || 0,
      moveDistance: 355,
    });

  const { logClickEvent } = useEventLogger('home_popularity_component');

  if (isLoading) {
    return <ExceptLayout type="loading" />;
  }

  if (isError) {
    return <ExceptLayout type="networkError" />;
  }

  const handleLikeToggle = (templestayId: number) => {
    const userNickname = getCookie('userNickname');
    if (!userNickname) {
      onRequireLogin();
      return;
    }

    const targetTemple = data?.find((temple) => temple.id === templestayId);
    if (!targetTemple) return;

    const currentIsWished = targetTemple.wish;

    const mutation = currentIsWished ? removeWishlistMutation : addWishlistMutation;
    mutation.mutate(templestayId, {
      onError: () => {
        queryClient.invalidateQueries({ queryKey: ['ranking'] });
      },
    });
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
                templestayId={temple.id}
                onLikeToggle={handleLikeToggle}
                link={`/detail/${temple.id}`}
                onClick={() => {
                  logClickEvent('click_popularity_card', {
                    label: temple.id,
                  });
                }}
              />
            ))}
        </div>
      </div>
      <CarouselIndex total={data?.length || 0} currentIndex={currentIndex} />
    </section>
  );
};

export default PopularCarousel;
