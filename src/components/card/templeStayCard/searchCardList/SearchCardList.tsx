import { WishItemV2 } from '@apis/wish/type';

import TempleStayCard from '../TempleStayCard';
import container from './searchCardList.css';

interface SearchCardListProps {
  data: WishItemV2[];
  layout: 'vertical' | 'horizontal';
  onToggleWishlist: (templestayId: number, liked: boolean) => void;
  onRequireLogin?: () => void;
}

const SearchCardList = ({
  data,
  layout = 'horizontal',
  onToggleWishlist,
  onRequireLogin,
}: SearchCardListProps) => {
  return (
    <section className={container}>
      {data.map((temple) => (
        <TempleStayCard
          key={temple.templestayId}
          item={temple}
          layout={layout}
          onToggleWishlist={onToggleWishlist}
          onRequireLogin={onRequireLogin}
          link={`/detail/${temple.templestayId}`}
        />
      ))}
    </section>
  );
};

export default SearchCardList;
