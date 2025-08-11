import { WishItemV2 } from '@apis/wish/type';
import TempleStayCard from '@components/card/templeStayCard/TempleStayCard';

import container from './wishCardList.css';

interface WishCardListProps {
  data: WishItemV2[];
  layout: 'vertical' | 'horizontal';
  onToggleWishlist: (templestayId: number, liked: boolean) => void;
}
const WishCardList = ({ data, layout = 'vertical', onToggleWishlist }: WishCardListProps) => {
  return (
    <section className={container}>
      {data.map((temple) => (
        <TempleStayCard
          key={temple.templestayId}
          item={temple}
          layout={layout}
          onToggleWishlist={onToggleWishlist}
          link={`/detail/${temple.templestayId}`}
        />
      ))}
    </section>
  );
};

export default WishCardList;
