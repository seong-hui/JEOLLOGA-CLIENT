'use client';
const errorImage = '/assets/images/img_gray_light_leaf_medium.png';
import { WishItemV2 } from '@apis/wish/type';
import InfoSection from '@components/card/templeStayCard/InfoSection';
import FlowerIcon from '@components/common/icon/flowerIcon/FlowerIcon';
import { getCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import useEventLogger from 'src/gtm/hooks/useEventLogger';

import * as styles from './templeStayCard.css';

interface TempleStayCardProps {
  item: WishItemV2;
  layout: 'vertical' | 'horizontal';
  onToggleWishlist: (templestayId: number, currentLiked: boolean) => void;
  onRequireLogin?: () => void;
  link: string;
}

const TempleStayCard = ({
  item,
  layout,
  onToggleWishlist,
  link,
  onRequireLogin,
}: TempleStayCardProps) => {
  const [isWished, setIsWished] = useState(item.wish);

  const { logClickEvent } = useEventLogger('templestay_card');
  const pathname = usePathname();
  const isHorizontal = layout === 'horizontal';
  const isWishPage = pathname === '/wishList';

  const onClickWishBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const userNickname = getCookie('userNickname');
    if (!userNickname) {
      onRequireLogin?.();
      return;
    }

    onToggleWishlist(item.templestayId, isWished);
    setIsWished((prev) => !prev);

    logClickEvent(`click_wish_${isWished ? 'remove' : 'add'}`, {
      label: item.templeName,
      screen: `${isWishPage ? 'wish' : 'templestay_card'}`,
    });
  };

  return (
    <a
      href={link}
      className={isHorizontal ? styles.horizontalContainer : styles.verticalContainer}
      onClick={() => logClickEvent('click_card_detail')}>
      {item.imgUrl ? (
        <section className={isHorizontal ? styles.horizontalImgSection : styles.verticalImgSection}>
          <img
            className={isHorizontal ? styles.horizontalImage : styles.verticalImage}
            src={item.imgUrl}
            alt={item.templeName + ' 대표사진'}
          />
          <button className={styles.wishBtn} onClick={onClickWishBtn}>
            <FlowerIcon isActive={isWished} />
          </button>
        </section>
      ) : (
        <div
          className={
            isHorizontal ? styles.horizontalEmptyImgSection : styles.verticalEmptyImgSection
          }>
          <img src={errorImage} alt="빈이미지"></img>
        </div>
      )}

      <InfoSection
        templeName={item.templeName}
        templestayName={item.templestayName}
        region={item.region}
        type={item.type}
      />
    </a>
  );
};

export default TempleStayCard;
