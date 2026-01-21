'use client';

import useGetTypeRandom from '@apis/recommend';
import { useAddWishlistV2, useRemoveWishlistV2 } from '@apis/wish';
import TempleStayCard from '@components/card/templeStayCard/TempleStayCard';
import ExceptLayout from '@components/except/exceptLayout/ExceptLayout';
import { useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

import styles from './recommendCard.css';

interface RecommendCardProps {
  onRequireLogin?: () => void;
}

const RecommendCard = ({ onRequireLogin }: RecommendCardProps) => {
  const queryClient = useQueryClient();
  const addWishlistMutation = useAddWishlistV2();
  const removeWishlistMutation = useRemoveWishlistV2();

  const { data, isLoading, isError } = useGetTypeRandom();

  if (isLoading) {
    return <ExceptLayout type="loading" />;
  }

  if (isError) {
    return <ExceptLayout type="networkError" />;
  }

  const handleToggleWishlist = (templestayId: number, currentLiked: boolean) => {
    const userNickname = getCookie('userNickname');
    if (!userNickname) {
      onRequireLogin?.();
      return;
    }

    const mutation = currentLiked ? removeWishlistMutation : addWishlistMutation;
    mutation.mutate(templestayId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['typeRandom'] });
      },
      onError: () => {
        queryClient.invalidateQueries({ queryKey: ['typeRandom'] });
      },
    });
  };

  return (
    <section className={styles.container}>
      {data &&
        data.slice(0, 3).map((temple) => (
          <TempleStayCard
            key={temple.templestayId}
            item={{
              templestayId: temple.templestayId,
              templeName: temple.templeName,
              templestayName: temple.templestayName,
              region: temple.region,
              type: temple.type,
              imgUrl: temple.imgUrl,
              wish: temple.wish || false,
            }}
            layout="vertical"
            onToggleWishlist={handleToggleWishlist}
            onRequireLogin={onRequireLogin}
            link={`/detail/${temple.templestayId}`}
            size="small"
          />
        ))}
    </section>
  );
};

export default RecommendCard;
